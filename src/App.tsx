import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "./pages/HomePage";
import DiagnosisPage from "./pages/DiagnosisPage";
import LaborRiskDiagnosisPage from "./pages/diagnosis/LaborRiskDiagnosisPage";
import PayStatementDiagnosisPage from "./pages/diagnosis/PayStatementDiagnosisPage";
import LaborCostDiagnosisPage from "./pages/diagnosis/LaborCostDiagnosisPage";
import BasicLaborRiskDiagnosisPage from "./pages/diagnosis/BasicLaborRiskDiagnosisPage";
import PayrollWorktimeDiagnosisPage from "./pages/diagnosis/PayrollWorktimeDiagnosisPage";
import LaborIncidentUrgentDiagnosisPage from "./pages/diagnosis/LaborIncidentUrgentDiagnosisPage";
import EnterpriseLaborConsultingPage from "./pages/enterprise/EnterpriseLaborConsultingPage";
import EnterprisePayrollOutsourcingPage from "./pages/enterprise/EnterprisePayrollOutsourcingPage";
import EnterpriseLaborDisputePage from "./pages/enterprise/EnterpriseLaborDisputePage";
import EnterpriseEmploymentRulesPage from "./pages/enterprise/EnterpriseEmploymentRulesPage";
import EnterpriseLaborBoardPage from "./pages/enterprise/EnterpriseLaborBoardPage";
import CorporateSupportPage from "./pages/CorporateSupportPage";
import ConsultingPage from "./pages/ConsultingPage";
import CaseResponsePage from "./pages/CaseResponsePage";
import InfoCenterRoutes from "./pages/info-center/InfoCenterRoutes";
import ToolsPage from "./pages/ToolsPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import InquiryPage from "./pages/InquiryPage";
import AboutOfficePage from "./pages/about/AboutOfficePage";
import AboutLawyersPage from "./pages/about/AboutLawyersPage";
import AboutLocationPage from "./pages/about/AboutLocationPage";
import CasesOverviewPage from "./pages/cases/CasesOverviewPage";
import WrongfulDismissalPage from "./pages/cases/WrongfulDismissalPage";
import WageArrearsPage from "./pages/cases/WageArrearsPage";
import WorkplaceHarassmentPage from "./pages/cases/WorkplaceHarassmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-background">
          <ScrollToTop />
          <Header />
          <div className="flex flex-1 flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about/office" element={<AboutOfficePage />} />
              <Route path="/about/lawyers" element={<AboutLawyersPage />} />
              <Route path="/about/location" element={<AboutLocationPage />} />
              <Route path="/diagnosis" element={<DiagnosisPage />} />
              <Route path="/diagnosis/labor-risk" element={<LaborRiskDiagnosisPage />} />
              <Route path="/diagnosis/pay-statement" element={<PayStatementDiagnosisPage />} />
              <Route path="/diagnosis/labor-cost" element={<LaborCostDiagnosisPage />} />
              <Route path="/diagnosis/basic-labor-risk" element={<BasicLaborRiskDiagnosisPage />} />
              <Route path="/diagnosis/payroll-worktime" element={<PayrollWorktimeDiagnosisPage />} />
              <Route path="/diagnosis/labor-incident-urgent" element={<LaborIncidentUrgentDiagnosisPage />} />
              <Route path="/enterprise/labor-consulting" element={<EnterpriseLaborConsultingPage />} />
              <Route path="/enterprise/payroll-outsourcing" element={<EnterprisePayrollOutsourcingPage />} />
              <Route path="/enterprise/labor-dispute" element={<EnterpriseLaborDisputePage />} />
              <Route path="/enterprise/employment-rules" element={<EnterpriseEmploymentRulesPage />} />
              <Route path="/enterprise/labor-board" element={<EnterpriseLaborBoardPage />} />
              <Route path="/corporate" element={<CorporateSupportPage />} />
              <Route path="/cases" element={<CasesOverviewPage />} />
              <Route path="/cases/wrongful-dismissal" element={<WrongfulDismissalPage />} />
              <Route path="/cases/wage-arrears" element={<WageArrearsPage />} />
              <Route path="/cases/workplace-harassment" element={<WorkplaceHarassmentPage />} />
              <Route path="/consulting" element={<ConsultingPage />} />
              <Route path="/case" element={<CaseResponsePage />} />
              <Route path="/info-center/*" element={<InfoCenterRoutes />} />
              <Route path="/membership" element={<Navigate to="/info-center" replace />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/inquiry" element={<InquiryPage />} />
              <Route path="/service/:slug" element={<ServiceDetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
