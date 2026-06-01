# Multi-Page Migration + Artikel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the single-page company profile to a multi-page App Router site (Beranda, Tentang, Layanan, Artikel, Kontak) while keeping the homepage rich/"meriah" and the Heritage Authority styling consistent across all pages.

**Architecture:** Move Header/Footer into root `app/layout.tsx` so every page shares them. Reuse existing section components on dedicated routes. Convert Header nav from anchor links to `next/link` route links with active state via `usePathname`. Add an Artikel list + detail route backed by a simple typed data module (`lib/articles.ts`) that is easy to swap for MDX/CMS later.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, Framer Motion, lucide-react, pnpm, Vitest.

**Reference spec:** `docs/superpowers/specs/2026-06-01-multipage-migration-design.md`

**Existing reusable components (do NOT rewrite):** `components/sections/{HeroSection,TrustBar,AboutSection,ServicesSection,WhyUsSection,ContactSection}.tsx`, `components/layout/{Header,Footer}.tsx`, `components/motion/*`, `lib/constants.ts` (`COMPANY_INFO`, `SERVICES`, `WHY_US`, `NAV_LINKS`).

---

## File Structure

```
app/layout.tsx          MODIFY — render Header + children + Footer
app/page.tsx            MODIFY — Beranda (rich overview), no Header/Footer
app/tentang/page.tsx    CREATE — Tentang page
app/layanan/page.tsx    CREATE — Layanan page
app/kontak/page.tsx     CREATE — Kontak page
app/artikel/page.tsx    CREATE — Artikel list
app/artikel/[slug]/page.tsx  CREATE — Artikel detail (generateStaticParams + generateMetadata)
components/layout/Header.tsx       MODIFY — next/link, +Artikel, active state, CTA→/kontak
components/layout/Footer.tsx       MODIFY — quick links to routes
components/layout/PageHeader.tsx   CREATE — inner-page title header w/ top padding
components/sections/CTASection.tsx       CREATE — reusable gold call-to-action band
components/sections/AboutTeaser.tsx      CREATE — short about blurb + link to /tentang (homepage)
components/sections/FeaturedArticles.tsx CREATE — latest-articles strip (homepage)
components/articles/ArticleCard.tsx      CREATE — article card
lib/articles.ts         CREATE — Article type, ARTICLES[], getArticle, getAllSlugs
lib/articles.test.ts    CREATE — unit tests for helpers
```

NAV model update: `lib/constants.ts` `NAV_LINKS` currently uses hash hrefs (`#beranda`...). Change to route hrefs and add Artikel (Task 1).

---

## Task 1: Update NAV_LINKS to routes

**Files:**
- Modify: `lib/constants.ts`

- [ ] **Step 1: Replace the NAV_LINKS export**

Find the existing `NAV_LINKS` in `lib/constants.ts` (it uses `#beranda`/`#tentang`/`#layanan`/`#kontak`) and replace it with route-based links including Artikel:

```ts
export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kontak", href: "/kontak" },
];
```

- [ ] **Step 2: Verify types compile**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: switch nav links to routes and add Artikel"
```

---

## Task 2: Article data module (TDD)

**Files:**
- Create: `lib/articles.ts`
- Create: `lib/articles.test.ts`

- [ ] **Step 1: Write the failing test**

Create `lib/articles.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { ARTICLES, getArticle, getAllSlugs } from "@/lib/articles";

