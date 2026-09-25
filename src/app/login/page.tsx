"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Eye, EyeOff, CheckCircle2, Sparkles, ArrowRight,
  Search, User, BookOpen, Building2, Phone, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Role = "parent" | "tutor" | "school" | "admin";

const ROLES: {
  id: Role; label: string; shortLabel: string; placeholder: string;
  icon: React.ElementType; color: string; ring: string; bg: string; accent: string;
}[] = [
  {
    id: "parent",
    label: "Parent / Student",
    shortLabel: "Parent",
    placeholder: "Phone number or email",
    icon: User,
    color: "text-brand-blue",
    ring: "ring-brand-blue border-brand-blue",
    bg: "bg-blue-50",
    accent: "bg-brand-blue hover:bg-brand-blue-dark shadow-blue-200",
  },
  {
    id: "tutor",
    label: "Tutor",
    shortLabel: "Tutor",
    placeholder: "Registered phone or email",
    icon: BookOpen,
    color: "text-emerald-600",
    ring: "ring-emerald-500 border-emerald-500",
    bg: "bg-emerald-50",
    accent: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
  },
  {
    id: "school",
    label: "School / Institute",
    shortLabel: "School",
    placeholder: "Institution email or contact",
    icon: Building2,
    color: "text-teal-600",
    ring: "ring-teal-500 border-teal-500",
    bg: "bg-teal-50",
    accent: "bg-brand-teal hover:bg-brand-teal-dark shadow-teal-200",
  },
  {
    id: "admin",
    label: "Admin Panel",
    shortLabel: "Admin",
    placeholder: "Admin email or username",
    icon: Sparkles,
    color: "text-rose-600",
    ring: "ring-rose-500 border-rose-500",
    bg: "bg-rose-50",
    accent: "bg-rose-600 hover:bg-rose-700 shadow-rose-200",
  },
];

