export interface LeadData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  companyName?: string;
  industry?: string;
  message?: string;
  formName: string;
  pageUrl: string;
  tags: string[];
  customFields?: { key: string; field_value: string }[];
}

export async function submitLead(
  data: LeadData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit");
    return { success: true };
  } catch (err) {
    console.error("Lead submission error:", err);
    return { success: false, error: String(err) };
  }
}
