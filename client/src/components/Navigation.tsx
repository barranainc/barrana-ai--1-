import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "Start Here", href: "/start-here" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/resources" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#172865] shadow-xl transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <nav className="site-nav fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur" aria-label="Main navigation">
        <div className="site-nav__inner container flex h-16 items-center justify-between lg:h-[70px]">
          <Link href="/" className="site-nav__logo shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#283891]" aria-label="Barrana.ai home">
            <img src="/barrana-logo.png" alt="Barrana.ai" width="181" height="38" className="h-[38px] w-auto" />
          </Link>

          <div className="site-nav__links hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = location === item.href || (item.href !== "/start-here" && location.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${active ? "bg-[#EEF1FF] text-[#283891]" : "text-slate-700 hover:bg-slate-50 hover:text-[#283891]"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Link href="/contact" className="site-nav__cta hidden min-h-10 items-center gap-2 rounded-lg bg-[#7E0F4A] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#6A0C3E] lg:inline-flex">
            Find the Workflow
            <ArrowRight size={14} aria-hidden="true" />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="site-nav__menu-button inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#172865] transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#283891] lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-main-menu"
          >
            {isOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
          </button>
        </div>

        <div id="mobile-main-menu" hidden={!isOpen} className="site-nav__mobile border-t border-slate-200 bg-white lg:hidden">
          <div className="container py-4">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const active = location === item.href || (item.href !== "/start-here" && location.startsWith(`${item.href}/`));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-lg px-4 py-3 text-sm font-semibold ${active ? "bg-[#EEF1FF] text-[#283891]" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/contact" className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#283891] px-4 py-3 text-sm font-bold text-white">
                Find the Workflow AI Should Fix First
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