function LoginContent() {
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role") as Role;
  const initialRole: Role =
    initialRoleParam === "school" || initialRoleParam === "tutor" || initialRoleParam === "parent" || initialRoleParam === "admin"
      ? initialRoleParam
      : "parent";

  const [role, setRole] = useState<Role>(initialRole);
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const r = searchParams.get("role") as Role;
    if (r === "school" || r === "tutor" || r === "parent") {
      setRole(r);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    setSubmitted(true);
  }

  const active = ROLES.find((r) => r.id === role)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

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
          <h1 className="text-3xl font-[800] text-slate-900 tracking-tight">
            {role === "school" ? "School / Institute Login" : "Welcome back"}
          </h1>
          <p className="text-slate-500 text-sm mt-1.5">
            New here?{" "}
            <Link href={role === "school" ? "/signup?role=school" : "/signup"} className="text-brand-blue font-[700] hover:underline">
              Create an account →
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 shadow-xl shadow-slate-200/60">

          {submitted ? (
            /* ── Success ──────────────────────────────────────────── */
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="text-xl font-[800] text-slate-900 mb-2">Login Successful!</h2>
              <p className="text-slate-500 text-sm mb-1.5">
                Signed in as{" "}
                <span className={`font-[700] ${active.color}`}>{active.label}</span>
              </p>
              <p className="text-slate-400 text-xs mb-7">
                This is a demo login. Full authentication coming soon.
              </p>
              <div className="flex flex-col gap-2.5">
                <Button
                  asChild
                  className={`w-full text-white rounded-full font-[700] shadow-md ${active.accent}`}
                >
                  <Link
                    href={
                      role === "admin"
                        ? "/admin-dashboard"
                        : role === "tutor"
                        ? "/tutor-dashboard"
                        : role === "school"
                        ? "/school-dashboard"
                        : "/parent-dashboard"
                    }
                  >
                    Go to Dashboard <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSubmitted(false)}
                  className="text-slate-500 text-sm"
                >
                  Back to Login
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* ── Role picker ──────────────────────────────────────── */}
              <div className="mb-6">
                <p className="text-[11px] font-[800] uppercase tracking-widest text-slate-400 mb-3">
                  Sign in as
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {ROLES.map((r) => {
                    const Icon = r.icon;
                    const isActive = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 transition-all text-center cursor-pointer ${
                          isActive
                            ? `${r.ring} ring-1 ${r.bg}`
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? r.color : "text-slate-400"}`} />
                        <span className={`text-xs font-[800] ${isActive ? "text-slate-900" : "text-slate-500"}`}>
                          {r.shortLabel}
                        </span>
                        {isActive && (
                          <div
                            className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${
                              r.id === "parent" ? "bg-brand-blue" : r.id === "tutor" ? "bg-emerald-500" : "bg-teal-500"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Login form ───────────────────────────────────────── */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label
                    htmlFor="login-contact"
                    className="text-sm font-[700] text-slate-700 mb-1.5 block"
                  >
                    Phone / Email
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="login-contact"
                      placeholder={active.placeholder}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label htmlFor="login-pass" className="text-sm font-[700] text-slate-700">
                      Password
                    </Label>
                    <button
                      type="button"
                      className="text-xs text-brand-blue font-[700] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="login-pass"
                      type={showPass ? "text" : "password"}
                      placeholder="Your password"
                      className="pl-10 pr-10"
                      required
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

                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white font-[800] rounded-full py-3 text-sm shadow-md transition-all ${active.accent}`}
                >
                  {loading ? "Signing In..." : `Login as ${active.shortLabel}`}
                </Button>
              </form>

              {/* ── Role-specific bottom section ─────────────────────── */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                {role === "parent" && (
                  <div className="bg-gradient-to-br from-blue-50 to-emerald-50/60 rounded-2xl border border-slate-200 p-4 text-center">
                    <div className="inline-flex items-center gap-1.5 text-xs font-[700] text-brand-blue mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Looking for a Tutor Right Now?
                    </div>
                    <p className="text-xs text-slate-500 mb-3">No login needed to search or request a tutor.</p>
                    <div className="space-y-2">
                      <Button
                        asChild
                        className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full text-xs font-[700] h-9"
                      >
                        <Link href="/help-me-find-a-tutor">
                          Find a Tutor for My Child <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-[700] h-9"
                      >
                        <Link href="/find-tutor">
                          <Search className="w-3.5 h-3.5 mr-1.5" /> Browse Tutor Directory
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {role === "tutor" && (
                  <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 text-center">
                    <p className="text-xs font-[700] text-emerald-700 mb-1">Not registered yet?</p>
                    <p className="text-xs text-slate-500 mb-3">Join 2,000+ verified tutors on Mero Tutor.</p>
                    <Button
                      asChild
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-[700] h-9"
                    >
                      <Link href="/become-a-tutor">
                        Register as a Tutor <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                )}

                {role === "school" && (
                  <div className="bg-teal-50 rounded-2xl border border-teal-100 p-4 text-center">
                    <p className="text-xs font-[700] text-teal-700 mb-1">Not registered yet?</p>
                    <p className="text-xs text-slate-500 mb-3">Partner with Mero Tutor for faculty placement.</p>
                    <Button
                      asChild
                      className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full text-xs font-[700] h-9"
                    >
                      <Link href="/signup?role=school">
                        Register Your Institution <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              <p className="text-center text-[11px] text-slate-400 mt-4">
                Don&apos;t have an account?{" "}
                <Link href={role === "school" ? "/signup?role=school" : "/signup"} className="text-brand-blue font-[700] hover:underline">
                  Sign Up Free →
                </Link>
              </p>
            </>
          )}
        </div>

        {/* Back */}
        <p className="text-center text-xs text-slate-400 mt-6">
          <Link href="/" className="hover:text-brand-blue transition-colors">
            ← Back to Mero Tutor Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-500">Loading login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
