interface Props {
  onBack: () => void;
  onNext: () => void;
  canNext: boolean;
  isLastStep?: boolean;
  nextLabel?: string;
  backLabel?: string;
  showBack?: boolean;
}

export default function PlannerNav({
  onBack,
  onNext,
  canNext,
  isLastStep = false,
  nextLabel = "Next",
  backLabel = "Back",
  showBack = true,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: showBack ? "space-between" : "flex-end",
        alignItems: "center",
        marginTop: 32,
        gap: 12,
      }}
    >
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "12px 28px",
            borderRadius: 8,
            border: "2px solid #E2E4ED",
            background: "white",
            color: "#7B7B7B",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            transition: "border-color 0.15s, color 0.15s",
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#7B7B7B";
            (e.currentTarget as HTMLButtonElement).style.color = "#1A1A2E";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E4ED";
            (e.currentTarget as HTMLButtonElement).style.color = "#7B7B7B";
          }}
        >
          {backLabel}
        </button>
      )}

      <button
        type="button"
        onClick={canNext ? onNext : undefined}
        disabled={!canNext}
        style={{
          padding: "12px 28px",
          borderRadius: 8,
          border: "none",
          background: canNext ? "#7E0F4A" : "#E2E4ED",
          color: canNext ? "white" : "#7B7B7B",
          fontSize: 15,
          fontWeight: 700,
          cursor: canNext ? "pointer" : "not-allowed",
          transition: "background 0.15s, color 0.15s, opacity 0.15s",
          lineHeight: 1,
          opacity: canNext ? 1 : 0.7,
        }}
        onMouseEnter={(e) => {
          if (canNext) {
            (e.currentTarget as HTMLButtonElement).style.background = "#6a0c3e";
          }
        }}
        onMouseLeave={(e) => {
          if (canNext) {
            (e.currentTarget as HTMLButtonElement).style.background = "#7E0F4A";
          }
        }}
      >
        {isLastStep ? "See My Results" : nextLabel}
      </button>
    </div>
  );
}
