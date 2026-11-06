// Metadata for every prerendered page. Used by scripts/prerender.mjs (via entry-server) and by main.tsx.
export const SITE = "https://tycodes.dev";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
}

export const routes: RouteMeta[] = [
  {
    path: "/",
    title: "Free Website Audit and Local Tech Partner | Tycodes, South Florida",
    description:
      "Tycodes helps South Florida businesses get found by customers, handle their tech, and sell online. Book a free 15 minute audit call.",
  },
  {
    path: "/ai-visibility",
    title: "AI Visibility for Local Businesses | Tycodes, South Florida",
    description:
      "Help customers find your business when they ask ChatGPT and Google for a recommendation. Setup and monthly care for South Florida local service businesses.",
  },
  {
    path: "/tech-partner",
    title: "Tech Partner for Small Businesses | Tycodes, South Florida",
    description:
      "Software, accounts, backups and AI tools for your office, set up properly and looked after monthly by one person you can call. Serving South Florida.",
  },
  {
    path: "/3d-scroll-shop",
    title: "3D Scroll Shop for Product Brands | Tycodes",
    description:
      "A product page that moves as people scroll and drops them straight into checkout. A one-time project for product brands. Try the demo maker at tycodes.app.",
  },
];

export const prerenderedPaths = routes.map((r) => r.path);
