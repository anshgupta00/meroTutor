import Link from "next/link";
import {
  ShieldCheck,
  GraduationCap,
  UserCheck,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Clock,
  Star,
  Target,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us & How It Works | Mero Tutor",
  description:
    "Learn about Mero Tutor — Nepal's leading platform connecting students, parents, and schools with verified home and online tutors across Nepal.",
};

const STATS = [
  { value: "2,000+", label: "Verified Tutors" },
  { value: "3,000+", label: "Students Taught" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "100%", label: "Background Checked" },
];

const PARENT_STEPS = [
  {
    number: "01",
    title: "Tell Us What You Need",
    desc: "Select the class, subject, location and whether you prefer home tuition or online classes. It takes less than a minute.",
  },
  {
    number: "02",
    title: "Browse or Get Matched",
    desc: "Browse available tutors based on your filters, or use our 'Help Me Find a Tutor' feature and our team will do the matching for you.",
  },
  {
    number: "03",
    title: "Request a Tutor",
    desc: "Submit a tutor request with your contact details. Our team will connect you and help arrange a free demo class.",
  },
  {
    number: "04",
    title: "Start Learning",
    desc: "Confirm timing and fee, and your child begins sessions — at home or online — with a fully verified tutor.",
  },
];

const TUTOR_STEPS = [
  {
    number: "01",
    title: "Create Your Profile",
    desc: "Register with your teaching details, subjects, availability and expected fee. Simple and quick.",
  },
  {
    number: "02",
    title: "Profile Review & Verification",
    desc: "We review your credentials and verify your academic background. Verified tutors are shown more prominently to parents.",
  },
  {
    number: "03",
    title: "Start Receiving Requests",
    desc: "Our team contacts you with matching student requests based on your subjects, location and availability.",
  },
];

const VERIFICATION_STEPS = [
  {
    step: "01",
    title: "Identity & Background Check",
    desc: "Nepal Citizenship, permanent address, and police background record verification before any tutor is listed.",
    icon: <ShieldCheck className="w-5 h-5 text-brand-blue" />,
  },
  {
    step: "02",
    title: "Academic Degree Verification",
    desc: "University transcripts, SLC/SEE, +2, and Bachelor/Master degree certificates are checked and authenticated.",
    icon: <GraduationCap className="w-5 h-5 text-slate-700" />,
  },
  {
    step: "03",
    title: "Subject Knowledge & Demo",
    desc: "Hands-on subject evaluation and teaching methodology assessment by our academic review team.",
    icon: <UserCheck className="w-5 h-5 text-slate-700" />,
  },
];

const FAQS = [
  {
    q: "Is Mero Tutor free for students and parents?",
    a: "Yes. Finding and requesting a tutor through Mero Tutor is completely free for students and parents.",
  },
  {
    q: "How are tutors verified?",
    a: "Every tutor goes through a 3-step process: identity & background check, academic degree verification, and a subject knowledge evaluation before they are listed.",
  },
  {
    q: "Can I request a demo class before committing?",
    a: "Yes. You can request a free demo class from any tutor's profile before deciding to continue.",
  },
  {
    q: "Where in Nepal do you provide tutors?",
    a: "We connect students with tutors across Nepal — including Kathmandu, Lalitpur, Bhaktapur, and beyond. Contact us to check availability in your area.",
  },
  {
    q: "Can I find an online tutor through Mero Tutor?",
    a: "Yes. Many tutors on our platform offer online tuition in addition to or instead of home tuition.",
  },
];

const TIMELINE = [
  { year: "2021", title: "Platform Founded", desc: "Launched in Kathmandu to connect parents with trusted home tutors." },
  { year: "2022", title: "1,000+ Verified Tutors", desc: "Introduced Nepal's first 3-step tutor background verification system." },
  { year: "2023", title: "Online & Institutional Hiring", desc: "Expanded to live online tuition and school/college faculty placement." },
  { year: "2024+", title: "Nepal's Largest Network", desc: "3,000+ students taught and 2,000+ verified tutors across Nepal." },
];

const VALUES = [
  { title: "Safety First", desc: "Every tutor entering a student's home is vetted through a 3-step verification process." },
  { title: "Quality Learning", desc: "We match students based on subject need, learning style, and location — not just availability." },
  { title: "Transparency", desc: "Clear tutor profiles, honest pricing, and no hidden fees for families or educators." },
  { title: "Accountability", desc: "Free replacement guarantee if a tutor is not a good fit — no questions asked." },
];

