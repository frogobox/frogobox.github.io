"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="relative w-14 h-7 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)]"
      />
    );
  }

  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      style={{
        background: dark
          ? "linear-gradient(135deg, #1e293b, #334155)"
          : "linear-gradient(135deg, #bfdbfe, #93c5fd)",
        border: `1px solid ${dark ? "#334155" : "#93c5fd"}`,
      }}
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 text-xs">
        <span className={`transition-opacity duration-300 ${dark ? "opacity-0" : "opacity-100"}`}>
          ☀️
        </span>
        <span className={`transition-opacity duration-300 ${dark ? "opacity-100" : "opacity-0"}`}>
          🌙
        </span>
      </span>
      {/* Knob */}
      <span
        className="absolute top-0.5 w-6 h-6 rounded-full shadow-md transition-all duration-300"
        style={{
          left: dark ? "calc(100% - 1.625rem)" : "0.125rem",
          background: dark ? "#0f172a" : "#ffffff",
        }}
      />
    </button>
  );
}
