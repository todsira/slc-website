# โรงโม่หินศิลาชัยเจริญ

เว็บไซต์ภาษาไทยสำหรับอ่านรายการราคา ผลิตภัณฑ์ และข้อมูลติดต่อโรงโม่หินศิลาชัยเจริญ รองรับหน้าจอคอมพิวเตอร์และมือถือ

## แก้ไขเนื้อหา

- `app/content.ts` เก็บรายการสินค้า ราคา วันที่อ้างอิง เบอร์โทร อีเมล ที่อยู่ และลิงก์แหล่งข้อมูล
- `app/page.tsx` โครงสร้างหน้าและการทำงานของเมนูมือถือ/ปุ่มคัดลอกที่อยู่
- `app/globals.css` การออกแบบและขนาดหน้าจอ
- `public/assets/` เก็บภาพสำหรับเว็บไซต์

ราคาถอดจากโพสต์ของเพจเฟซบุ๊กที่ระบุอัปเดต 17 เมษายน 2569 ราคาเป็นบาทต่อตัน ชั่งหน้าโรงโม่ ผู้ซื้อรับเอง ไม่รวมค่าขนส่ง ต้องยืนยันราคาปัจจุบันกับโรงโม่ก่อนสั่งซื้อ เว็บไซต์ไม่ได้ดึงราคามาปรับโดยอัตโนมัติ

แหล่งข้อมูลหลัก: https://www.facebook.com/silachaicharoen

## การตรวจสอบ

- `node node_modules/typescript/bin/tsc --noEmit`
- `npm run build`

ตรวจสอบหน้าเว็บบนเดสก์ท็อปและมือถือ รวมทั้งเมนู ปุ่มคัดลอกที่อยู่ ลิงก์โทรศัพท์ อีเมล เฟซบุ๊ก และแผนที่เมื่อแก้ไขเนื้อหา

## Customer self-quotation

`/quotation/` lets customers select multiple products and positive quantities (0.01–100,000 tonnes per product), enter their details, and download a Thai A4 PDF. The home page links to it on desktop and mobile. Prices come from the same `app/content.ts` as the home page. Each line is rounded to two decimal places before summing. Prices are estimates from the 17 April 2026 announcement, excluding transport; VAT inclusion is not verified, so the page and PDF explicitly flag this and do not add an assumed tax.

The form does not submit, email, store, or log customer details. A bundled OFL Thai font and browser canvas generate the PDF locally, without an external PDF service. PDF text is rasterized for Thai shaping, so it is not searchable/selectable. Downloads may open in a viewer on mobile; use the browser's save/share action. No order or legally binding offer is created. Reference IDs are browser-generated, not an official company numbering sequence.

Implementation: `app/quotation/`, `public/fonts/`. Price updates: `app/content.ts`. If VAT, validity, delivery or payment terms are approved later, update both the form and PDF wording together. No signatures or official seals are added automatically.
