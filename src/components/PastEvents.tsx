import pic1 from "@/assets/past-event-pic-1.jpg";
import pic2 from "@/assets/past-event-pic-2.jpg";
import pic3 from "@/assets/past-event-pic-3.jpg";
import pic4 from "@/assets/past-event-pic-4.jpg";
import pic5 from "@/assets/past-event-pic-5.jpg";
import pic6 from "@/assets/past-event-pic-6.jpg";
import pic7 from "@/assets/past-event-pic-7.jpg";
import pic8 from "@/assets/past-event-pic-8.jpg";
import pic9 from "@/assets/past-event-pic-9.jpg";

const pastEventPhotos = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];

const PastEvents = () => {
  const featured = pastEventPhotos[0];
  const side = pastEventPhotos.slice(1, 3);
  const thumbnails = pastEventPhotos.slice(3);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Past Event Photos</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">A curated selection of highlights from previous events.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-start">
          {/* Featured large tile */}
          <figure className="md:col-span-2 relative rounded-xl overflow-hidden bg-card border border-border shadow-lg">
            <img
              src={featured}
              alt="Featured past event"
              loading="lazy"
              className="w-full h-80 md:h-[520px] object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <figcaption className="absolute left-6 bottom-6 text-white">
              <div className="uppercase text-xs text-primary-foreground/90 font-semibold mb-1">Highlights</div>
              <div className="text-2xl md:text-3xl font-bold">Monie Fest — Featured Moments</div>
            </figcaption>
          </figure>

          {/* Stacked side tiles */}
          <div className="space-y-6">
            {side.map((photo, i) => (
              <figure key={i} className="relative rounded-xl overflow-hidden bg-card border border-border shadow-sm">
                <img
                  src={photo}
                  alt={`Past event ${i + 2}`}
                  loading="lazy"
                  className="w-full h-40 object-cover transition-transform duration-400 hover:scale-105"
                />
                <figcaption className="absolute left-4 bottom-3 bg-black/60 text-white text-xs px-3 py-1 rounded-md">Photo {i + 2}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {thumbnails.map((photo, i) => (
              <div key={i} className="rounded-md overflow-hidden bg-card border border-border shadow-sm">
                <img
                  src={photo}
                  alt={`Past event ${i + 4}`}
                  loading="lazy"
                  className="w-full h-28 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
