"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CLASSES } from "@/data/classes";
import { SUBJECTS } from "@/data/subjects";
import { LOCATIONS } from "@/data/locations";

type WizardData = {
  studentClass: string;
  customClass: string;
  board: string;
  customBoard: string;
  subjects: string[];
  customSubject: string;
  mode: string;
  location: string;
  customLocation: string;
  shiftTime: string;
  duration: string;
  salaryBudget: string;
  startDate: string;
  genderPref: string;
  name: string;
  phone: string;
  email: string;
};

const INITIAL: WizardData = {
  studentClass: "",
  customClass: "",
  board: "",
  customBoard: "",
  subjects: [],
  customSubject: "",
  mode: "",
  location: "",
  customLocation: "",
  shiftTime: "",
  duration: "",
  salaryBudget: "NPR 8,000 – 12,000 / month",
  startDate: "Immediately",
  genderPref: "Any Gender",
  name: "",
  phone: "",
  email: "",
};

// Step 3 is board — optional (can be skipped)
const STEPS = [
  { id: 1, question: "Which class does the student study in?" },
  { id: 2, question: "Which subject(s) do they need help with?" },
  { id: 3, question: "Which board / curriculum are they following?", optional: true },
  { id: 4, question: "How would you prefer classes?" },
  { id: 5, question: "Where are you located?" },
  { id: 6, question: "When would you prefer classes?" },
  { id: 7, question: "What is your budget & start preference?" },
  { id: 8, question: "How can we contact you?" },
];

const CLASS_OPTIONS = [
  ...CLASSES,
  "Entrance Preparation",
];

const BOARD_OPTIONS = [
  { val: "CDC", label: "CDC", desc: "Class 1–10 (National Curriculum)" },
  { val: "NEB", label: "NEB", desc: "Class 11 / 12 (National Exam Board)" },
  { val: "CBSE", label: "CBSE", desc: "Central Board of Secondary Education" },
  { val: "A-Level", label: "A-Level", desc: "Cambridge Advanced Level" },
  { val: "IB", label: "IB", desc: "International Baccalaureate" },
];