export default function AboutUsPage() {
  return (
    <div className="bg-brand-bg min-h-screen">

      {/* ─── HERO (Matching Home Page Split Layout) ───────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-4 py-1.5 text-xs font-[800] mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                All Tutors 100% Background Checked
              </div>

              <h1 className="text-4xl sm:text-5xl font-[800] text-slate-900 leading-[1.15] tracking-tight mb-5">
                Nepal&apos;s Most Trusted<br />
                <span className="text-brand-blue">Tutoring Network</span>
              </h1>

              <p className="text-lg text-slate-500 font-[500] leading-relaxed mb-8 max-w-lg">
                Mero Tutor connects students, parents, and educational institutes across Nepal with certified tutors for home tuition, online classes, and school staffing.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-2xl px-7 py-6 text-base shadow-lg shadow-blue-200"
                  asChild
                >
                  <Link href="/find-tutor">
                    Find a Tutor
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-800 hover:border-brand-blue hover:text-brand-blue font-[800] rounded-2xl px-7 py-6 text-base"
                  asChild
                >
                  <Link href="/hire-tutor">
                    Hire for Schools
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm font-[600] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  4.9/5 Rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-blue" />
                  Matched in &lt; 24 hrs
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
                  Why Choose Mero Tutor
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { label: "Active Tutors", value: "2,000+ Verified Tutors" },
                    { label: "Coverage", value: "Kathmandu, Lalitpur, Bhaktapur" },
                    { label: "Service Models", value: "Home, Online & Institutional" },
                    { label: "Verification", value: "Degree, Police & Demo Class" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-[600] text-slate-500">{stat.label}</span>
                      <span className="text-xs font-[800] text-slate-900">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-brand-blue-light/50 border border-brand-blue/20 rounded-2xl text-center">
                  <p className="text-xs font-[700] text-brand-blue mb-1">Looking for a tutor right now?</p>
                  <Link href="/help-me-find-a-tutor" className="text-xs font-[800] text-brand-navy hover:underline">
                    Try our guided matching wizard →
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-[800] text-brand-navy">{stat.value}</div>
                <div className="text-sm text-slate-500 font-[600] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="inline-block text-xs font-[800] uppercase tracking-widest bg-brand-blue-light text-brand-blue px-3.5 py-1 rounded-full mb-3">
              Our Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-[800] text-slate-900 tracking-tight">Driven by Quality &amp; Integrity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-xs">
              <h3 className="text-xl font-[800] text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed font-[500]">
                To empower every student across Nepal with accessible, customized, 1-on-1 tutoring. We simplify tutor discovery for parents and institutes while maintaining strict background safety standards and transparent pricing.
              </p>
            </div>
            <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-xs">
              <h3 className="text-xl font-[800] text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed font-[500]">
                To be recognized as the gold standard of private home tuition, digital learning, and institutional teacher staffing in Nepal — enabling educators to thrive and students to reach peak academic performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-100 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="inline-block text-xs font-[800] uppercase tracking-widest bg-brand-blue-light text-brand-blue px-3.5 py-1 rounded-full mb-3">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-[800] text-slate-900 tracking-tight">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-brand-blue/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-light flex items-center justify-center mb-4">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                </div>
                <h3 className="text-base font-[800] text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-[500]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MERGED: HOW IT WORKS SECTION ───────────────────────────────── */}
      <section id="how-it-works" className="bg-white border-b border-slate-100 py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-14 text-center mx-auto">
            <span className="inline-block text-xs font-[800] uppercase tracking-widest bg-brand-blue-light text-brand-blue px-3.5 py-1.5 rounded-full mb-4">
              Simple &amp; Transparent Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[800] text-slate-900 tracking-tight mb-4">
              How Mero Tutor Works
            </h2>
            <p className="text-slate-500 font-[500] text-base sm:text-lg leading-relaxed">
              Whether you are a parent looking for a trusted tutor or an educator seeking tuition assignments, getting started takes only minutes.
            </p>
          </div>

          {/* How It Works: For Parents & Students */}
          <div className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="inline-block text-xs font-[800] uppercase tracking-widest bg-brand-blue-light text-brand-blue px-3 py-1 rounded-full mb-2">
                  For Parents &amp; Students
                </span>
                <h3 className="text-2xl font-[800] text-slate-900">Finding a Tutor in 4 Easy Steps</h3>
              </div>
              <Link href="/find-tutor" className="hidden sm:inline-flex items-center text-xs font-[800] text-brand-blue hover:underline">
                Browse Directory →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PARENT_STEPS.map((step) => (
                <div key={step.number} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-5 hover:border-brand-blue/30 hover:shadow-xs transition-all">
                  <div className="text-3xl font-[800] text-brand-blue/40 leading-none flex-shrink-0 mt-0.5 select-none">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-base font-[800] text-slate-900 mb-1.5">{step.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-[500]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-full px-7 py-3 shadow-xs">
                <Link href="/find-tutor">Find a Tutor Now <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
          </div>

          {/* How It Works: For Tutors & Teachers */}
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="inline-block text-xs font-[800] uppercase tracking-widest bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full mb-2">
                  For Tutors &amp; Teachers
                </span>
                <h3 className="text-2xl font-[800] text-slate-900">Joining as a Tutor in 3 Steps</h3>
              </div>
              <Link href="/jobs" className="hidden sm:inline-flex items-center text-xs font-[800] text-brand-blue hover:underline">
                View Open Jobs →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TUTOR_STEPS.map((step) => (
                <div key={step.number} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-brand-blue/30 hover:shadow-xs transition-all">
                  <div className="text-4xl font-[800] text-emerald-600/40 mb-4 leading-none select-none">{step.number}</div>
                  <h4 className="text-base font-[800] text-slate-900 mb-1.5">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-[500]">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button asChild className="bg-slate-900 hover:bg-slate-700 text-white font-[800] rounded-full px-7 py-3 shadow-xs">
                <Link href="/become-a-tutor">Become a Tutor <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* ─── TUTOR VERIFICATION STANDARDS ─────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-xs font-[800] uppercase tracking-widest bg-brand-blue-light text-brand-blue px-3.5 py-1 rounded-full mb-3">
              Safety &amp; Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-[800] text-slate-900 tracking-tight">
              Our 3-Step Tutor Verification
            </h2>
            <p className="text-slate-500 font-[500] mt-3 leading-relaxed">
              Unlike unverified social media listings, every teacher on Mero Tutor is fully vetted before entering a student&apos;s home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFICATION_STEPS.map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
                <div className="text-4xl font-[800] text-slate-200 mb-4">{v.step}</div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-[800] text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-[500]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MERGED: FREQUENTLY ASKED QUESTIONS (FAQ) ─────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-xs font-[800] uppercase tracking-widest bg-brand-blue-light text-brand-blue px-3.5 py-1 rounded-full mb-3">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-[800] text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-[800] text-slate-900 mb-1.5 text-base">{faq.q}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-[500]">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR JOURNEY TIMELINE ─────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-xs font-[800] uppercase tracking-widest bg-brand-blue-light text-brand-blue px-3.5 py-1 rounded-full mb-3">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-[800] text-slate-900 tracking-tight">Building Nepal&apos;s Most Trusted Network</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="text-xs font-[800] text-brand-blue bg-brand-blue-light px-3 py-1 rounded-md inline-block mb-4">
                  {item.year}
                </div>
                <h3 className="text-base font-[800] text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-[500]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-teal-light via-white to-brand-blue-light rounded-3xl border border-brand-border p-10 lg:p-14 text-center shadow-sm">
            <div className="w-14 h-14 bg-brand-teal-light border border-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
              <HelpCircle className="h-7 w-7 text-brand-teal-dark" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-[900] text-brand-navy tracking-tight mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-brand-text font-[500] max-w-xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
              Whether you need a home tutor anywhere in Nepal or full-time teachers for your institution, we are ready to help you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-brand-teal hover:bg-brand-teal-dark text-white font-[800] rounded-full px-8 py-6 text-base shadow-sm" asChild>
                <Link href="/find-tutor">Find a Tutor</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-brand-border text-brand-navy hover:border-brand-teal hover:text-brand-teal rounded-full px-8 py-6 text-base font-[800]" asChild>
                <Link href="/hire-tutor">Institutional Staffing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
