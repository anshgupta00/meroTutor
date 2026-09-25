"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";

const NAV_MENU = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/about-us", label: "About Us" },
];

const PARENT_SERVICES = [
  { href: "/find-tutor", label: "Find a Tutor" },
  { href: "/for-parents", label: "For Parents Portal" },
  { href: "/hire-tutor", label: "School Faculty Placement" },
];

const TUTOR_LINKS = [
  { href: "/become-a-tutor", label: "Become a Tutor" },
  { href: "/jobs", label: "Vacancy" },
  { href: "/login", label: "Tutor Login" },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard pages
  if (
    pathname?.startsWith("/tutor-dashboard") ||
    pathname?.startsWith("/school-dashboard") ||
    pathname?.startsWith("/parent-dashboard") ||
    pathname?.startsWith("/admin-dashboard")
  ) {
    return null;
  }
  return (
    <footer className="bg-[#0b1220] text-white">
      {/* ── Main Grid ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo-white.png"
                alt="Mero Tutor"
                width={160}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 max-w-xs">
              Nepal&apos;s leading platform connecting students with verified home and online tutors across Nepal. Quality education at your doorstep.
            </p>

            <div className="space-y-2.5">
              <a href="tel:+9779762511114" className="flex items-center gap-2.5 text-sm text-[#94a3b8] hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                  <Phone className="h-3.5 w-3.5 text-brand-teal" />
                </span>
                +977 9762511114 / 9816751098
              </a>
              <a href="mailto:support.merotutor@gmail.com" className="flex items-center gap-2.5 text-sm text-[#94a3b8] hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-brand-blue" />
                </span>
                support.merotutor@gmail.com
              </a>
              <a href="https://wa.me/9779762511114" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-[#94a3b8] hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                </span>
                WhatsApp Support
              </a>
              <div className="flex items-center gap-2.5 text-sm text-[#94a3b8]">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="h-3.5 w-3.5 text-rose-400" />
                </span>
                Nepal
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-800 uppercase tracking-widest text-[#64748b] mb-5">Navigation</h4>
            <ul className="space-y-3">
              {NAV_MENU.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors hover:translate-x-1 inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Parents & Schools */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-800 uppercase tracking-widest text-[#64748b] mb-5">Parents &amp; Schools</h4>
            <ul className="space-y-3">
              {PARENT_SERVICES.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors hover:translate-x-1 inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Tutors & Highlighted Contact Us */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-800 uppercase tracking-widest text-[#64748b] mb-5">For Tutors</h4>
              <ul className="space-y-3 mb-6">
                {TUTOR_LINKS.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-[#94a3b8] hover:text-white transition-colors hover:translate-x-1 inline-block">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Highlighted Contact Us CTA ── */}
            <div className="bg-gradient-to-r from-brand-blue/25 to-blue-600/25 border border-brand-blue/40 rounded-2xl p-4">
              <h5 className="text-xs font-[800] uppercase tracking-wider text-brand-teal mb-1">Need Direct Support?</h5>
              <p className="text-xs text-[#94a3b8] mb-3">Have questions or custom inquiries?</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-[800] rounded-xl px-4 py-2.5 shadow-sm transition-all hover:scale-[1.02]"
              >
                Contact Us Directly <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748b]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} MeroTutor. All rights reserved.</p>
            <span className="hidden sm:inline text-white/10">•</span>
            <p className="text-xs text-[#94a3b8]">
              Powered by{" "}
              <a
                href="http://www.sayapatrigroup.com.np"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-teal transition-colors underline font-[600]"
              >
                Sayapatri Group Pvt Ltd
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
