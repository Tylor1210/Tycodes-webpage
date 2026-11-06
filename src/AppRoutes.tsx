import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AiVisibility from "./pages/AiVisibility";
import TechPartner from "./pages/TechPartner";
import Scroll3D from "./pages/Scroll3D";

// The audit tool is client-only and only needed on /audit, so it loads as its own chunk.
const AuditPage = lazy(() => import("./pages/AuditPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai-visibility" element={<AiVisibility />} />
      <Route path="/tech-partner" element={<TechPartner />} />
      <Route path="/3d-scroll-shop" element={<Scroll3D />} />
      <Route
        path="/audit"
        element={
          <Suspense fallback={null}>
            <AuditPage />
          </Suspense>
        }
      />
      {/* Old pages were merged away. public/_redirects sends crawlers to / with a 301. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
