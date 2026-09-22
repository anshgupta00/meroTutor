"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, User, Phone, Mail, MapPin, BookOpen, Briefcase, ChevronRight, ShieldCheck, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CLASSES } from "@/data/classes";
import { SUBJECTS } from "@/data/subjects";
import { LOCATIONS } from "@/data/locations";

type RegData = {
  // Step 1: Personal
  name: string; phone: string; email: string; location: string;
  // Step 2: Teaching Info
  qualification: string; subjects: string[]; classes: string[]; experience: string;
  // Step 3: Preference
  mode: string;
  // Step 4: Availability
  availability: string[];
  // Step 5: Fee & About
  feeMin: string; feeMax: string; about: string;
};

const INITIAL: RegData = {
  name: "", phone: "", email: "", location: "",
  qualification: "", subjects: [], classes: [], experience: "",
  mode: "", availability: [], feeMin: "", feeMax: "", about: "",
};

const STEPS = [
  { id: 1, title: "Personal Information" },
  { id: 2, title: "Teaching Information" },
  { id: 3, title: "Teaching Preference" },
  { id: 4, title: "Availability" },
  { id: 5, title: "Fee & About You" },
];

export default function BecomeATutorPage() {
  const [step, setStep] = useState(0); // 0 = landing
  const [data, setData] = useState<RegData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = STEPS.length;
  const progress = step > 0 ? (step / totalSteps) * 100 : 0;

  function toggleArr(field: keyof RegData, val: string) {
    const arr = data[field] as string[];
    setData(d => ({ ...d, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!data.name.trim()) e.name = "Please enter your name";
      if (!data.phone.trim()) e.phone = "Please enter your phone number";
      if (!data.location) e.location = "Please select your location";
    }
    if (step === 2) {
      if (!data.qualification.trim()) e.qualification = "Please enter your qualification";
      if (data.subjects.length === 0) e.subjects = "Please select at least one subject";
      if (data.classes.length === 0) e.classes = "Please select at least one class";
      if (!data.experience) e.experience = "Please enter your experience";
    }
    if (step === 3 && !data.mode) e.mode = "Please select a teaching preference";
    if (step === 4 && data.availability.length === 0) e.availability = "Please select at least one time slot";
    if (step === 5 && !data.about.trim()) e.about = "Please write a short description about yourself";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function next() {
    if (!validate()) return;
    if (step < totalSteps) { setStep(s => s + 1); setErrors({}); }
    else {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1500));
      setLoading(false);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-brand-border p-10 max-w-md w-full text-center shadow-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-800 text-brand-navy mb-3">Profile Submitted!</h1>
          <p className="text-brand-text leading-relaxed mb-6">
            Thank you for joining Mero Tutor, <strong>{data.name}</strong>. Our team will review your information and contact you on{" "}
            <strong className="text-brand-navy">{data.phone}</strong> for the next step.
          </p>
          <Button asChild className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full font-700">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Landing / Hero
  if (step === 0) {
    return (
      <div className="bg-brand-bg min-h-screen">
        {/* ─── HERO (Matching Home Page Layout) ─────────────────────────────── */}
        <section className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Headline & CTAs */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-4 py-1.5 text-xs font-[800] mb-6">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  Join Nepal&apos;s #1 Verified Tutor Network
                </div>

                <h1 className="text-4xl sm:text-5xl font-[800] text-slate-900 leading-[1.15] tracking-tight mb-5">
                  Join Mero Tutor as a <span className="text-brand-blue">Verified Tutor</span>
                </h1>

                <p className="text-lg text-slate-500 font-[500] leading-relaxed mb-8 max-w-lg">
                  Connect with thousands of parents and students looking for tutors across Kathmandu Valley. Free registration — start teaching within days.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    size="lg"
                    onClick={() => setStep(1)}
                    className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-2xl px-7 py-6 text-base shadow-lg shadow-blue-200"
                  >
                    Register as a Tutor
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-slate-200 text-slate-800 hover:border-brand-blue hover:text-brand-blue font-[800] rounded-2xl px-7 py-6 text-base"
                    asChild
                  >
                    <Link href="/jobs">
                      Browse Vacancies
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-sm font-[600] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    100% Free Signup
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Direct Parent Connect
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-blue" />
                    Flexible Hours
                  </span>
                </div>
              </div>

              {/* Right Card */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/80 p-6 sm:p-8">
                  <p className="text-xs font-[800] uppercase tracking-widest text-slate-400 mb-4">
                    Tutor Membership Perks
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Registration Fee", value: "NPR 0 (100% Free)" },
                      { label: "Average Income", value: "NPR 15,000 – 35,000/mo" },
                      { label: "Teaching Mode", value: "Home Tuition & Online" },
                      { label: "Tutor Badge", value: "Verified Identity Seal" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-xs font-[600] text-slate-500">{stat.label}</span>
                        <span className="text-xs font-[800] text-slate-900">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => setStep(1)}
                    className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-2xl py-6 text-sm shadow-md shadow-blue-100"
                  >
                    Start 3-Minute Registration →
                  </Button>
                </div>
              </div>

            </div>

            {/* Stats Bar */}
            <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: "5,000+", label: "Verified Tutors" },
                { value: "NPR 30k+", label: "Max Monthly Earnings" },
                { value: "100%", label: "Free Registration" },
                { value: "< 48 hrs", label: "First Tuition Match" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-[800] text-brand-navy">{s.value}</div>
                  <div className="text-sm text-slate-500 font-[600] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white border-b border-brand-border py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <span className="inline-block text-xs font-700 uppercase tracking-widest bg-brand-blue-light text-brand-blue px-3.5 py-1 rounded-full mb-3">
                Simple Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-800 text-brand-navy">How It Works for Tutors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { step: "01", title: "Create Your Profile", desc: "Fill in your teaching details, subjects, availability and expected fee. Takes just a few minutes." },
                { step: "02", title: "Get Verified", desc: "Our team reviews your profile and verifies your credentials to build trust with families." },
                { step: "03", title: "Receive Tuition Requests", desc: "Start receiving requests from parents and students looking for a tutor like you." },
              ].map((item) => (
                <div key={item.step} className="bg-brand-bg border border-brand-border rounded-2xl p-6 hover:border-brand-blue/30 hover:shadow-xs transition-all">
                  <div className="text-4xl font-800 text-brand-blue/40 leading-none mb-4 select-none">{item.step}</div>
                  <h3 className="text-base font-800 text-brand-navy mb-1.5">{item.title}</h3>
                  <p className="text-sm text-brand-text leading-relaxed font-500">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button onClick={() => setStep(1)} className="bg-brand-navy hover:bg-brand-navy/90 text-white font-700 rounded-full px-7 py-3 text-sm shadow-xs">
                Register Now <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Multi-step Form
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-brand-muted mb-3">
            <span className="font-600">{STEPS[step - 1].title}</span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="h-2 bg-brand-border rounded-full overflow-hidden">
            <div className="h-full bg-brand-blue rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-brand-border p-8 shadow-sm space-y-5">

          {/* Step 1: Personal */}
          {step === 1 && (
            <>
              <div>
                <Label className="text-sm font-600 text-brand-navy flex items-center gap-1.5 mb-1.5"><User className="h-3.5 w-3.5" /> Full Name</Label>
                <Input placeholder="Your full name" value={data.name} onChange={e => setData(d => ({ ...d, name: e.target.value }))} className={errors.name ? "border-red-400" : ""} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label className="text-sm font-600 text-brand-navy flex items-center gap-1.5 mb-1.5"><Phone className="h-3.5 w-3.5" /> Phone Number</Label>
                <Input placeholder="+977-XXXXXXXXXX" value={data.phone} onChange={e => setData(d => ({ ...d, phone: e.target.value }))} className={errors.phone ? "border-red-400" : ""} />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label className="text-sm font-600 text-brand-navy flex items-center gap-1.5 mb-1.5"><Mail className="h-3.5 w-3.5" /> Email (Optional)</Label>
                <Input type="email" placeholder="your@email.com" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} />
              </div>
              <div>
                <Label className="text-sm font-600 text-brand-navy flex items-center gap-1.5 mb-1.5"><MapPin className="h-3.5 w-3.5" /> Your Location</Label>
                <select value={data.location} onChange={e => setData(d => ({ ...d, location: e.target.value }))}
                  className={`w-full h-10 px-3 rounded-md border text-sm bg-white text-brand-navy ${errors.location ? "border-red-400" : "border-input"}`}>
                  <option value="">Select your location</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
              </div>
            </>
          )}

          {/* Step 2: Teaching Info */}
          {step === 2 && (
            <>
              <div>
                <Label className="text-sm font-600 text-brand-navy flex items-center gap-1.5 mb-1.5"><Briefcase className="h-3.5 w-3.5" /> Highest Qualification</Label>
                <Input placeholder="e.g. M.Sc. Mathematics, TU" value={data.qualification} onChange={e => setData(d => ({ ...d, qualification: e.target.value }))} className={errors.qualification ? "border-red-400" : ""} />
                {errors.qualification && <p className="text-xs text-red-500 mt-1">{errors.qualification}</p>}
              </div>
              <div>
                <Label className="text-sm font-600 text-brand-navy flex items-center gap-1.5 mb-2"><BookOpen className="h-3.5 w-3.5" /> Subjects You Teach</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUBJECTS.map(s => (
                    <button key={s} type="button" onClick={() => toggleArr("subjects", s)}
                      className={`py-2 px-2.5 rounded-lg border-2 text-xs font-600 transition-all text-left ${data.subjects.includes(s) ? "border-brand-blue bg-brand-blue-light text-brand-blue" : "border-brand-border text-brand-text hover:border-brand-blue/40"}`}>{s}</button>
                  ))}
                </div>
                {errors.subjects && <p className="text-xs text-red-500 mt-1">{errors.subjects}</p>}
              </div>
              <div>
                <Label className="text-sm font-600 text-brand-navy mb-2 block">Classes You Teach</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CLASSES.map(c => (
                    <button key={c} type="button" onClick={() => toggleArr("classes", c)}
                      className={`py-2 px-2.5 rounded-lg border-2 text-xs font-600 transition-all text-left ${data.classes.includes(c) ? "border-brand-blue bg-brand-blue-light text-brand-blue" : "border-brand-border text-brand-text hover:border-brand-blue/40"}`}>{c}</button>
                  ))}
                </div>
                {errors.classes && <p className="text-xs text-red-500 mt-1">{errors.classes}</p>}
              </div>
              <div>
                <Label className="text-sm font-600 text-brand-navy mb-1.5 block">Years of Experience</Label>
                <select value={data.experience} onChange={e => setData(d => ({ ...d, experience: e.target.value }))}
                  className={`w-full h-10 px-3 rounded-md border text-sm bg-white text-brand-navy ${errors.experience ? "border-red-400" : "border-input"}`}>
                  <option value="">Select experience</option>
                  {["Less than 1 year", "1 year", "2 years", "3 years", "4 years", "5 years", "6-8 years", "9-10 years", "More than 10 years"].map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
              </div>
            </>
          )}

          {/* Step 3: Mode */}
          {step === 3 && (
            <div className="grid grid-cols-1 gap-3">
              {[
                { val: "home", label: "Home Tuition Only", desc: "I travel to the student's home" },
                { val: "online", label: "Online Classes Only", desc: "I teach via video call" },
                { val: "both", label: "Both Home & Online", desc: "I am comfortable with either mode" },
              ].map(opt => (
                <button key={opt.val} onClick={() => setData(d => ({ ...d, mode: opt.val }))}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${data.mode === opt.val ? "border-brand-blue bg-brand-blue-light" : "border-brand-border hover:border-brand-blue/40"}`}>
                  <div>
                    <p className={`font-[700] text-sm ${data.mode === opt.val ? "text-brand-blue" : "text-brand-navy"}`}>{opt.label}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
              {errors.mode && <p className="text-xs text-red-500">{errors.mode}</p>}
            </div>
          )}

          {/* Step 4: Availability */}
          {step === 4 && (
            <div>
              <p className="text-sm text-brand-muted mb-3 font-[500]">Select all that apply</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "morning", label: "Morning", desc: "6am – 10am" },
                  { val: "afternoon", label: "Afternoon", desc: "10am – 3pm" },
                  { val: "evening", label: "Evening", desc: "3pm – 8pm" },
                  { val: "flexible", label: "Flexible", desc: "Any time works" },
                ].map(opt => (
                  <button key={opt.val} type="button" onClick={() => toggleArr("availability", opt.val)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${data.availability.includes(opt.val) ? "border-brand-blue bg-brand-blue-light" : "border-brand-border hover:border-brand-blue/40"}`}>
                    <div className={`font-[700] text-sm ${data.availability.includes(opt.val) ? "text-brand-blue" : "text-brand-navy"}`}>{opt.label}</div>
                    <div className="text-xs text-brand-muted mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
              {errors.availability && <p className="text-xs text-red-500 mt-2">{errors.availability}</p>}
            </div>
          )}

          {/* Step 5: Fee & About */}
          {step === 5 && (
            <>
              <div>
                <Label className="text-sm font-600 text-brand-navy mb-1.5 block">Expected Fee (NPR / month)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input placeholder="Minimum (e.g. 3000)" value={data.feeMin} onChange={e => setData(d => ({ ...d, feeMin: e.target.value }))} />
                    <p className="text-xs text-brand-muted mt-1">Minimum</p>
                  </div>
                  <div>
                    <Input placeholder="Maximum (e.g. 6000)" value={data.feeMax} onChange={e => setData(d => ({ ...d, feeMax: e.target.value }))} />
                    <p className="text-xs text-brand-muted mt-1">Maximum</p>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-600 text-brand-navy mb-1.5 block">About You</Label>
                <Textarea placeholder="Tell students and parents about your teaching style, experience and approach..." rows={5}
                  value={data.about} onChange={e => setData(d => ({ ...d, about: e.target.value }))}
                  className={`resize-none ${errors.about ? "border-red-400" : ""}`} />
                {errors.about && <p className="text-xs text-red-500 mt-1">{errors.about}</p>}
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={() => { step === 1 ? setStep(0) : setStep(s => s - 1); setErrors({}); }}
              className="text-brand-muted hover:text-brand-navy gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button onClick={next} disabled={loading}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-700 rounded-full px-8 gap-2">
              {loading ? "Submitting..." : step === totalSteps ? "Submit Tutor Profile" : "Next"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
