"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Briefcase,
  FileText,
  Bell,
  Settings,
  LogOut,
  Edit3,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  Star,
  MapPin,
  ChevronRight,
  Plus,
  Eye,
  Trash2,
  Download,
  Phone,
  Mail,
  GraduationCap,
  Wifi,
  Home,
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Camera,
  Save,
  RefreshCw,
  Building2,
  Search,
  Calendar,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────────────────────
   TYPES & DATA MODELS
───────────────────────────────────────────── */

export interface SchoolVacancy {
  id: string;
  schoolName: string;
  schoolLogo: string;
  schoolLocation: string;
  isVerifiedSchool: boolean;
  schoolCategory: string;
  jobTitle: string;
  level: string;
  subjects: string[];
  salary: string;
  employmentType: "Full-Time" | "Part-Time" | "Contract" | "Morning Shift";
  qualificationRequired: string;
  experienceRequired: string;
  deadline: string;
  postedDate: string;
  description: string;
  benefits: string[];
  vacanciesCount: number;
}

export interface ApplicationItem {
  id: string;
  jobId: string;
  jobTitle: string;
  schoolName?: string;
  isSchoolJob: boolean;
  location: string;
  salary: string;
  appliedDate: string;
  status: "pending" | "shortlisted" | "hired" | "rejected";
}

const MOCK_TUTOR = {
  name: "Anish Shrestha",
  email: "anish.shrestha@gmail.com",
  phone: "+977 98XXXXXXXX",
  photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=anish&backgroundColor=b6e3f4",
  location: "Kathmandu",
  qualification: "BScIT, Tribhuvan University",
  experience: 4,
  subjects: ["Mathematics", "Physics", "Computer"],
  classes: ["Class 8", "Class 9", "Class 10", "Class 11", "+2 Science"],
  teachingMode: "both" as "home" | "online" | "both",
  bio: "Passionate educator with 4+ years of experience helping students crack board exams. I specialise in Mathematics and Physics with a focus on conceptual clarity.",
  rate: { min: 8000, max: 12000 },
  rating: 4.7,
  reviewCount: 23,
  isVerified: true,
  cvFileName: "Anish_Shrestha_CV.pdf",
  cvUploadedAt: "2024-08-15",
};

const MOCK_APPLICATIONS: ApplicationItem[] = [
  {
    id: "app-001",
    jobId: "sch-vacancy-001",
    jobTitle: "Secondary Mathematics Teacher",
    schoolName: "Little Angels' High School & College",
    isSchoolJob: true,
    location: "Hattiban, Lalitpur",
    salary: "NPR 38,000–48,000",
    appliedDate: "2024-09-22",
    status: "shortlisted",
  },
  {
    id: "app-002",
    jobId: "job-101",
    jobTitle: "SEE Math & Science Home Tutor",
    schoolName: undefined,
    isSchoolJob: false,
    location: "New Baneshwor, Kathmandu",
    salary: "NPR 10,000–12,000",
    appliedDate: "2024-09-20",
    status: "pending",
  },
  {
    id: "app-003",
    jobId: "sch-vacancy-002",
    jobTitle: "+2 Physics Lecturer (Morning Shift)",
    schoolName: "St. Xavier's School",
    isSchoolJob: true,
    location: "Jawalakhel, Lalitpur",
    salary: "NPR 45,000–58,000",
    appliedDate: "2024-09-18",
    status: "shortlisted",
  },
  {
    id: "app-004",
    jobId: "job-104",
    jobTitle: "Class 8 Computer & Math Tutor",
    schoolName: undefined,
    isSchoolJob: false,
    location: "Kapan, Kathmandu",
    salary: "NPR 7,500",
    appliedDate: "2024-09-05",
    status: "hired",
  },
];

const AVAILABLE_JOBS = [
  {
    id: "job-201",
    title: "Grade 11–12 Physics Tutor",
    classLevel: "+2 Science",
    subjects: ["Physics"],
    location: "Baluwatar, Kathmandu",
    mode: "Home" as const,
    salary: "NPR 11,000–13,000",
    timing: "6:00–7:30 AM",
    daysPerWeek: "6 days/week",
    urgency: "Urgent" as const,
    postedDate: "1 hr ago",
    genderPreference: "Any" as const,
    description: "NEB Physics for two science students preparing for CMAT & MBBS entrance.",
    postedBy: "Parent",
  },
  {
    id: "job-202",
    title: "SEE Math Home Tutor",
    classLevel: "Class 10",
    subjects: ["Mathematics"],
    location: "Bhaktapur",
    mode: "Home" as const,
    salary: "NPR 9,000",
    timing: "5:00–6:30 PM",
    daysPerWeek: "5 days/week",
    urgency: "Normal" as const,
    postedDate: "4 hrs ago",
    genderPreference: "Female Preferred" as const,
    description: "Board exam preparation focusing on algebra and geometry.",
    postedBy: "Parent",
  },
  {
    id: "job-203",
    title: "Computer Science Online Tutor",
    classLevel: "+2 / Class 11–12",
    subjects: ["Computer"],
    location: "Online",
    mode: "Online" as const,
    salary: "NPR 8,000–10,000",
    timing: "Flexible Evening",
    daysPerWeek: "5 days/week",
    urgency: "Urgent" as const,
    postedDate: "2 hrs ago",
    genderPreference: "Any" as const,
    description: "C programming, HTML/CSS and QBASIC for NEB curriculum. Strong IT background required.",
    postedBy: "Parent",
  },
  {
    id: "job-204",
    title: "Primary Math & English Tutor",
    classLevel: "Class 4–5",
    subjects: ["Mathematics", "English"],
    location: "Patan, Lalitpur",
    mode: "Home" as const,
    salary: "NPR 7,000",
    timing: "4:00–5:30 PM",
    daysPerWeek: "5 days/week",
    urgency: "Normal" as const,
    postedDate: "1 day ago",
    genderPreference: "Any" as const,
    description: "Foundation building for two primary school students. Patient, friendly tutor preferred.",
    postedBy: "Parent",
  },
];

