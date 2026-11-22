import { useEffect, useRef } from "react";

const HOT_TARGETS = "a, button, .tool-chip, .founder-card, .service-card, .price-card";

/**
 * Soft green light that trails the cursor and blooms over interactive
 * elements. Pointer-only: skipped for touch input and reduced motion.
 */
export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || typeof window === "undefined" || !window.matchMedia) return undefined;

    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (coarse.matches || reduced.matches) return undefined;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.32;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const tick = () => {
      frame = 0;

      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;

      glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;

      if (Math.abs(targetX - x) > 0.4 || Math.abs(targetY - y) > 0.4) {
        frame = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      glow.classList.add("is-on");

      const target = event.target instanceof Element ? event.target : null;
      glow.classList.toggle("is-hot", Boolean(target && target.closest(HOT_TARGETS)));

      wake();
    };

    const onLeave = () => {
      glow.classList.remove("is-on", "is-hot");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
