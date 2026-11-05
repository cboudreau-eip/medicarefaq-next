from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor,white
from reportlab.lib.utils import simpleSplit
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/pdf/medicarefaq-ma-oep-prescription-workbook.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(OUT),pagesize=(612,792))
c.setTitle('Medicare Advantage OEP 2027 - Prescription Cost Workbook')
c.setAuthor('MedicareFAQ / Elite Insurance Partners')
NAVY=HexColor('#183458'); TEAL=HexColor('#007F78'); GRAY=HexColor('#536374'); LINE=HexColor('#B9C5CF'); PALE=HexColor('#F0F6F8')
def text(x,y,s,size=12,bold=False,color=NAVY):
 c.setFillColor(color);c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,y,s)
def para(s,y):
 for line in simpleSplit(s,'Helvetica',12,528):text(42,y,line);y-=16
 return y
def rule(y,x=42,w=528):
 c.setStrokeColor(LINE);c.setLineWidth(.6);c.line(x,y,x+w,y)
def field(label,y):text(42,y,label);rule(y-20)
def header(n,title,subtitle):
 c.setFillColor(NAVY);c.rect(0,682,612,110,fill=1,stroke=0)
 text(42,758,'MEDICAREFAQ / OEP 2027 / REVIEW DRAFT',12,True,white)
 text(42,724,title,23,True,white);text(42,700,subtitle,12,color=white)
 rule(49);text(42,34,f'D4 | v1.0 | Sources checked Nov. 4, 2026 | Page {n} of 3',10,color=GRAY)
 text(42,20,'MedicareFAQ / Elite Insurance Partners - not a government agency',10,color=GRAY)
def table(top,rows):
 xs=[42,258,362,466,570]
 c.setFillColor(TEAL);c.rect(42,top-30,528,30,fill=1,stroke=0)
 for x,label in zip(xs,['Compare','Current A','Option B','Option C']):text(x+7,top-20,label,12,True,white)
 y=top-30
 for label,h in rows:
  c.setFillColor(PALE);c.rect(42,y-h,216,h,fill=1,stroke=0)
  lines=simpleSplit(label,'Helvetica',12,200);assert len(lines)*14+12<=h,(label,lines,h)
  for i,line in enumerate(lines):text(49,y-18-i*14,line)
  c.setStrokeColor(LINE);c.setLineWidth(.6)
  for x in xs:c.line(x,y,x,y-h)
  c.line(42,y-h,570,y-h);y-=h
 return y
header(1,'Prescription Cost Workbook','Start with your current medication list. Keep completed pages private.')
para('Copy the prescription details you use now; do not change medicines or doses for this worksheet. Ask your prescriber or pharmacist if a detail is unclear.',658)
field('List reviewed on / comparison plan year:',607)
for n,y in [(1,551),(2,395),(3,239)]:
 text(42,y,f'MEDICATION {n}',13,True,TEAL)
 field('Name / brand or generic / form (tablet, inhaler, etc.):',y-25)
 field('Strength / dose and frequency:',y-67)
 field('Quantity per fill / days supplied / refill frequency:',y-109)
para('Print extra copies for additional medicines. Use one copy of page 2 per medication and pharmacy comparison. Do not upload your completed workbook.',86)
c.showPage()
header(2,'Check Coverage and Pharmacy','Repeat this page for each medication. Use the same supply for all options.')
field('Medication / strength / quantity / days supplied:',658)
para('Use Yes, No, or Unknown for each coverage rule. A drug listing or tier alone does not mean unrestricted access. Keep unknown separate from not covered.',609)
table(564,[
 ('Exact plan name / ID / year',40),
 ('Pharmacy name / address / retail or mail order',54),
 ('Pharmacy status: preferred / standard / out of network / unknown',54),
 ('Drug covered? Yes / No / Unknown. Tier:',40),
 ('Prior authorization? Step therapy? Quantity limit? (each: Yes / No / Unknown)',54),
 ('Price for this supply / estimate source / date',40),
 ('Other pharmacy checked / location / status / price',54),
 ('Unresolved rule / prescriber or plan follow-up',40),
])
para('Record exact plan and pharmacy details. Use another copy if you need more room. Ask the plan and prescriber about restrictions before changing coverage.',85)
c.showPage()
header(3,'Estimate and Transfer Costs','Use the same comparison period, medicines, and supply assumptions.')
field('Plan names: A __________________ B ______________ C ______________',658)
para('Period: __________________________  Months remaining: ______  Year: ______',612)
para('Use totals for all medicines over the same period; a single fill price may not represent annual costs. Check whether premiums and deductibles are included.',589)
table(545,[
 ('Drug cost estimate for period / source and date',40),
 ('Premium included? Yes / No / Unknown. Premium amount:',40),
 ('Deductible already included? Yes / No / Unknown',40),
 ('Covered-drug cost sharing only: exclude premiums',40),
 ('Noncovered drug expenses: keep separate',40),
 ('Unresolved assumptions / next action / owner',40),
 ('Covered-drug subtotal for comparison sheet (unknown if not separable)',54),
])
para("Transfer this subtotal to the comparison sheet's drug row. Record premiums and noncovered costs separately, once. Do not add a deductible already included.",202)
para('Fictional example only: Medication X, invented 10 mg tablet, one daily, 30 per fill. Assume 12 fills, fixed costs of $30 / $20 / $50 for A / B / C, and no other drug charges: $360 / $240 / $600. These are not real prices.',150)
text(42,76,'Official resources:',12,True)
for x,label,url,w in [(156,'Drug costs','https://www.medicare.gov/health-drug-plans/part-d/basics/costs',72),(260,'Coverage rules','https://www.medicare.gov/health-drug-plans/part-d/what-drug-plans-cover/plan-rules',100),(395,'Plan Compare','https://www.medicare.gov/plan-compare/',96)]:
 text(x,76,label,12,color=TEAL);c.linkURL(url,(x,73,x+w,89),relative=0)
c.save()
(ROOT/'src/assets/oep-2027/prescription-workbook.pdf').write_bytes(OUT.read_bytes())
print(OUT)
