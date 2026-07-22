import { Fragment, type ReactNode } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link, useParams } from "wouter";
import JsonLd from "@/components/JsonLd";
import SEOHead from "@/components/SEOHead";
import FAQAccordion, { type FAQItem } from "@/components/ui/FAQAccordion";
import { industryGuides, type IndustryGuideSection } from "@/content/industry-guides";

const SITE_URL = "https://barrana.ai";

function localHref(href: string) {
  let normalized = href;
  if (href.startsWith(SITE_URL)) {
    normalized = href.slice(SITE_URL.length) || "/";
  }
  if (normalized.startsWith("/blog/")) {
    return normalized.replace("/blog/", "/resources/");
  }
  return normalized;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const tokens = /(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\)|<cite\s+index="[^"]+">.*?<\/cite>)/g;
  const output: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let tokenIndex = 0;

  while ((match = tokens.exec(text)) !== null) {
    if (match.index > cursor) {
      output.push(text.slice(cursor, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${tokenIndex}`;
    if (token.startsWith("**")) {
      output.push(<strong key={key}>{renderInline(token.slice(2, -2), `${key}-strong`)}</strong>);
    } else if (token.startsWith("<cite")) {
      const citationMatch = token.match(/^<cite\s+index="([^"]+)">(.*?)<\/cite>$/);
      if (citationMatch) {
        output.push(
          <span key={key} data-source-index={citationMatch[1]}>{citationMatch[2]}</span>,
        );
      }
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const href = localHref(linkMatch[2]);
        output.push(
          href.startsWith("/") ? (
            <Link key={key} href={href}>{linkMatch[1]}</Link>
          ) : (
            <a key={key} href={href} target="_blank" rel="noreferrer">{linkMatch[1]}</a>
          ),
        );
      }
    }

    cursor = match.index + token.length;
    tokenIndex += 1;
  }

  if (cursor < text.length) output.push(text.slice(cursor));
  return output;
}

function tableCells(line: string) {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderBlocks(lines: string[], keyPrefix: string) {
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={`${keyPrefix}-h3-${index}`}>{line.slice(4)}</h3>);
      index += 1;
      continue;
    }

    if (line.startsWith("|") && lines[index + 1]?.trim().match(/^\|?\s*:?-+/)) {
      const header = tableCells(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      blocks.push(
        <div className="industry-guide-table-wrap" key={`${keyPrefix}-table-${index}`}>
          <table>
            <thead><tr>{header.map((cell) => <th key={cell}>{renderInline(cell, `${keyPrefix}-th`)}</th>)}</tr></thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${keyPrefix}-row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{renderInline(cell, `${keyPrefix}-td`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ol key={`${keyPrefix}-ol-${index}`}>
          {items.map((item, itemIndex) => <li key={`${itemIndex}-${item}`}>{renderInline(item, `${keyPrefix}-oli-${itemIndex}`)}</li>)}
        </ol>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(
        <ul key={`${keyPrefix}-ul-${index}`}>
          {items.map((item, itemIndex) => <li key={`${itemIndex}-${item}`}>{renderInline(item, `${keyPrefix}-uli-${itemIndex}`)}</li>)}
        </ul>,
      );
      continue;
    }

    const ctaLink = line.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
    if (ctaLink) {
      blocks.push(
        <Link className="industry-guide-primary-link" href={localHref(ctaLink[2])} key={`${keyPrefix}-cta-${index}`}>
          {ctaLink[1]} <ArrowRight size={17} aria-hidden="true" />
        </Link>,
      );
      index += 1;
      continue;
    }

    blocks.push(<p key={`${keyPrefix}-p-${index}`}>{renderInline(line, `${keyPrefix}-inline-${index}`)}</p>);
    index += 1;
  }

  return blocks;
}

function extractFaq(section: IndustryGuideSection): FAQItem[] {
  const items: FAQItem[] = [];
  const lines = section.lines.filter((line) => line.trim());

  for (let index = 0; index < lines.length; index += 1) {
    const question = lines[index].trim().match(/^\*\*(.+)\*\*$/);
    if (!question) continue;
    const answer = lines[index + 1]?.trim();
    if (answer) items.push({ question: question[1], answer });
  }

  return items;
}

function workflowTitles(section?: IndustryGuideSection) {
  if (!section) return [];
  return section.lines
    .filter((line) => line.startsWith("### "))
    .map((line) => line.slice(4).trim());
}

export default function IndustryAutomationGuide() {
  const params = useParams<{ slug: string }>();
  const guide = industryGuides[params.slug || ""];

  if (!guide) {
    return (
      <div className="industry-guide-page industry-guide-not-found">
        <div className="container">
          <h1>Guide not found</h1>
          <Link href="/resources" className="btn-primary">Back to Resources</Link>
        </div>
      </div>
    );
  }

  const workflowSection = guide.sections.find((section) => section.title === "The Four Workflows That Matter Most");
  const workflows = workflowTitles(workflowSection);
  const faqSection = guide.sections.find((section) => section.title.startsWith("Common Questions"));
  const faqs = faqSection ? extractFaq(faqSection) : [];
  const pageUrl = `${SITE_URL}/resources/${guide.meta.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.meta.title,
    description: guide.meta.metaDescription,
    mainEntityOfPage: pageUrl,
    about: guide.meta.primaryKeyword,
    keywords: [guide.meta.primaryKeyword, ...guide.meta.secondaryKeywords].join(", "),
    author: { "@type": "Organization", name: "Barrana.ai", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Barrana.ai", url: SITE_URL },
    inLanguage: "en-CA",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE_URL}/resources` },
      { "@type": "ListItem", position: 3, name: guide.meta.title, item: pageUrl },
    ],
  };

  return (
    <div className="industry-guide-page template-page">
      <SEOHead title={`${guide.meta.title} | Barrana.ai`} description={guide.meta.metaDescription} type="article" />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="industry-guide-hero">
        <div className="industry-guide-orbit industry-guide-orbit-one" aria-hidden="true" />
        <div className="industry-guide-orbit industry-guide-orbit-two" aria-hidden="true" />
        <div className="container industry-guide-hero-inner">
          <nav className="industry-guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/resources">Resources</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Industry Automation</span>
          </nav>

          <div className="industry-guide-hero-grid">
            <div className="industry-guide-hero-copy">
              <div className="industry-guide-meta">
                <span>{guide.meta.category}</span>
                <span>{guide.meta.readingTime} read</span>
              </div>
              <h1>{guide.meta.title}</h1>
              <div className="industry-guide-intro">
                {guide.intro.map((paragraph, index) => (
                  <p key={`${guide.meta.slug}-intro-${index}`}>{renderInline(paragraph, `${guide.meta.slug}-intro-inline-${index}`)}</p>
                ))}
              </div>
            </div>

            <aside className="industry-guide-workflow-map" aria-label="The four workflows that matter most">
              <div className="industry-guide-workflow-label">The Four Workflows That Matter Most</div>
              <div className="industry-guide-workflow-list">
                {workflows.map((workflow, index) => (
                  <div className="industry-guide-workflow-step" key={workflow}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{workflow.replace(/^Workflow \d+:\s*/, "")}</strong>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </header>

      <div className="container industry-guide-layout">
        <aside className="industry-guide-toc">
          <div className="industry-guide-toc-card">
            <div className="industry-guide-toc-title">In this guide</div>
            <nav aria-label="Guide sections">
              {guide.sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>{section.title}</a>
              ))}
            </nav>
            <Link href="/contact" className="industry-guide-toc-cta">
              Book a Free Automation Audit <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </aside>

        <article className="industry-guide-article">
          {guide.sections.map((section, index) => {
            const isFaq = section === faqSection;
            const isCta = section.title === "Book a Free Automation Audit";
            const isRelated = section.title === "Related Guides";

            return (
              <section
                className={`industry-guide-section${isCta ? " industry-guide-cta" : ""}${isRelated ? " industry-guide-related" : ""}`}
                id={section.id}
                key={section.id}
              >
                <div className="industry-guide-section-marker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                <h2>{section.title}</h2>
                {isFaq && faqs.length > 0 ? (
                  <FAQAccordion items={faqs} />
                ) : (
                  <Fragment>{renderBlocks(section.lines, `${guide.meta.slug}-${section.id}`)}</Fragment>
                )}
              </section>
            );
          })}
        </article>
      </div>
    </div>
  );
}
