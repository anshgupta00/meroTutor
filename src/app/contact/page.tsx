"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, Mail, MapPin, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormData } from "@/types/forms";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    console.log("Contact form:", data);
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-blue-light to-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-800 text-brand-navy mb-4">We&apos;re Here to Help</h1>
          <p className="text-xl text-brand-text max-w-xl mx-auto">
            Not sure where to start? Talk to Mero Tutor and we&apos;ll help you find a suitable tutor.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Contact Options */}
          <div className="space-y-5">
            <h2 className="text-2xl font-800 text-brand-navy">Contact Mero Tutor</h2>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-700 text-brand-navy mb-1">WhatsApp (Fastest)</h3>
                  <p className="text-sm text-brand-text mb-3">Message us on WhatsApp for the quickest response. Available 7 days a week.</p>
                  <div className="space-y-2">
                    <a href="https://wa.me/9779762511114" target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                      <div>
                        <p className="font-600 text-green-700 text-sm">+977-9762511114</p>
                        <p className="text-xs text-green-600">Primary Contact</p>
                      </div>
                      <MessageCircle className="h-4 w-4 text-green-600" />
                    </a>
                    <a href="https://wa.me/9779816751098" target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                      <div>
                        <p className="font-600 text-green-700 text-sm">+977-9816751098</p>
                        <p className="text-xs text-green-600">Secondary Contact</p>
                      </div>
                      <MessageCircle className="h-4 w-4 text-green-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-700 text-brand-navy mb-1">Email</h3>
                  <p className="text-sm text-brand-text mb-2">Send us an email and we&apos;ll respond within 24 hours.</p>
                  <a href="mailto:support.merotutor@gmail.com" className="text-brand-blue font-600 hover:underline text-sm">
                    support.merotutor@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow-light flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-brand-yellow-dark" />
                </div>
                <div>
                  <h3 className="font-700 text-brand-navy mb-1">Location</h3>
                  <p className="text-sm text-brand-text">Kathmandu, Nepal</p>
                  <p className="text-xs text-brand-muted mt-1">Serving all of Kathmandu Valley</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-2xl p-6 text-white">
              <h3 className="font-700 mb-2">Not sure where to start?</h3>
              <p className="text-white/80 text-sm mb-4">Use our guided wizard and we&apos;ll help you find the right tutor.</p>
              <a href="/help-me-find-a-tutor"
                className="inline-flex items-center gap-2 bg-white text-brand-blue font-700 rounded-full px-5 py-2.5 text-sm hover:bg-brand-blue-light transition-colors">
                Help Me Find a Tutor <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white rounded-2xl border border-brand-border p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-800 text-brand-navy mb-2">Message Sent!</h2>
                <p className="text-brand-text text-sm">We&apos;ve received your message and will be in touch with you shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-800 text-brand-navy mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="c-name" className="text-sm font-600 text-brand-navy mb-1.5 block">Your Name</Label>
                    <Input id="c-name" placeholder="Full name" {...register("name")} className={errors.name ? "border-red-400" : ""} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="c-phone" className="text-sm font-600 text-brand-navy mb-1.5 block">Phone Number</Label>
                    <Input id="c-phone" placeholder="+977-XXXXXXXXXX" {...register("phone")} className={errors.phone ? "border-red-400" : ""} />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="c-email" className="text-sm font-600 text-brand-navy mb-1.5 block">Email (Optional)</Label>
                    <Input id="c-email" type="email" placeholder="your@email.com" {...register("email")} />
                  </div>
                  <div>
                    <Label htmlFor="c-message" className="text-sm font-600 text-brand-navy mb-1.5 block">How can we help?</Label>
                    <Textarea id="c-message" rows={5} placeholder="Tell us what you need help with..."
                      {...register("message")} className={`resize-none ${errors.message ? "border-red-400" : ""}`} />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-700 rounded-full py-3">
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
