import {content as c} from '../content';
export const money=(n:number)=>new Intl.NumberFormat('th-TH',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
export type Quote={customer:string;address:string;email:string;phone:string;contact:string;rows:{name:string;price:number;tonnes:number}[];date:Date;total:number};
// A4 raster PDF: browser canvas shapes Thai glyphs correctly, with a bundled font.
// No customer data is uploaded, stored, or included in a URL.
export async function downloadQuotation(q:Quote){
 await document.fonts.load('24px QuotationThai');
 if(!document.fonts.check('24px QuotationThai'))throw new Error('Thai font not loaded');
 const W=1240,H=1754,margin=80;const pages:HTMLCanvasElement[]=[];let canvas!:HTMLCanvasElement,ctx!:CanvasRenderingContext2D,y=0;
 const id='SLC-'+q.date.toISOString().slice(0,10).replaceAll('-','')+'-'+crypto.randomUUID().slice(0,8).toUpperCase();
 function newPage(){canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;ctx=canvas.getContext('2d')!;ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);pages.push(canvas);y=80;}
 function text(s:string,x:number,yy:number,size=23,color='#29312c',align:CanvasTextAlign='left'){ctx.font=`${size}px QuotationThai`;ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(s,x,yy);ctx.textAlign='left';}
 function line(s:string,size=23,color='#29312c'){if(y>H-150)newPage();text(s,margin,y,size,color);y+=size*1.65;}
 function wrap(s:string,size=23){ctx.font=`${size}px QuotationThai`;let current='';// Word segmentation preserves Thai vowel/mark clusters; long tokens wrap by grapheme.
 const words=Array.from(new Intl.Segmenter('th',{granularity:'word'}).segment(s.replace(/\r/g,'')),v=>v.segment);
 for(const word of words){if(word.includes('\n')){if(current)line(current,size);current='';continue;}if(ctx.measureText(current+word).width>W-2*margin){if(current)line(current,size);current='';for(const g of new Intl.Segmenter('th',{granularity:'grapheme'}).segment(word)){if(ctx.measureText(current+g.segment).width>W-2*margin){line(current,size);current='';}current+=g.segment;}}else current+=word;}if(current)line(current,size);
 }
 newPage();y=105;ctx.fillStyle='#b62c73';ctx.fillRect(margin,48,W-2*margin,7);
 line('ใบเสนอราคา โรงโม่หินศิลาชัยเจริญ',36,'#a72d6c');line('ใบเสนอราคาเบื้องต้น • กรุณายืนยันกับโรงโม่ก่อนสั่งซื้อ',23,'#9a6634');y+=8;
 wrap(c.address,21);line(`โทร ${c.phone}   อีเมล ${c.email}`,21);line(`เลขอ้างอิง ${id}`,19);line('วันที่ '+q.date.toLocaleDateString('th-TH',{year:'numeric',month:'long',day:'numeric',timeZone:'Asia/Bangkok'}),21);y+=15;
 wrap('ชื่อลูกค้า: '+q.customer);wrap('ที่อยู่: '+q.address);wrap('ชื่อผู้ติดต่อ: '+q.contact);wrap('เบอร์โทรติดต่อ: '+q.phone);wrap('อีเมล์: '+q.email);y+=25;
 function tableHead(){if(y>H-230)newPage();ctx.fillStyle='#f7edf2';ctx.fillRect(margin,y-29,W-2*margin,53);text('รายการสินค้า',margin+15,y);text('จำนวน (ตัน)',680,y,21,'#29312c','right');text('บาท / ตัน',890,y,21,'#29312c','right');text('จำนวนเงิน (บาท)',W-margin-12,y,21,'#29312c','right');y+=59;}
 tableHead();q.rows.forEach((r,i)=>{if(y>H-180){newPage();tableHead();}text(`${i+1}. ${r.name}`,margin+15,y);text(money(r.tonnes),680,y,22,'#29312c','right');text(money(r.price),890,y,22,'#29312c','right');text(money(Math.round(r.tonnes*r.price*100)/100),W-margin-12,y,22,'#29312c','right');ctx.strokeStyle='#e1e3de';ctx.beginPath();ctx.moveTo(margin,y+20);ctx.lineTo(W-margin,y+20);ctx.stroke();y+=57;});
 if(y>H-430)newPage();y+=15;line('รวมค่าสินค้าเบื้องต้น: '+money(q.total)+' บาท',29,'#a72d6c');y+=12;
 wrap(c.priceDate+' • ราคาเป็นบาท/ตัน ชั่งน้ำหนักหน้าโรงโม่ รับสินค้าเอง ไม่รวมค่าขนส่ง',21);
 wrap('VAT: ยังไม่ได้ยืนยันว่าราคารวมหรือไม่รวมภาษี จึงไม่ได้คำนวณภาษีเพิ่ม กรุณายืนยันราคาปัจจุบัน ภาษี และเงื่อนไขกับโรงโม่ก่อนสั่งซื้อ',21);
 wrap('เอกสารนี้สร้างโดยลูกค้าเพื่อประมาณการเท่านั้น ไม่ใช่การยืนยันคำสั่งซื้อ การจองสินค้า หรือใบกำกับภาษี ไม่มีการกำหนดอายุราคาและเงื่อนไขชำระเงินโดยอัตโนมัติ',21);
 wrap('ข้อมูลลูกค้าไม่ได้ส่งให้โรงโม่ กรุณาติดต่อโรงโม่หากต้องการยืนยันใบเสนอราคา',21);
 pages.forEach((p,i)=>{const ct=p.getContext('2d')!;ct.font='18px QuotationThai';ct.fillStyle='#888';ct.fillText(`โรงโม่หินศิลาชัยเจริญ  •  ${id}`,margin,H-65);ct.textAlign='right';ct.fillText(`หน้า ${i+1} / ${pages.length}`,W-margin,H-65);});
 const blob=makePdf(pages.map(p=>Uint8Array.from(atob(p.toDataURL('image/jpeg',0.94).split(',')[1]),s=>s.charCodeAt(0))),W,H);
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=id+'.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
export function makePdf(images:Uint8Array[],width:number,height:number){
 const encode=(s:string)=>new TextEncoder().encode(s);const chunks:Uint8Array[]=[];let offset=0;const offsets:number[]=[0];
 function add(value:Uint8Array|string){const bytes=typeof value==='string'?encode(value):value;chunks.push(bytes);offset+=bytes.length;}
 function obj(n:number,body:string){offsets[n]=offset;add(`${n} 0 obj\n${body}\nendobj\n`);}
 add('%PDF-1.4\n');obj(1,'<< /Type /Catalog /Pages 2 0 R >>');obj(2,`<< /Type /Pages /Count ${images.length} /Kids [${images.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] >>`);
 images.forEach((bytes,i)=>{const n=3+i*3;obj(n,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ${n+1} 0 R >> >> /Contents ${n+2} 0 R >>`);offsets[n+1]=offset;add(`${n+1} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`);add(bytes);add('\nendstream\nendobj\n');const draw='q 595.28 0 0 841.89 0 0 cm /Im0 Do Q';obj(n+2,`<< /Length ${encode(draw).length} >>\nstream\n${draw}\nendstream`);});
 const start=offset;add(`xref\n0 ${offsets.length}\n0000000000 65535 f \n`);offsets.slice(1).forEach(n=>add(`${String(n).padStart(10,'0')} 00000 n \n`));add(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`);return new Blob(chunks as BlobPart[],{type:'application/pdf'});
}
