/**
 * Meta Pixel, loaded only after consent (audit R4, owner choice A).
 *
 * Replaces the old /meta-pixel.js base code, which loaded fbevents.js and set the _fbp cookie on every
 * visit. Before consent nothing is requested from Meta and no events are kept: PageView and Lead calls
 * made without consent are dropped, not queued for later.
 */
import { hasConsent } from "./consent";

const PIXEL_ID = "1757222568845282";
const SCRIPT_SRC = "https://connect.facebook.net/en_US/fbevents.js";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let started = false;
/** Whether Meta currently has consent in this page view (grant and revoke can alternate). */
let granted = false;

/** Installs Meta's standard fbq stub and requests fbevents.js. Runs at most once per page view. */
function load(): void {
  if (started) return;
  started = true;
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = SCRIPT_SRC;
    document.head.appendChild(script);
  }
}

/**
 * Call when consent is granted (on load with a stored choice, or on every Accept). The first call loads the
 * pixel, grants consent, initialises it and sends the PageView; a later Accept after a Reject in the same page
 * view only grants consent again (R4a, 25 Oct 2026: re-accepting used to return early and never re-grant).
 */
export function enableMetaPixel(): void {
  if (typeof window === "undefined" || navigator.webdriver || !hasConsent() || granted) return;
  const first = !started;
  load();
  window.fbq!("consent", "grant");
  granted = true;
  if (first) {
    window.fbq!("init", PIXEL_ID);
    window.fbq!("track", "PageView");
  }
}

/** Revokes Meta consent for the rest of this page view after the visitor rejects. */
export function disableMetaPixel(): void {
  if (!started || !granted) return;
  window.fbq?.("consent", "revoke");
  granted = false;
}

/** Sends a Meta event only while the visitor has accepted; otherwise the call is dropped. */
export function trackMeta(event: "PageView" | "Lead", params?: Record<string, string>): void {
  if (!started || !granted || !hasConsent()) return;
  try {
    window.fbq?.("track", event, params);
  } catch {
    /* tracking must never break the page */
  }
}
