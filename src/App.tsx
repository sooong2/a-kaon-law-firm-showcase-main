import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "./pages/HomePage";
import DiagnosisPage from "./pages/DiagnosisPage";
import CorporateSupportPage from "./pages/CorporateSupportPage";
import ConsultingPage from "./pages/ConsultingPage";
import CaseResponsePage from "./pages/CaseResponsePage";
import MembershipPage from "./pages/MembershipPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route path="/corporate" element={<CorporateSupportPage />} />
          <Route path="/consulting" element={<ConsultingPage />} />
          <Route path="/case" element={<CaseResponsePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
