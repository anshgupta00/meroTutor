import Link from "next/link";
import { HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-teal-light via-white to-brand-blue-light rounded-3xl border border-brand-border p-10 lg:p-14 text-center shadow-sm">
          <div className="w-14 h-14 bg-brand-teal-light border border-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
            <HelpCircle className="h-7 w-7 text-brand-teal-dark" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-[900] text-brand-navy mb-3">
            Not Sure Which Tutor Is Right for You?
          </h2>
          <p className="text-brand-text text-base sm:text-lg max-w-xl mx-auto mb-8 font-[500] leading-relaxed">
            Tell us what you need and we&apos;ll help you find a suitable tutor for your child.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              className="bg-brand-teal hover:bg-brand-teal-dark text-white font-[700] rounded-full px-8 py-3.5 h-auto shadow-sm"
            >
              <Link href="/help-me-find-a-tutor">
                Help Me Find a Tutor
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>

            <a
              href="https://wa.me/9779762511114"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-[700] rounded-full px-8 py-3.5 transition-colors shadow-sm text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