const MOCK_SCHOOL_VACANCIES: SchoolVacancy[] = [
  {
    id: "sch-vacancy-001",
    schoolName: "Little Angels' High School & College",
    schoolLogo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80",
    schoolLocation: "Hattiban, Lalitpur",
    isVerifiedSchool: true,
    schoolCategory: "Secondary & +2 School",
    jobTitle: "Secondary Mathematics Teacher (Grade 9–10)",
    level: "Class 9 & 10 (SEE)",
    subjects: ["Mathematics", "Optional Math"],
    salary: "NPR 38,000 – 48,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "B.Sc. / M.Sc. Mathematics or B.Ed.",
    experienceRequired: "Minimum 2 years teaching SEE curriculum",
    deadline: "Oct 15, 2026",
    postedDate: "1 day ago",
    description: "Seeking a dynamic secondary math teacher responsible for Grade 9 & 10 SEE preparation. Must have excellent classroom management and problem-solving pedagogy.",
    benefits: ["PF & Gratuity", "Staff Transport", "Annual Performance Bonus", "Subsidized Lunch"],
    vacanciesCount: 2,
  },
  {
    id: "sch-vacancy-002",
    schoolName: "St. Xavier's School",
    schoolLogo: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=150&auto=format&fit=crop&q=80",
    schoolLocation: "Jawalakhel, Lalitpur",
    isVerifiedSchool: true,
    schoolCategory: "High School & +2 College",
    jobTitle: "+2 Science Physics Lecturer (Morning Shift)",
    level: "+2 Science (Class 11–12)",
    subjects: ["Physics"],
    salary: "NPR 45,000 – 58,000 / month",
    employmentType: "Morning Shift",
    qualificationRequired: "M.Sc. in Physics",
    experienceRequired: "3+ years teaching NEB +2 Physics",
    deadline: "Oct 20, 2026",
    postedDate: "3 days ago",
    description: "Required experienced Physics lecturer for morning shift (6:15 AM - 11:30 AM). Conducting numerical problem sessions & entrance prep assistance.",
    benefits: ["Provident Fund", "Medical Allowance", "Paid Festival Leave"],
    vacanciesCount: 1,
  },
  {
    id: "sch-vacancy-003",
    schoolName: "Kathmandu Model College (KMC)",
    schoolLogo: "https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80",
    schoolLocation: "Balkumari, Lalitpur",
    isVerifiedSchool: true,
    schoolCategory: "+2 & Higher Education",
    jobTitle: "Computer Science & Programming Faculty",
    level: "Class 11 & 12 (+2 Management/Science)",
    subjects: ["Computer Science", "C / HTML Programming"],
    salary: "NPR 35,000 – 42,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "BSc IT / BCA / BE Computer Science",
    experienceRequired: "1-2 years experience or strong project background",
    deadline: "Oct 12, 2026",
    postedDate: "2 hrs ago",
    description: "Responsible for Computer theory & laboratory practical sessions for NEB Grade 11 & 12 students.",
    benefits: ["Staff Training & Certifications", "Festival Bonus", "PF Contribution"],
    vacanciesCount: 3,
  },
  {
    id: "sch-vacancy-004",
    schoolName: "Trinity International College",
    schoolLogo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&auto=format&fit=crop&q=80",
    schoolLocation: "Dillibazar, Kathmandu",
    isVerifiedSchool: true,
    schoolCategory: "+2 & Degree College",
    jobTitle: "+2 Accountancy & Finance Faculty",
    level: "+2 Management",
    subjects: ["Accountancy", "Finance"],
    salary: "NPR 550 – 750 / period",
    employmentType: "Part-Time",
    qualificationRequired: "MBS / MBA / CA (Inter)",
    experienceRequired: "2+ years in NEB Class 11-12 Accountancy",
    deadline: "Oct 18, 2026",
    postedDate: "5 hrs ago",
    description: "Looking for part-time period based Accountancy lecturer for day shift shifts.",
    benefits: ["Per-period Incentive", "Flexible Lecture Schedule"],
    vacanciesCount: 2,
  },
  {
    id: "sch-vacancy-005",
    schoolName: "Budhanilkantha School",
    schoolLogo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=150&auto=format&fit=crop&q=80",
    schoolLocation: "Budhanilkantha, Kathmandu",
    isVerifiedSchool: true,
    schoolCategory: "Residential Secondary School",
    jobTitle: "Primary English & Creative Writing Teacher",
    level: "Primary Level (Grade 3–5)",
    subjects: ["English", "Creative Writing"],
    salary: "NPR 36,000 – 44,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "B.A. in Major English or B.Ed.",
    experienceRequired: "2+ years primary school teaching",
    deadline: "Oct 25, 2026",
    postedDate: "4 days ago",
    description: "Teaching English language, grammar, and creative writing skills to primary boarders and day scholars.",
    benefits: ["Accommodation Support", "On-campus Lunch", "PF & Gratuity"],
    vacanciesCount: 1,
  },
  {
    id: "sch-vacancy-006",
    schoolName: "Premier International IB World School",
    schoolLogo: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=150&auto=format&fit=crop&q=80",
    schoolLocation: "Khumaltar, Lalitpur",
    isVerifiedSchool: true,
    schoolCategory: "IB World School",
    jobTitle: "MYP Integrated Science & STEM Facilitator",
    level: "Middle Years Program (Grade 6–8)",
    subjects: ["Science", "STEM / Robotics"],
    salary: "NPR 48,000 – 65,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "B.Sc. / B.E. with fluency in English",
    experienceRequired: "Experience in inquiry-based or IB/Cambridge curriculum preferred",
    deadline: "Oct 30, 2026",
    postedDate: "1 week ago",
    description: "Dynamic role facilitating interactive science experiments, STEM projects, and inquiry learning for MYP students.",
    benefits: ["International IB Teacher Workshops", "Health Insurance", "PF + Festival Bonus"],
    vacanciesCount: 2,
  },
];

type Tab = "overview" | "profile" | "cv" | "jobs" | "school-vacancies" | "applications" | "settings";

const STATUS_MAP = {
  pending: { label: "Pending", color: "text-brand-yellow-dark bg-brand-yellow-light border-brand-yellow/30", icon: Clock },
  shortlisted: { label: "Shortlisted", color: "text-brand-blue bg-brand-blue-light border-brand-blue/30", icon: Star },
  hired: { label: "Hired ✓", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "text-rose-600 bg-rose-50 border-rose-200", icon: XCircle },
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS WITH BRAND COLOR SYSTEM
───────────────────────────────────────────── */

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs hover:shadow-md transition-shadow">
      <p className="text-xs font-[800] uppercase tracking-widest text-brand-muted mb-1">{label}</p>
      <p className={`text-3xl font-[900] mb-0.5 ${color}`}>{value}</p>
      <p className="text-xs text-brand-text font-[500]">{sub}</p>
    </div>
  );
}

