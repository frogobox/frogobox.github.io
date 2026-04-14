"use client";

import { useState } from "react";
import Icon from "./Icon";
import AnimateOnScroll from "./AnimateOnScroll";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only — no backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    { icon: "email", label: "Email", value: data.email, href: `mailto:${data.email}` },
    { icon: "phone", label: "Phone", value: data.phone, href: `tel:${data.phone.replace(/\s/g, "")}` },
    { icon: "location", label: "Address", value: data.address, href: "#" },
  ];

  return (
    <section id="contact" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-400 mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            {data.sectionTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {data.sectionSubtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <AnimateOnScroll animation="animate-slide-left" className="lg:col-span-2">
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.href}
                  className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:bg-[var(--bg-primary)] group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-110">
                    <Icon name={info.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1" style={{ color: "var(--text-tertiary)" }}>
                      {info.label}
                    </div>
                    <div className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Mini map placeholder */}
            <div className="mt-8 h-48 rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border-color)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63196.48!2d113.18!3d-7.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7d59a1a6fba2f%3A0xfaa2a913fff5b024!2sProbolinggo%2C+East+Java%2C+Indonesia!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(30%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </AnimateOnScroll>

          {/* Form */}
          <AnimateOnScroll animation="animate-slide-right" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card p-8">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none focus:ring-2 focus:ring-primary-500/50"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none focus:ring-2 focus:ring-primary-500/50"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    Project Details
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, timeline, and budget..."
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  id="contact-submit"
                  type="submit"
                  className="btn-primary w-full text-base py-4"
                >
                  {submitted ? (
                    <span className="flex items-center gap-2">
                      ✓ Message Sent Successfully!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {data.formButton}
                      <Icon name="arrowRight" className="w-5 h-5" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
