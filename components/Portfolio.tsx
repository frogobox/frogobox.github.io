"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

interface PortfolioProps {
  data: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: {
      image: string;
      title: string;
      category: string;
      description: string;
      problem: string;
      solution: string;
      result: string;
    }[];
  };
}

export default function Portfolio({ data }: PortfolioProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-400 mb-4">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            {data.sectionTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, i) => (
            <AnimateOnScroll key={i} animation="animate-fade-in-up" delay={i * 150}>
              <div className="card group overflow-hidden p-0 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-primary-700 dark:bg-gray-900/90 dark:text-primary-400 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-secondary)" }}>
                    {item.description}
                  </p>

                  {/* Expandable details */}
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                    className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-left"
                  >
                    {expandedIndex === i ? "Show Less ↑" : "View Case Study →"}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedIndex === i ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-3 text-sm pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                      <div>
                        <span className="font-semibold text-red-500">Problem: </span>
                        <span style={{ color: "var(--text-secondary)" }}>{item.problem}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-primary-500">Solution: </span>
                        <span style={{ color: "var(--text-secondary)" }}>{item.solution}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-accent-500">Result: </span>
                        <span style={{ color: "var(--text-secondary)" }}>{item.result}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
