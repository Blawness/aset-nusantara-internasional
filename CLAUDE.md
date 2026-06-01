# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> ⚠️ This is **Next.js 16** with **React 19** and **Tailwind CSS v4**. APIs and conventions differ from older versions — see the AGENTS.md note above and read `node_modules/next/dist/docs/` before writing Next.js code.

## Commands

This project uses **pnpm**.

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (flat config, `eslint-config-next`)
- `pnpm test` — run the Vitest suite once
- `pnpm exec vitest run lib/articles.test.ts` — run a single test file
- `pnpm exec vitest` — watch mode

## What this is

Marketing/company-profile site for **PT Aset Nusantara Internasional** (an Indonesian state-asset recovery company). Multi-page App Router site, content in Indonesian (`lang="id"`), no database — all content is hardcoded in `lib/`. The only server-side behavior is the contact form email.

## Architecture

- **Routing**: App Router pages live in `app/<route>/page.tsx` — `/` (home), `/tentang`, `/layanan`, `/artikel`, `/artikel/[slug]`, `/kontak`. `app/layout.tsx` wraps every page with `<Header>` + `<Footer>` and sets fonts/metadata.
- **Server vs client split**: Pages and sections are Server Components by default. Anything with interactivity, hooks, or Framer Motion is marked `"use client"` (all of `components/motion/*`, `Header`, `ContactSection`). Keep this boundary — don't add `"use client"` to a page just to pull in one animated child; wrap the child instead.
- **Content lives in code, not a CMS**:
  - `lib/constants.ts` — company info, services, "why us" items, and `NAV_LINKS`. This is the single source of truth for site copy and navigation.
  - `lib/articles.ts` — the `ARTICLES` array plus `getArticle`/`getAllSlugs` helpers. `app/artikel/[slug]/page.tsx` is statically generated via `generateStaticParams()` from these. Add an article by appending to the array.
  - `types/index.ts` — shared shapes (`ServiceItem`, `WhyUsItem`, `CompanyInfo`, `ContactFormPayload`). Icons are referenced by lucide name as a string.
- **Components** by role: `components/sections/*` (homepage + page sections), `components/layout/*` (Header/Footer/PageHeader), `components/motion/*` (reusable Framer Motion wrappers like `Reveal`, `Stagger`, `Counter`, `MagneticButton`), `components/ui/*` (shadcn primitives, style `base-nova`), `components/articles/*`.
- **Contact form flow**: `ContactSection` (react-hook-form + `zodResolver`) POSTs to `app/api/contact/route.ts`. The route **re-validates** with the same `contactSchema` from `lib/contact-schema.ts` (shared client/server) and sends mail via Resend. `lib/resend.ts` lazily constructs the Resend client so `next build` doesn't require `RESEND_API_KEY`. The route always fails gracefully (returns `{ success: false }`, never throws).

## Design system

Heritage / navy-and-gold theme defined in `app/globals.css`:
- Custom palette as Tailwind v4 `@theme` tokens: `navy-deep`, `navy-elevated`, `charcoal`, `gold-heritage`, `gold-bright`, `cream`, `cream-muted`. Use these utility classes (e.g. `text-gold-heritage`, `bg-navy-deep`) rather than raw hex.
- Two fonts via `next/font/google`: Playfair Display (`font-display`, used for headings) and Inter (`font-body`). Wired through CSS variables in `app/layout.tsx`.
- The dark/shadcn oklch variables exist but the site renders dark-navy by default (set directly on `body`). Honor `prefers-reduced-motion` — it's globally handled in CSS, so don't fight it in JS.

## Conventions

- Import alias `@/*` maps to the repo root (e.g. `@/lib/constants`, `@/components/...`).
- Tests are colocated `*.test.ts` next to the unit they cover; Vitest runs in the `node` environment.
- Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `NEXT_PUBLIC_SITE_URL` (see `.env.example`).

## Reference docs

Design specs and implementation plans for past work live in `docs/superpowers/specs/` and `docs/superpowers/plans/`; `PRD.md` holds the original product requirements.
