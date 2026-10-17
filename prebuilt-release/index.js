// server/index.ts
import express from "express";
import { randomUUID } from "crypto";
import { createServer } from "http";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// server/leadDelivery.ts
var LeadDeliveryError = class extends Error {
  code;
  status;
  constructor(code, status) {
    super(`Lead delivery failed: ${code}`);
    this.code = code;
    this.status = status;
  }
};
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function optionalString(value, maxLength) {
  if (typeof value !== "string") return void 0;
  const normalized = value.trim();
  if (!normalized) return void 0;
  return normalized.slice(0, maxLength);
}
function parseLeadPayload(input) {
  if (!input || typeof input !== "object") return null;
  const body = input;
  const firstName = optionalString(body.firstName, 100);
  const email = optionalString(body.email, 254);
  const formName = optionalString(body.formName, 150) || "Website lead";
  const pageUrl = optionalString(body.pageUrl, 2048) || "Unknown page";
  if (!firstName || !email || !EMAIL_PATTERN.test(email)) return null;
  const tags = Array.isArray(body.tags) ? body.tags.filter((value) => typeof value === "string").map((value) => value.trim().slice(0, 50)).filter(Boolean).slice(0, 20) : [];
  const customFields = Array.isArray(body.customFields) ? body.customFields.filter((field) => Boolean(field) && typeof field === "object" && typeof field.key === "string" && typeof field.field_value === "string").map((field) => ({
    key: field.key.trim().slice(0, 100),
    field_value: field.field_value.trim().slice(0, 1e3)
  })).filter((field) => field.key && field.field_value).slice(0, 30) : [];
  return {
    firstName,
    lastName: optionalString(body.lastName, 100),
    email,
    phone: optionalString(body.phone, 50),
    companyName: optionalString(body.companyName, 200),
    industry: optionalString(body.industry, 100),
    message: optionalString(body.message, 5e3),
    formName,
    pageUrl,
    tags,
    customFields
  };
}
function sanitizeHeader(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}
function encodeSubject(subject) {
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}
function toBase64Url(value) {
  return Buffer.from(value, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function buildLeadNotification(lead, conversionId, config) {
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  const customFieldLines = lead.customFields.map(
    (field) => `- ${field.key}: ${field.field_value}`
  );
  const body = [
    "A new lead was submitted on barrana.ai.",
    "",
    `Conversion ID: ${conversionId}`,
    `Form: ${sanitizeHeader(lead.formName)}`,
    `Page: ${lead.pageUrl}`,
    "",
    `Name: ${fullName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `Business: ${lead.companyName || "Not provided"}`,
    `Industry: ${lead.industry || "Not provided"}`,
    `Tags: ${lead.tags.join(", ") || "None"}`,
    "",
    "Message:",
    lead.message || "Not provided",
    ...customFieldLines.length > 0 ? ["", "Additional form details:", ...customFieldLines] : []
  ].join("\r\n");
  const subject = encodeSubject(`New Barrana lead \u2014 ${sanitizeHeader(lead.formName)}`);
  const sender = sanitizeHeader(config.senderEmail);
  const recipient = sanitizeHeader(config.notificationEmail);
  return [
    `From: Barrana Website <${sender}>`,
    `To: ${recipient}`,
    `Reply-To: ${sanitizeHeader(lead.email)}`,
    `Subject: ${subject}`,
    `Message-ID: <barrana-lead-${conversionId}@barrana.ai>`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    body
  ].join("\r\n");
}
async function getAccessToken(config, fetchImpl) {
  const response = await fetchImpl("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token"
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    throw new LeadDeliveryError("oauth", response.status);
  }
  return payload.access_token;
}
async function deliverLeadWithGmail(lead, conversionId, config, fetchImpl = fetch) {
  if (!config.clientId || !config.clientSecret || !config.refreshToken || !EMAIL_PATTERN.test(config.senderEmail) || !EMAIL_PATTERN.test(config.notificationEmail)) {
    throw new LeadDeliveryError("configuration");
  }
  const accessToken = await getAccessToken(config, fetchImpl);
  const mimeMessage = buildLeadNotification(lead, conversionId, config);
  const response = await fetchImpl("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ raw: toBase64Url(mimeMessage) })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.id) {
    throw new LeadDeliveryError("gmail", response.status);
  }
  return { messageId: payload.id };
}

// server/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var gmailDeliveryConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN || "",
  senderEmail: process.env.LEAD_SENDER_EMAIL || "help@barrana.ai",
  notificationEmail: process.env.LEAD_NOTIFICATION_EMAIL || "help@barrana.ai"
};
var CONVERSION_ID_PATTERN = /^[A-Za-z0-9-]{16,64}$/;
var CANONICAL_HOSTS = /* @__PURE__ */ new Set(["barrana.ai", "www.barrana.ai"]);
var RATE_LIMIT_WINDOW_MS = 15 * 60 * 1e3;
var RATE_LIMIT_MAX_REQUESTS = 5;
var leadRateLimits = /* @__PURE__ */ new Map();
function requestHostname(req) {
  const forwardedHost = req.get("x-forwarded-host")?.split(",")[0]?.trim();
  return (forwardedHost || req.get("host") || "").split(":")[0].toLowerCase();
}
function isCanonicalHost(req) {
  return CANONICAL_HOSTS.has(requestHostname(req));
}
function leadRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const current = leadRateLimits.get(key);
  if (!current || current.resetAt <= now) {
    leadRateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    next();
    return;
  }
  const remainingSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1e3));
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
function applySecurityHeaders(_req, res, next) {
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
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://connect.facebook.net https://www.facebook.com https://*.facebook.com https://forge.butterfly-effect.dev",
      "frame-src 'self' https://www.google.com https://calendly.com",
      "upgrade-insecure-requests"
    ].join("; ")
  );
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
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
    if (!isCanonicalHost(req)) {
      res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    }
    next();
  });
  app.use(express.json({ limit: "32kb" }));
  // Audit task 1: retired duplicate URLs, and /index.html variants, 301 to the canonical page.
  const RETIRED_REDIRECTS = {"/resources/automation-benchmarks":"/benchmarks","/resources/ai-automation-glossary":"/glossary","/resources/roi-calculator":"/automation-roi-calculator","/resources/automation-playbooks":"/playbooks","/resources/workflow-templates":"/templates","/resources/before-and-after":"/before-after"};
  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    const bare = req.path.length > 1 ? req.path.replace(/\/+$/, "") : req.path;
    if (RETIRED_REDIRECTS[bare]) return res.redirect(301, RETIRED_REDIRECTS[bare] + query);
    if (/(^|\/)index\.html$/.test(req.path)) return res.redirect(301, (req.path.replace(/\/?index\.html$/, "") || "/") + query);
    next();
  });
  app.post("/api/lead", leadRateLimit, async (req, res) => {
    try {
      const requestedConversionId = req.body?.conversionId;
      const conversionId = typeof requestedConversionId === "string" && CONVERSION_ID_PATTERN.test(requestedConversionId) ? requestedConversionId : randomUUID();
      const lead = parseLeadPayload(req.body);
      if (!lead) {
        res.status(400).json({ error: "A valid first name and email are required" });
        return;
      }
      const delivery = await deliverLeadWithGmail(lead, conversionId, gmailDeliveryConfig);
      res.json({ success: true, conversionId });
    } catch (err) {
      if (err instanceof LeadDeliveryError) {
        console.error("Lead email delivery failed:", err.code, err.status || "no-status");
        res.status(err.code === "configuration" ? 500 : 502).json({
          error: err.code === "configuration" ? "Lead notification is not configured" : "Failed to deliver lead notification"
        });
        return;
      }
      console.error("Lead submission error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
  app.get("/robots.txt", (req, res, next) => {
    if (isCanonicalHost(req)) {
      next();
      return;
    }
    res.type("text/plain").send("User-agent: *\nDisallow: /\n");
  });
  app.get("/analytics-config.js", (_req, res) => {
    const measurementId = process.env.GA_MEASUREMENT_ID || "";
    res.setHeader("Cache-Control", "no-store");
    res.type("application/javascript").send(
      `window.barranaAnalyticsConfig=${JSON.stringify({
        defaultConsent: "denied",
        measurementId
      })};`
    );
  });
  app.use(express.static(staticPath, {
    index: false,
    redirect: false,
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    }
  }));
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
  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
