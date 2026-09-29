"use client";

import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/lib/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <section
      id="cta"
      aria-label="Konsultasi Proyek Studio"
      className="section-padding bg-slate-950 text-white border-y border-slate-800 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <AnimateOnScroll animation="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            Kolaborasi & Kemitraan
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            {data.title}
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up">
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {data.subtitle}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 flex-wrap">
            <a
              href={data.button.href}
              className="btn-primary w-full sm:w-auto text-base font-semibold px-8 py-3.5"
            >
              {data.button.text}
            </a>
            <Link
              href="/business-plan"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-emerald-500/40 rounded-lg transition-colors duration-150 min-h-[44px] w-full sm:w-auto"
            >
              {t?.ui?.partnershipProposal || "Proposal Kemitraan"}
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
