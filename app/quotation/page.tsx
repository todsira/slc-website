import type { Metadata } from 'next';
import Quotation from './quotation';
export const metadata: Metadata = {title:'ใบเสนอราคา โรงโม่หินศิลาชัยเจริญ',description:'เลือกสินค้าและจำนวนตัน เพื่อดาวน์โหลดใบเสนอราคาเบื้องต้นเป็น PDF'};
export default function Page(){return <Quotation/>}
