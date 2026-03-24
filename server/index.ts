import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GHL_API_KEY = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || "";

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON request bodies
  app.use(express.json());

  // ── POST /api/lead — create/update a GHL contact ────────────────────────────
  app.post("/api/lead", async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        companyName,
        industry,
        message,
        formName,
        pageUrl,
        tags,
        customFields: extraCustomFields,
      } = req.body;

      if (!email || !firstName) {
        res.status(400).json({ error: "firstName and email are required" });
        return;
      }

      if (!GHL_API_KEY || !GHL_LOCATION_ID) {
        console.error("GHL_API_KEY or GHL_LOCATION_ID not set");
        res.status(500).json({ error: "Server configuration error" });
        return;
      }

      // Build custom fields array
      const customFields: { key: string; field_value: string }[] = [];
      if (industry) customFields.push({ key: "industry", field_value: industry });
      if (formName) customFields.push({ key: "form_name", field_value: formName });
      if (pageUrl) customFields.push({ key: "page_url", field_value: pageUrl });
      if (message) customFields.push({ key: "message", field_value: message });

      // Append any extra custom fields from the request
      if (Array.isArray(extraCustomFields)) {
        customFields.push(...extraCustomFields);
      }

      const ghlBody: Record<string, unknown> = {
        firstName,
        lastName: lastName || "",
        email,
        locationId: GHL_LOCATION_ID,
        source: "barrana.ai",
        tags: Array.isArray(tags) ? tags : ["website-lead"],
        customFields,
      };

      if (phone) ghlBody.phone = phone;
      if (companyName) ghlBody.companyName = companyName;

      const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify(ghlBody),
      });

      if (!ghlRes.ok) {
        const errText = await ghlRes.text();
        console.error("GHL API error:", ghlRes.status, errText);
        res.status(502).json({ error: "Failed to create contact in CRM" });
        return;
      }

      const ghlData = await ghlRes.json();
      res.json({ success: true, contactId: ghlData.contact?.id });
    } catch (err) {
      console.error("Lead submission error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
