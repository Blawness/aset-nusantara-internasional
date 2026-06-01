import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ARTICLES } from "@/lib/articles";

export function FeaturedArticles() {
  const featured = ARTICLES.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="bg-navy-elevated py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Artikel & Wawasan</p>
              <h2 className="mt-4 font-display text-3xl text-cream md:text-4xl">Wawasan Terbaru</h2>
            </div>
            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 text-sm text-gold-heritage hover:text-gold-bright"
            >
              Lihat semua artikel
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => (
            <StaggerItem key={a.slug}>
              <ArticleCard article={a} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
