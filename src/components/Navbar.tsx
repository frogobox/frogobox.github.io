"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Icon from "./Icon";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.ui.navServices, href: "#services" },
    { label: t.ui.navWhyUs, href: "#why-us" },
    { label: t.ui.navPortfolio, href: "#portfolio" },
    { label: t.ui.navTestimonials, href: "#testimonials" },
    { label: t.ui.navBusinessPlan || "Proposal Kemitraan", href: "/business-plan", isRoute: true },
    { label: t.ui.navContact, href: "#contact" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleSectionObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${entry.target.id}`);
            }
          });
        },
        { threshold: 0, rootMargin: "-80px 0px -50% 0px" }
      );

      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => observer.observe(section));
      return () => sections.forEach((section) => observer.unobserve(section));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    const cleanup = handleSectionObserver();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanup?.();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "glass card-shadow py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <nav
        aria-label="Navigasi Utama"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
          aria-label="Frogobox Beranda"
        >
          <div className="relative w-9 h-9">
            <Image
              src="/images/logo-color.png"
              alt="Logo Frogobox"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>
          <span
            className={`font-bold text-base hidden sm:block transition-colors ${
              scrolled ? "text-[var(--text-primary)]" : "text-white"
            }`}
          >
            Frogobox
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  scrolled
                    ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                    : "text-emerald-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {link.label}
              </Link>
            ) : (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === link.href
                    ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400"
                    : scrolled
                      ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            )
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "id" : "en")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
              scrolled
                ? "text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
                : "text-white border-white/20 hover:bg-white/10"
            }`}
            aria-label={language === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
          >
            <span className={language === "en" ? "text-emerald-500" : ""}>EN</span>
            <span className="opacity-40">|</span>
            <span className={language === "id" ? "text-emerald-500" : ""}>ID</span>
          </button>

          {/* Contact Button */}
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-md text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
          >
            {t.ui.contactUs || "Kontak Studio"}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              scrolled
                ? "text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Buka menu navigasi"
            aria-expanded={mobileOpen}
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden transition-all duration-200 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] mt-2 mx-4 rounded-xl shadow-lg">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="w-full text-left px-3.5 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {link.label}
              </Link>
            ) : (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={`w-full text-left px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === link.href
                    ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {link.label}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="w-full btn-primary text-xs sm:text-sm mt-2"
          >
            {t.ui.contactUs || "Kontak Studio"}
          </button>
        </div>
      </div>
    </header>
  );
}
