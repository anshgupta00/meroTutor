"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TutorCard from "@/components/tutors/TutorCard";
import RequestTutorModal from "@/components/modals/RequestTutorModal";
import { TUTORS } from "@/data/tutors";
import type { Tutor } from "@/types/tutor";

export default function FeaturedTutors() {
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const featured = TUTORS.filter((t) => t.isVerified).slice(0, 6);

  return (
    <section className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-800 text-brand-navy mb-2">
              Meet Our Tutors
            </h2>
            <p className="text-brand-text">
              Verified, experienced teachers ready to help your child succeed.
            </p>
          </div>
          <Link href="/find-tutor" className="hidden sm:flex items-center gap-1 text-brand-blue font-600 text-sm hover:underline">
            View all tutors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onRequest={setSelectedTutor}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue-light rounded-full px-7">
            <Link href="/find-tutor">
              View All Tutors
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      <RequestTutorModal
        tutor={selectedTutor}
        open={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
      />
    </section>
  );
}
