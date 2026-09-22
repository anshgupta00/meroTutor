"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, GraduationCap, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tutor } from "@/types/tutor";

interface TutorCardProps {
  tutor: Tutor;
  onRequest?: (tutor: Tutor) => void;
}

const modeLabel: Record<string, string> = {
  home: "Home Tuition",
  online: "Online",
  both: "Home & Online",
};

export default function TutorCard({ tutor, onRequest }: TutorCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-brand-border/70 hover:border-brand-blue/40 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Top Header Row */}
        <div className="p-5 pb-4">
          <div className="flex items-start gap-4">
            {/* Avatar with status indicator */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-brand-blue-light ring-2 ring-brand-blue-light group-hover:ring-brand-blue/30 transition-all">
                <Image
                  src={tutor.photo}
                  alt={tutor.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {tutor.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-brand-teal text-white p-1 rounded-full shadow-xs" title="Verified Tutor">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h3 className="font-800 text-brand-navy text-lg leading-snug group-hover:text-brand-blue transition-colors truncate">
                  {tutor.name}
                </h3>
              </div>
              <p className="text-xs font-600 text-brand-muted truncate mt-0.5">
                {tutor.qualification}
              </p>

              {/* Rating & Experience */}
              <div className="flex items-center gap-2 mt-2 flex-wrap text-xs">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md font-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{tutor.rating.toFixed(1)}</span>
                  <span className="text-amber-600 font-500">({tutor.reviewCount})</span>
                </div>
                <span className="text-brand-muted font-600 bg-gray-100 px-2 py-0.5 rounded-md">
                  {tutor.experience} Yrs Exp.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Essential Info Chips (Subjects & Mode) */}
        <div className="px-5 py-3 border-y border-gray-100 bg-slate-50/50 space-y-2.5">
          {/* Subjects */}
          <div className="flex items-center gap-2 text-xs">
            <GraduationCap className="w-4 h-4 text-brand-teal flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {tutor.subjects.slice(0, 3).map((sub) => (
                <span key={sub} className="bg-brand-blue-light/60 text-brand-blue font-700 px-2 py-0.5 rounded-md text-[11px]">
                  {sub}
                </span>
              ))}
              {tutor.subjects.length > 3 && (
                <span className="bg-gray-100 text-gray-600 font-600 px-1.5 py-0.5 rounded-md text-[11px]">
                  +{tutor.subjects.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Mode Pill */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="text-brand-muted font-600">Mode:</span>
            <span className="font-700 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {modeLabel[tutor.mode] || "Home & Online"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="p-4 bg-white flex items-center justify-between gap-2 border-t border-slate-50">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs font-700 border-brand-border text-brand-navy hover:text-brand-blue hover:border-brand-blue rounded-xl py-2.5 h-auto"
          asChild
        >
          <Link href={`/tutor/${tutor.id}`}>View Profile</Link>
        </Button>

        <Button
          size="sm"
          className="flex-1 text-xs font-800 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl py-2.5 h-auto shadow-sm"
          onClick={() => onRequest?.(tutor)}
        >
          Request Tutor
        </Button>
      </div>
    </div>
  );
}
