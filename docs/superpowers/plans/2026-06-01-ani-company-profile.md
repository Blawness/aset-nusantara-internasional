# PT ANI Company Profile — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page company profile website for PT Aset Nusantara Internasional with a "Heritage Authority" visual identity, cinematic Framer Motion, and a working Resend-backed contact form.

**Architecture:** Next.js 15 App Router (no static export), TypeScript strict, Tailwind v4 + shadcn/ui, Framer Motion. One homepage (`app/page.tsx`) composes seven sections. A single server route handler `POST /api/contact` validates with zod and sends email via Resend. Content lives in `lib/constants.ts`.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, shadcn/ui, Framer Motion, react-hook-form, zod, Resend, lucide-react, pnpm, Vitest.

**Reference spec:** `docs/superpowers/specs/2026-06-01-ani-company-profile-design.md`

---

## File Structure

```
app/layout.tsx          Root layout: fonts, metadata/OG, body background
app/page.tsx            Homepage composing all sections
app/globals.css         Tailwind v4 import + Heritage color tokens
app/api/contact/route.ts  POST handler: zod validate → Resend send
components/ui/*          shadcn primitives (button, input, textarea, label, sonner)
components/layout/Header.tsx   Sticky shrink-on-scroll nav + mobile drawer
components/layout/Footer.tsx   Legalitas badge + copyright
components/sections/HeroSection.tsx
components/sections/TrustBar.tsx
components/sections/AboutSection.tsx
components/sections/ServicesSection.tsx
components/sections/WhyUsSection.tsx
components/sections/ContactSection.tsx
components/motion/Reveal.tsx        whileInView fade+slide wrapper
components/motion/Stagger.tsx       stagger container + item
components/motion/Counter.tsx       0→target count on view
components/motion/MagneticButton.tsx  cursor-follow CTA + shimmer
components/motion/TigerWatermark.tsx  parallax silhouette
lib/constants.ts        COMPANY_INFO, SERVICES[], WHY_US[]
lib/contact-schema.ts   zod schema shared by form + route
lib/resend.ts           Resend client singleton
lib/utils.ts            cn() helper
types/index.ts          ContactFormPayload, ServiceItem, WhyUsItem, CompanyInfo
public/logo-ani.svg     client logo (placeholder during dev)
public/tiger-silhouette.svg  motif
next.config.ts
```

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

- [ ] **Step 1: Scaffold with create-next-app**

The repo already contains `PRD.md` and `docs/`. Scaffold into the current directory.

Run:
```bash
pnpm dlx create-next-app@latest . --ts --tailwind --app --eslint --src-dir=false --import-alias "@/*" --use-pnpm --no-turbopack --yes
```
Expected: project files created. If it complains the directory is not empty, answer to proceed/overwrite — it preserves `PRD.md` and `docs/`. If `create-next-app` refuses due to non-empty dir, temporarily move `PRD.md` and `docs/` out, scaffold, then move them back.

- [ ] **Step 2: Verify dev server boots**

Run:
```bash
pnpm dev
```
Expected: server starts on http://localhost:3000 with no errors. Stop it (Ctrl+C) after confirming.

- [ ] **Step 3: Enable TypeScript strict mode**

Ensure `tsconfig.json` has `"strict": true` under `compilerOptions` (create-next-app sets this by default — confirm it is present).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold next.js app router project"
```

---

## Task 2: Install dependencies and init shadcn/ui

**Files:**
- Modify: `package.json`
- Create: `components.json`, `lib/utils.ts`

- [ ] **Step 1: Install runtime + dev deps**

Run:
```bash
pnpm add framer-motion resend zod react-hook-form @hookform/resolvers lucide-react
pnpm add -D vitest @vitejs/plugin-react
```
Expected: packages added to `package.json`.

- [ ] **Step 2: Init shadcn/ui**

Run:
```bash
pnpm dlx shadcn@latest init -d
```
Expected: `components.json` and `lib/utils.ts` (with `cn()`) created. Accept defaults.

- [ ] **Step 3: Add the shadcn primitives we need**

Run:
```bash
pnpm dlx shadcn@latest add button input textarea label sonner
```
Expected: files created under `components/ui/`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: install deps and init shadcn/ui"
```

