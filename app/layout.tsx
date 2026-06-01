import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://asetnusantarainternasional.com"),
  title: "PT Aset Nusantara Internasional | Pemulihan & Pemanfaatan Aset Bangsa",
  description:
    "PT Aset Nusantara Internasional — institusi terpercaya dalam pemulihan dan pemanfaatan aset bergerak, tidak bergerak, warisan, sitaan negara, dan collateral bangsa. Terdaftar resmi Kemenkumham RI.",
  openGraph: {
    title: "PT Aset Nusantara Internasional",
    description: "Pemulihan dan pemanfaatan aset bangsa dengan integritas dan legalitas resmi.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
