"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tutor } from "@/types/tutor";

interface TutorCardProps {
  tutor: Tutor;
  onRequest?: (tutor: Tutor) => void;
}

const modeLabel: Record<string, string> = {
  home: "Home Tuition",
  online: "Online Classes",
  both: "Home & Online",
};

export default function TutorCard({ tutor, onRequest }: TutorCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div className="p-5">
        {/* Top Header Row */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar with verified badge */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 group-hover:border-blue-300 transition-colors">
              <Image
                src={tutor.photo}
                alt={tutor.name}
                width={64}
                height={64}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {tutor.isVerified && (
              <div
                className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-sm ring-2 ring-white"
                title="Verified Tutor"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="flex-1 min-w-0">
            <h3 className="font-[800] text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors truncate">
              {tutor.name}
            </h3>
            <p className="text-xs font-[500] text-slate-500 truncate mt-0.5">
              {tutor.qualification}
            </p>

            {/* Rating & Experience */}
            <div className="flex items-center gap-2 mt-2 text-xs flex-wrap">
              <div className="inline-flex items-center gap-1 bg-amber-50 text-slate-800 px-2 py-0.5 rounded-md font-[700] text-[11px] border border-amber-200/60">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{tutor.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-[400]">({tutor.reviewCount})</span>
              </div>
              <span className="bg-slate-100 text-slate-600 font-[600] px-2 py-0.5 rounded-md text-[11px]">
                {tutor.experience} Yrs Exp
              </span>
            </div>
          </div>
        </div>

        {/* Teaching Mode */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-[600] text-slate-400">Tuition Mode</span>
          <span className="font-[600] text-blue-700 bg-blue-50/80 px-2.5 py-0.5 rounded-full text-[11px] border border-blue-100">
            {modeLabel[tutor.mode] || "Home & Online"}
          </span>
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-1">
          {tutor.subjects.slice(0, 3).map((sub) => (
            <span
              key={sub}
              className="bg-slate-100/90 text-slate-700 font-[600] px-2.5 py-1 rounded-lg text-[11px] group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
            >
              {sub}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="bg-slate-100 text-slate-500 font-[600] px-2 py-1 rounded-lg text-[11px]">
              +{tutor.subjects.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs font-[700] border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl py-2.5 h-auto"
          asChild
        >
          <Link href={`/tutor/${tutor.id}`}>View Profile</Link>
        </Button>

        <Button
          size="sm"
          className="w-full text-xs font-[700] bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 h-auto shadow-sm"
          onClick={() => onRequest?.(tutor)}
        >
          Request Tutor
        </Button>
      </div>
    </div>
  );
}
