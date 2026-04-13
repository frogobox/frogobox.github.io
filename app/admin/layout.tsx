import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS Admin — Frogobox",
  description: "Content Management System for Frogobox Media Id",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
