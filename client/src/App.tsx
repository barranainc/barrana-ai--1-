import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, useEffect } from "react";
import { lazyPage, preloadRoute } from "./lib/lazyPage";
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
const Home = lazyPage(() => import("./pages/Home"));
const Services = lazyPage(() => import("./pages/Services"));
const ServiceDetail = lazyPage(() => import("./pages/ServiceDetail"));
const LeadResponseAutomation = lazyPage(() => import("./pages/services/LeadResponseAutomation"));
const ClientIntakeAutomation = lazyPage(() => import("./pages/services/ClientIntakeAutomation"));
const AIReceptionist = lazyPage(() => import("./pages/services/AIReceptionist"));
const DocumentCollectionAutomation = lazyPage(() => import("./pages/services/DocumentCollectionAutomation"));
const AppointmentAutomation = lazyPage(() => import("./pages/services/AppointmentAutomation"));
const InvoiceAutomation = lazyPage(() => import("./pages/services/InvoiceAutomation"));
const WorkflowAutomation = lazyPage(() => import("./pages/services/WorkflowAutomation"));
const CRMAutomation = lazyPage(() => import("./pages/services/CRMAutomation"));
const OperationsReportingAutomation = lazyPage(() => import("./pages/services/OperationsReportingAutomation"));
const AfterHoursAutomation = lazyPage(() => import("./pages/services/AfterHoursAutomation"));
const AIAgents = lazyPage(() => import("./pages/services/AIAgents"));
const CustomAISystems = lazyPage(() => import("./pages/services/CustomAISystems"));
const FullStackServices = lazyPage(() => import("./pages/services/FullStackServices"));
const Industries = lazyPage(() => import("./pages/Industries"));
const IndustryDetail = lazyPage(() => import("./pages/IndustryDetail"));
const ImmigrationConsultants = lazyPage(() => import("./pages/industries/ImmigrationConsultants"));
const AccountingFirms = lazyPage(() => import("./pages/industries/AccountingFirms"));
const LawFirms = lazyPage(() => import("./pages/industries/LawFirms"));
const Contractors = lazyPage(() => import("./pages/industries/Contractors"));
const PhysiotherapyClinics = lazyPage(() => import("./pages/industries/PhysiotherapyClinics"));
const RealEstateTeams = lazyPage(() => import("./pages/industries/RealEstateTeams"));
const ServiceBusinesses = lazyPage(() => import("./pages/industries/ServiceBusinesses"));
const DentalOffices = lazyPage(() => import("./pages/industries/DentalOffices"));
const InsuranceBrokers = lazyPage(() => import("./pages/industries/InsuranceBrokers"));
const MortgageBrokers = lazyPage(() => import("./pages/industries/MortgageBrokers"));
const FinancialAdvisors = lazyPage(() => import("./pages/industries/FinancialAdvisors"));
const MarketingAgencies = lazyPage(() => import("./pages/industries/MarketingAgencies"));
const CleaningCompanies = lazyPage(() => import("./pages/industries/CleaningCompanies"));
const PropertyManagement = lazyPage(() => import("./pages/industries/PropertyManagement"));
const HomeServices = lazyPage(() => import("./pages/industries/HomeServices"));
const MedicalClinics = lazyPage(() => import("./pages/industries/MedicalClinics"));
const VeterinaryClinics = lazyPage(() => import("./pages/industries/VeterinaryClinics"));
const TutoringEducation = lazyPage(() => import("./pages/industries/TutoringEducation"));
const AutoRepair = lazyPage(() => import("./pages/industries/AutoRepair"));
const Landscaping = lazyPage(() => import("./pages/industries/Landscaping"));
const ImmigrationFirmNorthYork = lazyPage(() => import("./pages/case-studies/ImmigrationFirmNorthYork"));
const AccountingFirmVaughan = lazyPage(() => import("./pages/case-studies/AccountingFirmVaughan"));
const ContractorMississauga = lazyPage(() => import("./pages/case-studies/ContractorMississauga"));
const PhysioClinicRichmondHill = lazyPage(() => import("./pages/case-studies/PhysioClinicRichmondHill"));
const LawFirmToronto = lazyPage(() => import("./pages/case-studies/LawFirmToronto"));
const RealEstateTeamMarkham = lazyPage(() => import("./pages/case-studies/RealEstateTeamMarkham"));
const DentalOfficeScarborough = lazyPage(() => import("./pages/case-studies/DentalOfficeScarborough"));
const CleaningCompanyEtobicoke = lazyPage(() => import("./pages/case-studies/CleaningCompanyEtobicoke"));
const HVACCompanyBrampton = lazyPage(() => import("./pages/case-studies/HVACCompanyBrampton"));
const PropertyManagementToronto = lazyPage(() => import("./pages/case-studies/PropertyManagementToronto"));
const InsuranceBrokerageVaughan = lazyPage(() => import("./pages/case-studies/InsuranceBrokerageVaughan"));
const MarketingAgencyLibertyVillage = lazyPage(() => import("./pages/case-studies/MarketingAgencyLibertyVillage"));
const Locations = lazyPage(() => import("./pages/Locations"));
const LocationDetail = lazyPage(() => import("./pages/LocationDetail"));
const Resources = lazyPage(() => import("./pages/Resources"));
const AutomationPlanner = lazyPage(() => import("./pages/AutomationPlanner"));
const CaseStudies = lazyPage(() => import("./pages/CaseStudies"));
const About = lazyPage(() => import("./pages/About"));
const Contact = lazyPage(() => import("./pages/Contact"));
const PrivacyPolicy = lazyPage(() => import("./pages/PrivacyPolicy"));

