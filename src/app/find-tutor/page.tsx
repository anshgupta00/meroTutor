"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, X, ChevronDown, Sparkles, ArrowRight, UserCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import TutorCard from "@/components/tutors/TutorCard";
import RequestTutorModal from "@/components/modals/RequestTutorModal";
import ParentRequestForm from "@/components/forms/ParentRequestForm";
import { TUTORS } from "@/data/tutors";
import { SUBJECTS } from "@/data/subjects";
import { CLASSES } from "@/data/classes";
import { LOCATIONS } from "@/data/locations";
import type { Tutor, TutorFilterState } from "@/types/tutor";

const DEFAULT_FILTERS: TutorFilterState = {
  subject: "",
  class: "",
  location: "",
  mode: "all",
  experience: "any",
  gender: "any",
  maxFee: null,
  availability: "any",
  sortBy: "recommended",
};

function filterTutors(tutors: Tutor[], f: TutorFilterState, search: string): Tutor[] {
  let results = tutors.filter((t) => {
    if (f.subject && !t.subjects.includes(f.subject)) return false;
    if (f.class && !t.classes.includes(f.class)) return false;
    if (f.location && !t.location.includes(f.location) && !t.teachingAreas.includes(f.location)) return false;
    if (f.mode !== "all" && t.mode !== "both" && t.mode !== f.mode) return false;
    if (f.gender !== "any" && t.gender !== f.gender) return false;
    if (f.experience !== "any") {
      const minExp = parseInt(f.experience);
      if (t.experience < minExp) return false;
    }
    if (f.maxFee && t.fee.min > f.maxFee) return false;
    if (
      search &&
      !t.name.toLowerCase().includes(search.toLowerCase()) &&
      !t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    )
      return false;
    return true;
  });

  switch (f.sortBy) {
    case "experience":
      return results.sort((a, b) => b.experience - a.experience);
    case "rating":
      return results.sort((a, b) => b.rating - a.rating);
    case "fee-low":
      return results.sort((a, b) => a.fee.min - b.fee.min);
    case "fee-high":
      return results.sort((a, b) => b.fee.min - a.fee.min);
    default:
      return results.sort((a, b) => (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0));
  }
}

function FiltersPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: TutorFilterState;
  onChange: (f: Partial<TutorFilterState>) => void;
  onReset: () => void;
}) {
  const hasActive =
    filters.subject || filters.class || filters.location ||
    filters.mode !== "all" || filters.gender !== "any" ||
    filters.experience !== "any" || filters.maxFee;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-700 text-brand-navy">Filters</h3>
        {hasActive && (
          <button onClick={onReset} className="text-xs text-brand-blue hover:underline font-600">
            Clear all
          </button>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="block text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Subject</label>
        <select
          value={filters.subject}
          onChange={(e) => onChange({ subject: e.target.value })}
          className="w-full h-9 px-3 rounded-lg border border-brand-border text-sm bg-white text-brand-navy"
        >
          <option value="">All Subjects</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Class */}
      <div>
        <label className="block text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Class</label>
        <select
          value={filters.class}
          onChange={(e) => onChange({ class: e.target.value })}
          className="w-full h-9 px-3 rounded-lg border border-brand-border text-sm bg-white text-brand-navy"
        >
          <option value="">All Classes</option>
          {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Location</label>
        <select
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
          className="w-full h-9 px-3 rounded-lg border border-brand-border text-sm bg-white text-brand-navy"
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Mode */}
      <div>
        <label className="block text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Learning Mode</label>
        <div className="grid grid-cols-3 gap-1.5">
          {([["all", "All"], ["home", "Home"], ["online", "Online"]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => onChange({ mode: val })}
              className={`py-1.5 rounded-lg text-xs font-600 border transition-all ${
                filters.mode === val
                  ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                  : "border-brand-border text-brand-text hover:border-brand-blue/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <label className="block text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Experience</label>
        <div className="grid grid-cols-2 gap-1.5">
          {([["any", "Any"], ["1", "1+ yr"], ["3", "3+ yrs"], ["5", "5+ yrs"]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => onChange({ experience: val })}
              className={`py-1.5 rounded-lg text-xs font-600 border transition-all ${
                filters.experience === val
                  ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                  : "border-brand-border text-brand-text hover:border-brand-blue/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xs font-600 text-brand-muted uppercase tracking-wide mb-2">Tutor Gender</label>
        <div className="grid grid-cols-3 gap-1.5">
          {([["any", "Any"], ["male", "Male"], ["female", "Female"]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => onChange({ gender: val })}
              className={`py-1.5 rounded-lg text-xs font-600 border transition-all ${
                filters.gender === val
                  ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                  : "border-brand-border text-brand-text hover:border-brand-blue/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}



function FindTutorContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<TutorFilterState>({
    ...DEFAULT_FILTERS,
    subject: searchParams.get("subject") || "",
    class: searchParams.get("class") || "",
    location: searchParams.get("location") || "",
    mode: (searchParams.get("mode") as TutorFilterState["mode"]) || "all",
  });
  const [search, setSearch] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const results = useMemo(() => filterTutors(TUTORS, filters, search), [filters, search]);

  function updateFilter(partial: Partial<TutorFilterState>) {
    setFilters((f) => ({ ...f, ...partial }));
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* ─── PARENT TUTOR REQUEST FORM SECTION ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ParentRequestForm />
      </div>

      {/* ─── MEET OUR TUTORS DIRECTORY SECTION ───────────────────────────── */}
      <div className="bg-white border-t border-b border-brand-border" id="meet-our-tutors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6 mb-6">
            <div>
              <span className="inline-block text-xs font-700 uppercase tracking-widest bg-brand-blue-light text-brand-blue px-3 py-1 rounded-full mb-2">
                Verified Educator Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-800 text-brand-navy">
                Meet Our Tutors
              </h2>
              <p className="text-xs sm:text-sm text-brand-text mt-1">
                Browse profiles, qualifications, and hourly rates of verified home &amp; online teachers across Kathmandu Valley.
              </p>
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: "Class 10 (SEE)", class: "Class 10 (SEE)" },
                { label: "+2 Science", class: "+2 Science" },
                { label: "Math", subject: "Mathematics" },
                { label: "Science", subject: "Science" },
              ].map((pill, i) => (
                <button
                  key={i}
                  onClick={() => updateFilter(pill.class ? { class: pill.class } : { subject: pill.subject })}
                  className="text-xs font-600 px-3 py-1 bg-brand-bg border border-brand-border rounded-full text-brand-navy hover:border-brand-blue hover:text-brand-blue transition-all"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search + Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
              <Input
                placeholder="Search by name or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-brand-bg border-brand-border"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="h-4 w-4 text-brand-muted hover:text-brand-navy" />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter({ sortBy: e.target.value as TutorFilterState["sortBy"] })}
              className="h-10 px-3 rounded-md border border-brand-border text-sm bg-white text-brand-navy sm:w-44"
            >
              <option value="recommended">Recommended</option>
              <option value="experience">Experience</option>
              <option value="rating">Highest Rated</option>
              <option value="fee-low">Fee: Low to High</option>
              <option value="fee-high">Fee: High to Low</option>
            </select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline" className="lg:hidden border-brand-border gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                }
              />
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader className="mb-4">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <FiltersPanel filters={filters} onChange={updateFilter} onReset={() => setFilters(DEFAULT_FILTERS)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-brand-border p-5 sticky top-24">
              <FiltersPanel filters={filters} onChange={updateFilter} onReset={() => setFilters(DEFAULT_FILTERS)} />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-brand-muted font-500">
                <span className="font-700 text-brand-navy">{results.length}</span>{" "}
                tutor{results.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {results.length === 0 ? (
              <div className="bg-white rounded-2xl border border-brand-border p-12 text-center">
                <Search className="h-10 w-10 text-brand-muted mx-auto mb-4" />
                <h3 className="text-lg font-700 text-brand-navy mb-2">No tutors found</h3>
                <p className="text-brand-text text-sm mb-5">
                  Try adjusting your filters or{" "}
                  <a href="/help-me-find-a-tutor" className="text-brand-blue hover:underline font-600">
                    let us help you find a tutor
                  </a>
                  .
                </p>
                <Button onClick={() => setFilters(DEFAULT_FILTERS)} variant="outline" className="rounded-full border-brand-blue text-brand-blue">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {results.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} onRequest={setSelectedTutor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <RequestTutorModal
        tutor={selectedTutor}
        open={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
      />
    </div>
  );
}

export default function FindTutorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-muted text-sm">Loading tutors...</div>}>
      <FindTutorContent />
    </Suspense>
  );
}
