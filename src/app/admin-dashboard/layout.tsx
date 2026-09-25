import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Mero Tutor Control Center",
  description: "Verify vacancies, manage parent & school posts, review applications, moderate testimonials, and manage platform users.",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
