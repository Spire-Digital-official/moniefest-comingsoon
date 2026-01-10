import { useState } from "react";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";
import heroBg from "@/assets/banner_bg.jpeg";

type Speaker = {
  name: string;
  title: string;
  company: string;
  photo?: string;
};

type Session = {
  time: string;
  title?: string;
  description?: string;
  speakers?: Speaker[];
  moderator?: Speaker;
  bullets?: string[];
  isPanel?: boolean;
  panelNumber?: number;
  panelTitle?: string;
  isSpecial?: boolean;
  specialImage?: string;
};

const mainStageSchedule: Session[] = [
  { time: "9.00am - 9.30am", title: "Registration & Networking", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { time: "9.30am - 10.00am", title: "Opening Remarks", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante." },
  { time: "10.00am - 11.00am", isPanel: true, panelNumber: 1, panelTitle: "Panel: Industry Insights (Placeholder)", bullets: ["Lorem ipsum dolor sit amet, consectetur.", "Sed do eiusmod tempor incididunt ut labore."], speakers: [{ name: "TBD Speaker", title: "Panelist", company: "Organization" }, { name: "TBD Speaker", title: "Panelist", company: "Organization" }], moderator: { name: "TBD Moderator", title: "Moderator", company: "Organization" } },
  { time: "11.15am - 12.00pm", title: "Keynote (Placeholder)", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore." },
  { time: "12.00pm - 1.00pm", title: "Lunch Break & Networking", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { time: "1.00pm - 2.00pm", isPanel: true, panelNumber: 2, panelTitle: "Panel: Strategies & Trends (Placeholder)", bullets: ["Ut enim ad minim veniam.", "Quis nostrud exercitation ullamco laboris nisi ut aliquip."], speakers: [{ name: "TBD Speaker", title: "Panelist", company: "Organization" }], moderator: { name: "TBD Moderator", title: "Moderator", company: "Organization" } },
  { time: "2.15pm - 3.00pm", title: "Afternoon Session (Placeholder)", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { time: "3.15pm - 4.00pm", title: "Closing Remarks (Placeholder)", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const engagementStageSchedule: Session[] = [
  { time: "9.30am - 10.00am", title: "Workshop: Getting Started (Placeholder)", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { time: "10.15am - 10.45am", title: "Session: Tools & Tech (Placeholder)", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { time: "11.00am - 11.30am", title: "Interactive Q&A (Placeholder)", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
  { time: "2.00pm - 2.30pm", title: "Case Study (Placeholder)", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore." },
];

// Day 2 placeholder schedules (different placeholder content)
const mainStageScheduleDay2: Session[] = [
  { time: "9.00am - 9.30am", title: "Welcome Back & Networking", description: "Day 2 opening and registration. Placeholder copy for Day 2." },
  { time: "9.30am - 10.15am", title: "Keynote: Market Outlook (Day 2)", description: "Placeholder keynote for Day 2 focusing on market trends." },
  { time: "10.30am - 11.30am", isPanel: true, panelNumber: 3, panelTitle: "Panel: Investment Opportunities (Day 2)", bullets: ["Placeholder insight A.", "Placeholder insight B."], speakers: [{ name: "TBD Speaker", title: "Panelist", company: "Organization" }], moderator: { name: "TBD Moderator", title: "Moderator", company: "Organization" } },
  { time: "11.45am - 12.30pm", title: "Case Study: Successful Projects (Day 2)", description: "A placeholder case study session for Day 2." },
  { time: "12.30pm - 1.30pm", title: "Lunch Break & Networking", description: "Networking time." },
  { time: "1.30pm - 2.30pm", title: "Afternoon Session: Growth Strategies (Day 2)", description: "Placeholder session for growth strategies." },
  { time: "2.45pm - 3.30pm", title: "Closing Panel (Day 2)", description: "Wrap up for Day 2." },
];

const engagementStageScheduleDay2: Session[] = [
  { time: "9.30am - 10.15am", title: "Workshop: Creator Tools (Day 2)", description: "Hands-on workshop placeholder for Day 2." },
  { time: "10.30am - 11.00am", title: "Session: Monetisation (Day 2)", description: "Placeholder content about monetisation for creators." },
  { time: "11.15am - 11.45am", title: "Interactive: Creator Q&A (Day 2)", description: "Q&A placeholder." },
  { time: "2.00pm - 2.45pm", title: "Case Study: Creator Growth (Day 2)", description: "Placeholder case study for creators." },
];

const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
  const displayName = speaker?.name || "TBD Speaker";
  const initials = displayName.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-navy-light to-navy-deep flex items-center justify-center text-primary-foreground font-bold text-lg">
        {speaker.photo ? (
          <img src={speaker.photo} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">{initials}</div>
        )}
      </div>
      <div>
        <p className="font-semibold text-navy-deep">{displayName}</p>
        <p className="text-sm text-primary italic">{speaker.title}</p>
        <p className="text-sm text-foreground">{speaker.company}</p>
      </div>
    </div>
  );
};
const SessionRow = ({ session, onOpen }: { session: Session; onOpen: (s: Session) => void }) => (
  <div
    className="border-b border-border last:border-b-0 py-4 cursor-pointer"
    role="button"
    tabIndex={0}
    onClick={() => onOpen(session)}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(session); }}
  >
    <div className="flex gap-6 items-start">
      <div className="w-28 flex-shrink-0">
        <div className="bg-primary/10 text-primary px-3 py-2 rounded-md text-sm font-medium text-center">
          {session.time}
        </div>
      </div>

      <div className="flex-1 pr-4">
        {session.isPanel ? (
          <>
            <p className="text-muted-foreground font-medium mb-1 text-center">Panel Discussion #{session.panelNumber}</p>
            <h3 className="font-bold text-navy-deep mb-2 text-center text-lg md:text-xl">{session.panelTitle}</h3>
          </>
        ) : session.title && (
          <h3 className={`font-bold ${session.isSpecial ? 'text-2xl text-primary text-center' : 'text-navy-deep text-center text-lg md:text-xl'}`}>
            {session.title}
          </h3>
        )}

        {session.description && (
          <p className="text-muted-foreground mt-3 text-center md:text-left">{session.description}</p>
        )}

        {session.bullets && (
          <ul className="list-disc list-inside mt-3 space-y-1 text-muted-foreground text-sm">
            {session.bullets.map((bullet, i) => (
              <li key={i} className="text-muted-foreground">{bullet}</li>
            ))}
          </ul>
        )}

        {session.speakers && session.speakers.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {session.speakers.map((speaker, i) => (
              <div key={i} className="p-3 bg-primary/5 rounded-md">
                <SpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
        )}

        {session.moderator && (
          <div className="mt-4">
            <p className="font-semibold text-navy-deep mb-2">Moderated by</p>
            <SpeakerCard speaker={session.moderator} />
          </div>
        )}
      </div>
    </div>
  </div>
);

const Programme = () => {
  const [activeTab, setActiveTab] = useState<"main" | "engagement">("main");
  const [day, setDay] = useState<1 | 2>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSession, setModalSession] = useState<Session | null>(null);

  const placeholderImage = (name = "Speaker") => `https://via.placeholder.com/160?text=${encodeURIComponent(name)}`;

  const openModal = (s: Session) => {
    // If speakers exist and no photo, assign a placeholder URL dynamically (non-mutating)
    if (s.speakers && s.speakers.length > 0) {
      s.speakers = s.speakers.map((sp) => ({ ...sp, photo: sp.photo || placeholderImage(sp.name) }));
    }
    setModalSession(s);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalSession(null);
  };

  return (
    <div className="min-h-screen bg-background">
      

      <section className="relative min-h-[44vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
            <div className="absolute inset-0 hero-gradient opacity-60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold text-white text-center tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-xl">
              Programme
            </h1>
              <p className="mt-3 text-sm md:text-lg text-primary-foreground/90 text-center max-w-3xl mx-auto">
              Join industry leaders and investors for a full day of insights, panels and networking focused on Monie Fest and real estate investing.
            </p>
            
        </div>
      </section>

      <main className="pt-8 pb-16">
        <ComingSoon title="Programme — Coming Soon" description="Programme details are being finalised. We'll publish the full schedule and session details soon." />
      </main>

      <Footer />
    </div>
  );
};

export default Programme;
