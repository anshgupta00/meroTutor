"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Sparkles,
  ShieldCheck,
  Clock,
  Star,
  CheckCircle2,
  Globe,
  Languages,
} from "lucide-react";
import { FindTutorContent } from "@/app/find-tutor/page";

const PHONE_NUMBER = "+977-9762511114";

const HERO_TRANSLATIONS = {
  en: {
    badge: "Nepal's Most Trusted Tutor Platform · 100% Free Service for Parents",
    titleLine1: "Find the Perfect Tutor",
    titleLine2: "for Your Child",
    subheading:
      "Connect with certified, background-checked home & online tutors across Nepal. Tell us your requirement or browse verified profiles below.",
    whatsappBtn: "WhatsApp Us Directly",
    callBtn: `Call ${PHONE_NUMBER}`,
    whatsappMsg: "Namaste! I am a parent looking for a tutor for my child.",
    trust1: "100% Free Service",
    trust2: "Background Checked Tutors",
    trust3: "Matched Under 24 Hours",
    trust4: "Free Replacement Guarantee",
  },
  np: {
    badge: "नेपालको उत्कृष्ट ट्युटर प्लेटफर्म · अभिभावकहरूका लागि १००% नि:शुल्क सेवा",
    titleLine1: "तपाईंको बच्चाको लागि",
    titleLine2: "उत्कृष्ट ट्युटर खोज्नुहोस्",
    subheading:
      "नेपालभरका प्रमाणित र अनुभवप्राप्त होम तथा अनलाइन ट्युटरहरूसँग जोडिनुहोस्। आफ्नो आवश्यकता बताउनुहोस् वा ट्युटर प्रोफाइलहरू हेर्नुहोस्।",
    whatsappBtn: "ह्वाट्सएप (WhatsApp) मा सम्पर्क गर्नुहोस्",
    callBtn: `फोन गर्नुहोस्: ${PHONE_NUMBER}`,
    whatsappMsg: "नमस्ते! म मेरो बच्चाको लागि योग्य ट्युटर खोज्दैछु।",
    trust1: "१००% नि:शुल्क सेवा",
    trust2: "प्रमाणित तथा सुरक्षित ट्युटरहरू",
    trust3: "२४ घण्टलभित्र ट्युटर मिलाइने",
    trust4: "नि:शुल्क ट्युटर सट्टा (Replacement) ग्यारेन्टी",
  },
};

export default function ForParentsPage() {
  const [lang, setLang] = useState<"en" | "np">("en");
  const t = HERO_TRANSLATIONS[lang];

  const whatsappUrl = `https://wa.me/9779762511114?text=${encodeURIComponent(t.whatsappMsg)}`;

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* ─── ELEGANT HERO SECTION FOR PARENTS ─────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-white border-b border-slate-200/80"
        style={{
          background: "linear-gradient(160deg, #f0f7ff 0%, #ffffff 65%, #e0f2fe 100%)",
        }}
      >
        {/* Decorative Background Orbs */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            top: "-150px",
            right: "-100px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 text-center">

          {/* Language Switcher Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center p-1 bg-slate-100/90 border border-slate-200/90 rounded-full shadow-2xs">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-[800] transition-all duration-200 ${
                  lang === "en"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                English
              </button>

              <button
                type="button"
                onClick={() => setLang("np")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-[800] transition-all duration-200 ${
                  lang === "np"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Languages className="w-3.5 h-3.5" />
                नेपाली (Nepali)
              </button>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-[800] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[900] text-slate-900 leading-[1.12] tracking-tight mb-5">
            {t.titleLine1} <br />
            <span className="text-blue-600">{t.titleLine2}</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 font-[500] leading-relaxed mb-9 max-w-2xl mx-auto">
            {t.subheading}
          </p>

          {/* Direct Contact CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bc5a] text-white font-[800] text-base rounded-2xl px-8 py-4 shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              <span>{t.whatsappBtn}</span>
            </a>

            {/* Parent Dashboard Link */}
            <Link
              href="/parent-dashboard"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-[800] text-base rounded-2xl px-8 py-4 shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto"
            >
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <span>Open Parent Dashboard</span>
            </Link>

            {/* Direct Call */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-2.5 bg-white border-2 border-slate-200 hover:border-blue-500 text-slate-800 hover:text-blue-600 font-[800] text-base rounded-2xl px-8 py-4 transition-all w-full sm:w-auto shadow-xs"
            >
              <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>{t.callBtn}</span>
            </a>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-[600] text-slate-500 pt-5 border-t border-slate-200/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.trust1}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> {t.trust2}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" /> {t.trust3}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {t.trust4}
            </span>
          </div>

        </div>
      </section>

      {/* ─── DIRECT FIND A TUTOR CONTENT BELOW ────────────────────────────── */}
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">
            Loading tutors...
          </div>
        }
      >
        <FindTutorContent lang={lang} />
      </Suspense>

    </div>
  );
}
