import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";

/*
 * Scroll-driven 3D product for the 3D Scroll Shop page.
 * WHY: three.js is imported dynamically inside the effect, so it never ships with the home page
 * and never runs during prerendering. Until it loads (and for reduced motion or no WebGL) the
 * SVG poster below is what people see.
 * CONSTRAINT: the render loop only runs while the stage is on screen, and pixel ratio is capped
 * on touch devices so phones stay smooth.
 * GOTCHA: the canvas is created and removed inside the effect (not by React) so React
 * StrictMode remounts never reuse a canvas whose WebGL context was already released.
 */

export const SWATCHES = [
  { name: "Teal", hex: "#0F766E" },
  { name: "Slate", hex: "#1E293B" },
  { name: "Sand", hex: "#D9C3A0" },
] as const;

type Three = typeof import("three");
type RoomEnv = typeof import("three/examples/jsm/environments/RoomEnvironment.js").RoomEnvironment;

export function ProductPoster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 320" role="img" aria-label="Product bottle" className={className}>
      <ellipse cx="100" cy="300" rx="62" ry="9" fill="#0f172a" opacity="0.12" />
      <rect x="82" y="22" width="36" height="30" rx="5" fill="#0f172a" />
      <path
        d="M84 52h32v26c0 14 38 22 38 52v150c0 8-6 14-14 14H60c-8 0-14-6-14-14V130c0-30 38-38 38-52z"
        fill="#0F766E"
      />
      <path d="M62 140c0-10 8-18 18-22v168c-10 0-18-4-18-12z" fill="#fff" opacity="0.18" />
      <rect x="46" y="170" width="108" height="70" fill="#F8FAFC" />
      <rect x="46" y="228" width="108" height="12" fill="#0F766E" />
      <text x="100" y="204" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="15" fill="#0f172a">
        YOUR PRODUCT
      </text>
    </svg>
  );
}

const sm = (a: number, b: number, x: number) => {
  const v = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return v * v * (3 - 2 * v);
};

