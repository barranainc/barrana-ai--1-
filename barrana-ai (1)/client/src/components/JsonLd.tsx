/**
 * JsonLd - Injects JSON-LD structured data into the document head
 * Used for SEO/AEO schema markup on all pages
 */
interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
