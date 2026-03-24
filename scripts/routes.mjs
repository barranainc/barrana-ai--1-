/**
 * Complete list of all routes for barrana.ai
 * Used by prerender and sitemap scripts.
 *
 * Each entry: { path, priority, changefreq }
 *   priority  – sitemap priority (1.0 = homepage, 0.5 = leaf)
 *   changefreq – sitemap changefreq hint
 */

export const routes = [
  // ── Core ───────────────────────────────────────────────────────────────
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/start-here", priority: 0.9, changefreq: "monthly" },
  { path: "/about", priority: 0.7, changefreq: "monthly" },
  { path: "/contact", priority: 0.7, changefreq: "monthly" },
  { path: "/faq", priority: 0.6, changefreq: "monthly" },

  // ── Services ───────────────────────────────────────────────────────────
  { path: "/services", priority: 0.9, changefreq: "weekly" },
  { path: "/services/lead-response-automation", priority: 0.8, changefreq: "monthly" },
  { path: "/services/client-intake-automation", priority: 0.8, changefreq: "monthly" },
  { path: "/services/ai-receptionist", priority: 0.8, changefreq: "monthly" },
  { path: "/services/document-collection", priority: 0.8, changefreq: "monthly" },
  { path: "/services/appointment-automation", priority: 0.8, changefreq: "monthly" },
  { path: "/services/invoice-automation", priority: 0.8, changefreq: "monthly" },
  { path: "/services/workflow-automation", priority: 0.8, changefreq: "monthly" },
  { path: "/services/crm-automation", priority: 0.8, changefreq: "monthly" },
  { path: "/services/operations-reporting", priority: 0.8, changefreq: "monthly" },
  { path: "/services/after-hours-automation", priority: 0.8, changefreq: "monthly" },
  { path: "/services/ai-agents", priority: 0.8, changefreq: "monthly" },
  { path: "/services/custom-ai-systems", priority: 0.8, changefreq: "monthly" },
  { path: "/services/full-stack", priority: 0.8, changefreq: "monthly" },

  // ── Industries ─────────────────────────────────────────────────────────
  { path: "/industries", priority: 0.9, changefreq: "weekly" },
  { path: "/industries/immigration-consultants", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/accounting-firms", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/law-firms", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/contractors", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/physiotherapy-clinics", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/real-estate-teams", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/service-businesses", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/dental-offices", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/insurance-brokers", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/mortgage-brokers", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/financial-advisors", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/marketing-agencies", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/cleaning-companies", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/property-management", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/home-services", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/medical-clinics", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/veterinary-clinics", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/tutoring-education", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/auto-repair", priority: 0.8, changefreq: "monthly" },
  { path: "/industries/landscaping", priority: 0.8, changefreq: "monthly" },

  // ── Case Studies ───────────────────────────────────────────────────────
  { path: "/case-studies", priority: 0.8, changefreq: "weekly" },
  { path: "/case-studies/immigration-firm-north-york", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/accounting-firm-vaughan", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/contractor-mississauga", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/physio-clinic-richmond-hill", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/law-firm-toronto", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/real-estate-team-markham", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/dental-office-scarborough", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/cleaning-company-etobicoke", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/hvac-company-brampton", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/property-management-toronto", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/insurance-brokerage-vaughan", priority: 0.7, changefreq: "monthly" },
  { path: "/case-studies/marketing-agency-liberty-village", priority: 0.7, changefreq: "monthly" },

  // ── Locations ──────────────────────────────────────────────────────────
  { path: "/locations", priority: 0.8, changefreq: "weekly" },
  { path: "/locations/toronto", priority: 0.7, changefreq: "monthly" },
  { path: "/locations/vaughan", priority: 0.7, changefreq: "monthly" },
  { path: "/locations/mississauga", priority: 0.7, changefreq: "monthly" },
  { path: "/locations/markham", priority: 0.7, changefreq: "monthly" },
  { path: "/locations/richmond-hill", priority: 0.7, changefreq: "monthly" },
  { path: "/locations/north-york", priority: 0.7, changefreq: "monthly" },

  // ── Local Industry Pages (30 pages) ────────────────────────────────────
  { path: "/locations/vaughan/immigration-consultants", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/mississauga/immigration-consultants", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/brampton/immigration-consultants", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/vaughan/accounting-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/mississauga/accounting-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/markham/accounting-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/mississauga/dental-clinics", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/toronto/dental-clinics", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/richmond-hill/dental-clinics", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/richmond-hill/physiotherapy", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/vaughan/physiotherapy", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/vaughan/contractors", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/mississauga/contractors", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/toronto/law-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/mississauga/law-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/toronto/immigration-consultants", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/north-york/immigration-consultants", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/scarborough/immigration-consultants", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/brampton/accounting-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/toronto/accounting-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/brampton/dental-clinics", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/vaughan/dental-clinics", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/markham/dental-clinics", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/mississauga/physiotherapy", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/brampton/contractors", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/toronto/contractors", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/vaughan/law-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/brampton/law-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/markham/law-firms", priority: 0.6, changefreq: "monthly" },
  { path: "/locations/richmond-hill/contractors", priority: 0.6, changefreq: "monthly" },

  // ── Resources ──────────────────────────────────────────────────────────
  { path: "/resources", priority: 0.7, changefreq: "weekly" },
  { path: "/resources/what-is-ai-automation", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/operational-friction-map", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/automate-client-intake", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/automation-roi", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/professional-services-guide", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/integration-priority-matrix", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/automation-playbooks", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/ai-automation-glossary", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/workflow-templates", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/automation-benchmarks", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/before-and-after", priority: 0.6, changefreq: "monthly" },
  { path: "/resources/roi-calculator", priority: 0.6, changefreq: "monthly" },

  // ── Tools ──────────────────────────────────────────────────────────────
  { path: "/automation-planner", priority: 0.7, changefreq: "monthly" },
  { path: "/automation-roi-calculator", priority: 0.7, changefreq: "monthly" },

  // ── SEO/AEO Expansion ──────────────────────────────────────────────────
  { path: "/knowledge", priority: 0.6, changefreq: "weekly" },
  { path: "/playbooks", priority: 0.6, changefreq: "weekly" },
  { path: "/glossary", priority: 0.6, changefreq: "monthly" },
  { path: "/before-after", priority: 0.6, changefreq: "monthly" },
  { path: "/benchmarks", priority: 0.6, changefreq: "monthly" },
  { path: "/governance", priority: 0.6, changefreq: "monthly" },
  { path: "/templates", priority: 0.6, changefreq: "monthly" },
  { path: "/operator-insights", priority: 0.6, changefreq: "weekly" },
  { path: "/integrations", priority: 0.6, changefreq: "monthly" },

  // ── Pillar / Foundation Pages ──────────────────────────────────────────
  { path: "/solopreneurs", priority: 0.7, changefreq: "monthly" },
  { path: "/ai-adoption-small-business", priority: 0.7, changefreq: "monthly" },
  { path: "/workflow-automation-smb", priority: 0.7, changefreq: "monthly" },
  { path: "/ai-receptionist", priority: 0.7, changefreq: "monthly" },
  { path: "/human-in-the-loop-ai", priority: 0.7, changefreq: "monthly" },
  { path: "/ai-automation-industries", priority: 0.7, changefreq: "monthly" },
  { path: "/ai-automation-vaughan", priority: 0.7, changefreq: "monthly" },

  // ── Insights ───────────────────────────────────────────────────────────
  { path: "/insights/what-to-automate-first", priority: 0.6, changefreq: "monthly" },
  { path: "/insights/automation-readiness", priority: 0.6, changefreq: "monthly" },
  { path: "/insights/build-vs-buy", priority: 0.6, changefreq: "monthly" },
  { path: "/insights/when-ai-is-not-the-answer", priority: 0.6, changefreq: "monthly" },
  { path: "/insights/automation-vs-delegation", priority: 0.6, changefreq: "monthly" },

  // ── Workflows ──────────────────────────────────────────────────────────
  { path: "/workflows/lead-intake", priority: 0.6, changefreq: "monthly" },
  { path: "/workflows/appointment-booking", priority: 0.6, changefreq: "monthly" },
  { path: "/workflows/client-onboarding", priority: 0.6, changefreq: "monthly" },
  { path: "/workflows/document-collection", priority: 0.6, changefreq: "monthly" },
];
