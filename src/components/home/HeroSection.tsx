"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Home, Wifi, Building2, ChevronRight, ShieldCheck, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUBJECTS } from "@/data/subjects";
import { CLASSES } from "@/data/classes";
import { LOCATIONS } from "@/data/locations";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [classVal, setClassVal] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState<"home" | "online" | "">("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (classVal) params.set("class", classVal);
    if (subject) params.set("subject", subject);
    if (location) params.set("location", location);
    if (mode) params.set("mode", mode);
    router.push(`/find-tutor?${params.toString()}`);
  }

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left Column: Headline + CTAs ── */}
          <div>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-4 py-1.5 text-xs font-[800] mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              All tutors are background verified
            </div>

            <h1 className="text-4xl sm:text-5xl font-[800] text-slate-900 leading-[1.15] tracking-tight mb-5">
              The Right Tutor,{" "}
              <span className="text-brand-blue">Exactly When<br className="hidden sm:block" /> You Need</span>
            </h1>

            <p className="text-lg text-slate-500 font-[500] leading-relaxed mb-8 max-w-lg">
              Mero Tutor connects students and schools across Kathmandu Valley with certified, background-checked tutors for home tuition, online classes, and institutional staffing.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                onClick={handleSearch}
                size="lg"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-2xl px-7 py-6 text-base shadow-lg shadow-blue-200"
                asChild
              >
                <Link href="/find-tutor">
                  Find a Tutor
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-200 text-slate-800 hover:border-brand-blue hover:text-brand-blue font-[800] rounded-2xl px-7 py-6 text-base"
                asChild
              >
                <Link href="/hire-tutor">
                  <Building2 className="w-4 h-4 mr-2" />
                  Hire for Schools
                </Link>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-5 text-sm font-[600] text-slate-500">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                4.9/5 from 2,000+ reviews
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-blue" />
                Matched in under 24 hrs
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Free replacement guarantee
              </span>
            </div>
          </div>

          {/* ── Right Column: Search Card ── */}
          <div>
            <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/80 p-6 sm:p-8">
              <p className="text-xs font-[800] uppercase tracking-widest text-slate-400 mb-5">
                Search from 5,000+ verified tutors
              </p>

              <div className="space-y-4">
                {/* Class */}
                <div>
                  <label className="block text-sm font-[700] text-slate-700 mb-1.5">Class / Grade Level</label>
                  <select
                    value={classVal}
                    onChange={(e) => setClassVal(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 text-sm font-[600] bg-white text-slate-800 focus:outline-none focus:border-brand-blue transition-colors"
                  >
                    <option value="">e.g. Class 10 / SEE</option>
                    {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-[700] text-slate-700 mb-1.5">Subject Needed</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 text-sm font-[600] bg-white text-slate-800 focus:outline-none focus:border-brand-blue transition-colors"
                  >
                    <option value="">e.g. Mathematics, Physics</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-[700] text-slate-700 mb-1.5">Your Area</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 text-sm font-[600] bg-white text-slate-800 focus:outline-none focus:border-brand-blue transition-colors"
                  >
                    <option value="">e.g. Baneshwor, Lalitpur</option>
                    {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                {/* Mode toggle */}
                <div>
                  <label className="block text-sm font-[700] text-slate-700 mb-1.5">Teaching Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["home", "online"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(mode === m ? "" : m)}
                        className={`flex items-center justify-center gap-2 h-12 rounded-xl border-2 text-sm font-[700] transition-all ${
                          mode === m
                            ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                            : "border-slate-200 text-slate-600 hover:border-brand-blue/40"
                        }`}
                      >
                        {m === "home"
                          ? <><Home className="w-4 h-4" /> Home Tuition</>
                          : <><Wifi className="w-4 h-4" /> Online</>
                        }
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSearch}
                  className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-2xl py-7 text-base shadow-md shadow-blue-100 mt-1"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Tutors
                </Button>
              </div>

              <p className="text-center text-xs text-slate-400 mt-4 font-[600]">
                Not sure where to start?{" "}
                <Link href="/help-me-find-a-tutor" className="text-brand-blue hover:underline">
                  Let us find one for you →
                </Link>
              </p>
            </div>

            {/* School shortcut */}
            <Link
              href="/hire-tutor"
              className="mt-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl px-5 py-4 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-[800] text-slate-800">Are you a school or institute?</p>
                  <p className="text-xs text-slate-500 font-[500]">Hire verified teachers for your institution →</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

        </div>

        {/* ── Bottom Stats Bar ── */}
        <div className="mt-16 pt-10 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "5,000+", label: "Verified Tutors" },
            { value: "12,000+", label: "Students Taught" },
            { value: "98%", label: "Parent Satisfaction" },
            { value: "24 hrs", label: "Avg. Matching Time" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-[800] text-brand-navy">{s.value}</div>
              <div className="text-sm text-slate-500 font-[600] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
