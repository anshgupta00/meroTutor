"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Home, Wifi, GraduationCap, ChevronLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import VerificationBadge from "@/components/tutors/VerificationBadge";
import RequestTutorModal from "@/components/modals/RequestTutorModal";
import DemoClassModal from "@/components/modals/DemoClassModal";
import HelpCTA from "@/components/home/HelpCTA";
import { TUTORS } from "@/data/tutors";
import { use } from "react";

const modeLabel: Record<string, string> = {
  home: "Home Tuition",
  online: "Online Classes",
  both: "Home & Online",
};

const availabilityLabel: Record<string, string> = {
  morning: "Morning (6am–10am)",
  afternoon: "Afternoon (10am–3pm)",
  evening: "Evening (3pm–8pm)",
  flexible: "Flexible",
};

export default function TutorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const tutor = TUTORS.find((t) => t.id === id);
  const [requestOpen, setRequestOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  if (!tutor) notFound();

  return (
    <div className="min-h-screen bg-brand-bg pb-24 lg:pb-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/find-tutor" className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-blue">
            <ChevronLeft className="h-4 w-4" /> Back to Find a Tutor
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">

            {/* Header Card */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-brand-blue-light flex-shrink-0">
                  <Image src={tutor.photo} alt={tutor.name} fill className="object-cover" sizes="128px" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start gap-3 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-800 text-brand-navy">{tutor.name}</h1>
                    {tutor.isVerified && <VerificationBadge size="md" />}
                  </div>
                  <p className="text-brand-muted font-500 mb-3">{tutor.qualification}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(tutor.rating) ? "text-brand-yellow fill-brand-yellow" : "text-gray-200 fill-gray-200"}`} />
                      ))}
                    </div>
                    <span className="font-700 text-brand-navy">{tutor.rating.toFixed(1)}</span>
                    <span className="text-sm text-brand-muted">({tutor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 text-sm text-brand-text bg-brand-bg border border-brand-border rounded-full px-3 py-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-muted" />{tutor.location[0]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-brand-text bg-brand-bg border border-brand-border rounded-full px-3 py-1">
                      <Clock className="h-3.5 w-3.5 text-brand-muted" />{tutor.experience} yrs exp.
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-brand-teal-dark bg-brand-teal-light border border-brand-teal/20 rounded-full px-3 py-1">
                      {tutor.mode === "online" ? <Wifi className="h-3.5 w-3.5" /> : <Home className="h-3.5 w-3.5" />}
                      {modeLabel[tutor.mode]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <h2 className="text-lg font-700 text-brand-navy mb-3">About</h2>
              <p className="text-brand-text leading-relaxed">{tutor.about}</p>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <h2 className="text-lg font-700 text-brand-navy mb-4">Education</h2>
              <div className="space-y-3">
                {tutor.education.map((edu, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-blue-light flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-4 w-4 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-600 text-brand-navy text-sm">{edu.degree}</p>
                      <p className="text-xs text-brand-muted">{edu.institution} · {edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Experience */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <h2 className="text-lg font-700 text-brand-navy mb-3">Teaching Experience</h2>
              <p className="text-brand-text leading-relaxed">{tutor.teachingExperience}</p>
            </div>

            {/* Subjects & Classes */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <h2 className="text-lg font-700 text-brand-navy mb-4">Subjects & Classes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((s) => (
                      <Badge key={s} className="bg-brand-blue-light text-brand-blue border-0 font-500">{s}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Classes</p>
                  <div className="flex flex-wrap gap-2">
                    {tutor.classes.map((c) => (
                      <Badge key={c} variant="secondary" className="font-500">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <h2 className="text-lg font-700 text-brand-navy mb-4">Availability & Teaching Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Available Times</p>
                  <div className="space-y-1.5">
                    {tutor.availability.map((a) => (
                      <div key={a} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm text-brand-text">{availabilityLabel[a]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Teaching Areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.teachingAreas.map((area) => (
                      <span key={area} className="text-xs bg-brand-bg border border-brand-border rounded-full px-2.5 py-1 text-brand-text">{area}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <h2 className="text-lg font-700 text-brand-navy mb-4">
                Reviews <span className="text-sm font-500 text-brand-muted ml-1">({tutor.reviews.length})</span>
              </h2>
              <div className="space-y-4">
                {tutor.reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-brand-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-600 text-brand-navy text-sm">{review.authorName}</span>
                      <span className="text-xs text-brand-muted">
                        {new Date(review.date).toLocaleDateString("en-NP", { year: "numeric", month: "short" })}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-brand-yellow fill-brand-yellow" />
                      ))}
                    </div>
                    <p className="text-sm text-brand-text leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-brand-border p-6">
                <p className="text-xs font-600 text-brand-muted uppercase tracking-wide mb-1">Monthly Fee</p>
                <div className="text-2xl font-800 text-brand-navy mb-0.5">
                  NPR {tutor.fee.min.toLocaleString()}–{tutor.fee.max.toLocaleString()}
                </div>
                <p className="text-xs text-brand-muted">per {tutor.fee.per} · negotiable</p>
                <Separator className="my-4" />
                <Button onClick={() => setRequestOpen(true)} className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-700 rounded-full py-3 mb-3">
                  Request This Tutor
                </Button>
                <Button onClick={() => setDemoOpen(true)} variant="outline" className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal-light font-600 rounded-full py-3">
                  Book a Demo Class
                </Button>
                <Separator className="my-4" />
                <a href="https://wa.me/9779762511114" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-600 hover:bg-green-100 transition-colors">
                  <Phone className="h-4 w-4" /> Ask Mero Tutor for Help
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-brand-border p-5 space-y-3">
                {[
                  { label: "Experience", value: `${tutor.experience} years` },
                  { label: "Teaching Mode", value: modeLabel[tutor.mode] },
                  { label: "Gender", value: tutor.gender === "male" ? "Male" : "Female" },
                  { label: "Rating", value: `${tutor.rating} / 5.0` },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-brand-muted">{item.label}</span>
                    <span className="font-600 text-brand-navy">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border px-4 py-3 flex gap-3 z-40">
        <Button onClick={() => setDemoOpen(true)} variant="outline" className="flex-1 border-brand-teal text-brand-teal rounded-full font-600">Demo Class</Button>
        <Button onClick={() => setRequestOpen(true)} className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full font-700">Request Tutor</Button>
      </div>

      <RequestTutorModal tutor={tutor} open={requestOpen} onClose={() => setRequestOpen(false)} />
      <DemoClassModal tutor={tutor} open={demoOpen} onClose={() => setDemoOpen(false)} />
      <HelpCTA />
    </div>
  );
}
