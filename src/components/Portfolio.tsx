"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/lib/LanguageContext";

interface PortfolioItem {
  image: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  link?: string;
}

interface PortfolioProps {
  data: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: PortfolioItem[];
  };
}

// Clean CSS Mockups for Project Headers without generic AI grid lines
function ProjectPreview({ category, title, link }: { category: string; title: string; link?: string }) {
  let hostname = "frogoboxmedia.com";
  if (link) {
    try {
      hostname = new URL(link).hostname;
    } catch {
      // Fallback
    }
  }

  const cleanTitle = title.split(/ - | : /)[0].trim();

  if (category === "Website") {
    return (
      <div className="relative w-full h-52 bg-slate-900 overflow-hidden flex flex-col group/mockup">
        {/* Browser Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-850 border-b border-slate-800">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <div className="flex-1 max-w-xs mx-auto bg-slate-950/60 rounded px-3 py-0.5 text-[10px] text-slate-400 font-mono truncate text-center select-none border border-slate-800">
            {hostname}
          </div>
          <div className="w-8" />
        </div>
        {/* Browser Content */}
        <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center p-6 relative">
          <div className="relative flex flex-col items-center">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3 text-emerald-400">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="text-[12px] font-semibold text-slate-300 uppercase tracking-wider text-center max-w-[220px] truncate">
              {cleanTitle}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (category === "Mobile Apps") {
    return (
      <div className="relative w-full h-52 bg-slate-950 overflow-hidden flex items-center justify-center group/mockup">
        {/* Clean Device Outline */}
        <div className="relative w-36 h-48 border-2 border-slate-800 bg-slate-900 rounded-t-xl flex flex-col overflow-hidden transform translate-y-5 transition-transform duration-200 group-hover/mockup:translate-y-3">
          {/* Speaker bar */}
          <div className="w-full h-4 bg-slate-900 border-b border-slate-800 flex justify-center items-center">
            <span className="w-6 h-1 bg-slate-700 rounded-full" />
          </div>
          {/* App View */}
          <div className="flex-1 bg-slate-950 p-3 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-2 text-emerald-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-400 font-medium text-center truncate w-full px-1">
              {cleanTitle}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Open Source (Code Editor)
  return (
    <div className="relative w-full h-52 bg-slate-950 overflow-hidden flex flex-col group/mockup">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-[10px] text-slate-300 font-mono select-none">
            {cleanTitle.replace(/[^a-zA-Z]/g, '')}.kt
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400">Kotlin</span>
      </div>
      {/* Code Content */}
      <div className="flex-1 p-4 font-mono text-[10px] leading-relaxed text-slate-300 select-none">
        <div className="space-y-1">
          <div><span className="text-emerald-400">package</span> com.frogo.sdk</div>
          <div><span className="text-emerald-400">class</span> <span className="text-white font-bold">{cleanTitle.replace(/[^a-zA-Z]/g, '')}</span> : FrogoModule()</div>
          <div className="pl-4 text-slate-400">{"// Open-source software component"}</div>
          <div className="pl-4"><span className="text-emerald-400">fun</span> initialize() = true</div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ data }: PortfolioProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All");
  const { t } = useLanguage();

  const categories = [
    { id: "All", label: t.ui.allCategories || "Semua" },
    { id: "Website", label: t.ui.website || "Websites" },
    { id: "Mobile Apps", label: t.ui.mobileApps || "Mobile Apps" },
    { id: "Open Source", label: t.ui.openSource || "Open Source" },
  ];

  const filteredItems = data.items.filter((item) => {
    if (activeTab === "All") return true;
    return item.category === activeTab;
  });

  const getLinkLabel = (category: string) => {
    if (category === "Open Source") return t.ui.viewRepository || "Repositori GitHub";
    if (category === "Mobile Apps") return t.ui.getOnPlayStore || "Google Play Store";
    return t.ui.visitWebsite || "Buka Website";
  };

  return (
    <section
      id="portfolio"
      aria-label={data.sectionTitle}
      className="section-padding bg-[var(--bg-secondary)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-primary)]">
            {data.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-[var(--text-secondary)]">
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        {/* Filter Navigation */}
        <AnimateOnScroll className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]">
            {categories.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setExpandedIndex(null);
                  }}
                  className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </AnimateOnScroll>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          {filteredItems.map((item, i) => (
            <AnimateOnScroll key={`${activeTab}-${i}`} animation="animate-fade-in-up">
              <div className="card overflow-hidden p-0 h-full flex flex-col">
                {/* Visual Header */}
                <div className="relative h-52 overflow-hidden border-b border-[var(--border-color)] bg-slate-950 flex flex-col justify-end">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <ProjectPreview category={item.category} title={item.title} link={item.link} />
                  )}
                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded bg-slate-900/90 text-emerald-400 border border-slate-700/60 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-bold mb-2 line-clamp-1 text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed mb-4 text-[var(--text-secondary)] line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3 mt-4">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        <span>{getLinkLabel(item.category)}</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-xs text-[var(--text-tertiary)]">Internal / Open Source</span>
                    )}

                    {(item.problem || item.solution || item.result) && (
                      <button
                        type="button"
                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        {expandedIndex === i ? t.ui.showLess : t.ui.viewCaseStudy}
                      </button>
                    )}
                  </div>

                  {/* Expandable Case Study Details */}
                  {(item.problem || item.solution || item.result) && expandedIndex === i && (
                    <div className="mt-4 pt-3 border-t border-[var(--border-color)] space-y-2 text-xs">
                      {item.problem && (
                        <div>
                          <strong className="text-rose-500">{t.ui.problem}: </strong>
                          <span className="text-[var(--text-secondary)]">{item.problem}</span>
                        </div>
                      )}
                      {item.solution && (
                        <div>
                          <strong className="text-emerald-600 dark:text-emerald-400">{t.ui.solution}: </strong>
                          <span className="text-[var(--text-secondary)]">{item.solution}</span>
                        </div>
                      )}
                      {item.result && (
                        <div>
                          <strong className="text-teal-600 dark:text-teal-400">{t.ui.result}: </strong>
                          <span className="text-[var(--text-secondary)]">{item.result}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
