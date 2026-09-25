"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Users,
  Briefcase,
  FileText,
  Bell,
  Settings,
  LogOut,
  Edit3,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Star,
  MapPin,
  ChevronRight,
  Eye,
  Phone,
  Mail,
  Globe,
  GraduationCap,
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Camera,
  Save,
  RefreshCw,
  Search,
  Calendar,
  Award,
  MessageSquare,
  Send,
  UserCheck,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────────────────────
   TYPES & DATA MODELS
───────────────────────────────────────────── */

export interface InstitutionVacancy {
  id: string;
  jobTitle: string;
  level: string;
  subjects: string[];
  salary: string;
  employmentType: "Full-Time" | "Part-Time" | "Contract" | "Morning Shift";
  qualificationRequired: string;
  experienceRequired: string;
  deadline: string;
  postedDate: string;
  status: "active" | "under_review" | "closed";
  applicationsCount: number;
  description: string;
}

export interface TutorProfile {
  id: string;
  name: string;
  photo: string;
  qualification: string;
  experience: number;
  subjects: string[];
  classes: string[];
  location: string;
  teachingMode: "home" | "online" | "both";
  rating: number;
  reviewCount: number;
  rate: string;
  isVerified: boolean;
}

export interface FacultyRequest {
  id: string;
  tutorName: string;
  subject: string;
  requestedDate: string;
  status: "Pending" | "In Contact" | "Shortlisted" | "Completed";
  notes: string;
}

export interface SchoolReview {
  id: string;
  schoolName: string;
  logo: string;
  reviewerName: string;
  reviewerDesignation: string;
  rating: number;
  facultyQuality: number;
  placementSpeed: number;
  platformUsability: number;
  title: string;
  feedback: string;
  date: string;
  isMyReview?: boolean;
}

const MOCK_PARTNER_REVIEWS: SchoolReview[] = [
  {
    id: "rev-01",
    schoolName: "Little Angels' High School & College",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80",
    reviewerName: "Dr. Ram Krishna Sharma",
    reviewerDesignation: "Principal",
    rating: 5,
    facultyQuality: 5,
    placementSpeed: 5,
    platformUsability: 5,
    title: "Outstanding faculty placement service & pre-vetted teachers",
    feedback: "Mero Tutor has significantly simplified our academic hiring process. We recruited top-tier Secondary Math and +2 Physics lecturers within 48 hours. Highly recommended for schools and colleges across Nepal!",
    date: "2024-09-15",
    isMyReview: true,
  },
  {
    id: "rev-02",
    schoolName: "St. Xavier's School",
    logo: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=150&auto=format&fit=crop&q=80",
    reviewerName: "Fr. Augustine Thomas",
    reviewerDesignation: "Academic Coordinator",
    rating: 5,
    facultyQuality: 5,
    placementSpeed: 5,
    platformUsability: 4,
    title: "Reliable platform for subject specialist teachers",
    feedback: "Finding qualified A-Level and +2 Science teachers used to take weeks. With Mero Tutor, candidate verification and profile screening are seamless. Great support from their placement desk.",
    date: "2024-09-02",
    isMyReview: false,
  },
  {
    id: "rev-03",
    schoolName: "Kathmandu Model College (KMC)",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80",
    reviewerName: "Er. Surendra Shrestha",
    reviewerDesignation: "Director of Studies",
    rating: 5,
    facultyQuality: 5,
    placementSpeed: 4,
    platformUsability: 5,
    title: "Seamless recruitment for computer & entrance faculties",
    feedback: "We hired C Programming and Entrance Preparation instructors through Mero Tutor. The platform is user-friendly and responsive.",
    date: "2024-08-28",
    isMyReview: false,
  },
];

const MOCK_SCHOOL_PROFILE = {
  name: "Little Angels' High School & College",
  category: "Secondary & +2 School",
  logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80",
  contactPerson: "Dr. Ram Krishna Sharma",
  designation: "Principal",
  email: "info@las.edu.np",
  phone: "+977 01-5250123 / 98510XXXXX",
  location: "Hattiban, Lalitpur, Nepal",
  website: "https://las.edu.np",
  estYear: 1981,
  studentCount: 3500,
  bio: "Premier educational institution committed to academic excellence, holistic development, and innovative learning from Kindergarten to Grade 12 (+2 Science and Management).",
  isVerified: true,
};

const MOCK_INSTITUTION_VACANCIES: InstitutionVacancy[] = [
  {
    id: "vac-101",
    jobTitle: "Secondary Mathematics Teacher (Grade 9–10)",
    level: "Class 9 & 10 (SEE)",
    subjects: ["Mathematics", "Optional Math"],
    salary: "NPR 38,000 – 48,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "B.Sc. / M.Sc. Mathematics or B.Ed.",
    experienceRequired: "2+ years teaching SEE curriculum",
    deadline: "2026-10-15",
    postedDate: "2024-09-20",
    status: "active",
    applicationsCount: 7,
    description: "Seeking a dynamic secondary math teacher responsible for Grade 9 & 10 SEE preparation. Must have excellent classroom management and problem-solving pedagogy.",
  },
  {
    id: "vac-102",
    jobTitle: "+2 Physics Lecturer (Morning Shift)",
    level: "+2 Science (Class 11–12)",
    subjects: ["Physics"],
    salary: "NPR 45,000 – 58,000 / month",
    employmentType: "Morning Shift",
    qualificationRequired: "M.Sc. in Physics",
    experienceRequired: "3+ years teaching NEB +2 Physics",
    deadline: "2026-10-20",
    postedDate: "2024-09-18",
    status: "active",
    applicationsCount: 12,
    description: "Required experienced Physics lecturer for morning shift (6:15 AM - 11:30 AM). Conducting numerical problem sessions & entrance prep assistance.",
  },
  {
    id: "vac-104",
    jobTitle: "A-Level Physics & Mechanics Lecturer",
    level: "A-Level (Cambridge GCE)",
    subjects: ["Physics 9702", "Mechanics"],
    salary: "NPR 50,000 – 65,000 / month",
    employmentType: "Part-Time",
    qualificationRequired: "M.Sc. Physics / Prior Cambridge A-Level experience",
    experienceRequired: "2+ years in CIE A-Level curriculum",
    deadline: "2026-10-25",
    postedDate: "2024-09-22",
    status: "active",
    applicationsCount: 5,
    description: "Conducting lab practicals & paper solving for Cambridge AS & A Level Physics students.",
  },
  {
    id: "vac-105",
    jobTitle: "IB Diploma Mathematics Facilitator (HL/SL)",
    level: "IB Level (International Baccalaureate)",
    subjects: ["IB Math Analysis & Approaches"],
    salary: "NPR 55,000 – 72,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "M.Sc. / M.Ed. with IB Educator Workshop certification",
    experienceRequired: "3+ years IB World School experience",
    deadline: "2026-11-01",
    postedDate: "2024-09-24",
    status: "active",
    applicationsCount: 3,
    description: "Guidance on IB Internal Assessments (IA), extended essays, and HL/SL higher level mathematics syllabus.",
  },
  {
    id: "vac-106",
    jobTitle: "Medical Entrance Chemistry & Biology Instructor",
    level: "Entrance Preparation (IOE/IOM/CEE)",
    subjects: ["Organic Chemistry", "Botany / Zoology"],
    salary: "NPR 60,000 – 80,000 / month",
    employmentType: "Morning Shift",
    qualificationRequired: "MBBS / M.Sc. Chemistry / Entrance Specialist",
    experienceRequired: "4+ years entrance coaching experience",
    deadline: "2026-10-18",
    postedDate: "2024-09-23",
    status: "active",
    applicationsCount: 9,
    description: "Preparing high-scoring students for CEE (Common Entrance Examination) medical and engineering seats.",
  },
  {
    id: "vac-103",
    jobTitle: "Primary English & Creative Writing Teacher",
    level: "Primary Level (Grade 3–5)",
    subjects: ["English", "Creative Writing"],
    salary: "NPR 32,000 – 40,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "B.A. Major English or B.Ed.",
    experienceRequired: "1-2 years primary teaching",
    deadline: "2026-09-30",
    postedDate: "2024-09-10",
    status: "closed",
    applicationsCount: 15,
    description: "Responsible for English grammar, phonics, and literature for primary students.",
  },
];

