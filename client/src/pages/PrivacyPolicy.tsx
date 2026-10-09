import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <SEOHead
        title="Privacy Policy | Barrana.ai"
        description="Barrana.ai privacy policy. Learn how we collect, use, protect, and manage your personal information in accordance with Canadian privacy law (PIPEDA)."
      />

      <section className="relative overflow-hidden bg-[#09142F] py-16 text-white lg:py-20">
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(117,135,209,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(117,135,209,0.14) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="container relative max-w-4xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9BE5DD]">Legal</p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Privacy Policy</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Last updated: October 8, 2026
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-900/[0.03] sm:p-10 lg:p-12">
            <div className="prose prose-slate max-w-none">
              <h2>1. Introduction</h2>
              <p>
                This privacy policy explains how Barrana.ai ("Barrana," "we," "our," or "us") collects, uses, discloses, and protects your personal information when you use our website, services, or contact us for information about workflow automation and AI implementation services.
              </p>
              <p>
                Barrana.ai is a Canadian AI automation company founded by Ikram Rana. We are committed to protecting your privacy and handling your personal information in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and other applicable privacy laws.
              </p>

              <h2>2. Contact Information</h2>
              <p>
                If you have questions about this privacy policy or how we handle your personal information, you can contact us at:
              </p>
              <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
                <p className="font-semibold text-slate-900">Barrana.ai</p>
                <p className="mt-2 text-slate-600">50 Corstate Avenue, Unit 01</p>
                <p className="text-slate-600">Vaughan, Ontario L4K 4X2</p>
                <p className="text-slate-600">Canada</p>
                <p className="mt-3 text-slate-600">Email: <a href="mailto:help@barrana.ai" className="text-[#283891] hover:underline">help@barrana.ai</a></p>
                <p className="text-slate-600">Phone: <a href="tel:+16473676771" className="text-[#283891] hover:underline">+1 647 367 6771</a></p>
              </div>

              <h2>3. Information We Collect</h2>
              <h3>3.1 Information You Provide Directly</h3>
              <p>
                When you contact us through forms on our website or submit information to inquire about our services, we may collect:
              </p>
              <ul>
                <li>Your name</li>
                <li>Work email address</li>
                <li>Phone number (optional)</li>
                <li>Business name</li>
                <li>Industry</li>
                <li>Team size (optional)</li>
                <li>Workflow descriptions and business information you choose to share</li>
                <li>Any additional information you provide in messages or notes</li>
              </ul>

              <h3>3.2 Information from Third-Party Services</h3>
              <p>
                If you contact us through social media platforms, advertising platforms, or lead generation forms operated by third parties (such as Meta, Facebook, or Instagram lead forms), we may receive the information you submit through those platforms in accordance with your settings and the third party's privacy policy.
              </p>

              <h3>3.3 Automatically Collected Information</h3>
              <p>
                When you visit our website, we automatically collect certain technical information, including:
              </p>
              <ul>
                <li>Your IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages you visit and how you interact with our site</li>
                <li>Date and time of your visit</li>
                <li>Referring website or source</li>
              </ul>

              <h2>4. How We Use Your Information</h2>
              <p>
                We use the personal information we collect for the following purposes:
              </p>
              <ul>
                <li><strong>Service delivery and communication:</strong> To respond to your inquiries, provide information about our workflow automation and AI implementation services, schedule consultations, and communicate about potential engagements.</li>
                <li><strong>Business operations:</strong> To analyze workflow requirements, prepare proposals, deliver discovery and implementation services, and maintain records of our business interactions.</li>
                <li><strong>Marketing and advertising:</strong> To provide relevant information about our services, send follow-up communications (with your consent where required), and measure the effectiveness of our marketing efforts.</li>
                <li><strong>Website improvement:</strong> To understand how visitors use our website, improve user experience, diagnose technical issues, and enhance our content and services.</li>
                <li><strong>Legal compliance:</strong> To comply with applicable laws, respond to legal requests, protect our rights and property, and enforce our terms of service.</li>
              </ul>

              <h2>5. Cookies and Tracking Technologies</h2>
              <h3>5.1 Cookies</h3>
              <p>
                Our website uses cookies and similar tracking technologies. Cookies are small text files stored on your device that help us recognize you, remember your preferences, and understand how you use our site.
              </p>

              <h3>5.2 Analytics and Advertising Tools</h3>
              <p>
                We use third-party analytics and advertising tools to understand website traffic, measure the performance of our marketing campaigns, and deliver relevant advertisements. These tools may include:
              </p>
              <ul>
                <li><strong>Meta Pixel (Facebook Pixel):</strong> We use the Meta Pixel to track conversions from Facebook and Instagram advertisements, build audiences for ad targeting, and measure the effectiveness of our advertising campaigns. The Meta Pixel collects information about your visits to our website, including pages viewed and actions taken.</li>
                <li><strong>Other advertising and analytics services:</strong> We may use additional services from time to time to analyze user behavior, optimize our marketing efforts, and improve website performance.</li>
              </ul>

              <h3>5.3 Managing Cookies and Ad Preferences</h3>
              <p>
                You can control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or receive alerts before cookies are stored. However, disabling cookies may affect your ability to use certain features of our website.
              </p>
              <p>
                To opt out of personalized advertising based on your online activity:
              </p>
              <ul>
                <li>Visit the Digital Advertising Alliance of Canada at <a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer" className="text-[#283891] hover:underline">youradchoices.ca</a></li>
                <li>Adjust your ad preferences on <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-[#283891] hover:underline">Facebook</a> and <a href="https://www.instagram.com/accounts/privacy_and_security/" target="_blank" rel="noopener noreferrer" className="text-[#283891] hover:underline">Instagram</a></li>
                <li>Review and adjust privacy settings on other platforms where you may see our advertisements</li>
              </ul>

              <h2>6. How We Share Your Information</h2>
              <p>
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul>
                <li><strong>Service providers:</strong> We may share information with trusted third-party service providers who assist us with business operations, such as email delivery, customer relationship management, website hosting, analytics, payment processing, and marketing services. These providers are contractually obligated to protect your information and use it only for the purposes we specify.</li>
                <li><strong>Advertising platforms:</strong> We share limited information with advertising platforms (such as Meta, Facebook, and Instagram) to deliver, measure, and optimize our advertising campaigns. This may include hashed email addresses, phone numbers, or other identifiers that help match you with platform user accounts for ad targeting and measurement purposes.</li>
                <li><strong>Business transfers:</strong> If Barrana.ai is involved in a merger, acquisition, sale of assets, or other business transaction, your information may be transferred as part of that transaction.</li>
                <li><strong>Legal requirements:</strong> We may disclose information when required by law, legal process, court order, government request, or to protect our rights, property, safety, or the rights, property, or safety of others.</li>
                <li><strong>With your consent:</strong> We may share your information for other purposes with your explicit consent.</li>
              </ul>

              <h2>7. Cross-Border Data Storage and Processing</h2>
              <p>
                Some of our service providers and technology platforms are located outside of Canada, including in the United States and other countries. When we use these services, your personal information may be stored, processed, or accessed in those jurisdictions, which may have different privacy laws than Canada.
              </p>
              <p>
                We take reasonable steps to ensure that third-party service providers provide an adequate level of protection for your personal information, including through contractual commitments. However, information stored or processed outside Canada may be subject to lawful access by courts, law enforcement, and national security authorities in those jurisdictions.
              </p>

              <h2>8. Data Retention</h2>
              <p>
                We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p>
                Retention periods vary depending on the type of information and the purpose for which it was collected. For example:
              </p>
              <ul>
                <li>Contact form submissions and inquiry records: retained for as long as necessary to respond to your inquiry and maintain business records, typically 3 to 7 years.</li>
                <li>Client engagement records: retained for the duration of the engagement and for a reasonable period afterward to support ongoing services, legal compliance, and business records, typically 7 years or as required by law.</li>
                <li>Marketing and analytics data: retained for as long as necessary to support our marketing efforts and analyze performance, subject to your consent and legal requirements.</li>
              </ul>
              <p>
                After the retention period expires, we securely delete or anonymize your personal information.
              </p>

              <h2>9. Data Security</h2>
              <p>
                We implement reasonable physical, technical, and administrative safeguards to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. These measures include:
              </p>
              <ul>
                <li>Secure transmission of data using encryption (HTTPS)</li>
                <li>Access controls and authentication requirements for systems containing personal information</li>
                <li>Regular security reviews and updates to our practices and technology</li>
                <li>Contractual requirements for service providers to protect your information</li>
              </ul>
              <p>
                While we take reasonable steps to protect your information, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security.
              </p>

              <h2>10. Your Privacy Rights</h2>
              <p>
                Under Canadian privacy law, you have the following rights regarding your personal information:
              </p>
              <ul>
                <li><strong>Right to access:</strong> You have the right to request access to the personal information we hold about you and to receive information about how we use and disclose it.</li>
                <li><strong>Right to correction:</strong> You have the right to request that we correct inaccurate or incomplete personal information.</li>
                <li><strong>Right to withdraw consent:</strong> Where we rely on your consent to process your information (such as for marketing communications), you have the right to withdraw that consent at any time.</li>
                <li><strong>Right to request deletion:</strong> In certain circumstances, you may request that we delete your personal information, subject to legal and operational requirements.</li>
                <li><strong>Right to complain:</strong> If you believe we have not handled your personal information appropriately, you have the right to file a complaint with the Office of the Privacy Commissioner of Canada.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the contact information provided in Section 2 of this policy. We will respond to your request within a reasonable time, typically within 30 days, and in accordance with applicable law.
              </p>
              <p>
                To opt out of marketing communications, you can use the unsubscribe link in our emails or contact us directly.
              </p>

              <h2>11. Children's Privacy</h2>
              <p>
                Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete that information as soon as possible.
              </p>

              <h2>12. Changes to This Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will update the "Last updated" date at the top of this policy and, where appropriate, notify you by email or through a notice on our website.
              </p>
              <p>
                We encourage you to review this privacy policy periodically to stay informed about how we protect your information.
              </p>

              <h2>13. Additional Information for Meta Ad Users</h2>
              <p>
                If you interact with Barrana.ai through Facebook or Instagram advertisements, lead forms, or other Meta platforms:
              </p>
              <ul>
                <li>Your interactions are subject to <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-[#283891] hover:underline">Meta's Privacy Policy</a> in addition to this privacy policy.</li>
                <li>When you submit information through a Meta lead form, Meta shares that information with us so we can respond to your inquiry.</li>
                <li>We may use information you provide to create Custom Audiences or Lookalike Audiences on Meta platforms for advertising purposes. You can manage your ad preferences and opt out of certain data uses through your <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-[#283891] hover:underline">Facebook ad settings</a> and <a href="https://www.instagram.com/accounts/privacy_and_security/" target="_blank" rel="noopener noreferrer" className="text-[#283891] hover:underline">Instagram privacy settings</a>.</li>
                <li>The Meta Pixel on our website helps us measure ad performance, optimize campaigns, and deliver relevant ads to you on Facebook and Instagram.</li>
              </ul>

              <h2>14. Governing Law</h2>
              <p>
                This privacy policy is governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes arising from this policy or our privacy practices will be subject to the jurisdiction of the courts of Ontario.
              </p>

              <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-600">
                  <strong className="text-slate-900">Questions or concerns?</strong> If you have questions about this privacy policy, want to exercise your privacy rights, or have concerns about how we handle your personal information, please contact us at <a href="mailto:help@barrana.ai" className="text-[#283891] hover:underline">help@barrana.ai</a> or call us at <a href="tel:+16473676771" className="text-[#283891] hover:underline">+1 647 367 6771</a>.
                </p>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-8">
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-[#283891] hover:text-[#7E0F4A]">
                  ← Return to Contact Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
