from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor,white
from reportlab.lib.utils import simpleSplit
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/pdf/medicarefaq-ma-oep-provider-verification-sheet.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(OUT),pagesize=(612,792))
c.setTitle('Medicare Advantage OEP 2027 - Provider Verification Sheet')
c.setAuthor('MedicareFAQ / Elite Insurance Partners')
NAVY=HexColor('#183458'); TEAL=HexColor('#007F78'); GRAY=HexColor('#536374'); LINE=HexColor('#B9C5CF'); PALE=HexColor('#F0F6F8')
def text(x,y,s,size=12,bold=False,color=NAVY):
 c.setFillColor(color);c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,y,s)
def para(s,y,x=42,w=528):
 for line in simpleSplit(s,'Helvetica',12,w):text(x,y,line);y-=16
 return y
def rule(y,x=42,w=528):
 c.setStrokeColor(LINE);c.setLineWidth(.6);c.line(x,y,x+w,y)
def field(label,y,x=42,w=528):
 text(x,y,label);rule(y-20,x,w)
def header(n,title):
 c.setFillColor(NAVY);c.rect(0,682,612,110,fill=1,stroke=0)
 text(42,758,'MEDICAREFAQ / OEP 2027 / REVIEW DRAFT',12,True,white)
 text(42,724,title,23,True,white)
 text(42,700,'One provider or facility, one location, one exact plan per copy.',12,color=white)
 rule(49);text(42,34,f'D3 | v1.0 | Sources checked Nov. 4, 2026 | Page {n} of 2',10,color=GRAY)
 text(42,20,'MedicareFAQ / Elite Insurance Partners - not a government agency',10,color=GRAY)
def status(x,y):
 for dx,label in [(0,'Yes'),(61,'No'),(116,'Unknown')]:
  c.setStrokeColor(GRAY);c.rect(x+dx,y-1,9,9,fill=0,stroke=1);text(x+dx+14,y,label)
header(1,'Provider Verification Sheet')
para('Ask about the exact plan, year, and location - not just the insurer. Accepting Original Medicare does not establish a Medicare Advantage network match.',659)
field('Plan name / contract and plan ID:',608)
field('Plan type:',564,w=250);field('Plan year:',564,x=320,w=250)
field('Provider name / specialty or hospital / facility:',520)
field('Exact street address / location:',476)
field('Directory URL or document / date checked:',432)
text(42,390,'Directory result:',12,True);text(160,390,'Listed / Not listed / Unclear (circle one)')
# Parallel source records. Print another copy for each additional provider.
for x,title in [(42,'PROVIDER OFFICE'),(320,'INSURANCE PLAN')]:
 c.setFillColor(PALE);c.roundRect(x-8,72,266,292,7,fill=1,stroke=0)
 text(x,343,title,13,True,TEAL)
 field('Contact date / channel:',316,x,250)
 field('Person / role or reference number:',271,x,250)
 text(x,224,'In network for this exact plan?',12,True);status(x,203)
 text(x,174,'Accepting new patients?',12,True);status(x,153)
 text(x,121,'Notes / confirmation details:',12);rule(98,x,250);rule(80,x,250)
c.showPage()
header(2,'Resolve Conflicting Answers')
field('Provider / location / exact plan (same as page 1):',658)
field('Referral or authorization requirements / source and date:',611)
rule(571)
text(42,545,'DISCREPANCY AND FOLLOW-UP LOG',13,True,TEAL)
field('What is inconsistent or still unknown?',520)
rule(480);rule(460)
field('Next action / person responsible:',434)
field('Follow-up date:',389,w=250);field('Plan reference number:',389,x=320,w=250)
field('Resolution / source / confirmation date:',344)
rule(304)
text(42,279,'Final status (circle): Verified / Not checked / Unresolved',12,True)
para('Keep new-patient acceptance separate from network status. Ask the office directly about availability. If answers conflict, ask the plan to clarify the exact provider and location; retain its written response or reference number.',251)
para('A confirmation records what you were told on that date. It is not a guarantee of future network participation, authorization, or payment. Keep Medicare numbers, diagnoses, and other sensitive patient details off this sheet.',176)
text(42,107,'Official resources (clickable):',12,True)
for x,label,url,w in [(42,'Compare plan types','https://www.medicare.gov/health-drug-plans/health-plans/your-coverage-options/compare',132),(210,'Joining a plan','https://www.medicare.gov/sign-up-change-plans/joining-a-health-or-drug-plan',96),(346,'Free SHIP counseling','https://www.shiphelp.org/',148)]:
 text(x,82,label,12,color=TEAL);c.linkURL(url,(x,79,x+w,95),relative=0)
c.save()
asset=ROOT/'src/assets/oep-2027/provider-verification-sheet.pdf';asset.write_bytes(OUT.read_bytes())
print(OUT)
