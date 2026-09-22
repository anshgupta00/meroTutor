"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, CheckCircle2, Sparkles, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("parent");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Mero Tutor" width={140} height={48} className="h-10 w-auto mx-auto mb-3 object-contain" />
          <h1 className="text-2xl font-800 text-brand-navy">Welcome Back</h1>
          <p className="text-brand-muted text-sm mt-1">Sign in to your Mero Tutor account</p>
        </div>

        <div className="bg-white rounded-3xl border border-brand-border p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-lg font-800 text-brand-navy mb-2">Login Successful!</h2>
              <p className="text-brand-text text-sm mb-5">This is a demo login. Full authentication coming soon.</p>
              <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full border-brand-blue text-brand-blue">
                Back to Login
              </Button>
            </div>
          ) : (
            <>
              {/* Role Switcher Tabs */}
              <Tabs value={tab} onValueChange={setTab} className="mb-6">
                <TabsList className="w-full">
                  <TabsTrigger value="parent" className="flex-1 font-600">Parent / Student</TabsTrigger>
                  <TabsTrigger value="tutor" className="flex-1 font-600">Tutor</TabsTrigger>
                </TabsList>
              </Tabs>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="login-email" className="text-sm font-600 text-brand-navy mb-1.5 block">
                    Phone Number or Email
                  </Label>
                  <Input id="login-email" placeholder={tab === "parent" ? "Your phone or email" : "Your registered phone or email"} required />
                </div>
                <div>
                  <Label htmlFor="login-pass" className="text-sm font-600 text-brand-navy mb-1.5 block">Password</Label>
                  <div className="relative">
                    <Input id="login-pass" type={showPass ? "text" : "password"} placeholder="Your password" required />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-navy">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button type="button" className="text-sm text-brand-blue font-600 hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-700 rounded-full py-3">
                  {loading ? "Signing In..." : "Login"}
                </Button>
              </form>

              {/* High-Converting Parent / Student Action Box */}
              <div className="mt-6 pt-5 border-t border-brand-border">
                {tab === "parent" ? (
                  <div className="bg-gradient-to-br from-brand-blue-light/60 to-emerald-50/60 rounded-2xl border border-brand-border p-4 text-center">
                    <div className="inline-flex items-center gap-1.5 text-xs font-700 text-brand-blue mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Looking for a Tutor Right Now?
                    </div>
                    <p className="text-xs text-brand-text mb-3">No login required to request or search for a tutor.</p>
                    <div className="space-y-2">
                      <Button asChild className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full text-xs font-700 h-9">
                        <Link href="/help-me-find-a-tutor">
                          Find a Tutor for My Child <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full rounded-full border-brand-border bg-white text-brand-navy hover:bg-brand-blue-light text-xs font-700 h-9">
                        <Link href="/find-tutor">
                          <Search className="w-3.5 h-3.5 mr-1" /> Browse Tutor Directory
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <p className="text-sm text-brand-muted">Want to teach with Mero Tutor?</p>
                    <Button asChild variant="outline" className="w-full rounded-full border-brand-border text-brand-text hover:border-brand-blue hover:text-brand-blue">
                      <Link href="/become-a-tutor">Register as a Tutor</Link>
                    </Button>
                  </div>
                )}
              </div>

              <p className="text-center text-[11px] text-brand-muted mt-4">
                Mero Tutor Platform preview.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
