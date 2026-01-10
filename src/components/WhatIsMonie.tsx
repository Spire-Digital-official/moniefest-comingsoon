import heroBg from "@/assets/banner_bg.jpeg";

const Icon = ({ name }: { name: string }) => {
  if (name === 'engage') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
};

export default function WhatIsMonie() {
  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto">
        <article tabIndex={0} role="button" aria-label="ENGAGE, LEARN, AND CONNECT!" className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-card border border-border focus:outline-none">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(${heroBg})` }} />
          <div className="relative p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary-foreground">
                <Icon name="engage" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">WHAT IS MONIE FEST?</h3>
            </div>

            <div className="mt-4 text-sm md:text-base text-white/90 leading-relaxed">
              <p className="mb-0">MONIE Fest is a large-scale financial lifestyle festival focused on money, investing, banking, and everyday financial decisions. Co-created by Foodie Media and Spire Digital, the event brings leading financial institutions and lifestyle brands together to engage 25,000–30,000 retail attendees in one location.</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
