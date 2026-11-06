import { routes, SITE } from "./routes";

/*
 * Structured data for each prerendered page.
 * CONSTRAINT: markup must describe what is visible on the page. Prices and service areas here
 * must match the page copy. There is no FAQ markup because no page has a visible FAQ.
 */
const BUSINESS_ID = `${SITE}/#business`;

const areaServed = [
  { "@type": "AdministrativeArea", name: "Broward County, Florida" },
  { "@type": "AdministrativeArea", name: "Miami-Dade County, Florida" },
  { "@type": "AdministrativeArea", name: "Palm Beach County, Florida" },
];

const services = [
  {
    path: "/ai-visibility",
    name: "AI Visibility",
    description:
      "Setup and monthly care that helps customers find your business when they ask AI tools and search for a recommendation. For trades and local service businesses.",
    price: { "@type": "UnitPriceSpecification", price: 400, priceCurrency: "USD", unitCode: "MON", description: "Starting price per month, plus a one-time setup quoted on the call" },
  },
  {
    path: "/tech-partner",
    name: "Tech Partner",
    description:
      "Software set up, AI tools for your office, and accounts and backups locked down, with ongoing monthly support.",
    price: { "@type": "UnitPriceSpecification", price: 250, priceCurrency: "USD", unitCode: "MON", description: "Starting price per month" },
  },
  {
    path: "/3d-scroll-shop",
    name: "3D Scroll Shop",
    description:
      "A product page that moves as people scroll and drops them straight into checkout. A one-time project for product brands.",
    price: { "@type": "PriceSpecification", price: 1500, priceCurrency: "USD", description: "Starting price for a one-time project" },
  },
];

const business = {
  "@type": ["ProfessionalService", "Organization"],
  "@id": BUSINESS_ID,
  name: "Tycodes",
  legalName: "Tycodes LLC",
  url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/logo.png`, width: 512, height: 512 },
  image: `${SITE}/og-image.png`,
  email: "tylor@tycodes.dev",
  description:
    "Tycodes is a South Florida tech partner that helps local businesses get found by customers, handle their technology, and sell products online.",
  address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
  areaServed,
  founder: { "@type": "Person", name: "Tylor" },
  sameAs: ["https://github.com/Tylor1210"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tycodes services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      priceSpecification: s.price,
      itemOffered: { "@type": "Service", name: s.name, description: s.description, url: `${SITE}${s.path}` },
    })),
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: "Tycodes",
  publisher: { "@id": BUSINESS_ID },
};

export function jsonLdFor(path: string): object {
  if (path === "/") return { "@context": "https://schema.org", "@graph": [business, website] };

  const s = services.find((x) => x.path === path);
  const meta = routes.find((r) => r.path === path);
  if (!s || !meta) return { "@context": "https://schema.org", "@graph": [website] };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: `${SITE}${s.path}`,
        provider: { "@id": BUSINESS_ID },
        areaServed,
        offers: { "@type": "Offer", priceSpecification: s.price },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: s.name, item: `${SITE}${s.path}` },
        ],
      },
    ],
  };
}
