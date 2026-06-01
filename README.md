# PT Aset Nusantara Internasional — Company Profile

Next.js 16 App Router single-page company profile. Heritage Authority design, Framer Motion, Resend contact form.

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
