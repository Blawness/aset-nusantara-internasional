# PRD: Website Company Profile — PT Aset Nusantara Internasional

**Version:** 1.0
**Date:** 2026-06-01
**Author:** Yudha Hafiz (Vorca Studio)
**Client:** PT Aset Nusantara Internasional
**Status:** Draft

---

## 1. Overview

### 1.1 Product Summary

Website company profile resmi untuk PT Aset Nusantara Internasional — perusahaan yang bergerak di bidang pemanfaatan dan pemulihan aset (aset bergerak & tidak bergerak, aset peninggalan warisan, aset sitaan negara/daerah, aset bank likuidasi, aset collateral bangsa). Website ini berfungsi sebagai digital presence profesional yang membangun kepercayaan calon klien, mitra, dan investor, serta menjadi sarana utama untuk inquiry dan kontak bisnis.

### 1.2 Goals

- Tampil profesional dan kredibel sesuai skala bisnis B2B / korporat
- Menjelaskan layanan dan bidang usaha secara jelas kepada calon klien
- Menyediakan channel inquiry / kontak yang mudah diakses
- Menampilkan legalitas perusahaan (SK Kemenkumham, NPWP) sebagai trust signal
- Deploy dalam waktu cepat (< 1 minggu) menggunakan stack modern

### 1.3 Non-Goals (Out of Scope for v1)

- Tidak ada CMS / admin panel — konten statis, update via kode
- Tidak ada fitur login / user authentication
- Tidak ada portal klien atau dashboard transaksi
- Tidak ada e-commerce atau payment gateway
- Tidak ada multi-bahasa (English) di v1 — Bahasa Indonesia saja
- Tidak ada blog / artikel di v1

---

## 2. Users & Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `Visitor` | Calon klien, mitra bisnis, investor yang mengunjungi website | Read-only — browsing semua halaman, submit form kontak |
| `Owner` | PT Aset Nusantara Internasional (tim internal) | Tidak ada akses admin di v1 — update via developer |
| `Developer` | Vorca Studio (Yudha Hafiz) | Full access — deploy, update konten, maintenance |

---

## 3. Core Features (MVP)

### Feature 1: Hero Section & Brand Identity

**Description:**
Halaman landing utama menampilkan nama perusahaan, logo (harimau + "ANI"), tagline bisnis, dan CTA utama ("Hubungi Kami" / "Lihat Layanan"). Desain mencerminkan identitas korporat yang kuat — formal, modern, trustworthy.

**Acceptance Criteria:**
- [ ] Logo PT Aset Nusantara Internasional tampil di header dan hero
- [ ] Tagline bisnis terkait pemanfaatan & pemulihan aset tampil jelas
- [ ] CTA button mengarah ke section Kontak atau form inquiry
- [ ] Fully responsive — mobile, tablet, desktop
- [ ] Above-the-fold content load < 2 detik (LCP)

**Out of Scope:**
Animasi cinematic / parallax berat, video background, hero slider/carousel.

---

### Feature 2: Halaman Tentang Kami (About)

**Description:**
Section atau halaman yang menjelaskan profil perusahaan: visi/misi, sejarah singkat pendirian (2 Mei 2026), domisili (Kompleks Perkantoran Bank Indonesia, Gambir, Jakarta Pusat), dan legalitas (terdaftar Kemenkumham No. AHU-A085911.AH.01.30.Tahun 2026, NPWP 1000 0000 0947 7237).

**Acceptance Criteria:**
- [ ] Profil perusahaan tampil lengkap (nama, domisili, tahun berdiri)
- [ ] Nomor legalitas Kemenkumham ditampilkan sebagai trust signal
- [ ] NPWP perusahaan ditampilkan (tanpa password akun DJP)
- [ ] Visi/Misi perusahaan ditampilkan (konten dari klien)
- [ ] Foto/ilustrasi kantor atau tim dapat ditambahkan (placeholder jika belum ada aset)

**Out of Scope:**
Timeline interaktif sejarah perusahaan, galeri foto lengkap.

---

### Feature 3: Halaman Layanan (Services)

**Description:**
Menampilkan 5 kategori layanan utama PT ANI secara visual dan deskriptif:
1. Aset Bergerak
2. Aset Tidak Bergerak (Tanah & Bangunan)
3. Aset Peninggalan Warisan / Kurunmudura Negara-Daerah
4. Aset Sitaan Negara / Bank Likuidasi
5. Aset Collateral Bangsa

Setiap layanan memiliki card dengan ikon, judul, dan deskripsi singkat (2–3 kalimat). Konten detail per layanan dari klien.

