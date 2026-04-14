import siteData from "@/data/site.json";

export type SiteData = typeof siteData;

export function getSiteData(): SiteData {
  return siteData;
}

export function getHeroData() {
  return siteData.hero;
}

export function getServicesData() {
  return siteData.services;
}

export function getWhyUsData() {
  return siteData.whyUs;
}

export function getPortfolioData() {
  return siteData.portfolio;
}

export function getTestimonialsData() {
  return siteData.testimonials;
}

export function getCtaData() {
  return siteData.cta;
}

export function getContactData() {
  return siteData.contact;
}

export function getFooterData() {
  return siteData.footer;
}

export function getSiteMeta() {
  return siteData.site;
}
