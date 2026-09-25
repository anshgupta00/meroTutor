"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HelpCTA from "@/components/home/HelpCTA";
import { CLASSES } from "@/data/classes";
import { SUBJECTS } from "@/data/subjects";
import { LOCATIONS } from "@/data/locations";

type WizardData = {
  class: string;
  subjects: string[];
  mode: string;
  location: string;
  timing: string;
  name: string;
  phone: string;
  email: string;
};

const INITIAL: WizardData = {
  class: "", subjects: [], mode: "", location: "", timing: "", name: "", phone: "", email: "",
};

const STEPS = [
  { id: 1, question: "Which class does the student study in?" },
  { id: 2, question: "Which subject(s) do they need help with?" },
  { id: 3, question: "How would you prefer classes?" },
  { id: 4, question: "Where are you located?" },
  { id: 5, question: "When would you prefer classes?" },
  { id: 6, question: "How can we contact you?" },
];

export default function HelpMeFindPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = STEPS.length;
  const progress = (step / totalSteps) * 100;

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (step === 1 && !data.class) e.class = "Please select a class";
    if (step === 2 && data.subjects.length === 0) e.subjects = "Please select at least one subject";
    if (step === 3 && !data.mode) e.mode = "Please select a learning mode";
    if (step === 4 && !data.location) e.location = "Please select your location";
    if (step === 5 && !data.timing) e.timing = "Please select a preferred time";
    if (step === 6) {
      if (!data.name.trim()) e.name = "Please enter your name";
      if (!data.phone.trim()) e.phone = "Please enter your phone number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function next() {
    if (!validate()) return;
    if (step < totalSteps) {
      setStep(s => s + 1);
      setErrors({});
    } else {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1200));
      setLoading(false);
      setSubmitted(true);
    }
  }

  function toggleSubject(s: string) {
    setData(d => ({
      ...d,
      subjects: d.subjects.includes(s) ? d.subjects.filter(x => x !== s) : [...d.subjects, s],
    }));
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-brand-border p-10 max-w-md w-full text-center shadow-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-[800] text-brand-navy mb-3">We&apos;ve Received Your Request!</h1>
          <p className="text-brand-text leading-relaxed mb-6">
            Our team will review your requirements and help you find a suitable tutor. We&apos;ll contact you on{" "}
            <strong className="text-brand-navy">{data.phone}</strong> shortly.
          </p>
          <div className="bg-brand-bg rounded-xl p-4 text-sm mb-6">
            <p className="font-[600] text-brand-navy mb-1">Need faster help?</p>
            <a href="https://wa.me/9779762511114" target="_blank" rel="noopener noreferrer"
              className="text-green-600 font-[600] hover:underline">WhatsApp us at +977-9762511114</a>
          </div>
          <Button asChild className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full font-[700]">
            <Link href="/find-tutor">Browse Tutors Yourself <ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-brand-muted mb-3">
            <span className="font-[600]">Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-brand-border rounded-full overflow-hidden">
            <div className="h-full bg-brand-blue rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-brand-border p-8 shadow-sm">
          <p className="text-xs font-[700] text-brand-blue uppercase tracking-widest mb-3">Step {step}</p>
          <h1 className="text-2xl font-[800] text-brand-navy mb-7">{STEPS[step - 1].question}</h1>

          {/* Step 1: Class */}
          {step === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CLASSES.map((c) => (
                <button key={c} onClick={() => setData(d => ({ ...d, class: c }))}
                  className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left ${data.class === c ? "border-brand-blue bg-brand-blue-light text-brand-blue" : "border-brand-border text-brand-text hover:border-brand-blue/40"}`}>
                  {c}
                </button>
              ))}
              {errors.class && <p className="col-span-full text-xs text-red-500">{errors.class}</p>}
            </div>
          )}

          {/* Step 2: Subjects */}
          {step === 2 && (
            <div>
              <p className="text-sm text-brand-muted mb-3">Select all that apply</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SUBJECTS.map((s) => (
                  <button key={s} onClick={() => toggleSubject(s)}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left ${data.subjects.includes(s) ? "border-brand-blue bg-brand-blue-light text-brand-blue" : "border-brand-border text-brand-text hover:border-brand-blue/40"}`}>
                    {s}
                  </button>
                ))}
              </div>
              {errors.subjects && <p className="text-xs text-red-500 mt-2">{errors.subjects}</p>}
            </div>
          )}

          {/* Step 3: Mode */}
          {step === 3 && (
            <div className="grid grid-cols-1 gap-3">
              {[
                { val: "home", label: "Home Tuition", desc: "A tutor comes to your home" },
                { val: "online", label: "Online Tuition", desc: "Classes via video call" },
                { val: "either", label: "Either is Fine", desc: "Open to both options" },
              ].map((opt) => (
                <button key={opt.val} onClick={() => setData(d => ({ ...d, mode: opt.val }))}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${data.mode === opt.val ? "border-brand-blue bg-brand-blue-light" : "border-brand-border hover:border-brand-blue/40"}`}>
                  <div>
                    <p className={`font-[700] text-sm ${data.mode === opt.val ? "text-brand-blue" : "text-brand-navy"}`}>{opt.label}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
              {errors.mode && <p className="text-xs text-red-500">{errors.mode}</p>}
            </div>
          )}

          {/* Step 4: Location */}
          {step === 4 && (
            <div>
              <select value={data.location} onChange={(e) => setData(d => ({ ...d, location: e.target.value }))}
                className="w-full h-12 px-4 rounded-xl border-2 border-brand-border text-brand-navy bg-white focus:outline-none focus:border-brand-blue text-sm">
                <option value="">Select your location in Nepal</option>
                {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              {errors.location && <p className="text-xs text-red-500 mt-2">{errors.location}</p>}
            </div>
          )}

          {/* Step 5: Timing */}
          {step === 5 && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "morning", label: "Morning", desc: "6am – 10am" },
                { val: "afternoon", label: "Afternoon", desc: "10am – 3pm" },
                { val: "evening", label: "Evening", desc: "3pm – 8pm" },
                { val: "flexible", label: "Flexible", desc: "Any time works" },
              ].map((opt) => (
                <button key={opt.val} onClick={() => setData(d => ({ ...d, timing: opt.val }))}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${data.timing === opt.val ? "border-brand-blue bg-brand-blue-light" : "border-brand-border hover:border-brand-blue/40"}`}>
                  <div className={`font-[700] text-sm ${data.timing === opt.val ? "text-brand-blue" : "text-brand-navy"}`}>{opt.label}</div>
                  <div className="text-xs text-brand-muted mt-0.5">{opt.desc}</div>
                </button>
              ))}
              {errors.timing && <p className="col-span-full text-xs text-red-500">{errors.timing}</p>}
            </div>
          )}

          {/* Step 6: Contact */}
          {step === 6 && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-[600] text-brand-navy flex items-center gap-1.5 mb-1.5">
                  <User className="h-3.5 w-3.5" /> Your Name
                </Label>
                <Input placeholder="Parent or guardian name" value={data.name}
                  onChange={(e) => setData(d => ({ ...d, name: e.target.value }))}
                  className={errors.name ? "border-red-400" : ""} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label className="text-sm font-[600] text-brand-navy flex items-center gap-1.5 mb-1.5">
                  <Phone className="h-3.5 w-3.5" /> Phone Number
                </Label>
                <Input placeholder="+977-XXXXXXXXXX" value={data.phone}
                  onChange={(e) => setData(d => ({ ...d, phone: e.target.value }))}
                  className={errors.phone ? "border-red-400" : ""} />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label className="text-sm font-[600] text-brand-navy flex items-center gap-1.5 mb-1.5">
                  <Mail className="h-3.5 w-3.5" /> Email (Optional)
                </Label>
                <Input type="email" placeholder="your@email.com" value={data.email}
                  onChange={(e) => setData(d => ({ ...d, email: e.target.value }))} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="ghost" onClick={() => { setStep(s => s - 1); setErrors({}); }}
              disabled={step === 1} className="text-brand-muted hover:text-brand-navy gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button onClick={next} disabled={loading}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[700] rounded-full px-8 gap-2">
              {loading ? "Submitting..." : step === totalSteps ? "Find a Tutor for Me" : "Next"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Summary panel */}
        {step > 1 && (
          <div className="mt-4 bg-white rounded-2xl border border-brand-border p-4 flex flex-wrap gap-2">
            {data.class && <span className="text-xs bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded-full font-[600]">{data.class}</span>}
            {data.subjects.map(s => <span key={s} className="text-xs bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded-full font-[600]">{s}</span>)}
            {data.mode && <span className="text-xs bg-brand-teal-light text-brand-teal-dark px-2.5 py-1 rounded-full font-[600]">{data.mode}</span>}
            {data.location && <span className="text-xs bg-gray-100 text-brand-text px-2.5 py-1 rounded-full font-[600]">{data.location}</span>}
            {data.timing && <span className="text-xs bg-brand-yellow-light text-brand-yellow-dark px-2.5 py-1 rounded-full font-[600]">{data.timing}</span>}
          </div>
        )}
      </div>
      <HelpCTA />
    </div>
  );
}
