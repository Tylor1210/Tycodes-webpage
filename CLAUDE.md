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
npm run build     # tsc -b && vite build -> dist/
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

### Frontend — single-page React app
- Entry: [src/main.tsx](src/main.tsx) sets up `BrowserRouter` with all routes and wraps the app in `ThemeProvider` (dark by default, persisted to `localStorage` under `tycodes-ui-theme`).
- Routes are flat, one component per marketing page under `src/pages/` (`/digital-presence`, `/brand`, `/projects`, `/services`, `/ship-com`, `/automation`, `/calculator`, `/audit`). [src/App.tsx](src/App.tsx) is the homepage and assembles the primary content grid from components in `src/components/ui/`.
- `src/components/ui/` mixes hand-built marketing components (`Navbar`, `Footer`, `HeroTile`, `MainHeroFunnel`, `AuditForm`) with shadcn/radix primitives (`button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `sheet.tsx`, `textarea.tsx`). New primitives should follow the shadcn conventions in [components.json](components.json) (`@/components/ui` alias, `cn()` helper from [src/lib/utils.ts](src/lib/utils.ts) for class merging).
- Path alias `@/*` → `src/*` (configured in [vite.config.ts](vite.config.ts) and `tsconfig.app.json`).
- Styling is Tailwind with CSS-variable-based theme tokens (`hsl(var(--*))`) defined in [tailwind.config.js](tailwind.config.js) / `src/index.css`, plus a lot of inline utility classes using very small font sizes (`text-[9px]`/`text-[10px]`) and a consistent blue-accent dark theme — match this style when adding UI.
- The homepage grid order matters for mobile: components are placed with explicit `lg:col-start-*`/`lg:row-start-*` so the flat DOM order controls mobile stacking while desktop uses the grid overrides — keep both in sync when reordering sections (see the "fixed for correct mobile stacking order" comment in [src/App.tsx](src/App.tsx)).

### The Audit tool — frontend/backend contract
This is the most architecturally significant feature: an AI-powered "audit" that scrapes a prospective client's site and generates a pricing/savings proposal.

- [src/pages/AuditPage.tsx](src/pages/AuditPage.tsx) calls the deployed `Tycodes-brain` worker directly via `fetch`, using `VITE_API_URL` (falls back to `https://tycodes-auditor.tclont11.workers.dev`) from `.env`/`.env.production`.
- Three API routes, defined in [Tycodes-brain/src/index.ts](Tycodes-brain/src/index.ts):
  - `POST /audit` — full pipeline: scrape (`scraper.ts`, via Firecrawl) → analyze (`analyst.ts`, via OpenAI structured output) → price (`generateAuditPricing`).
  - `POST /calculate` — pricing-only, used by the manual savings calculator ([src/components/SavingsCalculator.tsx](src/components/SavingsCalculator.tsx) / `/calculator` page) without re-scraping.
  - `POST /claim` — lead capture; sends an email via MailChannels (requires DKIM/SPF on `tycodes.dev`).
- Pricing logic (`generateAuditPricing` in `index.ts`) is the source of truth for tiers/margins: it buckets prospects into one of four `TYCODES_TIERS` by detected/estimated revenue, computes "platform tax" leakage (2% Shopify / 2.9% Wix), and derives a performance-based setup fee (20% of projected annual savings) plus payback period. The `AuditData`/`FlatAuditData` shape must stay in sync between [src/pages/AuditPage.tsx](src/pages/AuditPage.tsx) and `Tycodes-brain/src/index.ts` when changing fields.
- CORS in the worker is locked to `http://localhost:5173` and `https://tycodes.dev` — update `app.use('*', cors({...}))` in `index.ts` if adding another frontend origin.

### Deployment
Both projects deploy independently via Wrangler:
- Frontend: [wrangler.jsonc](wrangler.jsonc) — serves `./dist` as a single-page app at the `tycodes.dev` custom domain.
- Backend: `Tycodes-brain/wrangler.toml` — deploys the `tycodes-auditor` worker (Hono API) on its own subdomain/route.
