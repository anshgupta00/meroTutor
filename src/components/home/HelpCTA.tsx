import Link from "next/link";
import { HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-3xl p-10 lg:p-14 text-white text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <HelpCircle className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-800 mb-3">
            Not Sure Which Tutor Is Right for You?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Tell us what you need and we&apos;ll help you find a suitable tutor for your child.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild className="bg-white text-brand-blue hover:bg-brand-blue-light font-700 rounded-full px-7 py-3">
              <Link href="/help-me-find-a-tutor">
                Help Me Find a Tutor
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <a
              href="https://wa.me/9779762511114"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-700 rounded-full px-7 py-3 transition-colors"
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
