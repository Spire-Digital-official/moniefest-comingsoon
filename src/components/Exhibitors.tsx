import React from "react";
import foodieLogo from "@/assets/Foodie-Red.png";
import spireLogo from "@/assets/Spire-Black.png";

const placeholderImg = (label = "Logo") => `https://via.placeholder.com/280x140?text=${encodeURIComponent(label)}`;

const coOrganizers = [foodieLogo, spireLogo];
const platinumSponsors = Array.from({ length: 4 }).map((_, i) => placeholderImg(`Platinum+${i+1}`));
const goldSponsors = Array.from({ length: 4 }).map((_, i) => placeholderImg(`Gold+${i+1}`));
const supportingPartners = Array.from({ length: 4 }).map((_, i) => placeholderImg(`Supporting+${i+1}`));
const silverSponsors = Array.from({ length: 4 }).map((_, i) => placeholderImg(`Silver+${i+1}`));
const giftPartners = Array.from({ length: 4 }).map((_, i) => placeholderImg(`Gift+${i+1}`));

const baseUrl = "";

interface LogoGridProps {
  title: string;
  logos: string[];
  fullUrls?: boolean;
  hideCaption?: boolean;
  logoOnly?: boolean;
}

const formatAlt = (nameOrFilename: string) => {
  if (!nameOrFilename) return "logo";
  // Remove query params, directories, and extensions, then normalize separators
  const base = nameOrFilename.split("?")[0].split("/").pop()?.split("\\").pop() || nameOrFilename;
  const cleaned = base
    .replace(/^img[_-]?/i, "")
    .replace(/\.(jpg|jpeg|png|svg)$/i, "")
    .replace(/[_-]+/g, " ")
    .trim();
  return cleaned
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
};

const LogoGrid = ({ title, logos, fullUrls, hideCaption, logoOnly }: LogoGridProps) => (
  <div className="mb-16 w-full">
    <h3 className="text-2xl font-bold text-foreground text-center mb-8">{title}</h3>
    <div className="max-w-6xl mx-auto">
      {logoOnly ? (
        <div className="grid grid-cols-2 gap-4 px-4 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-3 sm:p-6 flex items-center justify-center w-full sm:w-56 h-28 sm:h-44 shadow-sm"
            >
              <img
                src={fullUrls ? logo : `${baseUrl}${logo}`}
                alt={formatAlt(fullUrls ? logo : logo)}
                title={formatAlt(fullUrls ? logo : logo)}
                className="max-w-[90%] max-h-[80%] object-contain"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center justify-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center w-full sm:w-64 h-36 sm:h-44 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1"
            >
              <img
                src={fullUrls ? logo : `${baseUrl}${logo}`}
                alt={formatAlt(fullUrls ? logo : logo)}
                title={formatAlt(fullUrls ? logo : logo)}
                className="max-w-[85%] max-h-[60%] object-contain"
              />
              {!hideCaption && (
                <div className="mt-3 text-sm text-muted-foreground text-center">{formatAlt(fullUrls ? logo : logo)}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Exhibitors = () => {
  // Toggle to hide all sponsor categories except Co-organisers for now
  const showOnlyCoOrganisers = true;
  return (
    <section className="py-20 bg-background" id="exhibitors" aria-labelledby="exhibitors-title">
      <div className="section-container flex flex-col items-center">
        <div className="mb-12">
          <h2 id="exhibitors-title" className="text-3xl font-bold text-primary text-center mb-6">Supporting Partners & Sponsors</h2>
          <p className="text-center text-muted-foreground">We gratefully acknowledge the organisations supporting Monie Fest — supporting partners and sponsors are featured below.</p>
        </div>

        <LogoGrid title="Co-organisers" logos={coOrganizers} fullUrls hideCaption logoOnly />
        {!showOnlyCoOrganisers && (
          <>
            <LogoGrid title="Supporting Partners" logos={supportingPartners} fullUrls />
            <LogoGrid title="Platinum Sponsors" logos={platinumSponsors} fullUrls />
            <LogoGrid title="Gold Sponsors" logos={goldSponsors} fullUrls />
            <LogoGrid title="Silver Sponsors" logos={silverSponsors} fullUrls />
            <LogoGrid title="Gift Partners" logos={giftPartners} fullUrls />
          </>
        )}
      </div>
    </section>
  );
};

export default Exhibitors;
