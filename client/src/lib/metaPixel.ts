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

/** Installs Meta's standard fbq stub, requests fbevents.js and sends the PageView for the current page. */
function start(): void {
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
  window.fbq("consent", "grant");
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

/** Call once consent is known to be granted (on load with a stored choice, or when the visitor accepts). */
export function enableMetaPixel(): void {
  if (typeof window === "undefined" || navigator.webdriver || !hasConsent()) return;
  start();
}

/** Stops further Meta events in this page view after the visitor withdraws consent. */
export function disableMetaPixel(): void {
  window.fbq?.("consent", "revoke");
}

/** Sends a Meta event only when the visitor has accepted; otherwise the call is dropped. */
export function trackMeta(event: "PageView" | "Lead", params?: Record<string, string>): void {
  if (!started || !hasConsent()) return;
  try {
    window.fbq?.("track", event, params);
  } catch {
    /* tracking must never break the page */
  }
}
