import { Quote, Star, Instagram } from "lucide-react";

const testimonials = [
  {
    author: "@speaker1",
    text: "Monie Fest was informative and practical. I took away actionable tips I can use right away.",
  },
  {
    author: "@speaker2",
    text: "Great speakers and well-organised sessions. I enjoyed the panels and networking opportunities.",
  },
  {
    author: "@speaker3",
    text: "A useful event for both beginners and experienced investors — balanced and insightful.",
  },
];

const SpeakersQuotes = () => {
  const initials = (name: string) =>
    name
      .replace(/^@/, "")
      .split(/[^A-Za-z0-9]+/)
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
          What Speakers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              role="article"
              aria-label={`Quote by ${testimonial.author}`}
              className="glass-card rounded-xl p-6 animate-slide-up card-accent transition-transform transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <Quote className="absolute right-6 top-6 text-primary/10" size={64} />

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                  {initials(testimonial.author)}
                </div>
                <div>
                  <p className="font-semibold text-navy-deep">{testimonial.author.replace(/^@/, "")}</p>
                  <p className="text-sm text-foreground">Speaker</p>
                </div>
              </div>

              <p className="testimonial-quote mb-6 italic text-navy-deep/85">“{testimonial.text}”</p>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground" aria-hidden>
                  <Star className="text-amber-400" size={16} />
                  <Star className="text-amber-400" size={16} />
                  <Star className="text-amber-400" size={16} />
                  <Star className="text-amber-400" size={16} />
                  <Star className="text-amber-400/70" size={16} />
                </div>

                <a
                  href="#"
                  aria-label={`Open ${testimonial.author} profile`}
                  className="text-primary inline-flex items-center gap-2 hover:underline"
                >
                  <Instagram size={16} />
                  {testimonial.author}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersQuotes;
