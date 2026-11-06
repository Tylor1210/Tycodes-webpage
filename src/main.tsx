import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "./AppRoutes";
import { prerenderedPaths } from "./routes";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

/*
 * GOTCHA: production HTML for the four marketing pages ships prerendered inside #root. That markup
 * is only valid for its own path, so hydrate there and wipe it for every other path (like /audit,
 * which is served the home page file as the single page app fallback).
 */
const path = location.pathname.replace(/\/+$/, "") || "/";
if (prerenderedPaths.includes(path) && root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  root.textContent = "";
  createRoot(root).render(app);
}
document.documentElement.classList.remove("spa");
