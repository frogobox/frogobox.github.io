"use client";

import { useState, useEffect, useCallback } from "react";
import "./admin.css";

// ─── Types ───────────────────────────────────────────────────────
interface SiteSection {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: { color: string; white: string; black: string };
}

interface HeroStat {
  value: string;
  label: string;
}

interface HeroSection {
  title: string;
  highlight: string;
  tagline: string;
  videoUrl: string;
  videoId: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
  stats: HeroStat[];
}

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface ServicesSection {
  sectionTitle: string;
  sectionSubtitle: string;
  items: ServiceItem[];
}

interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}

interface WhyUsSection {
  sectionTitle: string;
  sectionSubtitle: string;
  items: WhyUsItem[];
}

interface PortfolioItem {
  image: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
}

interface PortfolioSection {
  sectionTitle: string;
  sectionSubtitle: string;
  items: PortfolioItem[];
}

interface TestimonialItem {
  name: string;
  role: string;
  message: string;
  avatar: string;
}

interface TestimonialsSection {
  sectionTitle: string;
  sectionSubtitle: string;
  items: TestimonialItem[];
}

interface CtaSection {
  title: string;
  subtitle: string;
  button: { text: string; href: string };
}

interface ContactSection {
  sectionTitle: string;
  sectionSubtitle: string;
  email: string;
  phone: string;
  address: string;
  formButton: string;
}

interface FooterNav {
  label: string;
  href: string;
}

interface FooterSocial {
  platform: string;
  url: string;
  label: string;
}

interface FooterSection {
  description: string;
  navigation: FooterNav[];
  social: FooterSocial[];
  copyright: string;
}

interface SiteData {
  site: SiteSection;
  hero: HeroSection;
  services: ServicesSection;
  whyUs: WhyUsSection;
  portfolio: PortfolioSection;
  testimonials: TestimonialsSection;
  cta: CtaSection;
  contact: ContactSection;
  footer: FooterSection;
}

// ─── Icons (inline SVG) ────────────────────────────────────────
function IconSave() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
    </svg>
  );
}

