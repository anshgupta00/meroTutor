import Link from "next/link";
import { Home, Laptop, Building2, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HelpCTA from "@/components/home/HelpCTA";

export const metadata = {
  title: "Our Services | Mero Tutor",
  description: "Explore Mero Tutor services including 1-on-1 Home Tuition, Online Classes, and Teacher Staffing for Schools, Colleges & Institutes.",
};

const SERVICES = [
  {
    id: "home-tuition",
    icon: <Home className="w-5 h-5 text-brand-blue" />,
    badge: "Most Popular",
    title: "1-on-1 Home Tuition",
    subtitle: "Personalized learning at your doorstep across Nepal",
    description:
      "Our verified home tutors provide focused 1-on-1 attention in the comfort and safety of your home. Customized pace, individual doubt resolution, and regular progress updates for parents.",
    features: [
      "Covers SEE, +2 Board, CBSE, IB, and A-Level curricula",
      "Flexible morning or evening timings",
      "3-step background-verified tutors only",
      "Free initial tutor matching consultation",
    ],
    cta: "Find Home Tutor",
    href: "/find-tutor?mode=home",
  },
  {
    id: "online-tuition",
    icon: <Laptop className="w-5 h-5 text-slate-700" />,
    badge: "Flexible & Convenient",
    title: "Live Online Tuition",
    subtitle: "Interactive digital classroom with subject specialists nationwide",
    description:
      "Learn from qualified educators across Nepal using digital whiteboards, screen sharing, and interactive problem solving. Ideal for flexible schedules and specialized exam preparation.",
    features: [
      "HD video interactive 1-on-1 sessions",
      "Recorded sessions available for revision",
      "Digital study materials and mock test sheets",
      "No commuting — learn from anywhere",
    ],
    cta: "Find Online Tutor",
    href: "/find-tutor?mode=online",
  },
  {
    id: "institutional-hiring",
    icon: <Building2 className="w-5 h-5 text-slate-700" />,
    badge: "For Institutions",
    title: "School & College Faculty Hiring",
    subtitle: "Qualified teacher staffing for schools, colleges & educational institutes",
    description:
      "We help schools, colleges, coaching centers, and educational institutes hire experienced subject teachers, guest lecturers, and entrance preparation experts — quickly and reliably.",
    features: [
      "Pre-screened and verified academic faculty",
      "Full-time, part-time, and guest lecturer placements",
      "Free replacement guarantee",
      "Customized contracts and engagement terms",
    ],
    cta: "Submit Hiring Request",
    href: "/hire-tutor",
  },
  {
    id: "exam-prep",
    icon: <BookOpen className="w-5 h-5 text-slate-700" />,
    badge: "High Success Rate",
    title: "Exam & Entrance Coaching",
    subtitle: "Targeted coaching for SEE, +2 Board, IOE, IOM & CMAT",
    description:
      "Specialized tutors with proven records coaching students for SEE, +2 Board exams, Engineering (IOE), Medical (IOM), and Management entrance tests. Structured, results-focused learning.",
    features: [
      "Past paper solutions and shortcut techniques",
      "Targeted weak area improvement plans",
      "Mock exams with performance analysis",
      "Guidance from subject toppers and exam experts",
    ],
    cta: "Find Exam Tutor",
    href: "/find-tutor",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Page Header */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-[800] uppercase tracking-widest text-brand-blue mb-4">What We Offer</p>
            <h1 className="text-4xl sm:text-5xl font-[800] text-slate-900 leading-[1.15] tracking-tight mb-4">
              Tutoring & Staffing<br />
              <span className="text-brand-blue">Solutions for Every Need</span>
            </h1>
            <p className="text-lg text-slate-500 font-[500] leading-relaxed">
              From 1-on-1 home tuition anywhere in Nepal to institutional teacher hiring for schools and colleges — tailored academic support backed by strict quality standards.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.id}
              className="border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-brand-blue/40 hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {svc.icon}
                  </div>
                  <span className="text-xs font-[800] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-full">
                    {svc.badge}
                  </span>
                </div>
                <h2 className="text-xl font-[800] text-slate-900 mb-1">{svc.title}</h2>
                <p className="text-sm font-[600] text-brand-blue mb-3">{svc.subtitle}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{svc.description}</p>

                <div className="space-y-2.5 border-t border-slate-100 pt-5 mb-6">
                  {svc.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-[500] text-slate-700">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-slate-900 hover:bg-slate-700 text-white font-[800] rounded-xl py-5" asChild>
                <Link href={svc.href}>
                  {svc.cta} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="border border-slate-200 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-[800] uppercase tracking-widest text-brand-blue mb-3">Institutional Partnership</p>
              <h2 className="text-2xl sm:text-3xl font-[800] text-slate-900 tracking-tight mb-3">
                Are You a School, College, or Institute?
              </h2>
              <p className="text-slate-500 font-[500] leading-relaxed">
                Partner with Mero Tutor to hire pre-screened subject teachers, science lab instructors, or entrance preparation experts — with guaranteed quality and 24–48 hr turnaround.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <Button size="lg" className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-2xl px-8 py-6 text-base shadow-md shadow-blue-100" asChild>
                <Link href="/hire-tutor">Submit Hiring Request <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Homepage Matching CTA */}
      <HelpCTA />
    </div>
  );
}
