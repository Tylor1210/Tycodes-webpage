import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BackgroundGlow, MotionRoot } from "./motion";

/** Common frame for every prerendered page: motion config, background glow, header, footer. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <MotionRoot>
      <BackgroundGlow />
      <Header />
      <main>{children}</main>
      <Footer />
    </MotionRoot>
  );
}
