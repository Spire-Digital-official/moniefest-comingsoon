import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowUpRight, Users, Calendar } from "lucide-react";
import heroBg from "@/assets/banner_bg.jpeg";
import monieHeader from "@/assets/monieHeader.png";

type HeroProps = {
  onOpenEventbrite?: () => void;
};

const Hero = ({ onOpenEventbrite }: HeroProps) => {
  return (
    <>
      <section className="relative hero-section flex items-start justify-start overflow-hidden pt-12 sm:pt-16 md:pt-20 min-h-[80vh] md:min-h-[44vh]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-60" />
      </div>

      {/* Content (follow Programme styling) */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-none md:max-w-7xl animate-fade-in mt-0 md:mt-6 lg:mt-10 text-left">
          <div className="block w-full pr-0 sm:pr-8 md:pr-10 pl-0">
            <div className="flex justify-start mb-4">
              <img
                src={monieHeader}
                alt="Monie Fest 2026"
                className="logo-img block max-w-full h-auto w-80 sm:w-96 md:w-[460px] lg:w-[800px] xl:w-[580px]"
              />
            </div>

            <h2 className="text-xl md:text-2xl font-semibold mb-3 leading-tight text-navy-deep">
              THE LARGEST FINANCIAL FESTIVAL IN MALAYSIA
            </h2>

            <div className="flex flex-col gap-2 items-start justify-start mb-4 hero-detail text-base md:text-lg">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-primary w-5 h-5 md:w-6 md:h-6 flex-shrink-0" aria-hidden />
                  <span className="text-navy-deep text-lg md:text-2xl">11 &amp; 12 April 2026</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="text-primary w-5 h-5 md:w-6 md:h-6 flex-shrink-0" aria-hidden />
                  <span className="text-navy-deep text-lg md:text-2xl">10AM - 9PM</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-primary w-5 h-5 md:w-6 md:h-6 flex-shrink-0" aria-hidden />
                  <span className="text-navy-deep text-lg md:text-2xl">Malaysia International Trade &amp; Exhibition Centre (MITEC), Hall 2, North Entrance</span>
                </div>
              </div>
            </div>

            {/* CTA Button kept as-is */}
            <div className="flex justify-start w-full">
              <button onClick={() => onOpenEventbrite?.()} aria-label="Get ticket" className="cta-pill relative inline-flex items-center gap-4 w-[86%] max-w-[240px] sm:w-auto justify-center motion-safe:animate-float">
                <span className="cta-pill-label text-black font-bold" style={{ fontWeight: 700 }}>GET TICKET</span>
                <span className="cta-pill-icon brand-bg p-3 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="text-black" style={{ color: '#000' }} />
                </span>
              </button>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