// ─── Section tabs ──────────────────────────────────────────────
const SECTIONS = [
  { key: "site", label: "Site Info", icon: "🏢" },
  { key: "hero", label: "Hero", icon: "🎬" },
  { key: "services", label: "Services", icon: "⚙️" },
  { key: "whyUs", label: "Why Us", icon: "🌟" },
  { key: "portfolio", label: "Portfolio", icon: "💼" },
  { key: "testimonials", label: "Testimonials", icon: "💬" },
  { key: "cta", label: "CTA", icon: "📢" },
  { key: "contact", label: "Contact", icon: "📧" },
  { key: "footer", label: "Footer", icon: "🦶" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

// ─── Components ────────────────────────────────────────────────
function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  multiline = false,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="cms-field">
      <label className="cms-label">{label}</label>
      {multiline ? (
        <textarea
          className="cms-input cms-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          className="cms-input"
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function CollapsibleCard({
  title,
  defaultOpen = false,
  children,
  onDelete,
  badge,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  onDelete?: () => void;
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="cms-collapsible">
      <div className="cms-collapsible-header" onClick={() => setOpen(!open)}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IconChevron open={open} />
          <span className="cms-collapsible-title">{title}</span>
          {badge && <span className="cms-badge">{badge}</span>}
        </div>
        {onDelete && (
          <button
            className="cms-btn-danger-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete"
          >
            <IconTrash />
          </button>
        )}
      </div>
      {open && <div className="cms-collapsible-body">{children}</div>}
    </div>
  );
}

// ─── Section Editors ──────────────────────────────────────────
function SiteEditor({ data, onChange }: { data: SiteSection; onChange: (d: SiteSection) => void }) {
  const update = (key: keyof SiteSection, value: string) => onChange({ ...data, [key]: value });
  const updateLogo = (key: keyof SiteSection["logo"], value: string) =>
    onChange({ ...data, logo: { ...data.logo, [key]: value } });

  return (
    <div className="cms-editor-grid">
      <InputField label="Site Name" value={data.name} onChange={(v) => update("name", v)} />
      <InputField label="Tagline" value={data.tagline} onChange={(v) => update("tagline", v)} />
      <InputField label="Description" value={data.description} onChange={(v) => update("description", v)} multiline />
      <InputField label="Website URL" value={data.url} onChange={(v) => update("url", v)} type="url" />
      <div className="cms-subsection-title">Logo Paths</div>
      <InputField label="Color Logo" value={data.logo.color} onChange={(v) => updateLogo("color", v)} />
      <InputField label="White Logo" value={data.logo.white} onChange={(v) => updateLogo("white", v)} />
      <InputField label="Black Logo" value={data.logo.black} onChange={(v) => updateLogo("black", v)} />
    </div>
  );
}

function HeroEditor({ data, onChange }: { data: HeroSection; onChange: (d: HeroSection) => void }) {
  const update = (key: string, value: string) => onChange({ ...data, [key]: value });
  const updateCta = (which: "ctaPrimary" | "ctaSecondary", key: string, value: string) =>
    onChange({ ...data, [which]: { ...data[which], [key]: value } });
  const updateStat = (index: number, key: keyof HeroStat, value: string) => {
    const stats = [...data.stats];
    stats[index] = { ...stats[index], [key]: value };
    onChange({ ...data, stats });
  };
  const addStat = () => onChange({ ...data, stats: [...data.stats, { value: "", label: "" }] });
  const removeStat = (i: number) => onChange({ ...data, stats: data.stats.filter((_, idx) => idx !== i) });

  return (
    <div className="cms-editor-grid">
      <InputField label="Title" value={data.title} onChange={(v) => update("title", v)} />
      <InputField label="Highlight" value={data.highlight} onChange={(v) => update("highlight", v)} />
      <InputField label="Tagline" value={data.tagline} onChange={(v) => update("tagline", v)} multiline />
      <InputField label="Video URL" value={data.videoUrl} onChange={(v) => update("videoUrl", v)} type="url" />
      <InputField label="Video ID" value={data.videoId} onChange={(v) => update("videoId", v)} />

      <div className="cms-subsection-title">Primary CTA</div>
      <InputField label="Text" value={data.ctaPrimary.text} onChange={(v) => updateCta("ctaPrimary", "text", v)} />
      <InputField label="Href" value={data.ctaPrimary.href} onChange={(v) => updateCta("ctaPrimary", "href", v)} />

      <div className="cms-subsection-title">Secondary CTA</div>
      <InputField label="Text" value={data.ctaSecondary.text} onChange={(v) => updateCta("ctaSecondary", "text", v)} />
      <InputField label="Href" value={data.ctaSecondary.href} onChange={(v) => updateCta("ctaSecondary", "href", v)} />

      <div className="cms-subsection-title">
        Stats
        <button className="cms-btn-add" onClick={addStat}><IconPlus /> Add Stat</button>
      </div>
      {data.stats.map((stat, i) => (
        <CollapsibleCard key={i} title={stat.label || `Stat ${i + 1}`} defaultOpen={false} onDelete={() => removeStat(i)}>
          <InputField label="Value" value={stat.value} onChange={(v) => updateStat(i, "value", v)} placeholder="e.g. 50+" />
          <InputField label="Label" value={stat.label} onChange={(v) => updateStat(i, "label", v)} placeholder="e.g. Projects Delivered" />
        </CollapsibleCard>
      ))}
    </div>
  );
}

function ItemListEditor<T extends Record<string, string>>({
  data,
  onChange,
  fields,
  itemLabel,
  createNew,
}: {
  data: { sectionTitle: string; sectionSubtitle: string; items: T[] };
  onChange: (d: { sectionTitle: string; sectionSubtitle: string; items: T[] }) => void;
  fields: { key: keyof T; label: string; multiline?: boolean }[];
  itemLabel: (item: T, i: number) => string;
  createNew: () => T;
}) {
  const updateField = (key: string, value: string) => onChange({ ...data, [key]: value });
  const updateItem = (index: number, key: keyof T, value: string) => {
    const items = [...data.items];
    items[index] = { ...items[index], [key]: value };
    onChange({ ...data, items });
  };
  const addItem = () => onChange({ ...data, items: [...data.items, createNew()] });
  const removeItem = (i: number) => onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });

  return (
    <div className="cms-editor-grid">
      <InputField label="Section Title" value={data.sectionTitle} onChange={(v) => updateField("sectionTitle", v)} />
      <InputField label="Section Subtitle" value={data.sectionSubtitle} onChange={(v) => updateField("sectionSubtitle", v)} multiline />
      <div className="cms-subsection-title">
        Items ({data.items.length})
        <button className="cms-btn-add" onClick={addItem}><IconPlus /> Add Item</button>
      </div>
      {data.items.map((item, i) => (
        <CollapsibleCard key={i} title={itemLabel(item, i)} badge={`#${i + 1}`} onDelete={() => removeItem(i)}>
          {fields.map((f) => (
            <InputField
              key={String(f.key)}
              label={f.label}
              value={item[f.key] as string}
              onChange={(v) => updateItem(i, f.key, v)}
              multiline={f.multiline}
            />
          ))}
        </CollapsibleCard>
      ))}
    </div>
  );
}

function CtaEditor({ data, onChange }: { data: CtaSection; onChange: (d: CtaSection) => void }) {
  return (
    <div className="cms-editor-grid">
      <InputField label="Title" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
      <InputField label="Subtitle" value={data.subtitle} onChange={(v) => onChange({ ...data, subtitle: v })} multiline />
      <div className="cms-subsection-title">Button</div>
      <InputField label="Text" value={data.button.text} onChange={(v) => onChange({ ...data, button: { ...data.button, text: v } })} />
      <InputField label="Href" value={data.button.href} onChange={(v) => onChange({ ...data, button: { ...data.button, href: v } })} />
    </div>
  );
}

function ContactEditor({ data, onChange }: { data: ContactSection; onChange: (d: ContactSection) => void }) {
  const update = (key: keyof ContactSection, v: string) => onChange({ ...data, [key]: v });
  return (
    <div className="cms-editor-grid">
      <InputField label="Section Title" value={data.sectionTitle} onChange={(v) => update("sectionTitle", v)} />
      <InputField label="Section Subtitle" value={data.sectionSubtitle} onChange={(v) => update("sectionSubtitle", v)} multiline />
      <InputField label="Email" value={data.email} onChange={(v) => update("email", v)} type="email" />
      <InputField label="Phone" value={data.phone} onChange={(v) => update("phone", v)} />
      <InputField label="Address" value={data.address} onChange={(v) => update("address", v)} />
      <InputField label="Form Button Text" value={data.formButton} onChange={(v) => update("formButton", v)} />
    </div>
  );
}

function FooterEditor({ data, onChange }: { data: FooterSection; onChange: (d: FooterSection) => void }) {
  const addNav = () => onChange({ ...data, navigation: [...data.navigation, { label: "", href: "" }] });
  const removeNav = (i: number) => onChange({ ...data, navigation: data.navigation.filter((_, idx) => idx !== i) });
  const updateNav = (i: number, key: keyof FooterNav, v: string) => {
    const nav = [...data.navigation];
    nav[i] = { ...nav[i], [key]: v };
    onChange({ ...data, navigation: nav });
  };
  const addSocial = () => onChange({ ...data, social: [...data.social, { platform: "", url: "", label: "" }] });
  const removeSocial = (i: number) => onChange({ ...data, social: data.social.filter((_, idx) => idx !== i) });
  const updateSocial = (i: number, key: keyof FooterSocial, v: string) => {
    const social = [...data.social];
    social[i] = { ...social[i], [key]: v };
    onChange({ ...data, social });
  };

  return (
    <div className="cms-editor-grid">
      <InputField label="Description" value={data.description} onChange={(v) => onChange({ ...data, description: v })} multiline />
      <InputField label="Copyright" value={data.copyright} onChange={(v) => onChange({ ...data, copyright: v })} />

      <div className="cms-subsection-title">
        Navigation Links ({data.navigation.length})
        <button className="cms-btn-add" onClick={addNav}><IconPlus /> Add Link</button>
      </div>
      {data.navigation.map((nav, i) => (
        <CollapsibleCard key={i} title={nav.label || `Link ${i + 1}`} onDelete={() => removeNav(i)}>
          <InputField label="Label" value={nav.label} onChange={(v) => updateNav(i, "label", v)} />
          <InputField label="Href" value={nav.href} onChange={(v) => updateNav(i, "href", v)} />
        </CollapsibleCard>
      ))}

      <div className="cms-subsection-title">
        Social Links ({data.social.length})
        <button className="cms-btn-add" onClick={addSocial}><IconPlus /> Add Social</button>
      </div>
      {data.social.map((s, i) => (
        <CollapsibleCard key={i} title={s.label || `Social ${i + 1}`} onDelete={() => removeSocial(i)}>
          <InputField label="Platform" value={s.platform} onChange={(v) => updateSocial(i, "platform", v)} placeholder="github, linkedin, etc." />
          <InputField label="URL" value={s.url} onChange={(v) => updateSocial(i, "url", v)} type="url" />
          <InputField label="Label" value={s.label} onChange={(v) => updateSocial(i, "label", v)} />
        </CollapsibleCard>
      ))}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────
export default function AdminPage() {
  const [data, setData] = useState<SiteData | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("site");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [branch, setBranch] = useState("");
  const [devMode, setDevMode] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/site");
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json.data);
      setBranch(json.branch);
      setDevMode(json.devMode);
      setOriginalData(JSON.stringify(json.data));
      setHasChanges(false);
    } catch (err) {
      showToast(`Failed to load data: ${err}`, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Track changes
  useEffect(() => {
    if (data && originalData) {
      setHasChanges(JSON.stringify(data) !== originalData);
    }
  }, [data, originalData]);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, commitMessage: commitMessage || undefined }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);

      setOriginalData(JSON.stringify(data));
      setHasChanges(false);
      setCommitMessage("");

      if (json.devMode) {
        showToast("✅ Saved locally (Dev Mode — no git commit)", "success");
      } else if (json.gitResult?.success) {
        showToast("✅ Saved & pushed to master!", "success");
      } else {
        showToast(`⚠️ Saved locally but git push failed: ${json.gitResult?.error}`, "error");
      }
    } catch (err) {
      showToast(`❌ Save failed: ${err}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const updateSection = <K extends keyof SiteData>(key: K, value: SiteData[K]) => {
    if (!data) return;
    setData({ ...data, [key]: value });
  };

  if (loading) {
    return (
      <div className="cms-loading">
        <div className="cms-spinner" />
        <p>Loading CMS...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="cms-loading">
        <p style={{ color: "#ef4444" }}>Failed to load data</p>
        <button className="cms-btn-primary" onClick={fetchData}>
          <IconRefresh /> Retry
        </button>
      </div>
    );
  }

  const renderEditor = () => {
    switch (activeSection) {
      case "site":
        return <SiteEditor data={data.site} onChange={(d) => updateSection("site", d)} />;
      case "hero":
        return <HeroEditor data={data.hero} onChange={(d) => updateSection("hero", d)} />;
      case "services":
        return (
          <ItemListEditor
            data={data.services}
            onChange={(d) => updateSection("services", d as ServicesSection)}
            fields={[
              { key: "icon", label: "Icon" },
              { key: "title", label: "Title" },
              { key: "description", label: "Description", multiline: true },
            ]}
            itemLabel={(item) => item.title || "Untitled Service"}
            createNew={() => ({ icon: "", title: "", description: "" })}
          />
        );
      case "whyUs":
        return (
          <ItemListEditor
            data={data.whyUs}
            onChange={(d) => updateSection("whyUs", d as WhyUsSection)}
            fields={[
              { key: "icon", label: "Icon" },
              { key: "title", label: "Title" },
              { key: "description", label: "Description", multiline: true },
            ]}
            itemLabel={(item) => item.title || "Untitled"}
            createNew={() => ({ icon: "", title: "", description: "" })}
          />
        );
      case "portfolio":
        return (
          <ItemListEditor
            data={data.portfolio}
            onChange={(d) => updateSection("portfolio", d as PortfolioSection)}
            fields={[
              { key: "image", label: "Image Path" },
              { key: "title", label: "Title" },
              { key: "category", label: "Category" },
              { key: "description", label: "Description", multiline: true },
              { key: "problem", label: "Problem", multiline: true },
              { key: "solution", label: "Solution", multiline: true },
              { key: "result", label: "Result", multiline: true },
            ]}
            itemLabel={(item) => item.title || "Untitled Project"}
            createNew={() => ({ image: "", title: "", category: "", description: "", problem: "", solution: "", result: "" })}
          />
        );
      case "testimonials":
        return (
          <ItemListEditor
            data={data.testimonials}
            onChange={(d) => updateSection("testimonials", d as TestimonialsSection)}
            fields={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "message", label: "Message", multiline: true },
              { key: "avatar", label: "Avatar (Initials)" },
            ]}
            itemLabel={(item) => item.name || "Untitled Testimonial"}
            createNew={() => ({ name: "", role: "", message: "", avatar: "" })}
          />
        );
      case "cta":
        return <CtaEditor data={data.cta} onChange={(d) => updateSection("cta", d)} />;
      case "contact":
        return <ContactEditor data={data.contact} onChange={(d) => updateSection("contact", d)} />;
      case "footer":
        return <FooterEditor data={data.footer} onChange={(d) => updateSection("footer", d)} />;
      default:
        return null;
    }
  };

  const activeLabel = SECTIONS.find((s) => s.key === activeSection)?.label || "";
  const activeIcon = SECTIONS.find((s) => s.key === activeSection)?.icon || "";

  return (
    <div className="cms-root">
      {/* TOAST */}
      {toast && (
        <div className={`cms-toast cms-toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* TOPBAR */}
      <header className="cms-topbar">
        <div className="cms-topbar-left">
          <button className="cms-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="cms-topbar-brand">
            <span className="cms-topbar-logo">⚡</span>
            <span className="cms-topbar-title">Frogobox CMS</span>
          </div>
        </div>
        <div className="cms-topbar-right">
          <div className="cms-branch-badge">
            <span className={`cms-branch-dot ${devMode ? "cms-branch-dot-dev" : "cms-branch-dot-prod"}`} />
            <span className="cms-branch-text">{branch}</span>
            {devMode && <span className="cms-dev-tag">DEV</span>}
          </div>
          {hasChanges && (
            <span className="cms-unsaved-badge">● Unsaved</span>
          )}
          <button
            className="cms-btn-primary cms-save-btn"
            onClick={handleSave}
            disabled={saving || !hasChanges}
          >
            {saving ? (
              <span className="cms-spinner-sm" />
            ) : (
              <IconSave />
            )}
            {saving ? "Saving..." : devMode ? "Save (Local)" : "Save & Push"}
          </button>
        </div>
      </header>

      <div className="cms-layout">
        {/* SIDEBAR */}
        <aside className={`cms-sidebar ${sidebarOpen ? "cms-sidebar-open" : "cms-sidebar-closed"}`}>
          <nav className="cms-nav">
            {SECTIONS.map((sec) => (
              <button
                key={sec.key}
                className={`cms-nav-item ${activeSection === sec.key ? "cms-nav-item-active" : ""}`}
                onClick={() => {
                  setActiveSection(sec.key);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
              >
                <span className="cms-nav-icon">{sec.icon}</span>
                <span className="cms-nav-label">{sec.label}</span>
              </button>
            ))}
          </nav>

          {/* Commit message - only visible on non-dev mode */}
          {!devMode && (
            <div className="cms-commit-section">
              <label className="cms-label" style={{ fontSize: "0.7rem" }}>Commit Message</label>
              <textarea
                className="cms-input cms-textarea"
                rows={2}
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="chore: update site content"
                style={{ fontSize: "0.75rem" }}
              />
            </div>
          )}

          <div className="cms-sidebar-footer">
            <button className="cms-btn-ghost" onClick={fetchData}>
              <IconRefresh /> Reload Data
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="cms-main">
          <div className="cms-content-header">
            <span className="cms-content-icon">{activeIcon}</span>
            <h1 className="cms-content-title">{activeLabel}</h1>
          </div>
          <div className="cms-content-body">
            {renderEditor()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="cms-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
