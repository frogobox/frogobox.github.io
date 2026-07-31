"use client";

import Image from "next/image";
import Icon from "./Icon";
import AnimateOnScroll from "./AnimateOnScroll";

interface Skill {
  name: string;
  percentage: number;
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface CEOProps {
  data: {
    sectionTitle: string;
    sectionSubtitle: string;
    name: string;
    role: string;
    bio: string;
    avatar: string;
    cvLink: string;
    github: string;
    linkedin: string;
    instagram: string;
    email: string;
    skills: Skill[];
    experienceTitle: string;
    experience: Experience[];
  };
}

export default function CEO({ data }: CEOProps) {
  if (!data) return null;

  return (
    <section id="ceo" className="section-padding overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-400 mb-4">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            {data.sectionTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        {/* CEO Profile Card & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Photo Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <AnimateOnScroll animation="animate-scale-in" className="w-full max-w-sm">
              <div className="glass border border-[var(--border-color)] rounded-3xl p-6 card-shadow relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                {/* Photo container */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 bg-gradient-primary p-0.5 group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[var(--bg-primary)]">
                    <Image
                      src={data.avatar}
                      alt={data.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-1 text-gradient">
                    {data.name}
                  </h3>
                  <p className="text-sm font-medium mb-6" style={{ color: "var(--text-secondary)" }}>
                    {data.role}
                  </p>

                  {/* Social Buttons */}
                  <div className="flex justify-center items-center gap-3 mb-6">
                    {data.github && (
                      <a
                        href={data.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 transition-all duration-300"
                        aria-label="GitHub"
                      >
                        <Icon name="github" className="w-5 h-5" />
                      </a>
                    )}
                    {data.linkedin && (
                      <a
                        href={data.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <Icon name="linkedin" className="w-5 h-5" />
                      </a>
                    )}
                    {data.instagram && (
                      <a
                        href={data.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <Icon name="instagram" className="w-5 h-5" />
                      </a>
                    )}
                    {data.email && (
                      <a
                        href={`mailto:${data.email}`}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 transition-all duration-300"
                        aria-label="Email"
                      >
                        <Icon name="email" className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2.5">
                    {data.cvLink && (
                      <a
                        href={data.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full justify-center text-sm py-3"
                      >
                        View CV
                        <Icon name="arrowRight" className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Bio & Skills */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimateOnScroll animation="animate-slide-right" className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                  Biography
                </h3>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {data.bio}
                </p>
              </div>

              {/* Skills Progress */}
              <div className="space-y-5">
                <h4 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  Skills & Expertise
                </h4>
                {data.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span style={{ color: "var(--text-primary)" }}>{skill.name}</span>
                      <span className="text-primary-500">{skill.percentage}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.percentage}%` }}
                        role="progressbar"
                        aria-valuenow={skill.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

        </div>

        {/* Timeline of Experiences */}
        <div className="border-t border-[var(--border-color)] pt-16">
          <AnimateOnScroll className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              {data.experienceTitle}
            </h3>
          </AnimateOnScroll>

          <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8">
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500/20" />

            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <AnimateOnScroll
                  key={index}
                  animation="animate-fade-in-up"
                  delay={index * 100}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[24px] sm:-left-[28px] top-1.5 w-4 h-4 rounded-full border-4 border-[var(--bg-primary)] bg-primary-500 shadow-md group-hover:scale-125 transition-transform" />

                  {/* Experience Card */}
                  <div className="glass border border-[var(--border-color)] rounded-2xl p-6 card-shadow hover:border-primary-500/40 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                          {exp.role}
                        </h4>
                        <p className="text-sm font-semibold text-primary-500">
                          {exp.company}
                        </p>
                      </div>
                      <span className="inline-block self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/30">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {exp.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
