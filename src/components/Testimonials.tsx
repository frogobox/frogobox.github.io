import Icon from "./Icon";
import AnimateOnScroll from "./AnimateOnScroll";

interface TestimonialsProps {
  data: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: {
      name: string;
      role: string;
      message: string;
      avatar: string;
    }[];
  };
}

export default function Testimonials({ data }: TestimonialsProps) {
  const avatarColors = [
    "from-primary-500 to-primary-700",
    "from-accent-500 to-accent-600",
    "from-purple-500 to-purple-700",
    "from-orange-500 to-orange-700",
  ];

  return (
    <section id="testimonials" className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-accent-500/10 text-accent-600 dark:text-accent-400 mb-4">
            Client Love
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            {data.sectionTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((item, i) => (
            <AnimateOnScroll key={i} animation="animate-fade-in-up" delay={i * 100}>
              <div className="card relative h-full">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Icon name="quote" className="w-10 h-10" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Message */}
                <p className="text-base leading-relaxed mb-6 italic" style={{ color: "var(--text-secondary)" }}>
                  &ldquo;{item.message}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}>
                    {item.avatar}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {item.name}
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
