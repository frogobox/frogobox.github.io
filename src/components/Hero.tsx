"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
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

const emptySubscribe = () => () => {};

export default function Hero({ data }: HeroProps) {
  const { t } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const origin = useSyncExternalStore(
    emptySubscribe,
    () => window.location.origin,
    () => ""
  );

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Fallback timer to ensure smooth transition even if iframe onLoad is deferred
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const videoId = data?.videoId || "68qCWu81CCA";

  return (
    <section
      id="hero"
      aria-label="Pengenalan Studio Frogobox"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Video with Controlled Opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Backdrop placeholder during load */}
        <div
          className="absolute inset-0 bg-slate-950 transition-opacity duration-1000 z-[1]"
          style={{ opacity: videoLoaded ? 0 : 1 }}
        />
        <iframe
          ref={iframeRef}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[84.375vw] min-h-[120vh] min-w-[213.33vh] pointer-events-none transition-opacity duration-1000 ${
            videoLoaded ? "opacity-65" : "opacity-0"
          }`}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&disablekb=1&fs=0&iv_load_policy=3${
            origin ? `&origin=${encodeURIComponent(origin)}` : ""
          }`}
          title="Background video showcase"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          style={{ border: "none" }}
          onLoad={() => setVideoLoaded(true)}
        />
      </div>

      {/* Solid High-Contrast Readability Mask */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90 z-[2] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-[3] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
        <AnimateOnScroll animation="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
            <span>Software Engineering & Creative Technology Studio</span>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight mb-6">
            {data.title}{" "}
            <span className="text-emerald-400">
              {data.highlight}
            </span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up">
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {data.tagline}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 flex-wrap">
            <a
              href={data.ctaPrimary.href}
              className="btn-primary w-full sm:w-auto text-sm sm:text-base font-semibold"
            >
              {data.ctaPrimary.text}
            </a>

            <Link
              href="/business-plan"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-lg transition-colors duration-150 min-h-[44px] w-full sm:w-auto"
            >
              <span>{t?.ui?.partnershipProposal || "Proposal Kemitraan"}</span>
            </Link>

            <button
              type="button"
              onClick={() => handleClick(data.ctaSecondary.href)}
              className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded-lg transition-colors duration-150 min-h-[44px] w-full sm:w-auto cursor-pointer"
            >
              {data.ctaSecondary.text}
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