export default function ParentRequestForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = STEPS.length;
  const progress = (step / totalSteps) * 100;
  const currentStep = STEPS[step - 1];

  function validate(): boolean {
    const e: Record<string, string> = {};

    if (step === 1) {
      const cls = data.studentClass === "Others" ? data.customClass.trim() : data.studentClass;
      if (!cls) e.studentClass = "Please select or enter a class";
    }
    if (step === 2) {
      const hasSelected = data.subjects.length > 0;
      const hasCustom = data.subjects.includes("Others") ? data.customSubject.trim() !== "" : true;
      if (!hasSelected) e.subjects = "Please select at least one subject";
      else if (!hasCustom) e.customSubject = "Please specify your subject";
    }
    // Step 3 (board) is optional — no validation
    if (step === 3 && data.board === "Others" && !data.customBoard.trim()) {
      e.customBoard = "Please specify your board or curriculum";
    }
    if (step === 4 && !data.mode) e.mode = "Please select a learning mode";
    if (step === 5) {
      const loc = data.location === "Other / Write your area" ? data.customLocation.trim() : data.location;
      if (!loc) e.location = "Please select or enter your location";
      else if (data.location === "Other / Write your area" && !data.customLocation.trim()) {
        e.customLocation = "Please enter your area";
      }
    }
    if (step === 6) {
      if (!data.shiftTime) e.shiftTime = "Please select a shift time";
      if (!data.duration) e.duration = "Please select a duration";
    }
    if (step === 8) {
      if (!data.name.trim()) e.name = "Please enter your name";
      if (!data.phone.trim()) e.phone = "Please enter your phone number";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function next() {
    if (!validate()) return;
    if (step < totalSteps) {
      setStep((s) => s + 1);
      setErrors({});
    } else {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      setLoading(false);
      setSubmitted(true);
    }
  }

  function skipStep() {
    setStep((s) => s + 1);
    setErrors({});
  }

  function toggleSubject(s: string) {
    setData((d) => ({
      ...d,
      subjects: d.subjects.includes(s)
        ? d.subjects.filter((x) => x !== s)
        : [...d.subjects, s],
    }));
  }

  // Derived display values for summary pills
  const displayClass = data.studentClass === "Others" ? data.customClass || "Others" : data.studentClass;
  const displayBoard = data.board === "Others" ? data.customBoard || "Others" : data.board;
  const displayLocation =
    data.location === "Other / Write your area" ? data.customLocation || "Other" : data.location;

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-brand-border p-8 shadow-sm mb-10 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-[800] text-brand-navy mb-3">
          We&apos;ve Received Your Request!
        </h2>
        <p className="text-brand-text leading-relaxed mb-2">
          Thank you, <strong className="text-brand-navy">{data.name}</strong>. Our team will review your
          requirements and match you with a verified tutor.
        </p>
        <p className="text-brand-text leading-relaxed mb-6">
          We&apos;ll contact you on{" "}
          <strong className="text-brand-navy">{data.phone}</strong> shortly.
        </p>
        <div className="bg-brand-bg rounded-xl p-4 text-sm mb-6">
          <p className="font-[600] text-brand-navy mb-1">Need faster help?</p>
          <a
            href="https://wa.me/9779762511114"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-[600] hover:underline"
          >
            WhatsApp us at +977-9762511114
          </a>
        </div>
        <Button
          variant="outline"
          onClick={() => { setSubmitted(false); setStep(1); setData(INITIAL); }}
          className="rounded-full border-brand-border text-brand-navy font-[700] px-6"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm mb-10">
      {/* Header */}
      <div className="mb-6 border-b border-brand-border pb-4">
        <h2 className="text-2xl sm:text-3xl font-[800] text-brand-navy">
          Post Your Tutor Requirement
        </h2>
        <p className="text-xs sm:text-sm text-brand-text mt-1">
          Fill in your tuition details below. Our coordinator will match you with a verified tutor within 24 hours.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-sm text-brand-muted mb-2">
          <span className="font-[600]">Step {step} of {totalSteps}</span>
          <div className="flex items-center gap-2">
            {currentStep.optional && (
              <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-[600]">
                Optional
              </span>
            )}
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>
        <div className="h-2 bg-brand-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-blue rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Card */}
      <div className="bg-brand-bg rounded-2xl border border-brand-border p-6">
        <p className="text-xs font-[700] text-brand-blue uppercase tracking-widest mb-2">Step {step}</p>
        <h3 className="text-xl font-[800] text-brand-navy mb-1">{currentStep.question}</h3>
        {currentStep.optional && (
          <p className="text-xs text-brand-muted mb-5">This step is optional — you can skip it.</p>
        )}
        {!currentStep.optional && <div className="mb-6" />}

        {/* ── Step 1: Class ── */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CLASS_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setData((d) => ({ ...d, studentClass: c, customClass: "" }))}
                  className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left ${
                    data.studentClass === c
                      ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                      : "border-brand-border text-brand-text hover:border-brand-blue/40"
                  }`}
                >
                  {c}
                </button>
              ))}
              {/* Others */}
              <button
                onClick={() => setData((d) => ({ ...d, studentClass: "Others" }))}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left flex items-center gap-1.5 ${
                  data.studentClass === "Others"
                    ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                    : "border-brand-border text-brand-text hover:border-brand-blue/40"
                }`}
              >
                <PenLine className="w-3.5 h-3.5" /> Others
              </button>
            </div>
            {data.studentClass === "Others" && (
              <div className="mt-2">
                <Input
                  placeholder="Please specify your class or level..."
                  value={data.customClass}
                  onChange={(e) => setData((d) => ({ ...d, customClass: e.target.value }))}
                  className="bg-white border-brand-border h-10 text-sm rounded-xl"
                  autoFocus
                />
              </div>
            )}
            {errors.studentClass && <p className="text-xs text-red-500">{errors.studentClass}</p>}
          </div>
        )}

        {/* ── Step 2: Subjects ── */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-sm text-brand-muted -mt-4 mb-2">Select all that apply</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSubject(s)}
                  className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left ${
                    data.subjects.includes(s)
                      ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                      : "border-brand-border text-brand-text hover:border-brand-blue/40"
                  }`}
                >
                  {s}
                </button>
              ))}
              {/* Others */}
              <button
                onClick={() => toggleSubject("Others")}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left flex items-center gap-1.5 ${
                  data.subjects.includes("Others")
                    ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                    : "border-brand-border text-brand-text hover:border-brand-blue/40"
                }`}
              >
                <PenLine className="w-3.5 h-3.5" /> Others
              </button>
            </div>
            {data.subjects.includes("Others") && (
              <div className="mt-2">
                <Input
                  placeholder="Please specify your subject(s)..."
                  value={data.customSubject}
                  onChange={(e) => setData((d) => ({ ...d, customSubject: e.target.value }))}
                  className="bg-white border-brand-border h-10 text-sm rounded-xl"
                  autoFocus
                />
                {errors.customSubject && <p className="text-xs text-red-500 mt-1">{errors.customSubject}</p>}
              </div>
            )}
            {errors.subjects && <p className="text-xs text-red-500">{errors.subjects}</p>}
          </div>
        )}

        {/* ── Step 3: Board (Optional) ── */}
        {step === 3 && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BOARD_OPTIONS.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setData((d) => ({ ...d, board: opt.val, customBoard: "" }))}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    data.board === opt.val
                      ? "border-brand-blue bg-brand-blue-light"
                      : "border-brand-border hover:border-brand-blue/40"
                  }`}
                >
                  <div>
                    <p className={`font-[700] text-sm ${data.board === opt.val ? "text-brand-blue" : "text-brand-navy"}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-brand-muted mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
              {/* Others */}
              <button
                onClick={() => setData((d) => ({ ...d, board: "Others" }))}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  data.board === "Others"
                    ? "border-brand-blue bg-brand-blue-light"
                    : "border-brand-border hover:border-brand-blue/40"
                }`}
              >
                <PenLine className={`w-4 h-4 flex-shrink-0 ${data.board === "Others" ? "text-brand-blue" : "text-brand-muted"}`} />
                <div>
                  <p className={`font-[700] text-sm ${data.board === "Others" ? "text-brand-blue" : "text-brand-navy"}`}>
                    Others
                  </p>
                  <p className="text-xs text-brand-muted mt-0.5">Specify your own board / curriculum</p>
                </div>
              </button>
            </div>
            {data.board === "Others" && (
              <div className="mt-2">
                <Input
                  placeholder="e.g. Pearson Edexcel, IGCSE, State Board..."
                  value={data.customBoard}
                  onChange={(e) => setData((d) => ({ ...d, customBoard: e.target.value }))}
                  className="bg-white border-brand-border h-10 text-sm rounded-xl"
                  autoFocus
                />
                {errors.customBoard && <p className="text-xs text-red-500 mt-1">{errors.customBoard}</p>}
              </div>
            )}
          </div>
        )}

        {/* ── Step 4: Mode ── */}
        {step === 4 && (
          <div className="grid grid-cols-1 gap-3">
            {[
              { val: "Home Tuition", label: "Home Tuition (In-Person)", desc: "A tutor comes to your home" },
              { val: "Online Tuition", label: "Online Tuition (Virtual)", desc: "Classes via video call" },
              { val: "Flexible (Both)", label: "Flexible — Either is Fine", desc: "Open to both options" },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setData((d) => ({ ...d, mode: opt.val }))}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                  data.mode === opt.val
                    ? "border-brand-blue bg-brand-blue-light"
                    : "border-brand-border hover:border-brand-blue/40"
                }`}
              >
                <div>
                  <p className={`font-[700] text-sm ${data.mode === opt.val ? "text-brand-blue" : "text-brand-navy"}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-brand-muted mt-0.5">{opt.desc}</p>
                </div>
              </button>
            ))}
            {errors.mode && <p className="text-xs text-red-500">{errors.mode}</p>}
          </div>
        )}

        {/* ── Step 5: Location ── */}
        {step === 5 && (
          <div className="space-y-3">
            <select
              value={data.location}
              onChange={(e) => setData((d) => ({ ...d, location: e.target.value, customLocation: "" }))}
              className="w-full h-12 px-4 rounded-xl border-2 border-brand-border text-brand-navy bg-white focus:outline-none focus:border-brand-blue text-sm"
            >
              <option value="">Select your area in Kathmandu Valley</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
              <option value="Other / Write your area">Other — Write your area</option>
            </select>
            {data.location === "Other / Write your area" && (
              <div>
                <Input
                  placeholder="e.g. Bhaktapur, Kirtipur, Budhanilkantha..."
                  value={data.customLocation}
                  onChange={(e) => setData((d) => ({ ...d, customLocation: e.target.value }))}
                  className="bg-white border-brand-border h-10 text-sm rounded-xl"
                  autoFocus
                />
                {errors.customLocation && (
                  <p className="text-xs text-red-500 mt-1">{errors.customLocation}</p>
                )}
              </div>
            )}
            {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
          </div>
        )}

        {/* ── Step 6: Schedule ── */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <Label className="text-sm font-[600] text-brand-navy mb-2 block">Tuition Shift Time *</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "Morning (6:30 AM – 9:00 AM)", label: "Morning", desc: "6:30 AM – 9:00 AM" },
                  { val: "Afternoon (12:00 PM – 3:00 PM)", label: "Afternoon", desc: "12:00 PM – 3:00 PM" },
                  { val: "Evening (4:00 PM – 7:00 PM)", label: "Evening", desc: "4:00 PM – 7:00 PM" },
                  { val: "Flexible Timing", label: "Flexible", desc: "Any time works" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setData((d) => ({ ...d, shiftTime: opt.val }))}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      data.shiftTime === opt.val
                        ? "border-brand-blue bg-brand-blue-light"
                        : "border-brand-border hover:border-brand-blue/40"
                    }`}
                  >
                    <div className={`font-[700] text-sm ${data.shiftTime === opt.val ? "text-brand-blue" : "text-brand-navy"}`}>
                      {opt.label}
                    </div>
                    <div className="text-xs text-brand-muted mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
              {errors.shiftTime && <p className="text-xs text-red-500 mt-1">{errors.shiftTime}</p>}
            </div>
            <div>
              <Label className="text-sm font-[600] text-brand-navy mb-2 block">Class Duration *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { val: "1 Hour / session", label: "1 Hour" },
                  { val: "1.5 Hours / session", label: "1.5 Hours" },
                  { val: "2 Hours / session", label: "2 Hours" },
                  { val: "Flexible Duration", label: "Flexible" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setData((d) => ({ ...d, duration: opt.val }))}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-center ${
                      data.duration === opt.val
                        ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                        : "border-brand-border text-brand-text hover:border-brand-blue/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration}</p>}
            </div>
          </div>
        )}

        {/* ── Step 7: Budget & Preferences ── */}
        {step === 7 && (
          <div className="space-y-5">
            <div>
              <Label className="text-sm font-[600] text-brand-navy mb-2 block">Expected Monthly Salary Budget *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "NPR 4,000 – 7,000 / month",
                  "NPR 8,000 – 12,000 / month",
                  "NPR 12,000 – 18,000 / month",
                  "NPR 18,000 – 25,000+ / month",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setData((d) => ({ ...d, salaryBudget: opt }))}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left ${
                      data.salaryBudget === opt
                        ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                        : "border-brand-border text-brand-text hover:border-brand-blue/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-[600] text-brand-navy mb-2 block">Start Date *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Immediately", "Within 3 Days", "Next Week", "Flexible"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setData((d) => ({ ...d, startDate: opt }))}
                      className={`py-2 px-3 rounded-xl border-2 text-xs font-[600] transition-all text-center ${
                        data.startDate === opt
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
                <Label className="text-sm font-[600] text-brand-navy mb-2 block">Gender Preference</Label>
                <div className="grid grid-cols-1 gap-2">
                  {["Any Gender", "Female Tutor Preferred", "Male Tutor Preferred"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setData((d) => ({ ...d, genderPref: opt }))}
                      className={`py-2 px-3 rounded-xl border-2 text-xs font-[600] transition-all text-left ${
                        data.genderPref === opt
                          ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                          : "border-brand-border text-brand-text hover:border-brand-blue/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 8: Contact ── */}
        {step === 8 && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-[600] text-brand-navy flex items-center gap-1.5 mb-1.5">
                <User className="h-3.5 w-3.5" /> Full Name *
              </Label>
              <Input
                placeholder="Parent or student name"
                value={data.name}
                onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                className={errors.name ? "border-red-400" : ""}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label className="text-sm font-[600] text-brand-navy flex items-center gap-1.5 mb-1.5">
                <Phone className="h-3.5 w-3.5" /> Contact Phone Number *
              </Label>
              <Input
                type="tel"
                placeholder="+977-98XXXXXXXX"
                value={data.phone}
                onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                className={errors.phone ? "border-red-400" : ""}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Label className="text-sm font-[600] text-brand-navy flex items-center gap-1.5 mb-1.5">
                <Mail className="h-3.5 w-3.5" /> Email Address (Optional)
              </Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={data.email}
                onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => { setStep((s) => s - 1); setErrors({}); }}
            disabled={step === 1}
            className="text-brand-muted hover:text-brand-navy gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <div className="flex items-center gap-2">
            {currentStep.optional && (
              <Button
                variant="ghost"
                onClick={skipStep}
                className="text-brand-muted hover:text-brand-navy text-sm font-[600]"
              >
                Skip
              </Button>
            )}
            <Button
              onClick={next}
              disabled={loading}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[700] rounded-full px-8 gap-2"
            >
              {loading ? "Submitting..." : step === totalSteps ? "Submit Tutor Request" : "Next"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Pills */}
      {step > 1 && (
        <div className="mt-4 bg-brand-bg rounded-2xl border border-brand-border p-3 flex flex-wrap gap-2">
          {displayClass && (
            <span className="text-xs bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded-full font-[600]">
              {displayClass}
            </span>
          )}
          {data.subjects.map((s) => (
            <span key={s} className="text-xs bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded-full font-[600]">
              {s === "Others" && data.customSubject ? data.customSubject : s}
            </span>
          ))}
          {displayBoard && step > 3 && (
            <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-[600]">
              {displayBoard}
            </span>
          )}
          {data.mode && step > 4 && (
            <span className="text-xs bg-brand-teal-light text-brand-teal-dark px-2.5 py-1 rounded-full font-[600]">
              {data.mode}
            </span>
          )}
          {displayLocation && step > 5 && (
            <span className="text-xs bg-gray-100 text-brand-text px-2.5 py-1 rounded-full font-[600]">
              {displayLocation}
            </span>
          )}
          {data.shiftTime && step > 6 && (
            <span className="text-xs bg-brand-yellow-light text-brand-yellow-dark px-2.5 py-1 rounded-full font-[600]">
              {data.shiftTime}
            </span>
          )}
          {data.salaryBudget && step > 7 && (
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-[600]">
              {data.salaryBudget}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
