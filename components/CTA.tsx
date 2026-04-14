import Icon from "./Icon";
import AnimateOnScroll from "./AnimateOnScroll";

interface CTAProps {
  data: {
    title: string;
    subtitle: string;
    button: {
      text: string;
      href: string;
    };
  };
}

export default function CTA({ data }: CTAProps) {
  return (
    <section id="cta" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-primary" />

      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/3" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll animation="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-8 backdrop-blur-sm border border-white/15">
            <Icon name="rocket" className="w-4 h-4" />
            Ready to Get Started?
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={150}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {data.title}
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={300}>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {data.subtitle}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={450}>
          <a
            href={data.button.href}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-700 font-bold text-lg rounded-2xl hover:bg-white/90 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1"
          >
            {data.button.text}
            <Icon name="arrowRight" className="w-5 h-5" />
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
