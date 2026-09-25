import Link from "next/link";
import { Home, Users, Clock, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BENEFITS = [
  {
    icon: <Home className="h-5 w-5 text-brand-blue" />,
    title: "Learn at Home",
    desc: "Comfortable and convenient learning in your own home environment.",
  },
  {
    icon: <Users className="h-5 w-5 text-brand-blue" />,
    title: "Suitable Teachers",
    desc: "Find tutors based on subject, class, location and experience.",
  },
  {
    icon: <Clock className="h-5 w-5 text-brand-blue" />,
    title: "Flexible Timing",
    desc: "Choose a schedule that works for your family — morning, afternoon or evening.",
  },
  {
    icon: <Target className="h-5 w-5 text-brand-blue" />,
    title: "Personal Attention",
    desc: "One-to-one learning focused entirely on your child's needs.",
  },
];

export default function HomeTuitionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-800 text-brand-navy mb-4 leading-tight">
              Home Tuition Made Simple
            </h2>
            <p className="text-lg text-brand-text leading-relaxed mb-8">
              Find a suitable tutor who can teach your child at home, at a time that
              works for your family. No complicated platforms. Just a great teacher
              at your door.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-blue-light flex items-center justify-center flex-shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <p className="font-700 text-brand-navy text-sm">{b.title}</p>
                    <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white font-700 rounded-full px-7 py-3">
              <Link href="/find-tutor?mode=home">
                Find a Home Tutor
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Right: Visual Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-brand-blue-light to-white rounded-3xl p-8 border border-brand-border">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Verified Tutors", value: "2,000+" },
                  { label: "Students Taught", value: "3,000+" },
                  { label: "Subjects Covered", value: "15+" },
                  { label: "Areas in Valley", value: "30+" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm text-center border border-brand-border">
                    <div className="text-2xl font-800 text-brand-blue">{stat.value}</div>
                    <div className="text-xs text-brand-muted mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              {/* Process Steps Preview */}
              <div className="bg-white rounded-2xl p-5 border border-brand-border">
                <p className="text-sm font-700 text-brand-navy mb-3">How Home Tuition Works</p>
                {[
                  "Browse tutors by your area and subject",
                  "View tutor profile and experience",
                  "Request the tutor — we'll help connect you",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                    <span className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs font-700 flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-brand-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