// SEO/AEO Expansion Pages
const KnowledgeBase = lazyPage(() => import("./pages/KnowledgeBase"));
const KnowledgeArticle = lazyPage(() => import("./pages/KnowledgeArticle"));
const Playbooks = lazyPage(() => import("./pages/Playbooks"));
const PlaybookDetail = lazyPage(() => import("./pages/PlaybookDetail"));
const Glossary = lazyPage(() => import("./pages/Glossary"));
const BeforeAfter = lazyPage(() => import("./pages/BeforeAfter"));
const Benchmarks = lazyPage(() => import("./pages/Benchmarks"));
const Governance = lazyPage(() => import("./pages/Governance"));
const WorkflowTemplates = lazyPage(() => import("./pages/WorkflowTemplates"));
const OperatorInsights = lazyPage(() => import("./pages/OperatorInsights"));
const OperatorInsightArticle = lazyPage(() => import("./pages/OperatorInsightArticle"));
const Integrations = lazyPage(() => import("./pages/Integrations"));
const IntegrationDetail = lazyPage(() => import("./pages/IntegrationDetail"));
const ROICalculator = lazyPage(() => import("./pages/ROICalculator"));
const LocalSEOPage = lazyPage(() => import("./pages/LocalSEOPage"));
const LocationIndustryPage = lazyPage(() => import("./pages/LocationIndustryPage"));
const FAQ = lazyPage(() => import("./pages/FAQ"));
const WhatIsAIAutomation = lazyPage(() => import("./pages/resources/WhatIsAIAutomation"));
const OperationalFrictionMap = lazyPage(() => import("./pages/resources/OperationalFrictionMap"));
const AutomateClientIntake = lazyPage(() => import("./pages/resources/AutomateClientIntake"));
const AutomationROI = lazyPage(() => import("./pages/resources/AutomationROI"));
const ProfessionalServicesGuide = lazyPage(() => import("./pages/resources/ProfessionalServicesGuide"));
const IntegrationPriorityMatrix = lazyPage(() => import("./pages/resources/IntegrationPriorityMatrix"));
const IndustryAutomationGuide = lazyPage(() => import("./pages/resources/IndustryAutomationGuide"));
const HumanInTheLoop = lazyPage(() => import("./pages/HumanInTheLoop"));
const AiAutomationIndustries = lazyPage(() => import("./pages/AiAutomationIndustries"));
const AiAutomationVaughan = lazyPage(() => import("./pages/AiAutomationVaughan"));
const AiAdoptionSmallBusiness = lazyPage(() => import("./pages/AiAdoptionSmallBusiness"));
const WorkflowAutomationSMB = lazyPage(() => import("./pages/WorkflowAutomationSMB"));
const AiReceptionistPage = lazyPage(() => import("./pages/AiReceptionistPage"));
const WhatToAutomateFirst = lazyPage(() => import("./pages/insights/WhatToAutomateFirst"));
const AutomationReadiness = lazyPage(() => import("./pages/insights/AutomationReadiness"));
const BuildVsBuy = lazyPage(() => import("./pages/insights/BuildVsBuy"));
const WhenAiIsNotTheAnswer = lazyPage(() => import("./pages/insights/WhenAiIsNotTheAnswer"));
const AutomationVsDelegation = lazyPage(() => import("./pages/insights/AutomationVsDelegation"));
const LeadIntakeWorkflow = lazyPage(() => import("./pages/workflows/LeadIntakeWorkflow"));
const StartHere = lazyPage(() => import("./pages/StartHere"));
const Solopreneurs = lazyPage(() => import("./pages/Solopreneurs"));
const AppointmentBookingWorkflow = lazyPage(() => import("./pages/workflows/AppointmentBookingWorkflow"));
const ClientOnboardingWorkflow = lazyPage(() => import("./pages/workflows/ClientOnboardingWorkflow"));
const DocumentCollectionWorkflow = lazyPage(() => import("./pages/workflows/DocumentCollectionWorkflow"));