const MOCK_TUTORS_NETWORK: TutorProfile[] = [
  {
    id: "tut-1",
    name: "Anish Shrestha",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=anish&backgroundColor=b6e3f4",
    qualification: "BScIT, Tribhuvan University",
    experience: 4,
    subjects: ["Mathematics", "Physics", "Computer"],
    classes: ["Class 9", "Class 10", "+2 Science"],
    location: "Kathmandu",
    teachingMode: "both",
    rating: 4.8,
    reviewCount: 23,
    rate: "NPR 10,000 – 15,000",
    isVerified: true,
  },
  {
    id: "tut-2",
    name: "Suman Adhikari",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=suman&backgroundColor=c0aede",
    qualification: "M.Sc. Physics, Kirtipur TU",
    experience: 6,
    subjects: ["Physics", "Mathematics"],
    classes: ["Class 11", "Class 12", "Entrance Prep"],
    location: "Lalitpur",
    teachingMode: "home",
    rating: 4.9,
    reviewCount: 31,
    rate: "NPR 12,000 – 18,000",
    isVerified: true,
  },
  {
    id: "tut-3",
    name: "Pooja Gurung",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=pooja&backgroundColor=ffdfbf",
    qualification: "M.A. English, Gold Medalist",
    experience: 5,
    subjects: ["English", "Social Studies"],
    classes: ["Class 6", "Class 7", "Class 8", "SEE"],
    location: "Bhaktapur",
    teachingMode: "both",
    rating: 4.7,
    reviewCount: 19,
    rate: "NPR 9,000 – 14,000",
    isVerified: true,
  },
  {
    id: "tut-4",
    name: "Rohan Pokharel",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=rohan&backgroundColor=d1d4f9",
    qualification: "B.E. Computer Engineering",
    experience: 3,
    subjects: ["Computer", "QBASIC / C", "Math"],
    classes: ["Class 8", "Class 9", "Class 10", "+2"],
    location: "Kathmandu",
    teachingMode: "online",
    rating: 4.6,
    reviewCount: 14,
    rate: "NPR 8,000 – 12,000",
    isVerified: true,
  },
  {
    id: "tut-5",
    name: "Prashant Thapa",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=prashant&backgroundColor=b6e3f4",
    qualification: "M.Sc. Chemistry, Pulchowk Campus",
    experience: 7,
    subjects: ["Chemistry", "Science"],
    classes: ["Class 10", "+2 Science", "MBBS Prep"],
    location: "Lalitpur",
    teachingMode: "both",
    rating: 4.95,
    reviewCount: 42,
    rate: "NPR 15,000 – 22,000",
    isVerified: true,
  },
];

const MOCK_TEACHER_REQUESTS: FacultyRequest[] = [
  {
    id: "req-301",
    tutorName: "Suman Adhikari",
    subject: "Physics (+2 Science)",
    requestedDate: "2024-09-21",
    status: "In Contact",
    notes: "Request for morning shift lecturer position evaluation.",
  },
  {
    id: "req-302",
    tutorName: "Anish Shrestha",
    subject: "SEE Mathematics",
    requestedDate: "2024-09-19",
    status: "Shortlisted",
    notes: "Demo class scheduled for next Tuesday.",
  },
];

