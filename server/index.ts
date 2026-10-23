/**
 * barrana.ai production server (Express).
 *
 * Reconstructed on 19 Oct 2026 from the server running on Hostinger since 5 Oct 2026, which had
 * diverged from this repository (Gmail lead delivery, security headers, canonical-host handling,
 * trailing-slash and 404 behaviour). Additions from the October SEO audit: permanent redirects for
 * the retired duplicate resource URLs and for /index.html variants (scripts/routes.mjs holds the map).
 */
import express, { type NextFunction, type Request, type Response } from "express";
import { randomUUID } from "crypto";
import { createServer } from "http";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { deliverLeadWithGmail, deliverLeadWithSmtp, LeadDeliveryError, parseLeadPayload } from "./leadDelivery";
import { redirects } from "../scripts/routes.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gmailDeliveryConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN || "",
  senderEmail: process.env.LEAD_SENDER_EMAIL || "help@barrana.ai",
  notificationEmail: process.env.LEAD_NOTIFICATION_EMAIL || "help@barrana.ai",
};

// Gmail SMTP with an app password takes precedence when SMTP_PASSWORD is set; the sender is LEAD_SENDER_EMAIL.
const smtpDeliveryConfig = process.env.SMTP_PASSWORD
  ? {
      senderEmail: gmailDeliveryConfig.senderEmail,
      appPassword: process.env.SMTP_PASSWORD,
      notificationEmail: gmailDeliveryConfig.notificationEmail,
    }
  : null;

const CONVERSION_ID_PATTERN = /^[A-Za-z0-9-]{16,64}$/;
const CANONICAL_HOSTS = new Set(["barrana.ai", "www.barrana.ai"]);
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const leadRateLimits = new Map<string, { count: number; resetAt: number }>();
const RETIRED_REDIRECTS: Record<string, string> = redirects;

function requestHostname(req: Request): string {
  const forwardedHost = req.get("x-forwarded-host")?.split(",")[0]?.trim();
  return (forwardedHost || req.get("host") || "").split(":")[0].toLowerCase();
}

function isCanonicalHost(req: Request): boolean {
  return CANONICAL_HOSTS.has(requestHostname(req));
}

function leadRateLimit(req: Request, res: Response, next: NextFunction) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const current = leadRateLimits.get(key);
  if (!current || current.resetAt <= now) {
    leadRateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    next();
    return;
  }
  const remainingSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  res.setHeader("RateLimit-Limit", String(RATE_LIMIT_MAX_REQUESTS));
  res.setHeader("RateLimit-Remaining", String(Math.max(0, RATE_LIMIT_MAX_REQUESTS - current.count)));
  res.setHeader("RateLimit-Reset", String(remainingSeconds));
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    res.setHeader("Retry-After", String(remainingSeconds));
    res.status(429).json({ error: "Too many requests. Please try again later." });
    return;
  }
  current.count += 1;
  next();
}

function applySecurityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "script-src 'self' https://www.googletagmanager.com https://connect.facebook.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://connect.facebook.net https://www.facebook.com https://*.facebook.com",
      "frame-src 'self' https://www.google.com https://calendly.com",
      "upgrade-insecure-requests",
    ].join("; "),
  );
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  next();
}

/** Audit task 1: retired duplicate URLs and /index.html variants answer with one permanent redirect. */
function permanentRedirects(req: Request, res: Response, next: NextFunction) {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
  const bare = req.path.length > 1 ? req.path.replace(/\/+$/, "") : req.path;
  const target = RETIRED_REDIRECTS[bare];
  if (target) return res.redirect(301, target + query);
  if (/(^|\/)index\.html$/.test(req.path)) {
    return res.redirect(301, (req.path.replace(/\/?index\.html$/, "") || "/") + query);
  }
  next();
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(applySecurityHeaders);
  app.use((req, res, next) => {
    if (!isCanonicalHost(req)) res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    next();
  });
  app.use(permanentRedirects);
  app.use(express.json({ limit: "32kb" }));

  app.post("/api/lead", leadRateLimit, async (req, res) => {
    try {
      const requestedConversionId = req.body?.conversionId;
      const conversionId =
        typeof requestedConversionId === "string" && CONVERSION_ID_PATTERN.test(requestedConversionId)
          ? requestedConversionId
          : randomUUID();
      const lead = parseLeadPayload(req.body);
      if (!lead) {
        res.status(400).json({ error: "A valid first name and email are required" });
        return;
      }
      if (smtpDeliveryConfig) await deliverLeadWithSmtp(lead, conversionId, smtpDeliveryConfig);
      else await deliverLeadWithGmail(lead, conversionId, gmailDeliveryConfig);
      res.json({ success: true, conversionId });
    } catch (err) {
      if (err instanceof LeadDeliveryError) {
        console.error("Lead email delivery failed:", err.code, err.status || "no-status");
        res.status(err.code === "configuration" ? 500 : 502).json({
          error: err.code === "configuration" ? "Lead notification is not configured" : "Failed to deliver lead notification",
        });
        return;
      }
      console.error("Lead submission error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const staticPath =
    process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");

  app.get("/robots.txt", (req, res, next) => {
    if (isCanonicalHost(req)) return next();
    res.type("text/plain").send("User-agent: *\nDisallow: /\n");
  });

  // Public analytics configuration. The client loads this and initialises GA4 only when an ID is set.
  app.get("/analytics-config.js", (_req, res) => {
    const measurementId = process.env.GA_MEASUREMENT_ID || "";
    res.setHeader("Cache-Control", "no-store");
    res.type("application/javascript").send(
      `window.barranaAnalyticsConfig=${JSON.stringify({ defaultConsent: "denied", measurementId })};`,
    );
  });

  app.use(
    express.static(staticPath, {
      index: false,
      redirect: false,
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    }),
  );

  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  app.get("*", (req, res) => {
    const pathname = req.path === "/" ? "/" : req.path.replace(/\/+$/, "");
    if (req.path !== "/" && req.path.endsWith("/")) {
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      res.redirect(308, `${pathname}${query}`);
      return;
    }
    const relativeFile = pathname === "/" ? "index.html" : `${pathname.slice(1)}/index.html`;
    const routeFile = path.resolve(staticPath, relativeFile);
    const staticRoot = `${path.resolve(staticPath)}${path.sep}`;
    const isSafePath = routeFile === path.resolve(staticPath, "index.html") || routeFile.startsWith(staticRoot);
    if (isSafePath && pathname !== "/404" && existsSync(routeFile)) {
      res.sendFile(routeFile);
      return;
    }
    const notFoundFile = path.resolve(staticPath, "404/index.html");
    res.status(404).sendFile(existsSync(notFoundFile) ? notFoundFile : path.resolve(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    // Which lead delivery is configured (no secret values): visible in hPanel Runtime logs after a restart.
    const gmailReady = Boolean(gmailDeliveryConfig.clientId && gmailDeliveryConfig.clientSecret && gmailDeliveryConfig.refreshToken);
    console.log(`Lead delivery: ${smtpDeliveryConfig ? `gmail-smtp as ${smtpDeliveryConfig.senderEmail}` : gmailReady ? "gmail-api" : "NOT CONFIGURED"}`);
  });
}

startServer().catch(console.error);
