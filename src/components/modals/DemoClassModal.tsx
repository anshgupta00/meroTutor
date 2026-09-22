"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, User, Phone, Calendar, Clock, Home as HomeIcon, Laptop, Sparkles, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoClassSchema, type DemoClassFormData } from "@/types/forms";
import type { Tutor } from "@/types/tutor";

interface DemoClassModalProps {
  tutor: Tutor | null;
  open: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM",
];

export default function DemoClassModal({ tutor, open, onClose }: DemoClassModalProps) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DemoClassFormData>({
    resolver: zodResolver(demoClassSchema),
    defaultValues: {
      mode: "home",
    },
  });

  const selectedMode = watch("mode");

  async function onSubmit(data: DemoClassFormData) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    console.log("Demo class request:", { tutor: tutor?.id, ...data });
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setSuccess(false); reset(); }, 300);
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 shadow-2xl rounded-3xl bg-white">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-600 text-white px-6 py-5">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-[800] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Free Trial Class
          </div>
          <DialogTitle className="text-xl font-[800] text-white">
            Book a Demo Class{tutor ? ` with ${tutor.name}` : ""}
          </DialogTitle>
          <p className="text-xs text-white/80 font-[500] mt-0.5">
            Test a 1-on-1 demo session before committing. 100% Free.
          </p>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-[800] text-brand-navy mb-1">Demo Class Requested!</h2>
                <p className="text-sm text-slate-500 font-[500] max-w-sm mx-auto">
                  We&apos;ve received your request! Our coordinator will contact you to confirm the time.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                <p className="text-xs font-[700] text-green-800 mb-2">Want instant confirmation?</p>
                <a
                  href={`https://wa.me/9779762511114?text=${encodeURIComponent(`Namaste, I requested a demo class with ${tutor?.name || "a tutor"}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white text-xs font-[800] px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us Now
                </a>
              </div>

              <Button
                className="w-full bg-slate-900 text-white font-[800] rounded-xl py-3"
                onClick={handleClose}
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Tutor Preview if available */}
              {tutor && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-emerald-100 flex-shrink-0">
                    <Image src={tutor.photo} alt={tutor.name} width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-[800] text-brand-navy text-sm">{tutor.name}</h4>
                    <p className="text-xs text-slate-500 font-[500]">{tutor.qualification}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="demo-name" className="text-xs font-[700] text-slate-700 flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-emerald-600" /> Your Name *
                  </Label>
                  <Input id="demo-name" placeholder="Full name" {...register("name")} className={`rounded-xl h-10 text-sm ${errors.name ? "border-red-400" : "border-slate-200"}`} />
                  {errors.name && <p className="text-[11px] text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="demo-phone" className="text-xs font-[700] text-slate-700 flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-emerald-600" /> Mobile Number *
                  </Label>
                  <Input id="demo-phone" placeholder="98XXXXXXXX" {...register("phone")} className={`rounded-xl h-10 text-sm ${errors.phone ? "border-red-400" : "border-slate-200"}`} />
                  {errors.phone && <p className="text-[11px] text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="demo-date" className="text-xs font-[700] text-slate-700 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" /> Preferred Date *
                  </Label>
                  <Input id="demo-date" type="date" min={minDate} {...register("preferredDate")} className={`rounded-xl h-10 text-sm ${errors.preferredDate ? "border-red-400" : "border-slate-200"}`} />
                  {errors.preferredDate && <p className="text-[11px] text-red-500">{errors.preferredDate.message}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="demo-time" className="text-xs font-[700] text-slate-700 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-emerald-600" /> Preferred Time *
                  </Label>
                  <select id="demo-time" {...register("preferredTime")} className={`w-full h-10 px-3 rounded-xl border text-xs bg-white text-brand-navy ${errors.preferredTime ? "border-red-400" : "border-slate-200"}`}>
                    <option value="">Select time slot</option>
                    {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.preferredTime && <p className="text-[11px] text-red-500">{errors.preferredTime.message}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-[700] text-slate-700">Class Mode *</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setValue("mode", "home", { shouldValidate: true })}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-[800] transition-all ${selectedMode === "home" ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-200 text-slate-600"}`}>
                    <HomeIcon className="w-4 h-4" /> Home Demo
                  </button>
                  <button type="button" onClick={() => setValue("mode", "online", { shouldValidate: true })}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-[800] transition-all ${selectedMode === "online" ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-200 text-slate-600"}`}>
                    <Laptop className="w-4 h-4" /> Online Demo
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-[800] text-sm rounded-xl py-3.5 h-auto shadow-md shadow-emerald-600/20">
                {loading ? "Submitting..." : "Confirm Demo Request"}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
