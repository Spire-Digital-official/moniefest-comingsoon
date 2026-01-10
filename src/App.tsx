import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Programme from "./pages/Programme";
import Speakers from "./pages/Speakers";
import Highlights from "./pages/Highlights";
import FAQPage from "./pages/FAQ";
import ScrollToTop from "@/components/scroll-to-top";
import Header from "@/components/Header";
import EventbriteModal from "@/components/EventbriteModal";

const queryClient = new QueryClient();

const App = () => {
  const [isEventbriteOpen, setIsEventbriteOpen] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          {/* Site-wide header with modal opener */}
          <Header onOpenEventbrite={() => setIsEventbriteOpen(true)} />

          <Routes>
            <Route path="/" element={<Index onOpenEventbrite={() => setIsEventbriteOpen(true)} />} />
            <Route path="/programme" element={<Programme />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/faq" element={<FAQPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <EventbriteModal
            open={isEventbriteOpen}
            onClose={() => setIsEventbriteOpen(false)}
            eventId="1978806719165"
            height={650}
          />
          {/* Floating register button (visible on all viewports) */}
          <button
            aria-label="Get Ticket"
            onClick={() => setIsEventbriteOpen(true)}
            className="fixed z-50 right-4 bottom-4 md:right-8 md:bottom-8 inline-flex items-center gap-3 px-4 py-3 rounded-full bg-primary text-black font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform-gpu transition-transform duration-200 hover:-translate-y-1 animate-float md:hidden"
          >
            <span className="inline">Get Ticket</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
