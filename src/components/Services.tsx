"use client";

import Icon from "./Icon";
import AnimateOnScroll from "./AnimateOnScroll";

interface ServicesProps {
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

export default function Services({ data }: ServicesProps) {
  return (
    <section
      id="services"
      aria-label={data.sectionTitle}
      className="section-padding bg-[var(--bg-secondary)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header without redundant pill */}
        <AnimateOnScroll className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-primary)]">
            {data.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-[var(--text-secondary)]">
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        {/* Services Grid with Structured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((service, i) => (
            <AnimateOnScroll key={i} animation="animate-fade-in-up">
              <div className="card h-full flex flex-col justify-between">
                <div>
                  {/* Clean Icon Container with Unified Emerald Accent */}
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5">
                    <Icon name={service.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2.5 text-[var(--text-primary)]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {service.description}
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
