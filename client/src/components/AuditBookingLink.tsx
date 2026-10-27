/**
 * Booking links for the free Automation Audit (owner decision, 27 Oct 2026): every "Book a free audit"
 * button opens the owner's Calendly page in a new tab. The URL lives in lib/booking.ts.
 */
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { Link } from "wouter";
import { CALENDLY_URL } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";

export { CALENDLY_URL };

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & { children?: ReactNode };

// Bookings happen on Calendly, so the click is the booking signal the site can see (sent only after consent).
function trackBookingClick() {
  trackEvent("book_audit_click", { page_path: window.location.pathname });
}

/** "Book a free audit" button or link: opens Calendly in a new tab, keeping the caller's className/style. */
export default function AuditBookingLink({ children, onClick, ...props }: AnchorProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackBookingClick();
    onClick?.(event);
  };
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" {...props} onClick={handleClick}>
      {children}
    </a>
  );
}

/** For data-driven CTAs: external URLs open in a new tab with a plain <a>, internal paths use wouter's <Link>. */
export function CtaLink({ href, children, onClick, ...props }: AnchorProps & { href: string }) {
  if (/^https?:\/\//.test(href)) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (href === CALENDLY_URL) trackBookingClick();
      onClick?.(event);
    };
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} onClick={handleClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
