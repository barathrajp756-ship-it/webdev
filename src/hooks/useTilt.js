import { useCallback, useEffect, useRef } from "react";

/**
 * Mouse-tracking 3D tilt for cards.
 *
 * Writes `--rx`, `--ry` (rotation) and `--mx`, `--my` (spotlight position) as
 * CSS custom properties, so the visual side lives entirely in styles.css.
 * Pointer events are throttled to one update per animation frame, and the
 * effect is disabled for touch input and `prefers-reduced-motion`.
 */
export default function useTilt({ max = 7 } = {}) {
  const ref = useRef(null);
  const frame = useRef(0);
  const enabled = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      enabled.current = !query.matches;
    };

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    []
  );

  const onPointerMove = useCallback(
    (event) => {
      if (!enabled.current || event.pointerType === "touch") return;

      const element = ref.current;
      if (!element || frame.current) return;

      const { clientX, clientY } = event;

      frame.current = requestAnimationFrame(() => {
        frame.current = 0;

        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;

        element.style.setProperty("--ry", `${((x - 0.5) * max * 2).toFixed(2)}deg`);
        element.style.setProperty("--rx", `${((0.5 - y) * max * 2).toFixed(2)}deg`);
        element.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        element.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        element.classList.add("is-tilting");
      });
    },
    [max]
  );

  const onPointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }

    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
    element.style.setProperty("--mx", "50%");
    element.style.setProperty("--my", "50%");
    element.classList.remove("is-tilting");
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
