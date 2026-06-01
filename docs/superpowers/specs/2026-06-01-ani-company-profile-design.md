# Design Spec — Website Company Profile PT Aset Nusantara Internasional

**Version:** 1.0
**Date:** 2026-06-01
**Author:** Yudha Hafiz (Vorca Studio)
**Status:** Approved for implementation
**Source:** `PRD.md` v1.0 + brainstorming session 2026-06-01

---

## 1. Ringkasan & Keputusan Kunci

Website company profile single-page untuk PT Aset Nusantara Internasional. Tujuan: digital presence profesional yang membangun kepercayaan calon klien B2B, mitra, dan investor, sekaligus channel inquiry.

**Keputusan yang diambil saat brainstorming (override/klarifikasi PRD):**

| Topik | Keputusan | Catatan |
|-------|-----------|---------|
| Gaya visual | **Heritage Authority** | Tegas, berwibawa, motif harimau kuat, kesan kelembagaan "aset bangsa" |
| Build mode | **Next.js App Router normal** (BUKAN `output: 'export'`) | PRD minta static export + route handler `/api/contact` — itu konflik. Pilih normal app agar route handler jalan & siap untuk backend artikel ke depan |
| Channel kontak | **Form inquiry saja** (Resend) | Tanpa WhatsApp floating di v1 |
| Konten | **Copywriting ditulis developer** | Draft profesional siap pakai, gampang diganti saat klien kasih final |
| Logo | **File dari klien** | Di-drop ke `/public`; slot disiapkan, placeholder sementara saat dev |
| Motion | **Cinematic, Framer Motion** | Lebih dari "subtle" PRD; dioptimasi agar Lighthouse ≥90 & LCP <2.5s |

---

## 2. Design System — "Heritage Authority"

### 2.1 Palet Warna

| Token | Hex | Penggunaan |
|-------|-----|-----------|
| `navy-deep` | `#0A1628` | Background utama (dominan) |
| `navy-elevated` | `#0F1F38` | Card/section kontras di atas navy |
| `gold-heritage` | `#C9A24B` | Aksen utama: garis, border, ikon lineart, angka |
| `gold-bright` | `#D4AF37` | Hover/highlight emas |
| `cream` | `#F5F1E8` | Teks utama di atas navy, kesan dokumen heritage |
| `cream-muted` | `#BDB8AC` | Teks sekunder |
| `charcoal` | `#1A2438` | Section terang alternatif |

Mode: **dark-first** (navy dominan). Tidak ada light/dark toggle di v1.

### 2.2 Tipografi

- **Heading:** Playfair Display (serif, berwibawa) — via `next/font/google`
- **Body:** Inter — via `next/font/google`
- Skala: heading hero `clamp(2.5rem, 6vw, 5rem)`; section title `clamp(2rem, 4vw, 3rem)`; body `1rem–1.125rem`.

### 2.3 Motif & Tekstur

- Siluet harimau sebagai **watermark halus** (low-opacity gold) di hero & background section.
- **Garis emas tipis** sebagai pemisah antar-section (kesan sertifikat/dokumen resmi).
- Border emas 1px pada card.

### 2.4 Aksesibilitas

- Kontras teks cream di atas navy ≥ 4.5:1 (WCAG AA).
- Semua interaktif punya focus ring emas terlihat.
- `prefers-reduced-motion` dihormati di seluruh animasi.

---

## 3. Arsitektur Teknis

| Layer | Pilihan |
|-------|---------|
| Framework | Next.js 15 App Router (normal, **tanpa** static export) |
| Bahasa | TypeScript 5, strict mode |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Motion | Framer Motion |
| Font | next/font/google — Playfair Display + Inter |
| Form | react-hook-form + zod (validasi client & server) |
| Email | Resend API via route handler `POST /api/contact` |
| State | React useState lokal (tidak ada global state) |
| Deploy | Vercel, Node 20 |
| Package manager | pnpm |

**Catatan forward-looking:** karena bukan static export, penambahan halaman/blog artikel + koneksi backend ke depan tidak perlu re-arsitektur.

### 3.1 Struktur Folder

