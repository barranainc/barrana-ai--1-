/**
 * Cookie consent banner (audit R4, owner choice A): Google Analytics and the Meta Pixel load only after
 * "Accept". "Reject" is as prominent as "Accept". The banner reappears from "Cookie settings" in the footer.
 *
 * It renders only in a real browser after hydration (never during pre-rendering), is position: fixed so it
 * cannot shift page content, and stays small so it is never the page's largest paint.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { deleteCookies, getConsent, onConsentChange, onOpenConsentSettings, setConsent, type ConsentChoice } from "@/lib/consent";
import { disableAnalytics, initAnalytics } from "@/lib/analytics";
import { disableMetaPixel, enableMetaPixel } from "@/lib/metaPixel";

function apply(choice: ConsentChoice) {
  if (choice === "granted") {
    initAnalytics();
    enableMetaPixel();
  } else {
    disableAnalytics();
    disableMetaPixel();
    deleteCookies(/^_fb/);
  }
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (navigator.webdriver) return; // keep the banner out of pre-rendered HTML
    const stored = getConsent();
    if (stored) apply(stored);
    else setOpen(true);
    const offChange = onConsentChange(apply);
    const offOpen = onOpenConsentSettings(() => setOpen(true));
    return () => {
      offChange();
      offOpen();
    };
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setOpen(false);
  };

  return (
    <section
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-xl shadow-slate-900/10 sm:inset-x-4 sm:bottom-4 sm:flex sm:items-center sm:gap-4"
    >
      <p className="text-xs leading-5 sm:flex-1">
        We use Google Analytics and the Meta Pixel to measure visits and ads, only if you accept.{" "}
        <Link href="/privacy-policy#tracking" className="font-semibold text-[#283891] underline underline-offset-2">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-3 flex gap-2 sm:mt-0 sm:shrink-0">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-10 flex-1 rounded-lg border border-[#283891] px-4 text-xs font-bold text-[#283891] transition hover:bg-[#283891]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#283891] sm:flex-none"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-10 flex-1 rounded-lg border border-[#283891] bg-[#283891] px-4 text-xs font-bold text-white transition hover:bg-[#1F2D75] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#283891] sm:flex-none"
        >
          Accept
        </button>
      </div>
    </section>
  );
}
