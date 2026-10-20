/**
 * Loads the Google Fonts stylesheet after first paint so it never blocks rendering (audit task 10).
 * The <link> carries data-deferred-font so the pre-render step can leave it out of the static HTML.
 */
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap";

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };

export function loadFonts(): void {
  if (typeof document === "undefined" || document.querySelector("link[data-deferred-font]")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FONTS_HREF;
  link.setAttribute("data-deferred-font", "");
  const add = () => document.head.appendChild(link);
  const idle = (window as IdleWindow).requestIdleCallback;
  if (idle) idle(add, { timeout: 1500 });
  else window.setTimeout(add, 0);
}