type Tab = "overview" | "vacancies" | "tutors" | "requests" | "reviews" | "profile" | "settings";

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
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

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function SchoolDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as Tab | null;
      const validTabs: Tab[] = ["overview", "vacancies", "tutors", "requests", "reviews", "profile", "settings"];
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

  // Institution Profile State
  const [schoolProfile, setSchoolProfile] = useState(MOCK_SCHOOL_PROFILE);
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...MOCK_SCHOOL_PROFILE });

  // Vacancies State
  const [vacancies, setVacancies] = useState<InstitutionVacancy[]>(MOCK_INSTITUTION_VACANCIES);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingVacancyId, setEditingVacancyId] = useState<string | null>(null);

  // New / Edit Vacancy Form
  const [newVacancy, setNewVacancy] = useState<{
    jobTitle: string;
    level: string;
    customLevel: string;
    subjects: string;
    salary: string;
    employmentType: "Full-Time" | "Part-Time" | "Contract" | "Morning Shift";
    qualificationRequired: string;
    experienceRequired: string;
    deadline: string;
    description: string;
  }>({
    jobTitle: "",
    level: "Class 9 & 10 (SEE)",
    customLevel: "",
    subjects: "Mathematics, Science",
    salary: "NPR 35,000 – 45,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "B.Sc. / B.Ed. in related subject",
    experienceRequired: "Min 2 years teaching experience",
    deadline: "2026-11-15",
    description: "",
  });

  const handleOpenCreateVacancy = () => {
    setEditingVacancyId(null);
    setNewVacancy({
      jobTitle: "",
      level: "Class 9 & 10 (SEE)",
      customLevel: "",
      subjects: "Mathematics, Science",
      salary: "NPR 35,000 – 45,000 / month",
      employmentType: "Full-Time",
      qualificationRequired: "B.Sc. / B.Ed. in related subject",
      experienceRequired: "Min 2 years teaching experience",
      deadline: "2026-11-15",
      description: "",
    });
    setShowPostModal(true);
  };

  const handleOpenEditVacancy = (vac: InstitutionVacancy) => {
    const standardLevels = ["Class 9 & 10 (SEE)", "+2 Science", "+2 Management", "Lower Secondary (Class 6–8)", "Primary (Class 1–5)", "A Level / IB", "Bachelor / College Lecturer"];
    const isCustom = !standardLevels.includes(vac.level);

    setNewVacancy({
      jobTitle: vac.jobTitle,
      level: isCustom ? "Others (Custom Level)" : vac.level,
      customLevel: isCustom ? vac.level : "",
      subjects: vac.subjects.join(", "),
      salary: vac.salary,
      employmentType: vac.employmentType,
      qualificationRequired: vac.qualificationRequired,
      experienceRequired: vac.experienceRequired,
      deadline: vac.deadline,
      description: vac.description || "",
    });
    setEditingVacancyId(vac.id);
    setShowPostModal(true);
  };

  const handleToggleVacancyStatus = (id: string) => {
    setVacancies((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: v.status === "active" ? "closed" : "active" } : v))
    );
  };

  const handleDeleteVacancy = (id: string) => {
    setVacancies((prev) => prev.filter((v) => v.id !== id));
  };

  // Tutors Network Search & Filter
  const [tutorSearch, setTutorSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [requestingTutor, setRequestingTutor] = useState<TutorProfile | null>(null);
  const [requestNotes, setRequestNotes] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Teacher Requests State
  const [teacherRequests, setTeacherRequests] = useState<FacultyRequest[]>(MOCK_TEACHER_REQUESTS);

  // Reviews State
  const [reviews, setReviews] = useState<SchoolReview[]>(MOCK_PARTNER_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const myReview = reviews.find((r) => r.isMyReview);

  const [reviewForm, setReviewForm] = useState({
    rating: myReview ? myReview.rating : 5,
    facultyQuality: myReview ? myReview.facultyQuality : 5,
    placementSpeed: myReview ? myReview.placementSpeed : 5,
    platformUsability: myReview ? myReview.platformUsability : 5,
    reviewerName: schoolProfile.contactPerson || "Dr. Ram Krishna Sharma",
    reviewerDesignation: schoolProfile.designation || "Principal",
    title: myReview ? myReview.title : "Outstanding faculty placement service & pre-vetted teachers",
    feedback: myReview
      ? myReview.feedback
      : "Mero Tutor has significantly simplified our academic hiring process. We recruited top-tier Secondary Math and +2 Physics lecturers quickly.",
  });

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.title || !reviewForm.feedback) return;

    const newRev: SchoolReview = {
      id: myReview ? myReview.id : `rev-${Date.now()}`,
      schoolName: schoolProfile.name,
      logo: schoolProfile.logo,
      reviewerName: reviewForm.reviewerName,
      reviewerDesignation: reviewForm.reviewerDesignation,
      rating: reviewForm.rating,
      facultyQuality: reviewForm.facultyQuality,
      placementSpeed: reviewForm.placementSpeed,
      platformUsability: reviewForm.platformUsability,
      title: reviewForm.title,
      feedback: reviewForm.feedback,
      date: new Date().toISOString().split("T")[0],
      isMyReview: true,
    };

    setReviews((prev) => [newRev, ...prev.filter((r) => r.id !== newRev.id)]);
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setShowReviewModal(false);
    }, 1600);
  };

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: "7 new applicants applied for Secondary Math Teacher vacancy.", time: "2 hrs ago", read: false },
    { id: 2, text: "Mero Tutor coordinator assigned candidate profile for Physics Lecturer.", time: "5 hrs ago", read: false },
    { id: 3, text: "School profile verification status: 100% Verified ✓", time: "Yesterday", read: true },
  ]);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSaveProfile = () => {
    setSchoolProfile({ ...profileForm });
    setEditProfileMode(false);
  };

  const handleCreateVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVacancy.jobTitle) return;

    const finalLevel =
      newVacancy.level === "Others (Custom Level)"
        ? newVacancy.customLevel.trim() || "Custom Level"
        : newVacancy.level;

    const subjectList = newVacancy.subjects.split(",").map((s) => s.trim()).filter(Boolean);

    if (editingVacancyId) {
      setVacancies((prev) =>
        prev.map((vac) =>
          vac.id === editingVacancyId
            ? {
                ...vac,
                jobTitle: newVacancy.jobTitle,
                level: finalLevel,
                subjects: subjectList.length > 0 ? subjectList : ["General"],
                salary: newVacancy.salary,
                employmentType: newVacancy.employmentType,
                qualificationRequired: newVacancy.qualificationRequired,
                experienceRequired: newVacancy.experienceRequired,
                deadline: newVacancy.deadline,
                description: newVacancy.description || "Looking for qualified faculty to join our institution academic team.",
              }
            : vac
        )
      );
    } else {
      const created: InstitutionVacancy = {
        id: `vac-${Date.now()}`,
        jobTitle: newVacancy.jobTitle,
        level: finalLevel,
        subjects: subjectList.length > 0 ? subjectList : ["General"],
        salary: newVacancy.salary,
        employmentType: newVacancy.employmentType,
        qualificationRequired: newVacancy.qualificationRequired,
        experienceRequired: newVacancy.experienceRequired,
        deadline: newVacancy.deadline,
        postedDate: new Date().toISOString().split("T")[0],
        status: "active",
        applicationsCount: 0,
        description: newVacancy.description || "Looking for qualified faculty to join our institution academic team.",
      };
      setVacancies((prev) => [created, ...prev]);
    }

    setEditingVacancyId(null);
    setShowPostModal(false);
    setNewVacancy({
      jobTitle: "",
      level: "Class 9 & 10 (SEE)",
      customLevel: "",
      subjects: "Mathematics, Science",
      salary: "NPR 35,000 – 45,000 / month",
      employmentType: "Full-Time",
      qualificationRequired: "B.Sc. / B.Ed. in related subject",
      experienceRequired: "Min 2 years teaching experience",
      deadline: "2026-11-15",
      description: "",
    });
  };

  const handleSendTeacherRequest = async () => {
    if (!requestingTutor) return;

    await new Promise((r) => setTimeout(r, 600));

    const newReq: FacultyRequest = {
      id: `req-${Date.now()}`,
      tutorName: requestingTutor.name,
      subject: requestingTutor.subjects.slice(0, 2).join(", "),
      requestedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      notes: requestNotes || "Faculty placement inquiry submitted through school dashboard.",
    };

    setTeacherRequests((prev) => [newReq, ...prev]);
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setRequestingTutor(null);
      setRequestNotes("");
    }, 1800);
  };

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const filteredTutors = MOCK_TUTORS_NETWORK.filter((t) => {
    const q = tutorSearch.toLowerCase();
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.qualification.toLowerCase().includes(q) ||
      t.subjects.join(" ").toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q);

    const matchesSubject = selectedSubject === "All" || t.subjects.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  const NAV_ITEMS: { id: Tab; label: string; icon: React.ElementType; badge?: number; highlight?: boolean }[] = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "vacancies", label: "Post & Manage Vacancies", icon: Briefcase, badge: vacancies.filter((v) => v.status === "active").length, highlight: true },
    { id: "tutors", label: "Browse Tutors & Teachers", icon: Users, badge: MOCK_TUTORS_NETWORK.length },
    { id: "requests", label: "My Teacher Requests", icon: UserCheck, badge: teacherRequests.length },
    { id: "reviews", label: "Review Mero Tutor", icon: Star, badge: reviews.length },
    { id: "profile", label: "Institution Profile", icon: Building2 },
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
          <p className="text-[10px] text-brand-teal-dark font-[800] uppercase tracking-wider mt-1.5 flex items-center gap-1">
            <Building className="w-3 h-3 text-brand-teal-dark" /> School &amp; College Portal
          </p>
        </div>

        {/* Institution mini-profile */}
        <div className="p-4 border-b border-brand-border bg-brand-bg/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-brand-teal-light border-2 border-brand-teal/30">
                <img src={schoolProfile.logo} alt={schoolProfile.name} className="w-full h-full object-cover" />
              </div>
              {schoolProfile.isVerified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-[800] text-brand-navy truncate">{schoolProfile.name}</p>
              <p className="text-[10px] text-brand-muted font-[600] truncate">{schoolProfile.category}</p>
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
            <div className="w-9 h-9 rounded-full overflow-hidden bg-brand-teal-light border-2 border-brand-teal/30 cursor-pointer" onClick={() => setActiveTab("profile")}>
              <img src={schoolProfile.logo} alt={schoolProfile.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">

          {/* ─── OVERVIEW ─────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="max-w-5xl mx-auto space-y-6">

              {/* Welcome banner with light mint & teal gradient */}
              <div className="relative overflow-hidden bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 border border-brand-teal/30 rounded-3xl p-6 sm:p-8 text-brand-navy shadow-xs">
                <div className="absolute top-0 right-0 w-72 h-72 bg-brand-teal-light/60 rounded-full -translate-y-20 translate-x-20 blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 bg-brand-teal-light text-brand-teal-dark border border-brand-teal/30 px-3 py-1 rounded-full text-xs font-[800] mb-3">
                    <Building2 className="w-3.5 h-3.5" /> Institutional Account Active
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-[900] tracking-tight mb-1 text-brand-navy">{schoolProfile.name}</h2>
                  <p className="text-slate-600 text-sm font-[500] mb-5 max-w-xl">
                    {schoolProfile.category} · {schoolProfile.location} · Contact: {schoolProfile.contactPerson}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={handleOpenCreateVacancy}
                      className="bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-[800] px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Post New Vacancy
                    </button>
                    <button
                      onClick={() => setActiveTab("tutors")}
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-[800] px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" />
                      Browse Tutors ({MOCK_TUTORS_NETWORK.length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Active Vacancies" value={vacancies.filter((v) => v.status === "active").length} sub="Open for applicants" color="text-brand-teal-dark" />
                <StatCard label="Total Applicants" value={vacancies.reduce((acc, v) => acc + v.applicationsCount, 0)} sub="Applicants received" color="text-brand-blue" />
                <StatCard label="Teacher Requests" value={teacherRequests.length} sub="Submitted to Mero Tutor" color="text-emerald-600" />
                <StatCard label="Network Tutors" value={`${MOCK_TUTORS_NETWORK.length}+`} sub="Available in Nepal" color="text-brand-yellow-dark" />
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Plus, label: "Post a Vacancy", desc: "Create a faculty job post", color: "text-brand-teal-dark bg-brand-teal-light", action: handleOpenCreateVacancy },
                  { icon: Users, label: "Browse Tutors", desc: "View tutor & teacher profiles", color: "text-brand-blue bg-brand-blue-light", action: () => setActiveTab("tutors") },
                  { icon: Star, label: "Review Mero Tutor", desc: "Share feedback & 5-star rating", color: "text-amber-600 bg-amber-50", action: () => setShowReviewModal(true) },
                  { icon: Building2, label: "Update Profile", desc: "Keep school details current", color: "text-purple-600 bg-purple-50", action: () => setActiveTab("profile") },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      onClick={action.action}
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

              {/* Direct Support & WhatsApp Hiring Callout */}
              <div className="bg-gradient-to-br from-brand-teal-light/90 via-white to-emerald-50 rounded-3xl p-6 text-brand-navy shadow-xs border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-[800] mb-2">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> Mero Tutor Faculty Placement Desk
                  </div>
                  <h3 className="text-lg font-[900] text-brand-navy mb-1">Need Urgent Subject Teachers or Guest Lecturers?</h3>
                  <p className="text-xs text-slate-600 font-[500] max-w-xl">
                    Connect directly with our institutional placement coordinator via WhatsApp or phone. We curate pre-screened faculty profiles tailored to your curriculum.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  <a
                    href="https://wa.me/9779762511114?text=Hi%20Mero%20Tutor,%20we%20are%20an%20educational%20institution%20looking%20to%20hire%20subject%20teachers."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-[800] text-xs px-4 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" /> WhatsApp Us Now
                  </a>
                  <a
                    href="tel:+9779762511114"
                    className="bg-white border border-brand-border text-brand-navy font-[800] text-xs px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5 hover:bg-brand-bg"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-blue" /> Call Placement Desk
                  </a>
                </div>
              </div>

              {/* Vacancies Overview Table */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-[900] text-brand-navy">Posted Vacancies</h2>
                  <button onClick={() => setActiveTab("vacancies")} className="text-xs text-brand-teal-dark font-[800] hover:underline">
                    Manage all ({vacancies.length}) →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vacancies.slice(0, 4).map((vac) => (
                    <div key={vac.id} className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[10px] font-[800] px-2.5 py-0.5 rounded-full ${
                            vac.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {vac.status === "active" ? "● Active Vacancy" : "Closed"}
                          </span>
                          <span className="text-[10px] text-brand-muted font-[500]">{vac.postedDate}</span>
                        </div>
                        <h4 className="font-[800] text-brand-navy text-sm mb-1">{vac.jobTitle}</h4>
                        <p className="text-xs text-brand-teal-dark font-[700] mb-2">{vac.level}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {vac.subjects.map((s) => (
                            <span key={s} className="text-xs bg-brand-bg text-brand-navy font-[600] border border-brand-border px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-brand-border/60">
                        <span className="text-xs font-[800] text-brand-navy">{vac.salary}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-[800] text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded-full">
                            {vac.applicationsCount} Applicants
                          </span>
                          <button
                            onClick={() => handleOpenEditVacancy(vac)}
                            className="text-xs font-[800] text-brand-teal-dark hover:text-brand-navy flex items-center gap-1 bg-brand-teal-light/50 border border-brand-teal/20 px-2.5 py-1 rounded-full transition-colors"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── POST & MANAGE VACANCIES TAB ──────────────────────────── */}
          {activeTab === "vacancies" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-[900] text-brand-navy">Post &amp; Manage Vacancies</h2>
                  <p className="text-sm text-brand-muted font-[500]">Create new faculty positions for your school, college, or institute</p>
                </div>
                <Button
                  onClick={handleOpenCreateVacancy}
                  className="bg-brand-teal hover:bg-brand-teal-dark text-white font-[800] rounded-full text-xs h-10 px-5 shadow-md shadow-teal-200 gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Create New Vacancy
                </Button>
              </div>

              {/* Vacancies List */}
              <div className="space-y-4">
                {vacancies.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-brand-border">
                    <Briefcase className="w-12 h-12 text-brand-muted mx-auto mb-3" />
                    <h3 className="font-[800] text-brand-navy text-lg">No vacancies posted yet</h3>
                    <p className="text-xs text-brand-muted mt-1 font-[500]">Click below to fill out the vacancy creation form.</p>
                    <Button onClick={handleOpenCreateVacancy} className="mt-4 bg-brand-teal text-white rounded-full text-xs font-[800]">
                      + Create First Vacancy
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {vacancies.map((vac) => (
                      <div key={vac.id} className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[10px] font-[800] px-2.5 py-0.5 rounded-full ${
                              vac.status === "active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-100 text-slate-600"
                            }`}>
                              {vac.status === "active" ? "● Active Vacancy" : "Closed"}
                            </span>
                            <span className="text-xs text-brand-muted font-[500]">Posted {vac.postedDate}</span>
                          </div>

                          <h3 className="font-[900] text-brand-navy text-base mb-1">{vac.jobTitle}</h3>
                          <p className="text-xs font-[700] text-brand-teal-dark mb-2">{vac.level} · {vac.employmentType}</p>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {vac.subjects.map((s) => (
                              <span key={s} className="text-xs bg-brand-bg text-brand-navy font-[600] border border-brand-border px-2.5 py-0.5 rounded-full">{s}</span>
                            ))}
                          </div>

                          <p className="text-xs text-brand-text line-clamp-2 mb-3 leading-relaxed font-[500]">{vac.description}</p>

                          <div className="bg-brand-bg rounded-xl p-3 text-xs text-brand-text mb-3 space-y-1 border border-brand-border">
                            <p className="font-[600] text-brand-navy truncate">Req: {vac.qualificationRequired}</p>
                            <p className="font-[500] truncate">Exp: {vac.experienceRequired}</p>
                          </div>
                        </div>

                        <div>
                          <Separator className="my-3" />
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="text-[10px] text-brand-muted font-[500] uppercase tracking-wide">Salary Offered</p>
                              <p className="font-[900] text-brand-navy text-xs sm:text-sm">{vac.salary}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-xs font-[800] text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded-full">
                                {vac.applicationsCount} Applicants
                              </span>
                              <button
                                onClick={() => handleOpenEditVacancy(vac)}
                                className="inline-flex items-center gap-1 text-xs font-[800] bg-brand-teal-light hover:bg-brand-teal/20 text-brand-teal-dark px-3 py-1.5 rounded-full transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" /> Edit
                              </button>
                              <button
                                onClick={() => handleToggleVacancyStatus(vac.id)}
                                className={`text-xs font-[800] px-3 py-1.5 rounded-full transition-colors ${
                                  vac.status === "active"
                                    ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                                    : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                                }`}
                              >
                                {vac.status === "active" ? "Close" : "Reopen"}
                              </button>
                              <button
                                onClick={() => handleDeleteVacancy(vac.id)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors"
                                title="Delete Vacancy"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── BROWSE TUTORS & TEACHERS TAB ─────────────────────────── */}
          {activeTab === "tutors" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 border border-brand-teal/30 text-brand-navy rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-brand-teal-light text-brand-teal-dark border border-brand-teal/30 px-3 py-1 rounded-full text-xs font-[800] mb-3">
                    <Users className="w-3.5 h-3.5" /> Verified Tutors Network
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-[900] tracking-tight text-brand-navy mb-2">
                    Browse Verified Teachers &amp; Tutors
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-[500]">
                    Inspect top educator profiles in Nepal. Submit teacher requests directly to Mero Tutor for school faculty placement.
                  </p>

                  {/* Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl border border-brand-border shadow-2xs">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <Input
                        placeholder="Search by name, qualification, subject, or location..."
                        value={tutorSearch}
                        onChange={(e) => setTutorSearch(e.target.value)}
                        className="pl-10 bg-brand-bg border-0 text-brand-navy placeholder:text-brand-muted text-sm h-10 rounded-xl focus:ring-2 focus:ring-brand-blue/30"
                      />
                    </div>
                    <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
                      {["All", "Physics", "Mathematics", "English", "Chemistry", "Computer"].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setSelectedSubject(sub)}
                          className={`text-xs font-[800] px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                            selectedSubject === sub
                              ? "bg-brand-blue text-white shadow-md"
                              : "bg-brand-bg text-brand-navy hover:bg-brand-blue-light"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tutor Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTutors.map((tutor) => (
                  <div key={tutor.id} className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-brand-blue-light border-2 border-brand-blue/30 flex-shrink-0">
                          <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-[900] text-brand-navy text-base truncate group-hover:text-brand-blue transition-colors">
                            {tutor.name}
                          </h4>
                          <p className="text-xs text-brand-muted font-[500] truncate">{tutor.qualification}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="flex items-center gap-1 text-xs font-[800] text-brand-yellow-dark">
                              <Star className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" /> {tutor.rating}
                            </span>
                            <span className="text-[10px] text-brand-muted font-[500]">({tutor.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex flex-wrap gap-1">
                          {tutor.subjects.map((s) => (
                            <span key={s} className="text-xs bg-brand-blue-light text-brand-blue font-[800] px-2.5 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {tutor.classes.map((c) => (
                            <span key={c} className="text-[11px] bg-brand-bg text-brand-navy font-[600] border border-brand-border px-2 py-0.5 rounded-md">{c}</span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-brand-bg rounded-xl p-3 text-xs text-brand-text space-y-1 mb-3 border border-brand-border">
                        <div className="flex items-center gap-1.5 font-[500]">
                          <MapPin className="w-3.5 h-3.5 text-brand-muted" /> Location: <span className="font-[700] text-brand-navy">{tutor.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-[500]">
                          <TrendingUp className="w-3.5 h-3.5 text-brand-muted" /> Experience: <span className="font-[700] text-brand-navy">{tutor.experience} years</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Separator className="my-3" />
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-[10px] text-brand-muted font-[500] uppercase">Expected Rate</p>
                          <p className="text-xs font-[900] text-brand-navy">{tutor.rate}</p>
                        </div>
                        <Button
                          onClick={() => setRequestingTutor(tutor)}
                          className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full text-xs font-[800] h-9 px-4 shadow-xs"
                        >
                          Request Teacher
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── TEACHER REQUESTS TRACKER TAB ───────────────────────── */}
          {activeTab === "requests" && (
            <div className="max-w-4xl mx-auto space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-[900] text-brand-navy">Faculty Placement Requests</h2>
                  <p className="text-sm text-brand-muted font-[500]">Teacher requests submitted to Mero Tutor placement coordinators</p>
                </div>
              </div>

              <div className="space-y-3">
                {teacherRequests.map((req) => (
                  <div key={req.id} className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-[800] text-brand-teal-dark bg-brand-teal-light px-2.5 py-0.5 rounded-full">
                          {req.subject}
                        </span>
                        <span className="text-xs text-brand-muted font-[500]">Requested {req.requestedDate}</span>
                      </div>
                      <h4 className="font-[900] text-brand-navy text-base mb-1">Candidate: {req.tutorName}</h4>
                      <p className="text-xs text-brand-text font-[500]">{req.notes}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-[800] px-3 py-1 rounded-full border bg-brand-blue-light text-brand-blue border-brand-blue/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {req.status}
                      </span>
                      <a
                        href="https://wa.me/9779762511114"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-[800] text-emerald-600 hover:text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" /> WhatsApp Support
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── REVIEW MERO TUTOR TAB ──────────────────────────────── */}
          {activeTab === "reviews" && (
            <div className="max-w-4xl mx-auto space-y-6">

              {/* Review Header Banner */}
              <div className="bg-gradient-to-br from-brand-teal-light/80 via-white to-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 text-brand-navy shadow-xs relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded-full text-xs font-[800] mb-3">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Institutional Partner Feedback
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-[900] tracking-tight text-brand-navy mb-2">Review Mero Tutor Platform</h2>
                    <p className="text-slate-600 text-sm font-[500] max-w-xl">
                      Share your institution&apos;s experience regarding faculty quality, placement speed, and platform support to help us continuously empower schools across Nepal.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                    <Button
                      onClick={() => {
                        setReviewForm({
                          rating: 5,
                          facultyQuality: 5,
                          placementSpeed: 5,
                          platformUsability: 5,
                          reviewerName: schoolProfile.contactPerson || "Dr. Ram Krishna Sharma",
                          reviewerDesignation: schoolProfile.designation || "Principal",
                          title: "",
                          feedback: "",
                        });
                        setShowReviewModal(true);
                      }}
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-[900] text-xs h-10 px-4 rounded-full shadow-md gap-1.5"
                    >
                      <Plus className="w-4 h-4 text-slate-950" /> + Post Review
                    </Button>
                    {myReview && (
                      <Button
                        onClick={() => {
                          setReviewForm({
                            rating: myReview.rating,
                            facultyQuality: myReview.facultyQuality,
                            placementSpeed: myReview.placementSpeed,
                            platformUsability: myReview.platformUsability,
                            reviewerName: myReview.reviewerName,
                            reviewerDesignation: myReview.reviewerDesignation,
                            title: myReview.title,
                            feedback: myReview.feedback,
                          });
                          setShowReviewModal(true);
                        }}
                        className="bg-white hover:bg-amber-50 text-slate-900 border border-amber-300 font-[800] text-xs h-10 px-4 rounded-full shadow-2xs gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-600" /> Edit Your Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* My School Review Spotlight */}
              {myReview ? (
                <div className="bg-white rounded-3xl border-2 border-brand-teal/40 p-6 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-teal text-white text-[10px] font-[800] px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
                    Your Published Review ✓
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <img src={myReview.logo} alt={myReview.schoolName} className="w-14 h-14 rounded-2xl object-cover border border-brand-border" />
                    <div>
                      <h3 className="font-[900] text-brand-navy text-lg">{myReview.schoolName}</h3>
                      <p className="text-xs text-brand-muted font-[500]">{myReview.reviewerName} ({myReview.reviewerDesignation}) · {myReview.date}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${s <= myReview.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                          />
                        ))}
                        <span className="text-xs font-[800] text-brand-navy ml-2">{myReview.rating}.0 / 5.0 Rating</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-[900] text-brand-navy text-base mb-2">{myReview.title}</h4>
                  <p className="text-sm text-brand-text leading-relaxed font-[500] mb-4 bg-brand-bg rounded-2xl p-4 border border-brand-border">
                    &ldquo;{myReview.feedback}&rdquo;
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2 mb-4">
                    <div className="bg-brand-teal-light/50 p-3 rounded-xl border border-brand-teal/20 text-center">
                      <p className="text-[10px] text-brand-muted font-[800] uppercase">Faculty Quality</p>
                      <p className="text-base font-[900] text-brand-teal-dark">{myReview.facultyQuality}.0 / 5.0 ★</p>
                    </div>
                    <div className="bg-brand-blue-light/50 p-3 rounded-xl border border-brand-blue/20 text-center">
                      <p className="text-[10px] text-brand-muted font-[800] uppercase">Placement Speed</p>
                      <p className="text-base font-[900] text-brand-blue">{myReview.placementSpeed}.0 / 5.0 ★</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-center">
                      <p className="text-[10px] text-brand-muted font-[800] uppercase">Platform Usability</p>
                      <p className="text-base font-[900] text-purple-700">{myReview.platformUsability}.0 / 5.0 ★</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-brand-border">
                    <Button
                      onClick={() => {
                        setReviewForm({
                          rating: myReview.rating,
                          facultyQuality: myReview.facultyQuality,
                          placementSpeed: myReview.placementSpeed,
                          platformUsability: myReview.platformUsability,
                          reviewerName: myReview.reviewerName,
                          reviewerDesignation: myReview.reviewerDesignation,
                          title: myReview.title,
                          feedback: myReview.feedback,
                        });
                        setShowReviewModal(true);
                      }}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-950 font-[800] text-xs h-9 px-4 rounded-full gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-700" /> Edit Your Review
                    </Button>
                    <Button
                      onClick={() => {
                        setReviewForm({
                          rating: 5,
                          facultyQuality: 5,
                          placementSpeed: 5,
                          platformUsability: 5,
                          reviewerName: schoolProfile.contactPerson || "Dr. Ram Krishna Sharma",
                          reviewerDesignation: schoolProfile.designation || "Principal",
                          title: "",
                          feedback: "",
                        });
                        setShowReviewModal(true);
                      }}
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] text-xs h-9 px-4 rounded-full gap-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Post New Review
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-dashed border-brand-border p-8 text-center space-y-3">
                  <Star className="w-12 h-12 text-amber-400 fill-amber-100 mx-auto" />
                  <h3 className="font-[800] text-brand-navy text-lg">No review submitted yet</h3>
                  <p className="text-xs text-brand-muted max-w-md mx-auto font-[500]">
                    Your feedback helps us continuously vet top-tier subject teachers and improve our school placement desk.
                  </p>
                  <Button onClick={() => setShowReviewModal(true)} className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-[800] text-xs rounded-full">
                    + Leave a Review for Mero Tutor
                  </Button>
                </div>
              )}

              {/* Partner Schools Testimonial Feed */}
              <div>
                <h3 className="text-lg font-[900] text-brand-navy mb-4">Partner Schools &amp; Colleges Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <img src={rev.logo} alt={rev.schoolName} className="w-11 h-11 rounded-xl object-cover border border-brand-border flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-[800] text-brand-navy text-sm truncate">{rev.schoolName}</h4>
                            <p className="text-[11px] text-brand-muted font-[500] truncate">{rev.reviewerName} · {rev.reviewerDesignation}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                          ))}
                          <span className="text-xs font-[800] text-brand-navy ml-1">{rev.rating}.0</span>
                        </div>

                        <h5 className="font-[800] text-brand-navy text-xs mb-1">{rev.title}</h5>
                        <p className="text-xs text-brand-text font-[500] leading-relaxed line-clamp-3">{rev.feedback}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-[10px] text-brand-muted font-[600]">
                        <span>Verified Partner Institution</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── INSTITUTION PROFILE TAB ──────────────────────────────── */}
          {activeTab === "profile" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-[900] text-brand-navy">Institution Profile</h2>
                  {!editProfileMode ? (
                    <Button onClick={() => { setProfileForm({ ...schoolProfile }); setEditProfileMode(true); }} variant="outline" className="rounded-full border-brand-border text-brand-navy hover:bg-brand-bg text-xs font-[800] h-9 gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" /> Edit Institution Details
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={() => setEditProfileMode(false)} variant="ghost" className="rounded-full text-brand-muted text-xs font-[700] h-9">Cancel</Button>
                      <Button onClick={handleSaveProfile} className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full text-xs font-[800] h-9 gap-1.5 shadow-sm">
                        <Save className="w-3.5 h-3.5" /> Save Changes
                      </Button>
                    </div>
                  )}
                </div>

                {/* Logo & Header */}
                <div className="flex items-start gap-5 mb-6 pb-6 border-b border-brand-border">
                  <div className="relative group cursor-pointer" onClick={() => photoInputRef.current?.click()}>
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-brand-teal-light border-2 border-brand-teal/30 group-hover:border-brand-teal transition-colors">
                      <img src={schoolProfile.logo} alt={schoolProfile.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <input ref={photoInputRef} type="file" accept="image/*" className="hidden" />
                  </div>
                  <div>
                    <p className="font-[900] text-brand-navy text-xl">{schoolProfile.name}</p>
                    <p className="text-sm text-brand-teal-dark font-[700] mb-2">{schoolProfile.category}</p>
                    <div className="flex items-center gap-2">
                      {schoolProfile.isVerified && (
                        <span className="inline-flex items-center gap-1 text-xs font-[700] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Institution
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Institution Name", key: "name", icon: Building2 },
                    { label: "Category", key: "category", icon: GraduationCap },
                    { label: "Contact Person", key: "contactPerson", icon: Users },
                    { label: "Designation", key: "designation", icon: Award },
                    { label: "Email Address", key: "email", icon: Mail },
                    { label: "Phone / Tel", key: "phone", icon: Phone },
                    { label: "Location / Address", key: "location", icon: MapPin },
                    { label: "Website", key: "website", icon: Globe },
                  ].map(({ label, key, icon: Icon }) => (
                    <div key={key}>
                      <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-1.5 block">{label}</Label>
                      {editProfileMode ? (
                        <div className="relative">
                          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                          <Input
                            value={(profileForm as Record<string, unknown>)[key] as string}
                            onChange={(e) => setProfileForm((f) => ({ ...f, [key]: e.target.value }))}
                            className="pl-9 text-sm font-[600]"
                          />
                        </div>
                      ) : (
                        <p className="text-sm font-[600] text-brand-navy bg-brand-bg rounded-lg px-3 py-2 border border-brand-border">{(schoolProfile as Record<string, unknown>)[key] as string}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Institution Bio */}
                <div>
                  <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-1.5 block">About Institution / Overview</Label>
                  {editProfileMode ? (
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))}
                      rows={4}
                      className="w-full text-sm font-[500] text-brand-navy bg-white border border-brand-border rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    />
                  ) : (
                    <p className="text-sm text-brand-text bg-brand-bg rounded-xl px-3 py-3 leading-relaxed border border-brand-border font-[500]">{schoolProfile.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── SETTINGS TAB ───────────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs">
                <h3 className="text-sm font-[800] text-brand-navy mb-4">Faculty Recruitment &amp; Email Preferences</h3>
                <div className="space-y-3">
                  {[
                    { label: "Email notifications when tutors apply to vacancies", checked: true },
                    { label: "SMS updates from Mero Tutor placement desk", checked: true },
                    { label: "Weekly digest of available subject teachers", checked: false },
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-brand-text font-[500] group-hover:text-brand-navy">{item.label}</span>
                      <div className={`w-11 h-6 rounded-full transition-colors relative ${item.checked ? "bg-brand-blue" : "bg-slate-200"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-xs transition-all ${item.checked ? "left-6" : "left-1"}`} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs">
                <h3 className="text-sm font-[800] text-brand-navy mb-4">Account Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-brand-navy font-[700] hover:text-brand-blue py-2 border-b border-brand-border transition-colors">
                    Change Password →
                  </button>
                  <button className="w-full text-left text-sm text-rose-500 font-[700] hover:text-rose-700 py-2 transition-colors">
                    Deactivate Account →
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── CREATE VACANCY MODAL ────────────────────────────────────────── */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-2xl border border-brand-border my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-brand-border">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal-light flex items-center justify-center text-brand-teal-dark font-[800]">
                  {editingVacancyId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-[900] text-brand-navy">
                    {editingVacancyId ? "Edit School / College Vacancy" : "Create School / College Vacancy"}
                  </h3>
                  <p className="text-xs text-brand-muted font-[500]">
                    {editingVacancyId ? "Modify requirement details and update vacancy information" : "Fill out the details to post a new faculty opening"}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowPostModal(false)} className="p-2 rounded-xl hover:bg-brand-bg text-brand-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVacancy} className="space-y-4">
              <div>
                <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Vacancy / Position Title *</Label>
                <Input
                  placeholder="e.g. Secondary Mathematics Teacher (SEE)"
                  value={newVacancy.jobTitle}
                  onChange={(e) => setNewVacancy({ ...newVacancy, jobTitle: e.target.value })}
                  required
                  className="text-sm font-[600]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Class / Level *</Label>
                  <select
                    value={newVacancy.level}
                    onChange={(e) => setNewVacancy({ ...newVacancy, level: e.target.value })}
                    className="w-full h-10 rounded-xl border border-brand-border bg-white px-3 text-sm font-[600] text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Primary Level (Grade 1-5)">Primary Level (Grade 1-5)</option>
                    <option value="Lower Secondary (Grade 6-8)">Lower Secondary (Grade 6-8)</option>
                    <option value="Class 9 & 10 (SEE)">Class 9 &amp; 10 (SEE)</option>
                    <option value="+2 Science (Class 11-12)">+2 Science (Class 11-12)</option>
                    <option value="+2 Management (Class 11-12)">+2 Management (Class 11-12)</option>
                    <option value="+2 Humanities / Law (Class 11-12)">+2 Humanities / Law (Class 11-12)</option>
                    <option value="A-Level (Cambridge AS & A Level)">A-Level (Cambridge AS &amp; A Level)</option>
                    <option value="IB Level (International Baccalaureate)">IB Level (International Baccalaureate)</option>
                    <option value="Entrance Preparation (IOE / IOM / CEE / CMAT)">Entrance Preparation (IOE / IOM / CEE / CMAT)</option>
                    <option value="Bachelor Degree Level">Bachelor Degree Level</option>
                    <option value="Others (Custom Level)">Others (Custom Level)</option>
                  </select>

                  {newVacancy.level === "Others (Custom Level)" && (
                    <div className="mt-2">
                      <Input
                        placeholder="Type custom level (e.g., SAT Prep, Diploma)..."
                        value={newVacancy.customLevel}
                        onChange={(e) => setNewVacancy({ ...newVacancy, customLevel: e.target.value })}
                        required
                        className="text-xs font-[600] border-brand-teal focus:ring-brand-teal"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Employment Shift *</Label>
                  <select
                    value={newVacancy.employmentType}
                    onChange={(e) => setNewVacancy({ ...newVacancy, employmentType: e.target.value as any })}
                    className="w-full h-10 rounded-xl border border-brand-border bg-white px-3 text-sm font-[600] text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Morning Shift">Morning Shift</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Subject(s) *</Label>
                  <Input
                    placeholder="e.g. Mathematics, Science"
                    value={newVacancy.subjects}
                    onChange={(e) => setNewVacancy({ ...newVacancy, subjects: e.target.value })}
                    required
                    className="text-sm font-[600]"
                  />
                </div>

                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Salary / Remuneration *</Label>
                  <Input
                    placeholder="e.g. NPR 35,000 – 45,000 / month"
                    value={newVacancy.salary}
                    onChange={(e) => setNewVacancy({ ...newVacancy, salary: e.target.value })}
                    required
                    className="text-sm font-[600]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Qualification Required</Label>
                  <Input
                    placeholder="e.g. B.Sc. / M.Sc. Mathematics or B.Ed."
                    value={newVacancy.qualificationRequired}
                    onChange={(e) => setNewVacancy({ ...newVacancy, qualificationRequired: e.target.value })}
                    className="text-sm font-[600]"
                  />
                </div>

                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Application Deadline</Label>
                  <Input
                    type="date"
                    value={newVacancy.deadline}
                    onChange={(e) => setNewVacancy({ ...newVacancy, deadline: e.target.value })}
                    className="text-sm font-[600]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Job Description &amp; Responsibilities</Label>
                <textarea
                  rows={3}
                  placeholder="Describe key duties, teaching shift details, and expectations..."
                  value={newVacancy.description}
                  onChange={(e) => setNewVacancy({ ...newVacancy, description: e.target.value })}
                  className="w-full text-sm font-[500] text-brand-navy bg-white border border-brand-border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 rounded-full border-brand-border text-brand-navy font-[800] text-sm h-11"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full font-[800] text-sm h-11 shadow-lg shadow-teal-200"
                >
                  {editingVacancyId ? "Save Vacancy Changes" : "Post Vacancy Now"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── TEACHER REQUEST MODAL ───────────────────────────────────────── */}
      {requestingTutor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl border border-brand-border animate-in fade-in zoom-in-95">
            {requestSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-[900] text-brand-navy mb-1">Teacher Request Submitted!</h3>
                <p className="text-sm text-brand-text mb-3 font-[500]">
                  Your request for <span className="font-[800] text-brand-navy">{requestingTutor.name}</span> has been sent to Mero Tutor placement team.
                </p>
                <p className="text-xs text-brand-muted font-[500]">A placement coordinator will contact you shortly.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-brand-border">
                  <div className="flex items-center gap-3">
                    <img src={requestingTutor.photo} alt={requestingTutor.name} className="w-12 h-12 rounded-2xl object-cover border border-brand-border" />
                    <div>
                      <h3 className="text-base font-[900] text-brand-navy">{requestingTutor.name}</h3>
                      <p className="text-xs text-brand-muted font-[500]">{requestingTutor.qualification} · {requestingTutor.experience} yrs exp</p>
                    </div>
                  </div>
                  <button onClick={() => setRequestingTutor(null)} className="p-1.5 rounded-lg hover:bg-brand-bg text-brand-muted">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-brand-blue-light/40 border border-brand-blue/20 rounded-2xl p-4">
                    <p className="text-xs font-[800] text-brand-blue uppercase tracking-wider mb-2">Teacher Placement Note</p>
                    <p className="text-xs text-brand-text font-[500] leading-relaxed mb-3">
                      Educational institutions can request pre-vetted faculty through Mero Tutor placement service.
                    </p>
                    <textarea
                      rows={3}
                      placeholder="Add specific requirements (e.g. Morning shift physics lecturer for Grade 11-12)..."
                      value={requestNotes}
                      onChange={(e) => setRequestNotes(e.target.value)}
                      className="w-full text-xs font-[500] text-brand-navy bg-white border border-brand-border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-center">
                    <p className="text-xs font-[800] text-emerald-900 mb-1">Want immediate coordination via WhatsApp?</p>
                    <a
                      href={`https://wa.me/9779762511114?text=Hi%20Mero%20Tutor,%20our%20institution%20${encodeURIComponent(schoolProfile.name)}%20is%20interested%20in%20requesting%20tutor%20${encodeURIComponent(requestingTutor.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-[800] text-emerald-700 hover:underline"
                    >
                      <MessageSquare className="w-4 h-4" /> Open Direct WhatsApp Chat →
                    </a>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setRequestingTutor(null)}
                    className="flex-1 rounded-full border-brand-border text-brand-navy font-[800] text-sm h-11"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendTeacherRequest}
                    className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full font-[800] text-sm h-11 shadow-lg shadow-blue-200"
                  >
                    Submit Teacher Request
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── WRITE REVIEW MODAL ────────────────────────────────────────── */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-2xl border border-brand-border my-8 animate-in fade-in zoom-in-95">
            {reviewSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-[900] text-brand-navy">Review Published Successfully!</h3>
                <p className="text-xs text-brand-text font-[500] max-w-sm mx-auto">
                  Thank you for reviewing Mero Tutor! Your feedback helps empower partner schools across Nepal.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-brand-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-[800]">
                      <Star className="w-5 h-5 fill-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-[900] text-brand-navy">Review Mero Tutor Platform</h3>
                      <p className="text-xs text-brand-muted font-[500]">Share your institution feedback &amp; rating</p>
                    </div>
                  </div>
                  <button onClick={() => setShowReviewModal(false)} className="p-2 rounded-xl hover:bg-brand-bg text-brand-muted">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveReview} className="space-y-4">
                  {/* Overall Star Rating */}
                  <div>
                    <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Overall Rating *</Label>
                    <div className="flex items-center gap-2 bg-brand-bg p-3 rounded-2xl border border-brand-border">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="p-1 transition-transform hover:scale-125 focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= reviewForm.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300 hover:text-amber-200"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-sm font-[900] text-brand-navy ml-2">{reviewForm.rating}.0 out of 5 Stars</span>
                    </div>
                  </div>

                  {/* Sub-Ratings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: "facultyQuality", label: "Faculty Quality" },
                      { key: "placementSpeed", label: "Placement Speed" },
                      { key: "platformUsability", label: "Platform Ease" },
                    ].map(({ key, label }) => (
                      <div key={key} className="bg-brand-bg p-3 rounded-xl border border-brand-border">
                        <Label className="text-[10px] font-[800] text-brand-muted uppercase block mb-1">{label}</Label>
                        <select
                          value={(reviewForm as Record<string, unknown>)[key] as number}
                          onChange={(e) => setReviewForm({ ...reviewForm, [key]: Number(e.target.value) })}
                          className="w-full text-xs font-[800] bg-white border border-brand-border rounded-lg p-1.5 text-brand-navy"
                        >
                          <option value={5}>5 ★ Exceptional</option>
                          <option value={4}>4 ★ Very Good</option>
                          <option value={3}>3 ★ Satisfactory</option>
                          <option value={2}>2 ★ Needs Improvement</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Review Title */}
                  <div>
                    <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Headline / Review Title *</Label>
                    <Input
                      placeholder="e.g. Outstanding faculty placement & fast response"
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                      required
                      className="text-sm font-[600]"
                    />
                  </div>

                  {/* Reviewer Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-[800] text-brand-navy uppercase mb-1 block">Your Name *</Label>
                      <Input
                        value={reviewForm.reviewerName}
                        onChange={(e) => setReviewForm({ ...reviewForm, reviewerName: e.target.value })}
                        required
                        className="text-xs font-[600]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-[800] text-brand-navy uppercase mb-1 block">Designation / Role *</Label>
                      <Input
                        value={reviewForm.reviewerDesignation}
                        onChange={(e) => setReviewForm({ ...reviewForm, reviewerDesignation: e.target.value })}
                        required
                        className="text-xs font-[600]"
                      />
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <div>
                    <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Detailed Feedback &amp; Testimonial *</Label>
                    <textarea
                      rows={4}
                      placeholder="Write about your experience hiring teachers or working with Mero Tutor team..."
                      value={reviewForm.feedback}
                      onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                      required
                      className="w-full text-xs font-[500] text-brand-navy bg-white border border-brand-border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewModal(false)}
                      className="flex-1 rounded-full border-brand-border text-brand-navy font-[800] text-sm h-11"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-full font-[900] text-sm h-11 shadow-lg"
                    >
                      Publish Review
                    </Button>
                  </div>
                </form>
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
