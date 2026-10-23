/**
 * Lead delivery: sends each website enquiry to the notification inbox, through Gmail SMTP with an app
 * password when SMTP_PASSWORD is set (added 23 Oct 2026 after the Gmail OAuth values were lost), otherwise
 * through the Gmail API with OAuth.
 * Reconstructed from the server that has been running on Hostinger since 5 Oct 2026
 * (hbuilds/last-source/prebuilt-release/index.js); the GitHub copy still had the retired
 * GoHighLevel version. Credentials come from environment variables, never from the client.
 */

import nodemailer from "nodemailer";

export type LeadDeliveryFailure = "configuration" | "oauth" | "gmail" | "smtp";

export class LeadDeliveryError extends Error {
  code: LeadDeliveryFailure;
  status?: number;

  constructor(code: LeadDeliveryFailure, status?: number) {
    super(`Lead delivery failed: ${code}`);
    this.code = code;
    this.status = status;
  }
}

export interface LeadPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  companyName?: string;
  industry?: string;
  message?: string;
  formName: string;
  pageUrl: string;
  tags: string[];
  customFields: { key: string; field_value: string }[];
}

export interface GmailDeliveryConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  senderEmail: string;
  notificationEmail: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function optionalString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  if (!normalized) return undefined;
  return normalized.slice(0, maxLength);
}

export function parseLeadPayload(input: unknown): LeadPayload | null {
  if (!input || typeof input !== "object") return null;
  const body = input as Record<string, unknown>;
  const firstName = optionalString(body.firstName, 100);
  const email = optionalString(body.email, 254);
  const formName = optionalString(body.formName, 150) || "Website lead";
  const pageUrl = optionalString(body.pageUrl, 2048) || "Unknown page";
  if (!firstName || !email || !EMAIL_PATTERN.test(email)) return null;

  const tags = Array.isArray(body.tags)
    ? body.tags
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim().slice(0, 50))
        .filter(Boolean)
        .slice(0, 20)
    : [];

  const customFields = Array.isArray(body.customFields)
    ? body.customFields
        .filter(
          (field): field is { key: string; field_value: string } =>
            Boolean(field) &&
            typeof field === "object" &&
            typeof (field as { key?: unknown }).key === "string" &&
            typeof (field as { field_value?: unknown }).field_value === "string",
        )
        .map((field) => ({ key: field.key.trim().slice(0, 100), field_value: field.field_value.trim().slice(0, 1000) }))
        .filter((field) => field.key && field.field_value)
        .slice(0, 30)
    : [];

  return {
    firstName,
    lastName: optionalString(body.lastName, 100),
    email,
    phone: optionalString(body.phone, 50),
    companyName: optionalString(body.companyName, 200),
    industry: optionalString(body.industry, 100),
    message: optionalString(body.message, 5000),
    formName,
    pageUrl,
    tags,
    customFields,
  };
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function encodeSubject(subject: string): string {
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function buildLeadNotification(
  lead: LeadPayload,
  conversionId: string,
  config: Pick<GmailDeliveryConfig, "senderEmail" | "notificationEmail">,
): string {
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  const customFieldLines = lead.customFields.map((field) => `- ${field.key}: ${field.field_value}`);
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
    ...(customFieldLines.length > 0 ? ["", "Additional form details:", ...customFieldLines] : []),
  ].join("\r\n");

  const subject = encodeSubject(`New Barrana lead — ${sanitizeHeader(lead.formName)}`);
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
    body,
  ].join("\r\n");
}

type FetchLike = typeof fetch;

async function getAccessToken(config: GmailDeliveryConfig, fetchImpl: FetchLike): Promise<string> {
  const response = await fetchImpl("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const payload = (await response.json().catch(() => ({}))) as { access_token?: string };
  if (!response.ok || !payload.access_token) throw new LeadDeliveryError("oauth", response.status);
  return payload.access_token;
}

export async function deliverLeadWithGmail(
  lead: LeadPayload,
  conversionId: string,
  config: GmailDeliveryConfig,
  fetchImpl: FetchLike = fetch,
): Promise<{ messageId: string }> {
  if (
    !config.clientId ||
    !config.clientSecret ||
    !config.refreshToken ||
    !EMAIL_PATTERN.test(config.senderEmail) ||
    !EMAIL_PATTERN.test(config.notificationEmail)
  ) {
    throw new LeadDeliveryError("configuration");
  }
  const accessToken = await getAccessToken(config, fetchImpl);
  const mimeMessage = buildLeadNotification(lead, conversionId, config);
  const response = await fetchImpl("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw: toBase64Url(mimeMessage) }),
  });
  const payload = (await response.json().catch(() => ({}))) as { id?: string };
  if (!response.ok || !payload.id) throw new LeadDeliveryError("gmail", response.status);
  return { messageId: payload.id };
}

export interface SmtpDeliveryConfig {
  /** Gmail or Google Workspace account that sends the notification; the app password belongs to it. */
  senderEmail: string;
  /** 16-character Google app password for senderEmail. */
  appPassword: string;
  notificationEmail: string;
}

type SendRaw = (message: { from: string; to: string; raw: string }) => Promise<{ messageId?: string }>;

function gmailSmtp(config: SmtpDeliveryConfig): SendRaw {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: config.senderEmail, pass: config.appPassword.replace(/s+/g, "") },
  });
  return ({ from, to, raw }) => transport.sendMail({ envelope: { from, to: [to] }, raw });
}

export async function deliverLeadWithSmtp(
  lead: LeadPayload,
  conversionId: string,
  config: SmtpDeliveryConfig,
  send: SendRaw = gmailSmtp(config),
): Promise<{ messageId: string }> {
  if (!config.appPassword || !EMAIL_PATTERN.test(config.senderEmail) || !EMAIL_PATTERN.test(config.notificationEmail)) {
    throw new LeadDeliveryError("configuration");
  }
  const raw = buildLeadNotification(lead, conversionId, config);
  try {
    const info = await send({ from: config.senderEmail, to: config.notificationEmail, raw });
    return { messageId: info.messageId || conversionId };
  } catch (error) {
    const code = (error as { responseCode?: number }).responseCode;
    throw new LeadDeliveryError("smtp", typeof code === "number" ? code : undefined);
  }
}
