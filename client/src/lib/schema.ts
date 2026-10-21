/**
 * Shared structured-data entities. One stable identifier for the organization so every
 * Service, Article and LocalBusiness block on the site refers to the same entity (audit task 7).
 */
export const SITE_URL = "https://barrana.ai";

export const ORG_REF = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Barrana.ai",
  url: SITE_URL,
  logo: `${SITE_URL}/barrana-logo-social.png`,
} as const;
