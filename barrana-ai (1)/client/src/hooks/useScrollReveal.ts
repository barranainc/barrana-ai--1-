/**
 * useScrollReveal.ts
 * Barrana.ai — Scroll-based reveal animation hook
 * Returns a ref and a boolean indicating if the element is visible
 */

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * CSS class helper for scroll reveal animations
 */
export function revealClass(isVisible: boolean, delay = 0, direction: "up" | "left" | "right" | "none" = "up") {
  const transforms: Record<string, string> = {
    up: isVisible ? "translateY(0)" : "translateY(32px)",
    left: isVisible ? "translateX(0)" : "translateX(-32px)",
    right: isVisible ? "translateX(0)" : "translateX(32px)",
    none: "none",
  };

  return {
    opacity: isVisible ? 1 : 0,
    transform: transforms[direction],
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
  };
}
