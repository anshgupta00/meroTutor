"use client";

import { useState } from "react";
import { Star, Quote, Building2, User, CheckCircle2 } from "lucide-react";

const PARENT_TESTIMONIALS = [
  {
    name: "Priya Shrestha",
    role: "Parent, Class 10 Student",
    location: "New Baneshwor, Kathmandu",
    rating: 5,
    text: "We found Ramesh sir through Mero Tutor and our son's Mathematics marks improved from 55% to 90% in just three months. The process was very simple — we just filled a form and the team helped us connect with the right tutor.",
  },
  {
    name: "Anjali Gurung",
    role: "Parent, Class 5 Student",
    location: "Imadol, Lalitpur",
    rating: 5,
    text: "Sita madam is wonderful with young children. My daughter loves her classes and looks forward to them every day. Mero Tutor made it very easy to find a home tutor near us.",
  },
  {
    name: "Suresh Dhakal",
    role: "Parent, Class 12 Student",
    location: "Boudha, Kathmandu",
    rating: 5,
    text: "Anita madam helped my daughter understand Chemistry so well that she got distinction in SEE & NEB 12. Finding a good tutor used to be very difficult — Mero Tutor has made it so much easier.",
  },
];

const INSTITUTION_TESTIMONIALS = [
  {
    name: "Dr. K.P. Sharma",
    role: "Academic Director",
    institution: "St. Xavier's Network Partner",
    location: "Lalitpur",
    rating: 5,
    text: "Mero Tutor has been an exceptional recruitment partner for our institution. Whenever we require specialized faculty for entrance preparation or higher secondary classes, they provide verified subject experts within 24 hours.",
  },
  {
    name: "Subash Adhikari",
    role: "Principal",
    institution: "Kathmandu Model Higher Secondary School",
    location: "Bagbazar, Kathmandu",
    rating: 5,
    text: "The quality and professionalism of teachers dispatched by Mero Tutor is commendable. They understand institutional requirements, subject-depth, and curriculum standards thoroughly.",
  },
  {
    name: "Sunita Thapa",
    role: "HR & Faculty Coordinator",
    institution: "Apex Academy & College",
    location: "Baneshwor, Kathmandu",
    rating: 5,
    text: "Finding reliable full-time and part-time lecturer staff was a constant struggle until we partnered with Mero Tutor. Their teacher vetting process saves us weeks of hiring time.",
  },
];

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<"parents" | "institutions">("parents");

  const list = activeTab === "parents" ? PARENT_TESTIMONIALS : INSTITUTION_TESTIMONIALS;

  return (
    <section className="py-16 lg:py-24 bg-brand-bg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-[800] uppercase tracking-widest text-brand-blue mb-2 block">
            Testimonials &amp; Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-[800] text-slate-900 tracking-tight mb-4">
            What Our Community Says
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-[500]">
            Read genuine experiences from parents, students, and institutional partners across Nepal.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab("parents")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-[800] transition-all ${
              activeTab === "parents"
                ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <User className="w-4 h-4" /> What Parents &amp; Students Say
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("institutions")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-[800] transition-all ${
              activeTab === "institutions"
                ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4" /> What Partner Institutions Say
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-brand-blue/20" />
                </div>
                <p className="text-slate-600 text-sm font-[500] leading-relaxed mb-6 italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-[800] text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-[500] mt-0.5">
                      {item.role}
                    </p>
                    <p className="text-[11px] text-brand-blue font-[600]">
                      {"institution" in item ? item.institution : item.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-[700] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
