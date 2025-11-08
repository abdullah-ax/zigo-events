
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EventProvider } from "./contexts/EventContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Vendors from "./pages/Vendors";
import CreateEvent from "./pages/CreateEvent";
import SelectServices from "./pages/SelectServices";
import BudgetOverview from "./pages/BudgetOverview";
import VendorDetail from "./pages/VendorDetail";
import ChatPage from "./pages/ChatPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import EventManagement from "./pages/EventManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EventProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/budget" element={<BudgetOverview />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/event/:eventId" element={<BudgetOverview />} />
            <Route path="/event/:eventId/vendors" element={<SelectServices />} />
            <Route path="/event/:eventId/chat" element={<ChatPage />} />
            <Route path="/event/:eventId/manage" element={<EventManagement />} />
            <Route path="/vendor/:vendorId" element={<VendorDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </EventProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
