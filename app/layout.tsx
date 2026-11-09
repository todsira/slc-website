import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL('https://slc.co.th'),
  title: "โรงโม่หินศิลาชัยเจริญ | ผลิตภัณฑ์หิน ราคา และการติดต่อ",
  description: "เลือกหินให้เหมาะกับงานก่อสร้าง ดูรายการราคาจากโรงโม่หินศิลาชัยเจริญ พร้อมข้อมูลติดต่อและเส้นทาง",
  icons: { icon: "/favicon.svg?v=dd447d1f" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="th"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700;800&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}
