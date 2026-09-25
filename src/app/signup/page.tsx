"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Eye, EyeOff, CheckCircle2, User, BookOpen, Building2,
  Phone, Mail, Lock, ArrowRight, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Role = "parent" | "tutor" | "school";

const ROLES: { id: Role; label: string; desc: string; icon: React.ElementType; color: string; ring: string; bg: string }[] = [
  {
    id: "parent",
    label: "Parent / Student",
    desc: "Find a verified tutor for your child",
    icon: User,
    color: "text-brand-blue",
    ring: "ring-brand-blue border-brand-blue",
    bg: "bg-blue-50",
  },
  {
    id: "tutor",
    label: "Tutor",
    desc: "Teach & earn avg. NPR 40k/month",
    icon: BookOpen,
    color: "text-emerald-600",
    ring: "ring-emerald-500 border-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    id: "school",
    label: "School / Institute",
    desc: "Hire qualified teachers fast",
    icon: Building2,
    color: "text-teal-600",
    ring: "ring-teal-500 border-teal-500",
    bg: "bg-teal-50",
  },
];

/* ── per-role extra field ─────────────────────────────────────────────────── */
function ExtraFields({ role }: { role: Role }) {
  if (role === "tutor") {
    return (
      <div>
        <Label htmlFor="signup-subject" className="text-sm font-[700] text-slate-700 mb-1.5 block">
          Main Subject(s) You Teach
        </Label>
        <Input id="signup-subject" placeholder="e.g. Mathematics, Physics, English" required />
      </div>
    );
  }
  if (role === "school") {
    return (
      <div>
        <Label htmlFor="signup-institute" className="text-sm font-[700] text-slate-700 mb-1.5 block">
          Institution Name
        </Label>
        <Input id="signup-institute" placeholder="e.g. Little Angels College, Lalitpur" required />
      </div>
    );
  }
  return null;
}

function SignUpContent() {
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role") as Role;
  const initialRole: Role =
    initialRoleParam === "school" || initialRoleParam === "tutor" || initialRoleParam === "parent"
      ? initialRoleParam
      : "parent";

  const [role, setRole] = useState<Role>(initialRole);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const r = searchParams.get("role") as Role;
    if (r === "school" || r === "tutor" || r === "parent") {
      setRole(r);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  const active = ROLES.find((r) => r.id === role)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Mero Tutor"
              width={140}
              height={48}
              className="h-10 w-auto mx-auto mb-4 object-contain"
              priority
            />
          </Link>
          <h1 className="text-3xl font-[800] text-slate-900 tracking-tight">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1.5">
            Already have one?{" "}
            <Link href={role === "school" ? "/login?role=school" : "/login"} className="text-brand-blue font-[700] hover:underline">
              Log in →
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 shadow-xl shadow-slate-200/60">

          {submitted ? (
            /* ── Success state ─────────────────────────────────────── */
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="text-xl font-[800] text-slate-900 mb-2">Account Created!</h2>
              <p className="text-slate-500 text-sm mb-2">
                Welcome to Mero Tutor as a{" "}
                <span className={`font-[700] ${active.color}`}>{active.label}</span>.
              </p>
              <p className="text-slate-400 text-xs mb-7">
                This is a demo registration. Full authentication coming soon.
              </p>
              <div className="flex flex-col gap-2.5">
                <Button asChild className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full font-[700]">
                  <Link href={role === "tutor" ? "/become-a-tutor" : role === "school" ? "/school-dashboard" : "/find-tutor"}>
                    Go to Dashboard <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button variant="ghost" onClick={() => setSubmitted(false)} className="text-slate-500 text-sm">
                  Back to Sign Up
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* ── Role picker ──────────────────────────────────────── */}
              <div className="mb-6">
                <p className="text-[11px] font-[800] uppercase tracking-widest text-slate-400 mb-3">I am signing up as</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {ROLES.map((r) => {
                    const Icon = r.icon;
                    const isActive = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`relative flex flex-col items-center gap-2 p-3.5 rounded-2xl border-2 transition-all text-center cursor-pointer ${
                          isActive
                            ? `${r.ring} ring-1 ${r.bg}`
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? r.bg : "bg-slate-50"} transition-colors`}>
                          <Icon className={`w-4.5 h-4.5 ${isActive ? r.color : "text-slate-400"}`} />
                        </div>
                        <div>
                          <p className={`text-xs font-[800] leading-tight ${isActive ? "text-slate-900" : "text-slate-500"}`}>
                            {r.id === "school" ? "School / Institute" : r.label}
                          </p>
                        </div>
                        {isActive && (
                          <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${r.id === "parent" ? "bg-brand-blue" : r.id === "tutor" ? "bg-emerald-500" : "bg-teal-500"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-400 font-[500] mt-2.5 text-center">{active.desc}</p>
              </div>

              {/* ── Form ─────────────────────────────────────────────── */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <Label htmlFor="signup-name" className="text-sm font-[700] text-slate-700 mb-1.5 block">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="signup-name"
                      placeholder={role === "school" ? "Contact person's name" : "Your full name"}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="signup-phone" className="text-sm font-[700] text-slate-700 mb-1.5 block">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="98XXXXXXXX"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="signup-email" className="text-sm font-[700] text-slate-700 mb-1.5 block">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Role-specific extra field */}
                <ExtraFields role={role} />

                {/* Password */}
                <div>
                  <Label htmlFor="signup-pass" className="text-sm font-[700] text-slate-700 mb-1.5 block">
                    Create Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="signup-pass"
                      type={showPass ? "text" : "password"}
                      placeholder="Minimum 8 characters"
                      className="pl-10 pr-10"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  By creating an account you agree to Mero Tutor&apos;s{" "}
                  <Link href="/about-us" className="text-brand-blue hover:underline font-[600]">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/about-us" className="text-brand-blue hover:underline font-[600]">Privacy Policy</Link>.
                </p>

                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white font-[800] rounded-full py-3 text-sm shadow-md transition-all ${
                    role === "tutor"
                      ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                      : role === "school"
                      ? "bg-brand-teal hover:bg-brand-teal-dark shadow-teal-200"
                      : "bg-brand-blue hover:bg-brand-blue-dark shadow-blue-200"
                  }`}
                >
                  {loading ? "Creating Account..." : `Create ${active.label} Account`}
                  {!loading && <ArrowRight className="w-4 h-4 ml-1.5 inline" />}
                </Button>
              </form>

              {/* ── Footer links ─────────────────────────────────────── */}
              <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-3 gap-2">
                {ROLES.filter((r) => r.id !== role).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className="flex items-center justify-center gap-1 text-[10px] font-[700] text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {r.id === "school" ? "School" : r.label} Sign Up
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Back link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          <Link href="/" className="hover:text-brand-blue transition-colors">← Back to Mero Tutor Home</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-500">Loading sign up...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