// Campaign landing pages (no nav/footer)
const CampaignContractors = lazyPage(() => import("./pages/campaign/CampaignContractors"));
const CampaignDental = lazyPage(() => import("./pages/campaign/CampaignDental"));
const CampaignLawFirms = lazyPage(() => import("./pages/campaign/CampaignLawFirms"));
const CampaignRealEstate = lazyPage(() => import("./pages/campaign/CampaignRealEstate"));

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


/** Routes in <Switch> order, used to preload the current page's chunk before the first render. */
const ROUTE_TABLE = [
  ["/campaign/contractors", CampaignContractors],
  ["/campaign/dental", CampaignDental],
  ["/campaign/law-firms", CampaignLawFirms],
  ["/campaign/real-estate", CampaignRealEstate],
  ["/start-here", StartHere],
  ["/", Home],
  ["/services", Services],
  ["/services/lead-response-automation", LeadResponseAutomation],
  ["/services/client-intake-automation", ClientIntakeAutomation],
  ["/services/ai-receptionist", AIReceptionist],
  ["/services/document-collection", DocumentCollectionAutomation],
  ["/services/appointment-automation", AppointmentAutomation],
  ["/services/invoice-automation", InvoiceAutomation],
  ["/services/workflow-automation", WorkflowAutomation],
  ["/services/crm-automation", CRMAutomation],
  ["/services/operations-reporting", OperationsReportingAutomation],
  ["/services/after-hours-automation", AfterHoursAutomation],
  ["/services/ai-agents", AIAgents],
  ["/services/custom-ai-systems", CustomAISystems],
  ["/services/full-stack", FullStackServices],
  ["/services/:slug", ServiceDetail],
  ["/industries", Industries],
  ["/industries/immigration-consultants", ImmigrationConsultants],
  ["/industries/accounting-firms", AccountingFirms],
  ["/industries/law-firms", LawFirms],
  ["/industries/contractors", Contractors],
  ["/industries/physiotherapy-clinics", PhysiotherapyClinics],
  ["/industries/real-estate-teams", RealEstateTeams],
  ["/industries/service-businesses", ServiceBusinesses],
  ["/industries/dental-offices", DentalOffices],
  ["/industries/insurance-brokers", InsuranceBrokers],
  ["/industries/mortgage-brokers", MortgageBrokers],
  ["/industries/financial-advisors", FinancialAdvisors],
  ["/industries/marketing-agencies", MarketingAgencies],
  ["/industries/cleaning-companies", CleaningCompanies],
  ["/industries/property-management", PropertyManagement],
  ["/industries/home-services", HomeServices],
  ["/industries/medical-clinics", MedicalClinics],
  ["/industries/veterinary-clinics", VeterinaryClinics],
  ["/industries/tutoring-education", TutoringEducation],
  ["/industries/auto-repair", AutoRepair],
  ["/industries/landscaping", Landscaping],
  ["/industries/:slug", IndustryDetail],
  ["/locations", Locations],
  ["/locations/:slug", LocationDetail],
  ["/resources", Resources],
  ["/resources/what-is-ai-automation", WhatIsAIAutomation],
  ["/resources/operational-friction-map", OperationalFrictionMap],
  ["/resources/automate-client-intake", AutomateClientIntake],
  ["/resources/automation-roi", AutomationROI],
  ["/resources/professional-services-guide", ProfessionalServicesGuide],
  ["/resources/integration-priority-matrix", IntegrationPriorityMatrix],
  ["/resources/:slug", IndustryAutomationGuide],
  ["/automation-planner", AutomationPlanner],
  ["/case-studies", CaseStudies],
  ["/case-studies/immigration-firm-north-york", ImmigrationFirmNorthYork],
  ["/case-studies/accounting-firm-vaughan", AccountingFirmVaughan],
  ["/case-studies/contractor-mississauga", ContractorMississauga],
  ["/case-studies/physio-clinic-richmond-hill", PhysioClinicRichmondHill],
  ["/case-studies/law-firm-toronto", LawFirmToronto],
  ["/case-studies/real-estate-team-markham", RealEstateTeamMarkham],
  ["/case-studies/dental-office-scarborough", DentalOfficeScarborough],
  ["/case-studies/cleaning-company-etobicoke", CleaningCompanyEtobicoke],
  ["/case-studies/hvac-company-brampton", HVACCompanyBrampton],
  ["/case-studies/property-management-toronto", PropertyManagementToronto],
  ["/case-studies/insurance-brokerage-vaughan", InsuranceBrokerageVaughan],
  ["/case-studies/marketing-agency-liberty-village", MarketingAgencyLibertyVillage],
  ["/about", About],
  ["/contact", Contact],
  ["/privacy-policy", PrivacyPolicy],
  ["/faq", FAQ],
  ["/knowledge", KnowledgeBase],
  ["/knowledge/:slug", KnowledgeArticle],
  ["/playbooks", Playbooks],
  ["/playbooks/:slug", PlaybookDetail],
  ["/glossary", Glossary],
  ["/before-after", BeforeAfter],
  ["/benchmarks", Benchmarks],
  ["/governance", Governance],
  ["/templates", WorkflowTemplates],
  ["/operator-insights", OperatorInsights],
  ["/operator-insights/:slug", OperatorInsightArticle],
  ["/integrations", Integrations],
  ["/integrations/:slug", IntegrationDetail],
  ["/automation-roi-calculator", ROICalculator],
  ["/human-in-the-loop-ai", HumanInTheLoop],
  ["/ai-automation-industries", AiAutomationIndustries],
  ["/ai-automation-vaughan", AiAutomationVaughan],
  ["/ai-adoption-small-business", AiAdoptionSmallBusiness],
  ["/workflow-automation-smb", WorkflowAutomationSMB],
  ["/ai-receptionist", AiReceptionistPage],
  ["/insights/what-to-automate-first", WhatToAutomateFirst],
  ["/insights/automation-readiness", AutomationReadiness],
  ["/insights/build-vs-buy", BuildVsBuy],
  ["/insights/when-ai-is-not-the-answer", WhenAiIsNotTheAnswer],
  ["/insights/automation-vs-delegation", AutomationVsDelegation],
  ["/solopreneurs", Solopreneurs],
  ["/workflows/lead-intake", LeadIntakeWorkflow],
  ["/workflows/appointment-booking", AppointmentBookingWorkflow],
  ["/workflows/client-onboarding", ClientOnboardingWorkflow],
  ["/workflows/document-collection", DocumentCollectionWorkflow],
  ["/locations/:city/:industry", LocationIndustryPage],
  ["/ai-automation/:city", LocalSEOPage],
  ["/ai-automation/:city/:industry", LocalSEOPage],
  ["/404", NotFound],
] as const;

/** Loads the chunk for the page at `pathname` so the first render replaces the pre-rendered HTML without a fallback. */
export function preloadCurrentRoute(pathname: string): Promise<void> {
  return preloadRoute(ROUTE_TABLE, pathname);
}

export default App;
