import Image from "next/image";
import Icon from "./Icon";

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
  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden"
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-color)" }}
    >
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-primary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo-color.png"
                  alt={siteName}
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                {siteName}
              </span>
            </div>
            <p className="max-w-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {data.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {data.social.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--bg-secondary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <Icon name={item.platform} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: "var(--text-tertiary)" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {data.navigation.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-primary-500"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Extra */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: "var(--text-tertiary)" }}>
              Stay Updated
            </h4>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Get the latest insights on tech and digital transformation.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/50"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-color)",
                }}
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            {data.copyright}
          </p>
          <div className="flex gap-6 text-sm" style={{ color: "var(--text-tertiary)" }}>
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
