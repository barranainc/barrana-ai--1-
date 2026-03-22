import { Link } from "wouter";
import { useState } from "react";

export default function ROICalculator() {
  const [staff, setStaff] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [adminHours, setAdminHours] = useState(10);
  const [leadsPerMonth, setLeadsPerMonth] = useState(20);
  const [conversionRate, setConversionRate] = useState(25);
  const [avgDealValue, setAvgDealValue] = useState(2000);

  const weeklyAdminCost = staff * adminHours * hourlyRate;
  const monthlyAdminCost = weeklyAdminCost * 4.3;
  const savedCostPerMonth = staff * adminHours * 0.8 * 4.3 * hourlyRate;
  const additionalConversions = leadsPerMonth * 0.15;
  const additionalRevenue = additionalConversions * avgDealValue;
  const totalMonthlyROI = savedCostPerMonth + additionalRevenue;
  const paybackMonths = Math.ceil(3500 / totalMonthlyROI);

  const inputs = [
    { label: "Number of staff", value: staff, setter: setStaff, min: 1, max: 50, step: 1, fmt: (v: number) => `${v} staff` },
    { label: "Average hourly staff cost (CAD)", value: hourlyRate, setter: setHourlyRate, min: 15, max: 150, step: 5, fmt: (v: number) => `$${v}/hr` },
    { label: "Admin hours per staff per week", value: adminHours, setter: setAdminHours, min: 1, max: 40, step: 1, fmt: (v: number) => `${v} hrs/week` },
    { label: "New leads per month", value: leadsPerMonth, setter: setLeadsPerMonth, min: 1, max: 200, step: 1, fmt: (v: number) => `${v} leads` },
    { label: "Current quote conversion rate (%)", value: conversionRate, setter: setConversionRate, min: 5, max: 80, step: 5, fmt: (v: number) => `${v}%` },
    { label: "Average deal value (CAD)", value: avgDealValue, setter: setAvgDealValue, min: 100, max: 50000, step: 100, fmt: (v: number) => `$${v.toLocaleString()}` },
  ];

  const results = [
    { label: "Monthly admin cost (current)", value: `$${Math.round(monthlyAdminCost).toLocaleString()}`, sub: `${staff} staff x ${adminHours} hrs/week x $${hourlyRate}/hr`, color: "#DC2626", bold: false },
    { label: "Monthly admin savings from automation", value: `$${Math.round(savedCostPerMonth).toLocaleString()}`, sub: "~80% reduction in admin hours", color: "#059669", bold: false },
    { label: "Additional monthly revenue from faster lead response", value: `$${Math.round(additionalRevenue).toLocaleString()}`, sub: `+${additionalConversions.toFixed(1)} conversions/month at $${avgDealValue.toLocaleString()} avg`, color: "#059669", bold: false },
    { label: "Total monthly ROI", value: `$${Math.round(totalMonthlyROI).toLocaleString()}`, sub: "Admin savings + additional revenue", color: "#283891", bold: true },
    { label: "Estimated payback period", value: `${paybackMonths} months`, sub: "Based on ~$3,500 implementation", color: "#283891", bold: true },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>ROI Calculator</span>
          </div>
          <div className="max-w-3xl">
            <div className="eyebrow">ROI Calculator</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>Automation ROI Calculator</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>Estimate the return on investment from automation for your specific business. Adjust the inputs to match your situation.</p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl">
            <div>
              <h2 className="text-lg font-bold mb-6" style={{ color: "#1F2937" }}>Your Business Inputs</h2>
              <div className="space-y-6">
                {inputs.map((inp) => (
                  <div key={inp.label}>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium" style={{ color: "#374151" }}>{inp.label}</label>
                      <span className="text-sm font-bold" style={{ color: "#283891" }}>{inp.fmt(inp.value)}</span>
                    </div>
                    <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                      onChange={e => inp.setter(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: "#283891" }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-6" style={{ color: "#1F2937" }}>Estimated Results</h2>
              <div className="space-y-4">
                {results.map((r) => (
                  <div key={r.label} className="p-4 rounded-xl" style={{ backgroundColor: r.bold ? "#F0F4FF" : "#F7F9FC", border: `1px solid ${r.bold ? "rgba(26,82,118,0.2)" : "rgba(26,82,118,0.08)"}` }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#374151" }}>{r.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{r.sub}</p>
                      </div>
                      <span className={`${r.bold ? "text-xl" : "text-lg"} font-bold`} style={{ color: r.color }}>{r.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl text-xs" style={{ backgroundColor: "#FFF8E7", border: "1px solid rgba(217,119,6,0.2)", color: "#92400E" }}>
                <strong>Note:</strong> These are estimates based on typical results. Actual ROI depends on your specific workflows, starting conditions, and implementation scope.
              </div>
              <div className="mt-6">
                <Link href="/contact" className="btn-primary block text-center">Book Free Audit to Get Exact Numbers</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
