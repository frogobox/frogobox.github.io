import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { getSiteMeta } from "@/lib/getData";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const site = getSiteMeta();

export const metadata: Metadata = {
  metadataBase: new URL(site.url || "https://frogoboxmedia.com"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Frogobox",
    "Frogobox Media Indonesia",
    "Frogobox Instagram",
    "@frogobox",
    "https://www.instagram.com/frogobox/",
    "IT consulting",
    "software development",
    "web development",
    "mobile app development",
    "Android development",
    "iOS development",
    "Flutter development",
    "React development",
    "Next.js",
    "cloud solutions",
    "cybersecurity",
    "digital transformation",
    "konsultan IT Indonesia",
    "jasa pembuatan aplikasi",
    "jasa pembuatan website",
    "software house Indonesia",
    "developer Android Indonesia",
  ],
  authors: [{ name: site.name, url: site.url || "https://frogoboxmedia.com" }],
  creator: site.name,
  publisher: site.name,
  category: "Technology & Software Development",
  alternates: {
    canonical: site.url || "https://frogoboxmedia.com",
    languages: {
      "en-US": site.url || "https://frogoboxmedia.com",
      "id-ID": site.url || "https://frogoboxmedia.com",
    },
  },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url || "https://frogoboxmedia.com",
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/logo-color.png",
        width: 1200,
        height: 630,
        alt: `${site.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    site: "@frogobox",
    creator: "@frogobox",
    images: ["/images/logo-color.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: site.name,
  },
  icons: {
    icon: "/images/logo-color.png",
    shortcut: "/images/logo-color.png",
    apple: "/images/logo-color.png",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url || "https://frogoboxmedia.com"}/#organization`,
    name: site.name,
    alternateName: ["Frogobox", "Frogobox Media", "@frogobox"],
    url: site.url || "https://frogoboxmedia.com",
    logo: `${site.url || "https://frogoboxmedia.com"}/images/logo-color.png`,
    description: site.description,
    sameAs: [
      "https://www.instagram.com/frogobox/",
      "https://github.com/frogobox",
      "https://linkedin.com/company/frogobox",
      "https://youtube.com/@frogobox",
    ],
    knowsAbout: [
      "Software Development",
      "Mobile App Development",
      "Android Apps",
      "iOS Apps",
      "Web Development",
      "Cloud Solutions",
      "IT Consulting",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+6281357108568",
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["Indonesian", "English"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url || "https://frogoboxmedia.com"}/#website`,
    url: site.url || "https://frogoboxmedia.com",
    name: site.name,
    alternateName: ["Frogobox Website", "Frogobox Media Indonesia"],
    publisher: {
      "@id": `${site.url || "https://frogoboxmedia.com"}/#organization`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url || "https://frogoboxmedia.com"}/#service`,
    name: site.name,
    url: site.url || "https://frogoboxmedia.com",
    logo: `${site.url || "https://frogoboxmedia.com"}/images/logo-color.png`,
    image: `${site.url || "https://frogoboxmedia.com"}/images/logo-color.png`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: "Indonesia",
    },
    priceRange: "$$",
    sameAs: [
      "https://www.instagram.com/frogobox/",
      "https://github.com/frogobox",
      "https://linkedin.com/company/frogobox",
      "https://youtube.com/@frogobox",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://www.instagram.com/frogobox/#profile",
    url: "https://www.instagram.com/frogobox/",
    name: "Frogobox Media Instagram Official",
    mainEntity: {
      "@id": `${site.url || "https://frogoboxmedia.com"}/#organization`,
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

