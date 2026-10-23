/**
 * Conversion events and GA4 bootstrap (audit task 10, R4).
 *
 * GA4 loads only after the visitor accepts analytics (lib/consent.ts, owner choice A): before consent and
 * after a rejection no Google script is requested and no event leaves the browser. The measurement ID
 * comes from the server's /analytics-config.js. Events sent without consent are dropped, not queued.
 * Never pass names, emails, phone numbers or free-text form content as event parameters.
 */
import { deleteCookies, hasConsent } from "./consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    barranaAnalyticsConfig?: { measurementId?: string; defaultConsent?: "granted" | "denied" };
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

type EventParams = Record<string, string | number | boolean>;

let measurementId: string | undefined;

export function trackEvent(name: string, params: EventParams = {}): void {
  if (!hasConsent()) return;
  try {
    window.gtag?.("event", name, params);
  } catch {
    /* analytics must never break the page */
  }
}

export function trackPageView(path: string): void {
  if (!window.gtag || !hasConsent()) return;
  window.gtag("event", "page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
}

function startGtag(id: string): void {
  window.dataLayer = window.dataLayer || [];
  // gtag.js only processes the `arguments` object. An array pushed here is silently ignored,
  // which is how the 20 Oct release loaded GA4 but sent no hits at all.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // Loaded only after an explicit Accept, so analytics storage is granted; advertising signals stay off.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  // `?debug_analytics=1` sends this session to GA4 DebugView, for verifying events after a release.
  const debug = new URLSearchParams(window.location.search).has("debug_analytics");
  window.gtag("config", id, { send_page_view: false, anonymize_ip: true, ...(debug ? { debug_mode: true } : {}) });
  trackPageView(window.location.pathname);
  const lib = document.createElement("script");
  lib.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  lib.async = true;
  document.head.appendChild(lib);
}

let configRequested = false;

/** Loads /analytics-config.js and, if a GA4 ID is configured and the visitor has accepted, gtag.js. */
export function initAnalytics(): void {
  if (typeof window === "undefined" || navigator.webdriver) return; // pre-rendering and automated checks
  if (!hasConsent()) return;
  if (measurementId) {
    // Accepted again after a rejection in the same page view.
    window[`ga-disable-${measurementId}`] = false;
    if (!window.gtag) startGtag(measurementId);
    else window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }
  if (configRequested) return;
  configRequested = true;
  const config = document.createElement("script");
  config.src = "/analytics-config.js";
  config.async = true;
  config.onload = () => {
    measurementId = window.barranaAnalyticsConfig?.measurementId;
    if (measurementId && hasConsent()) startGtag(measurementId);
  };
  document.head.appendChild(config);
}

/** Stops GA4 for the rest of this page view and removes its cookies after the visitor withdraws consent. */
export function disableAnalytics(): void {
  if (measurementId) {
    window[`ga-disable-${measurementId}`] = true;
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
  }
  deleteCookies(/^_ga/);
}
