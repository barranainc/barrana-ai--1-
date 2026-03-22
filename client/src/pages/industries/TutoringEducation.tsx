import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import IndustryPlannerCTA from "@/components/planner-cta/IndustryPlannerCTA";

const data: IndustryPageData = {
  title: "AI Automation for Tutoring Centers Toronto | Barrana.ai",
  description:
    "Automate student enrollment, session scheduling, parent communication, progress reporting, and re-enrollment campaigns for tutoring and education centers. Free audit.",
  route: "tutoring-education",
  breadcrumb: "Tutoring and Education Centers",
  h1: "Enrollment Season Is a 3-Week Scramble Every Year. Session Scheduling Is a Spreadsheet Nightmare. Automate Both.",
  subheadline:
    "Enrollment intake automated with assessment booking. Session scheduling with reminders. Parent progress updates on schedule. Re-enrollment campaigns that start 60 days before term end. Referral requests after grade improvements.",
  body: [
    "Tutoring centers and education programs face two operational peaks: enrollment seasons that overwhelm admin staff with inquiries, and ongoing session management that requires scheduling, rescheduling, parent communication, and progress tracking across dozens or hundreds of students.",
    "The centers that grow enrollment while maintaining quality are the ones that automate the administrative coordination. Tutors teach. The system handles everything else.",
  ],
  ctaMicro:
    "See how automation streamlines your enrollment and scheduling. Free audit.",

  costHeading: "What Manual Operations Cost Tutoring Centers",
  costItems: [
    {
      figure: "30-50%",
      label: "Enrollment Inquiries Lost",
      desc: "Parents inquire during the evening. Response comes the next day. By then they have enrolled their child elsewhere.",
    },
    {
      figure: "Hours/Week",
      label: "Session Scheduling Overhead",
      desc: "Matching students with tutors, managing room availability, handling cancellations and makeups. All manual.",
    },
    {
      figure: "30-40%",
      label: "Re-Enrollment Lapse",
      desc: "Term ends. Some students re-enroll. Others disappear because nobody contacted them about the next term.",
    },
  ],

  problems: [
    {
      title: "Enrollment Inquiries Answered Too Late",
      desc: "Parents research tutoring in the evening. If your response comes the next morning, they have already enrolled with a competitor who responded at 9pm.",
    },
    {
      title: "Session Scheduling Is Complex and Manual",
      desc: "Matching student availability with tutor schedules, room assignments, and subject requirements. Changes cascade. Manual management creates errors.",
    },
    {
      title: "Parent Communication Is Inconsistent",
      desc: "Some parents get regular progress updates. Others hear nothing until report card time. Consistency depends on the tutor, not a system.",
    },
    {
      title: "Re-Enrollment Depends on Memory",
      desc: "Term ending soon. Some students are contacted about re-enrollment. Others are not. Revenue walks out the door.",
    },
  ],

  beforeAfterMetrics: [
    {
      label: "Enrollment Response",
      before: "Next business day",
      after: "Under 90 seconds with assessment booking",
      beforeW: 90,
      afterW: 8,
    },
    {
      label: "Session Scheduling",
      before: "Manual coordination, errors common",
      after: "System-managed with conflict prevention",
      beforeW: 80,
      afterW: 10,
    },
    {
      label: "Parent Updates",
      before: "Inconsistent by tutor",
      after: "Automated monthly progress reports",
      beforeW: 85,
      afterW: 8,
    },
    {
      label: "Re-Enrollment Rate",
      before: "60-70% (reactive)",
      after: "80%+ (60-day proactive campaign)",
      beforeW: 80,
      afterW: 30,
    },
    {
      label: "Referral Requests",
      before: "Rarely asked",
      after: "Automatic after grade improvements",
      beforeW: 90,
      afterW: 8,
    },
  ],

  workflowHeading: "Systems We Build for Tutoring Centers",
  workflowSteps: [
    { label: "Parent Inquiry", type: "trigger" },
    { label: "90s Response + Assessment", type: "ai" },
    { label: "Enroll + Schedule", type: "action" },
    { label: "Monthly Progress Report", type: "action" },
    { label: "Re-Enrollment (60d)", type: "action" },
    { label: "Grade Improvement → Referral", type: "action" },
    { label: "Student Retained", type: "outcome" },
  ],
  workflowBadge: "Re-enrollment: 60-70% → 80%+",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Scheduling conflicts (double-booked rooms, tutor unavailable) detected and blocked before confirmation sent to parents.",
    },
    {
      title: "Retries",
      desc: "Parent communication failures retry via alternate method (SMS if email fails).",
    },
    {
      title: "Approvals",
      desc: "Tutor progress notes reviewed by center director before parent distribution.",
    },
    {
      title: "Logging",
      desc: "All parent communications, enrollment records, and progress reports logged per student.",
    },
    {
      title: "Escalation",
      desc: "Parents expressing dissatisfaction or concerns about tutor quality flagged immediately to center management.",
    },
  ],

  roiMetrics: [
    {
      label: "Enrollment Conversion",
      after: "Improved 30-50% through faster response",
    },
    {
      label: "Session Scheduling",
      before: "Manual, errors",
      after: "Automated, zero conflicts",
    },
    {
      label: "Parent Satisfaction",
      after: "Improved through consistent communication",
    },
    { label: "Re-Enrollment Rate", before: "60-70%", after: "80%+" },
    {
      label: "Referral Rate",
      after: "Systematic after grade improvements",
    },
    { label: "Payback Period", after: "Within first enrollment cycle" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific business.",

  bestFit: [
    "Tutoring centers with 50+ active students",
    "Education centers running multiple terms per year",
    "After-school programs with complex scheduling",
    "Test prep centers with enrollment peaks",
  ],
  notFit: [
    "Individual tutors with fewer than 10 students",
    "Centers without digital scheduling tools",
  ],

  aeoQuestion: "How does AI automation help tutoring centers?",
  aeoAnswer:
    "AI automation helps tutoring centers by responding to enrollment inquiries within 90 seconds with assessment booking, managing session scheduling with conflict prevention and reminders, generating monthly parent progress reports from tutor notes, running re-enrollment campaigns starting 60 days before term end, and requesting referrals after students show grade improvements. This increases enrollment conversion, improves retention to 80%+, and maintains consistent parent communication that builds loyalty.",

  faqItems: [
    {
      question: "Which tutoring software?",
      answer:
        "We integrate with TutorCruncher, Teachworks, MyTutor, and custom scheduling systems.",
    },
    {
      question: "Group and individual sessions?",
      answer:
        "Yes. Scheduling handles both with appropriate room/capacity management.",
    },
    {
      question: "Progress report format?",
      answer:
        "Branded template with tutor notes, attendance, and subject-specific feedback. Customizable per center.",
    },
    {
      question: "How long?",
      answer: "Standard education center automation: 3-4 weeks.",
    },
    {
      question: "How much?",
      answer: "Tutoring center automation: $4,000-$8,000 CAD.",
    },
    {
      question: "Seasonal enrollment campaigns?",
      answer:
        "Yes. Back-to-school, exam prep, and summer program campaigns automated with targeted outreach.",
    },
  ],

  ctaHeadline:
    "Enrollment Season Does Not Have to Be Chaos. Session Management Does Not Have to Be a Spreadsheet. Automate.",
  ctaBody:
    "Walk away with a clear plan for 80%+ re-enrollment and zero scheduling conflicts. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Tutoring Centers Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
      desc: "Consistent enrollment every inquiry",
    },
    {
      label: "Appointment Automation",
      href: "/services/appointment-automation",
      desc: "Sessions scheduled and confirmed",
    },
    {
      label: "Operations Reporting",
      href: "/services/operations-reporting",
      desc: "Progress reports delivered automatically",
    },
    {
      label: "Service Businesses",
      href: "/industries/service-businesses",
      desc: "Automation for all service operations",
    },
  ],
};

export default function TutoringEducation() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return (
    <IndustryPageLayout data={data}>
      <IndustryPlannerCTA industryName="Tutoring & Education" industrySlug="education" />
    </IndustryPageLayout>
  );
}
