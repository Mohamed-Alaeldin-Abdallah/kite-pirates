# Kite Pirates — Webapp

Premium, multilingual, conversion-focused webapp for **Kite Pirates Egypt** — kite surfing & Red Sea experiences in Hurghada. Cinematic, fast, and built around one goal: turn a visitor into a booked pirate.

Built per the *Kite Pirates Webapp Development* brief, with design refinements and a security/privacy layer added on top. No original concept was removed.

---

## Stack

React 18 + Vite · Tailwind CSS + CSS custom properties · Framer Motion · React Router v6 · react-i18next (EN, DE, FR, RU, **AR/RTL**) · React Helmet Async + JSON-LD · React Hook Form + Zod · Lucide icons.

## Getting started

```bash
cp .env.example .env      # fill in values (see below)
npm install
npm run dev               # http://localhost:5173
npm run build             # production build → dist/
npm run preview           # preview the production build
```

## Environment variables

Public values are `VITE_`-prefixed and **bundled into the client** — never put secrets there. Server-only secrets (no prefix) are read only inside `/api` functions; set them in your host's dashboard.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `VITE_WHATSAPP_NUMBER` | public | Click-to-chat number (digits only) |
| `VITE_SITE_URL` | public | Canonical/hreflang/JSON-LD origin |
| `VITE_GA4_ID`, `VITE_META_PIXEL_ID` | public | Analytics — **only fire after consent** |
| `BOOKING_EMAIL_API_KEY` | secret | Transactional email key (e.g. Resend) |
| `BOOKING_TO_EMAIL` / `BOOKING_FROM_EMAIL` | secret | Booking inbox / sender |
| `ALLOWED_ORIGINS` | secret | CORS allowlist for `/api/booking` |

## Architecture

`src/components` UI · `src/pages` routes · `src/data` content · `src/i18n` locales · `src/seo` meta + JSON-LD · `src/hooks` · `src/lib` config/locale/validation/analytics · `api/` serverless booking handler.

The 6 brief pages map to: Home `/`, Experience `/experience`, Packages `/packages`, Programs `/programs`, About `/about`, Contact & Book `/book` (plus `/privacy` and a 404). Each locale is reachable via a prefix (`/de`, `/fr`, `/ru`, `/ar`); English is the unprefixed default.

---

## Design refinements (concepts unchanged)

- RTL support added for the **Arabic** locale (`<html dir>` flips automatically; directional icons mirror via `.flip-rtl`).
- Reduced-motion is fully honoured — all reveals, page transitions and accordions degrade to static for users who request it.
- Stronger focus-visible rings, skip-link, semantic table/accordion ARIA, balanced headings.
- Cinematic depth via film-grain + radial teal glow overlays, kept GPU-cheap.

## Security & privacy

This build prioritises **data & privacy** and **dependency/build safety**:

- **Consent-gated analytics.** GA4 and Meta Pixel load *only* after the user accepts the cookie banner. Decline → nothing loads. GA4 runs with `anonymize_ip` and Google Signals off. Choice persists in `localStorage` (`kp-consent`).
- **Privacy notice** (`/privacy`) — GDPR-aware template covering what's collected, why, retention and user rights. *(Have it legally reviewed before launch.)*
- **Form handling.** No email address or SMTP credentials sit in the client. Submissions POST to a serverless function (`/api/booking`) that holds the secret email key. Validation runs with the **same Zod schema on client and server** (defence in depth), plus length caps, a **honeypot** field, an origin allowlist, and best-effort rate limiting. Email values are HTML-escaped before sending to prevent inbox injection.
- **No `dangerouslySetInnerHTML`, no `eval`.** JSON-LD is serialised only from our own trusted data.
- **Hardened headers** (`vercel.json` / `netlify.toml`): Content-Security-Policy, HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`.
- **Pinned dependencies** and `.env` git-ignored; only `.env.example` is committed.

> The in-memory rate limiter slows casual abuse but is per-instance — add an edge/WAF rate limit (e.g. Vercel/Cloudflare) for production.

## Before launch — fill in

Real WhatsApp number · hero video (`/public/media/hero.mp4` + `.webm`) and OG images (`/public/og/*.jpg`) · client photography (drops into `ImgPlaceholder` `src`) · verified Tripadvisor/Google reviews (replace placeholders) · instructor profiles · payment account details · full DE/FR/RU translations (currently scaffolded; EN + AR complete) · legal entity details in the privacy notice.

---

Sail together. Ship together. 🏴‍☠️
