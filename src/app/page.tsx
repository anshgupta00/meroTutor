import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import HomeTuitionSection from "@/components/home/HomeTuitionSection";
import PartnerInstitutesSection from "@/components/home/PartnerInstitutesSection";
import OnlineTuitionSection from "@/components/home/OnlineTuitionSection";
import FeaturedTutors from "@/components/home/FeaturedTutors";
import StudentSuccessSection from "@/components/home/StudentSuccessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HelpCTA from "@/components/home/HelpCTA";

export const metadata: Metadata = {
  title: "Mero Tutor | Find Trusted Home Tutors in Kathmandu",
  description:
    "Find trusted home tutors and online tutors in Kathmandu Valley. Connect with verified, experienced teachers for home tuition and online classes.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeTuitionSection />
      <PartnerInstitutesSection />
      <OnlineTuitionSection />
      <FeaturedTutors />
      <StudentSuccessSection />
      <TestimonialsSection />
      <HelpCTA />
    </>
  );
}
