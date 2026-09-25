"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  Wifi,
  Home,
  X,
  ShieldCheck,
  LogIn,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TuitionJob {
  id: string;
  title: string;
  classLevel: string;
  subjects: string[];
  location: string;
  mode: "Home" | "Online";
  salary: string;
  timing: string;
  daysPerWeek: string;
  genderPreference: "Any" | "Female Preferred" | "Male Preferred";
  postedDate: string;
  urgency: "Urgent" | "Normal";
  description: string;
}

const JOBS: TuitionJob[] = [
  {
    id: "job-101",
    title: "SEE Math & Science Home Tutor",
    classLevel: "Class 10 (SEE)",
    subjects: ["Mathematics", "Science"],
    location: "New Baneshwor, Kathmandu",
    mode: "Home",
    salary: "NPR 10,000–12,000",
    timing: "6:30–7:30 AM",
    daysPerWeek: "6 days/week",
    genderPreference: "Any",
    postedDate: "2 hrs ago",
    urgency: "Urgent",
    description: "SEE board exam preparation for a Class 10 student. Focus on Math concepts and Science practicals.",
  },
  {
    id: "job-102",
    title: "Grade 5 All Subjects Home Tutor",
    classLevel: "Class 5",
    subjects: ["English", "Math", "Nepali"],
    location: "Jhamsikhel, Lalitpur",
    mode: "Home",
    salary: "NPR 8,000",
    timing: "4:30–5:30 PM",
    daysPerWeek: "5 days/week",
    genderPreference: "Female Preferred",
    postedDate: "1 day ago",
    urgency: "Normal",
    description: "Homework support and foundation building for an IB school Grade 5 student. Friendly and patient tutor preferred.",
  },
  {
    id: "job-103",
    title: "+2 Physics & Chemistry Online Tutor",
    classLevel: "+2 / Class 12",
    subjects: ["Physics", "Chemistry"],
    location: "Online",
    mode: "Online",
    salary: "NPR 9,000–11,000",
    timing: "Flexible Evening",
    daysPerWeek: "5 days/week",
    genderPreference: "Any",
    postedDate: "3 hrs ago",
    urgency: "Urgent",
    description: "NEB Class 12 Physics numericals and Chemistry reactions for a focused science student.",
  },
  {
    id: "job-104",
    title: "Class 8 Computer & Math Tutor",
    classLevel: "Class 8 (BLE)",
    subjects: ["Mathematics", "Computer"],
    location: "Kapan, Kathmandu",
    mode: "Home",
    salary: "NPR 7,500",
    timing: "7:00–8:00 AM",
    daysPerWeek: "6 days/week",
    genderPreference: "Any",
    postedDate: "2 days ago",
    urgency: "Normal",
    description: "BLE exam prep with QBASIC and Math formula revision. CS/Engineering undergrad preferred.",
  },
  {
    id: "job-105",
    title: "Primary Level General Tuition (2 Kids)",
    classLevel: "Grade 2 & 4",
    subjects: ["English", "Nepali", "Math"],
    location: "Bhaktapur",
    mode: "Home",
    salary: "NPR 11,000",
    timing: "5:00–6:30 PM",
    daysPerWeek: "5 days/week",
    genderPreference: "Female Preferred",
    postedDate: "1 day ago",
    urgency: "Normal",
    description: "Tuition for 2 young siblings. Focus on reading, writing and handwriting improvement.",
  },
  {
    id: "job-106",
    title: "Class 11 Accountancy & Economics Tutor",
    classLevel: "+2 / Class 11",
    subjects: ["Accountancy", "Economics"],
    location: "Kalanki, Kathmandu",
    mode: "Home",
    salary: "NPR 9,500",
    timing: "6:00–7:00 AM",
    daysPerWeek: "5 days/week",
    genderPreference: "Any",
    postedDate: "4 hrs ago",
    urgency: "Urgent",
    description: "NEB Management stream — Journal Entries, Ledger & Economics concepts. BBA/BBS/CA background ideal.",
  },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [selectedMode, setSelectedMode] = useState<"All" | "Home" | "Online">("All");
  const [applyingJob, setApplyingJob] = useState<TuitionJob | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", qualification: "", experience: "" });

  const filtered = JOBS.filter((j) => {
    const q = search.toLowerCase();
    if (q && !j.title.toLowerCase().includes(q) && !j.subjects.join().toLowerCase().includes(q) && !j.location.toLowerCase().includes(q)) return false;
    if (selectedMode !== "All" && j.mode !== selectedMode) return false;
    return true;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => { setIsSubmitted(false); setApplyingJob(null); setForm({ name: "", phone: "", qualification: "", experience: "" }); }, 3000);
  };

  return (
    <div className="min-h-screen bg-brand-bg">

      {/* ─── HERO (Matching Home Page Layout) ─────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-4 py-1.5 text-xs font-[800] mb-6">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                {JOBS.length} Active Tuition Vacancies · Across Nepal
              </div>

              <h1 className="text-4xl sm:text-5xl font-[800] text-slate-900 leading-[1.15] tracking-tight mb-5">
                Tuition Jobs &amp; <span className="text-brand-blue">Vacancies</span>
              </h1>

              <p className="text-lg text-slate-500 font-[500] leading-relaxed mb-8 max-w-lg">
                Verified home &amp; online assignments across Nepal.<br className="hidden sm:block" />
                <span className="font-[700] text-slate-800">Earn an average of NPR 40,000/month with zero fees.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-2xl px-7 py-6 text-base shadow-lg shadow-blue-200"
                  asChild
                >
                  <Link href="/login?role=tutor">
                    Register as a Tutor
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-800 hover:border-brand-blue hover:text-brand-blue font-[800] rounded-2xl px-7 py-6 text-base"
                  asChild
                >
                  <Link href="/find-tutor">
                    Browse Tutors
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm font-[600] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  100% Free for Tutors
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-blue" />
                  Instant WhatsApp Alerts
                </span>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/80 p-6 sm:p-8">
                <p className="text-xs font-[800] uppercase tracking-widest text-slate-400 mb-4">
                  Quick Vacancy Summary
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { label: "Active Openings", value: `${JOBS.length} Vacancies` },
                    { label: "Location", value: "Across Nepal" },
                    { label: "Salary Range", value: "NPR 7,500 – 40,000/mo" },
                    { label: "Mode", value: "Home Tuition & Online" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-[600] text-slate-500">{stat.label}</span>
                      <span className="text-xs font-[800] text-slate-900">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-brand-blue-light/50 border border-brand-blue/20 rounded-2xl text-center">
                  <p className="text-xs font-[700] text-brand-blue mb-1">Want instant job updates?</p>
                  <a
                    href="https://wa.me/9779762511114"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-[800] text-emerald-600 hover:underline"
                  >
                    Join Mero Tutor WhatsApp Channel →
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: `${JOBS.length}+`, label: "Active Vacancies" },
              { value: "NPR 40k", label: "Avg. Monthly Earnings" },
              { value: "100%", label: "Verified Parents" },
              { value: "< 24 hrs", label: "Assignment Connect Time" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-[800] text-brand-navy">{s.value}</div>
                <div className="text-sm text-slate-500 font-[600] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FILTERS ──────────────────────────────────────────────────────── */}
      <div className="sticky top-[64px] sm:top-[80px] z-30 bg-white border-b border-brand-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
            <Input
              placeholder="Search by title, subject or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 bg-brand-bg border-brand-border text-sm rounded-xl"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-navy">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center gap-1 bg-brand-bg rounded-xl p-1 border border-brand-border">
            {(["All", "Home", "Online"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMode(m)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-700 transition-all ${
                  selectedMode === m
                    ? "bg-white text-brand-navy shadow-xs border border-brand-border"
                    : "text-brand-muted hover:text-brand-navy"
                }`}
              >
                {m === "Home" && <Home className="h-3.5 w-3.5" />}
                {m === "Online" && <Wifi className="h-3.5 w-3.5" />}
                {m}
              </button>
            ))}
          </div>

          <p className="text-xs font-600 text-brand-muted whitespace-nowrap">
            <span className="text-brand-navy font-800">{filtered.length}</span> vacancies
          </p>
        </div>
      </div>

      {/* ─── JOB CARDS ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Search className="h-10 w-10 text-brand-muted mx-auto mb-4" />
            <h3 className="text-xl font-800 text-brand-navy mb-2">No vacancies match your search</h3>
            <p className="text-sm text-brand-muted">Try different keywords or reset filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} onApply={() => setApplyingJob(job)} />
            ))}
          </div>
        )}
      </div>

      {/* ─── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-brand-teal-light via-white to-brand-blue-light rounded-3xl border border-brand-border p-10 lg:p-12 text-center shadow-sm">
          <div className="w-14 h-14 bg-brand-teal-light border border-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Briefcase className="h-7 w-7 text-brand-teal-dark" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-[900] text-brand-navy mb-3">Don&apos;t see the right job?</h2>
          <p className="text-brand-text text-base sm:text-lg mb-7 max-w-md mx-auto font-[500] leading-relaxed">
            Register your profile once. We&apos;ll match you with new tuition assignments as they come in — for free.
          </p>
          <Button asChild className="bg-brand-teal hover:bg-brand-teal-dark text-white font-[700] rounded-full px-8 py-3.5 h-auto shadow-sm">
            <Link href="/login?role=tutor">
              Create Your Tutor Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── APPLY MODAL ──────────────────────────────────────────────────── */}
      {applyingJob && (
        <Dialog open={!!applyingJob} onOpenChange={() => { setApplyingJob(null); setIsSubmitted(false); }}>
          <DialogContent className="sm:max-w-md bg-white rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-brand-navy to-brand-blue p-6 text-white">
              <DialogHeader>
                <DialogTitle className="text-base font-800 text-white leading-snug">
                  {applyingJob.title}
                </DialogTitle>
                <DialogDescription className="text-white/70 text-xs mt-1">
                  {applyingJob.location} &nbsp;·&nbsp; <span className="font-700 text-white">{applyingJob.salary}/month</span>
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-6">
              <div className="py-2 px-1 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 border border-emerald-200">
                  <LogIn className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-[800] text-slate-900 mb-2">
                  Tutor Login Required
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-[500] mb-6 leading-relaxed max-w-xs mx-auto">
                  To apply for <span className="font-[700] text-slate-800">&ldquo;{applyingJob.title}&rdquo;</span>, you must log in through your Tutor Account.
                </p>
                <div className="space-y-2.5">
                  <Button
                    asChild
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-[800] rounded-xl text-sm h-11 shadow-md shadow-emerald-100"
                  >
                    <Link href="/login?role=tutor">
                      Login as Tutor to Apply <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 font-[700] rounded-xl text-xs h-10"
                  >
                    <Link href="/signup?role=tutor">
                      Don&apos;t have an account? Sign Up Free →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

/* ─── JOB CARD COMPONENT ─────────────────────────────────────────────────── */
function JobCard({ job, onApply }: { job: TuitionJob; onApply: () => void }) {
  return (
    <div className="group bg-white rounded-2xl border border-brand-border hover:border-brand-blue/50 hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Card Top */}
      <div className="p-5 flex-1">
        {/* Badges row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-700 ${
              job.urgency === "Urgent"
                ? "bg-rose-50 text-rose-600"
                : "bg-emerald-50 text-emerald-600"
            }`}>
              {job.urgency === "Urgent" ? "Urgent" : "Active"}
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-700 ${
              job.mode === "Online"
                ? "bg-violet-50 text-violet-600"
                : "bg-sky-50 text-sky-600"
            }`}>
              {job.mode === "Online" ? <Wifi className="h-3 w-3" /> : <Home className="h-3 w-3" />}
              {job.mode}
            </span>
          </div>
          <span className="text-[11px] text-brand-muted font-500">{job.postedDate}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-800 text-brand-navy leading-snug mb-1 group-hover:text-brand-blue transition-colors">
          {job.title}
        </h3>

        {/* Level pill */}
        <span className="inline-block text-[11px] font-700 text-brand-blue bg-brand-blue-light px-2.5 py-0.5 rounded-full mb-3">
          {job.classLevel}
        </span>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.subjects.map(s => (
            <span key={s} className="text-[11px] font-600 text-brand-text bg-brand-bg border border-brand-border px-2 py-0.5 rounded-md">
              {s}
            </span>
          ))}
        </div>

        {/* Key info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-brand-text">
            <MapPin className="h-3.5 w-3.5 text-brand-muted flex-shrink-0" />
            <span className="font-600">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-text">
            <Clock className="h-3.5 w-3.5 text-brand-muted flex-shrink-0" />
            <span>{job.timing} &nbsp;·&nbsp; <span className="font-600">{job.daysPerWeek}</span></span>
          </div>
        </div>
      </div>

      {/* Card Bottom */}
      <div className="px-5 pb-5 pt-4 border-t border-brand-border/60 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] text-brand-muted font-500 uppercase tracking-wide">Monthly</p>
          <p className="text-base font-800 text-brand-navy">{job.salary}</p>
        </div>
        <Button
          onClick={onApply}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-700 rounded-xl px-5 h-9 gap-1.5"
        >
          Apply <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
