"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Icon from "./Icon";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/lib/LanguageContext";

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
  const { t } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [origin, setOrigin] = useState("");
  const isMounted = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    isMounted.current = true;
    setOrigin(window.location.origin);

    const iframe = iframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        if (isMounted.current) {
          setVideoLoaded(true);
        }
      };
      iframe.addEventListener("load", handleLoad);
      return () => {
        isMounted.current = false;
        iframe.removeEventListener("load", handleLoad);
      };
    }

    return () => {
      isMounted.current = false;
    };
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
          ref={iframeRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[84.37vw] min-h-[150vh] min-w-[266.66vh] md:w-[120vw] md:h-[67.5vw] md:min-h-[120vh] md:min-w-[213.33vh] pointer-events-none"
          src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1&loop=1&playlist=${data.videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&disablekb=1&fs=0&iv_load_policy=3${origin ? `&origin=${origin}` : ""}`}
          title="Background video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
          style={{ border: "none" }}
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
          <Link
            href="/business-plan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-emerald-400/60 text-white text-sm font-medium mb-8 backdrop-blur-md transition-all duration-300 group shadow-lg hover:shadow-emerald-500/20"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white/90 group-hover:text-white font-medium">
              {t?.ui?.heroBadgeBusinessPlan || "🚀 Pelajari Proposal Kemitraan Play Store & AdMob"}
            </span>
            <Icon name="arrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1 text-emerald-300" />
          </Link>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 flex-wrap">
            <button
              onClick={() => handleClick(data.ctaPrimary.href)}
              className="btn-primary text-base px-8 py-4 w-full sm:w-auto cursor-pointer"
            >
              {data.ctaPrimary.text}
              <Icon name="arrowRight" className="w-5 h-5" />
            </button>
            <Link
              href="/business-plan"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 rounded-xl transition-all duration-300 shadow-xl shadow-emerald-950/40 hover:scale-[1.03] w-full sm:w-auto"
            >
              <Icon name="sparkles" className="w-5 h-5 text-emerald-200" />
              {t?.ui?.partnershipProposal || "Proposal Kemitraan"}
            </Link>
            <button
              onClick={() => handleClick(data.ctaSecondary.href)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/25 rounded-xl hover:bg-white/10 transition-all w-full sm:w-auto cursor-pointer"
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
