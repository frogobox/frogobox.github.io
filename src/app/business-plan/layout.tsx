import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposal Kemitraan Bisnis Play Store & AdMob — Frogobox",
  description:
    "Proposal Kemitraan Pengelolaan Akun & Aplikasi Android Google Play Store dan Google AdMob bersama Frogobox Media.",
  openGraph: {
    title: "Proposal Kemitraan Bisnis Play Store & AdMob — Frogobox",
    description:
      "Proposal Kemitraan Pengelolaan Akun & Aplikasi Android Google Play Store dan Google AdMob bersama Frogobox Media.",
    type: "website",
  },
};

export default function BusinessPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
