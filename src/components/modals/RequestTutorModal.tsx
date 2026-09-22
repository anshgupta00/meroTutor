"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  User,
  Phone,
  Clock,
  MessageSquare,
  ShieldCheck,
  Star,
  Home as HomeIcon,
  Laptop,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requestTutorSchema, type RequestTutorFormData } from "@/types/forms";
import type { Tutor } from "@/types/tutor";

interface RequestTutorModalProps {
  tutor: Tutor | null;
  open: boolean;
  onClose: () => void;
}

const TIME_OPTIONS = [
  "Morning (6am–10am)",
  "Afternoon (10am–3pm)",
  "Evening (3pm–8pm)",
  "Flexible",
];

export default function RequestTutorModal({ tutor, open, onClose }: RequestTutorModalProps) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RequestTutorFormData>({
    resolver: zodResolver(requestTutorSchema),
    defaultValues: {
      mode: "home",
    },
  });

  const selectedMode = watch("mode");
  const selectedTime = watch("preferredTime");

  async function onSubmit(data: RequestTutorFormData) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    console.log("Tutor request submitted:", { tutor: tutor?.id, ...data });
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      reset();
    }, 300);
  }

  const whatsappText = tutor
    ? encodeURIComponent(`Namaste, I want to request tutor ${tutor.name} (${tutor.qualification}) for home/online tuition.`)
    : encodeURIComponent("Namaste, I am looking for a tutor for my child.");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 shadow-2xl rounded-3xl bg-white">

        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-brand-navy via-brand-blue-dark to-brand-blue text-white px-6 py-5 relative">
          <div className="flex items-center gap-2 text-brand-teal text-xs font-[800] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Direct Tutor Booking
          </div>
          <DialogTitle className="text-xl font-[800] text-white">
            {tutor ? `Request ${tutor.name}` : "Request a Tutor"}
          </DialogTitle>
          <p className="text-xs text-white/80 font-[500] mt-0.5">
            Free service • Response within 24 hours
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" />
              </div>

              <div>
                <h2 className="text-2xl font-[800] text-brand-navy mb-1">Request Received!</h2>
                <p className="text-sm text-slate-500 font-[500] max-w-sm mx-auto">
                  Thank you! Our academic team will review your request and contact you shortly.
                </p>
              </div>

              {/* Quick Summary Card */}
              {tutor && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-brand-blue-light flex-shrink-0">
                    <Image src={tutor.photo} alt={tutor.name} width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-[800] text-brand-navy text-sm">{tutor.name}</h4>
                    <p className="text-xs text-slate-500 font-[500]">{tutor.qualification}</p>
                  </div>
                </div>
              )}

              {/* Instant WhatsApp Option */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                <p className="text-xs font-[700] text-green-800 mb-2">Want faster response?</p>
                <a
                  href={`https://wa.me/9779762511114?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white text-xs font-[800] px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" /> Message Us on WhatsApp Now
                </a>
              </div>

              <Button
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-[800] rounded-xl py-3"
                onClick={handleClose}
              >
                Done &amp; Return
              </Button>
            </div>
          ) : (
            <div className="space-y-5">

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
                      <div className="absolute -bottom-1 -right-1 bg-brand-teal text-white p-0.5 rounded-full" title="Verified">
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

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name */}
                  <div className="space-y-1">
                    <Label htmlFor="req-name" className="text-xs font-[700] text-slate-700 flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-brand-blue" /> Your Name *
                    </Label>
                    <Input
                      id="req-name"
                      placeholder="e.g. Suman Shrestha"
                      {...register("name")}
                      className={`rounded-xl h-10 text-sm ${errors.name ? "border-red-400 focus:ring-red-400" : "border-slate-200 focus:border-brand-blue"}`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 font-[500]">{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <Label htmlFor="req-phone" className="text-xs font-[700] text-slate-700 flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-brand-blue" /> Mobile Number *
                    </Label>
                    <Input
                      id="req-phone"
                      placeholder="98XXXXXXXX"
                      {...register("phone")}
                      className={`rounded-xl h-10 text-sm ${errors.phone ? "border-red-400 focus:ring-red-400" : "border-slate-200 focus:border-brand-blue"}`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 font-[500]">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Learning Mode Toggle */}
                <div className="space-y-1">
                  <Label className="text-xs font-[700] text-slate-700">Preferred Mode *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setValue("mode", "home", { shouldValidate: true })}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-[800] transition-all ${
                        selectedMode === "home"
                          ? "border-brand-blue bg-brand-blue-light/50 text-brand-blue shadow-xs"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <HomeIcon className="w-4 h-4" /> Home Tuition
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue("mode", "online", { shouldValidate: true })}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-[800] transition-all ${
                        selectedMode === "online"
                          ? "border-brand-blue bg-brand-blue-light/50 text-brand-blue shadow-xs"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Laptop className="w-4 h-4" /> Online Class
                    </button>
                  </div>
                </div>

                {/* Preferred Time Shift */}
                <div className="space-y-1">
                  <Label className="text-xs font-[700] text-slate-700 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-brand-blue" /> Preferred Shift
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_OPTIONS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setValue("preferredTime", t, { shouldValidate: true })}
                        className={`px-2.5 py-2 rounded-xl border text-xs font-[700] text-left transition-all ${
                          selectedTime === t
                            ? "border-brand-blue bg-brand-blue text-white shadow-xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Note */}
                <div className="space-y-1">
                  <Label htmlFor="req-msg" className="text-xs font-[700] text-slate-700 flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5 text-brand-blue" /> Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="req-msg"
                    placeholder="Mention Class/Grade, subject specific needs or location..."
                    rows={2}
                    {...register("message")}
                    className="rounded-xl border-slate-200 text-xs resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 space-y-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] text-sm rounded-xl py-3.5 shadow-md shadow-brand-blue/20 h-auto"
                  >
                    {loading ? "Submitting Request..." : "Confirm & Send Request"}
                  </Button>

                  {/* WhatsApp Quick Link */}
                  <a
                    href={`https://wa.me/9779762511114?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs font-[700] text-green-700 hover:text-green-800 pt-1"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    Or WhatsApp us directly for instant booking →
                  </a>
                </div>

              </form>
            </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
}