---

## Task 3: Heritage Authority design tokens and fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Define color tokens in globals.css**

Replace the `@theme`/`:root` token area of `app/globals.css` so these custom tokens exist (Tailwind v4 `@theme` syntax). Keep the existing `@import "tailwindcss";` line at top.

```css
@import "tailwindcss";

@theme {
  --color-navy-deep: #0A1628;
  --color-navy-elevated: #0F1F38;
  --color-charcoal: #1A2438;
  --color-gold-heritage: #C9A24B;
  --color-gold-bright: #D4AF37;
  --color-cream: #F5F1E8;
  --color-cream-muted: #BDB8AC;
  --font-display: var(--font-playfair);
  --font-body: var(--font-inter);
}

body {
  background-color: var(--color-navy-deep);
  color: var(--color-cream);
  font-family: var(--font-body), system-ui, sans-serif;
}

h1, h2, h3, h4 {
  font-family: var(--font-display), Georgia, serif;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Wire Google fonts in layout.tsx**

In `app/layout.tsx`, load fonts via `next/font/google` and attach CSS variables to `<html>`.

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: "PT Aset Nusantara Internasional",
  description: "Pemulihan dan pemanfaatan aset bangsa dengan integritas dan legalitas resmi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build compiles**

Run:
```bash
pnpm build
```
Expected: build succeeds with no type/CSS errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add heritage authority design tokens and fonts"
```

---

## Task 4: Types and content constants

**Files:**
- Create: `types/index.ts`
- Create: `lib/constants.ts`

- [ ] **Step 1: Define types**

Create `types/index.ts`:

```ts
export type ContactFormPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: Date;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
};

export type WhyUsItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat?: { value: number; suffix?: string; label: string };
};

export type CompanyInfo = {
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

- [ ] **Step 2: Define constants with real copy**

Create `lib/constants.ts` (copy text taken verbatim from spec §6):

```ts
import type { CompanyInfo, ServiceItem, WhyUsItem } from "@/types";

export const COMPANY_INFO: CompanyInfo = {
  name: "PT Aset Nusantara Internasional",
  tagline: "Pemulihan dan Pemanfaatan Aset Bangsa dengan Integritas",
  address:
    "Kompleks Perkantoran Bank Indonesia, RT. 001 / RW. 002, Gambir, Jakarta Pusat 10110",
  phone: "021-3928018",
  email: "asetnusantara247@gmail.com",
  kemenkumhamNo: "AHU-A085911.AH.01.30.Tahun 2026",
  npwp: "1000 0000 0947 7237",
  foundedYear: 2026,
};

export const SERVICES: ServiceItem[] = [
  {
    id: "aset-bergerak",
    title: "Aset Bergerak",
    description:
      "Pengelolaan, pemulihan, dan optimalisasi aset bergerak seperti kendaraan, alat berat, dan inventaris bernilai, sesuai prosedur hukum dan administratif yang berlaku.",
    icon: "Truck",
  },
  {
    id: "aset-tidak-bergerak",
    title: "Aset Tidak Bergerak (Tanah & Bangunan)",
    description:
      "Penanganan tanah, bangunan, dan properti strategis — dari verifikasi legalitas, pemulihan kepemilikan, hingga pemanfaatan nilai aset secara optimal.",
    icon: "Building2",
  },
  {
    id: "aset-warisan",
    title: "Aset Peninggalan Warisan / Negara-Daerah",
    description:
      "Identifikasi, pengamanan, dan pemanfaatan aset peninggalan warisan serta aset negara dan daerah, menjunjung nilai sejarah dan kepentingan bangsa.",
    icon: "Landmark",
  },
  {
    id: "aset-sitaan",
    title: "Aset Sitaan Negara / Bank Likuidasi",
    description:
      "Pengelolaan aset hasil sitaan negara maupun aset bank dalam likuidasi secara akuntabel, transparan, dan sesuai ketentuan hukum yang berlaku.",
    icon: "Gavel",
  },
  {
    id: "aset-collateral",
    title: "Aset Collateral Bangsa",
    description:
      "Penanganan aset collateral bernilai strategis bagi negara dengan pendekatan profesional, menjaga keamanan dan integritas setiap proses.",
    icon: "ShieldCheck",
  },
];

