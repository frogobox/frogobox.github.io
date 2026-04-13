"use client";

import { useState, useEffect } from "react";
import Icon from "./Icon";
import AnimateOnScroll from "./AnimateOnScroll";

interface HeroProps {
  data: {
    title: string;
    highlight: string;
    tagline: string;
    videoId: string;
    ctaPrimary: { text: string; href: string };
    ctaSecondary: { text: string; href: string };

  };
}

export default function Hero({ data }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [origin, setOrigin] = useState("");

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Poster/Fallback gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 z-[1]"
          style={{
            background: "var(--gradient-hero)",
            opacity: videoLoaded ? 0 : 1,
          }}
        />
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
          src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1&loop=1&playlist=${data.videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1${origin ? `&origin=${origin}` : ""}`}
          title="Background video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
          style={{ border: "none" }}
          onLoad={() => setVideoLoaded(true)}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-[1]" style={{ opacity: 0.65 }} />

      {/* Decorative elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary-600/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Content */}
      <div className="relative z-[2] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <AnimateOnScroll animation="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm font-medium mb-8 backdrop-blur-sm">
            <Icon name="sparkles" className="w-4 h-4 text-accent-400" />
            IT Consulting & Software Development
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={150}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {data.title}{" "}
            <span className="text-gradient">{data.highlight}</span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={300}>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {data.tagline}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={450}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => handleClick(data.ctaPrimary.href)}
              className="btn-primary text-base px-8 py-4 w-full sm:w-auto"
            >
              {data.ctaPrimary.text}
              <Icon name="arrowRight" className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleClick(data.ctaSecondary.href)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/25 rounded-xl hover:bg-white/10 transition-all w-full sm:w-auto"
            >
              {data.ctaSecondary.text}
            </button>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
