import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import PlanStandard from "./pages/PlanStandard";
import PlanUnlimited from "./pages/PlanUnlimited";
import PlanPremium from "./pages/PlanPremium";
import Reserve from "./pages/Reserve";
import MyReservations from "./pages/MyReservations";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans/standard" element={<PlanStandard />} />
          <Route path="/plans/unlimited" element={<PlanUnlimited />} />
          <Route path="/plans/premium" element={<PlanPremium />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
