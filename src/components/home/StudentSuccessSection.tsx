"use client";

import { Trophy, TrendingUp, Award, CheckCircle2, Star } from "lucide-react";

const SUCCESS_STORIES = [
  {
    studentName: "Aarav Sharma",
    level: "Class 10 (SEE)",
    school: "St. Xavier's School",
    subject: "Mathematics & Science",
    beforeScore: "58%",
    afterScore: "94% (GPA 3.9)",
    achievement: "Secured A+ in SEE Board Exams",
    quote: "Mero Tutor matched me with an experienced Er. tutor. His regular problem-solving sessions helped me clear my concepts and score GPA 3.9 in SEE.",
    tutorName: "Er. Ramesh Khadka",
  },
  {
    studentName: "Sneha Karki",
    level: "Class 12 (NEB Science)",
    school: "Kathmandu Model College",
    subject: "Physics & Chemistry",
    beforeScore: "62%",
    afterScore: "89% (GPA 3.8)",
    achievement: "Cleared IOE Engineering Entrance",
    quote: "Physics used to be my weakest subject. My tutor explained numerical problems step-by-step. I not only got A+ in NEB 12 but also cracked the IOE entrance exam!",
    tutorName: "Prashant K.C.",
  },
  {
    studentName: "Rijan Maharjan",
    level: "A-Levels (Physics & Math)",
    school: "Trinity International College",
    subject: "A-Level Further Math",
    beforeScore: "Grade C",
    afterScore: "Grade A*",
    achievement: "Top in College Batch",
    quote: "A-Level syllabus is intense. Having a dedicated home tutor from Mero Tutor gave me personalized attention that classroom lectures couldn't match.",
    tutorName: "Sita Adhikari",
  },
];

const METRICS = [
  { value: "96%", label: "Grade Improvement Rate", desc: "Students saw higher exam marks within 2 months" },
  { value: "3.8+", label: "Average SEE/NEB GPA", desc: "Scored by our regular home-tutored students" },
  { value: "3,000+", label: "Successful Matches", desc: "Across Nepal" },
  { value: "100%", label: "Satisfaction Guarantee", desc: "Free tutor replacement if not satisfied" },
];

export default function StudentSuccessSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-4 py-1.5 text-xs font-[800] mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            Proven Results &amp; Academic Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-[800] text-slate-900 tracking-tight mb-4">
            Our Students&apos; Success Stories
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-[500]">
            See how regular 1-on-1 home and online tuition transformed academic performance and confidence for students across Nepal.
          </p>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {METRICS.map((m, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-[900] text-brand-blue tracking-tight mb-1">
                {m.value}
              </div>
              <div className="text-sm font-[800] text-slate-900 mb-1">{m.label}</div>
              <div className="text-xs text-slate-500 font-[500]">{m.desc}</div>
            </div>
          ))}
        </div>

        {/* Success Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUCCESS_STORIES.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border-2 border-slate-100 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-brand-blue/30 transition-all duration-300"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-[800] px-3 py-1 rounded-full border border-emerald-200">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    {story.achievement}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Before vs After Score Pill */}
                <div className="bg-gradient-to-r from-slate-900 to-brand-navy text-white rounded-2xl p-4 mb-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-[700] uppercase tracking-wider text-slate-400">Previous</span>
                    <p className="text-base font-[800] text-slate-300">{story.beforeScore}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-xl text-xs font-[800]">
                    <TrendingUp className="w-4 h-4" /> Improved
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-[700] uppercase tracking-wider text-brand-teal">After Tuition</span>
                    <p className="text-xl font-[900] text-emerald-400">{story.afterScore}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-slate-600 text-sm font-[500] leading-relaxed mb-6 italic">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              {/* Student Details Footer */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-[800] text-slate-900">{story.studentName}</h4>
                  <p className="text-xs text-slate-400 font-[500]">{story.level} · {story.school}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-[600]">Tutor</span>
                  <p className="text-xs font-[700] text-brand-blue">{story.tutorName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
