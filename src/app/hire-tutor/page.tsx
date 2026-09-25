"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Send, Building2, PhoneCall, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HelpCTA from "@/components/home/HelpCTA";

export default function HireTutorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    institutionOrName: "",
    contactPerson: "",
    phone: "",
    email: "",
    location: "",
    subjects: "",
    level: "Secondary (Grade 9-10 / SEE)",
    mode: "On-site / In-person",
    employmentType: "",
    minSalary: "",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-bg min-h-screen">

      {/* ─── HERO (Matching Home Page Layout) ─────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-4 py-1.5 text-xs font-[800] mb-6">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                Faculty Placement for Schools &amp; Colleges
              </div>

              <h1 className="text-4xl sm:text-5xl font-[800] text-slate-900 leading-[1.15] tracking-tight mb-5">
                Hire Tutors for Schools,<br />
                <span className="text-brand-blue">Colleges &amp; Institutes</span>
              </h1>

              <p className="text-lg text-slate-500 font-[500] leading-relaxed mb-8 max-w-lg">
                Access Nepal&apos;s largest pool of background-verified educators, subject specialists, and entrance preparation faculty. Fast placement, guaranteed quality.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  className="bg-brand-teal hover:bg-brand-teal-dark text-white font-[800] rounded-2xl px-7 py-6 text-base shadow-lg shadow-teal-200"
                  asChild
                >
                  <Link href="/login?role=school">
                    Fill Hiring Form
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-800 hover:border-brand-teal hover:text-brand-teal font-[800] rounded-2xl px-7 py-6 text-base"
                  asChild
                >
                  <a href="https://wa.me/9779762511114" target="_blank" rel="noopener noreferrer">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    WhatsApp Coordinator
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm font-[600] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Pre-screened Educators
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                  24–48 hr Fast Placement
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Free Replacement Guarantee
                </span>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/80 p-6 sm:p-8">
                <p className="text-xs font-[800] uppercase tracking-widest text-slate-400 mb-4">
                  Placement Services Overview
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { label: "Institutional Staffing", value: "Full-time & Part-time" },
                    { label: "Levels Covered", value: "Primary to University / +2" },
                    { label: "Entrance Faculty", value: "IOE, IOM, CMAT, A-Levels" },
                    { label: "Verification", value: "Degree & Police Background Check" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-[600] text-slate-500">{stat.label}</span>
                      <span className="text-xs font-[800] text-slate-900">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-brand-blue-light/50 border border-brand-blue/20 rounded-2xl text-center">
                  <p className="text-xs font-[700] text-brand-blue mb-1">Need Urgent Academic Staffing?</p>
                  <p className="text-xs text-slate-600 font-[500]">Call our coordinator line directly at <strong className="text-slate-900">+977-9762511114</strong></p>
                </div>
              </div>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "50+", label: "Partner Schools & Colleges" },
              { value: "1,000+", label: "Qualified Faculty Members" },
              { value: "99%", label: "Placement Satisfaction" },
              { value: "< 48 hrs", label: "Average Shortlist Time" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-[800] text-brand-navy">{s.value}</div>
                <div className="text-sm text-slate-500 font-[600] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Form */}
          <div className="lg:col-span-8" id="hiring-form">
            <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-10 shadow-xs">

              {/* Form Header */}
              <div className="mb-7 pb-5 border-b border-brand-border">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-[700] bg-teal-50 text-teal-700 border border-teal-200">
                    <Building2 className="w-3.5 h-3.5" />
                    School &amp; College Hiring Request
                  </div>
                  <Link
                    href="/login?role=school"
                    className="text-xs font-[700] text-brand-teal hover:text-brand-teal-dark underline flex items-center gap-1"
                  >
                    Already registered? Login as School →
                  </Link>
                </div>
                <h2 className="text-2xl font-[800] text-brand-navy">Submit a Faculty Hiring Request</h2>
                <p className="text-xs text-brand-text mt-1">
                  Fill in your institution&apos;s details below or{" "}
                  <Link href="/login?role=school" className="text-brand-teal font-[700] hover:underline">
                    Sign in to your School Account
                  </Link>
                  . Our placement coordinator will shortlist matching educators within 24–48 hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 px-6 border border-emerald-200 bg-emerald-50 rounded-2xl">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-800 text-brand-navy mb-2">Request Submitted</h3>
                  <p className="text-brand-text text-sm max-w-md mx-auto mb-6 font-500">
                    Our academic placement coordinator will review your requirements and contact you within 2 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-brand-border text-brand-navy font-700 rounded-full px-6"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-xs font-[700] text-brand-navy mb-1.5 block uppercase tracking-wide">
                        School / College Name *
                      </Label>
                      <Input
                        required
                        placeholder="e.g. Apex Academy, Kathmandu"
                        value={formData.institutionOrName}
                        onChange={(e) => setFormData({ ...formData, institutionOrName: e.target.value })}
                        className="rounded-xl bg-brand-bg border-brand-border h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-700 text-brand-navy mb-1.5 block uppercase tracking-wide">
                        Contact Person *
                      </Label>
                      <Input
                        required
                        placeholder="Principal / Academic Coordinator"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="rounded-xl bg-brand-bg border-brand-border h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-xs font-700 text-brand-navy mb-1.5 block uppercase tracking-wide">
                        Phone Number *
                      </Label>
                      <Input
                        required
                        type="tel"
                        placeholder="98XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="rounded-xl bg-brand-bg border-brand-border h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-700 text-brand-navy mb-1.5 block uppercase tracking-wide">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        placeholder="info@institution.edu.np"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-xl bg-brand-bg border-brand-border h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-xs font-700 text-brand-navy mb-1.5 block uppercase tracking-wide">
                        Location / Area *
                      </Label>
                      <Input
                        required
                        placeholder="e.g. New Baneshwor, Kathmandu"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="rounded-xl bg-brand-bg border-brand-border h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-700 text-brand-navy mb-1.5 block uppercase tracking-wide">
                        Subjects Required *
                      </Label>
                      <Input
                        required
                        placeholder="e.g. Mathematics, Physics"
                        value={formData.subjects}
                        onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                        className="rounded-xl bg-brand-bg border-brand-border h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-xs font-700 text-brand-navy mb-1.5 block uppercase tracking-wide">
                        Academic Level *
                      </Label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl border border-brand-border text-sm font-600 bg-brand-bg text-brand-navy focus:outline-none focus:border-brand-blue"
                      >
                        <option>Primary (Grade 1-5)</option>
                        <option>Lower Secondary (Grade 6-8)</option>
                        <option>Secondary (Grade 9-10 / SEE)</option>
                        <option>+2 Science</option>
                        <option>+2 Management</option>
                        <option>A-Levels / IB</option>
                        <option>Bachelor / University</option>
                        <option>Entrance Preparation (IOE/IOM/CMAT)</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-700 text-brand-navy mb-1.5 block uppercase tracking-wide">
                        Teaching Mode *
                      </Label>
                      <select
                        value={formData.mode}
                        onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl border border-brand-border text-sm font-600 bg-brand-bg text-brand-navy focus:outline-none focus:border-brand-blue"
                      >
                        <option>On-site / In-person (School / College)</option>
                        <option>Home Tuition (Student&apos;s Residence)</option>
                        <option>Online Virtual Classroom</option>
                      </select>
                    </div>
                  </div>

                  {/* Employment Type + Minimum Salary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-xs font-[700] text-brand-navy mb-1.5 block uppercase tracking-wide">
                        Employment Type *
                      </Label>
                      <div className="flex gap-2">
                        {["Full Time", "Part Time", "Both"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, employmentType: opt })}
                            className={`flex-1 py-2 rounded-xl border-2 text-xs font-[700] transition-all ${
                              formData.employmentType === opt
                                ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                                : "border-brand-border text-brand-text hover:border-brand-blue/40"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-[700] text-brand-navy mb-1.5 block uppercase tracking-wide">
                        Minimum Salary Offered
                      </Label>
                      <Input
                        placeholder="e.g. NPR 25,000 or Twenty-five thousand"
                        value={formData.minSalary}
                        onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                        className="rounded-xl bg-brand-bg border-brand-border h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-700 text-brand-navy mb-1.5 block uppercase tracking-wide">
                      Additional Requirements &amp; Timings
                    </Label>
                    <textarea
                      rows={4}
                      placeholder="Number of teachers needed, preferred timings, specific qualifications..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full p-3 rounded-xl bg-brand-bg border border-brand-border text-sm font-500 text-brand-navy focus:outline-none focus:border-brand-blue resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-700 rounded-full py-3 h-11 text-sm shadow-xs"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Hiring Request
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">

            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-xs">
              <h3 className="text-base font-800 text-brand-navy mb-4">Why Hire Through Mero Tutor?</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Pre-screened Educators",
                    desc: "Academic degree, teaching license, and ID verification completed.",
                  },
                  {
                    title: "Fast Placement",
                    desc: "Shortlist matching your subject requirements within 24-48 hours.",
                  },
                  {
                    title: "Free Replacement Policy",
                    desc: "Immediate tutor replacement at no additional cost if not a fit.",
                  },
                  {
                    title: "Flexible Engagement",
                    desc: "Full-time, part-time, guest lecturer, or hourly models.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-brand-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-700 text-brand-navy">{item.title}</h4>
                      <p className="text-xs text-brand-text mt-0.5 font-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-xs">
              <h3 className="text-base font-800 text-brand-navy mb-2">Need Urgent Staffing?</h3>
              <p className="text-xs text-brand-text mb-4 font-500 leading-relaxed">
                Contact our academic placement coordinator directly for immediate assistance.
              </p>
              <a
                href="https://wa.me/9779762511114"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-700 py-2.5 rounded-full text-xs transition-colors w-full"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Contact Placement Coordinator
              </a>
              <p className="text-center text-xs text-brand-muted mt-3 font-500">
                Or{" "}
                <Link href="/contact" className="text-brand-blue hover:underline">
                  send us a message →
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>

      <HelpCTA />
    </div>
  );
}
