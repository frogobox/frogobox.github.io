"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { useLanguage } from "@/lib/LanguageContext";

interface FooterProps {
  data: {
    description: string;
    navigation: { label: string; href: string }[];
    social: { platform: string; url: string; label: string }[];
    copyright: string;
  };
  siteName: string;
}

export default function Footer({ data, siteName }: FooterProps) {
  const { t } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer
      aria-label="Footer Informasi Studio"
      className="pt-16 pb-12 bg-[var(--bg-primary)] border-t border-[var(--border-color)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <Image
                  src="/images/logo-color.png"
                  alt={siteName}
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[var(--text-primary)]">
                {siteName}
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
              {data.description}
            </p>
            {/* Verified Social Media Links */}
            <div className="flex gap-2.5 pt-2">
              {data.social.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-emerald-500 hover:border-emerald-500/40 border border-[var(--border-color)] transition-colors"
                >
                  <Icon name={item.platform} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
              {t.ui.quickLinks || "Navigasi"}
            </h3>
            <ul className="space-y-2.5">
              {data.navigation.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-emerald-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/business-plan"
                  className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {t?.ui?.partnershipProposal || "Proposal Kemitraan"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Bulletin */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
              {t.ui.stayUpdated || "Buletin Studio"}
            </h3>
            <p className="text-sm mb-3 text-[var(--text-secondary)]">
              {t.ui.newsletterSubtitle || "Dapatkan kabar rilis open-source dan wawasan teknis terbaru."}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.ui.placeholderNewsletter || "email@anda.com"}
                  aria-label="Alamat email untuk newsletter"
                  className="flex-1 px-3.5 py-2 rounded-lg text-sm border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Kirim pendaftaran buletin"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Kirim
                </button>
              </div>
              {subscribed && (
                <p role="status" className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Terima kasih sudah berlangganan buletin kami!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar without Dead Anchors */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-tertiary)]">
            {data.copyright}
          </p>
          <div className="flex gap-5 text-xs text-[var(--text-tertiary)]">
            <Link href="/privacy-policy" className="hover:text-emerald-500 transition-colors">
              {t.ui.privacyPolicy || "Kebijakan Privasi"}
            </Link>
            <Link href="/privacy-policy" className="hover:text-emerald-500 transition-colors">
              {t.ui.termsOfService || "Syarat & Ketentuan"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
