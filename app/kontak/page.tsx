import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactSection } from "@/components/sections/ContactSection";

const description =
  "Hubungi PT Aset Nusantara Internasional — alamat kantor, telepon, email, dan form inquiry.";

export const metadata: Metadata = {
  title: "Kontak",
  description,
  alternates: { canonical: "/kontak" },
  openGraph: { title: "Kontak", description, url: "/kontak", type: "website" },
};

export default function KontakPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Kontak"
        title="Hubungi Kami"
        description="Sampaikan kebutuhan Anda terkait pengelolaan dan pemulihan aset. Tim kami akan merespons secepatnya."
      />
      <ContactSection />
    </main>
  );
}
