/**
 * Barrana Design System Tokens
 * Used across all 70+ pages for consistent styling
 */

// ─── COLORS ─────────────────────────────────────────────────
export const colors = {
  // Brand
  navy: "#283891",
  navyDark: "#1a2d6e",
  navyWash: "#E8EAF6",
  magenta: "#7E0F4A",
  magentaDark: "#6a0c3e",

  // Text
  textPrimary: "#1a1a2e",
  textBody: "#4A4A4A",
  textSecondary: "#7B7B7B",

  // Semantic
  success: "#0D9668",
  warning: "#D97706",
  danger: "#DC2626",

  // Surfaces
  surfaceLight: "#F5F5F5",
  surfaceWhite: "#FFFFFF",
  border: "#E2E4ED",
} as const;

// ─── SPACING (in rem, for inline styles) ────────────────────
export const spacing = {
  sectionPadding: "6rem",        // py-24
  sectionPaddingLg: "8rem",      // py-32 (md)
  sectionPaddingSm: "4rem",      // py-16 (compact)
  sectionPaddingSmLg: "5rem",    // py-20 (compact md)

  headingToBody: "2.5rem",       // mb-10
  eyebrowToHeading: "0.75rem",   // mb-3
  headingToSubheading: "1rem",   // mb-4
  subheadingToContent: "3rem",   // mb-12

  ctaMarginTop: "2.5rem",        // mt-10
  ctaMarginTopLg: "3.5rem",      // mt-14

  cardGridGap: "2rem",           // gap-8
  cardGridGapDense: "1.5rem",    // gap-6
} as const;

// ─── TYPOGRAPHY (inline style objects) ──────────────────────
export const typography = {
  pageTitle: {
    fontSize: "clamp(2.25rem, 5vw, 3rem)",
    fontWeight: 800,
    color: colors.textPrimary,
    letterSpacing: "-0.025em",
    lineHeight: 1.1,
  },
  sectionHeading: {
    fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)",
    fontWeight: 700,
    color: colors.navy,
    letterSpacing: "-0.02em",
  },
  sectionSubheading: {
    fontSize: "1.125rem",
    fontWeight: 400,
    color: colors.textBody,
    lineHeight: 1.7,
    maxWidth: "40rem",
  },
  eyebrow: {
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: colors.magenta,
  },
  body: {
    fontSize: "1rem",
    color: colors.textBody,
    lineHeight: 1.7,
  },
  bodySmall: {
    fontSize: "0.875rem",
    color: colors.textSecondary,
    lineHeight: 1.65,
  },
  cardTitle: {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: colors.textPrimary,
  },
  cardBody: {
    fontSize: "0.875rem",
    color: colors.textSecondary,
    lineHeight: 1.65,
  },
  metricValue: {
    fontSize: "1.5rem",
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums" as const,
  },
  metricLabel: {
    fontSize: "0.8125rem",
    color: colors.textSecondary,
  },
} as const;

// ─── CARD STYLES ────────────────────────────────────────────
export const cards = {
  /** Type A: Primary — bordered, interactive, for key data */
  typeA: {
    background: colors.surfaceWhite,
    borderRadius: "1rem",
    border: `1px solid rgba(226,228,237,0.6)`,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    padding: "2rem",
  },
  typeAHover: {
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    borderColor: "rgba(226,228,237,0.9)",
  },

  /** Type B: Soft — borderless, informational */
  typeB: {
    background: "rgba(245,246,250,0.5)",
    borderRadius: "0.75rem",
    border: "none",
    padding: "2rem",
  },

  /** Type C: On-dark surfaces */
  onDark: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
  },
} as const;

// ─── SURFACE TREATMENTS ─────────────────────────────────────
export const surfaces = {
  white: { background: colors.surfaceWhite },
  light: { background: colors.surfaceLight },
  darkGradient: { background: "linear-gradient(to bottom, #1a2d6e, #162358)" },
  blueWash: { background: colors.navyWash },
} as const;

// ─── CTA BUTTON STYLES ─────────────────────────────────────
export const buttons = {
  primary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: colors.magenta,
    color: "white",
    fontWeight: 700,
    fontSize: "0.9375rem",
    padding: "0.875rem 1.75rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(126,15,74,0.35)",
    transition: "background 0.2s, box-shadow 0.2s",
  },
  secondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "transparent",
    color: colors.navy,
    fontWeight: 700,
    fontSize: "0.9375rem",
    padding: "0.875rem 1.75rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    border: `2px solid ${colors.navy}`,
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s, border-color 0.2s",
  },
  primaryOnDark: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: colors.magenta,
    color: "white",
    fontWeight: 700,
    fontSize: "0.9375rem",
    padding: "0.875rem 1.75rem",
    borderRadius: "0.75rem",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  },
  secondaryOnDark: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "transparent",
    color: "white",
    fontWeight: 700,
    fontSize: "0.9375rem",
    padding: "0.875rem 1.75rem",
    borderRadius: "0.75rem",
    textDecoration: "none",
    border: "2px solid rgba(255,255,255,0.4)",
    cursor: "pointer",
    transition: "background 0.2s",
  },
} as const;