describe("articles data", () => {
  it("exposes at least two seed articles", () => {
    expect(ARTICLES.length).toBeGreaterThanOrEqual(2);
  });

  it("every article has required fields and non-empty body", () => {
    for (const a of ARTICLES) {
      expect(a.slug).toBeTruthy();
      expect(a.title).toBeTruthy();
      expect(a.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.excerpt).toBeTruthy();
      expect(a.body.length).toBeGreaterThan(0);
    }
  });

  it("slugs are unique", () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getArticle returns the matching article or undefined", () => {
    const first = ARTICLES[0];
    expect(getArticle(first.slug)?.title).toBe(first.title);
    expect(getArticle("does-not-exist")).toBeUndefined();
  });

  it("getAllSlugs returns every slug", () => {
    expect(getAllSlugs().sort()).toEqual(ARTICLES.map((a) => a.slug).sort());
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test lib/articles.test.ts`
Expected: FAIL — cannot resolve `@/lib/articles`.

- [ ] **Step 3: Implement the module**

Create `lib/articles.ts`:

```ts
export type Article = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  body: string[]; // paragraphs
};

export const ARTICLES: Article[] = [
  {
    slug: "memahami-pemulihan-aset-negara",
    title: "Memahami Proses Pemulihan Aset Negara",
    date: "2026-05-20",
    excerpt:
      "Pemulihan aset negara adalah proses hukum dan administratif yang menjaga nilai kekayaan bangsa. Berikut tahapannya secara ringkas.",
    body: [
      "Pemulihan aset negara merupakan rangkaian proses untuk mengidentifikasi, mengamankan, dan mengembalikan nilai aset yang menjadi hak negara. Proses ini menuntut ketelitian hukum dan administrasi yang tinggi.",
      "Tahap awal dimulai dari verifikasi legalitas dan dokumentasi kepemilikan, dilanjutkan dengan pengamanan fisik maupun yuridis atas aset tersebut.",
      "PT Aset Nusantara Internasional hadir untuk mendampingi setiap tahap dengan pendekatan profesional, transparan, dan sesuai ketentuan hukum yang berlaku.",
    ],
  },
  {
    slug: "peran-aset-collateral-bagi-bangsa",
    title: "Peran Aset Collateral bagi Ketahanan Bangsa",
    date: "2026-05-12",
    excerpt:
      "Aset collateral bernilai strategis bagi negara. Pengelolaannya yang akuntabel menjaga kepercayaan dan stabilitas.",
    body: [
      "Aset collateral merupakan jaminan bernilai strategis yang berperan penting dalam menjaga stabilitas dan kepercayaan ekonomi nasional.",
      "Pengelolaan yang akuntabel memastikan setiap aset terdokumentasi dengan baik dan terlindungi dari penyalahgunaan.",
      "Melalui tata kelola yang menjunjung integritas, nilai aset dapat dimanfaatkan secara optimal demi kepentingan bangsa.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test lib/articles.test.ts`
Expected: PASS — 5 passed.

- [ ] **Step 5: Commit**

```bash
git add lib/articles.ts lib/articles.test.ts
git commit -m "feat: add article data module with tests"
```

---

## Task 3: PageHeader + CTASection components

**Files:**
- Create: `components/layout/PageHeader.tsx`
- Create: `components/sections/CTASection.tsx`

- [ ] **Step 1: PageHeader**

Create `components/layout/PageHeader.tsx`:

```tsx
import { Reveal } from "@/components/motion/Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-gold-heritage/15 bg-navy-elevated pb-12 pt-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          {eyebrow && (
            <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">{eyebrow}</p>
          )}
          <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">{title}</h1>
          <div className="mt-5 h-px w-24 bg-gold-heritage" />
          {description && <p className="mt-5 max-w-2xl text-cream-muted">{description}</p>}
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: CTASection**

Create `components/sections/CTASection.tsx`:

```tsx
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function CTASection({
  title = "Siap bekerja sama dengan kami?",
  buttonLabel = "Hubungi Kami",
  href = "/kontak",
}: {
  title?: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="bg-navy-deep py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="rounded-2xl border border-gold-heritage/30 bg-gradient-to-br from-navy-elevated to-navy-deep p-10 text-center md:p-14">
            <h2 className="font-display text-3xl text-cream md:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-muted">
              Sampaikan kebutuhan Anda terkait pemulihan dan pemanfaatan aset. Tim kami siap membantu.
            </p>
            <Link
              href={href}
              className="mt-8 inline-block rounded-full bg-gold-heritage px-8 py-4 font-medium text-navy-deep transition-colors hover:bg-gold-bright"
            >
              {buttonLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify compile**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/layout/PageHeader.tsx components/sections/CTASection.tsx
git commit -m "feat: add PageHeader and reusable CTA section"
```

---

## Task 4: ArticleCard, AboutTeaser, FeaturedArticles

**Files:**
- Create: `components/articles/ArticleCard.tsx`
- Create: `components/sections/AboutTeaser.tsx`
- Create: `components/sections/FeaturedArticles.tsx`

- [ ] **Step 1: ArticleCard**

Create `components/articles/ArticleCard.tsx`:

```tsx
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
```

- [ ] **Step 2: AboutTeaser (homepage short about + link)**

Create `components/sections/AboutTeaser.tsx`:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Tentang Kami</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl text-cream md:text-4xl">
          Institusi terpercaya dalam pemulihan dan pemanfaatan aset bangsa.
        </h2>
        <p className="mt-5 max-w-2xl text-cream-muted">
          PT Aset Nusantara Internasional bergerak di bidang pemanfaatan dan pemulihan aset —
          bergerak, tidak bergerak, warisan, sitaan negara, hingga collateral bangsa — dengan
          menjunjung legalitas, transparansi, dan nilai kebangsaan.
        </p>
        <Link
          href="/tentang"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold-heritage px-6 py-3 text-sm text-gold-heritage transition-colors hover:bg-gold-heritage hover:text-navy-deep"
        >
          Selengkapnya tentang kami
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 3: FeaturedArticles (homepage strip)**

Create `components/sections/FeaturedArticles.tsx`:

```tsx
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
```

- [ ] **Step 4: Verify compile**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/articles/ArticleCard.tsx components/sections/AboutTeaser.tsx components/sections/FeaturedArticles.tsx
git commit -m "feat: add article card, about teaser, featured articles"
```

---

## Task 5: Header — routes, active state, Artikel link

**Files:**
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Rewrite Header to use next/link + active state**

Replace the entire contents of `components/layout/Header.tsx` with:

```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/85 py-3 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-ani.svg" alt={COMPANY_INFO.name} className="h-10 w-auto" />
          <span className="hidden font-display text-base leading-tight text-cream sm:block md:text-lg">
            {COMPANY_INFO.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-gold-heritage ${
                isActive(pathname, l.href) ? "text-gold-heritage" : "text-cream-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/kontak"
            className="rounded-full border border-gold-heritage px-5 py-2 text-sm text-gold-heritage transition-colors hover:bg-gold-heritage hover:text-navy-deep"
          >
            Hubungi Kami
          </Link>
        </nav>

        <button className="text-cream md:hidden" onClick={() => setOpen(true)} aria-label="Buka menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-navy-deep/98 backdrop-blur md:hidden">
          <div className="flex justify-end p-6">
            <button onClick={() => setOpen(false)} aria-label="Tutup menu" className="text-cream">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-8 pt-12">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-display text-2xl ${
                  isActive(pathname, l.href) ? "text-gold-heritage" : "text-cream"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify compile + build**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat: header uses route links with active state"
```

---

## Task 6: Footer quick links + move Header/Footer into root layout

**Files:**
- Modify: `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add route quick-links to Footer**

In `components/layout/Footer.tsx`, add a `next/link` import at the top:

```tsx
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";
```

Then, inside the existing top grid (the `<div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">`), the current three columns are: company name/address, contact, legalitas. Change the grid to four columns `md:grid-cols-4` and insert a new "Navigasi" column as the SECOND column (after the company column), so the final children order is: company, navigasi, kontak, legalitas. The new column:

```tsx
        <div className="text-sm text-cream-muted">
          <p className="text-gold-heritage">Navigasi</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/tentang" className="hover:text-gold-heritage">Tentang</Link></li>
            <li><Link href="/layanan" className="hover:text-gold-heritage">Layanan</Link></li>
            <li><Link href="/artikel" className="hover:text-gold-heritage">Artikel</Link></li>
            <li><Link href="/kontak" className="hover:text-gold-heritage">Kontak</Link></li>
          </ul>
        </div>
```

(Change the wrapper `md:grid-cols-3` to `md:grid-cols-4`.)

- [ ] **Step 2: Move Header/Footer into root layout**

In `app/layout.tsx`, import Header and Footer and wrap children. The body currently renders `{children}` only. Update it:

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
```

And change the body to:

```tsx
      <body>
        <Header />
        {children}
        <Footer />
      </body>
```

Keep the existing font variable classes on `<html>` and the existing `metadata` export unchanged.

- [ ] **Step 3: Verify compile**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx app/layout.tsx
git commit -m "feat: footer quick links; header/footer in root layout"
```

---

## Task 7: Beranda — rich homepage without Header/Footer

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

Header and Footer now come from the layout, so the homepage must NOT render them. Replace `app/page.tsx` with the rich overview composition:

```tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { FeaturedArticles } from "@/components/sections/FeaturedArticles";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <AboutTeaser />
      <ServicesSection />
      <WhyUsSection />
      <FeaturedArticles />
      <CTASection />
    </main>
  );
}
```

- [ ] **Step 2: Verify compile**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rich beranda overview with previews and CTA"
```

---

## Task 8: Tentang, Layanan, Kontak pages

**Files:**
- Create: `app/tentang/page.tsx`
- Create: `app/layanan/page.tsx`
- Create: `app/kontak/page.tsx`

- [ ] **Step 1: Tentang page**

Create `app/tentang/page.tsx`:

```tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

export const metadata: Metadata = {
  title: "Tentang Kami | PT Aset Nusantara Internasional",
  description:
    "Profil, visi & misi, serta legalitas resmi PT Aset Nusantara Internasional — institusi pemulihan dan pemanfaatan aset bangsa.",
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
```

- [ ] **Step 2: Layanan page**

Create `app/layanan/page.tsx`:

```tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Layanan | PT Aset Nusantara Internasional",
  description:
    "Lima kategori layanan pengelolaan aset: aset bergerak, tidak bergerak, warisan, sitaan negara/bank likuidasi, dan collateral bangsa.",
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
```

- [ ] **Step 3: Kontak page**

Create `app/kontak/page.tsx`:

```tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Kontak | PT Aset Nusantara Internasional",
  description:
    "Hubungi PT Aset Nusantara Internasional — alamat kantor, telepon, email, dan form inquiry.",
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
```

- [ ] **Step 4: Verify compile**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/tentang/page.tsx app/layanan/page.tsx app/kontak/page.tsx
git commit -m "feat: add tentang, layanan, kontak pages"
```

---

## Task 9: Artikel list + detail pages

**Files:**
- Create: `app/artikel/page.tsx`
- Create: `app/artikel/[slug]/page.tsx`

- [ ] **Step 1: Artikel list page**

Create `app/artikel/page.tsx`:

```tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel & Wawasan | PT Aset Nusantara Internasional",
  description:
    "Artikel dan wawasan seputar pemulihan, pemanfaatan, dan tata kelola aset oleh PT Aset Nusantara Internasional.",
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
```

- [ ] **Step 2: Artikel detail page**

Create `app/artikel/[slug]/page.tsx`. Note: in Next.js 16, `params` is a Promise and must be awaited.

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle, getAllSlugs } from "@/lib/articles";

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
  return {
    title: `${article.title} | PT Aset Nusantara Internasional`,
    description: article.excerpt,
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
```

- [ ] **Step 3: Verify compile + build**

Run: `pnpm exec tsc --noEmit && pnpm build`
Expected: tsc clean; build succeeds and route output lists `/`, `/tentang`, `/layanan`, `/kontak`, `/artikel`, `/artikel/[slug]`, `/api/contact`. (If build fails ONLY due to Google Fonts network fetch, that's an environment limitation — tsc clean is sufficient there.)

- [ ] **Step 4: Commit**

```bash
git add app/artikel/page.tsx app/artikel/[slug]/page.tsx
git commit -m "feat: add artikel list and detail pages"
```

---

## Task 10: Full verification + deploy

**Files:** none (verification + deploy)

- [ ] **Step 1: Run the full test suite**

Run: `pnpm test`
Expected: all tests pass (11 existing + 5 article tests = 16).

- [ ] **Step 2: Production build + route list**

Run: `pnpm build`
Expected: success. Confirm routes for `/`, `/tentang`, `/layanan`, `/kontak`, `/artikel`, `/artikel/[slug]` (or its static params), `/api/contact`.

- [ ] **Step 3: SSR smoke test (headless)**

Run:
```bash
pnpm build && (pnpm start &) && sleep 4
for path in "/" "/tentang" "/layanan" "/artikel" "/kontak"; do
  printf "%s -> %s\n" "$path" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$path)"
done
curl -s http://localhost:3000/artikel | grep -o "Wawasan" | head -1
curl -s "http://localhost:3000/artikel/memahami-pemulihan-aset-negara" | grep -o "Pemulihan Aset Negara" | head -1
pkill -f "next start" || pkill -f "next-server" || true
```
Expected: each path returns 200; the two greps find their strings (article list + detail render in SSR).

- [ ] **Step 4: Deploy to production**

Run: `vercel --prod --yes`
Expected: `readyState: READY`. Then verify the public production alias returns 200 and renders the new nav:
```bash
curl -s -o /dev/null -w '%{http_code}\n' https://aset-nusantara-internasional.vercel.app/tentang
```
Expected: 200.

- [ ] **Step 5: Commit any final touch (if needed)**

If no code changes were required in this task, nothing to commit. Otherwise:
```bash
git add -A && git commit -m "chore: multipage verification"
```

---

## Self-Review Notes (addressed)

- **Spec coverage:** routes (T7-9), homepage stays rich (T7 uses Hero+TrustBar+AboutTeaser+Services+WhyUs+FeaturedArticles+CTA), Header active state + Artikel (T5), Footer routes + layout move (T6), PageHeader/CTASection (T3), Article data + card + featured (T2,T4), article detail with generateStaticParams/generateMetadata/notFound (T9), NAV_LINKS routes (T1), SEO metadata per page (T8,T9), existing tests preserved (T10).
- **Heritage consistency:** all new components use the same navy/gold tokens, Playfair headings, and `Reveal`/`Stagger` motion as existing sections.
- **Next.js 16 params:** detail page awaits `params` (Promise) per Next 16.
- **No duplicate Header/Footer:** moved to layout (T6) and removed from page.tsx (T7); new pages never render Header/Footer themselves.
- **Type consistency:** `Article` type from `lib/articles.ts` used by `ArticleCard`, `FeaturedArticles`, both artikel pages; `getArticle`/`getAllSlugs` signatures match across tasks.
```
