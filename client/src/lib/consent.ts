/**
 * Visitor consent for analytics and advertising measurement (audit R4, owner choice A, 23 Oct 2026).
 *
 * Google Analytics 4 and the Meta Pixel load only after the visitor selects "Accept". Before that,
 * and after "Reject", neither script is requested and nothing is sent to Google or Meta. The choice
 * is stored in localStorage (no cookie) and can be changed at any time from "Cookie settings" in the
 * footer, which reopens the banner.
 */
export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "barrana-consent-v1";
const OPEN_EVENT = "barrana:open-consent";
const CHANGE_EVENT = "barrana:consent-change";

type Stored = { choice: ConsentChoice; at: string };

export function getConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    return parsed.choice === "granted" || parsed.choice === "denied" ? parsed.choice : null;
  } catch {
    return null;
  }
}

export function hasConsent(): boolean {
  return typeof window !== "undefined" && getConsent() === "granted";
}

export function setConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, at: new Date().toISOString() } satisfies Stored));
  } catch {
    /* storage blocked: the choice still applies to this page view */
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CHANGE_EVENT, { detail: choice }));
}

export function onConsentChange(listener: (choice: ConsentChoice) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<ConsentChoice>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

/** Reopens the banner so the visitor can change an earlier choice. */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentSettings(listener: () => void): () => void {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}

/** Deletes first-party cookies whose names match, on this host and the parent domain. */
export function deleteCookies(match: RegExp): void {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0]?.trim();
    if (!name || !match.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
