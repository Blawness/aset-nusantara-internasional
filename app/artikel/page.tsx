import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ARTICLES } from "@/lib/articles";

const description =
  "Artikel dan wawasan seputar pemulihan, pemanfaatan, dan tata kelola aset oleh PT Aset Nusantara Internasional.";

export const metadata: Metadata = {
  title: "Artikel & Wawasan",
  description,
  alternates: { canonical: "/artikel" },
  openGraph: { title: "Artikel & Wawasan", description, url: "/artikel", type: "website" },
};

export default function ArtikelPage() {
  const articles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main>
      <PageHeader
        eyebrow="Artikel & Wawasan"
        title="Artikel & Wawasan"
        description="Pandangan dan informasi seputar dunia pengelolaan aset."
      />
      <section className="mx-auto max-w-6xl px-6 py-24">
        {articles.length === 0 ? (
          <p className="text-center text-cream-muted">Artikel akan segera hadir.</p>
        ) : (
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <StaggerItem key={a.slug}>
                <ArticleCard article={a} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </main>
  );
}
