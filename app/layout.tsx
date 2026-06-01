import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { COMPANY_INFO } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

const SITE_NAME = COMPANY_INFO.name;
const DESCRIPTION =
  "PT Aset Nusantara Internasional — institusi terpercaya dalam pemulihan dan pemanfaatan aset bergerak, tidak bergerak, warisan, sitaan negara, dan collateral bangsa. Terdaftar resmi Kemenkumham RI.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://asetnusantarainternasional.com"),
  title: {
    default: "PT Aset Nusantara Internasional | Pemulihan & Pemanfaatan Aset Bangsa",
    template: "%s | PT Aset Nusantara Internasional",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "pemulihan aset",
    "pemanfaatan aset",
    "aset negara",
    "aset bergerak",
    "aset tidak bergerak",
    "aset sitaan negara",
    "aset collateral",
    "bank likuidasi",
    "pengelolaan aset",
    "PT Aset Nusantara Internasional",
    "Kemenkumham",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    title: "PT Aset Nusantara Internasional | Pemulihan & Pemanfaatan Aset Bangsa",
    description: "Pemulihan dan pemanfaatan aset bangsa dengan integritas dan legalitas resmi.",
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Aset Nusantara Internasional",
    description: "Pemulihan dan pemanfaatan aset bangsa dengan integritas dan legalitas resmi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <OrganizationJsonLd />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
