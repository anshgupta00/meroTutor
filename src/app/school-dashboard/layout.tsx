import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School & College Dashboard | Mero Tutor",
  description: "Post vacancies, manage faculty hiring requests, browse verified tutors, and update institution profile on Mero Tutor.",
};

export default function SchoolDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
