# Design Spec — Multi-Page Migration + Artikel

**Version:** 1.0
**Date:** 2026-06-01
**Author:** Yudha Hafiz (Vorca Studio)
**Status:** Approved for implementation
**Builds on:** `2026-06-01-ani-company-profile-design.md` (single-page v1, already shipped)

---

## 1. Tujuan

Migrasi website PT Aset Nusantara Internasional dari **single-page** (anchor scroll) ke **multi-page** (App Router file-based routes), plus menambah halaman **Artikel/Blog** (scaffold dengan contoh, sumber konten final diputuskan kemudian).

**Prinsip yang dipegang (instruksi klien):**
- **Beranda harus tetap rame & meriah** — semua section cinematic tetap tampil di homepage, multi-page tidak boleh bikin homepage terasa kosong. Halaman dedicated adalah *tambahan*, bukan pengganti isi homepage.
- **Heritage Authority harus kokoh & konsisten** di seluruh halaman (navy/gold, Playfair+Inter, motif harimau, motion).

---

## 2. Pendekatan

File-based routing App Router. **Header & Footer dipindah ke root `app/layout.tsx`** agar semua halaman otomatis mendapatkannya. Section components yang sudah ada (Hero, TrustBar, About, Services, WhyUs, Contact) **di-reuse**, tidak ditulis ulang. Navigasi berubah dari anchor (`#layanan`) menjadi route link (`/layanan`) dengan **active state** (link halaman aktif di-highlight via `usePathname`).

Artikel disimpan sebagai **data lokal bertipe** di `lib/articles.ts` (struktur: slug, title, date, excerpt, body) — desain ini mudah ditukar ke MDX/headless CMS nanti tanpa mengubah komponen UI.

---

## 3. Struktur Route

```
/                    Beranda  — Hero + ringkasan meriah + CTA
/tentang             Tentang  — profil, visi/misi, legalitas, why us
/layanan             Layanan  — 5 kategori lengkap
/artikel             Artikel  — list kartu artikel
/artikel/[slug]      Artikel detail
/kontak              Kontak   — form + info
```

Nav header (urut): **Beranda · Tentang · Layanan · Artikel · Kontak** + CTA "Hubungi Kami" → `/kontak`.
Footer: link cepat ke route yang sama + info legalitas (seperti sekarang).

---

## 4. Komposisi Halaman

### 4.1 Beranda `/` — tetap rame & meriah
Urutan (semua dengan motion existing):
1. **Hero** (full, min-h-screen, watermark harimau) — CTA "Hubungi Kami" → `/kontak`
2. **TrustBar** (legalitas)
3. **About teaser** — ringkas (eyebrow + heading + 2-3 kalimat) dengan tombol "Selengkapnya" → `/tentang`
4. **ServicesSection** (full, 5 kartu) — di bawahnya link "Pelajari layanan" → `/layanan`
5. **WhyUsSection** (full, counter)
6. **Featured Articles** — strip 2-3 ArticleCard terbaru dengan tombol "Lihat semua artikel" → `/artikel`
7. **CTASection** (band ajakan emas) → `/kontak`

> Homepage sengaja tetap padat: Hero + TrustBar + Services + WhyUs + Articles + CTA = pengalaman lengkap, bukan sekadar hero kosong.

### 4.2 Tentang `/tentang`
`PageHeader("Tentang Kami")` + `AboutSection` (full: visi/misi + kartu legalitas) + `WhyUsSection`.

### 4.3 Layanan `/layanan`
`PageHeader("Layanan Kami")` + `ServicesSection` (full) + `CTASection` → `/kontak`.

### 4.4 Artikel `/artikel`
`PageHeader("Artikel & Wawasan")` + grid `ArticleCard` dari `ARTICLES`. Jika kosong, tampilkan empty-state "Artikel akan segera hadir." (tapi scaffold menyediakan 2 contoh sehingga tidak kosong).

### 4.5 Artikel detail `/artikel/[slug]`
`generateStaticParams()` dari `ARTICLES`. Render judul, tanggal, body (paragraf), tombol "← Kembali ke Artikel". `generateMetadata()` per artikel (title + description dari excerpt). 404 (`notFound()`) bila slug tak dikenal.

### 4.6 Kontak `/kontak`
`PageHeader("Hubungi Kami")` + `ContactSection` (form + info, tetap client).

---

## 5. Komponen

