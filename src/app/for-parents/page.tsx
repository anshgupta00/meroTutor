"use client";

import Link from "next/link";
import {
  MessageCircle,
  Search,
  ClipboardList,
  CheckCircle2,
  Phone,
  Star,
  Shield,
  Clock,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/9779762511114";
const PHONE_NUMBER = "+977-9762511114";

export default function ForParentsPage() {
  return (
    <div className="bg-brand-bg min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-full px-4 py-1.5 text-xs font-[800] mb-6">
            <MessageCircle className="w-3.5 h-3.5" />
            Nepal&apos;s Trusted Tutor Platform — Kathmandu Valley
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[800] text-slate-900 leading-[1.12] tracking-tight mb-5">
            Find the Right Tutor<br />
            <span className="text-brand-blue">for Your Child</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 font-[500] leading-relaxed mb-10 max-w-2xl mx-auto">
            Verified home &amp; online tutors across Kathmandu Valley. Tell us what you need —
            we&apos;ll match you with the right teacher within 24 hours, completely free.
          </p>

          {/* ── Primary CTAs ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">

            {/* WhatsApp — PRIMARY */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bc5a] text-white font-[800] text-base rounded-2xl px-8 py-4 shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              WhatsApp Us — Fast &amp; Easy
            </a>

            {/* Call */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-3 bg-white border-2 border-slate-200 hover:border-brand-blue text-slate-800 hover:text-brand-blue font-[800] text-base rounded-2xl px-8 py-4 transition-all w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              Call Us Directly
            </a>
          </div>

          {/* Helper text */}
          <p className="text-sm text-slate-400 font-[500] mb-12">
            Prefer filling a form?{" "}
            <Link href="/find-tutor" className="text-brand-blue hover:underline font-[600]">
              Post your requirement online →
            </Link>
          </p>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-[600] text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free Service
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" /> Matched Within 24 Hours
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Background-Verified Tutors
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" /> Free Replacement Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* ─── TWO PATHS ─────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-center text-xs font-[800] uppercase tracking-widest text-brand-muted mb-8">
          Choose How You Want to Proceed
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Path 1: WhatsApp / Call */}
          <div className="bg-white rounded-3xl border-2 border-green-200 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
              <MessageCircle className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-xl font-[800] text-brand-navy mb-2">
              Talk to a Coordinator
            </h2>
            <p className="text-sm text-slate-500 font-[500] leading-relaxed mb-6">
              WhatsApp or call us directly. Our coordinator will understand your needs and
              find the best tutor for your child — no form filling needed.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-[800] py-3 rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp: {PHONE_NUMBER}
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-brand-blue text-slate-700 hover:text-brand-blue font-[700] py-3 rounded-xl text-sm transition-colors"
              >
                <Phone className="w-4 h-4" /> Call: {PHONE_NUMBER}
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4 font-[500]">Available Sun – Fri, 8am – 7pm</p>
          </div>

          {/* Path 2: Online Form */}
          <div className="bg-white rounded-3xl border-2 border-brand-border p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-brand-blue-light rounded-2xl flex items-center justify-center mb-5">
              <ClipboardList className="w-7 h-7 text-brand-blue" />
            </div>
            <h2 className="text-xl font-[800] text-brand-navy mb-2">
              Post Your Requirement
            </h2>
            <p className="text-sm text-slate-500 font-[500] leading-relaxed mb-6">
              Fill in a quick form with your child&apos;s class, subjects, location and timing.
              We&apos;ll match a verified tutor and call you back within 24 hours.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <Link href="/find-tutor" className="w-full">
                <Button className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] py-3 rounded-xl text-sm h-auto">
                  <ClipboardList className="w-4 h-4 mr-2" /> Fill Tutor Request Form
                </Button>
              </Link>
              <Link href="/find-tutor#meet-our-tutors" className="w-full">
                <Button variant="outline" className="w-full border border-slate-200 hover:border-brand-blue text-slate-700 hover:text-brand-blue font-[700] py-3 rounded-xl text-sm h-auto">
                  <Search className="w-4 h-4 mr-2" /> Browse Tutor Profiles
                </Button>
              </Link>
            </div>
            <p className="text-xs text-slate-400 mt-4 font-[500]">Free • No registration required</p>
          </div>

        </div>
      </div>

      {/* ─── WHY MERO TUTOR ────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <span className="text-xs font-[800] uppercase tracking-widest text-brand-blue">
              Why Parents Trust Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-[800] text-brand-navy mt-2">
              We Make It Easy for You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Verified Tutors",
                desc: "Every tutor is ID and background verified. You can trust who comes to your home.",
                color: "bg-blue-50 text-brand-blue",
              },
              {
                icon: Clock,
                title: "Within 24 Hours",
                desc: "We shortlist the right tutor for your child within 24 hours of your request.",
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: Star,
                title: "Free Replacement",
                desc: "Not satisfied with your tutor? We replace them at no extra charge.",
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: UserCheck,
                title: "100% Free",
                desc: "Our service is completely free for parents. No hidden charges, no registration fees.",
                color: "bg-purple-50 text-purple-600",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-[800] text-brand-navy mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-500 font-[500] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STICKY BOTTOM WHATSAPP (mobile) ───────────────────────────────── */}
      <div className="fixed bottom-5 left-0 right-0 flex justify-center z-50 px-4 sm:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] text-white font-[800] text-sm px-6 py-3.5 rounded-full shadow-xl shadow-green-300/50 hover:bg-[#20bc5a] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Us Now
        </a>
      </div>

    </div>
  );
}
