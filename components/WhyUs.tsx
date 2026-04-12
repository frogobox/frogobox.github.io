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
    <section id="why-us" className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-accent-500/10 text-accent-600 dark:text-accent-400 mb-4">
            Why Frogobox
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            {data.sectionTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.items.map((item, i) => (
            <AnimateOnScroll
              key={i}
              animation={i % 2 === 0 ? "animate-slide-left" : "animate-slide-right"}
              delay={i * 150}
            >
              <div className="flex gap-5 p-6 rounded-2xl transition-all duration-300 hover:bg-[var(--bg-secondary)] group">
                {/* Icon */}
                <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${
                      i === 0 ? "#3385ff20" :
                      i === 1 ? "#14b8a620" :
                      i === 2 ? "#f5920620" :
                      "#8b5cf620"
                    }, transparent)`,
                    border: `1px solid ${
                      i === 0 ? "#3385ff30" :
                      i === 1 ? "#14b8a630" :
                      i === 2 ? "#f5920630" :
                      "#8b5cf630"
                    }`
                  }}
                >
                  <Icon
                    name={item.icon}
                    className="w-7 h-7"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
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
