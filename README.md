# Dhruv Chandrawanshi — Portfolio

[![dhruvdeveloper.me](https://img.shields.io/badge/live-dhruvdeveloper.me-7C3AED?style=flat-square)](https://dhruvdeveloper.me)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square)](https://tailwindcss.com)

> "AI builds. I direct. The internet listens."

Premium animation portfolio for **Dhruv Chandrawanshi** — indie builder shipping
websites, Telegram bots, and AI automations.

## What's inside

- **Aurora Violet** design system — violet → pink → amber gradient on deep
  purple-black, with a warm off-white light mode.
- **Custom cursor** (dot + ring, magnetic, mix-blend-difference) — desktop only.
- **Interactive cursor-following grid** — CSS radial mask, no canvas, no per-dot DOM.
- **Lenis smooth scroll** + GSAP-friendly hash-link interception.
- **3D service mocks** — live Telegram bot chat animation and Ubuntu VPS dashboard.
- **AI chatbot widget** — Groq-powered Llama 3.3 70B replies as Dhruv's
  assistant.
- **Contact form** → server route → Telegram bot notification (token never hits
  the frontend).
- **SEO**: full Open Graph image, JSON-LD Person schema, sitemap, robots.
- **A11y**: respects `prefers-reduced-motion`; semantic landmarks; focus styles.

## Tech

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind v4 (CSS-first tokens)
- Framer Motion · GSAP-style scroll effects via Motion + Lenis
- Lucide icons
- Node 20+

## Run locally

```bash
npm install
cp .env.local.template .env.local
# Fill in DHRUV_PORTFOLIO_TELEGRAM_BOT_TOKEN and GROQ_API_KEY
npm run dev
```

Then open <http://localhost:3000>.

## Environment variables

| Name                                  | Required | Purpose                                              |
| ------------------------------------- | -------- | ---------------------------------------------------- |
| `DHRUV_PORTFOLIO_TELEGRAM_BOT_TOKEN`  | yes      | Used by `/api/contact` to send form leads to Telegram. |
| `TELEGRAM_CHAT_ID`                    | yes      | Chat (or user) ID that receives the notification.    |
| `GROQ_API_KEY`                        | yes      | Used by `/api/chat` (Groq Llama 3.3 70B).            |
| `NEXT_PUBLIC_SITE_URL`                | no       | Used for absolute URLs in metadata / sitemap.        |

## Project structure

```
app/
  api/
    chat/route.ts        # Groq chat proxy
    contact/route.ts     # Telegram lead notifier
  globals.css            # Tailwind v4 + design tokens
  layout.tsx             # Metadata, providers, structured data, OG
  page.tsx               # Composes all sections
  opengraph-image.tsx    # Dynamic OG (edge)
  sitemap.ts / robots.ts # SEO files
components/
  ai-chat.tsx            # Floating Groq widget
  cursor.tsx             # Magnetic custom cursor
  grid-background.tsx    # Cursor-following grid
  logo.tsx               # Animated D monogram
  navbar.tsx             # Theme toggle + nav
  mocks/                 # TG bot + VPS dashboard 3D mocks
  providers/             # Theme + Lenis providers
  sections/              # Hero, marquee, work, stack, services, about, contact, footer
lib/
  content.ts             # Single source of truth for copy / projects
  use-media-query.ts     # React 19-friendly mediaQuery hook
  utils.ts               # cn / clamp / lerp
public/projects/         # Project case-study screenshots
docs/screenshots/        # Site screenshots used in the PR
DEPLOYMENT.md            # VPS (Docker + Nginx) deployment guide
```

## Performance

- Static landing prerendered at build time.
- All animations use transform/opacity only.
- Custom cursor + interactive grid are desktop-only (skipped on touch).
- All motion respects `prefers-reduced-motion`.

## Scripts

```bash
npm run dev      # turbopack dev server
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint + react-hooks rules
```

## License

Personal portfolio for Dhruv Chandrawanshi. All rights reserved.