**Baru:**
- `components/layout/PageHeader.tsx` — judul halaman + eyebrow + garis emas; memberi padding-top agar konten tidak tertutup header fixed. Props: `{ eyebrow?, title, description? }`. Server component dengan animasi via `Reveal`.
- `components/sections/CTASection.tsx` — band ajakan reusable (heading + tombol). Props: `{ title?, buttonLabel?, href? }` default ke "Hubungi Kami"/`/kontak`.
- `components/sections/FeaturedArticles.tsx` — strip artikel terbaru untuk homepage (ambil N teratas dari `ARTICLES`).
- `components/articles/ArticleCard.tsx` — kartu artikel (judul, tanggal, excerpt, link ke detail).
- `lib/articles.ts` — `Article` type + `ARTICLES: Article[]` (2 contoh) + helper `getArticle(slug)`, `getAllSlugs()`.

**Diubah:**
- `components/layout/Header.tsx` — pakai `next/link`, tambah link **Artikel**, ganti anchor → route, tambah **active state** (`usePathname`), CTA → `/kontak`. Mobile drawer ikut.
- `components/layout/Footer.tsx` — link cepat pakai route (`/tentang`, `/layanan`, `/artikel`, `/kontak`).
- `app/layout.tsx` — render `<Header/>` + `{children}` + `<Footer/>` (Header/Footer pindah ke sini).
- `app/page.tsx` — jadi Beranda baru (komposisi §4.1), tanpa Header/Footer (sudah di layout).
- `app/globals.css` — `scroll-behavior: smooth` boleh tetap (harmless); tidak lagi diandalkan untuk nav.
- Section yang dipakai lintas halaman: `id` boleh dipertahankan (harmless) tapi tidak lagi jadi target nav.

**Reuse apa adanya:** `HeroSection`, `TrustBar`, `AboutSection`, `ServicesSection`, `WhyUsSection`, `ContactSection`, semua `components/motion/*`.

---

## 6. Data Model — Article

```ts
export type Article = {
  slug: string;        // "pemulihan-aset-negara"
  title: string;
  date: string;        // ISO "2026-05-20"
  excerpt: string;     // ringkas untuk kartu + meta description
  body: string[];      // paragraf-paragraf (markdown-lite tidak perlu untuk scaffold)
};
```

`lib/articles.ts` mengekspor `ARTICLES` (2 contoh placeholder), `getArticle(slug)`, `getAllSlugs()`. Struktur ini sengaja sederhana agar nanti mudah diganti sumbernya (MDX file / CMS) tanpa mengubah `ArticleCard` atau halaman.

---

## 7. Header — active state & navigasi

- `usePathname()` menentukan link aktif. Link aktif: warna `gold-heritage` + indikator (underline/garis bawah emas). Link non-aktif: `cream-muted` hover `gold-heritage`.
- Semua link memakai `next/link` `<Link>` (client-side nav, prefetch).
- Logo → `/`. CTA "Hubungi Kami" → `/kontak`. Mobile drawer: link route yang sama, menutup drawer saat diklik (sudah ada perilakunya).

---

## 8. Layout & spacing

- Header `fixed`. Halaman selain Beranda butuh ruang atas: `PageHeader` menyediakan `pt` cukup (mis. `pt-32`) agar judul tidak tertutup.
- Beranda tetap memakai Hero `min-h-screen` (menangani header fixed secara natural).
- Konsistensi Heritage Authority: background `navy-deep`, alternasi `navy-elevated` antar section, garis emas, font display untuk heading — sama di semua halaman.

---

## 9. SEO

- Tiap halaman punya `metadata` sendiri (title + description) via App Router `export const metadata` (server pages) atau `generateMetadata` (artikel detail).
- Title pattern: `"<Halaman> | PT Aset Nusantara Internasional"`.
- `metadataBase` tetap dari root layout.

---

## 10. Testing & Verifikasi

- Test existing (zod schema + `/api/contact`, 11 test) harus tetap lolos — tidak terpengaruh.
- `pnpm build` sukses: route list harus menampilkan `/`, `/tentang`, `/layanan`, `/artikel`, `/artikel/[slug]` (atau static params-nya), `/kontak`, `/api/contact`.
- Smoke test SSR per halaman (curl grep konten kunci).
- Build harus tetap sukses **tanpa** `RESEND_API_KEY` (regressi yang sudah diperbaiki — Resend lazy-init).
- Navigasi antar halaman berfungsi, active state benar, mobile drawer benar.

---

## 11. Out of Scope (v1 multipage)

- Sumber artikel final (MDX/CMS) — diputuskan kemudian; sekarang data lokal.
- Sub-halaman per layanan (`/layanan/[slug]`).
- Pagination/kategori/tag artikel, search.
- Komentar, share buttons.
- Breadcrumb kompleks.

---

## 12. Follow-up (tetap dari spec v1)

Set `RESEND_API_KEY`/`CONTACT_EMAIL_TO` di Vercel, verifikasi domain Resend + ganti `from`, ganti aset placeholder (logo/harimau/og-image), copy final klien, custom domain.

---

*Brainstormed via superpowers:brainstorming — Vorca Studio × Yudha Hafiz, 2026.*