**Acceptance Criteria:**
- [ ] 5 kategori layanan tampil dalam card/grid layout
- [ ] Setiap card punya ikon relevan, judul, dan deskripsi
- [ ] Section layanan dapat diakses dari navigasi utama
- [ ] Layout responsive: 1 kolom (mobile), 2–3 kolom (desktop)

**Out of Scope:**
Sub-halaman detail per layanan, harga/tarif layanan, portofolio kasus per layanan.

---

### Feature 4: Section Mengapa Memilih Kami (Why Us / Keunggulan)

**Description:**
Section yang menampilkan 3–4 keunggulan kompetitif PT ANI: pengalaman di bidang aset, jaringan legalitas, jangkauan nasional, dll. Format: icon + judul + deskripsi singkat (value proposition cards).

**Acceptance Criteria:**
- [ ] Minimal 3 keunggulan tampil dengan ikon dan deskripsi
- [ ] Desain konsisten dengan keseluruhan halaman
- [ ] Konten final dari klien (placeholder tersedia untuk development)

**Out of Scope:**
Testimonial klien, case study, data statistik di v1.

---

### Feature 5: Form Kontak & Informasi Perusahaan

**Description:**
Halaman atau section kontak menampilkan: alamat lengkap (Kompleks Perkantoran Bank Indonesia, RT. 001, RW. 002, Gambir, Jakarta Pusat 10110), nomor telepon (021-3928018), email (asetnusantara247@gmail.com), dan form inquiry sederhana (nama, email/WA, pesan). Form submission dikirim via Resend ke email perusahaan.

**Acceptance Criteria:**
- [ ] Informasi kontak lengkap tampil (alamat, telp, email)
- [ ] Form inquiry dengan field: `name` (string), `email` (string), `phone` (string, optional), `message` (text)
- [ ] Validasi form client-side (required fields, email format)
- [ ] Submit form → email notifikasi dikirim ke asetnusantara247@gmail.com via Resend API
- [ ] Success/error state tampil setelah submit
- [ ] Embed Google Maps lokasi kantor (optional, jika klien setuju)

**Out of Scope:**
Live chat, WhatsApp widget, CRM integration di v1.

---

### Feature 6: Header Navigasi & Footer

**Description:**
Header sticky dengan logo, navigasi utama (Beranda, Tentang, Layanan, Kontak), dan CTA button. Footer menampilkan nama perusahaan, alamat singkat, kontak, nomor legalitas, dan copyright.

