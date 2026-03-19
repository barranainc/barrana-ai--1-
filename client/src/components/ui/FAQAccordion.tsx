/**
 * FAQAccordion.tsx
 * Accessible FAQ accordion.
 * One item open at a time. Height animates with CSS max-height trick.
 * Generates JSON-LD FAQPage schema in a script tag.
 * Keyboard: Enter/Space to toggle, Arrow keys to navigate.
 */

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQSchemaScript({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      buttonRefs.current[Math.min(i + 1, items.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      buttonRefs.current[Math.max(i - 1, 0)]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      buttonRefs.current[items.length - 1]?.focus();
    }
  };

  return (
    <>
      <FAQSchemaScript items={items} />
      <div role="list" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map((item, i) => {
          const isOpen = open === i;
          const id = `faq-item-${i}`;
          const panelId = `faq-panel-${i}`;
          return (
            <div
              key={i}
              role="listitem"
              className="faq-item"
              style={{ borderColor: isOpen ? "rgba(40,56,145,0.3)" : undefined }}
            >
              <button
                ref={(el) => { buttonRefs.current[i] = el; }}
                id={id}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="faq-trigger"
                onClick={() => toggle(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                <span>{item.question}</span>
                <Plus
                  size={18}
                  strokeWidth={2.5}
                  style={{
                    flexShrink: 0,
                    color: "var(--b-navy)",
                    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={id}
                className="faq-content"
                style={{
                  maxHeight: isOpen ? "500px" : "0",
                  padding: isOpen ? undefined : "0 1.5rem",
                  overflow: "hidden",
                  transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), padding 0.2s ease",
                }}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
