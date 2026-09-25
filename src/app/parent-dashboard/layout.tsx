import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Dashboard | Mero Tutor",
  description: "Manage your home & online tuition requirements, browse & select verified tutors, and review Mero Tutor.",
};

export default function ParentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override root layout wrapper, standard fragment pattern
  return <>{children}</>;
}