function ApplicationCard({ app, onWithdraw }: { app: ApplicationItem; onWithdraw: (id: string) => void }) {
  const s = STATUS_MAP[app.status];
  const Icon = s.icon;
  return (
    <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs hover:shadow-md transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {app.isSchoolJob ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-[800] bg-brand-teal-light text-brand-teal-dark rounded-full px-2 py-0.5 border border-brand-teal/20">
                <Building2 className="w-3 h-3" /> School Vacancy
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-[700] bg-brand-blue-light text-brand-blue rounded-full px-2 py-0.5">
                <Home className="w-3 h-3" /> Private Tuition
              </span>
            )}
          </div>
          <h3 className="font-[800] text-brand-navy text-sm mb-0.5">{app.jobTitle}</h3>
          {app.schoolName && (
            <p className="text-xs font-[800] text-brand-teal-dark mb-1 flex items-center gap-1">
              <Building2 className="w-3 h-3" /> {app.schoolName}
            </p>
          )}
          <div className="flex flex-wrap gap-2 text-xs text-brand-muted font-[500]">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-brand-muted" />{app.location}</span>
            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-brand-muted" />{app.salary}</span>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 text-xs font-[800] px-2.5 py-1 rounded-full border ${s.color}`}>
          <Icon className="w-3 h-3" />{s.label}
        </span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-brand-border/60">
        <p className="text-xs text-brand-muted font-[500]">Applied {new Date(app.appliedDate).toLocaleDateString("en-NP", { day: "numeric", month: "short", year: "numeric" })}</p>
        {app.status === "pending" && (
          <button
            onClick={() => onWithdraw(app.id)}
            className="text-xs text-rose-500 hover:text-rose-700 font-[700] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Withdraw
          </button>
        )}
      </div>
    </div>
  );
}

