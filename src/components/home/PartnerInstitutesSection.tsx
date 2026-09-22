import Link from "next/link";
import { Building2, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const PARTNERS = [
  {
    name: "St. Xavier's School",
    location: "Jawalakhel, Lalitpur",
    category: "School (Grade 1-12)",
    initials: "SX",
  },
  {
    name: "Little Angels' School",
    location: "Hattiban, Lalitpur",
    category: "School & +2 College",
    initials: "LA",
  },
  {
    name: "Budhanilkantha School",
    location: "Budhanilkantha, Kathmandu",
    category: "Residential School",
    initials: "BNKS",
  },
  {
    name: "Deerwalk Institute",
    location: "Siffal, Kathmandu",
    category: "IT & Engineering College",
    initials: "DWIT",
  },
  {
    name: "Apex College",
    location: "New Baneshwor, Kathmandu",
    category: "Management College",
    initials: "APEX",
  },
  {
    name: "Kathmandu Model College",
    location: "Bagbazar, Kathmandu",
    category: "+2 & Higher Education",
    initials: "KMC",
  },
  {
    name: "Trinity International College",
    location: "Dillibazar, Kathmandu",
    category: "+2 & A-Levels",
    initials: "TIC",
  },
  {
    name: "Xavier International",
    location: "Kalopul, Kathmandu",
    category: "+2 & Science College",
    initials: "XIC",
  },
];

export default function PartnerInstitutesSection() {
  return (
    <section className="bg-slate-50 border-y border-slate-100 py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-blue-light text-brand-blue border border-brand-blue/20 rounded-full px-4 py-1.5 text-xs font-[800] mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Institutional Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-[800] text-slate-900 tracking-tight mb-4">
            Partner Organizations &amp; Institutes
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-[500] leading-relaxed">
            Trusted by leading schools, colleges, and educational organizations across Kathmandu Valley for faculty recruitment and academic support.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-12">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-brand-blue/40 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-brand-blue-light text-brand-blue font-[800] text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  {partner.initials}
                </div>
                <div>
                  <h3 className="text-sm font-[800] text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-1">
                    {partner.name}
                  </h3>
                  <p className="text-[11px] font-[500] text-slate-400">
                    {partner.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px]">
                <span className="font-[600] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  {partner.category}
                </span>
                <span className="inline-flex items-center gap-1 font-[700] text-emerald-600">
                  <ShieldCheck className="w-3 h-3" /> Partner
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Institutional Hiring */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-[800] text-slate-900">Are you a school, college, or institute?</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-[500] mt-0.5">
                Hire background-verified subject specialists and entrance faculty within 24–48 hours.
              </p>
            </div>
          </div>

          <Button
            asChild
            className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-2xl px-6 py-5 text-sm shadow-md shadow-blue-100 flex-shrink-0"
          >
            <Link href="/hire-tutor">
              Institutional Placement
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
