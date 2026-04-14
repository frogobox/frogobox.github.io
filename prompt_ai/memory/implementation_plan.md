# Live At Probolinggo — Company Profile Website

Build a high-converting, modern company profile website with JSON-based CMS, dark/light mode, and responsive mobile-first design.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.3 |
| Styling | Tailwind CSS | v4 |
| Font | Inter (Google Fonts) | latest |
| PWA | Serwist | 9.5.7 (existing) |
| CMS | JSON files + API route | — |

---

## Proposed Changes

### Folder Architecture

```
app/
├── layout.tsx                  # Root layout (ThemeProvider, fonts, nav, footer)
├── page.tsx                    # Landing page (assembles all sections)
├── globals.css                 # Tailwind v4 + design tokens
├── manifest.ts                 # PWA manifest (update)
├── sw.ts                       # Service worker (keep)
├── favicon.ico                 # Keep
├── api/
│   └── cms/
│       └── route.ts            # [NEW] API route POST to save JSON data
├── components/
│   ├── Navbar.tsx              # [NEW] Sticky navigation bar
│   ├── ThemeProvider.tsx       # [NEW] Dark/light mode context provider
│   ├── ThemeToggle.tsx         # [NEW] Sun/Moon toggle button
│   ├── HeroSection.tsx         # [NEW] YouTube background video hero
│   ├── DataSection.tsx         # [NEW] Service directory with grouped cards
│   ├── ServiceCard.tsx         # [NEW] Individual service contact card
│   ├── TestimonialSection.tsx  # [NEW] Testimonials carousel/grid
│   ├── TestimonialCard.tsx     # [NEW] Single testimonial card
│   ├── CTASection.tsx          # [NEW] Call-to-action / lead generation
│   └── Footer.tsx              # [NEW] Site footer
data/
├── site.json                   # [NEW] Site-wide config (title, tagline, YouTube URL)
├── services.json               # [NEW] Service categories + contact data
├── testimonials.json           # [NEW] Client testimonials
└── cta.json                    # [NEW] CTA section content
public/
├── images/
│   └── testimonials/           # [NEW] Testimonial client photos (generated)
```

---

### JSON CMS Data Schemas

#### [NEW] [site.json](file:///d:/WebstormProjects/live-at-probolinggo/data/site.json)
```json
{
  "siteName": "Live At Probolinggo",
  "tagline": "Dari Warga Untuk Warga",
  "heroYoutubeId": "VIDEO_ID_HERE",
  "heroOverlayOpacity": 0.6,
  "heroSubtitle": "Portal layanan warga Probolinggo..."
}
```

#### [NEW] [services.json](file:///d:/WebstormProjects/live-at-probolinggo/data/services.json)
Array of service categories, each with a list of contacts:
```json
[
  {
    "id": "tukang-bangunan",
    "category": "Tukang Bangunan",
    "icon": "🏗️",
    "contacts": [
      { "name": "Pak Ahmad", "phone": "081234567890", "address": "Jl. Suroyo No. 12" }
    ]
  }
]
```
Dummy categories: Tukang Bangunan, Pengangkut Air, Terapis Pijat, Tukang Ledeng, Jasa Kebersihan, Bengkel Motor.

#### [NEW] [testimonials.json](file:///d:/WebstormProjects/live-at-probolinggo/data/testimonials.json)
```json
[
  {
    "id": "1",
    "name": "Siti Rahayu",
    "role": "Ibu Rumah Tangga",
    "photo": "/images/testimonials/client1.webp",
    "content": "Sangat membantu menemukan tukang..."
  }
]
```

#### [NEW] [cta.json](file:///d:/WebstormProjects/live-at-probolinggo/data/cta.json)
```json
{
  "heading": "Punya Keahlian? Daftarkan Dirimu!",
  "description": "Jangkau lebih banyak warga...",
  "buttonText": "Daftar Sekarang",
  "buttonLink": "https://wa.me/6281234567890",
  "whatsappNumber": "6281234567890"
}
```

---

### Component Details

#### [MODIFY] [layout.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/layout.tsx)
- Switch font from Geist to **Inter**
- Wrap children with `<ThemeProvider>`
- Add `<Navbar />` and `<Footer />`
- Update metadata for SEO (title: "Live At Probolinggo", description, Open Graph)
- Set `lang="id"` for Indonesian locale

#### [MODIFY] [page.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/page.tsx)
- Server component that reads all JSON data files with `fs.readFileSync`
- Assembles `<HeroSection>`, `<DataSection>`, `<TestimonialSection>`, `<CTASection>`
- Passes JSON data as props to each section

#### [MODIFY] [globals.css](file:///d:/WebstormProjects/live-at-probolinggo/app/globals.css)
- Tailwind v4 design tokens via `@theme inline`
- Custom color palette (warm, professional tones)
- Dark mode variables using `.dark` class strategy
- Smooth scroll behavior
- Custom scrollbar styling
- Glass morphism utilities
- Animation keyframes (fade-in, slide-up)

