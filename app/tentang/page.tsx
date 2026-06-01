import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

const description =
  "Profil, visi & misi, serta legalitas resmi PT Aset Nusantara Internasional — institusi pemulihan dan pemanfaatan aset bangsa.";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description,
  alternates: { canonical: "/tentang" },
  openGraph: { title: "Tentang Kami", description, url: "/tentang", type: "website" },
};

export default function TentangPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Tentang Kami"
        title="Mengenal PT Aset Nusantara Internasional"
        description="Institusi terpercaya dalam pemulihan dan pemanfaatan aset, berlandaskan legalitas, transparansi, dan nilai kebangsaan."
      />
      <AboutSection />
      <WhyUsSection />
    </main>
  );
}
