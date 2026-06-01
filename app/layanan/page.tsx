import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";

const description =
  "Lima kategori layanan pengelolaan aset: aset bergerak, tidak bergerak, warisan, sitaan negara/bank likuidasi, dan collateral bangsa.";

export const metadata: Metadata = {
  title: "Layanan",
  description,
  alternates: { canonical: "/layanan" },
  openGraph: { title: "Layanan", description, url: "/layanan", type: "website" },
};

export default function LayananPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Layanan Kami"
        title="Lima Kategori Pengelolaan Aset"
        description="Solusi menyeluruh untuk pemulihan dan pemanfaatan aset, dijalankan secara profesional dan sesuai hukum."
      />
      <ServicesSection />
      <CTASection />
    </main>
  );
}