#### [NEW] [ThemeProvider.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/ThemeProvider.tsx)
- Client component (`'use client'`)
- React context for theme state (`light` / `dark`)
- Persists preference in `localStorage`
- Toggles `.dark` class on `<html>` element
- Respects `prefers-color-scheme` on first visit

#### [NEW] [ThemeToggle.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/ThemeToggle.tsx)
- Client component, animated Sun ↔ Moon icon toggle
- Uses ThemeContext

#### [NEW] [Navbar.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/Navbar.tsx)
- Client component (scroll detection for glass effect)
- Sticky top, glass morphism background on scroll
- Logo + site name, navigation links (Home, Layanan, Testimoni, Kontak)
- Theme toggle button
- Mobile hamburger menu with slide-in drawer

#### [NEW] [HeroSection.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/HeroSection.tsx)
- Client component (YouTube iframe embed)
- YouTube video as background (muted, autoplay, loop via embed params)
- Dark overlay with gradient
- Large title + tagline with fade-in animation
- Scroll-down indicator arrow

#### [NEW] [DataSection.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/DataSection.tsx)
- Client component (for accordion/filter interaction)
- Section title "Direktori Layanan"
- Category filter tabs at top
- Grouped list of service cards, accordion-style expand/collapse per category
- Search/filter functionality

#### [NEW] [ServiceCard.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/ServiceCard.tsx)
- Reusable card showing: Name, Phone (click-to-call link), Address
- Soft shadow, rounded corners
- WhatsApp quick-link icon

#### [NEW] [TestimonialSection.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/TestimonialSection.tsx)
- Client component (auto-scroll carousel)
- Horizontal scrollable card grid
- Auto-scroll with pause on hover

#### [NEW] [TestimonialCard.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/TestimonialCard.tsx)
- Client photo (circular), name, role, quote
- Star rating display
- Soft shadow, glass effect on dark mode

#### [NEW] [CTASection.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/CTASection.tsx)
- Gradient background section
- Heading, description, WhatsApp CTA button
- Subtle floating animation on button

#### [NEW] [Footer.tsx](file:///d:/WebstormProjects/live-at-probolinggo/app/components/Footer.tsx)
- Site name, copyright
- Quick links, social media icons
- Dark/glass styling

#### [NEW] [api/cms/route.ts](file:///d:/WebstormProjects/live-at-probolinggo/app/api/cms/route.ts)
- POST handler that receives JSON body `{ file: "services.json", data: {...} }`
- Writes to `data/{file}` using `fs.writeFileSync`
- Returns success/error response

> [!IMPORTANT]
> The CMS save API writes directly to the project's `data/` directory. As noted in the requirements, "Save = commit to project". This API is intended for **local development use only** — it should NOT be exposed in production without authentication.

#### [MODIFY] [manifest.ts](file:///d:/WebstormProjects/live-at-probolinggo/app/manifest.ts)
- Update app name to "Live At Probolinggo"
- Update theme colors to match design palette

---

### Design System

| Token | Light | Dark |
|-------|-------|------|
| Background | `#FAFAFA` | `#0F172A` |
| Surface | `#FFFFFF` | `#1E293B` |
| Primary | `#2563EB` (blue-600) | `#3B82F6` (blue-500) |
| Accent | `#F59E0B` (amber-500) | `#FBBF24` (amber-400) |
| Text primary | `#1E293B` | `#F1F5F9` |
| Text secondary | `#64748B` | `#94A3B8` |
| Border | `#E2E8F0` | `#334155` |

Typography: **Inter** — clean, modern, excellent readability.

---

## User Review Required

> [!IMPORTANT]
> **YouTube Video ID**: I'll use a placeholder Probolinggo-related video ID. Please provide the actual YouTube video ID you want in the hero section, or you can update it later via `data/site.json`.

> [!WARNING]
> **CMS API Security**: The `/api/cms` endpoint writes files directly to disk. This is designed for local development only. No authentication is included by default. Do not deploy to production without adding proper auth.

---

## Open Questions

1. **YouTube Video**: Do you have a specific YouTube video ID for the hero background? I'll use a generic Probolinggo tourism video as placeholder.
2. **WhatsApp Number**: The CTA section links to WhatsApp. Should I use a placeholder number, or do you have one?
3. **Tailwind CSS Version**: The project already has Tailwind CSS v4 installed. Confirming we should use v4 (which uses `@theme` and `@import "tailwindcss"` syntax instead of `tailwind.config.js`).

---

## Verification Plan

### Automated Tests
- `npm run build` — verify production build succeeds with no errors
- `npm run dev` — verify dev server starts and renders correctly

### Manual Verification
- Browser test: Navigate all sections, verify responsive layout on mobile/tablet/desktop
- Toggle dark/light mode and verify all sections render correctly
- Click service phone numbers (verify `tel:` links)
- Test CMS API by POST-ing data and verifying JSON file updates
- Test YouTube video embed loads and plays
