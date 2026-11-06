# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo contains **two independently deployed projects**:

- **Root (`/`)** — the Tycodes marketing/agency site: a Vite + React SPA deployed to Cloudflare Workers as static assets at `tycodes.dev`.
- **`Tycodes-brain/`** — a separate Cloudflare Worker (Hono API) deployed as `tycodes-auditor`, providing the backend for the site's AI website-audit tool. It has its own `package.json`, `wrangler.toml`, and lockfile — treat it as a distinct package, not a subfolder of the frontend build.

Commands below must be run from the correct directory (`.` for the frontend, `Tycodes-brain/` for the API).

## Commands

### Frontend (root)
```bash
npm run dev       # vite dev server
npm run build     # client build + SSR build + prerender -> dist/
npm run typecheck # tsc -b --noEmit
npm run lint      # eslint .
npm run preview   # build then `wrangler dev` against dist/
npm run deploy    # build then `wrangler deploy` (publishes to tycodes.dev)
```
There is no test suite configured for the frontend.

### Backend (`Tycodes-brain/`)
```bash
cd Tycodes-brain
npx wrangler dev       # local dev
npx wrangler deploy    # deploy the tycodes-auditor worker
```
Secrets (`FIRECRAWL_API_KEY`, `OPENAI_API_KEY`, SMTP vars) are set via `wrangler secret put`, never committed. `Tycodes-brain/README.MD` describes the original design intent (a Python/FastAPI + Firecrawl agent) — the actual implementation is TypeScript/Hono; treat the README as background context, not a spec for the current code.

## Architecture

### Frontend: prerendered React site
- Four prerendered pages (`/`, `/ai-visibility`, `/tech-partner`, `/3d-scroll-shop`) plus the client-only `/audit`. Route metadata (title, description) lives in [src/routes.ts](src/routes.ts); JSON-LD in [src/seo.ts](src/seo.ts). Add a page in both, in [src/AppRoutes.tsx](src/AppRoutes.tsx), and in `public/sitemap.xml`.
- `npm run build` runs the client build, an SSR build of [src/entry-server.tsx](src/entry-server.tsx), then [scripts/prerender.mjs](scripts/prerender.mjs), which writes one HTML file per page into `dist/` (Workers serves `foo.html` at `/foo`). [src/main.tsx](src/main.tsx) hydrates only prerendered paths; other paths render client-side (the `html.spa` guard in `index.html` hides the home HTML there).
- Site components live in `src/components/site/` (shared shell, `ServicePage` layout, `blocks.tsx`, `motion.tsx`). `src/components/ui/` holds shadcn primitives only. Animation uses `motion` (`LazyMotion`); reduced motion is handled in `src/index.css` and the `.motion-only` / `.reduced-only` dual renders.
- The 3D scene ([src/components/site/ProductScene.tsx](src/components/site/ProductScene.tsx), three.js) loads by dynamic import and starts on first user interaction. Keep it that way for Lighthouse.
- Style: one accent (`brand` = Tailwind teal, teal-700 `#0F766E`), self-hosted Inter, white space, rectangular buttons. Copy rules: plain language, no em dashes or dash connectors, never promise rankings or results.
- Redirects and cache headers: `public/_redirects`, `public/_headers`.
- Path alias `@/*` maps to `src/*`.

### The Audit tool — frontend/backend contract
This is the most architecturally significant feature: an AI-powered "audit" that scrapes a prospective client's site and generates a pricing/savings proposal.

- The hero form on the home page does a plain GET to `/audit?domain=&platform=`. [src/pages/AuditPage.tsx](src/pages/AuditPage.tsx) calls the deployed `Tycodes-brain` worker directly via `fetch`, using `VITE_API_URL` (falls back to `https://tycodes-auditor.tclont11.workers.dev`) from `.env`/`.env.production`.
- Three API routes, defined in [Tycodes-brain/src/index.ts](Tycodes-brain/src/index.ts):
  - `POST /audit` — full pipeline: scrape (`scraper.ts`, via Firecrawl) → analyze (`analyst.ts`, via OpenAI structured output) → price (`generateAuditPricing`).
  - `POST /calculate` — pricing-only, used by the manual savings calculator (no UI calls it now; `/calculator` redirects to `/audit`) without re-scraping.
  - `POST /claim` — lead capture; sends an email via MailChannels (requires DKIM/SPF on `tycodes.dev`).
- Pricing logic (`generateAuditPricing` in `index.ts`) is the source of truth for tiers/margins: it buckets prospects into one of four `TYCODES_TIERS` by detected/estimated revenue, computes "platform tax" leakage (2% Shopify / 2.9% Wix), and derives a performance-based setup fee (20% of projected annual savings) plus payback period. The `AuditData`/`FlatAuditData` shape must stay in sync between [src/pages/AuditPage.tsx](src/pages/AuditPage.tsx) and `Tycodes-brain/src/index.ts` when changing fields.
- CORS in the worker is locked to `http://localhost:5173` and `https://tycodes.dev` — update `app.use('*', cors({...}))` in `index.ts` if adding another frontend origin.

### Deployment
Both projects deploy independently via Wrangler:
- Frontend: [wrangler.jsonc](wrangler.jsonc) — serves `./dist` as a single-page app at the `tycodes.dev` custom domain.
- Backend: `Tycodes-brain/wrangler.toml` — deploys the `tycodes-auditor` worker (Hono API) on its own subdomain/route.
