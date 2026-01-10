import React, { useState } from "react";

import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";
import heroBg from "@/assets/banner_bg.jpeg";

const BannerUploader: React.FC = () => {
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null, null]);

  const handleFileChange = (index: number, file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviews((p) => {
      const next = [...p];
      next[index] = url;
      return next;
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Event Banners</h2>
      <p className="text-sm text-muted-foreground mb-6">Recommended size: 1920 x 1080 (w x h).</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {previews.map((src, idx) => (
          <label key={idx} className="block bg-card rounded-md overflow-hidden border border-border p-2 cursor-pointer">
            <div className="w-full aspect-[16/9] bg-zinc-800 flex items-center justify-center overflow-hidden">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center px-3 py-6 text-sm text-muted-foreground">upload<br/>1920 x 1080</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleFileChange(idx, e.target.files?.[0])}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

const HighlightsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      

      <section className="relative min-h-[44vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBg})` }}>
          <div className="absolute inset-0 hero-gradient opacity-60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white text-center tracking-tight max-w-3xl mx-auto leading-tight drop-shadow-xl">
            Highlights
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-primary-foreground/90 text-center max-w-3xl mx-auto px-4">
            This section features the Lucky Draw and special programmes.
          </p>
        </div>
      </section>

      <main className="pt-12 pb-20">
        <ComingSoon title="Highlights — Coming Soon" description="Highlights content (Lucky Draw, Special Programmes) is being prepared. We'll publish updates here soon." />
      </main>

      <Footer />
    </div>
  );
};

export default HighlightsPage;