```
aset-nusantara-internasional/
├── app/
│   ├── layout.tsx              # Root: font, metadata, OG, global background
│   ├── page.tsx                # Homepage single-page (compose semua section)
│   ├── globals.css             # Tailwind v4 + token warna
│   └── api/
│       └── contact/
│           └── route.ts        # POST → validasi zod → Resend
├── components/
│   ├── ui/                     # shadcn primitives (button, input, textarea, ...)
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav + shrink-on-scroll + mobile drawer
│   │   └── Footer.tsx          # Legalitas badge + copyright
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── TrustBar.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── WhyUsSection.tsx
│   │   └── ContactSection.tsx
│   └── motion/
│       ├── Reveal.tsx          # Wrapper whileInView fade+slide (reduced-motion aware)
│       ├── Stagger.tsx         # Container stagger children
│       ├── Counter.tsx         # Angka animate 0→target on view
│       ├── MagneticButton.tsx  # CTA magnetic + shimmer
│       └── TigerWatermark.tsx  # Siluet harimau parallax
├── lib/
│   ├── constants.ts            # CompanyInfo, ServiceItem[], WhyUsItem[]
│   ├── resend.ts               # Resend client
│   └── utils.ts                # cn() helper
├── types/
│   └── index.ts                # ContactFormPayload, ServiceItem, dll
├── public/
│   ├── logo-ani.svg            # Logo klien (placeholder saat dev)
│   ├── tiger-silhouette.svg    # Motif watermark
│   └── og-image.png            # Open Graph
├── .env.local                  # RESEND_API_KEY, CONTACT_EMAIL_TO, NEXT_PUBLIC_SITE_URL
├── next.config.ts
└── package.json
```

---

## 4. Layout Homepage (urutan scroll)

1. **Hero** — logo + nama PT + tagline + CTA "Hubungi Kami"; background navy + watermark harimau parallax.
2. **Trust Bar** — strip emas tipis: "Terdaftar Kemenkumham · NPWP Resmi · Est. 2026".
3. **Tentang Kami** (`#tentang`) — visi/misi + profil + legalitas lengkap.
4. **Layanan** (`#layanan`) — grid 5 kategori, card ikon gold lineart, hover shimmer.
5. **Mengapa Memilih Kami** — 4 keunggulan + counter angka animate.
6. **Kontak** (`#kontak`) — info lengkap + form inquiry Resend.
7. **Footer** — legalitas badge (Kemenkumham + NPWP) + copyright.

---

## 5. Motion Layer — "Cinematic"

| Elemen | Animasi | Catatan performa |
|--------|---------|------------------|
| Hero tagline | Reveal per-kata (stagger) | LCP element (heading utama) TIDAK di-delay |
| Hero garis emas | SVG path draw | `transform`/`opacity` only |
| Harimau watermark | Parallax halus on scroll | `translateY`, throttled |
| Tiap section | Fade + slide-up `whileInView`, `once: true` | Tidak re-trigger |
| Cards (layanan & why-us) | Stagger beruntun | — |
| Counter why-us | 0 → target on view | — |
| CTA button | Magnetic follow cursor + gold shimmer | Desktop only; disable di touch |
| Service card hover | Lift + border emas shimmer | — |
| Header | Shrink + backdrop-blur saat scroll | — |

**Aturan global:** semua animasi hanya `transform` & `opacity`; `prefers-reduced-motion` → fade instan tanpa gerak; motion section bawah-fold di-lazy-load.

---

## 6. Data & Konten

### 6.1 Types

```typescript
type ContactFormPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: Date;
};

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
};

type WhyUsItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat?: { value: number; suffix?: string; label: string };
};

type CompanyInfo = {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  kemenkumhamNo: string;
  npwp: string;
  foundedYear: number;
};
```

### 6.2 CompanyInfo (konstanta)

```
name:           PT Aset Nusantara Internasional
tagline:        "Pemulihan dan Pemanfaatan Aset Bangsa dengan Integritas"
address:        Kompleks Perkantoran Bank Indonesia, RT. 001 / RW. 002,
                Gambir, Jakarta Pusat 10110
phone:          021-3928018
email:          asetnusantara247@gmail.com
kemenkumhamNo:  AHU-A085911.AH.01.30.Tahun 2026
npwp:           1000 0000 0947 7237
foundedYear:    2026
```

### 6.3 Copywriting — Visi & Misi (draft, ganti saat klien kasih final)

**Visi:** Menjadi institusi terpercaya dalam pemulihan dan pemanfaatan aset nasional, yang menjunjung tinggi legalitas, transparansi, dan nilai kebangsaan.

