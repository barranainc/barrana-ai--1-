/**
 * Route-level code splitting without a layout shift on first load.
 *
 * Pages are pre-rendered to static HTML. With plain React.lazy, the first client render would replace
 * that HTML with the Suspense fallback while the page chunk downloads, which moved the footer and gave
 * the homepage a CLS of 0.315 (PageSpeed, 21 Oct 2026). main.tsx therefore preloads the chunk for the
 * current URL before rendering; once a page is loaded it renders synchronously and never suspends.
 */
import { lazy, type ComponentType } from "react";

type PageModule = { default: ComponentType<any> };

export type PreloadablePage = ComponentType<any> & { preload: () => Promise<void> };

export function lazyPage(importer: () => Promise<PageModule>): PreloadablePage {
  let Loaded: ComponentType<any> | null = null;
  let pending: Promise<PageModule> | null = null;
  const load = () => {
    pending ??= importer().then((module) => {
      Loaded = module.default;
      return module;
    });
    return pending;
  };
  const Lazy = lazy(load);
  const Page = ((props: Record<string, unknown>) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />)) as PreloadablePage;
  Page.preload = () => load().then(() => undefined);
  return Page;
}

/** Converts a wouter path such as "/services/:slug" into an exact-match regular expression. */
function toRegExp(pattern: string): RegExp {
  const source = pattern
    .split("/")
    .map((part) => (part.startsWith(":") ? "[^/]+" : part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    .join("/");
  return new RegExp(`^${source}/?$`);
}

/**
 * Loads the chunk for the first route that matches `pathname` (same order as the <Switch>).
 * Never rejects and gives up after `timeoutMs`, so a slow network only costs the old behaviour.
 */
export function preloadRoute(
  table: ReadonlyArray<readonly [string, PreloadablePage | ComponentType<any>]>,
  pathname: string,
  timeoutMs = 4000,
): Promise<void> {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const match = table.find(([pattern]) => toRegExp(pattern).test(path));
  const page = match?.[1] as Partial<PreloadablePage> | undefined;
  if (!page?.preload) return Promise.resolve();
  return Promise.race([page.preload().catch(() => undefined), new Promise<void>((resolve) => setTimeout(resolve, timeoutMs))]);
}
