"use client";

import Icon from "./Icon";
import AnimateOnScroll from "./AnimateOnScroll";

interface WhyUsProps {
  data: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
}

export default function WhyUs({ data }: WhyUsProps) {
  return (
    <section
      id="why-us"
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

        {/* Structured 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((item, i) => (
            <AnimateOnScroll key={i} animation="animate-fade-in-up">
              <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-emerald-500/40 transition-colors duration-150 flex gap-4 items-start">
                {/* Unified Studio Accent Icon */}
                <div className="shrink-0 w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Icon name={item.icon} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1.5 text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
