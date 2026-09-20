"use client";

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
  return (
    <section
      id="testimonials"
      aria-label={data.sectionTitle}
      className="section-padding bg-[var(--bg-primary)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-primary)]">
            {data.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-[var(--text-secondary)]">
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((item, i) => (
            <AnimateOnScroll key={i} animation="animate-fade-in-up">
              <div className="card h-full flex flex-col justify-between">
                {/* Message */}
                <p className="text-sm sm:text-base leading-relaxed mb-6 text-[var(--text-primary)]">
                  &ldquo;{item.message}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[var(--border-color)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">
                      {item.name}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
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
