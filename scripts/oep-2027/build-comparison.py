from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor,white
from reportlab.lib.utils import simpleSplit
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/pdf/medicarefaq-ma-oep-plan-comparison-worksheet.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(OUT),pagesize=(792,612))
c.setTitle('Medicare Advantage OEP 2027 - Plan Comparison Worksheet')
c.setAuthor('MedicareFAQ / Elite Insurance Partners')
NAVY=HexColor('#183458'); TEAL=HexColor('#007F78'); GRAY=HexColor('#536374'); LINE=HexColor('#B9C5CF'); PALE=HexColor('#F0F6F8')
X=[36,270,432,594,756]
def text(x,y,s,size=12,bold=False,color=NAVY):
 c.setFillColor(color);c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,y,s)
def para(s,y,width=720,size=12):
 for line in simpleSplit(s,'Helvetica',size,width):text(36,y,line,size);y-=15
 return y
def header(page,title,sub):
 c.setFillColor(NAVY);c.rect(0,512,792,100,fill=1,stroke=0)
 text(36,584,'MEDICAREFAQ / OEP 2027 / REVIEW DRAFT',12,True,white)
 text(36,550,title,24,True,white);text(36,528,sub,12,color=white)
 c.setStrokeColor(LINE);c.line(36,44,756,44)
 text(36,29,f'D2 | v1.0 | Sources checked Nov. 4, 2026 | Page {page} of 3',10,color=GRAY)
 text(36,15,'MedicareFAQ / Elite Insurance Partners - not a government agency. Keep completed sheets private.',10,color=GRAY)
def table(top,rows):
 c.setFillColor(TEAL);c.rect(36,top-30,720,30,fill=1,stroke=0)
 for x,t in zip(X,['Review item','Current plan A','Alternative B','Alternative C']):text(x+9,top-20,t,12,True,white)
 y=top-30
 for label,h in rows:
  c.setFillColor(PALE);c.rect(36,y-h,234,h,fill=1,stroke=0)
  lines=simpleSplit(label,'Helvetica',12,215)
  assert len(lines)*14+12<=h,(label,h,lines)
  for i,line in enumerate(lines):text(45,y-18-i*14,line)
  c.setStrokeColor(LINE);c.setLineWidth(.5)
  c.line(36,y-h,756,y-h)
  for x in X:c.line(x,y,x,y-h)
  y-=h
 return y
header(1,'Compare Your Plan Options','Use the same three plan columns on all pages. This is not an application or recommendation.')
para('Start with the exact plan, year, county, and quote date. Do not enter your Medicare number. For coverage checks,',491)
para('write Verified, Not checked, or Conflicting; include your source and date. Unknown does not mean $0.',475)
table(457,[
 ('Exact plan name / contract and plan ID / plan type (e.g., HMO or PPO)',45),
 ('Plan year / county and ZIP / quote date',38),
 ('Doctors and hospitals: exact location and network status / source and date',48),
 ('Drugs: coverage, rules, issues / source and date',48),
 ('Pharmacy location / network status / source and date',48),
 ('Referrals / authorizations / treatment: source and date',48),
 ('Extra benefits: eligibility, limits, and rules / source and date',48),
])
para('Confirm information for the exact plan, not just the insurer. Record conflicting answers on page 3.',83)
para('Use the provider and prescription worksheets for detailed checks when available.',66)
c.showPage()
header(2,'Compare Expected Costs','Plan names: A __________________  B __________________  C __________________')
para('Comparison dates: __________________________  Months: ______  Use the same services and period for all plans.',491)
para('Add only non-overlapping estimates. Check whether a quote or tool total already includes premiums.',475)
table(457,[
 ('Monthly plan premium / drug premium included? Yes, No, or Unknown',42),
 ('A. Plan premium for this period (monthly premium x months)',42),
 ('B. Expected medical cost sharing (deductibles, copays, coinsurance)',42),
 ('C. Expected drug cost sharing (no premiums; use drug worksheet)',42),
 ('D. Expected noncovered expenses',35),
 ('Estimated subtotal: A + B + C + D (unknown items stay unknown)',42),
 ('Part B premium and any other premiums or surcharges, separately',42),
 ('Source / date / assumptions / premiums already included',42),
])
para('Do not add a deductible twice if it is already in a cost estimate. The subtotal is not your entire Medicare budget.',78)
para('Record Part B and other premiums separately; account for each once when reviewing your full budget.',61)
c.showPage()
header(3,'Check Limits and Tradeoffs','Plan names: A __________________  B __________________  C __________________')
para('Limits below describe financial exposure; do not add them to expected costs. Verify plan-year amounts and rules.',491)
table(473,[
 ('Medical limits: in-network / combined, if applicable',43),
 ('Drug out-of-pocket threshold / year (separate from medical)',43),
 ('Which costs count toward each limit? Source / verification date',43),
 ('Priority fit: must-have needs met? Remaining tradeoffs?',43),
 ('Unresolved questions / next action / person responsible / follow-up date',54),
 ('Decision: keep current / consider / pending. Reason for decision',43),
])
para('A lower estimate alone does not establish a better fit. Resolve provider, drug, and eligibility questions first.',152)
para('Fictional 12-month example (noncovered costs $0): A: $20 x 12 + $900 + $360 = $1,500;',134)
para('B: $35 x 12 + $700 + $240 = $1,360; C: $0 x 12 + $1,400 + $600 = $2,000. Part B excluded.',118)
para('B has the lowest subtotal but hospital access is unresolved, so the decision stays pending. These are not quotes.',102)
text(36,77,'Official resources:',12,True)
for x,label,url,w in [(150,'Compare plan types','https://www.medicare.gov/health-drug-plans/health-plans/your-coverage-options/compare',132),(310,'Medicare Plan Compare','https://www.medicare.gov/plan-compare/',159),(495,'Joining a plan','https://www.medicare.gov/sign-up-change-plans/joining-a-health-or-drug-plan',100)]:
 text(x,77,label,12,color=TEAL);c.linkURL(url,(x,74,x+w,89),relative=0)
c.save()
asset=ROOT/'src/assets/oep-2027/plan-comparison-worksheet.pdf';asset.parent.mkdir(parents=True,exist_ok=True);asset.write_bytes(OUT.read_bytes())
print(OUT)
