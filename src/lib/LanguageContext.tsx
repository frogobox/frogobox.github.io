"use client";

import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from "react";
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

const emptySubscribe = () => () => {};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const clientLang = useSyncExternalStore<Language>(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => {
      const stored = localStorage.getItem("lang") as Language;
      if (stored === "en" || stored === "id") return stored;
      const browserLang = navigator.language.split("-")[0];
      return (browserLang === "id" ? "id" : "en") as Language;
    },
    () => "en" as Language
  );

  const [overrideLang, setOverrideLang] = useState<Language | null>(null);
  const language = overrideLang || clientLang;

  const setLanguage = (lang: Language) => {
    setOverrideLang(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  };

  // Sync title and metadata on changes
  useEffect(() => {
    if (!isMounted) return;
    const currentSite = language === "id" ? siteId : siteEn;
    document.title = `${currentSite.site.name} | ${currentSite.site.tagline}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", currentSite.site.description);
    }
  }, [language, isMounted]);

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
