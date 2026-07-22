import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { ArrowRight, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <section className="relative min-h-[calc(100vh-70px)] overflow-hidden bg-[#F5F6FA]">
      <SEOHead
        title="Page Not Found | Barrana.ai"
        description="Sorry, the page you are looking for doesn't exist. It may have been moved or deleted."
        robots="noindex, follow"
      />

      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#283891] via-[#7E0F4A] to-[#283891]" style={{ position: "absolute", zIndex: 0 }} />
      <div aria-hidden="true" className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#283891]/[0.06] blur-3xl" style={{ position: "absolute", zIndex: 0 }} />
      <div aria-hidden="true" className="absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-[#7E0F4A]/[0.08] blur-3xl" style={{ position: "absolute", zIndex: 0 }} />

      <div className="container relative grid min-h-[calc(100vh-70px)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:py-24">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-[#7E0F4A]" />
            <span className="text-xs font-extrabold tracking-[0.22em] text-[#7E0F4A]">404</span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#1A1A2E] sm:text-5xl lg:text-6xl">
            Page Not Found
          </h1>

          <p className="mb-9 max-w-lg text-base leading-7 text-[#7B7B7B] sm:text-lg">
            Sorry, the page you are looking for doesn't exist.
            <br />
            It may have been moved or deleted.
          </p>

          <Button
            onClick={handleGoHome}
            className="h-auto rounded-lg bg-[#283891] px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(40,56,145,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7E0F4A] hover:shadow-[0_14px_34px_rgba(126,15,74,0.22)] focus-visible:ring-2 focus-visible:ring-[#283891] focus-visible:ring-offset-2"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]" aria-hidden="true">
          <div className="absolute inset-6 rounded-[2rem] bg-[#283891]/[0.06] blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#E2E4ED] bg-white p-6 shadow-[0_24px_70px_rgba(26,26,46,0.10)] sm:p-9">
            <div className="mb-9 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#283891]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#7E0F4A]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E2E4ED]" />
              </div>
              <div className="h-2 w-24 rounded-full bg-[#E2E4ED]" />
            </div>

            <div className="grid grid-cols-[64px_1fr_64px] items-center gap-3 sm:grid-cols-[76px_1fr_76px] sm:gap-5">
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#283891] shadow-[0_8px_24px_rgba(40,56,145,0.22)]">
                <span className="h-5 w-5 rounded-full border-[5px] border-white" />
              </div>

              <div className="relative h-16">
                <div className="absolute left-0 top-1/2 h-0.5 w-[40%] -translate-y-1/2 bg-[#283891]" />
                <div className="absolute right-0 top-1/2 h-0.5 w-[40%] -translate-y-1/2 bg-[#7E0F4A]" />
                <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center rounded-lg border-2 border-[#7E0F4A] bg-[#FDF7FA]">
                  <span className="block h-0.5 w-4 rotate-45 bg-[#7E0F4A]" />
                </div>
              </div>

              <div className="flex aspect-square items-center justify-center rounded-2xl border-2 border-[#7E0F4A] bg-[#FDF7FA]">
                <ArrowRight className="h-6 w-6 text-[#7E0F4A]" />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              <div className="h-2 rounded-full bg-[#283891]/20" />
              <div className="h-2 rounded-full bg-[#7E0F4A]/20" />
              <div className="h-2 rounded-full bg-[#283891]/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
