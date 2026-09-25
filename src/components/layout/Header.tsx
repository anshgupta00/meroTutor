"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/for-parents", label: "For Parents" },
  { href: "/hire-tutor", label: "For Schools" },
  { href: "/services", label: "Our Services" },
  { href: "/jobs", label: "Vacancy" },
  { href: "/become-a-tutor", label: "Become a Tutor" },
  { href: "/about-us", label: "About Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Hide main site navbar on dashboards after login
  if (
    pathname?.startsWith("/tutor-dashboard") ||
    pathname?.startsWith("/school-dashboard") ||
    pathname?.startsWith("/parent-dashboard") ||
    pathname?.startsWith("/admin-dashboard")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">

          {/* ── Brand Logo ───────────────────────────────────────────── */}
          <Link href="/" className="flex items-center group py-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Mero Tutor"
              width={160}
              height={44}
              className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-[800] text-slate-900 hover:text-brand-blue hover:bg-brand-blue-light/50 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ──────────────────────────────────────── */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-[800] text-slate-900 hover:text-brand-blue transition-colors px-2"
            >
              Login
            </Link>

            <Link href="/signup">
              <Button className="bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-[800] rounded-full px-5 py-2 shadow-sm transition-colors">
                Sign Up
              </Button>
            </Link>

            <Link href="/find-tutor">
              <Button className="bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white text-sm font-[800] rounded-full px-5 py-2 shadow-sm transition-all">
                Find a Tutor
              </Button>
            </Link>
          </div>

          {/* ── Mobile Trigger ───────────────────────────────────────── */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/find-tutor" className="sm:hidden">
              <Button
                size="sm"
                className="bg-brand-blue text-white text-xs font-[800] rounded-full px-4"
              >
                Find Tutor
              </Button>
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="text-brand-navy hover:bg-brand-bg">
                    <Menu className="h-5 w-5" />
                  </Button>
                }
              />
              <SheetContent side="right" className="w-72 bg-white flex flex-col">
                <SheetHeader className="px-6 py-5 border-b border-brand-border">
                  <SheetTitle className="text-left">
                    <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
                      <Image
                        src="/logo.png"
                        alt="Mero Tutor"
                        width={140}
                        height={40}
                        className="h-8 w-auto object-contain"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex-1 flex flex-col gap-1 px-4 py-5 overflow-y-auto">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-[800] text-slate-900 hover:text-brand-blue hover:bg-brand-blue-light/40 transition-all"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-4 w-4 text-brand-muted" />
                    </Link>
                  ))}
                </nav>

                <div className="px-4 pb-6 space-y-2 border-t border-brand-border pt-4">
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-sm font-[700]">
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl text-sm font-[600] border-brand-border text-brand-navy"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/find-tutor" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl text-sm font-[700]">
                      Find a Tutor
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
