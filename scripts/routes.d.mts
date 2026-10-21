/** Type declarations for routes.mjs so the client and server can import the shared route inventory. */
export interface RouteEntry {
  path: string;
  priority: number;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

export declare const routes: RouteEntry[];
export declare const prerenderOnlyRoutes: string[];
export declare const errorRoutes: string[];
export declare const prerenderPaths: string[];
/** Retired URL -> canonical destination (audit task 1). */
export declare const redirects: Record<string, string>;
