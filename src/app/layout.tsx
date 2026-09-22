import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Mero Tutor | Find Trusted Home Tutors in Kathmandu",
    template: "%s | Mero Tutor",
  },
  description:
    "Find trusted home tutors and online tutors in Kathmandu Valley, Nepal. Mero Tutor connects students and parents with verified, experienced teachers for home tuition and online classes.",
  keywords: [
    "home tutor Kathmandu",
    "home tuition Nepal",
    "private tutor Kathmandu",
    "online tuition Nepal",
    "tutor for students Kathmandu",
    "Mero Tutor",
  ],
  openGraph: {
    title: "Mero Tutor | Trusted Home Tutors in Kathmandu",
    description:
      "Find the right tutor for your child in Kathmandu Valley. Home tuition and online tuition available.",
    type: "website",
    locale: "en_NP",
    siteName: "Mero Tutor",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
