/**
 * AEOBlock.tsx
 * "Quick Answer" callout block for Answer Engine Optimization.
 * Designed to be easily parsed by AI search engines.
 */

export interface AEOBlockProps {
  question: string;
  answer: string;
}

export default function AEOBlock({ question, answer }: AEOBlockProps) {
  return (
    <div
      style={{
        background: "#F7F9FC",
        borderLeft: "4px solid #00B4D8",
        borderRadius: "0 0.75rem 0.75rem 0",
        padding: "2rem 2.5rem",
      }}
    >
      {/* Label row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          marginBottom: "0.125rem",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="5" stroke="#00B4D8" strokeWidth="1.5" />
          <path
            d="M6 11h2M11 6a5 5 0 00-5-5"
            stroke="#00B4D8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="11" cy="11" r="2.5" fill="#00B4D8" />
          <path d="M10 10l2 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#00B4D8",
            fontWeight: 700,
          }}
        >
          Quick Answer
        </span>
      </div>

      {/* Question */}
      <h3
        style={{
          fontWeight: 700,
          color: "var(--b-dark)",
          margin: "0.75rem 0 0.625rem",
          fontSize: "1.0625rem",
          lineHeight: 1.4,
        }}
      >
        {question}
      </h3>

      {/* Answer */}
      <p
        style={{
          color: "var(--b-grey)",
          lineHeight: 1.75,
          fontSize: "0.9375rem",
          margin: 0,
        }}
      >
        {answer}
      </p>
    </div>
  );
}
