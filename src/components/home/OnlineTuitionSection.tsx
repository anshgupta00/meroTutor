import Link from "next/link";
import { Wifi, MapPin, CalendarCheck, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BENEFITS = [
  { icon: <Wifi className="h-4 w-4" />, text: "Learn from anywhere in Nepal" },
  { icon: <CalendarCheck className="h-4 w-4" />, text: "Flexible scheduling that suits you" },
  { icon: <User className="h-4 w-4" />, text: "One-to-one personal attention" },
  { icon: <MapPin className="h-4 w-4" />, text: "Access to tutors across the valley" },
];

export default function OnlineTuitionSection() {
  return (
    <section className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-teal-light via-white to-brand-blue-light rounded-3xl border border-brand-border p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-teal-light text-brand-teal-dark text-sm font-600 px-4 py-1.5 rounded-full mb-5 border border-brand-teal/20">
                <Wifi className="h-4 w-4" />
                Online Tuition
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-brand-navy mb-4 leading-tight">
                Prefer Online Learning?
              </h2>
              <p className="text-lg text-brand-text leading-relaxed mb-8">
                Learn from the comfort of home with online tuition from suitable
                teachers. Great for students who prefer flexibility or cannot find
                a local tutor.
              </p>

              <ul className="space-y-3 mb-8">
                {BENEFITS.map((b) => (
                  <li key={b.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-teal-light border border-brand-teal/20 flex items-center justify-center text-brand-teal-dark flex-shrink-0">
                      {b.icon}
                    </div>
                    <span className="text-brand-text font-500">{b.text}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="bg-brand-teal hover:bg-brand-teal-dark text-white font-700 rounded-full px-7 py-3">
                <Link href="/find-tutor?mode=online">
                  Find an Online Tutor
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Right: Visual */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-border space-y-4">
              <div className="flex items-center gap-2 text-sm font-700 text-brand-navy">
                <Wifi className="h-4 w-4 text-brand-teal" />
                <span>Online Class Setup</span>
              </div>
              {[
                { label: "Platform", value: "Google Meet / Zoom / WhatsApp" },
                { label: "Subjects", value: "All major subjects available" },
                { label: "Scheduling", value: "Flexible — you choose the time" },
                { label: "Materials", value: "Shared digitally by tutor" },
                { label: "Fee", value: "Starts from NPR 2,000/month" },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-3 py-2.5 border-b border-brand-border last:border-0">
                  <span className="text-sm text-brand-muted">{item.label}</span>
                  <span className="text-sm font-600 text-brand-navy text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
