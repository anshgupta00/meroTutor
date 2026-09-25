"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import TutorCard from "@/components/tutors/TutorCard";
import RequestTutorModal from "@/components/modals/RequestTutorModal";
import { TUTORS } from "@/data/tutors";
import type { Tutor } from "@/types/tutor";

export default function FeaturedTutors() {
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const featured = TUTORS.filter((t) => t.isVerified).slice(0, 6);

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-[700] px-3.5 py-1.5 rounded-full mb-3 border border-blue-100">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>VERIFIED EDUCATORS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-[900] text-slate-900 tracking-tight">
              Meet Our Top Tutors
            </h2>
            <p className="text-base text-slate-600 font-[500] mt-2 max-w-2xl leading-relaxed">
              Verified, highly qualified teachers ready to help your child succeed with home tuition and online classes across Nepal.
            </p>
          </div>

          <Link
            href="/find-tutor"
            className="inline-flex items-center gap-1.5 text-sm font-[700] text-blue-600 hover:text-blue-700 hover:gap-2 transition-all self-start md:self-end"
          >
            <span>View all verified tutors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onRequest={setSelectedTutor}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-slate-300 text-slate-800 hover:text-blue-600 hover:border-blue-300 hover:bg-white rounded-2xl px-8 py-6 text-sm font-[700] shadow-xs"
          >
            <Link href="/find-tutor" className="flex items-center gap-2">
              Browse All Tutors Across Nepal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Modal */}
      <RequestTutorModal
        tutor={selectedTutor}
        open={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
      />
    </section>
  );
}
