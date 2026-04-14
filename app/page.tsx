import { getSiteData } from "@/lib/getData";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  const data = getSiteData();

  return (
    <>
      <Navbar />
      <main>
        <Hero data={data.hero} />
        <Services data={data.services} />
        <WhyUs data={data.whyUs} />
        <Portfolio data={data.portfolio} />
        <Testimonials data={data.testimonials} />
        <CTA data={data.cta} />
        <ContactForm data={data.contact} />
      </main>
      <Footer data={data.footer} siteName={data.site.name} />
    </>
  );
}