**Acceptance Criteria:**
- [ ] Header sticky scroll dengan logo kiri + nav link + CTA kanan
- [ ] Mobile: hamburger menu dengan drawer/dropdown
- [ ] Footer: nama PT, alamat, email, telp, copyright "© 2026 PT Aset Nusantara Internasional"
- [ ] Footer menampilkan nomor Kemenkumham dan NPWP sebagai footer trust badge
- [ ] Smooth scroll ke section anchor (#layanan, #tentang, #kontak)

**Out of Scope:**
Multi-level dropdown nav, mega menu, footer sitemap kompleks.

---

## 4. Tech Stack

> **Note for AI agents:** Use exactly these technologies unless explicitly overridden.

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Runtime** | Node.js 20 LTS | |
| **Framework** | Next.js 15 (App Router) | Static export (`output: 'export'`) untuk deployment ringan |
| **Language** | TypeScript 5 | Strict mode |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Color scheme: navy/dark biru korporat + gold/kuning aksen (sesuai logo ANI) |
| **Animation** | Framer Motion | Subtle entrance animations — jangan berlebihan |
| **Font** | Google Fonts — Inter (body) + Playfair Display atau Cormorant (heading korporat) | |
| **Email (Form)** | Resend API | Route handler `POST /api/contact` |
| **State Management** | React useState lokal | Tidak ada global state — website statis |
| **API Style** | Next.js Route Handler | Hanya untuk form kontak |
| **Database** | None | Tidak ada DB — static site |
| **Deployment** | Vercel | Free tier cukup untuk v1 |
| **Domain** | Custom domain klien (TBD) | |
| **Package Manager** | pnpm | |

---

## 5. Data Models

```typescript
// ContactFormPayload — data dari form inquiry
type ContactFormPayload = {
  name: string;          // Nama lengkap / nama perusahaan
  email: string;         // Email kontak
  phone?: string;        // Nomor WA / telepon (opsional)
  message: string;       // Pesan / kebutuhan
  submittedAt: Date;
};

// ServiceItem — data layanan untuk render card
type ServiceItem = {
  id: string;                // e.g. "aset-bergerak"
  title: string;             // e.g. "Aset Bergerak"
  description: string;       // 2–3 kalimat deskripsi
  icon: string;              // Lucide icon name atau SVG path
};

// CompanyInfo — konstanta profil perusahaan
type CompanyInfo = {
  name: string;              // "PT Aset Nusantara Internasional"
  tagline: string;
  address: string;
  phone: string;
  email: string;
  kemenkumhamNo: string;     // "AHU-A085911.AH.01.30.Tahun 2026"
  npwp: string;              // "1000 0000 0947 7237"
  foundedYear: number;       // 2026
};
```

---

## 6. API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/contact` | Public | Submit form inquiry → kirim email via Resend ke asetnusantara247@gmail.com |

**Request body `/api/contact`:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (optional)",
  "message": "string (required, min 10 chars)"
}
```

**Response:**
```json
{ "success": true }
// atau
{ "success": false, "error": "string" }
```

---

## 7. Project Structure

```
aset-nusantara-web/
├── app/
│   ├── layout.tsx              # Root layout — font, metadata global
│   ├── page.tsx                # Homepage (single-page — semua section)
│   └── api/
│       └── contact/
│           └── route.ts        # POST handler → Resend email
├── components/
│   ├── ui/                     # shadcn/ui primitives (Button, Input, Textarea, etc.)
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav + mobile hamburger
│   │   └── Footer.tsx          # Footer dengan legalitas info
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ServicesSection.tsx
│       ├── WhyUsSection.tsx
│       └── ContactSection.tsx  # Form + info kontak
├── lib/
│   ├── constants.ts            # CompanyInfo, ServiceItem[] data
│   └── resend.ts               # Resend client setup
├── public/
│   ├── logo-ani.png            # Logo PT ANI (harimau)
│   └── og-image.png            # Open Graph image untuk SEO
├── types/
│   └── index.ts                # TypeScript types (ContactFormPayload, dll)
└── next.config.ts              # output: 'export' untuk static deploy
```

---

## 8. Environment Variables

```env
# Resend (email form kontak)
RESEND_API_KEY=re_...

# Email tujuan notifikasi form
CONTACT_EMAIL_TO=asetnusantara247@gmail.com

# Site URL (untuk OG tags)
NEXT_PUBLIC_SITE_URL=https://asetnusantarainternasional.com
```

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance Score | ≥ 90 | Lighthouse CI |
| Lighthouse Accessibility Score | ≥ 90 | Lighthouse CI |
| LCP (Largest Contentful Paint) | < 2.5 detik | PageSpeed Insights |
| Form submission berhasil kirim email | 100% sukses rate | Manual QA |
| Fully responsive semua breakpoint | Pass | Manual QA di mobile & desktop |
| Deploy ke Vercel tanpa error | Pass | Vercel dashboard |

---

## 10. Open Questions

- [ ] **Konten layanan**: Deskripsi detail per 5 kategori layanan — perlu dari klien sebelum development selesai
- [ ] **Visi/Misi perusahaan**: Apakah sudah ada teks resmi? Perlu dari klien
- [ ] **Aset foto/visual**: Apakah ada foto kantor, tim, atau dokumen yang bisa ditampilkan?
- [ ] **Domain**: Domain custom sudah ada? Atau perlu dibantu register?
- [ ] **Bahasa desain**: Apakah klien punya preferensi warna selain navy/gold sesuai logo? Perlu konfirmasi moodboard
- [ ] **Google Maps**: Apakah alamat di Kompleks Perkantoran Bank Indonesia sudah bisa di-embed? Perlu konfirmasi pin lokasi
- [ ] **NPWP & legalitas di website**: Apakah klien setuju nomor NPWP dan Kemenkumham ditampilkan publik di website?
- [ ] **WhatsApp CTA**: Apakah perlu tombol direct ke WhatsApp Business selain form?

---

## 11. Asset Checklist (Perlu dari Klien)

- [ ] Logo PNG/SVG resolusi tinggi (preferably SVG)
- [ ] Foto kantor atau tim (opsional)
- [ ] Teks Visi & Misi
- [ ] Deskripsi detail per layanan (5 kategori)
- [ ] Keunggulan perusahaan (3–4 poin untuk "Why Us" section)
- [ ] Domain yang akan digunakan
- [ ] Nomor WhatsApp Business (jika ada)

---

*Generated by prd-generator skill — optimized for AI agentic coding tools.*
*Vorca Studio × Yudha Hafiz — 2026*
*Client: PT Aset Nusantara Internasional*