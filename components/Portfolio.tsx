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

// Bespoke CSS/SVG Mockups for Project Headers
function ProjectPreview({ category, title, link }: { category: string; title: string; link?: string }) {
  let hostname = "frogobox.github.io";
  if (link) {
    try {
      hostname = new URL(link).hostname;
    } catch (e) {
      // Use fallback
    }
  }

  if (category === "Website") {
    return (
      <div className="relative w-full h-52 bg-slate-900 overflow-hidden flex flex-col group/mockup">
        {/* Browser Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50 backdrop-blur-sm">
          {/* Windows buttons */}
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          {/* Address bar */}
          <div className="flex-1 max-w-xs mx-auto bg-slate-950/40 rounded px-3 py-0.5 text-[10px] text-slate-400 font-mono truncate text-center select-none">
            {hostname}
          </div>
          {/* Menu Dots */}
          <div className="w-8 flex justify-end gap-1 opacity-40">
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className="w-1 h-1 rounded-full bg-slate-400" />
          </div>
        </div>
        {/* Browser Content */}
        <div className="flex-1 bg-gradient-to-tr from-indigo-900 via-indigo-950 to-purple-950 flex flex-col items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/25 via-transparent to-transparent" />
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          <div className="relative transform transition-transform duration-500 group-hover/mockup:scale-105 flex flex-col items-center">
            {/* Styled Globe/App Graphic */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 flex items-center justify-center mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-indigo-200 uppercase tracking-widest text-center max-w-[200px] truncate">
              {title.split('—')[0].trim()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (category === "Mobile Apps") {
    return (
      <div className="relative w-full h-52 bg-slate-950 overflow-hidden flex items-center justify-center group/mockup">
        {/* Diagonal stripes */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900 via-emerald-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />

        {/* Smartphone outline */}
        <div className="relative w-36 h-48 border-4 border-slate-800 bg-slate-900 rounded-t-2xl shadow-2xl flex flex-col overflow-hidden transform translate-y-6 transition-transform duration-500 group-hover/mockup:translate-y-4">
          {/* Speaker & camera notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-2.5 bg-slate-800 rounded-b-md z-20 flex justify-center items-center">
            <span className="w-1 h-1 rounded-full bg-slate-900 mr-1" />
            <span className="w-4 h-0.5 bg-slate-900 rounded-full" />
          </div>
          {/* Status Bar */}
          <div className="flex justify-between items-center px-3 pt-3.5 pb-0.5 text-[7px] text-slate-500 font-mono z-10 select-none">
            <span>09:41</span>
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span>LTE</span>
            </div>
          </div>
          {/* Mobile Screen App View */}
          <div className="flex-1 bg-slate-950/90 p-3 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(20,184,166,0.15)_0%,_transparent_70%)]" />
            {/* Piano Theme visual */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 shadow-md shadow-teal-500/20 flex items-center justify-center mb-1.5 z-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            {/* Piano keys abstract */}
            <div className="flex gap-0.5 justify-center w-full mt-2 opacity-80 z-10">
              <div className="w-2 h-7 bg-white rounded-b-[1px] relative"><div className="absolute top-0 right-0 w-0.5 h-3.5 bg-black" /></div>
              <div className="w-2 h-7 bg-white rounded-b-[1px] relative"><div className="absolute top-0 right-0 w-0.5 h-3.5 bg-black" /></div>
              <div className="w-2 h-7 bg-white rounded-b-[1px]" />
              <div className="w-2 h-7 bg-white rounded-b-[1px] relative"><div className="absolute top-0 right-0 w-0.5 h-3.5 bg-black" /></div>
              <div className="w-2 h-7 bg-white rounded-b-[1px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Open Source (Terminal/Code Editor)
  return (
    <div className="relative w-full h-52 bg-[#0d1117] overflow-hidden flex flex-col group/mockup">
      {/* Code Editor Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-[#21262d] backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {/* File symbol */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-[10px] text-slate-400 font-mono select-none">
            {title.replace(/[^a-zA-Z]/g, '')}.kt
          </span>
        </div>
        <div className="w-3.5 h-3.5 rounded hover:bg-slate-700/50 flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </div>
      </div>
      {/* Code Lines area */}
      <div className="flex-1 p-4 font-mono text-[9px] leading-relaxed overflow-hidden text-slate-300 relative select-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 via-transparent to-transparent pointer-events-none" />
        <div className="flex gap-2.5">
          {/* Line Numbers */}
          <div className="text-slate-600 text-right select-none select-none w-3">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
          {/* Code syntax representation */}
          <div className="flex-1 transform transition-transform duration-500 group-hover/mockup:translate-x-0.5">
            <div>
              <span className="text-[#ff7b72]">package</span> <span className="text-[#c9d1d9]">com.frogo.sdk</span>
            </div>
            <div>
              <span className="text-[#ff7b72]">class</span> <span className="text-[#d2a8ff]">{title.replace(/[^a-zA-Z]/g, '')}</span> : <span className="text-[#79c0ff]">FrogoLibrary</span>() {'{'}
            </div>
            <div className="pl-4">
              <span className="text-[#ff7b72]">fun</span> <span className="text-[#d2a8ff]">init</span>() = <span className="text-[#a5d6ff]">true</span>
            </div>
            <div>{'}'}</div>
          </div>
        </div>
      </div>
      {/* GitHub badge overlay */}
      <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-slate-700/50 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 opacity-90 transition-opacity duration-300 group-hover/mockup:opacity-100">
        <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
        <span className="text-[9px] font-semibold text-slate-300 font-sans tracking-wide">GitHub</span>
      </div>
    </div>
  );
}

export default function Portfolio({ data }: PortfolioProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All");
  const { t } = useLanguage();

  const categories = [
    { id: "All", label: t.ui.allCategories || "All" },
    { id: "Website", label: t.ui.website || "Websites" },
    { id: "Mobile Apps", label: t.ui.mobileApps || "Mobile Apps" },
    { id: "Open Source", label: t.ui.openSource || "Open Source" },
  ];

  const filteredItems = data.items.filter((item) => {
    if (activeTab === "All") return true;
    return item.category === activeTab;
  });

  const getLinkIcon = (category: string) => {
    if (category === "Open Source") {
      return (
        <svg className="w-4 h-4 transition-transform group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    }
    if (category === "Mobile Apps") {
      return (
        <svg className="w-4 h-4 transition-transform group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    );
  };

  const getLinkLabel = (category: string) => {
    if (category === "Open Source") return t.ui.viewRepository || "View Repository";
    if (category === "Mobile Apps") return t.ui.getOnPlayStore || "Get on Play Store";
    return t.ui.visitWebsite || "Visit Website";
  };

  return (
    <section id="portfolio" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-400 mb-4">
            {t.ui.ourWork}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            {data.sectionTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        {/* Filter Navigation */}
        <AnimateOnScroll className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {categories.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setExpandedIndex(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-gradient-primary text-white shadow-md shadow-primary-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </AnimateOnScroll>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredItems.map((item, i) => (
            <AnimateOnScroll key={`${activeTab}-${i}`} animation="animate-fade-in-up" delay={i * 80}>
              <div className="card group overflow-hidden p-0 h-full flex flex-col hover:border-primary-500/30 transition-all duration-300">
                {/* Visual Header (Image or Custom Mockup) */}
                <div className="relative h-52 overflow-hidden border-b border-slate-100 dark:border-slate-800 bg-slate-950 flex flex-col justify-end">
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <ProjectPreview category={item.category} title={item.title} link={item.link} />
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-white/90 text-primary-700 dark:bg-slate-900/90 dark:text-primary-400 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-bold mb-2 line-clamp-1 group-hover:text-primary-500 transition-colors" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-6 flex-1 line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-auto">
                    {/* Action Link Button */}
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300"
                      >
                        {getLinkLabel(item.category)}
                        {getLinkIcon(item.category)}
                      </a>
                    ) : (
                      <div />
                    )}

                    {/* Expandable details button */}
                    {(item.problem || item.solution || item.result) && (
                      <button
                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        {expandedIndex === i ? t.ui.showLess : t.ui.viewCaseStudy}
                      </button>
                    )}
                  </div>

                  {/* Expandable Case Study details */}
                  {(item.problem || item.solution || item.result) && (
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        expandedIndex === i ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="space-y-2.5 text-xs pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                        {item.problem && (
                          <div>
                            <span className="font-semibold text-rose-500">{t.ui.problem}: </span>
                            <span style={{ color: "var(--text-secondary)" }}>{item.problem}</span>
                          </div>
                        )}
                        {item.solution && (
                          <div>
                            <span className="font-semibold text-primary-500">{t.ui.solution}: </span>
                            <span style={{ color: "var(--text-secondary)" }}>{item.solution}</span>
                          </div>
                        )}
                        {item.result && (
                          <div>
                            <span className="font-semibold text-teal-500">{t.ui.result}: </span>
                            <span style={{ color: "var(--text-secondary)" }}>{item.result}</span>
                          </div>
                        )}
                      </div>
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