function build(
  THREE: Three,
  RoomEnvironment: RoomEnv,
  box: HTMLElement,
  progress: MotionValue<number>,
  pickedRef: { current: number | null },
  onReady: () => void,
) {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const canvas = document.createElement("canvas");
  canvas.className = "absolute inset-0 h-full w-full";
  canvas.setAttribute("aria-hidden", "true");
  box.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !coarse, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.85;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(3, 5, 4);
  const rim = new THREE.DirectionalLight(0xcffafe, 1.1);
  rim.position.set(-4, 2, -3);
  scene.add(key, rim);

  // Bottle body from a profile revolved around the vertical axis.
  const BASE = -1.4;
  const profile = [
    [0, 0], [0.62, 0], [0.7, 0.04], [0.74, 0.2], [0.74, 1.5], [0.7, 1.78],
    [0.5, 2.05], [0.33, 2.3], [0.3, 2.55], [0.3, 2.75],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const segs = coarse ? 48 : 96;
  const bodyGeo = new THREE.LatheGeometry(profile, segs);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: SWATCHES[0].hex,
    roughness: 0.2,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = BASE;

  // Label texture: drawn twice around the bottle so it is visible while rotating.
  const tex = document.createElement("canvas");
  tex.width = 1024;
  tex.height = 256;
  const g = tex.getContext("2d")!;
  g.fillStyle = "#F8FAFC";
  g.fillRect(0, 0, 1024, 256);
  g.fillStyle = "#0F766E";
  g.fillRect(0, 196, 1024, 60);
  g.fillStyle = "#0f172a";
  g.textAlign = "center";
  [256, 768].forEach((x) => {
    g.font = "800 50px Inter, system-ui, sans-serif";
    g.fillText("YOUR PRODUCT", x, 112);
    g.font = "600 24px Inter, system-ui, sans-serif";
    g.fillStyle = "#475569";
    g.fillText("3D SCROLL DEMO", x, 156);
    g.fillStyle = "#0f172a";
  });
  const labelTex = new THREE.CanvasTexture(tex);
  labelTex.colorSpace = THREE.SRGBColorSpace;
  labelTex.anisotropy = 4;
  const labelGeo = new THREE.CylinderGeometry(0.748, 0.748, 0.95, segs, 1, true);
  const labelMat = new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.55 });
  const label = new THREE.Mesh(labelGeo, labelMat);
  const LABEL_Y = BASE + 0.85;
  label.position.y = LABEL_Y;

  const capGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.34, 48);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.25 });
  const cap = new THREE.Mesh(capGeo, capMat);
  const CAP_Y = BASE + 2.75 + 0.17;
  cap.position.y = CAP_Y;

  const product = new THREE.Group();
  product.add(body, label, cap);

  // Soft contact shadow.
  const sh = document.createElement("canvas");
  sh.width = sh.height = 128;
  const sg = sh.getContext("2d")!;
  const grad = sg.createRadialGradient(64, 64, 4, 64, 64, 64);
  grad.addColorStop(0, "rgba(15,23,42,0.55)");
  grad.addColorStop(1, "rgba(15,23,42,0)");
  sg.fillStyle = grad;
  sg.fillRect(0, 0, 128, 128);
  const shadowTex = new THREE.CanvasTexture(sh);
  const shadowGeo = new THREE.PlaneGeometry(3.4, 3.4);
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.5 });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = BASE - 0.005;

  const stage = new THREE.Group();
  stage.add(product, shadow);
  scene.add(stage);

  const palette = SWATCHES.map((s) => new THREE.Color(s.hex));
  const tmp = new THREE.Color();
  const state = { p: progress.get(), ci: 0, aspect: 1, w: 1, h: 1 };

  const resize = () => {
    const w = Math.max(1, box.clientWidth);
    const h = Math.max(1, box.clientHeight);
    renderer.setSize(w, h, false);
    state.w = w;
    state.h = h;
    state.aspect = w / h;
    camera.aspect = state.aspect;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(box);

  let last = performance.now();
  let first = true;
  const tick = () => {
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const k = 1 - Math.exp(-dt * 7);
    const target = progress.get();
    state.p += (target - state.p) * k;
    const p = state.p;
    const t = now / 1000;

    // Camera: wide, then close on the label, then back out, then settle.
    // Tall (phone) screens are narrow, so pull the camera back to keep the whole bottle in frame.
    const portrait = state.aspect < 1;
    const s = sm(0.78, 0.95, p);
    // The last beat adds a checkout card under the product, so phones also shrink it a little more.
    const fit = portrait ? 1.3 + 0.3 * s : 1;
    const dist = (8.2 - 3.0 * sm(0, 0.22, p) + 2.6 * sm(0.22, 0.42, p) - 0.6 * sm(0.42, 0.8, p)) * fit;
    const look = 0.12 - 0.47 * sm(0.04, 0.2, p) + 0.5 * sm(0.26, 0.42, p) + 0.3 * sm(0.3, 0.46, p) - 0.3 * sm(0.6, 0.75, p);
    const elev = 0.05 + 0.1 * sm(0.1, 0.3, p) - 0.1 * sm(0.3, 0.5, p);
    camera.position.set(0, look + elev * dist, dist);
    camera.lookAt(0, look, 0);

    // Product: spins with scroll, comes apart, then comes back together.
    product.rotation.y = p * Math.PI * 2.4 + Math.sin(t * 0.5) * 0.1;
    product.rotation.z = Math.sin(p * Math.PI * 3) * 0.07;
    const e = sm(0.34, 0.5, p) - sm(0.56, 0.68, p);
    cap.position.y = CAP_Y + e * 0.65;
    cap.rotation.y = e * Math.PI * 2;
    cap.rotation.z = e * 0.25;
    label.rotation.y = e * Math.PI * 0.8;
    body.position.y = BASE - e * 0.15;
    label.position.y = LABEL_Y - e * 0.15;

    // Color: follows scroll through the middle, or the visitor's own pick.
    const picked = pickedRef.current;
    const ciTarget = picked !== null ? picked : sm(0.58, 0.66, p) + sm(0.7, 0.78, p);
    state.ci += (ciTarget - state.ci) * k;
    const i0 = Math.min(2, Math.floor(state.ci));
    const i1 = Math.min(2, i0 + 1);
    tmp.copy(palette[i0]).lerp(palette[i1], state.ci - i0);
    bodyMat.color.copy(tmp);

    // Final beat: make room for the checkout card (beside on wide screens, above on tall ones).
    if (portrait) {
      // Lift the picture up the screen so the text below never covers the bottle.
      camera.setViewOffset(state.w, state.h, 0, Math.round(state.h * (0.09 + 0.15 * s)), state.w, state.h);
      stage.position.set(0, 0, 0);
    } else {
      camera.clearViewOffset();
      stage.position.set(-1.7 * s, 0, 0);
    }

    renderer.render(scene, camera);
    if (first) {
      first = false;
      onReady();
    }
  };

  let running = false;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        renderer.setAnimationLoop(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        renderer.setAnimationLoop(null);
      }
    },
    { rootMargin: "100px" },
  );
  io.observe(box);

  return () => {
    io.disconnect();
    ro.disconnect();
    renderer.setAnimationLoop(null);
    [bodyGeo, labelGeo, capGeo, shadowGeo].forEach((x) => x.dispose());
    [bodyMat, labelMat, capMat, shadowMat].forEach((x) => x.dispose());
    labelTex.dispose();
    shadowTex.dispose();
    envTarget.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };
}

export default function ProductScene({ progress, picked }: { progress: MotionValue<number>; picked: number | null }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const pickedRef = useRef<number | null>(picked);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    pickedRef.current = picked;
  }, [picked]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let started = false;
    let cleanup = () => {};

    const start = async () => {
      if (started) return;
      started = true;
      try {
        const [THREE, env] = await Promise.all([
          import("three"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
        ]);
        if (disposed) return;
        cleanup = build(THREE, env.RoomEnvironment, box, progress, pickedRef, () => setReady(true));
      } catch {
        // No WebGL or the chunk failed to load: the poster stays visible.
      }
    };

    // WHY: the scene (about 190KB of code plus rendering) waits for the first sign of a real visitor.
    // The poster paints first, and automated audits that never scroll never pay for WebGL.
    const events = ["scroll", "pointerdown", "keydown", "touchstart", "wheel"] as const;
    const onFirst = () => {
      events.forEach((e) => window.removeEventListener(e, onFirst));
      start();
    };
    if (window.scrollY > 0) start();
    else events.forEach((e) => window.addEventListener(e, onFirst, { passive: true, once: true }));

    return () => {
      disposed = true;
      events.forEach((e) => window.removeEventListener(e, onFirst));
      cleanup();
    };
  }, [progress]);

  return (
    <div ref={boxRef} className="absolute inset-0">
      <div
        className={`absolute inset-0 grid place-items-center transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      >
        <ProductPoster className="h-[62%] w-auto md:h-[72%]" />
      </div>
    </div>
  );
}
