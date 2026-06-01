import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  const formatted = new Date(article.date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group flex h-full flex-col rounded-lg border border-gold-heritage/20 bg-navy-elevated p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-heritage hover:shadow-lg hover:shadow-gold-heritage/10"
    >
      <p className="text-xs uppercase tracking-wider text-gold-heritage">{formatted}</p>
      <h3 className="mt-3 font-display text-xl text-cream">{article.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-muted">{article.excerpt}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold-heritage">
        Baca selengkapnya
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
