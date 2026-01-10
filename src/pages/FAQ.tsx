
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroBg from "@/assets/banner_bg.jpeg";
import EventbriteModal from "@/components/EventbriteModal";

const faqs = [
  {
    question: "What is Monie Fest 2026?",
    answer: (
      <>
        <p>
          Monie Fest 2026 is the largest financial festival in Malaysia, designed to help everyday Malaysians
          make better money decisions.
        </p>
        <p>
          The event brings together financial experts, creators, and brands to share practical insights on
          money, investing, and wealth planning.
        </p>
      </>
    ),
  },
  {
    question: "When and where is Monie Fest 2026 held?",
    answer: (
      <>
        <p>Dates: 11 & 12 April 2026 (Saturday & Sunday)</p>
        <p>Venue: MITEC – Malaysia International Trade & Exhibition Centre, Kuala Lumpur</p>
      </>
    ),
  },
  {
    question: "Who should attend Monie Fest 2026?",
    answer: (
      <>
        <p>Monie Fest 2026 is open to:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Working Personnel</li>
          <li>Beginner to Intermediate Investors</li>
          <li>Entrepreneurs &amp; Founders</li>
          <li>High Net Worth Individual</li>
          <li>Family Planning / Estate Planning</li>
          <li>Anyone who wants to improve their financial knowledge</li>
        </ul>
      </>
    ),
  },
  {
    question: "How much are the tickets?",
    answer: (
      <>
        <p><strong>Tickets are FREE for attendees.</strong></p>
        <p className="mt-2">Pre-registration is required, and entry is subject to capacity.</p>
        {/* CTA rendered in component so it can open modal */}
      </>
    ),
  },
  {
    question: "What can I expect at Monie Fest 2026?",
    answer: (
      <>
        <p>Attendees can enjoy:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>More than 100 speakers and financial experts</li>
          <li>Keynote talks &amp; panel discussions</li>
          <li>Practical personal finance &amp; investment sessions</li>
          <li>Live podcast recordings</li>
          <li>Expo booths from financial institutions &amp; brands</li>
          <li>Interactive activities &amp; networking</li>
          <li><strong>Lucky draw prizes worth over RM100,000</strong></li>
        </ul>
      </>
    ),
  },
  {
    question: "Do I need to attend both days?",
    answer:
      "No. You may attend either day or both days, depending on your availability. Each day will feature different sessions and activities.",
  },
  {
    question: "Is Monie Fest 2026 giving investment advice?",
    answer:
      "No. All sessions are educational in nature and do not constitute personalised investment advice.",
  },
  {
    question: "How do I register and stay updated?",
    answer: null,
  },
  {
    question: "Who is organising Monie Fest 2026?",
    answer:
      "Monie Fest 2026 is co-organised by Foodie Media Berhad & Spire Digital Sdn Bhd.",
  },
];

const FAQPage = () => {
  const [ebOpen, setEbOpen] = useState(false);
  const popupRef = useRef<Window | null>(null);

  return (
    <div className="min-h-screen bg-background">
      

      {/* Hero */}
      <section className="relative min-h-[44vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBg})` }}>
          <div className="absolute inset-0 hero-gradient opacity-60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold text-white text-center tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-xl">FAQ</h1>
          <p className="mt-3 text-sm md:text-lg text-primary-foreground/90 text-center max-w-3xl mx-auto">
            Answers to common questions about Monie Fest — tickets, venue, sessions and more.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 items-start">
            {/* Left column - heading and intro */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Popular Questions</h2>
              <p className="text-lg text-muted-foreground">
                Discover the essential information you need to know about Monie Fest.
              </p>

              <p className="text-sm text-muted-foreground">
                We’re thrilled to welcome you to Monie Fest 2026. Below are the most common
                questions attendees ask — if you need further help, contact our support team.
              </p>
            </div>

            {/* Right column - accordion */}
            <div className="w-full">
              <Accordion type="single" collapsible className="space-y-4 w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="bg-card rounded-xl p-5 shadow-sm">
                    <AccordionTrigger className="text-navy-deep font-semibold text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white mt-3">
                      {faq.question === "How do I register and stay updated?" ? (
                        <>
                          <p>You can:</p>
                          <ul className="list-disc pl-5 mt-2">
                            <li>
                              <button onClick={() => setEbOpen(true)} className="text-primary font-semibold underline inline">Register</button>
                              {" "}via the official Monie Fest website
                            </li>
                            <li>Follow Monie Fest on social media</li>
                            <li>Subscribe to the Monie Fest newsletter</li>
                          </ul>
                        </>
                      ) : (
                        <>
                          {faq.answer}
                          {faq.question === "How much are the tickets?" && (
                            <div className="mt-3">
                              <button onClick={() => setEbOpen(true)} className="text-primary font-semibold underline">Get your ticket now!</button>
                            </div>
                          )}
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </main>

      <EventbriteModal open={ebOpen} onClose={() => setEbOpen(false)} eventId="1978806719165" popupRef={popupRef} />

      <Footer />
    </div>
  );
};

export default FAQPage;
