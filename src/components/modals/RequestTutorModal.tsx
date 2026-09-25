"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  Star,
  MessageCircle,
  Sparkles,
  PhoneCall,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Tutor } from "@/types/tutor";

interface RequestTutorModalProps {
  tutor: Tutor | null;
  open: boolean;
  onClose: () => void;
}

export default function RequestTutorModal({ tutor, open, onClose }: RequestTutorModalProps) {
  function handleClose() {
    onClose();
  }

  const whatsappText = tutor
    ? encodeURIComponent(`Namaste, I want to request tutor ${tutor.name} (${tutor.qualification}) for home/online tuition.`)
    : encodeURIComponent("Namaste, I am looking for a tutor for my child.");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl rounded-3xl bg-white">

        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-brand-navy via-brand-blue-dark to-brand-blue text-white px-6 py-5 relative">
          <div className="flex items-center gap-2 text-brand-teal text-xs font-[800] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Direct Tutor Booking
          </div>
          <DialogTitle className="text-xl font-[800] text-white">
            {tutor ? `Request ${tutor.name}` : "Request a Tutor"}
          </DialogTitle>
          <p className="text-xs text-white/80 font-[500] mt-0.5">
            Free service • 100% Verified Tutors
          </p>
        </div>

        {/* Body Content - ONLY 2 OPTIONS */}
        <div className="p-6 max-h-[85vh] overflow-y-auto space-y-4">

          {/* Selected Tutor Card Preview (if applicable) */}
          {tutor && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3.5">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-brand-blue-light ring-2 ring-white">
                  <Image
                    src={tutor.photo}
                    alt={tutor.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                {tutor.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full ring-2 ring-white" title="Verified">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-[800] text-brand-navy text-sm truncate">{tutor.name}</h4>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 text-[11px] font-[700] px-1.5 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {tutor.rating.toFixed(1)}
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-[500] truncate mt-0.5">{tutor.qualification}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tutor.subjects.slice(0, 3).map((s) => (
                    <span key={s} className="bg-brand-blue-light text-brand-blue text-[10px] font-[700] px-1.5 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Option 1: Contact Directly (WhatsApp / Call) ── */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-blue-50/20 border border-emerald-200 rounded-3xl p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-[800] uppercase tracking-wider text-emerald-900">
                    Option 1: Contact Directly
                  </h4>
                  <p className="text-[11px] text-emerald-700 font-[500]">Instant booking via WhatsApp or Call</p>
                </div>
              </div>
              <span className="text-[10px] font-[800] text-emerald-800 bg-emerald-200/80 px-2.5 py-1 rounded-full uppercase tracking-wide">
                Fastest
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href={`https://wa.me/9779762511114?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white text-xs font-[800] py-3 px-4 rounded-xl transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" /> WhatsApp Us
              </a>
              <a
                href="tel:+9779762511114"
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-[800] py-3 px-4 rounded-xl transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0" /> Call Now
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex py-0.5 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase tracking-widest font-[800] text-slate-400">
              OR
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* ── Option 2: Login to Request a Tutor ── */}
          <div className="bg-gradient-to-br from-blue-50/80 via-white to-slate-50 border border-brand-blue/20 rounded-3xl p-5 space-y-3 text-center shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-[800] text-slate-900">
                Option 2: Login to Request a Tutor
              </h4>
              <p className="text-xs text-slate-500 font-[500] mt-1 max-w-xs mx-auto">
                Sign in with your Parent Account to request tutors and manage your bookings.
              </p>
            </div>
            <Button
              asChild
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-xl text-xs h-11 shadow-md shadow-blue-100"
            >
              <Link href="/login?role=parent" onClick={handleClose}>
                Login to Request a Tutor <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
            <p className="text-[11px] text-slate-400 font-[500]">
              Don&apos;t have an account?{" "}
              <Link href="/signup?role=parent" onClick={handleClose} className="text-brand-blue font-[700] hover:underline">
                Sign Up as Parent Free →
              </Link>
            </p>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}
