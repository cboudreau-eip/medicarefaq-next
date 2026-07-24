import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

// Calculate all personalized Medicare dates from a DOB
function calculateMedicareDates(dob: Date) {
  const birthMonth = dob.getMonth();
  const birthDay = dob.getDate();
  const birthYear = dob.getFullYear();

  // 65th birthday
  const birthday65 = new Date(birthYear + 65, birthMonth, birthDay);

  // If born on the 1st of the month, Medicare eligibility starts the month BEFORE
  const bornOnFirst = birthDay === 1;
  const eligibilityMonth = bornOnFirst
    ? new Date(birthday65.getFullYear(), birthday65.getMonth() - 1, 1)
    : new Date(birthday65.getFullYear(), birthday65.getMonth(), 1);

  // IEP: 3 months before eligibility month through 3 months after
  const iepStart = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() - 3, 1);
  const iepEnd = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() + 3 + 1, 0);

  // Best enroll-by date
  const bestEnrollBy = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() - 1, 1);

  // Medigap OE: 6 months starting from eligibility month
  const medigapOEStart = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth(), 1);
  const medigapOEEnd = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() + 6, 0);

  // Timeline milestones (relative to eligibility month)
  const twelveMonthsBefore = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() - 12, 1);
  const sixMonthsBefore = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() - 6, 1);
  const threeMonthsBefore = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() - 3, 1);
  const oneToThreeAfterStart = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() + 1, 1);
  const oneToThreeAfterEnd = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() + 3, 1);

  return {
    birthday65,
    eligibilityMonth,
    iepStart,
    iepEnd,
    bestEnrollBy,
    medigapOEStart,
    medigapOEEnd,
    twelveMonthsBefore,
    sixMonthsBefore,
    threeMonthsBefore,
    oneToThreeAfterStart,
    oneToThreeAfterEnd,
    bornOnFirst,
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName = "", month, day, year } = body;

    // Validate inputs
    if (!month || !day || !year || month < 1 || month > 12 || day < 1 || day > 31 || year < 1940 || year > 1975) {
      return NextResponse.json({ error: "Invalid date of birth" }, { status: 400 });
    }

    const dob = new Date(year, month - 1, day);
    const dates = calculateMedicareDates(dob);

    // Load the PDF template
    const templatePath = path.join(process.cwd(), "public", "decision-kit-template.pdf");
    const templateBytes = fs.readFileSync(templatePath);

    // Load the PDF with pdf-lib
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // ============================================================
    // PAGE 5 - Fill form fields (Key Dates worksheet)
    // ============================================================
    const dobFormatted = formatDate(dob);
    const month65Formatted = formatMonthYear(dates.eligibilityMonth);
    const iepBeginsFormatted = formatDate(dates.iepStart);
    const iepEndsFormatted = formatDate(dates.iepEnd);

    const fieldsToFill: Record<string, string> = {
      date_birth: dobFormatted,
      month_65: month65Formatted,
      iep_begins: iepBeginsFormatted,
      iep_ends: iepEndsFormatted,
    };

    for (const [fieldName, value] of Object.entries(fieldsToFill)) {
      try {
        const field = form.getTextField(fieldName);
        field.setText(value);
        field.updateAppearances(font);
      } catch {
        // Field may not exist in this version of the template
      }
    }

    // ============================================================
    // PAGE 1 - Add personalization banner at bottom
    // ============================================================
    const page1 = pdfDoc.getPages()[0];
    const { width: pageWidth } = page1.getSize();
    const bannerY = 48;
    const bannerHeight = 30;
    const bannerText = firstName
      ? `PREPARED FOR: ${firstName.toUpperCase()} | 65TH BIRTHDAY: ${formatDate(dates.birthday65).toUpperCase()}`
      : `65TH BIRTHDAY: ${formatDate(dates.birthday65).toUpperCase()}`;

    // Draw teal banner background
    page1.drawRectangle({
      x: 36,
      y: bannerY,
      width: pageWidth - 72,
      height: bannerHeight,
      color: rgb(0.129, 0.588, 0.533),
    });

    // Draw white text centered on banner
    const fontSize = 9;
    const textWidth = fontBold.widthOfTextAtSize(bannerText, fontSize);
    page1.drawText(bannerText, {
      x: 36 + (pageWidth - 72 - textWidth) / 2,
      y: bannerY + 11,
      size: fontSize,
      font: fontBold,
      color: rgb(1, 1, 1),
    });

    // ============================================================
    // PAGE 3 - Add personalized month/year labels to timeline
    // ============================================================
    const page3 = pdfDoc.getPages()[2];
    const labelFontSize = 8;
    const labelColor = rgb(0.35, 0.35, 0.35);

    const timelineLabels = [
      { text: `(${formatMonthYear(dates.twelveMonthsBefore)})`, y: 643 },
      { text: `(${formatMonthYear(dates.sixMonthsBefore)})`, y: 544 },
      { text: `(${formatMonthYear(dates.threeMonthsBefore)})`, y: 442 },
      { text: `(${formatMonthYear(dates.eligibilityMonth)})`, y: 340 },
      { text: `(${formatMonthYear(dates.oneToThreeAfterStart)} - ${formatMonthYear(dates.oneToThreeAfterEnd)})`, y: 237 },
    ];

    for (const label of timelineLabels) {
      page3.drawText(label.text, {
        x: 270,
        y: label.y,
        size: labelFontSize,
        font,
        color: labelColor,
      });
    }

    // ============================================================
    // PAGE 14 - Remove QR code by covering with white rectangle
    // ============================================================
    const page14 = pdfDoc.getPages()[13];
    page14.drawRectangle({
      x: 462,
      y: 222,
      width: 115,
      height: 110,
      color: rgb(0.145, 0.208, 0.318),
    });

    // Flatten the form so filled fields appear as static text in all viewers
    form.flatten();

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();
    const base64 = Buffer.from(pdfBytes).toString("base64");

    return NextResponse.json({
      pdf: base64,
      filename: `Medicare_Decision_Kit_${firstName || "Personalized"}.pdf`,
      dates: {
        birthday65: formatDate(dates.birthday65),
        iepStart: formatDate(dates.iepStart),
        iepEnd: formatDate(dates.iepEnd),
        eligibilityMonth: formatMonthYear(dates.eligibilityMonth),
        medigapOEEnd: formatDate(dates.medigapOEEnd),
        bestEnrollBy: formatMonthYear(dates.bestEnrollBy),
      },
    });
  } catch (error) {
    console.error("Decision Kit generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
