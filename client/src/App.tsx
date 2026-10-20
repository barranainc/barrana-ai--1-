import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { initAnalytics, trackPageView } from "./lib/analytics";
import { loadFonts } from "./lib/fonts";
import { redirects as retiredRedirects } from "../../scripts/routes.mjs";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import RouteMetadataFallback from "./components/RouteMetadataFallback";
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const LeadResponseAutomation = lazy(() => import("./pages/services/LeadResponseAutomation"));
const ClientIntakeAutomation = lazy(() => import("./pages/services/ClientIntakeAutomation"));
const AIReceptionist = lazy(() => import("./pages/services/AIReceptionist"));
const DocumentCollectionAutomation = lazy(() => import("./pages/services/DocumentCollectionAutomation"));
const AppointmentAutomation = lazy(() => import("./pages/services/AppointmentAutomation"));
const InvoiceAutomation = lazy(() => import("./pages/services/InvoiceAutomation"));
const WorkflowAutomation = lazy(() => import("./pages/services/WorkflowAutomation"));
const CRMAutomation = lazy(() => import("./pages/services/CRMAutomation"));
const OperationsReportingAutomation = lazy(() => import("./pages/services/OperationsReportingAutomation"));
const AfterHoursAutomation = lazy(() => import("./pages/services/AfterHoursAutomation"));
const AIAgents = lazy(() => import("./pages/services/AIAgents"));
const CustomAISystems = lazy(() => import("./pages/services/CustomAISystems"));
const FullStackServices = lazy(() => import("./pages/services/FullStackServices"));
const Industries = lazy(() => import("./pages/Industries"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const ImmigrationConsultants = lazy(() => import("./pages/industries/ImmigrationConsultants"));
const AccountingFirms = lazy(() => import("./pages/industries/AccountingFirms"));
const LawFirms = lazy(() => import("./pages/industries/LawFirms"));
const Contractors = lazy(() => import("./pages/industries/Contractors"));
const PhysiotherapyClinics = lazy(() => import("./pages/industries/PhysiotherapyClinics"));
const RealEstateTeams = lazy(() => import("./pages/industries/RealEstateTeams"));
const ServiceBusinesses = lazy(() => import("./pages/industries/ServiceBusinesses"));
const DentalOffices = lazy(() => import("./pages/industries/DentalOffices"));
const InsuranceBrokers = lazy(() => import("./pages/industries/InsuranceBrokers"));
const MortgageBrokers = lazy(() => import("./pages/industries/MortgageBrokers"));
const FinancialAdvisors = lazy(() => import("./pages/industries/FinancialAdvisors"));
const MarketingAgencies = lazy(() => import("./pages/industries/MarketingAgencies"));
const CleaningCompanies = lazy(() => import("./pages/industries/CleaningCompanies"));
const PropertyManagement = lazy(() => import("./pages/industries/PropertyManagement"));
const HomeServices = lazy(() => import("./pages/industries/HomeServices"));
const MedicalClinics = lazy(() => import("./pages/industries/MedicalClinics"));
const VeterinaryClinics = lazy(() => import("./pages/industries/VeterinaryClinics"));
const TutoringEducation = lazy(() => import("./pages/industries/TutoringEducation"));
const AutoRepair = lazy(() => import("./pages/industries/AutoRepair"));
const Landscaping = lazy(() => import("./pages/industries/Landscaping"));
const ImmigrationFirmNorthYork = lazy(() => import("./pages/case-studies/ImmigrationFirmNorthYork"));
const AccountingFirmVaughan = lazy(() => import("./pages/case-studies/AccountingFirmVaughan"));
const ContractorMississauga = lazy(() => import("./pages/case-studies/ContractorMississauga"));
const PhysioClinicRichmondHill = lazy(() => import("./pages/case-studies/PhysioClinicRichmondHill"));
const LawFirmToronto = lazy(() => import("./pages/case-studies/LawFirmToronto"));
const RealEstateTeamMarkham = lazy(() => import("./pages/case-studies/RealEstateTeamMarkham"));
const DentalOfficeScarborough = lazy(() => import("./pages/case-studies/DentalOfficeScarborough"));
const CleaningCompanyEtobicoke = lazy(() => import("./pages/case-studies/CleaningCompanyEtobicoke"));
const HVACCompanyBrampton = lazy(() => import("./pages/case-studies/HVACCompanyBrampton"));
const PropertyManagementToronto = lazy(() => import("./pages/case-studies/PropertyManagementToronto"));
const InsuranceBrokerageVaughan = lazy(() => import("./pages/case-studies/InsuranceBrokerageVaughan"));
const MarketingAgencyLibertyVillage = lazy(() => import("./pages/case-studies/MarketingAgencyLibertyVillage"));
const Locations = lazy(() => import("./pages/Locations"));
const LocationDetail = lazy(() => import("./pages/LocationDetail"));
const Resources = lazy(() => import("./pages/Resources"));
const AutomationPlanner = lazy(() => import("./pages/AutomationPlanner"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// SEO/AEO Expansion Pages
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase"));
const KnowledgeArticle = lazy(() => import("./pages/KnowledgeArticle"));
const Playbooks = lazy(() => import("./pages/Playbooks"));
const PlaybookDetail = lazy(() => import("./pages/PlaybookDetail"));
const Glossary = lazy(() => import("./pages/Glossary"));
const BeforeAfter = lazy(() => import("./pages/BeforeAfter"));
const Benchmarks = lazy(() => import("./pages/Benchmarks"));
const Governance = lazy(() => import("./pages/Governance"));
const WorkflowTemplates = lazy(() => import("./pages/WorkflowTemplates"));
const OperatorInsights = lazy(() => import("./pages/OperatorInsights"));
const OperatorInsightArticle = lazy(() => import("./pages/OperatorInsightArticle"));
const Integrations = lazy(() => import("./pages/Integrations"));
const IntegrationDetail = lazy(() => import("./pages/IntegrationDetail"));
const ROICalculator = lazy(() => import("./pages/ROICalculator"));
const LocalSEOPage = lazy(() => import("./pages/LocalSEOPage"));
const LocationIndustryPage = lazy(() => import("./pages/LocationIndustryPage"));
const FAQ = lazy(() => import("./pages/FAQ"));
const WhatIsAIAutomation = lazy(() => import("./pages/resources/WhatIsAIAutomation"));
const OperationalFrictionMap = lazy(() => import("./pages/resources/OperationalFrictionMap"));
const AutomateClientIntake = lazy(() => import("./pages/resources/AutomateClientIntake"));
const AutomationROI = lazy(() => import("./pages/resources/AutomationROI"));
const ProfessionalServicesGuide = lazy(() => import("./pages/resources/ProfessionalServicesGuide"));
const IntegrationPriorityMatrix = lazy(() => import("./pages/resources/IntegrationPriorityMatrix"));
const IndustryAutomationGuide = lazy(() => import("./pages/resources/IndustryAutomationGuide"));
const HumanInTheLoop = lazy(() => import("./pages/HumanInTheLoop"));
const AiAutomationIndustries = lazy(() => import("./pages/AiAutomationIndustries"));
const AiAutomationVaughan = lazy(() => import("./pages/AiAutomationVaughan"));
const AiAdoptionSmallBusiness = lazy(() => import("./pages/AiAdoptionSmallBusiness"));
const WorkflowAutomationSMB = lazy(() => import("./pages/WorkflowAutomationSMB"));
const AiReceptionistPage = lazy(() => import("./pages/AiReceptionistPage"));
const WhatToAutomateFirst = lazy(() => import("./pages/insights/WhatToAutomateFirst"));
const AutomationReadiness = lazy(() => import("./pages/insights/AutomationReadiness"));
const BuildVsBuy = lazy(() => import("./pages/insights/BuildVsBuy"));
const WhenAiIsNotTheAnswer = lazy(() => import("./pages/insights/WhenAiIsNotTheAnswer"));
const AutomationVsDelegation = lazy(() => import("./pages/insights/AutomationVsDelegation"));
const LeadIntakeWorkflow = lazy(() => import("./pages/workflows/LeadIntakeWorkflow"));
const StartHere = lazy(() => import("./pages/StartHere"));
const Solopreneurs = lazy(() => import("./pages/Solopreneurs"));
const AppointmentBookingWorkflow = lazy(() => import("./pages/workflows/AppointmentBookingWorkflow"));
const ClientOnboardingWorkflow = lazy(() => import("./pages/workflows/ClientOnboardingWorkflow"));
const DocumentCollectionWorkflow = lazy(() => import("./pages/workflows/DocumentCollectionWorkflow"));

// Campaign landing pages (no nav/footer)
const CampaignContractors = lazy(() => import("./pages/campaign/CampaignContractors"));
const CampaignDental = lazy(() => import("./pages/campaign/CampaignDental"));
const CampaignLawFirms = lazy(() => import("./pages/campaign/CampaignLawFirms"));
const CampaignRealEstate = lazy(() => import("./pages/campaign/CampaignRealEstate"));

type MetaPixelWindow = Window & {
  fbq?: (...args: unknown[]) => void;
};

function MetaPixelPageViews() {
  const [location] = useLocation();

  useEffect(() => {
    (window as MetaPixelWindow).fbq?.("track", "PageView");
    trackPageView(location);
  }, [location]);

  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteMetadataFallback />
      <Navigation />
      <main id="main-content" className="site-main" tabIndex={-1} style={{ paddingTop: "70px" }}>{children}</main>
      <Footer />
    </>
  );
}

function LayoutRoutes() {
  return (
    <Layout>
      <Suspense fallback={<div aria-busy="true" style={{ minHeight: "60vh" }} />}>
      <Switch>
        {/* Core Pages */}
        <Route path="/start-here" component={StartHere} />
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/lead-response-automation" component={LeadResponseAutomation} />
        <Route path="/services/client-intake-automation" component={ClientIntakeAutomation} />
        <Route path="/services/ai-receptionist" component={AIReceptionist} />
        <Route path="/services/document-collection" component={DocumentCollectionAutomation} />
        <Route path="/services/appointment-automation" component={AppointmentAutomation} />
        <Route path="/services/invoice-automation" component={InvoiceAutomation} />
        <Route path="/services/workflow-automation" component={WorkflowAutomation} />
        <Route path="/services/crm-automation" component={CRMAutomation} />
        <Route path="/services/operations-reporting" component={OperationsReportingAutomation} />
        <Route path="/services/after-hours-automation" component={AfterHoursAutomation} />
        <Route path="/services/ai-agents" component={AIAgents} />
        <Route path="/services/custom-ai-systems" component={CustomAISystems} />
        <Route path="/services/full-stack" component={FullStackServices} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/industries" component={Industries} />
        <Route path="/industries/immigration-consultants" component={ImmigrationConsultants} />
        <Route path="/industries/accounting-firms" component={AccountingFirms} />
        <Route path="/industries/law-firms" component={LawFirms} />
        <Route path="/industries/contractors" component={Contractors} />
        <Route path="/industries/physiotherapy-clinics" component={PhysiotherapyClinics} />
        <Route path="/industries/real-estate-teams" component={RealEstateTeams} />
        <Route path="/industries/service-businesses" component={ServiceBusinesses} />
        <Route path="/industries/dental-offices" component={DentalOffices} />
        <Route path="/industries/insurance-brokers" component={InsuranceBrokers} />
        <Route path="/industries/mortgage-brokers" component={MortgageBrokers} />
        <Route path="/industries/financial-advisors" component={FinancialAdvisors} />
        <Route path="/industries/marketing-agencies" component={MarketingAgencies} />
        <Route path="/industries/cleaning-companies" component={CleaningCompanies} />
        <Route path="/industries/property-management" component={PropertyManagement} />
        <Route path="/industries/home-services" component={HomeServices} />
        <Route path="/industries/medical-clinics" component={MedicalClinics} />
        <Route path="/industries/veterinary-clinics" component={VeterinaryClinics} />
        <Route path="/industries/tutoring-education" component={TutoringEducation} />
        <Route path="/industries/auto-repair" component={AutoRepair} />
        <Route path="/industries/landscaping" component={Landscaping} />
        <Route path="/industries/:slug" component={IndustryDetail} />
        <Route path="/locations" component={Locations} />
        <Route path="/locations/:slug" component={LocationDetail} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources/what-is-ai-automation" component={WhatIsAIAutomation} />
        <Route path="/resources/operational-friction-map" component={OperationalFrictionMap} />
        <Route path="/resources/automate-client-intake" component={AutomateClientIntake} />
        <Route path="/resources/automation-roi" component={AutomationROI} />
        <Route path="/resources/professional-services-guide" component={ProfessionalServicesGuide} />
        <Route path="/resources/integration-priority-matrix" component={IntegrationPriorityMatrix} />
        <Route path="/resources/automation-playbooks">{() => <Redirect to={retiredRedirects["/resources/automation-playbooks"] ?? "/playbooks"} replace />}</Route>
        <Route path="/resources/ai-automation-glossary">{() => <Redirect to={retiredRedirects["/resources/ai-automation-glossary"] ?? "/glossary"} replace />}</Route>
        <Route path="/resources/workflow-templates">{() => <Redirect to={retiredRedirects["/resources/workflow-templates"] ?? "/templates"} replace />}</Route>
        <Route path="/resources/automation-benchmarks">{() => <Redirect to={retiredRedirects["/resources/automation-benchmarks"] ?? "/benchmarks"} replace />}</Route>
        <Route path="/resources/before-and-after">{() => <Redirect to={retiredRedirects["/resources/before-and-after"] ?? "/before-after"} replace />}</Route>
        <Route path="/resources/roi-calculator">{() => <Redirect to={retiredRedirects["/resources/roi-calculator"] ?? "/automation-roi-calculator"} replace />}</Route>
        <Route path="/resources/:slug" component={IndustryAutomationGuide} />
        <Route path="/automation-planner" component={AutomationPlanner} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/case-studies/immigration-firm-north-york" component={ImmigrationFirmNorthYork} />
        <Route path="/case-studies/accounting-firm-vaughan" component={AccountingFirmVaughan} />
        <Route path="/case-studies/contractor-mississauga" component={ContractorMississauga} />
        <Route path="/case-studies/physio-clinic-richmond-hill" component={PhysioClinicRichmondHill} />
        <Route path="/case-studies/law-firm-toronto" component={LawFirmToronto} />
        <Route path="/case-studies/real-estate-team-markham" component={RealEstateTeamMarkham} />
        <Route path="/case-studies/dental-office-scarborough" component={DentalOfficeScarborough} />
        <Route path="/case-studies/cleaning-company-etobicoke" component={CleaningCompanyEtobicoke} />
        <Route path="/case-studies/hvac-company-brampton" component={HVACCompanyBrampton} />
        <Route path="/case-studies/property-management-toronto" component={PropertyManagementToronto} />
        <Route path="/case-studies/insurance-brokerage-vaughan" component={InsuranceBrokerageVaughan} />
        <Route path="/case-studies/marketing-agency-liberty-village" component={MarketingAgencyLibertyVillage} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/privacy">{() => { window.location.href = "/privacy-policy"; return null; }}</Route>
        <Route path="/faq" component={FAQ} />

        {/* SEO/AEO Expansion Pages */}
        <Route path="/knowledge" component={KnowledgeBase} />
        <Route path="/knowledge/:slug" component={KnowledgeArticle} />
        <Route path="/playbooks" component={Playbooks} />
        <Route path="/playbooks/:slug" component={PlaybookDetail} />
        <Route path="/glossary" component={Glossary} />
        <Route path="/before-after" component={BeforeAfter} />
        <Route path="/benchmarks" component={Benchmarks} />
        <Route path="/governance" component={Governance} />
        <Route path="/templates" component={WorkflowTemplates} />
        <Route path="/operator-insights" component={OperatorInsights} />
        <Route path="/operator-insights/:slug" component={OperatorInsightArticle} />
        <Route path="/integrations" component={Integrations} />
        <Route path="/integrations/:slug" component={IntegrationDetail} />
        <Route path="/automation-roi-calculator" component={ROICalculator} />

        {/* Foundation Content Pages */}
        <Route path="/human-in-the-loop-ai" component={HumanInTheLoop} />
        <Route path="/ai-automation-industries" component={AiAutomationIndustries} />
        <Route path="/ai-automation-vaughan" component={AiAutomationVaughan} />

        {/* Pillar Pages */}
        <Route path="/ai-adoption-small-business" component={AiAdoptionSmallBusiness} />
        <Route path="/workflow-automation-smb" component={WorkflowAutomationSMB} />
        <Route path="/ai-receptionist" component={AiReceptionistPage} />

        {/* Insights Pages */}
        <Route path="/insights/what-to-automate-first" component={WhatToAutomateFirst} />
        <Route path="/insights/automation-readiness" component={AutomationReadiness} />
        <Route path="/insights/build-vs-buy" component={BuildVsBuy} />
        <Route path="/insights/when-ai-is-not-the-answer" component={WhenAiIsNotTheAnswer} />
        <Route path="/insights/automation-vs-delegation" component={AutomationVsDelegation} />

        {/* Hub Pages */}
        <Route path="/solopreneurs" component={Solopreneurs} />

        {/* Workflow Pages */}
        <Route path="/workflows/lead-intake" component={LeadIntakeWorkflow} />
        <Route path="/workflows/appointment-booking" component={AppointmentBookingWorkflow} />
        <Route path="/workflows/client-onboarding" component={ClientOnboardingWorkflow} />
        <Route path="/workflows/document-collection" component={DocumentCollectionWorkflow} />

        {/* Location + Industry Pages (30 local pages) */}
        <Route path="/locations/:city/:industry" component={LocationIndustryPage} />

        {/* Local SEO Matrix */}
        <Route path="/ai-automation/:city" component={LocalSEOPage} />
        <Route path="/ai-automation/:city/:industry" component={LocalSEOPage} />

        {/* Fallback */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </Layout>
  );
}

function Router() {
  return (
    <Suspense fallback={<div aria-busy="true" style={{ minHeight: "60vh" }} />}>
    <Switch>
      {/* Campaign landing pages - no nav/footer */}
      <Route path="/campaign/contractors" component={CampaignContractors} />
      <Route path="/campaign/dental" component={CampaignDental} />
      <Route path="/campaign/law-firms" component={CampaignLawFirms} />
      <Route path="/campaign/real-estate" component={CampaignRealEstate} />

      {/* All other pages with Layout */}
      <Route>{() => <LayoutRoutes />}</Route>
    </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    loadFonts();
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <MetaPixelPageViews />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
