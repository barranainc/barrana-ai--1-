import { useState } from "react";
import type { PlannerState } from "@/types/planner";

interface Props {
  state: PlannerState;
  onSubmit: (email: string, businessName: string, name: string, notes: string) => void;
  isSubmitted: boolean;
}

export default function LeadCaptureForm({ onSubmit, isSubmitted }: Props) {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ email?: string; businessName?: string }>({});
  const [submittedEmail, setSubmittedEmail] = useState("");

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmittedEmail(email);
    onSubmit(email, businessName, name, notes);
  };

  if (isSubmitted) {
    return (
      <div
        style={{
          background: "#ECFDF5",
          border: "1.5px solid #6EE7B7",
          borderRadius: 14,
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#0D9668",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L20 7"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3
          style={{
            margin: "0 0 8px",
            fontSize: 18,
            fontWeight: 800,
            color: "#064E3B",
          }}
        >
          Thank you.
        </h3>
        <p style={{ margin: 0, fontSize: 15, color: "#065F46", lineHeight: 1.5 }}>
          Your detailed automation map will be sent to{" "}
          <strong>{submittedEmail}</strong> within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Email */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1A1A2E",
              marginBottom: 6,
            }}
          >
            Email address <span style={{ color: "#7E0F4A" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: errors.email ? "2px solid #DC2626" : "2px solid #E2E4ED",
              fontSize: 15,
              color: "#1A1A2E",
              outline: "none",
              boxSizing: "border-box",
              background: "white",
            }}
          />
          {errors.email && (
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#DC2626" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Business name */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1A1A2E",
              marginBottom: 6,
            }}
          >
            Business name <span style={{ color: "#7E0F4A" }}>*</span>
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => {
              setBusinessName(e.target.value);
              if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: undefined }));
            }}
            placeholder="Your business name"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: errors.businessName ? "2px solid #DC2626" : "2px solid #E2E4ED",
              fontSize: 15,
              color: "#1A1A2E",
              outline: "none",
              boxSizing: "border-box",
              background: "white",
            }}
          />
          {errors.businessName && (
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#DC2626" }}>
              {errors.businessName}
            </p>
          )}
        </div>

        {/* Name (optional) */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1A1A2E",
              marginBottom: 6,
            }}
          >
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Optional"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "2px solid #E2E4ED",
              fontSize: 15,
              color: "#1A1A2E",
              outline: "none",
              boxSizing: "border-box",
              background: "white",
            }}
          />
        </div>

        {/* Notes (optional) */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1A1A2E",
              marginBottom: 6,
            }}
          >
            Anything else we should know?
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional"
            rows={3}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "2px solid #E2E4ED",
              fontSize: 15,
              color: "#1A1A2E",
              outline: "none",
              boxSizing: "border-box",
              background: "white",
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px 24px",
            borderRadius: 8,
            border: "none",
            background: "#7E0F4A",
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.15s",
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#6a0c3e";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#7E0F4A";
          }}
        >
          Get My Custom Automation Map
        </button>

        {/* Microcopy */}
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "#7B7B7B",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          We will send your detailed automation map within 24 hours.
        </p>
      </div>
    </form>
  );
}
