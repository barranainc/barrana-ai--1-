/**
 * Conversion events and GA4 bootstrap (audit task 10).
 *
 * Events are pushed to window.dataLayer and, when gtag is present, sent to GA4. GA4 itself is
 * initialised only if the server's /analytics-config.js carries a measurement ID; consent defaults
 * to "denied" so no analytics cookies are set until a consent flow grants them.
 * Never pass names, emails, phone numbers or free-text form content as event parameters.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    barranaAnalyticsConfig?: { measurementId?: string; defaultConsent?: "granted" | "denied" };
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params: EventParams = {}): void {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    window.gtag?.("event", name, params);
  } catch {
    /* analytics must never break the page */
  }
}

export function trackPageView(path: string): void {
  if (!window.gtag) return;
  window.gtag("event", "page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
}

let started = false;

/** Loads /analytics-config.js and, if a GA4 ID is configured, the gtag library. Safe to call once at startup. */
export function initAnalytics(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  if (navigator.webdriver) return; // pre-rendering and automated checks must not register as traffic
  const config = document.createElement("script");
  config.src = "/analytics-config.js";
  config.async = true;
  config.onload = () => {
    const id = window.barranaAnalyticsConfig?.measurementId;
    if (!id) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    const denied = (window.barranaAnalyticsConfig?.defaultConsent || "denied") === "denied";
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: denied ? "denied" : "granted",
    });
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view: false, anonymize_ip: true });
    trackPageView(window.location.pathname);
    const lib = document.createElement("script");
    lib.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    lib.async = true;
    document.head.appendChild(lib);
  };
  document.head.appendChild(config);
}
