import React from "react";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhatIsMonie from "@/components/WhatIsMonie";
import About from "@/components/About";
// SpeakersQuotes removed per request
import PastEvents from "@/components/PastEvents";
import Exhibitors from "@/components/Exhibitors";
// PremierEvent and Pricing sections removed from homepage
import Footer from "@/components/Footer";

type IndexProps = {
  onOpenEventbrite?: () => void;
};

const Index = ({ onOpenEventbrite }: IndexProps) => {

  return (
    <main className="min-h-screen">
      <Hero onOpenEventbrite={() => onOpenEventbrite?.()} />
      <Stats />
      <WhatIsMonie />
      <About />
      <PastEvents />
      <Exhibitors />
      {/* PremierEvent, Pricing, and Partners removed */}
      <Footer />
    </main>
  );
};

export default Index;
