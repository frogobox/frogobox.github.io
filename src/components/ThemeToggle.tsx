"use client";

import { useSyncExternalStore, useState } from "react";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const systemDark = useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", callback);
      window.addEventListener("storage", callback);
      return () => {
        media.removeEventListener("change", callback);
        window.removeEventListener("storage", callback);
      };
    },
    () => {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    },
    () => false
  );

  const [overrideDark, setOverrideDark] = useState<boolean | null>(null);
  const dark = overrideDark !== null ? overrideDark : systemDark;

  const toggle = () => {
    const next = !dark;
    setOverrideDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!isMounted) {
    return (
      <div
        className="w-14 h-8 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] opacity-60"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={dark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={dark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      className="relative w-14 h-8 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none p-1 cursor-pointer"
      style={{
        background: dark ? "#1f293d" : "#e2e8f0",
        border: `1px solid ${dark ? "#334155" : "#cbd5e1"}`,
      }}
    >
      {/* Sun Icon (Light) */}
      <span
        className={`absolute left-1.5 top-1.5 w-5 h-5 flex items-center justify-center text-amber-500 transition-opacity duration-200 ${
          dark ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </span>

      {/* Moon Icon (Dark) */}
      <span
        className={`absolute right-1.5 top-1.5 w-5 h-5 flex items-center justify-center text-slate-300 transition-opacity duration-200 ${
          dark ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>

      {/* Slider Knob */}
      <span
        className="block w-6 h-6 rounded-full shadow-sm transition-transform duration-200"
        style={{
          transform: dark ? "translateX(24px)" : "translateX(0)",
          background: dark ? "#111827" : "#ffffff",
          border: `1px solid ${dark ? "#374151" : "#e5e7eb"}`,
        }}
      />
    </button>
  );
}
