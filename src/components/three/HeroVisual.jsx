import { Suspense, lazy, useEffect, useRef, useState } from "react";

/* The three.js bundle is ~500 kB, so it is loaded on demand instead of
   shipping with the first paint. */
const HeroScene = lazy(() => import("./HeroScene.jsx"));

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export default function HeroVisual() {
  const hostRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (visible) setMounted(true);
  }, [visible]);

  useEffect(() => {
    setWebgl(detectWebGL());

    if (!window.matchMedia) return undefined;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const host = hostRef.current;

    if (!host || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "160px" }
    );

    observer.observe(host);

    /* Background tabs can defer IntersectionObserver, so start mounted when
       the hero is already on screen. */
    const rect = host.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) setVisible(true);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setTabActive(!document.hidden);

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const interactive = webgl && !reduced;

  return (
    <div
      ref={hostRef}
      className={`hero-visual${interactive ? "" : " is-fallback"}`}
      onPointerDown={() => setPulse((value) => value + 1)}
      aria-hidden="true"
    >
      <div className="hero-visual-glow" />
      <div className="hero-visual-grid" />

      {interactive && mounted ? (
        <Suspense fallback={null}>
          <HeroScene pulse={pulse} active={visible && tabActive} />
        </Suspense>
      ) : null}

      {interactive ? (
        <span className="hero-visual-hint">Drag to spin · tap to pulse</span>
      ) : null}
    </div>
  );
}
