import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Speaker = { name: string; photo?: string };
type Slide = {
  id: string;
  time: string;
  topic: string;
  speakers: Speaker[];
};

const sampleSlides: Slide[] = [
  {
    id: 's1',
    time: '11:00 - 12:00',
    topic: 'Demystifying Personal Investing',
    speakers: [
      { name: 'Alice Tan' },
      { name: 'Beh Zaidi' },
    ],
  },
  {
    id: 's2',
    time: '13:00 - 14:00',
    topic: 'Banking & Fintech Innovations',
    speakers: [
      { name: 'Chong Wei' },
      { name: 'Nur Aina' },
    ],
  },
  {
    id: 's3',
    time: '15:00 - 16:00',
    topic: 'Lifestyle & Money: Making it Work',
    speakers: [
      { name: 'Daniel Lee' },
      { name: 'Farah Azmi' },
    ],
  },
];

export default function ProgrammePreview({ slides = sampleSlides, autoplayOnce, onFinished, durationMs = 5000 }: { slides?: Slide[]; autoplayOnce?: boolean; onFinished?: () => void; durationMs?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastChangeRef = useRef<number>(Date.now());

  const length = slides.length;

  useEffect(() => {
    const slideDur = durationMs;

    if (paused) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current as any);
        timeoutRef.current = null;
      }
      return;
    }

    // Clear any existing timeout and set a new one so each slide
    // is shown for `slideDur` from the moment it becomes active.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current as any);
    }

    // mark the moment this slide became active
    lastChangeRef.current = Date.now();

    const schedule = (delay: number) => {
      timeoutRef.current = setTimeout(() => {
        const elapsed = Date.now() - lastChangeRef.current;
        if (elapsed < slideDur - 50) {
          // if somehow fired early, schedule remaining time
          schedule(slideDur - elapsed);
          return;
        }

        setIndex((i) => {
          const next = i + 1;
          if (autoplayOnce) {
            if (next >= length) {
              onFinished && onFinished();
              return i; // stay on last slide
            }
            return next;
          }
          return next % length;
        });
      }, delay);
    };

    schedule(slideDur);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current as any);
        timeoutRef.current = null;
      }
    };
  }, [index, length, autoplayOnce, onFinished, paused]);

  const current = slides[index];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className="relative bg-card border border-border rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition cursor-pointer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="button"
        tabIndex={0}
      >
        <Link to="/programme" className="block">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-shrink-0 bg-gradient-to-br from-primary to-green-400 text-black font-semibold px-3 py-1 rounded-md text-sm md:px-4 md:py-2 md:rounded-lg md:text-base">
              {current.time}
            </div>

            <div className="flex-1">
              <div className="text-white font-semibold text-xl md:text-2xl">{current.topic}</div>
              <div className="mt-3 flex items-center gap-6 flex-wrap">
                {current.speakers.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white text-sm md:text-base font-medium">
                      {s.name.split(' ').map((n) => n[0]).join('').slice(0,2)}
                    </div>
                    <div className="text-sm md:text-base text-white">{s.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ml-auto" />
          </div>
        </Link>

        <div className="absolute right-6 bottom-6 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-white/30'}`}
                onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
