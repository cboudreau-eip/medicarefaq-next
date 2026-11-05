from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader, PdfWriter
from pypdf.annotations import Link
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/pdf';OUT.mkdir(parents=True,exist_ok=True)
cover=OUT/'oep-kit-cover.pdf'
c=canvas.Canvas(str(cover),pagesize=(612,792))
navy=HexColor('#183458');teal=HexColor('#007F78');gray=HexColor('#536374')
def text(x,y,s,size=12,bold=False,color=navy):
 c.setFillColor(color);c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,y,s)
def para(s,y):
 for line in simpleSplit(s,'Helvetica',12,516):text(48,y,line);y-=17
 return y
c.setFillColor(navy);c.rect(0,539,612,253,fill=1,stroke=0)
text(48,750,'MEDICAREFAQ / 2027 / REVIEW DRAFT',12,True,white)
text(48,697,'Your OEP',34,True,white);text(48,653,'Plan Review Kit',34,True,white)
text(48,609,'Four practical worksheets. One organized review.',16,color=white)
text(48,576,'Medicare Advantage Open Enrollment resources',12,color=white)
para('For people reviewing Medicare Advantage coverage. Use these worksheets to organize questions and comparisons; they do not determine eligibility or enroll you in a plan.',507)
text(48,429,'CONTENTS',13,True,teal);text(427,429,'KIT PAGE',12,True,teal)
entries=[('Plan Review Checklist',2,'plan-review-checklist.pdf'),('Plan Comparison Worksheet',4,'plan-comparison-worksheet.pdf'),('Provider Verification Sheet',7,'provider-verification-sheet.pdf'),('Prescription Cost Workbook',9,'prescription-workbook.pdf')]
for i,(label,page,_) in enumerate(entries):
 y=389-i*52
 text(48,y,f'0{i+1}',16,True,teal);text(89,y,label,14,True);text(482,y,str(page),14,True)
 c.setStrokeColor(HexColor('#CCD8DF'));c.line(48,y-17,564,y-17)
text(48,168,'HOW TO USE THIS KIT',13,True,teal)
para('Click a title above or use PDF bookmarks. Print at actual size with automatic portrait/landscape orientation. Repeat pages when needed. Worksheet footers keep their original section page numbers.',145)
para('Keep completed worksheets private. No upload or email signup is needed. All four worksheets are review drafts.',83)
text(48,27,'KIT | v1.0 | Assembled Nov. 4, 2026 | 11 pages | MedicareFAQ / Elite Insurance Partners',9,color=gray)
c.save()
w=PdfWriter();w.append(str(cover),import_outline=False)
w.add_outline_item('Cover and contents',0)
for label,page,name in entries:
 r=PdfReader(ROOT/'src/assets/oep-2027'/name)
 assert len(w.pages)==page-1
 w.append(r,import_outline=False);w.add_outline_item(label,page-1)
for i,(_,page,_) in enumerate(entries):
 y=389-i*52
 w.add_annotation(0,Link(rect=(48,y-17,564,y+20),target_page_index=page-1))
w.add_metadata({'/Title':'Medicare Advantage OEP 2027 - Complete Plan Review Kit','/Author':'MedicareFAQ / Elite Insurance Partners','/Subject':'Four planning worksheets - review draft'})
w.page_mode='/UseOutlines'
final=OUT/'medicarefaq-ma-oep-plan-review-kit.pdf'
with final.open('wb') as f:w.write(f)
(ROOT/'src/assets/oep-2027/plan-review-kit.pdf').write_bytes(final.read_bytes())
r=PdfReader(final);assert len(r.pages)==11;assert len(r.outline)==5
for _,page,name in entries:
 src=PdfReader(ROOT/'src/assets/oep-2027'/name)
 for i,p in enumerate(src.pages):
  q=r.pages[page-1+i]
  assert p.get_contents().get_data()==q.get_contents().get_data()
  assert p.mediabox==q.mediabox
  assert p.extract_text()==q.extract_text()
  assert len(p.get('/Annots',[]))==len(q.get('/Annots',[]))
assert [int(a.get_object()['/Dest'][0]) for a in r.pages[0]['/Annots']]==[1,3,6,8]
print('Verified: 11 pages; original worksheet content, sizes, and links retained; 5 bookmarks; 4 correct contents links.')
print(final)
