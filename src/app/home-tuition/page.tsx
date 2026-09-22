import type { Metadata } from "next";
import Link from "next/link";
import { Home, Users, Clock, Target, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Home Tuition in Kathmandu Valley | Mero Tutor",
  description: "Find a trusted home tutor in Kathmandu, Lalitpur or Bhaktapur. One-to-one home tuition for all subjects and classes.",
};

const BENEFITS = [
  { icon: <Home className="h-5 w-5 text-brand-blue" />, title: "Learn in Your Own Home", desc: "A comfortable, familiar environment helps children focus better and feel at ease during lessons." },
  { icon: <Users className="h-5 w-5 text-brand-blue" />, title: "One-to-One Attention", desc: "All the tutor's focus is on your child. No distractions, no waiting — personalised learning every session." },
  { icon: <Clock className="h-5 w-5 text-brand-blue" />, title: "Flexible Timing", desc: "Choose morning, afternoon or evening sessions. Change the schedule when your family needs change." },
  { icon: <Target className="h-5 w-5 text-brand-blue" />, title: "Tailored to Your Child", desc: "Tutors adapt their teaching style and pace to match your child's strengths, weaknesses and goals." },
  { icon: <MapPin className="h-5 w-5 text-brand-blue" />, title: "Covering Kathmandu Valley", desc: "We have tutors available across Kathmandu, Lalitpur and Bhaktapur districts." },
  { icon: <Users className="h-5 w-5 text-brand-blue" />, title: "Verified Tutors", desc: "All tutors go through our verification process. Your family's safety and trust are our priority." },
];

const SUBJECTS = [
  "Mathematics", "Science", "English", "Nepali", "Physics",
  "Chemistry", "Biology", "Social Studies", "Computer Science",
  "Economics", "Accountancy", "Optional Mathematics", "Sanskrit",
];

export default function HomeTuitionPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-blue-light to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-blue-light text-brand-blue text-sm font-600 px-4 py-1.5 rounded-full mb-6 border border-brand-blue/20">
            <Home className="h-4 w-4" /> Home Tuition
          </div>
          <h1 className="text-4xl sm:text-5xl font-800 text-brand-navy mb-5 leading-tight">
            Home Tuition Made Simple
          </h1>
          <p className="text-xl text-brand-text max-w-2xl mx-auto mb-8 leading-relaxed">
            Find a suitable tutor who can teach your child at home, at a time that works for your family. No commuting, no complications.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white font-700 rounded-full px-8 py-3 text-base">
              <Link href="/find-tutor?mode=home">Find a Home Tutor <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" className="border-brand-border text-brand-text hover:border-brand-blue hover:text-brand-blue rounded-full px-8 py-3">
              <Link href="/help-me-find-a-tutor">Help Me Find a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-800 text-brand-navy mb-3">Why Home Tuition?</h2>
            <p className="text-brand-text max-w-xl mx-auto">Home tuition provides the most personalised learning experience for your child.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-brand-bg rounded-2xl border border-brand-border p-6 hover:border-brand-blue/30 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-xl bg-brand-blue-light flex items-center justify-center mb-4">{b.icon}</div>
                <h3 className="font-700 text-brand-navy mb-2">{b.title}</h3>
                <p className="text-sm text-brand-text leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-800 text-brand-navy mb-3">Subjects Available</h2>
          <p className="text-brand-text mb-8">Home tutors available for all major subjects across all classes.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {SUBJECTS.map((s) => (
              <Link key={s} href={`/find-tutor?subject=${encodeURIComponent(s)}&mode=home`}
                className="px-4 py-2 bg-white rounded-full border border-brand-border text-sm font-600 text-brand-navy hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue-light transition-all">
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-800 text-brand-navy mb-3">Areas We Serve</h2>
          <p className="text-brand-text mb-8">We currently serve all major areas across Kathmandu Valley.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { city: "Kathmandu", areas: ["Baneshwor", "Koteshwor", "Boudha", "Chabahil", "Naxal", "Maharajgunj", "Lazimpat", "Balaju", "Gongabu"] },
              { city: "Lalitpur", areas: ["Patan", "Jawalakhel", "Imadol", "Sanepa", "Pulchowk", "Satdobato", "Ekantakuna"] },
              { city: "Bhaktapur", areas: ["Suryabinayak", "Sallaghari", "Thimi", "Bhaktapur Durbar Square area"] },
            ].map((district) => (
              <div key={district.city} className="bg-brand-bg rounded-2xl border border-brand-border p-5 text-left">
                <h3 className="font-700 text-brand-navy mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-blue" />{district.city}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {district.areas.map((a) => (
                    <span key={a} className="text-xs bg-white border border-brand-border rounded-full px-2.5 py-1 text-brand-text">{a}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-800 text-brand-navy mb-3">Ready to Find a Home Tutor?</h2>
          <p className="text-brand-text mb-6">Browse available tutors or let us help you find the right match.</p>
          <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white font-700 rounded-full px-10 py-3">
            <Link href="/find-tutor?mode=home">Find a Home Tutor Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
