# Live At Probolinggo — Build Walkthrough

## Demo

![Website demo recording](C:\Users\tech\.gemini\antigravity\brain\31fd75c3-1403-4fb2-8dc1-290fe240f176\website_demo.webp)

---

## What Was Built

A high-converting, responsive company profile website for **Live At Probolinggo** with:

- ✅ YouTube background hero video (configurable via JSON)
- ✅ Service directory with 6 categories, search, and category filters
- ✅ Testimonials carousel with auto-scroll
- ✅ CTA section with WhatsApp deep-link
- ✅ Dark/Light mode toggle with persistence
- ✅ Mobile-first responsive design
- ✅ JSON-based CMS with API route
- ✅ SEO-optimized metadata
- ✅ PWA support (Serwist)

---

## Folder Architecture

```
app/
├── layout.tsx                  # Root layout (Inter font, SEO, ThemeProvider)
├── page.tsx                    # Server Component — reads JSON, assembles sections
├── globals.css                 # Tailwind v4 design system + animations
├── manifest.ts                 # PWA manifest
├── sw.ts                       # Service worker (unchanged)
├── api/
│   └── cms/
│       └── route.ts            # GET/POST JSON CMS API
├── components/
│   ├── ThemeProvider.tsx        # Dark/light context + localStorage
│   ├── ThemeToggle.tsx          # Animated Sun/Moon button
│   ├── Navbar.tsx               # Sticky glass morphism nav + mobile drawer
│   ├── HeroSection.tsx          # YouTube video background hero
│   ├── DataSection.tsx          # Service directory with filters + accordion
│   ├── ServiceCard.tsx          # Contact card (call + WhatsApp)
│   ├── TestimonialSection.tsx   # Auto-scrolling testimonial carousel
│   ├── TestimonialCard.tsx      # Testimonial card with stars + photo
│   ├── CTASection.tsx           # Lead generation CTA
│   └── Footer.tsx               # Site footer
data/
├── site.json                   # Site config (name, tagline, YouTube ID)
├── services.json               # Service categories + contacts
├── testimonials.json           # Client testimonials
└── cta.json                    # CTA section content
public/
└── images/
    └── testimonials/           # AI-generated client photos
```

---

## How to Run

```bash
# Install dependencies (if not already)
npm install

# Development
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

---

## JSON CMS Usage

### Edit content directly
Edit any file in the `data/` directory:

| File | Content |
|------|---------|
| [site.json](file:///d:/WebstormProjects/live-at-probolinggo/data/site.json) | Site name, tagline, YouTube video ID, SEO |
| [services.json](file:///d:/WebstormProjects/live-at-probolinggo/data/services.json) | Service categories and contact lists |
| [testimonials.json](file:///d:/WebstormProjects/live-at-probolinggo/data/testimonials.json) | Client testimonials with photos |
| [cta.json](file:///d:/WebstormProjects/live-at-probolinggo/data/cta.json) | CTA heading, description, WhatsApp number |

### Via API (Save = commit to project)

**Read data:**
```bash
GET /api/cms?file=services.json
```

**Save data:**
```bash
POST /api/cms
Content-Type: application/json

{
  "file": "services.json",
  "data": [ ... updated service data ... ]
}
```

> [!IMPORTANT]
> The CMS API writes directly to files in your project. After saving via API, `git commit` the changes to persist.

---

## Key Design Decisions

1. **Server Component page** — `page.tsx` reads JSON via `fs` at request time (no API calls), passing data as props to interactive Client Components
2. **Tailwind CSS v4** — uses `@theme inline` for design tokens, no `tailwind.config.js`
3. **FOUC prevention** — inline `<script>` in `<head>` checks `localStorage` before React hydrates to prevent dark mode flash
4. **No external animation libraries** — all animations are pure CSS keyframes to keep bundle small

---

## Verification Results

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Exit code 0, no errors |
| All pages render | ✅ 200 status |
| Dark/Light toggle | ✅ Smooth transitions, persisted |
| Mobile responsive | ✅ Hamburger menu, accordion layout |
| Testimonial carousel | ✅ Auto-scroll, pause on hover |
| Service search/filter | ✅ Real-time filtering works |
| WhatsApp links | ✅ Deep links with pre-filled message |
