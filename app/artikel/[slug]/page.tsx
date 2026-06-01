import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle, getAllSlugs } from "@/lib/articles";
import { ArticleJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Artikel tidak ditemukan" };
  const url = `/artikel/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArtikelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const formatted = new Date(article.date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <ArticleJsonLd article={article} />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 text-sm text-gold-heritage hover:text-gold-bright"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Artikel
        </Link>

        <p className="mt-8 text-xs uppercase tracking-wider text-gold-heritage">{formatted}</p>
        <h1 className="mt-3 font-display text-3xl text-cream md:text-4xl">{article.title}</h1>
        <div className="mt-6 h-px w-24 bg-gold-heritage" />

        <div className="mt-8 space-y-5">
          {article.body.map((p, i) => (
            <p key={i} className="leading-relaxed text-cream-muted">
              {p}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
