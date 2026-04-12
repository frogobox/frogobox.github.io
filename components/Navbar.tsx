"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import Icon from "./Icon";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
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
        { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass card-shadow py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo-color.png"
              alt="Frogobox Media Id"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <span className={`font-bold text-lg hidden sm:block transition-colors duration-300 ${
            scrolled ? "text-[var(--text-primary)]" : "text-white"
          }`}>
            Frogobox
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === link.href
                  ? "text-primary-600 bg-primary-50/80 dark:text-primary-400 dark:bg-primary-950/30"
                  : scrolled
                    ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => handleNavClick("#contact")}
            className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              scrolled
                ? "bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary-500/25"
                : "bg-white/15 text-white border border-white/25 hover:bg-white/25"
            }`}
          >
            <Icon name="sparkles" className="w-4 h-4" />
            Get Started
          </button>
          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle mobile menu"
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 glass mt-2 mx-4 rounded-2xl">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeSection === link.href
                  ? "text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-950/30"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="w-full btn-primary text-sm mt-2"
          >
            <Icon name="sparkles" className="w-4 h-4" />
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