function SchoolVacancyCard({
  vacancy,
  onApply,
  applied,
}: {
  vacancy: SchoolVacancy;
  onApply: (vacancy: SchoolVacancy) => void;
  applied: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs hover:shadow-md hover:border-brand-teal/50 transition-all flex flex-col justify-between group">
      <div>
        {/* School Header */}
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-brand-teal-light border border-brand-teal/20 flex-shrink-0 flex items-center justify-center">
            {vacancy.schoolLogo ? (
              <img src={vacancy.schoolLogo} alt={vacancy.schoolName} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-6 h-6 text-brand-teal-dark" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-[800] bg-brand-teal-light text-brand-teal-dark px-2 py-0.5 rounded-full border border-brand-teal/20 uppercase tracking-wider">
                {vacancy.schoolCategory}
              </span>
              {vacancy.isVerifiedSchool && (
                <span className="inline-flex items-center gap-1 text-[10px] font-[700] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified School
                </span>
              )}
            </div>
            <h4 className="font-[800] text-brand-navy text-sm mt-1 truncate group-hover:text-brand-teal-dark transition-colors">
              {vacancy.schoolName}
            </h4>
            <p className="text-xs text-brand-muted flex items-center gap-1 font-[500]">
              <MapPin className="w-3 h-3 text-brand-muted" /> {vacancy.schoolLocation}
            </p>
          </div>
        </div>

        {/* Job Title & Level */}
        <div className="mb-3">
          <h3 className="font-[900] text-brand-navy text-base leading-snug mb-1">{vacancy.jobTitle}</h3>
          <span className="inline-block text-xs font-[700] text-brand-teal-dark bg-brand-teal-light/70 border border-brand-teal/20 px-2.5 py-0.5 rounded-md">
            Level: {vacancy.level}
          </span>
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {vacancy.subjects.map((s) => (
            <span key={s} className="text-xs bg-brand-bg text-brand-navy font-[700] border border-brand-border px-2.5 py-0.5 rounded-full">
              {s}
            </span>
          ))}
          <span className="text-xs bg-brand-yellow-light text-brand-yellow-dark font-[700] px-2 py-0.5 rounded-full border border-brand-yellow/30">
            {vacancy.employmentType}
          </span>
        </div>

        <p className="text-xs text-brand-text line-clamp-2 mb-3 leading-relaxed font-[500]">{vacancy.description}</p>

        {/* Requirements & Benefits */}
        <div className="bg-brand-bg rounded-xl p-3 space-y-1.5 text-xs text-brand-text mb-3 border border-brand-border">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-brand-teal-dark flex-shrink-0" />
            <span className="font-[600] truncate text-brand-navy">Req: {vacancy.qualificationRequired}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-brand-teal-dark flex-shrink-0" />
            <span className="truncate text-brand-text font-[500]">Exp: {vacancy.experienceRequired}</span>
          </div>
          {vacancy.benefits && vacancy.benefits.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {vacancy.benefits.slice(0, 3).map((b) => (
                <span key={b} className="text-[10px] font-[700] bg-white text-emerald-700 border border-emerald-100 rounded px-1.5 py-0.5">
                  ✓ {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-brand-muted font-[500] uppercase tracking-wide">Salary / Remuneration</p>
            <p className="font-[900] text-brand-navy text-sm">{vacancy.salary}</p>
            <p className="text-[10px] text-brand-muted mt-0.5 flex items-center gap-1 font-[500]">
              <Calendar className="w-3 h-3 text-brand-muted" /> Deadline: {vacancy.deadline}
            </p>
          </div>
          <Button
            onClick={() => onApply(vacancy)}
            disabled={applied}
            className={`rounded-full text-xs font-[800] h-9 px-4 shadow-xs transition-all ${
              applied
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-not-allowed"
                : "bg-brand-teal hover:bg-brand-teal-dark text-white shadow-teal-200"
            }`}
          >
            {applied ? "✓ Applied" : "Apply to School"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function JobCard({
  job,
  onApply,
  applied,
}: {
  job: (typeof AVAILABLE_JOBS)[0];
  onApply: (job: (typeof AVAILABLE_JOBS)[0]) => void;
  applied: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs hover:shadow-md hover:border-brand-blue/40 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-[700] bg-brand-blue-light text-brand-blue px-2 py-0.5 rounded-full flex items-center gap-1">
            <Home className="w-3 h-3" /> Home Tuition Request
          </span>
          <span className="text-[10px] text-brand-muted font-[500]">{job.postedDate}</span>
        </div>

        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {job.urgency === "Urgent" && (
                <span className="text-[10px] font-[800] bg-rose-50 text-rose-600 rounded-full px-2 py-0.5 border border-rose-200">URGENT</span>
              )}
            </div>
            <h3 className="font-[800] text-brand-navy text-sm mb-1.5">{job.title}</h3>
            <div className="flex flex-wrap gap-2 text-xs text-brand-muted mb-2 font-[500]">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
              <span className="flex items-center gap-1">{job.mode === "Online" ? <Wifi className="w-3 h-3" /> : <Home className="w-3 h-3" />}{job.mode}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.timing}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {job.subjects.map((s) => (
                <span key={s} className="text-xs bg-brand-blue-light text-brand-blue font-[700] px-2 py-0.5 rounded-full">{s}</span>
              ))}
              <span className="text-xs bg-brand-bg text-brand-navy font-[600] border border-brand-border px-2 py-0.5 rounded-full">{job.classLevel}</span>
            </div>
            <p className="text-xs text-brand-text leading-relaxed font-[500]">{job.description}</p>
          </div>
        </div>
      </div>

      <div>
        <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-brand-muted font-[500] uppercase tracking-wide">Monthly Rate</p>
            <p className="font-[900] text-brand-navy text-sm">{job.salary}</p>
            <p className="text-xs text-brand-muted font-[500]">{job.daysPerWeek} · {job.genderPreference}</p>
          </div>
          <Button
            onClick={() => onApply(job)}
            disabled={applied}
            className={`rounded-full text-xs font-[800] h-9 px-5 shadow-xs ${
              applied
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-not-allowed"
                : "bg-brand-blue hover:bg-brand-blue-dark text-white shadow-blue-200"
            }`}
          >
            {applied ? "✓ Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function TutorDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as Tab | null;
      const validTabs: Tab[] = ["overview", "profile", "cv", "jobs", "school-vacancies", "applications", "settings"];
      if (tabParam && validTabs.includes(tabParam)) {
        return tabParam;
      }
    }
    return "overview";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  // Sync activeTab with URL search params when tab changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") !== activeTab) {
        const url = new URL(window.location.href);
        url.searchParams.set("tab", activeTab);
        window.history.replaceState(null, "", url.toString());
      }
    }
  }, [activeTab]);

  const handleSignOut = () => {
    router.push("/login");
  };
  const [tutor, setTutor] = useState(MOCK_TUTOR);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ ...MOCK_TUTOR });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [applications, setApplications] = useState<ApplicationItem[]>(MOCK_APPLICATIONS);
  const [appliedIds, setAppliedIds] = useState<string[]>(["sch-vacancy-001", "sch-vacancy-002"]);

  // School vacancies state
  const [schoolVacancies] = useState<SchoolVacancy[]>(MOCK_SCHOOL_VACANCIES);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [schoolCategoryFilter, setSchoolCategoryFilter] = useState("All");

  const [applyingJob, setApplyingJob] = useState<(typeof AVAILABLE_JOBS)[0] | null>(null);
  const [applyingSchoolVacancy, setApplyingSchoolVacancy] = useState<SchoolVacancy | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your application to Little Angels' High School for Secondary Math Teacher was shortlisted!", time: "1 hr ago", read: false },
    { id: 2, text: "St. Xavier's School invited you for a demo class evaluation.", time: "3 hrs ago", read: false },
    { id: 3, text: "New physics lecturer vacancy posted by KMC College.", time: "5 hrs ago", read: false },
    { id: 4, text: "Profile verification complete. ✓", time: "Yesterday", read: true },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSaveProfile = () => {
    setTutor({ ...editForm });
    setEditMode(false);
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setCvUploaded(false);
    }
  };

  const handleCvUpload = async () => {
    if (!cvFile) return;
    setCvUploading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setCvUploading(false);
    setCvUploaded(true);
    setTutor((prev) => ({ ...prev, cvFileName: cvFile.name, cvUploadedAt: new Date().toISOString().split("T")[0] }));
  };

  const handleWithdraw = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const handleApplyJob = (job: (typeof AVAILABLE_JOBS)[0]) => {
    setApplyingJob(job);
  };

  const handleApplySchoolVacancy = (vacancy: SchoolVacancy) => {
    setApplyingSchoolVacancy(vacancy);
  };

  const confirmApplyJob = async () => {
    if (!applyingJob) return;
    await new Promise((r) => setTimeout(r, 800));
    setAppliedIds((prev) => [...prev, applyingJob.id]);
    setApplications((prev) => [
      {
        id: `app-${Date.now()}`,
        jobId: applyingJob.id,
        jobTitle: applyingJob.title,
        schoolName: undefined,
        isSchoolJob: false,
        location: applyingJob.location,
        salary: applyingJob.salary,
        appliedDate: new Date().toISOString().split("T")[0],
        status: "pending",
      },
      ...prev,
    ]);
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setApplyingJob(null);
    }, 1800);
  };

  const confirmApplySchool = async () => {
    if (!applyingSchoolVacancy) return;
    await new Promise((r) => setTimeout(r, 800));
    setAppliedIds((prev) => [...prev, applyingSchoolVacancy.id]);
    setApplications((prev) => [
      {
        id: `app-${Date.now()}`,
        jobId: applyingSchoolVacancy.id,
        jobTitle: applyingSchoolVacancy.jobTitle,
        schoolName: applyingSchoolVacancy.schoolName,
        isSchoolJob: true,
        location: applyingSchoolVacancy.schoolLocation,
        salary: applyingSchoolVacancy.salary,
        appliedDate: new Date().toISOString().split("T")[0],
        status: "pending",
      },
      ...prev,
    ]);
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setApplyingSchoolVacancy(null);
    }, 1800);
  };

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // Filtered school vacancies
  const filteredSchoolVacancies = schoolVacancies.filter((v) => {
    const q = schoolSearch.toLowerCase();
    const matchesSearch =
      !q ||
      v.schoolName.toLowerCase().includes(q) ||
      v.jobTitle.toLowerCase().includes(q) ||
      v.subjects.join(" ").toLowerCase().includes(q) ||
      v.schoolLocation.toLowerCase().includes(q);

    const matchesCategory =
      schoolCategoryFilter === "All" ||
      (schoolCategoryFilter === "Secondary" && v.schoolCategory.includes("Secondary")) ||
      (schoolCategoryFilter === "+2 College" && v.schoolCategory.includes("+2")) ||
      (schoolCategoryFilter === "IB School" && v.schoolCategory.includes("IB"));

    return matchesSearch && matchesCategory;
  });

  const NAV_ITEMS: { id: Tab; label: string; icon: React.ElementType; badge?: number; highlight?: boolean }[] = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "school-vacancies", label: "School Vacancies", icon: Building2, badge: schoolVacancies.length, highlight: true },
    { id: "jobs", label: "Tuition Vacancies", icon: Briefcase, badge: AVAILABLE_JOBS.length },
    { id: "applications", label: "My Applications", icon: CheckCircle2, badge: applications.length },
    { id: "profile", label: "My Profile", icon: User },
    { id: "cv", label: "My CV", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-brand-border z-40 flex flex-col shadow-lg transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-brand-border">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Mero Tutor"
              width={140}
              height={38}
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>
          <p className="text-[10px] text-brand-muted font-[700] uppercase tracking-wider mt-1.5">Tutor Portal &amp; Faculty Board</p>
        </div>

        {/* Tutor mini-profile */}
        <div className="p-4 border-b border-brand-border bg-brand-bg/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-brand-blue-light border-2 border-brand-blue/30">
                <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
              </div>
              {tutor.isVerified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-[800] text-brand-navy truncate">{tutor.name}</p>
              <p className="text-[10px] text-brand-muted font-[600] truncate">{tutor.subjects.slice(0, 2).join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-[800] transition-all text-left relative ${
                  isActive
                    ? "bg-brand-blue text-white shadow-sm shadow-blue-200"
                    : "text-brand-navy hover:bg-brand-blue-light/40 hover:text-brand-blue"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-[800] px-2 py-0.5 rounded-full min-w-[20px] text-center ${
                      isActive
                        ? "bg-white/20 text-white"
                        : item.highlight
                        ? "bg-brand-teal-light text-brand-teal-dark font-[800]"
                        : "bg-brand-border text-brand-navy"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-brand-border space-y-1">
          <button
            onClick={() => setShowSignOutModal(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-[800] text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-brand-border px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-brand-navy hover:bg-brand-bg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-[900] text-brand-navy capitalize">
                {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
              </h1>
              <p className="text-[11px] text-brand-muted font-[500] hidden sm:block">
                {new Date().toLocaleDateString("en-NP", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllRead}
              className="relative p-2.5 rounded-xl text-brand-navy hover:bg-brand-bg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-[800] rounded-full flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-brand-blue-light border-2 border-brand-blue/30 cursor-pointer" onClick={() => setActiveTab("profile")}>
              <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">

          {/* ─── OVERVIEW ─────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="max-w-5xl mx-auto space-y-6">

              {/* Welcome banner with light mint/teal gradient */}
              <div className="relative overflow-hidden bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 rounded-3xl p-6 sm:p-8 text-brand-navy border border-brand-teal/30 shadow-md">
                <div className="absolute top-0 right-0 w-72 h-72 bg-brand-teal/10 rounded-full -translate-y-20 translate-x-20 blur-2xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 bg-brand-teal-light text-brand-teal-dark border border-brand-teal/30 px-3 py-1 rounded-full text-xs font-[800] mb-3">
                    <Building2 className="w-3.5 h-3.5 text-brand-teal-dark" /> Institutional Recruitment Active
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-[900] text-brand-navy tracking-tight mb-1">{tutor.name}</h2>
                  <p className="text-brand-muted text-sm font-[500] mb-5 max-w-xl">
                    {tutor.qualification} · {tutor.experience} yrs experience · {tutor.location}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => setActiveTab("school-vacancies")}
                      className="bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-[800] px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      Browse School Vacancies ({schoolVacancies.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("jobs")}
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-[800] px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      Tuition Vacancies ({AVAILABLE_JOBS.length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Applications" value={applications.length} sub="Total submitted" color="text-brand-blue" />
                <StatCard
                  label="Shortlisted"
                  value={applications.filter((a) => a.status === "shortlisted").length}
                  sub="By schools & parents"
                  color="text-brand-teal-dark"
                />
                <StatCard
                  label="Hired"
                  value={applications.filter((a) => a.status === "hired").length}
                  sub="Active positions"
                  color="text-emerald-600"
                />
                <StatCard label="School Vacancies" value={schoolVacancies.length} sub="Verified institutions" color="text-brand-yellow-dark" />
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Building2, label: "School Vacancies", desc: "Apply directly to top schools & colleges", color: "text-brand-teal-dark bg-brand-teal-light", tab: "school-vacancies" as Tab },
                  { icon: Briefcase, label: "Tuition Vacancies", desc: `${AVAILABLE_JOBS.length} active tuition requests`, color: "text-brand-blue bg-brand-blue-light", tab: "jobs" as Tab },
                  { icon: FileText, label: "My CV / Resume", desc: "Keep CV updated for schools", color: "text-brand-yellow-dark bg-brand-yellow-light", tab: "cv" as Tab },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.tab}
                      onClick={() => setActiveTab(action.tab)}
                      className="bg-white rounded-2xl border border-brand-border p-4 text-left hover:shadow-md transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-[800] text-brand-navy mb-0.5">{action.label}</p>
                      <p className="text-xs text-brand-muted font-[500]">{action.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Featured School Vacancies Section */}
              <div className="bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 rounded-3xl p-6 text-brand-navy shadow-md border border-brand-teal/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-brand-teal-dark" />
                      <h2 className="text-lg font-[900] text-brand-navy">Vacancies Posted by Schools &amp; Colleges</h2>
                    </div>
                    <p className="text-xs text-brand-muted font-[500]">Direct faculty hiring from verified schools in Nepal</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("school-vacancies")}
                    className="text-xs font-[800] text-brand-teal-dark hover:text-brand-navy flex items-center gap-1 bg-white hover:bg-brand-teal-light/50 border border-brand-teal/20 px-3 py-1.5 rounded-full transition-colors shadow-2xs"
                  >
                    View All {schoolVacancies.length} →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schoolVacancies.slice(0, 2).map((vacancy) => (
                    <div key={vacancy.id} className="bg-white hover:shadow-md rounded-2xl p-4 border border-brand-teal/20 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <img src={vacancy.schoolLogo} alt={vacancy.schoolName} className="w-10 h-10 rounded-xl object-cover border border-brand-border" />
                          <div>
                            <p className="text-xs font-[800] text-brand-teal-dark">{vacancy.schoolName}</p>
                            <p className="text-[11px] text-brand-muted flex items-center gap-1 font-[500]">
                              <MapPin className="w-3 h-3 text-brand-teal" /> {vacancy.schoolLocation}
                            </p>
                          </div>
                        </div>
                        <h4 className="font-[800] text-brand-navy text-sm mb-1">{vacancy.jobTitle}</h4>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <span className="text-[10px] bg-brand-blue-light text-brand-blue font-[700] px-2 py-0.5 rounded-full">{vacancy.level}</span>
                          <span className="text-[10px] bg-brand-teal-light text-brand-teal-dark font-[700] px-2 py-0.5 rounded-full">{vacancy.employmentType}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-brand-border/60">
                        <span className="text-xs font-[800] text-emerald-600">{vacancy.salary}</span>
                        <button
                          onClick={() => handleApplySchoolVacancy(vacancy)}
                          disabled={appliedIds.includes(vacancy.id)}
                          className={`text-xs font-[800] px-3.5 py-1.5 rounded-full transition-colors ${
                            appliedIds.includes(vacancy.id)
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                              : "bg-brand-teal hover:bg-brand-teal-dark text-white shadow-sm"
                          }`}
                        >
                          {appliedIds.includes(vacancy.id) ? "Applied ✓" : "Apply to School"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent applications */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-[900] text-brand-navy">Recent Applications</h2>
                  <button onClick={() => setActiveTab("applications")} className="text-xs text-brand-blue font-[800] hover:underline">
                    View all →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {applications.slice(0, 4).map((app) => (
                    <ApplicationCard key={app.id} app={app} onWithdraw={handleWithdraw} />
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-[900] text-brand-navy flex items-center gap-2">
                    Notifications
                    {unreadCount > 0 && <span className="bg-rose-100 text-rose-600 text-[10px] font-[800] px-2 py-0.5 rounded-full">{unreadCount} new</span>}
                  </h2>
                  <button onClick={markAllRead} className="text-xs text-brand-muted hover:text-brand-navy font-[600]">Mark all read</button>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${n.read ? "bg-white border-brand-border" : "bg-brand-blue-light/30 border-brand-blue/20"}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? "bg-slate-300" : "bg-brand-blue"}`} />
                      <div className="flex-1">
                        <p className={`text-sm font-[${n.read ? "500" : "800"}] ${n.read ? "text-brand-text" : "text-brand-navy"}`}>{n.text}</p>
                        <p className="text-xs text-brand-muted mt-0.5 font-[500]">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── SCHOOL VACANCIES TAB ──────────────────────────────────── */}
          {activeTab === "school-vacancies" && (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Header section */}
              <div className="bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 text-brand-navy rounded-3xl p-6 sm:p-8 shadow-md border border-brand-teal/30 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-brand-teal-light text-brand-teal-dark border border-brand-teal/30 px-3 py-1 rounded-full text-xs font-[800] mb-3">
                    <Building2 className="w-3.5 h-3.5 text-brand-teal-dark" /> Institutional Faculty Board
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-[900] text-brand-navy tracking-tight mb-2">
                    School &amp; College Vacancies
                  </h2>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6 font-[500]">
                    Direct job openings posted by registered schools, colleges, and educational institutes across Nepal. Apply directly with your uploaded CV.
                  </p>
                  
                  {/* Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl border border-brand-teal/20 shadow-xs">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <Input
                        placeholder="Search by school name, subject, or location..."
                        value={schoolSearch}
                        onChange={(e) => setSchoolSearch(e.target.value)}
                        className="pl-10 bg-transparent border-0 text-brand-navy placeholder:text-brand-muted text-sm h-10 rounded-xl focus:ring-2 focus:ring-brand-teal/30"
                      />
                    </div>
                    <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
                      {["All", "Secondary", "+2 College", "IB School"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSchoolCategoryFilter(cat)}
                          className={`text-xs font-[800] px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                            schoolCategoryFilter === cat
                              ? "bg-brand-blue text-white shadow-xs"
                              : "bg-brand-bg text-brand-navy hover:bg-brand-blue-light/50 border border-brand-border"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vacancy Cards List */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-[800] uppercase tracking-wider text-brand-muted">
                    Showing <span className="text-brand-teal-dark font-[900]">{filteredSchoolVacancies.length}</span> Verified School Openings
                  </p>
                </div>

                {filteredSchoolVacancies.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-brand-border shadow-xs">
                    <Building2 className="w-12 h-12 text-brand-muted mx-auto mb-3" />
                    <h3 className="font-[800] text-brand-navy text-lg">No school vacancies found</h3>
                    <p className="text-xs text-brand-muted mt-1 font-[500]">Try resetting search filters or keywords.</p>
                    <Button
                      onClick={() => { setSchoolSearch(""); setSchoolCategoryFilter("All"); }}
                      className="mt-4 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full text-xs font-[800]"
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredSchoolVacancies.map((vacancy) => (
                      <SchoolVacancyCard
                        key={vacancy.id}
                        vacancy={vacancy}
                        onApply={handleApplySchoolVacancy}
                        applied={appliedIds.includes(vacancy.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── TUITION JOBS / VACANCIES ────────────────────── */}
          {activeTab === "jobs" && (
            <div className="max-w-4xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-[900] text-brand-navy">Tuition Vacancies</h2>
                  <p className="text-sm text-brand-muted font-[500]">
                    {AVAILABLE_JOBS.length} active private home &amp; online tuition assignments matched to your profile
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("school-vacancies")}
                  className="text-xs text-brand-teal-dark font-[800] hover:text-teal-900 bg-brand-teal-light hover:bg-teal-100 border border-brand-teal/20 rounded-full px-4 py-2 flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Building2 className="w-3.5 h-3.5 text-brand-teal-dark" /> Looking for School Jobs? Browse School Vacancies →
                </button>
              </div>

              {/* Private Tuitions Grid */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-border pb-2">
                  <Home className="w-5 h-5 text-brand-blue" />
                  <h3 className="font-[900] text-brand-navy text-base">Private Home &amp; Online Tuitions</h3>
                  <span className="bg-brand-blue-light text-brand-blue text-xs font-[800] px-2.5 py-0.5 rounded-full">
                    {AVAILABLE_JOBS.length} Tuition Openings
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {AVAILABLE_JOBS.map((job) => (
                    <JobCard key={job.id} job={job} onApply={handleApplyJob} applied={appliedIds.includes(job.id)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── APPLICATIONS ────────────────────────────────────── */}
          {activeTab === "applications" && (
            <div className="max-w-4xl mx-auto space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-[900] text-brand-navy">My Applications</h2>
                  <p className="text-sm text-brand-muted font-[500]">{applications.length} total applications to schools &amp; private parents</p>
                </div>
              </div>

              {/* Status summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["pending", "shortlisted", "hired", "rejected"] as const).map((status) => {
                  const s = STATUS_MAP[status];
                  const count = applications.filter((a) => a.status === status).length;
                  return (
                    <div key={status} className={`rounded-xl border p-3 text-center ${s.color}`}>
                      <p className="text-2xl font-[900]">{count}</p>
                      <p className="text-xs font-[800]">{s.label}</p>
                    </div>
                  );
                })}
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-brand-border">
                  <Briefcase className="w-12 h-12 text-brand-muted mx-auto mb-4" />
                  <p className="font-[800] text-brand-navy mb-1">No applications yet</p>
                  <p className="text-sm text-brand-muted mb-4 font-[500]">Browse school vacancies or tuition jobs and apply.</p>
                  <Button onClick={() => setActiveTab("school-vacancies")} className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full font-[800] shadow-sm">
                    Browse School Vacancies →
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {applications.map((app) => (
                    <ApplicationCard key={app.id} app={app} onWithdraw={handleWithdraw} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── PROFILE ─────────────────────────────────────────── */}
          {activeTab === "profile" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-[900] text-brand-navy">My Profile</h2>
                  {!editMode ? (
                    <Button onClick={() => { setEditForm({ ...tutor }); setEditMode(true); }} variant="outline" className="rounded-full border-brand-border text-brand-navy hover:bg-brand-bg text-xs font-[800] h-9 gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={() => setEditMode(false)} variant="ghost" className="rounded-full text-brand-muted text-xs font-[700] h-9">Cancel</Button>
                      <Button onClick={handleSaveProfile} className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full text-xs font-[800] h-9 gap-1.5 shadow-sm">
                        <Save className="w-3.5 h-3.5" /> Save Changes
                      </Button>
                    </div>
                  )}
                </div>

                {/* Photo */}
                <div className="flex items-start gap-5 mb-6 pb-6 border-b border-brand-border">
                  <div className="relative group cursor-pointer" onClick={() => photoInputRef.current?.click()}>
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-brand-blue-light border-2 border-brand-blue/30 group-hover:border-brand-blue transition-colors">
                      <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <input ref={photoInputRef} type="file" accept="image/*" className="hidden" />
                  </div>
                  <div>
                    <p className="font-[900] text-brand-navy text-lg">{tutor.name}</p>
                    <p className="text-sm text-brand-muted font-[500] mb-2">{tutor.qualification}</p>
                    <div className="flex items-center gap-2">
                      {tutor.isVerified && (
                        <span className="inline-flex items-center gap-1 text-xs font-[700] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Tutor
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-brand-yellow-dark text-xs font-[800]">
                        <Star className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
                        {tutor.rating} ({tutor.reviewCount} reviews)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Full Name", key: "name", icon: User },
                    { label: "Email", key: "email", icon: Mail },
                    { label: "Phone", key: "phone", icon: Phone },
                    { label: "Location", key: "location", icon: MapPin },
                    { label: "Qualification", key: "qualification", icon: GraduationCap },
                    { label: "Experience (years)", key: "experience", icon: TrendingUp },
                  ].map(({ label, key, icon: Icon }) => (
                    <div key={key}>
                      <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-1.5 block">{label}</Label>
                      {editMode ? (
                        <div className="relative">
                          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                          <Input
                            value={(editForm as Record<string, unknown>)[key] as string}
                            onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))}
                            className="pl-9 text-sm font-[600]"
                          />
                        </div>
                      ) : (
                        <p className="text-sm font-[600] text-brand-navy bg-brand-bg rounded-lg px-3 py-2 border border-brand-border">{(tutor as Record<string, unknown>)[key] as string}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-1.5 block">Bio / Teaching Experience</Label>
                  {editMode ? (
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm((f) => ({ ...f, bio: e.target.value }))}
                      rows={4}
                      className="w-full text-sm font-[500] text-brand-navy bg-white border border-brand-border rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    />
                  ) : (
                    <p className="text-sm text-brand-text bg-brand-bg rounded-xl px-3 py-3 leading-relaxed border border-brand-border font-[500]">{tutor.bio}</p>
                  )}
                </div>

                {/* Teaching Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-2 block">Subjects Expertise</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {tutor.subjects.map((s) => (
                        <span key={s} className="text-xs bg-brand-blue-light text-brand-blue font-[800] px-2.5 py-1 rounded-full">{s}</span>
                      ))}
                      {editMode && <button className="text-xs bg-brand-bg text-brand-navy font-[700] px-2.5 py-1 rounded-full hover:bg-brand-border flex items-center gap-1 border border-brand-border"><Plus className="w-3 h-3" />Add</button>}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-2 block">Classes / Levels</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {tutor.classes.map((c) => (
                        <span key={c} className="text-xs bg-brand-bg text-brand-navy font-[700] border border-brand-border px-2.5 py-1 rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-2 block">Teaching Mode</Label>
                    <div className="flex gap-2">
                      {(["home", "online", "both"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => editMode && setEditForm((f) => ({ ...f, teachingMode: m }))}
                          className={`text-xs font-[800] px-3.5 py-1.5 rounded-full border transition-all capitalize ${(editMode ? editForm.teachingMode : tutor.teachingMode) === m ? "bg-brand-blue text-white border-brand-blue" : "bg-white text-brand-navy border-brand-border"} ${!editMode && "cursor-default"}`}
                        >
                          {m === "both" ? "Home & Online" : m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-2 block">Expected Rate / Salary</Label>
                    <p className="text-sm font-[900] text-emerald-800 bg-emerald-50 text-emerald-700 rounded-lg px-3 py-2 border border-emerald-200">
                      NPR {tutor.rate.min.toLocaleString()} – {tutor.rate.max.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── CV ──────────────────────────────────────────────── */}
          {activeTab === "cv" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs">
                <h2 className="text-lg font-[900] text-brand-navy mb-1">My CV / Resume</h2>
                <p className="text-sm text-brand-muted mb-6 font-[500]">Upload your CV in PDF format. This CV will be attached automatically when applying to school vacancies.</p>

                {/* Current CV */}
                <div className="bg-brand-bg rounded-2xl border border-brand-border p-5 mb-6">
                  <p className="text-xs font-[800] uppercase tracking-widest text-brand-muted mb-3">Current CV</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-14 bg-white border-2 border-rose-200 rounded-xl flex items-center justify-center shadow-xs">
                      <FileText className="w-6 h-6 text-rose-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-[800] text-brand-navy text-sm">{tutor.cvFileName}</p>
                      <p className="text-xs text-brand-muted mt-0.5 font-[500]">Uploaded on {new Date(tutor.cvUploadedAt).toLocaleDateString("en-NP", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-xl bg-brand-blue-light text-brand-blue hover:bg-blue-100 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upload new */}
                <div
                  className="border-2 border-dashed border-brand-border rounded-2xl p-8 text-center hover:border-brand-blue hover:bg-brand-blue-light/30 transition-all cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) { setCvFile(file); setCvUploaded(false); }
                  }}
                >
                  <div className="w-14 h-14 bg-brand-blue-light rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-7 h-7 text-brand-blue" />
                  </div>
                  <p className="font-[800] text-brand-navy text-sm mb-1">
                    {cvFile ? cvFile.name : "Drag & drop your CV here"}
                  </p>
                  <p className="text-xs text-brand-muted mb-4 font-[500]">
                    {cvFile ? `${(cvFile.size / 1024).toFixed(1)} KB · PDF, DOC or DOCX` : "Supports PDF, DOC, DOCX · Max 5MB"}
                  </p>
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCvChange} />
                  <Button
                    variant="outline"
                    className="rounded-full border-brand-border text-brand-navy text-xs font-[800] h-8 pointer-events-none"
                  >
                    Browse Files
                  </Button>
                </div>

                {cvFile && !cvUploaded && (
                  <Button
                    onClick={handleCvUpload}
                    disabled={cvUploading}
                    className="w-full mt-4 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full font-[800] shadow-sm shadow-blue-200 gap-2"
                  >
                    {cvUploading ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload className="w-4 h-4" /> Upload New CV</>
                    )}
                  </Button>
                )}

                {cvUploaded && (
                  <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-[800] text-emerald-800">CV uploaded successfully!</p>
                      <p className="text-xs text-emerald-600 font-[500]">Your profile and school applications will use this CV.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-brand-blue-light/30 border border-brand-blue/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                  <p className="text-sm font-[800] text-brand-navy">CV Tips for School Faculty Positions</p>
                </div>
                <ul className="space-y-2">
                  {[
                    "Include your academic degree, university, and year of graduation clearly.",
                    "Highlight school teaching experience, grade levels taught, and subject specialization.",
                    "Mention any workshops, SEE exam paper checking experience, or IB/CBSE trainings.",
                    "Keep contact details and references updated.",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-brand-text font-[500]">
                      <span className="w-4 h-4 bg-brand-blue text-white rounded-full text-[10px] font-[800] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ─── SETTINGS ────────────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="max-w-2xl mx-auto space-y-5">
              {[
                {
                  title: "Notification Preferences",
                  items: [
                    { label: "Email alerts for new school vacancies in my subjects", key: "emailSchoolJobs", checked: true },
                    { label: "SMS alerts when shortlisted by a school", key: "smsShortlist", checked: true },
                    { label: "Weekly job & vacancy digest", key: "weeklyDigest", checked: false },
                  ],
                },
                {
                  title: "Privacy & Visibility",
                  items: [
                    { label: "Show profile to registered schools publicly", key: "publicProfile", checked: true },
                    { label: "Allow schools to send direct interview invites", key: "schoolInvites", checked: true },
                    { label: "Show phone number on verified school applications", key: "showPhone", checked: true },
                  ],
                },
              ].map((section) => (
                <div key={section.title} className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs">
                  <h3 className="text-sm font-[800] text-brand-navy mb-4">{section.title}</h3>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <label key={item.key} className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm text-brand-text font-[500] group-hover:text-brand-navy">{item.label}</span>
                        <div className={`w-11 h-6 rounded-full transition-colors relative ${item.checked ? "bg-brand-blue" : "bg-slate-200"}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-xs transition-all ${item.checked ? "left-6" : "left-1"}`} />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs">
                <h3 className="text-sm font-[800] text-brand-navy mb-4">Account Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-brand-navy font-[700] hover:text-brand-blue py-2 border-b border-brand-border transition-colors">
                    Change Password →
                  </button>
                  <button className="w-full text-left text-sm text-brand-navy font-[700] hover:text-brand-blue py-2 border-b border-brand-border transition-colors">
                    Download My Data →
                  </button>
                  <button className="w-full text-left text-sm text-rose-500 font-[700] hover:text-rose-700 py-2 transition-colors">
                    Delete Account →
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Tuition Apply Confirmation Modal ────────────────────────────── */}
      {applyingJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            {applySuccess ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-[900] text-brand-navy mb-1">Application Sent!</h3>
                <p className="text-sm text-brand-muted font-[500]">You will be notified when the client reviews your application.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-xs font-[800] text-brand-blue mb-1">Confirm Application</p>
                    <h3 className="text-lg font-[900] text-brand-navy">{applyingJob.title}</h3>
                    <p className="text-sm text-brand-muted font-[500]">{applyingJob.location} · {applyingJob.salary}</p>
                  </div>
                  <button onClick={() => setApplyingJob(null)} className="p-1.5 rounded-lg hover:bg-brand-bg text-brand-muted">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-brand-blue-light/40 rounded-xl p-4 mb-5 border border-brand-blue/20">
                  <p className="text-xs font-[800] text-brand-navy mb-2">Your CV will be attached:</p>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-[800] text-brand-navy">{tutor.cvFileName}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setApplyingJob(null)} className="flex-1 rounded-full border-brand-border text-brand-navy font-[800] text-sm">
                    Cancel
                  </Button>
                  <Button onClick={confirmApplyJob} className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full font-[800] text-sm shadow-md shadow-blue-200">
                    Apply Now
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── School Vacancy Apply Modal ───────────────────────────────────── */}
      {applyingSchoolVacancy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-brand-border animate-in fade-in zoom-in-95">
            {applySuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-[900] text-brand-navy mb-1">Application Submitted to School!</h3>
                <p className="text-sm text-brand-text mb-2 font-[500]">
                  Your application for <span className="font-[800] text-brand-teal-dark">{applyingSchoolVacancy.jobTitle}</span> has been transmitted to <span className="font-[800] text-brand-navy">{applyingSchoolVacancy.schoolName}</span>.
                </p>
                <p className="text-xs text-brand-muted font-[500]">The school administration will review your CV and contact you for an interview.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-brand-border">
                  <div className="flex items-center gap-3">
                    <img
                      src={applyingSchoolVacancy.schoolLogo}
                      alt={applyingSchoolVacancy.schoolName}
                      className="w-12 h-12 rounded-xl object-cover border border-brand-border"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-brand-teal-dark" />
                        <span className="text-xs font-[800] text-brand-teal-dark">{applyingSchoolVacancy.schoolName}</span>
                      </div>
                      <h3 className="text-base font-[900] text-brand-navy">{applyingSchoolVacancy.jobTitle}</h3>
                      <p className="text-xs text-brand-muted font-[500]">{applyingSchoolVacancy.schoolLocation} · {applyingSchoolVacancy.salary}</p>
                    </div>
                  </div>
                  <button onClick={() => setApplyingSchoolVacancy(null)} className="p-1.5 rounded-lg hover:bg-brand-bg text-brand-muted">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-brand-teal-light/40 border border-brand-teal/20 rounded-2xl p-4">
                    <p className="text-xs font-[800] text-brand-teal-dark uppercase tracking-wider mb-2">Application Details</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-brand-muted font-[500]">Level/Grade:</span>
                        <p className="font-[800] text-brand-navy">{applyingSchoolVacancy.level}</p>
                      </div>
                      <div>
                        <span className="text-brand-muted font-[500]">Shift:</span>
                        <p className="font-[800] text-brand-navy">{applyingSchoolVacancy.employmentType}</p>
                      </div>
                      <div>
                        <span className="text-brand-muted font-[500]">Deadline:</span>
                        <p className="font-[800] text-brand-navy">{applyingSchoolVacancy.deadline}</p>
                      </div>
                      <div>
                        <span className="text-brand-muted font-[500]">Vacancies:</span>
                        <p className="font-[800] text-brand-navy">{applyingSchoolVacancy.vacanciesCount} Seats</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-brand-bg rounded-2xl p-4 border border-brand-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-[800] text-brand-navy">Attached Resume / CV</p>
                      <span className="text-[10px] font-[800] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Ready</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-brand-border">
                      <FileText className="w-6 h-6 text-rose-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-[800] text-brand-navy truncate">{tutor.cvFileName}</p>
                        <p className="text-[10px] text-brand-muted font-[500]">Uploaded {tutor.cvUploadedAt}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setApplyingSchoolVacancy(null)}
                    className="flex-1 rounded-full border-brand-border text-brand-navy font-[800] text-sm h-11"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmApplySchool}
                    className="flex-1 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full font-[800] text-sm h-11 shadow-lg shadow-teal-200"
                  >
                    Send Application to School
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Sign Out Confirmation Modal ─────────────────────────────────────── */}
      {showSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-brand-border shadow-2xl space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                <LogOut className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-[900] text-brand-navy">Sign Out</h3>
                <p className="text-xs text-brand-muted font-[500] mt-0.5">Are you sure you want to log out of your account?</p>
              </div>
            </div>

            <div className="bg-brand-bg/60 rounded-2xl p-4 border border-brand-border/60 text-xs text-brand-navy font-[600]">
              You will need to sign in again to manage your dashboard and view updates.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="px-5 py-2.5 rounded-full border border-brand-border text-brand-navy font-[700] text-xs hover:bg-brand-bg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-[800] text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
