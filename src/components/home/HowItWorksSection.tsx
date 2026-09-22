import { Target, UserCheck, BookOpen } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Tell Us What You Need",
    desc: "Choose class, subject, location and learning mode. It only takes a minute.",
    icon: Target,
  },
  {
    number: "02",
    title: "Meet a Suitable Tutor",
    desc: "Browse tutors or ask Mero Tutor to help find a suitable match for your child.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Start Learning",
    desc: "Request a tutor, arrange a demo class, and start learning at home or online.",
    icon: BookOpen,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-800 text-brand-navy mb-3">
            Getting Started Is Easy
          </h2>
          <p className="text-lg text-brand-text max-w-xl mx-auto">
            Three simple steps to connect your child with the right tutor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-brand-border -translate-y-1/2 z-0"
                    style={{ width: "calc(100% - 2rem)", left: "calc(50% + 2.5rem)" }}
                  />
                )}

                <div className="relative z-10 bg-brand-bg rounded-2xl border border-brand-border p-7 text-center hover:border-brand-blue/30 hover:shadow-md transition-all duration-200">
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue-light flex items-center justify-center mx-auto mb-4 text-brand-blue">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="text-xs font-800 text-brand-blue tracking-widest mb-2">
                    STEP {step.number}
                  </div>
                  <h3 className="text-lg font-700 text-brand-navy mb-2">{step.title}</h3>
                  <p className="text-sm text-brand-text leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
