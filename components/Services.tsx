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
    <section id="services" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-400 mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            {data.sectionTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((service, i) => (
            <AnimateOnScroll key={i} animation="animate-fade-in-up" delay={i * 100}>
              <div className="card group h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon name={service.icon} className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                  {service.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {service.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
