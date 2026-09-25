import type { Metadata } from "next";
import Link from "next/link";
import { Wifi, Calendar, User, Globe, Monitor, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HelpCTA from "@/components/home/HelpCTA";

export const metadata: Metadata = {
  title: "Online Tuition | Mero Tutor",
  description: "Find online tutors for students in Nepal. Flexible, one-to-one online classes for all subjects and classes.",
};

const BENEFITS = [
  { icon: <Globe className="h-5 w-5 text-brand-teal" />, title: "Learn from Anywhere", desc: "No need to travel. Your child can learn from the comfort of home, regardless of location." },
  { icon: <Calendar className="h-5 w-5 text-brand-teal" />, title: "Flexible Scheduling", desc: "Arrange classes at times that work best for your child and the tutor — morning, afternoon or evening." },
  { icon: <User className="h-5 w-5 text-brand-teal" />, title: "One-to-One Learning", desc: "Full attention from the tutor in every class. No group distractions." },
  { icon: <Monitor className="h-5 w-5 text-brand-teal" />, title: "Easy Setup", desc: "Classes via Google Meet, Zoom or WhatsApp Video. No complicated software needed." },
  { icon: <Wifi className="h-5 w-5 text-brand-teal" />, title: "All Subjects Available", desc: "Online tutors available for Mathematics, Science, English and all other subjects." },
  { icon: <Globe className="h-5 w-5 text-brand-teal" />, title: "Access More Tutors", desc: "Access tutors from across Nepal, not just your neighbourhood. Find the best fit for your child." },
];

export default function OnlineTuitionPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-teal-light to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-teal-light text-brand-teal-dark text-sm font-600 px-4 py-1.5 rounded-full mb-6 border border-brand-teal/20">
            <Wifi className="h-4 w-4" /> Online Tuition
          </div>
          <h1 className="text-4xl sm:text-5xl font-800 text-brand-navy mb-5 leading-tight">
            Prefer Online Learning?
          </h1>
          <p className="text-xl text-brand-text max-w-2xl mx-auto mb-8 leading-relaxed">
            Learn from the comfort of home with online tuition from experienced, suitable teachers. Flexible, easy and effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-brand-teal hover:bg-brand-teal-dark text-white font-700 rounded-full px-8 py-3 text-base">
              <Link href="/find-tutor?mode=online">Find an Online Tutor <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" className="border-brand-border text-brand-text hover:border-brand-teal hover:text-brand-teal rounded-full px-8 py-3">
              <Link href="/help-me-find-a-tutor">Help Me Find a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800 text-brand-navy mb-3">Why Online Tuition?</h2>
            <p className="text-brand-text max-w-xl mx-auto">Online tuition gives your child access to great teachers without leaving home.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-brand-bg rounded-2xl border border-brand-border p-6 hover:border-brand-teal/30 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-xl bg-brand-teal-light flex items-center justify-center mb-4">{b.icon}</div>
                <h3 className="font-700 text-brand-navy mb-2">{b.title}</h3>
                <p className="text-sm text-brand-text leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Online Classes Work */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-800 text-brand-navy text-center mb-10">How Online Classes Work</h2>
          <div className="bg-white rounded-2xl border border-brand-border divide-y divide-brand-border">
            {[
              { label: "Platform", value: "Google Meet, Zoom, or WhatsApp Video Call" },
              { label: "Equipment Needed", value: "Smartphone or laptop with internet connection" },
              { label: "Session Duration", value: "Typically 45–60 minutes per session" },
              { label: "Materials", value: "Shared digitally via WhatsApp or email" },
              { label: "Fee", value: "Starts from NPR 2,000/month (same as home tuition)" },
              { label: "Demo Class", value: "Available — try before you commit" },
            ].map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 px-6 py-4">
                <span className="text-sm text-brand-muted font-500">{row.label}</span>
                <span className="text-sm font-600 text-brand-navy text-right max-w-xs">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <HelpCTA />
    </div>
  );
}
