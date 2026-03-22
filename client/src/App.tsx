import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import LeadResponseAutomation from "./pages/services/LeadResponseAutomation";
import ClientIntakeAutomation from "./pages/services/ClientIntakeAutomation";
import AIReceptionist from "./pages/services/AIReceptionist";
import DocumentCollectionAutomation from "./pages/services/DocumentCollectionAutomation";
import AppointmentAutomation from "./pages/services/AppointmentAutomation";
import InvoiceAutomation from "./pages/services/InvoiceAutomation";
import WorkflowAutomation from "./pages/services/WorkflowAutomation";
import CRMAutomation from "./pages/services/CRMAutomation";
import OperationsReportingAutomation from "./pages/services/OperationsReportingAutomation";
import AfterHoursAutomation from "./pages/services/AfterHoursAutomation";
import AIAgents from "./pages/services/AIAgents";
import CustomAISystems from "./pages/services/CustomAISystems";
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";
import ImmigrationConsultants from "./pages/industries/ImmigrationConsultants";
import AccountingFirms from "./pages/industries/AccountingFirms";
import LawFirms from "./pages/industries/LawFirms";
import Contractors from "./pages/industries/Contractors";
import PhysiotherapyClinics from "./pages/industries/PhysiotherapyClinics";
import RealEstateTeams from "./pages/industries/RealEstateTeams";
import ServiceBusinesses from "./pages/industries/ServiceBusinesses";
import DentalOffices from "./pages/industries/DentalOffices";
import InsuranceBrokers from "./pages/industries/InsuranceBrokers";
import MortgageBrokers from "./pages/industries/MortgageBrokers";
import FinancialAdvisors from "./pages/industries/FinancialAdvisors";
import MarketingAgencies from "./pages/industries/MarketingAgencies";
import CleaningCompanies from "./pages/industries/CleaningCompanies";
import PropertyManagement from "./pages/industries/PropertyManagement";
import HomeServices from "./pages/industries/HomeServices";
import MedicalClinics from "./pages/industries/MedicalClinics";
import VeterinaryClinics from "./pages/industries/VeterinaryClinics";
import TutoringEducation from "./pages/industries/TutoringEducation";
import AutoRepair from "./pages/industries/AutoRepair";
import Landscaping from "./pages/industries/Landscaping";
import ImmigrationFirmNorthYork from "./pages/case-studies/ImmigrationFirmNorthYork";
import AccountingFirmVaughan from "./pages/case-studies/AccountingFirmVaughan";
import ContractorMississauga from "./pages/case-studies/ContractorMississauga";
import PhysioClinicRichmondHill from "./pages/case-studies/PhysioClinicRichmondHill";
import LawFirmToronto from "./pages/case-studies/LawFirmToronto";
import RealEstateTeamMarkham from "./pages/case-studies/RealEstateTeamMarkham";
import DentalOfficeScarborough from "./pages/case-studies/DentalOfficeScarborough";
import CleaningCompanyEtobicoke from "./pages/case-studies/CleaningCompanyEtobicoke";
import HVACCompanyBrampton from "./pages/case-studies/HVACCompanyBrampton";
import PropertyManagementToronto from "./pages/case-studies/PropertyManagementToronto";
import InsuranceBrokerageVaughan from "./pages/case-studies/InsuranceBrokerageVaughan";
import MarketingAgencyLibertyVillage from "./pages/case-studies/MarketingAgencyLibertyVillage";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
import Resources from "./pages/Resources";
import AutomationPlanner from "./pages/AutomationPlanner";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import Contact from "./pages/Contact";

// SEO/AEO Expansion Pages
import KnowledgeBase from "./pages/KnowledgeBase";
import KnowledgeArticle from "./pages/KnowledgeArticle";
import Playbooks from "./pages/Playbooks";
import PlaybookDetail from "./pages/PlaybookDetail";
import Glossary from "./pages/Glossary";
import BeforeAfter from "./pages/BeforeAfter";
import Benchmarks from "./pages/Benchmarks";
import Governance from "./pages/Governance";
import WorkflowTemplates from "./pages/WorkflowTemplates";
import OperatorInsights from "./pages/OperatorInsights";
import OperatorInsightArticle from "./pages/OperatorInsightArticle";
import Integrations from "./pages/Integrations";
import IntegrationDetail from "./pages/IntegrationDetail";
import ROICalculator from "./pages/ROICalculator";
import LocalSEOPage from "./pages/LocalSEOPage";
import FAQ from "./pages/FAQ";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        {/* Core Pages */}
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

        {/* Local SEO Matrix */}
        <Route path="/ai-automation/:city" component={LocalSEOPage} />
        <Route path="/ai-automation/:city/:industry" component={LocalSEOPage} />

        {/* Fallback */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