export const WHY_US: WhyUsItem[] = [
  {
    id: "legalitas",
    title: "Legalitas Resmi",
    description:
      "Terdaftar resmi di Kemenkumham RI dan beroperasi penuh sesuai kerangka hukum yang berlaku.",
    icon: "BadgeCheck",
    stat: { value: 2026, label: "Tahun Berdiri" },
  },
  {
    id: "nasional",
    title: "Jangkauan Nasional",
    description:
      "Menangani aset di seluruh wilayah Indonesia dengan jaringan yang luas dan terkoordinasi.",
    icon: "Globe2",
    stat: { value: 5, suffix: "+", label: "Kategori Aset" },
  },
  {
    id: "akuntabel",
    title: "Profesional & Akuntabel",
    description:
      "Setiap proses dijalankan transparan dengan standar administrasi dan dokumentasi yang ketat.",
    icon: "ClipboardCheck",
    stat: { value: 100, suffix: "%", label: "Transparan" },
  },
  {
    id: "kebangsaan",
    title: "Fokus Kepentingan Bangsa",
    description:
      "Mengutamakan pemulihan dan pemanfaatan aset demi nilai kebangsaan, bukan sekadar komersial.",
    icon: "Flag",
  },
];

export const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Kontak", href: "#kontak" },
];
```

- [ ] **Step 3: Verify types compile**

Run:
```bash
pnpm exec tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add types and company content constants"
```

---

## Task 5: Contact zod schema (TDD)

**Files:**
- Create: `lib/contact-schema.ts`
- Create: `lib/contact-schema.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: Add vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { environment: "node" },
});
```

Add a test script to `package.json` `scripts`: `"test": "vitest run"`.

- [ ] **Step 2: Write the failing test**

Create `lib/contact-schema.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactSchema.safeParse({
      name: "Budi Santoso",
      email: "budi@example.com",
      phone: "08123456789",
      message: "Saya tertarik dengan layanan pengelolaan aset.",
    });
    expect(result.success).toBe(true);
  });

  it("accepts payload without optional phone", () => {
    const result = contactSchema.safeParse({
      name: "Budi",
      email: "budi@example.com",
      message: "Pesan yang cukup panjang untuk lolos.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short name", () => {
    const result = contactSchema.safeParse({
      name: "B",
      email: "budi@example.com",
      message: "Pesan yang cukup panjang untuk lolos.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Budi",
      email: "not-an-email",
      message: "Pesan yang cukup panjang untuk lolos.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 chars", () => {
    const result = contactSchema.safeParse({
      name: "Budi",
      email: "budi@example.com",
      message: "pendek",
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run:
```bash
pnpm test lib/contact-schema.test.ts
```
Expected: FAIL — cannot resolve `@/lib/contact-schema`.

- [ ] **Step 4: Implement the schema**

Create `lib/contact-schema.ts`:

```ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional(),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 5: Run test to verify it passes**

Run:
```bash
pnpm test lib/contact-schema.test.ts
```
Expected: PASS — 5 passed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add contact form zod schema with tests"
```

---

## Task 6: Resend client and contact API route (TDD)

**Files:**
- Create: `lib/resend.ts`
- Create: `app/api/contact/route.ts`
- Create: `app/api/contact/route.test.ts`
- Create: `.env.local`, `.env.example`

- [ ] **Step 1: Add env files**

Create `.env.example`:

```env
RESEND_API_KEY=re_xxxxxxxx
CONTACT_EMAIL_TO=asetnusantara247@gmail.com
NEXT_PUBLIC_SITE_URL=https://asetnusantarainternasional.com
```

Create `.env.local` with the same keys (use a placeholder `RESEND_API_KEY` for now; real key added at deploy). Ensure `.env.local` is in `.gitignore` (create-next-app adds it).

- [ ] **Step 2: Create Resend client**

Create `lib/resend.ts`:

```ts
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
```

- [ ] **Step 3: Write the failing route test**

Create `app/api/contact/route.test.ts`. We mock Resend so no real email is sent.

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMock = vi.fn();
vi.mock("@/lib/resend", () => ({
  resend: { emails: { send: (...args: unknown[]) => sendMock(...args) } },
}));

import { POST } from "@/app/api/contact/route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null });
  });

  it("returns 200 and sends email for valid payload", async () => {
    const res = await POST(
      makeRequest({
        name: "Budi Santoso",
        email: "budi@example.com",
        message: "Saya tertarik dengan layanan Anda sekalian.",
      })
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("returns 400 for invalid payload and does not send", async () => {
    const res = await POST(makeRequest({ name: "B", email: "bad", message: "x" }));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 500 when Resend errors", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "fail" } });
    const res = await POST(
      makeRequest({
        name: "Budi Santoso",
        email: "budi@example.com",
        message: "Pesan yang cukup panjang untuk lolos validasi.",
      })
    );
    const json = await res.json();
    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run:
```bash
pnpm test app/api/contact/route.test.ts
```
Expected: FAIL — cannot resolve `@/app/api/contact/route`.

- [ ] **Step 5: Implement the route handler**

Create `app/api/contact/route.ts`:

```ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { resend } from "@/lib/resend";
import { COMPANY_INFO } from "@/lib/constants";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Body tidak valid" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Data tidak valid" },
      { status: 400 }
    );
  }

  const { name, email, phone, message } = parsed.data;

  const { error } = await resend.emails.send({
    from: "Website ANI <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL_TO ?? COMPANY_INFO.email,
    replyTo: email,
    subject: `Inquiry baru dari ${name}`,
    text: [
      `Nama   : ${name}`,
      `Email  : ${email}`,
      `Telepon: ${phone ?? "-"}`,
      "",
      "Pesan:",
      message,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json({ success: false, error: "Gagal mengirim pesan" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

Note: `from` uses Resend's shared `onboarding@resend.dev` until the client verifies a domain; swap to a verified domain sender at deploy.

- [ ] **Step 6: Run test to verify it passes**

Run:
```bash
pnpm test app/api/contact/route.test.ts
```
Expected: PASS — 3 passed.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add contact api route with resend and tests"
```

---

## Task 7: Motion primitives

**Files:**
- Create: `components/motion/Reveal.tsx`
- Create: `components/motion/Stagger.tsx`
- Create: `components/motion/Counter.tsx`
- Create: `components/motion/MagneticButton.tsx`
- Create: `components/motion/TigerWatermark.tsx`

- [ ] **Step 1: Reveal wrapper**

Create `components/motion/Reveal.tsx`:

```tsx
"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Stagger container + item**

Create `components/motion/Stagger.tsx`:

```tsx
"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Counter**

Create `components/motion/Counter.tsx`:

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 4: MagneticButton**

Create `components/motion/MagneticButton.tsx`:

```tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

export function MagneticButton({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
```

- [ ] **Step 5: TigerWatermark (parallax)**

Create `components/motion/TigerWatermark.tsx`. Uses `/tiger-silhouette.svg` (added in Task 12; until then a missing image just renders nothing visible).

```tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TigerWatermark({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.img
        src="/tiger-silhouette.svg"
        alt=""
        style={{ y }}
        className="pointer-events-none select-none opacity-[0.06]"
      />
    </div>
  );
}
```

- [ ] **Step 6: Verify compile**

Run:
```bash
pnpm exec tsc --noEmit
```
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add cinematic motion primitives"
```

---

## Task 8: Header and Footer

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Header (sticky, shrink-on-scroll, mobile drawer)**

Create `components/layout/Header.tsx`:

```tsx
"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";

export function Header() {
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
        <a href="#beranda" className="flex items-center gap-3">
          <img src="/logo-ani.svg" alt={COMPANY_INFO.name} className="h-10 w-auto" />
          <span className="hidden font-display text-lg text-cream sm:block">ANI</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-cream-muted transition-colors hover:text-gold-heritage">
              {l.label}
            </a>
          ))}
          <a href="#kontak" className="rounded-full border border-gold-heritage px-5 py-2 text-sm text-gold-heritage transition-colors hover:bg-gold-heritage hover:text-navy-deep">
            Hubungi Kami
          </a>
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
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-2xl text-cream">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Footer (legalitas badge)**

Create `components/layout/Footer.tsx`:

```tsx
import { COMPANY_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-gold-heritage/20 bg-navy-elevated">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl text-cream">{COMPANY_INFO.name}</h3>
          <p className="mt-3 text-sm text-cream-muted">{COMPANY_INFO.address}</p>
        </div>
        <div className="text-sm text-cream-muted">
          <p>Telp: {COMPANY_INFO.phone}</p>
          <p>Email: {COMPANY_INFO.email}</p>
        </div>
        <div className="text-sm text-cream-muted">
          <p className="text-gold-heritage">Legalitas</p>
          <p className="mt-2">Kemenkumham: {COMPANY_INFO.kemenkumhamNo}</p>
          <p>NPWP: {COMPANY_INFO.npwp}</p>
        </div>
      </div>
      <div className="border-t border-gold-heritage/10 py-5 text-center text-xs text-cream-muted">
        © {COMPANY_INFO.foundedYear} {COMPANY_INFO.name}. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify compile**

Run:
```bash
pnpm exec tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add header and footer"
```

---

## Task 9: Hero, TrustBar, About sections

**Files:**
- Create: `components/sections/HeroSection.tsx`
- Create: `components/sections/TrustBar.tsx`
- Create: `components/sections/AboutSection.tsx`

- [ ] **Step 1: HeroSection**

Create `components/sections/HeroSection.tsx`. The LCP element (h1) animates immediately (not whileInView) so LCP is not delayed.

```tsx
"use client";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TigerWatermark } from "@/components/motion/TigerWatermark";
import { COMPANY_INFO } from "@/lib/constants";

const words = COMPANY_INFO.tagline.split(" ");

export function HeroSection() {
  return (
    <section id="beranda" className="relative flex min-h-screen items-center overflow-hidden">
      <TigerWatermark className="absolute inset-0 flex items-center justify-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/95 to-navy-elevated" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm uppercase tracking-[0.3em] text-gold-heritage"
        >
          {COMPANY_INFO.name}
        </motion.p>

        <h1 className="font-display text-4xl leading-tight text-cream sm:text-6xl md:text-7xl">
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
              className="mr-3 inline-block"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto my-8 h-px w-40 origin-center bg-gold-heritage"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <MagneticButton
            href="#kontak"
            className="inline-block rounded-full bg-gold-heritage px-8 py-4 font-medium text-navy-deep transition-colors hover:bg-gold-bright"
          >
            Hubungi Kami
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TrustBar**

Create `components/sections/TrustBar.tsx`:

```tsx
import { ShieldCheck, FileCheck, CalendarCheck } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Terdaftar Kemenkumham RI" },
  { icon: FileCheck, label: "NPWP Resmi Terdaftar" },
  { icon: CalendarCheck, label: "Berdiri Sejak 2026" },
];

export function TrustBar() {
  return (
    <div className="border-y border-gold-heritage/20 bg-navy-elevated">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-6 py-6 sm:flex-row sm:gap-12">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-cream-muted">
            <Icon className="h-5 w-5 text-gold-heritage" />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: AboutSection**

Create `components/sections/AboutSection.tsx`:

```tsx
import { Reveal } from "@/components/motion/Reveal";
import { COMPANY_INFO } from "@/lib/constants";

const misi = [
  "Mengelola dan memulihkan aset bergerak maupun tidak bergerak secara profesional dan sesuai hukum.",
  "Menjaga dan memanfaatkan aset peninggalan warisan serta aset negara demi kepentingan bangsa.",
  "Memberikan solusi penanganan aset sitaan, bank likuidasi, dan collateral secara akuntabel.",
  "Membangun kepercayaan klien, mitra, dan negara melalui integritas dan kepatuhan legalitas.",
];

export function AboutSection() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Tentang Kami</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl text-cream md:text-4xl">
          Institusi terpercaya dalam pemulihan dan pemanfaatan aset bangsa.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <Reveal delay={0.1}>
          <h3 className="font-display text-2xl text-gold-heritage">Visi</h3>
          <p className="mt-4 text-cream-muted">
            Menjadi institusi terpercaya dalam pemulihan dan pemanfaatan aset nasional, yang
            menjunjung tinggi legalitas, transparansi, dan nilai kebangsaan.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h3 className="font-display text-2xl text-gold-heritage">Misi</h3>
          <ul className="mt-4 space-y-3">
            {misi.map((m) => (
              <li key={m} className="flex gap-3 text-cream-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-heritage" />
                {m}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-16 grid gap-6 rounded-lg border border-gold-heritage/20 bg-navy-elevated p-8 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-cream-muted">Domisili</p>
            <p className="mt-1 text-cream">{COMPANY_INFO.address}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-cream-muted">Legalitas Kemenkumham</p>
            <p className="mt-1 text-cream">{COMPANY_INFO.kemenkumhamNo}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-cream-muted">NPWP</p>
            <p className="mt-1 text-cream">{COMPANY_INFO.npwp}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 4: Verify compile**

Run:
```bash
pnpm exec tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add hero, trust bar, and about sections"
```

---

## Task 10: Services and WhyUs sections

**Files:**
- Create: `components/sections/ServicesSection.tsx`
- Create: `components/sections/WhyUsSection.tsx`

- [ ] **Step 1: ServicesSection (dynamic lucide icons + hover shimmer)**

Create `components/sections/ServicesSection.tsx`:

```tsx
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/lib/constants";
import { icons } from "lucide-react";

export function ServicesSection() {
  return (
    <section id="layanan" className="bg-navy-elevated py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Layanan Kami</p>
          <h2 className="mt-4 font-display text-3xl text-cream md:text-4xl">Lima Kategori Pengelolaan Aset</h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = icons[s.icon as keyof typeof icons];
            return (
              <StaggerItem key={s.id}>
                <div className="group h-full rounded-lg border border-gold-heritage/20 bg-navy-deep p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-heritage hover:shadow-lg hover:shadow-gold-heritage/10">
                  <div className="mb-5 inline-flex rounded-md border border-gold-heritage/30 p-3 text-gold-heritage transition-colors group-hover:bg-gold-heritage group-hover:text-navy-deep">
                    {Icon ? <Icon className="h-6 w-6" /> : null}
                  </div>
                  <h3 className="font-display text-xl text-cream">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-muted">{s.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: WhyUsSection (with counters)**

Create `components/sections/WhyUsSection.tsx`:

```tsx
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { WHY_US } from "@/lib/constants";
import { icons } from "lucide-react";

export function WhyUsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Mengapa Memilih Kami</p>
        <h2 className="mt-4 font-display text-3xl text-cream md:text-4xl">Keunggulan yang Kami Tawarkan</h2>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_US.map((w) => {
          const Icon = icons[w.icon as keyof typeof icons];
          return (
            <StaggerItem key={w.id}>
              <div className="h-full rounded-lg border border-gold-heritage/20 bg-navy-elevated p-7">
                <div className="mb-4 text-gold-heritage">{Icon ? <Icon className="h-7 w-7" /> : null}</div>
                {w.stat && (
                  <p className="font-display text-3xl text-gold-bright">
                    <Counter value={w.stat.value} suffix={w.stat.suffix} />
                  </p>
                )}
                <h3 className="mt-2 font-display text-lg text-cream">{w.title}</h3>
                <p className="mt-2 text-sm text-cream-muted">{w.description}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
```

- [ ] **Step 3: Verify compile**

Run:
```bash
pnpm exec tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add services and why-us sections"
```

---

## Task 11: Contact section with working form

**Files:**
- Create: `components/sections/ContactSection.tsx`

- [ ] **Step 1: ContactSection (react-hook-form + zod + Resend POST)**

Create `components/sections/ContactSection.tsx`:

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { COMPANY_INFO } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-md border border-gold-heritage/30 bg-navy-deep px-4 py-3 text-cream placeholder:text-cream-muted/60 focus:border-gold-heritage focus:outline-none";

  return (
    <section id="kontak" className="bg-navy-elevated py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Kontak</p>
          <h2 className="mt-4 font-display text-3xl text-cream md:text-4xl">Hubungi Kami</h2>
          <p className="mt-4 text-cream-muted">
            Sampaikan kebutuhan Anda terkait pengelolaan dan pemulihan aset. Tim kami akan merespons
            secepatnya.
          </p>
          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-gold-heritage" />
              <span className="text-cream-muted">{COMPANY_INFO.address}</span>
            </div>
            <div className="flex gap-4">
              <Phone className="h-5 w-5 shrink-0 text-gold-heritage" />
              <span className="text-cream-muted">{COMPANY_INFO.phone}</span>
            </div>
            <div className="flex gap-4">
              <Mail className="h-5 w-5 shrink-0 text-gold-heritage" />
              <span className="text-cream-muted">{COMPANY_INFO.email}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input className={inputCls} placeholder="Nama lengkap" {...register("name")} />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <input className={inputCls} placeholder="Email" {...register("email")} />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
            </div>
            <div>
              <input className={inputCls} placeholder="Nomor WA / Telepon (opsional)" {...register("phone")} />
            </div>
            <div>
              <textarea rows={5} className={inputCls} placeholder="Pesan / kebutuhan Anda" {...register("message")} />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-gold-heritage px-8 py-4 font-medium text-navy-deep transition-colors hover:bg-gold-bright disabled:opacity-60"
            >
              {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
            </button>
            {status === "success" && (
              <p className="text-center text-sm text-gold-heritage">
                Terima kasih, pesan Anda telah terkirim. Kami akan segera menghubungi Anda.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami via email.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify compile**

Run:
```bash
pnpm exec tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add contact section with working form"
```

---

## Task 12: Compose homepage, assets, SEO/OG

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Create: `public/logo-ani.svg`, `public/tiger-silhouette.svg`

- [ ] **Step 1: Add placeholder SVG assets**

Create `public/logo-ani.svg` (simple gold "ANI" placeholder; replace with client logo later):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 48" width="120" height="48">
  <rect width="120" height="48" rx="6" fill="#0A1628" stroke="#C9A24B"/>
  <text x="60" y="32" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#C9A24B" letter-spacing="3">ANI</text>
</svg>
```

Create `public/tiger-silhouette.svg` (abstract placeholder shape; replace with real tiger motif later):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <circle cx="300" cy="300" r="260" fill="none" stroke="#C9A24B" stroke-width="2"/>
  <circle cx="300" cy="300" r="200" fill="none" stroke="#C9A24B" stroke-width="1"/>
  <text x="300" y="320" text-anchor="middle" font-family="Georgia, serif" font-size="120" fill="#C9A24B">ANI</text>
</svg>
```

- [ ] **Step 2: Compose the homepage**

Replace `app/page.tsx`:

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <AboutSection />
        <ServicesSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Enable smooth scroll + full metadata**

In `app/globals.css`, add to the bottom:

```css
html {
  scroll-behavior: smooth;
}
```

In `app/layout.tsx`, expand `metadata`:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://asetnusantarainternasional.com"),
  title: "PT Aset Nusantara Internasional | Pemulihan & Pemanfaatan Aset Bangsa",
  description:
    "PT Aset Nusantara Internasional — institusi terpercaya dalam pemulihan dan pemanfaatan aset bergerak, tidak bergerak, warisan, sitaan negara, dan collateral bangsa. Terdaftar resmi Kemenkumham RI.",
  openGraph: {
    title: "PT Aset Nusantara Internasional",
    description: "Pemulihan dan pemanfaatan aset bangsa dengan integritas dan legalitas resmi.",
    type: "website",
    locale: "id_ID",
  },
};
```

- [ ] **Step 4: Verify full build**

Run:
```bash
pnpm build
```
Expected: build succeeds, route `/` and `/api/contact` listed in output.

- [ ] **Step 5: Run full test suite**

Run:
```bash
pnpm test
```
Expected: all tests pass (schema + route).

- [ ] **Step 6: Visual verification in browser**

Run `pnpm dev`, open http://localhost:3000. Confirm:
- Hero animates in, tagline reveals per word, CTA is magnetic on hover
- Sections fade/slide in on scroll; service cards stagger and lift on hover
- Counters animate in Why Us
- Header shrinks on scroll; mobile drawer opens/closes
- Form shows validation errors; valid submit shows success state (with a real `RESEND_API_KEY` an email arrives at `CONTACT_EMAIL_TO`)
- Check responsive at 375px, 768px, 1440px

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: compose homepage, add assets and SEO metadata"
```

---

## Task 13: Lighthouse + deploy prep

**Files:**
- Create: `README.md`

- [ ] **Step 1: Production Lighthouse check**

Run:
```bash
pnpm build && pnpm start
```
In another shell, run Lighthouse (Chrome DevTools or `pnpm dlx lighthouse http://localhost:3000 --only-categories=performance,accessibility --quiet`).
Expected: Performance ≥ 90, Accessibility ≥ 90, LCP < 2.5s. If accessibility flags missing labels, add `aria-label` to inputs. If LCP is high, confirm hero `<h1>` is not animation-delayed.

- [ ] **Step 2: Write README with setup + deploy notes**

Create `README.md`:

```markdown
# PT Aset Nusantara Internasional — Company Profile

Next.js 15 App Router single-page company profile. Heritage Authority design, Framer Motion, Resend contact form.

## Setup
1. `pnpm install`
2. Copy `.env.example` to `.env.local` and fill values.
3. `pnpm dev`

## Environment
- `RESEND_API_KEY` — Resend API key
- `CONTACT_EMAIL_TO` — inbox for inquiries (asetnusantara247@gmail.com)
- `NEXT_PUBLIC_SITE_URL` — production URL for OG tags

## Test
`pnpm test`

## Deploy (Vercel)
- Import repo, set the three env vars in Vercel project settings.
- For production email, verify the client domain in Resend and update the `from` address in `app/api/contact/route.ts`.
- Replace `public/logo-ani.svg` and `public/tiger-silhouette.svg` with real client assets.
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: add readme and deploy notes"
```

- [ ] **Step 4: Deploy to Vercel (optional, when ready)**

Use the `vercel:deploy` skill or run `vercel --prod` after `vercel link`. Set env vars first via `vercel env add`.

---

## Post-Implementation Notes

- **Real assets:** swap placeholder `logo-ani.svg` and `tiger-silhouette.svg` for client files; add a real `public/og-image.png` and reference it in `openGraph.images`.
- **Resend domain:** the `from` uses `onboarding@resend.dev` until the client's domain is verified.
- **Content:** all copy is approved-draft from the spec; replace with client-final text when provided.
- **Future:** because this is not a static export, a `/artikel` blog route + backend can be added later without re-architecture.
```
