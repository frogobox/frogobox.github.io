"use client";

import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Portfolio from "@/components/Portfolio";
import CEO from "@/components/CEO";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

function HomeContent() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <Hero data={t.hero} />
        <Services data={t.services} />
        <WhyUs data={t.whyUs} />
        <Portfolio data={t.portfolio} />
        <CEO data={t.ceo} />
        <Testimonials data={t.testimonials} />
        <CTA data={t.cta} />
        <ContactForm data={t.contact} />
      </main>
      <Footer data={t.footer} siteName={t.site.name} />
    </>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
