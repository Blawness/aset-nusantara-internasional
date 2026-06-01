import { COMPANY_INFO } from "@/lib/constants";
import type { Article } from "@/lib/articles";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://asetnusantarainternasional.com";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered, static data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + WebSite graph — emitted once site-wide for rich results. */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY_INFO.name,
        url: SITE_URL,
        logo: `${SITE_URL}/logo-ani.webp`,
        image: `${SITE_URL}/opengraph-image`,
        description:
          "Institusi pemulihan dan pemanfaatan aset bangsa — bergerak, tidak bergerak, warisan, sitaan negara, dan collateral. Terdaftar resmi Kemenkumham RI.",
        foundingDate: String(COMPANY_INFO.foundedYear),
        email: COMPANY_INFO.email,
        telephone: COMPANY_INFO.phone,
        taxID: COMPANY_INFO.npwp,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kompleks Perkantoran Bank Indonesia, RT. 001 / RW. 002, Gambir",
          addressLocality: "Jakarta Pusat",
          addressRegion: "DKI Jakarta",
          postalCode: "10110",
          addressCountry: "ID",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: COMPANY_INFO.phone,
          email: COMPANY_INFO.email,
          contactType: "customer service",
          areaServed: "ID",
          availableLanguage: ["id", "Indonesian"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY_INFO.name,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "id-ID",
      },
    ],
  };
  return <JsonLd data={data} />;
}

/** Article schema for blog/article detail pages. */
export function ArticleJsonLd({ article }: { article: Article }) {
  const url = `${SITE_URL}/artikel/${article.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "id-ID",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: COMPANY_INFO.name, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-ani.webp` },
    },
  };
  return <JsonLd data={data} />;
}
