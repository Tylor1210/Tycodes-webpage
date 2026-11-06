import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

export { routes } from "./routes";
export { jsonLdFor } from "./seo";

// Used only by scripts/prerender.mjs at build time.
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
}
