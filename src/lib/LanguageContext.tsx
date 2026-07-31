"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import siteEn from "@/data/site-en.json";
import siteId from "@/data/site-id.json";

export type Language = "en" | "id";
export type SiteData = typeof siteEn;

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: SiteData;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("lang") as Language;
    if (stored === "en" || stored === "id") {
      setLanguageState(stored);
      document.documentElement.lang = stored;
    } else {
      const browserLang = navigator.language.split("-")[0];
      const defaultLang = browserLang === "id" ? "id" : "en";
      setLanguageState(defaultLang);
      document.documentElement.lang = defaultLang;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  };

  // Sync title and metadata on changes
  useEffect(() => {
    if (!mounted) return;
    const currentSite = language === "id" ? siteId : siteEn;
    document.title = `${currentSite.site.name} — ${currentSite.site.tagline}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", currentSite.site.description);
    }
  }, [language, mounted]);

  const t = language === "id" ? siteId : siteEn;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
