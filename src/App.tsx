
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Consultation from "./pages/Consultation";
import AIChatPage from "./pages/AIChat";
import Progress from "./pages/Progress";
import NutritionPlan from "./pages/NutritionPlan";
import Recipes from "./pages/Recipes";
import LabAnalysis from "./pages/LabAnalysis";
import PantrySync from "./pages/PantrySync";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/ai-chat" element={<AIChatPage />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/nutrition-plan" element={<NutritionPlan />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/lab-analysis" element={<LabAnalysis />} />
            <Route path="/pantry-sync" element={<PantrySync />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
