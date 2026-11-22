import { useEffect } from "react";

/**
 * Magnetic pull: elements matching `selector` drift a few pixels toward the
 * cursor and spring back on leave. Writes `--mag-x` / `--mag-y`, so the
 * visual side lives in styles.css. Skipped for touch and reduced motion.
 */
export default function useMagnetic(selector = ".btn", { strength = 0.26, max = 12 } = {}) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const cleanups = [];

    document.querySelectorAll(selector).forEach((element) => {
      if (element.dataset.magnetic === "on") return;
      element.dataset.magnetic = "on";
      element.classList.add("is-magnetic");

      let frame = 0;

      const clamp = (value) => Math.max(-max, Math.min(max, value));

      const onMove = (event) => {
        if (frame) return;

        const { clientX, clientY } = event;

        frame = requestAnimationFrame(() => {
          frame = 0;

          const rect = element.getBoundingClientRect();
          if (!rect.width || !rect.height) return;

          const dx = (clientX - (rect.left + rect.width / 2)) * strength;
          const dy = (clientY - (rect.top + rect.height / 2)) * strength;

          element.style.setProperty("--mag-x", `${clamp(dx).toFixed(2)}px`);
          element.style.setProperty("--mag-y", `${clamp(dy).toFixed(2)}px`);
        });
      };

      const onLeave = () => {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }

        element.style.setProperty("--mag-x", "0px");
        element.style.setProperty("--mag-y", "0px");
      };

      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);

      cleanups.push(() => {
        if (frame) cancelAnimationFrame(frame);
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", onLeave);
        element.classList.remove("is-magnetic");
        delete element.dataset.magnetic;
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [selector, strength, max]);
}
