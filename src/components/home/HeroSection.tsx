"use client";

import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Star,
  Clock,
  BookOpen,
  TrendingUp,
  Award,
  Building2,
  Sparkles,
  Home,
  Laptop,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LearningUniverse from "@/components/home/LearningUniverse";

const stats = [
  { value: "2,000+", label: "Verified Tutors", icon: Award },
  { value: "3,000+", label: "Students Taught", icon: BookOpen },
  { value: "98%", label: "Parent Satisfaction", icon: TrendingUp },
  { value: "24 hrs", label: "Avg. Match Time", icon: Clock },
];

export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes heroCardPop {
          0% { opacity: 0; transform: scale(0.85) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0px); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes heroSlideUp {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroSlideRight {
          0% { opacity: 0; transform: translateX(-24px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroImageReveal {
          0% { opacity: 0; transform: scale(0.95) translateY(24px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(8px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(8px) rotate(-360deg); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-text-gradient {
          background: linear-gradient(135deg, #2563eb 0%, #14b8a6 60%, #1d4ed8 100%);
          background-size: 200% 200%;
          animation: gradientShift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-float {
          animation: heroFloat 4s ease-in-out infinite;
        }
        .hero-float-delayed {
          animation: heroFloat 4s ease-in-out infinite 1s;
        }
        .hero-card-pop {
          animation: heroCardPop 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-slide-up {
          animation: heroSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-slide-right {
          animation: heroSlideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-image-reveal {
          animation: heroImageReveal 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-badge-shimmer {
          background: linear-gradient(90deg, #dbeafe 25%, #e0e7ff 50%, #dbeafe 75%);
          background-size: 200% 100%;
          animation: shimmer 2.5s linear infinite;
        }
        .hero-orb {
          animation: heroPulse 3s ease-in-out infinite;
        }
        .hero-orb-2 {
          animation: heroPulse 3s ease-in-out infinite 1.5s;
        }

        .floating-card {
          animation: heroCardPop 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .floating-card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .floating-card-hover:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 20px 40px -8px rgba(0,0,0,0.15);
        }

        .subject-pill {
          animation: heroCardPop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .subject-pill:hover {
          transform: translateY(-2px) scale(1.05);
        }
      `}</style>

      <section
        className="relative overflow-hidden bg-white"
        style={{
          background: "linear-gradient(160deg, #f0f7ff 0%, #ffffff 60%, #e0f2fe 100%)",
        }}
      >
        {/* ── Background Orbs ── */}
        <div
          className="hero-orb absolute pointer-events-none"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            top: "-200px",
            right: "-100px",
          }}
        />
        <div
          className="hero-orb-2 absolute pointer-events-none"
          style={{
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)",
            bottom: "-100px",
            left: "-150px",
          }}
        />

        {/* ── Dot-grid texture ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:pt-8 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── LEFT: Text Content ── */}
            <div>

              {/* Animated badge */}
              <div
                className="hero-slide-right inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7"
                style={{
                  animationDelay: "0.1s",
                  background: "linear-gradient(90deg, #dbeafe, #e0e7ff, #dbeafe)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s linear infinite, heroSlideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
                  border: "1px solid rgba(37,99,235,0.2)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-800 text-blue-700 tracking-wide">Nepal's Most Trusted Tutor Network</span>
              </div>

              {/* Headline */}
              <h1
                className="hero-slide-up text-4xl sm:text-5xl lg:text-[3.4rem] font-[900] leading-[1.1] tracking-tight mb-6"
                style={{ animationDelay: "0.2s", color: "#0f172a" }}
              >
                Find the{" "}
                <span className="hero-text-gradient">Perfect Tutor</span>
                <br />
                <span style={{ color: "#0f172a" }}>for Every Student</span>
              </h1>

              {/* Subheading */}
              <p
                className="hero-slide-up text-lg text-slate-500 font-[500] leading-relaxed mb-8 max-w-[480px]"
                style={{ animationDelay: "0.35s" }}
              >
                Mero Tutor connects students across Nepal with certified, background-checked tutors for home tuition, online classes, and institutional staffing.
              </p>

              {/* Service Offering Pills */}
              <div
                className="hero-slide-up flex flex-wrap gap-2.5 mb-9"
                style={{ animationDelay: "0.45s" }}
              >
                {[
                  { name: "Home Tuition", icon: Home },
                  { name: "Online Tuition", icon: Laptop },
                  { name: "Hire For Schools", icon: Building2 },
                  { name: "Hire For Any Institutes", icon: GraduationCap },
                ].map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <span
                      key={service.name}
                      className="subject-pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-[700] cursor-default shadow-sm"
                      style={{
                        animationDelay: `${0.5 + i * 0.08}s`,
                        background: "rgba(37,99,235,0.06)",
                        color: "#2563eb",
                        border: "1px solid rgba(37,99,235,0.18)",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      {service.name}
                    </span>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div
                className="hero-slide-up flex flex-wrap items-center gap-3 mb-9"
                style={{ animationDelay: "0.55s" }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden font-[800] rounded-2xl px-7 py-6 text-base text-white shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    boxShadow: "0 8px 24px -4px rgba(37,99,235,0.4)",
                  }}
                  asChild
                >
                  <Link href="/find-tutor">
                    <span className="relative z-10 flex items-center gap-2">
                      Find a Tutor
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                      }}
                    />
                  </Link>
                </Button>

                <a
                  href="https://wa.me/9779762511114?text=Namaste!%20I%20am%20looking%20for%20a%20tutor%20on%20Mero%20Tutor."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 font-[800] rounded-2xl px-6 py-3.5 text-base text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    boxShadow: "0 8px 20px -4px rgba(37,211,102,0.35)",
                  }}
                >
                  <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Us</span>
                </a>

                <Button
                  size="lg"
                  variant="outline"
                  className="group font-[800] rounded-2xl px-6 py-6 text-base"
                  style={{
                    border: "2px solid rgba(37,99,235,0.25)",
                    color: "#2563eb",
                    background: "rgba(37,99,235,0.04)",
                  }}
                  asChild
                >
                  <Link href="/hire-tutor">
                    <Building2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Hire for Schools
                  </Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div
                className="hero-slide-up flex flex-wrap items-center gap-5 text-sm font-[600] text-slate-500"
                style={{ animationDelay: "0.65s" }}
              >
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  4.9/5 from 2,000+ reviews
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Matched in under 24 hrs
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Free replacement guarantee
                </span>
              </div>
            </div>

            {/* ── RIGHT: Interactive Learning Universe ── */}
            <div
              className="relative"
              style={{
                height: "clamp(340px, 48vw, 560px)",
                // Subtle vignette so canvas blends into section background
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 90% at 55% 50%, black 55%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 90% 90% at 55% 50%, black 55%, transparent 100%)",
              }}
            >
              <LearningUniverse />

              {/* Hover hint — fades after load ── */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-[600] tracking-wide pointer-events-none select-none"
                style={{
                  animation: "heroSlideUp 0.6s ease both 2.5s, heroFloat 4s ease-in-out infinite 3.5s",
                }}
              >
                ✦ Explore the learning universe
              </div>
            </div>
          </div>

          {/* ── Bottom Stats Bar ── */}
          <div
            className="hero-slide-up mt-16 pt-10 border-t grid grid-cols-2 sm:grid-cols-4 gap-6"
            style={{
              animationDelay: "0.75s",
              borderColor: "#e2e8f0",
            }}
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="text-center group cursor-default"
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "#dbeafe" }}
                  >
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-[900] text-slate-900 tabular-nums">{s.value}</div>
                  <div className="text-sm text-slate-500 font-[600] mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
