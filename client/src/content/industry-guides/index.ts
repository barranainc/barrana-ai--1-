import pestControlSource from "./01-pest-control-automation.md?raw";
import commercialCleaningSource from "./02-commercial-cleaning-automation.md?raw";
import seasonalServicesSource from "./03-snow-removal-lawn-care-automation.md?raw";
import electricalContractorSource from "./04-electrical-contractor-automation.md?raw";
import septicDrainSource from "./05-septic-drain-cleaning-automation.md?raw";
import tireRecyclingSource from "./06-tire-recycling-broker-automation.md?raw";
import scrapMetalSource from "./07-scrap-metal-dealer-automation.md?raw";
import portableToiletSource from "./08-portable-toilet-rental-automation.md?raw";
import greaseTrapSource from "./09-grease-trap-cleaning-automation.md?raw";
import movingCompanySource from "./10-moving-company-automation.md?raw";
import charityDonationReceiptSource from "./11-charity-donation-receipt-automation.md?raw";
import faithOrganizationSource from "./12-faith-organization-automation.md?raw";
import foodBankSource from "./13-food-bank-automation.md?raw";
import settlementServicesSource from "./14-settlement-services-automation.md?raw";
import youthSportsLeagueSource from "./15-youth-sports-league-automation.md?raw";
import socialMediaConsultationSource from "./16-social-media-to-consultation-automation.md?raw";
import multiLocationDentalSource from "./17-multi-location-dental-automation.md?raw";
import medicalAestheticsSource from "./18-medical-aesthetics-clinic-automation.md?raw";
import naturopathicClinicSource from "./19-naturopathic-clinic-automation.md?raw";
import physiotherapyOccupationalTherapySource from "./20-physiotherapy-occupational-therapy-automation.md?raw";
import ivTherapyWellnessSource from "./21-iv-therapy-wellness-lounge-automation.md?raw";
import personalTrainerSource from "./22-personal-trainer-automation.md?raw";
import onlineFitnessProgrammeSource from "./23-online-fitness-programme-automation.md?raw";
import coachingBusinessSource from "./24-coaching-business-automation.md?raw";
import weddingPhotographerSource from "./25-wedding-photographer-automation.md?raw";
import courierDeliverySource from "./26-courier-delivery-automation.md?raw";
import medicalSupplyDistributionSource from "./27-medical-supply-distribution-automation.md?raw";
import autoPartsSupplierSource from "./28-auto-parts-supplier-automation.md?raw";
import importExportBrokerSource from "./29-import-export-broker-automation.md?raw";
import cateringCompanySource from "./30-catering-company-automation.md?raw";
import customBakerySource from "./31-custom-bakery-automation.md?raw";
import mealPrepDeliverySource from "./32-meal-prep-delivery-automation.md?raw";
import privateChefSource from "./33-private-chef-automation.md?raw";
import ghostKitchenSource from "./34-ghost-kitchen-automation.md?raw";
import tutoringCentreSource from "./35-tutoring-centre-automation.md?raw";
import languageSchoolSource from "./36-language-school-automation.md?raw";
import drivingSchoolSource from "./37-driving-school-automation.md?raw";
import musicSchoolSource from "./38-music-school-automation.md?raw";
import corporateTrainerSource from "./39-corporate-trainer-automation.md?raw";

export interface IndustryGuideMeta {
  title: string;
  slug: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: string;
  readingTime: string;
}

export interface IndustryGuideSection {
  title: string;
  id: string;
  lines: string[];
}

export interface IndustryGuide {
  meta: IndustryGuideMeta;
  intro: string[];
  sections: IndustryGuideSection[];
}

function frontmatterValue(frontmatter: string, key: string) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, "m"));
  return match?.[1] ?? "";
}

function frontmatterList(frontmatter: string, key: string) {
  const lines = frontmatter.split("\n");
  const start = lines.findIndex((line) => line.trim() === `${key}:`);
  if (start === -1) return [];

  const values: string[] = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const match = lines[index].match(/^\s+-\s+(.+)$/);
    if (!match) break;
    values.push(match[1].trim());
  }
  return values;
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseGuide(source: string): IndustryGuide {
  const lines = source.replace(/\r/g, "").split("\n");
  const frontmatterEnd = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  const frontmatter = lines.slice(1, frontmatterEnd).join("\n");
  const body = lines.slice(frontmatterEnd + 1);
  const h1Index = body.findIndex((line) => line.startsWith("# "));
  const content = body.slice(h1Index + 1);

  const firstSectionIndex = content.findIndex((line) => line.startsWith("## "));
  const intro = content
    .slice(0, firstSectionIndex)
    .filter((line) => line.trim() && line.trim() !== "---");

  const sections: IndustryGuideSection[] = [];
  let current: IndustryGuideSection | null = null;

  for (const line of content.slice(firstSectionIndex)) {
    if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      current = { title, id: sectionId(title), lines: [] };
      sections.push(current);
    } else if (current && line.trim() !== "---") {
      current.lines.push(line);
    }
  }

  return {
    meta: {
      title: frontmatterValue(frontmatter, "title"),
      slug: frontmatterValue(frontmatter, "slug"),
      metaDescription: frontmatterValue(frontmatter, "meta_description"),
      primaryKeyword: frontmatterValue(frontmatter, "primary_keyword"),
      secondaryKeywords: frontmatterList(frontmatter, "secondary_keywords"),
      category: frontmatterValue(frontmatter, "category"),
      readingTime: frontmatterValue(frontmatter, "reading_time"),
    },
    intro,
    sections,
  };
}

const guideSources = [
  pestControlSource,
  commercialCleaningSource,
  seasonalServicesSource,
  electricalContractorSource,
  septicDrainSource,
  tireRecyclingSource,
  scrapMetalSource,
  portableToiletSource,
  greaseTrapSource,
  movingCompanySource,
  charityDonationReceiptSource,
  faithOrganizationSource,
  foodBankSource,
  settlementServicesSource,
  youthSportsLeagueSource,
  socialMediaConsultationSource,
  multiLocationDentalSource,
  medicalAestheticsSource,
  naturopathicClinicSource,
  physiotherapyOccupationalTherapySource,
  ivTherapyWellnessSource,
  personalTrainerSource,
  onlineFitnessProgrammeSource,
  coachingBusinessSource,
  weddingPhotographerSource,
  courierDeliverySource,
  medicalSupplyDistributionSource,
  autoPartsSupplierSource,
  importExportBrokerSource,
  cateringCompanySource,
  customBakerySource,
  mealPrepDeliverySource,
  privateChefSource,
  ghostKitchenSource,
  tutoringCentreSource,
  languageSchoolSource,
  drivingSchoolSource,
  musicSchoolSource,
  corporateTrainerSource,
];

export const industryGuides = Object.fromEntries(
  guideSources.map((source) => {
    const guide = parseGuide(source);
    return [guide.meta.slug, guide];
  }),
) as Record<string, IndustryGuide>;

export const industryGuideCards = Object.values(industryGuides).map((guide) => ({
  title: guide.meta.title,
  description: guide.meta.metaDescription,
  readTime: `${guide.meta.readingTime} read`,
  href: `/resources/${guide.meta.slug}`,
  keyword: guide.meta.primaryKeyword,
}));
