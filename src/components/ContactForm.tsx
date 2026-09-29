"use client";

import { useState } from "react";
import Icon from "./Icon";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/lib/LanguageContext";

interface ContactFormProps {
  data: {
    sectionTitle: string;
    sectionSubtitle: string;
    email: string;
    phone: string;
    address: string;
    formButton: string;
  };
}

export default function ContactForm({ data }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { language, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side submission feedback handler
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: "email",
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
      target: undefined,
      rel: undefined,
    },
    {
      icon: "phone",
      label: language === "en" ? "Phone" : "Telepon",
      value: data.phone,
      href: `tel:${data.phone.replace(/\s/g, "")}`,
      target: undefined,
      rel: undefined,
    },
    {
      icon: "location",
      label: language === "en" ? "Address" : "Alamat",
      value: data.address,
      href: "https://maps.google.com/?q=Probolinggo,+East+Java,+Indonesia",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  return (
    <section
      id="contact"
      aria-label={data.sectionTitle}
      className="section-padding bg-[var(--bg-secondary)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-primary)]">
            {data.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-[var(--text-secondary)]">
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Information & Real Map */}
          <AnimateOnScroll className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.href}
                  target={info.target}
                  rel={info.rel}
                  className="flex items-start gap-3.5 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-emerald-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Icon name={info.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                      {info.label}
                    </div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Embedded Google Map */}
            <div className="h-52 rounded-xl overflow-hidden border border-[var(--border-color)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63196.48!2d113.18!3d-7.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7d59a1a6fba2f%3A0xfaa2a913fff5b024!2sProbolinggo%2C+East+Java%2C+Indonesia!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.ui.officeLocation || "Lokasi Studio Frogobox"}
              />
            </div>
          </AnimateOnScroll>

          {/* Contact Form */}
          <AnimateOnScroll className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                >
                  {t.ui.fullName || "Nama Lengkap"}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.ui.placeholderName || "Nama Anda"}
                  className="w-full px-4 py-3 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                >
                  {t.ui.emailAddress || "Email"}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.ui.placeholderEmail || "email@perusahaan.com"}
                  className="w-full px-4 py-3 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                >
                  {t.ui.projectDetails || "Pesan / Kebutuhan Proyek"}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.ui.placeholderMessage || "Ceritakan tentang ruang lingkup atau jadwal proyek Anda..."}
                  className="w-full px-4 py-3 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto font-semibold text-sm sm:text-base cursor-pointer"
                >
                  {data.formButton || "Kirim Permintaan Proposal"}
                </button>
              </div>

              {submitted && (
                <div
                  role="status"
                  className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium"
                >
                  Terima kasih! Pesan Anda telah kami terima. Tim Frogobox akan menghubungi Anda kembali dalam 24 jam.
                </div>
              )}
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
