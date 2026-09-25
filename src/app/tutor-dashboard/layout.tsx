import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Dashboard | Mero Tutor",
  description: "Manage your tutor profile, CV, job applications, and more on Mero Tutor.",
};

export default function TutorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override the root layout so the site Header/Footer don't render here.
  // We return a fragment-style wrapper; the root <html>/<body> are already set.
  return <>{children}</>;
}
