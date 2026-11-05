from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import simpleSplit
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/pdf/medicarefaq-ma-oep-plan-review-checklist.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(OUT),pagesize=(612,792))
c.setTitle('Medicare Advantage OEP 2027 - Plan Review Checklist')
c.setAuthor('MedicareFAQ / Elite Insurance Partners')
NAVY=HexColor('#183458'); TEAL=HexColor('#007F78'); GRAY=HexColor('#536374'); LINE=HexColor('#B9C5CF')
def text(x,y,s,size=12,bold=False,color=NAVY):
 c.setFillColor(color); c.setFont('Helvetica-Bold' if bold else 'Helvetica',size); c.drawString(x,y,s)
def para(s,y,width=516,size=12,color=NAVY):
 for line in simpleSplit(s,'Helvetica',size,width):
  text(48,y,line,size,color=color); y-=16
 return y

def rule(y,x=48,w=516):
 c.setStrokeColor(LINE); c.setLineWidth(.6); c.line(x,y,x+w,y)
def field(label,y,x=48,w=516):
 text(x,y,label,12); rule(y-19,x,w)
def header(page,title,sub):
 c.setFillColor(NAVY); c.rect(0,670,612,122,fill=1,stroke=0)
 text(48,757,'MEDICAREFAQ  /  OEP 2027',12,True,white)
 text(48,724,title,24,True,white)
 text(48,697,sub,12,color=white)
 text(48,649,'REVIEW DRAFT  |  Printable worksheet - not an enrollment application',12,True,TEAL)
 rule(54)
 text(48,38,'D1 | v1.0 | Sources checked Nov. 4, 2026 | Page '+str(page)+' of 2',10,color=GRAY)
 text(48,23,'MedicareFAQ / Elite Insurance Partners - not a government agency',10,color=GRAY)
def section(n,title,y):
 c.setFillColor(TEAL); c.circle(59,y+4,11,fill=1,stroke=0)
 text(55,y,str(n),12,True,white); text(78,y,title,15,True)
def check(label,y):
 text(48,y,label,12,True)
 for x,s in [(48,'Yes'),(123,'No'),(191,'Not checked')]:
  c.setStrokeColor(GRAY); c.setLineWidth(.8); c.rect(x,y-24,10,10,fill=0,stroke=1); text(x+16,y-23,s,12)
 text(318,y-23,'Notes:',12,color=GRAY); rule(y-26,360,204)
header(1,'Plan Review Checklist','Medicare Advantage Open Enrollment | January 1 - March 31, 2027')
para('For current Medicare Advantage members reviewing coverage. Work through each step; mark unverified items "Not checked." Keep this completed sheet private. Do not write your Medicare number here.',622)
section(1,'Identify your coverage and goals',554)
field('Current plan name:',527)
field('Contract / plan ID (if known):',480,w=322); field('Plan year:',480,x=391,w=173)
field('Review date:',433,w=170); field('Reason for reviewing coverage:',433,x=245,w=319)
field('Desired path: keep plan / another MA plan / Original Medicare',386)
section(2,'Confirm before comparing',339)
check('I confirmed an enrollment opportunity for my proposed change.',312)
field('Verified with (source or contact) and date:',260)
check('I gathered plan documents and my coverage questions.',211)
check('I checked my doctors and hospitals for the exact plan.',154)
para('If answers conflict, leave the check unresolved and record the next action on page 2. You do not have to change plans just because you review them.',96,size=12)
c.showPage()
header(2,'Finish Your Plan Review','Continue from page 1 | Keep requested and confirmed dates separate')
section(3,'Check coverage and costs',618)
check('I reviewed medications, coverage rules, and pharmacies.',588)
check('I estimated premiums and other expected out-of-pocket costs.',535)
check('I checked benefits, limits, referrals, and prior authorizations.',482)
check('If leaving MA, I checked drug coverage and Medigap options.',429)
para('For the last item, note "not applicable" if staying in MA. MA OEP does not itself guarantee acceptance into Medigap; check your rights before changing.',382)
section(4,'Resolve questions and confirm the change',333)
field('Unresolved issue / person responsible / next action:',306)
field('Requested start date:',259,w=244); field('Confirmed start date:',259,x=320,w=244)
check('I saved enrollment confirmation and verified the start date.',208)
check('After a switch, I checked cards, pharmacy, and appointments.',155)
text(48,104,'Official help and rules (clickable):',12,True)
for x,label,url,width in [
 (48,'Joining a plan','https://www.medicare.gov/sign-up-change-plans/joining-a-health-or-drug-plan',96),
 (180,'Medigap timing','https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when',101),
 (328,'Free SHIP counseling','https://www.shiphelp.org/',151)]:
 text(x,83,label,12,color=TEAL); c.linkURL(url,(x,80,x+width,96),relative=0)
c.save()
print(OUT)