**Misi:**
1. Mengelola dan memulihkan aset bergerak maupun tidak bergerak secara profesional dan sesuai hukum yang berlaku.
2. Menjaga dan memanfaatkan aset peninggalan warisan serta aset negara demi kepentingan bangsa.
3. Memberikan solusi penanganan aset sitaan, aset bank likuidasi, dan aset collateral secara akuntabel.
4. Membangun kepercayaan klien, mitra, dan negara melalui integritas dan kepatuhan legalitas.

### 6.4 Copywriting — 5 Layanan (draft)

1. **Aset Bergerak** — Pengelolaan, pemulihan, dan optimalisasi aset bergerak seperti kendaraan, alat berat, dan inventaris bernilai. Kami memastikan setiap aset dikelola sesuai prosedur hukum dan administratif yang berlaku.
2. **Aset Tidak Bergerak (Tanah & Bangunan)** — Penanganan tanah, bangunan, dan properti strategis — mulai dari verifikasi legalitas, pemulihan kepemilikan, hingga pemanfaatan nilai aset secara optimal.
3. **Aset Peninggalan Warisan / Kurunmudura Negara-Daerah** — Identifikasi, pengamanan, dan pemanfaatan aset peninggalan warisan serta aset negara dan daerah, dengan menjunjung nilai sejarah dan kepentingan bangsa.
4. **Aset Sitaan Negara / Bank Likuidasi** — Pengelolaan aset hasil sitaan negara maupun aset bank dalam likuidasi secara akuntabel, transparan, dan sesuai ketentuan hukum yang berlaku.
5. **Aset Collateral Bangsa** — Penanganan aset collateral bernilai strategis bagi negara dengan pendekatan profesional, menjaga keamanan dan integritas setiap proses.

### 6.5 Copywriting — Mengapa Memilih Kami (4 poin draft)

1. **Legalitas Resmi** — Terdaftar resmi di Kemenkumham RI, beroperasi penuh sesuai kerangka hukum. *(stat: Est. 2026)*
2. **Jangkauan Nasional** — Menangani aset di seluruh wilayah Indonesia dengan jaringan yang luas.
3. **Profesional & Akuntabel** — Setiap proses dijalankan transparan dengan standar administrasi dan dokumentasi yang ketat.
4. **Fokus Kepentingan Bangsa** — Mengutamakan pemulihan dan pemanfaatan aset demi nilai kebangsaan, bukan sekadar komersial.

> Catatan: semua copy di atas adalah draft profesional. Diganti saat klien menyediakan teks final.

---

## 7. API — `POST /api/contact`

**Request body:**
```json
{ "name": "string", "email": "string", "phone": "string?", "message": "string" }
```

**Validasi (zod, server + client):**
- `name`: required, min 2
- `email`: required, format email
- `phone`: optional
- `message`: required, min 10 karakter

**Alur:** validasi → kirim email via Resend ke `CONTACT_EMAIL_TO` → response.

**Response:**
```json
{ "success": true }
{ "success": false, "error": "string" }
```

**Error handling:** validasi gagal → 400 + pesan; Resend gagal → 500 + pesan generik; UI tampilkan success/error state.

---

## 8. Environment Variables

```env
RESEND_API_KEY=re_...
CONTACT_EMAIL_TO=asetnusantara247@gmail.com
NEXT_PUBLIC_SITE_URL=https://asetnusantarainternasional.com
```

---

## 9. Success Metrics (dari PRD)

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| LCP | < 2.5 s |
| Form kirim email | 100% sukses |
| Responsive semua breakpoint | Pass |
| Deploy Vercel tanpa error | Pass |

---

## 10. Out of Scope (v1)

CMS/admin panel, autentikasi, portal klien, e-commerce, multi-bahasa, blog/artikel, WhatsApp widget, live chat, sub-halaman detail layanan, parallax berat/video background, smooth-scroll library (Lenis).

---

## 11. Open Items (perlu dari klien, tidak blokir dev dengan placeholder)

- File logo SVG/PNG resolusi tinggi
- Foto kantor/tim (opsional)
- Teks Visi/Misi & deskripsi layanan final (draft tersedia)
- Persetujuan menampilkan NPWP & no. Kemenkumham publik
- Domain final
- Embed Google Maps (opsional)

---

*Brainstormed via superpowers:brainstorming — Vorca Studio × Yudha Hafiz, 2026.*
