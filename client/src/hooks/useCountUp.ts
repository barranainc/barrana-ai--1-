import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Only starts when `trigger` is true (e.g. when element is in view).
 * If the value is non-numeric (e.g. "Fixed"), returns the raw string immediately.
 */
export function useCountUp(
  target: number | string,
  duration = 2200,
  trigger = true
): string {
  const [display, setDisplay] = useState<string>("0");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof target === "string" && isNaN(Number(target))) {
      setDisplay(target);
      return;
    }
    if (!trigger) return;

    const numTarget = typeof target === "number" ? target : Number(target);

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numTarget);
      setDisplay(String(current));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(String(numTarget));
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [target, duration, trigger]);

  return display;
}
