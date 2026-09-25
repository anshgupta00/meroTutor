"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  LayoutDashboard,
  XCircle,
  Clock,
  AlertTriangle,
  Trash2,
  Edit3,
  Plus,
  Search,
  Filter,
  Users,
  UserCheck,
  Building2,
  GraduationCap,
  Briefcase,
  FileText,
  Star,
  Bell,
  LogOut,
  Eye,
  EyeOff,
  MessageSquare,
  Check,
  X,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Send,
  Globe,
  RefreshCw,
  SlidersHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Lock,
  Menu,
  Sparkles,
  DollarSign,
  User,
  Shield,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────────────────────
   TYPES & MODELS
───────────────────────────────────────────── */

export type Tab =
  | "overview"
  | "parent-tuitions"
  | "school-vacancies"
  | "tuition-applications"
  | "school-applications"
  | "users"
  | "reviews-cms"
  | "settings";

export interface ParentTuitionPost {
  id: string;
  title: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  gradeLevel: string;
  subjects: string[];
  tuitionMode: "Home" | "Online" | "Both";
  genderPreference: "Any" | "Male Tutor Required" | "Female Tutor Required";
  location: string;
  budget: string;
  timing: string;
  daysPerWeek: string;
  urgency: "Urgent" | "Normal";
  postedDate: string;
  applicantCount: number;
  description: string;
  adminStatus: "pending" | "approved" | "rejected";
}

export interface SchoolVacancyPost {
  id: string;
  schoolName: string;
  schoolPhone: string;
  schoolEmail: string;
  schoolLogo: string;
  schoolLocation: string;
  schoolCategory: string;
  jobTitle: string;
  level: string;
  subjects: string[];
  salary: string;
  employmentType: string;
  qualificationRequired: string;
  experienceRequired: string;
  deadline: string;
  postedDate: string;
  applicationsCount: number;
  description: string;
  adminStatus: "pending" | "approved" | "rejected";
}

export interface TuitionApplication {
  id: string;
  tuitionId: string;
  tuitionTitle: string;
  tutorId: string;
  tutorName: string;
  tutorPhoto: string;
  tutorPhone: string;
  tutorQualification: string;
  tutorExperience: number;
  tuitionMode: "Home" | "Online";
  appliedDate: string;
  status: "Pending Review" | "Forwarded to Parent" | "Demo Scheduled" | "Hired" | "Rejected";
}

export interface SchoolApplication {
  id: string;
  vacancyId: string;
  jobTitle: string;
  schoolName: string;
  tutorId: string;
  tutorName: string;
  tutorPhoto: string;
  tutorPhone: string;
  tutorQualification: string;
  cvFileName: string;
  appliedDate: string;
  status: "Pending Review" | "Forwarded to School" | "Shortlisted" | "Hired" | "Rejected";
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "tutor" | "parent" | "school";
  location: string;
  details: string;
  verified: boolean;
  joinedDate: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorRole: "Parent" | "Tutor" | "Student" | "School";
  location: string;
  rating: number;
  title: string;
  feedback: string;
  date: string;
  status: "approved" | "pending" | "rejected";
}

/* ─────────────────────────────────────────────
   MOCK DATASETS
───────────────────────────────────────────── */

const INITIAL_PARENT_TUITIONS: ParentTuitionPost[] = [
  {
    id: "req-001",
    title: "Class 10 (SEE) Mathematics & Science Home Tutor",
    parentName: "Ramesh Adhikari",
    parentPhone: "+977 9851012345",
    parentEmail: "ramesh.adhikari@gmail.com",
    gradeLevel: "Class 10 (SEE)",
    subjects: ["Mathematics", "Science"],
    tuitionMode: "Home",
    genderPreference: "Any",
    location: "New Baneshwor, Kathmandu",
    budget: "NPR 12,000 – 15,000 / month",
    timing: "5:00 PM – 6:30 PM (Evening Shift)",
    daysPerWeek: "6 days/week",
    urgency: "Urgent",
    postedDate: "2 hrs ago",
    applicantCount: 5,
    description: "Looking for an experienced SEE Math & Science tutor for my son. Focus on past question papers, weak formulas, and model set practice.",
    adminStatus: "pending",
  },
  {
    id: "req-002",
    title: "+2 Science Physics & Chemistry Online Tuition",
    parentName: "Sunita Karki",
    parentPhone: "+977 9841234567",
    parentEmail: "sunita.karki@hotmail.com",
    gradeLevel: "Class 12 (+2 Science)",
    subjects: ["Physics", "Chemistry"],
    tuitionMode: "Online",
    genderPreference: "Female Tutor Required",
    location: "Jhamsikhel, Lalitpur",
    budget: "NPR 14,000 – 18,000 / month",
    timing: "6:30 AM – 7:45 AM (Morning Shift)",
    daysPerWeek: "5 days/week",
    urgency: "Urgent",
    postedDate: "5 hrs ago",
    applicantCount: 3,
    description: "Online tuition for Class 12 NEB Physics numerical problem solving and Organic Chemistry concepts.",
    adminStatus: "approved",
  },
  {
    id: "req-003",
    title: "Class 6 All Subjects Primary Home Tutor",
    parentName: "Binod Shrestha",
    parentPhone: "+977 9803129876",
    parentEmail: "binod.s@yahoo.com",
    gradeLevel: "Class 6",
    subjects: ["English", "Mathematics", "Science", "Social Studies"],
    tuitionMode: "Home",
    genderPreference: "Any",
    location: "Suryabinayak, Bhaktapur",
    budget: "NPR 9,000 – 11,000 / month",
    timing: "4:00 PM – 5:30 PM",
    daysPerWeek: "6 days/week",
    urgency: "Normal",
    postedDate: "1 day ago",
    applicantCount: 2,
    description: "Patient primary home tutor needed to help with daily homework, handwriting improvement, and school tests.",
    adminStatus: "approved",
  },
  {
    id: "req-004",
    title: "A-Level Economics & Accounting Tutor",
    parentName: "Deepak Sharma",
    parentPhone: "+977 9818765432",
    parentEmail: "deepak.sharma@gmail.com",
    gradeLevel: "A-Levels (AS/A2)",
    subjects: ["Economics", "Accounting"],
    tuitionMode: "Both",
    genderPreference: "Male Tutor Required",
    location: "Lazimpat, Kathmandu",
    budget: "NPR 18,000 – 25,000 / month",
    timing: "Flexible Weekend Shift",
    daysPerWeek: "4 days/week",
    urgency: "Normal",
    postedDate: "2 days ago",
    applicantCount: 4,
    description: "Cambridge A-Level Accounting & Economics specialist needed for past paper drill and essay writing techniques.",
    adminStatus: "pending",
  },
];

const INITIAL_SCHOOL_VACANCIES: SchoolVacancyPost[] = [
  {
    id: "sch-vacancy-001",
    schoolName: "Little Angels' School & College",
    schoolPhone: "+977 01-5250123",
    schoolEmail: "hr@las.edu.np",
    schoolLogo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80",
    schoolLocation: "Hattiban, Lalitpur",
    schoolCategory: "Private College & Higher Secondary",
    jobTitle: "Senior Physics Lecturer (+2 Science)",
    level: "Class 11 & 12 (+2 Science)",
    subjects: ["Physics"],
    salary: "NPR 45,000 – 60,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "M.Sc. Physics from recognized university",
    experienceRequired: "Minimum 3 years teaching experience in +2 NEB curriculum",
    deadline: "Oct 15, 2026",
    postedDate: "3 hrs ago",
    applicationsCount: 8,
    description: "We are seeking a dynamic Physics Lecturer to lead theory lectures and physics practical labs for Class 11 and 12 science students.",
    adminStatus: "pending",
  },
  {
    id: "sch-vacancy-002",
    schoolName: "KMC Secondary School & College",
    schoolPhone: "+977 01-4478901",
    schoolEmail: "vacancy@kmc.edu.np",
    schoolLogo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&auto=format&fit=crop&q=80",
    schoolLocation: "Balkhu, Kathmandu",
    schoolCategory: "Higher Secondary College",
    jobTitle: "Secondary Mathematics Teacher (SEE Level)",
    level: "Secondary (Grade 9 & 10)",
    subjects: ["Mathematics", "Optional Math"],
    salary: "NPR 38,000 – 50,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "B.Sc. / B.Ed. in Mathematics",
    experienceRequired: "2+ years teaching experience in Secondary Board exam preparation",
    deadline: "Oct 20, 2026",
    postedDate: "1 day ago",
    applicationsCount: 12,
    description: "Responsible for conducting daily Compulsory and Opt Mathematics classes for Grade 9 & 10 SEE aspirants.",
    adminStatus: "approved",
  },
  {
    id: "sch-vacancy-003",
    schoolName: "St. Xavier's Secondary School",
    schoolPhone: "+977 01-4221050",
    schoolEmail: "careers@stxaviers.edu.np",
    schoolLogo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&auto=format&fit=crop&q=80",
    schoolLocation: "Maitighar, Kathmandu",
    schoolCategory: "Jesuit Institution",
    jobTitle: "Computer Science & QBASIC Instructor",
    level: "Lower Secondary (Grade 6–8)",
    subjects: ["Computer Science", "QBASIC"],
    salary: "NPR 35,000 – 42,000 / month",
    employmentType: "Full-Time",
    qualificationRequired: "BCA / BScIT / BE Computer",
    experienceRequired: "1+ year experience in computer lab instruction",
    deadline: "Oct 25, 2026",
    postedDate: "2 days ago",
    applicationsCount: 6,
    description: "Manage computer lab practicals, teach basic coding, QBASIC logic, and ICT fundamentals to lower secondary students.",
    adminStatus: "approved",
  },
];

const INITIAL_TUITION_APPLICATIONS: TuitionApplication[] = [
  {
    id: "t-app-101",
    tuitionId: "req-001",
    tuitionTitle: "Class 10 (SEE) Mathematics & Science Home Tutor",
    tutorId: "tut-1",
    tutorName: "Anish Shrestha",
    tutorPhoto: "https://api.dicebear.com/8.x/avataaars/svg?seed=anish&backgroundColor=b6e3f4",
    tutorPhone: "+977 9841112233",
    tutorQualification: "BScIT, Tribhuvan University",
    tutorExperience: 4,
    tuitionMode: "Home",
    appliedDate: "1 hr ago",
    status: "Pending Review",
  },
  {
    id: "t-app-102",
    tuitionId: "req-001",
    tuitionTitle: "Class 10 (SEE) Mathematics & Science Home Tutor",
    tutorId: "tut-2",
    tutorName: "Suman Adhikari",
    tutorPhoto: "https://api.dicebear.com/8.x/avataaars/svg?seed=suman&backgroundColor=c0aede",
    tutorPhone: "+977 9851998877",
    tutorQualification: "M.Sc. Physics, Kirtipur TU",
    tutorExperience: 6,
    tuitionMode: "Home",
    appliedDate: "3 hrs ago",
    status: "Forwarded to Parent",
  },
  {
    id: "t-app-103",
    tuitionId: "req-002",
    tuitionTitle: "+2 Science Physics & Chemistry Online Tuition",
    tutorId: "tut-3",
    tutorName: "Pooja Gurung",
    tutorPhoto: "https://api.dicebear.com/8.x/avataaars/svg?seed=pooja&backgroundColor=ffdfbf",
    tutorPhone: "+977 9808776655",
    tutorQualification: "M.A. Gold Medalist",
    tutorExperience: 5,
    tuitionMode: "Online",
    appliedDate: "5 hrs ago",
    status: "Demo Scheduled",
  },
];

const INITIAL_SCHOOL_APPLICATIONS: SchoolApplication[] = [
  {
    id: "s-app-201",
    vacancyId: "sch-vacancy-001",
    jobTitle: "Senior Physics Lecturer (+2 Science)",
    schoolName: "Little Angels' School & College",
    tutorId: "tut-2",
    tutorName: "Suman Adhikari",
    tutorPhoto: "https://api.dicebear.com/8.x/avataaars/svg?seed=suman&backgroundColor=c0aede",
    tutorPhone: "+977 9851998877",
    tutorQualification: "M.Sc. Physics, Kirtipur TU",
    cvFileName: "Suman_Adhikari_Physics_CV.pdf",
    appliedDate: "2 hrs ago",
    status: "Pending Review",
  },
  {
    id: "s-app-202",
    vacancyId: "sch-vacancy-002",
    jobTitle: "Secondary Mathematics Teacher (SEE Level)",
    schoolName: "KMC Secondary School & College",
    tutorId: "tut-1",
    tutorName: "Anish Shrestha",
    tutorPhoto: "https://api.dicebear.com/8.x/avataaars/svg?seed=anish&backgroundColor=b6e3f4",
    tutorPhone: "+977 9841112233",
    tutorQualification: "BScIT, Tribhuvan University",
    cvFileName: "Anish_Shrestha_Math_CV.pdf",
    appliedDate: "1 day ago",
    status: "Forwarded to School",
  },
];

const INITIAL_USERS: UserAccount[] = [
  { id: "u-101", name: "Anish Shrestha", email: "anish.shrestha@gmail.com", phone: "+977 9841112233", role: "tutor", location: "Kathmandu", details: "BScIT · 4 yrs exp · Math/Physics", verified: true, joinedDate: "2024-01-15" },
  { id: "u-102", name: "Suman Adhikari", email: "suman.adhikari@gmail.com", phone: "+977 9851998877", role: "tutor", location: "Lalitpur", details: "M.Sc. Physics · 6 yrs exp · +2 Physics", verified: true, joinedDate: "2024-02-10" },
  { id: "u-103", name: "Pooja Gurung", email: "pooja.g@gmail.com", phone: "+977 9808776655", role: "tutor", location: "Bhaktapur", details: "M.A. English · 5 yrs exp · English/Social", verified: true, joinedDate: "2024-03-05" },
  { id: "u-201", name: "Ramesh Adhikari", email: "ramesh.adhikari@gmail.com", phone: "+977 9851012345", role: "parent", location: "New Baneshwor, KTM", details: "2 Children (Grade 10 SEE & Grade 6)", verified: true, joinedDate: "2024-02-20" },
  { id: "u-202", name: "Sunita Karki", email: "sunita.karki@hotmail.com", phone: "+977 9841234567", role: "parent", location: "Jhamsikhel, Lalitpur", details: "1 Child (Class 12 +2 Science)", verified: true, joinedDate: "2024-03-12" },
  { id: "u-301", name: "Little Angels' School", email: "hr@las.edu.np", phone: "+977 01-5250123", role: "school", location: "Hattiban, Lalitpur", details: "Private College & Higher Secondary", verified: true, joinedDate: "2024-01-08" },
  { id: "u-302", name: "KMC Secondary School", email: "vacancy@kmc.edu.np", phone: "+977 01-4478901", role: "school", location: "Balkhu, Kathmandu", details: "Higher Secondary College", verified: true, joinedDate: "2024-02-01" },
];

const INITIAL_REVIEWS: ReviewItem[] = [
  { id: "rev-01", authorName: "Ramesh Adhikari", authorRole: "Parent", location: "New Baneshwor", rating: 5, title: "Found an exceptional SEE Math home tutor within 24 hours!", feedback: "Mero Tutor connected us with an outstanding home tutor for my son. Highly recommended 100% free service for parents in Nepal.", date: "2024-09-21", status: "approved" },
  { id: "rev-02", authorName: "Anish Shrestha", authorRole: "Tutor", location: "Kathmandu", rating: 5, title: "Best platform for verified home tuition jobs in Nepal", feedback: "I got 3 high-paying home tuition classes within 1 week of joining Mero Tutor. Very reliable and supportive team.", date: "2024-09-18", status: "approved" },
  { id: "rev-03", authorName: "Little Angels' School", authorRole: "School", location: "Hattiban, Lalitpur", rating: 5, title: "Hired qualified +2 Physics faculty through Mero Tutor", feedback: "Mero Tutor's school vacancy desk helped us filter and hire experienced M.Sc. Physics lecturers quickly.", date: "2024-09-15", status: "approved" },
  { id: "rev-04", authorName: "Prashant Thapa", authorRole: "Student", location: "Lalitpur", rating: 5, title: "Cleared CEE Entrance with home tutor guidance", feedback: "My Chemistry home tutor provided by Mero Tutor helped me score top ranks in CEE medical entrance exam.", date: "2024-09-23", status: "pending" },
];

/* ─────────────────────────────────────────────
   MAIN ADMIN DASHBOARD PAGE
───────────────────────────────────────────── */

export default function AdminDashboardPage() {
  const router = useRouter();

  // Lazy state initialization to prevent flash of overview tab on browser refresh
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as Tab | null;
      const validTabs: Tab[] = [
        "overview",
        "parent-tuitions",
        "school-vacancies",
        "tuition-applications",
        "school-applications",
        "users",
        "reviews-cms",
        "settings",
      ];
      if (tabParam && validTabs.includes(tabParam)) {
        return tabParam;
      }
    }
    return "overview";
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  // Sync activeTab with URL search params whenever activeTab changes
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

  // Data States
  const [parentTuitions, setParentTuitions] = useState<ParentTuitionPost[]>(INITIAL_PARENT_TUITIONS);
  const [schoolVacancies, setSchoolVacancies] = useState<SchoolVacancyPost[]>(INITIAL_SCHOOL_VACANCIES);
  const [tuitionApps, setTuitionApps] = useState<TuitionApplication[]>(INITIAL_TUITION_APPLICATIONS);
  const [schoolApps, setSchoolApps] = useState<SchoolApplication[]>(INITIAL_SCHOOL_APPLICATIONS);
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  // Filters & Search States
  const [userRoleFilter, setUserRoleFilter] = useState<"all" | "tutor" | "parent" | "school">("all");
  const [userSearch, setUserSearch] = useState("");

  // Anonymized View Preview Mode Toggle (Admin View vs Tutor View)
  const [previewMode, setPreviewMode] = useState<"admin" | "tutor">("admin");

  // User Deletion Modal State
  const [userToDelete, setUserToDelete] = useState<UserAccount | null>(null);

  // Review CMS Modal State
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [reviewForm, setReviewForm] = useState({
    authorName: "",
    authorRole: "Parent" as "Parent" | "Tutor" | "Student" | "School",
    location: "",
    rating: 5,
    title: "",
    feedback: "",
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Parent Ramesh Adhikari posted a new SEE Math & Science tuition requirement.", time: "10 mins ago", read: false },
    { id: 2, text: "Little Angels' School posted a new Senior Physics Lecturer vacancy.", time: "30 mins ago", read: false },
    { id: 3, text: "Tutor Anish Shrestha applied for SEE Math & Science home tuition.", time: "1 hr ago", read: false },
    { id: 4, text: "New 5-star review submitted by Prashant Thapa (Pending Moderation).", time: "2 hrs ago", read: false },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // Moderation Handlers
  const handleApproveParentTuition = (id: string) => {
    setParentTuitions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, adminStatus: "approved" } : item))
    );
  };

  const handleRejectParentTuition = (id: string) => {
    setParentTuitions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, adminStatus: "rejected" } : item))
    );
  };

  const handleApproveSchoolVacancy = (id: string) => {
    setSchoolVacancies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, adminStatus: "approved" } : item))
    );
  };

  const handleRejectSchoolVacancy = (id: string) => {
    setSchoolVacancies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, adminStatus: "rejected" } : item))
    );
  };

  // User Management Handlers
  const handleDeleteUser = () => {
    if (!userToDelete) return;
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
  };

  const handleToggleUserVerification = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, verified: !u.verified } : u))
    );
  };

  // Review CMS Handlers
  const handleApproveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
  };

  const handleRejectReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

  const handleDeleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSaveReviewCMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.authorName || !reviewForm.title) return;

    if (editingReview) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingReview.id
            ? {
                ...r,
                authorName: reviewForm.authorName,
                authorRole: reviewForm.authorRole,
                location: reviewForm.location,
                rating: reviewForm.rating,
                title: reviewForm.title,
                feedback: reviewForm.feedback,
              }
            : r
        )
      );
    } else {
      const newRev: ReviewItem = {
        id: `rev-${Date.now()}`,
        authorName: reviewForm.authorName,
        authorRole: reviewForm.authorRole,
        location: reviewForm.location || "Kathmandu",
        rating: reviewForm.rating,
        title: reviewForm.title,
        feedback: reviewForm.feedback,
        date: new Date().toISOString().split("T")[0],
        status: "approved",
      };
      setReviews((prev) => [newRev, ...prev]);
    }

    setShowAddReviewModal(false);
    setEditingReview(null);
  };

  const handleOpenEditReview = (r: ReviewItem) => {
    setEditingReview(r);
    setReviewForm({
      authorName: r.authorName,
      authorRole: r.authorRole,
      location: r.location,
      rating: r.rating,
      title: r.title,
      feedback: r.feedback,
    });
    setShowAddReviewModal(true);
  };

  const handleOpenCreateReview = () => {
    setEditingReview(null);
    setReviewForm({
      authorName: "",
      authorRole: "Parent",
      location: "",
      rating: 5,
      title: "",
      feedback: "",
    });
    setShowAddReviewModal(true);
  };

  const handleSignOut = () => {
    router.push("/login");
  };

  // Nav items list
  const NAV_ITEMS: { id: Tab; label: string; icon: React.ElementType; badge?: number; highlight?: boolean }[] = [
    { id: "overview", label: "Control Center", icon: LayoutDashboard },
    {
      id: "parent-tuitions",
      label: "Parent Tuitions Verification",
      icon: Briefcase,
      badge: parentTuitions.filter((p) => p.adminStatus === "pending").length,
      highlight: true,
    },
    {
      id: "school-vacancies",
      label: "School Vacancies Verification",
      icon: Building2,
      badge: schoolVacancies.filter((s) => s.adminStatus === "pending").length,
      highlight: true,
    },
    { id: "tuition-applications", label: "Tuition Applications", icon: FileText, badge: tuitionApps.length },
    { id: "school-applications", label: "School Faculty Applications", icon: GraduationCap, badge: schoolApps.length },
    { id: "users", label: "User Accounts & Delete", icon: Users, badge: users.length },
    {
      id: "reviews-cms",
      label: "Reviews CMS & Approval",
      icon: Star,
      badge: reviews.filter((r) => r.status === "pending").length,
    },
    { id: "settings", label: "Admin System Settings", icon: SlidersHorizontal },
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
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-brand-border z-40 flex flex-col shadow-lg transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
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
          <p className="text-[10px] text-rose-600 font-[800] uppercase tracking-wider mt-1.5 flex items-center gap-1">
            <Shield className="w-3 h-3 text-rose-600" /> System Admin Control Panel
          </p>
        </div>

        {/* Admin info badge */}
        <div className="p-4 border-b border-brand-border bg-gradient-to-r from-slate-900 to-brand-navy text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-[900] truncate text-white">Super Administrator</p>
              <p className="text-[10px] text-slate-300 font-[500] truncate">admin@merotutor.com</p>
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
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-[800] transition-all text-left relative ${
                  isActive
                    ? "bg-brand-blue text-white shadow-sm shadow-blue-200"
                    : "text-brand-navy hover:bg-brand-blue-light/40 hover:text-brand-blue"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[9px] font-[900] px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white text-brand-blue"
                        : item.highlight
                        ? "bg-rose-500 text-white"
                        : "bg-brand-blue-light text-brand-blue"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Sign Out */}
        <div className="p-3 border-t border-brand-border space-y-1">
          <button
            onClick={() => setShowSignOutModal(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-[800] text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Admin
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
              <h1 className="text-base font-[900] text-brand-navy capitalize flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
              </h1>
              <p className="text-[11px] text-brand-muted font-[500] hidden sm:block">
                {new Date().toLocaleDateString("en-NP", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher for Vacancies */}
            {(activeTab === "parent-tuitions" || activeTab === "school-vacancies") && (
              <div className="hidden md:flex items-center bg-brand-bg p-1 rounded-full border border-brand-border text-xs font-[700]">
                <button
                  onClick={() => setPreviewMode("admin")}
                  className={`px-3 py-1 rounded-full transition-all ${
                    previewMode === "admin"
                      ? "bg-brand-navy text-white shadow-xs"
                      : "text-brand-muted hover:text-brand-navy"
                  }`}
                >
                  <Eye className="w-3 h-3 inline mr-1" /> Admin Full View
                </button>
                <button
                  onClick={() => setPreviewMode("tutor")}
                  className={`px-3 py-1 rounded-full transition-all ${
                    previewMode === "tutor"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-brand-muted hover:text-brand-navy"
                  }`}
                >
                  <EyeOff className="w-3 h-3 inline mr-1" /> Tutor Anonymized View
                </button>
              </div>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={markAllRead}
                className="relative p-2.5 rounded-xl text-brand-navy hover:bg-brand-bg transition-colors cursor-pointer"
                title="Admin Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-[800] rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">

          {/* ─── 1. OVERVIEW ────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="max-w-6xl mx-auto space-y-6">

              {/* Welcome banner */}
              <div className="relative overflow-hidden bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 rounded-3xl p-6 sm:p-8 text-brand-navy border border-brand-teal/30 shadow-md">
                <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/10 rounded-full -translate-y-20 translate-x-20 blur-2xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 border border-rose-300 px-3 py-1 rounded-full text-xs font-[800] mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-600" /> System Control Center Active
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-[900] text-brand-navy tracking-tight mb-1">
                    System Administration Overview
                  </h2>
                  <p className="text-brand-muted text-sm font-[500] mb-5 max-w-2xl">
                    Verify parent tuition requirements, approve school faculty job vacancies, track applications, delete user accounts, and moderate platform reviews.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => setActiveTab("parent-tuitions")}
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-[800] px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4" />
                      Verify Parent Tuitions ({parentTuitions.filter((p) => p.adminStatus === "pending").length})
                    </button>
                    <button
                      onClick={() => setActiveTab("school-vacancies")}
                      className="bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-[800] px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4" />
                      Verify School Vacancies ({schoolVacancies.filter((s) => s.adminStatus === "pending").length})
                    </button>
                    <button
                      onClick={() => setActiveTab("reviews-cms")}
                      className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-[800] px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Star className="w-4 h-4" />
                      Review CMS &amp; Approvals ({reviews.filter((r) => r.status === "pending").length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs">
                  <p className="text-xs font-[800] uppercase tracking-widest text-brand-muted mb-1">Pending Verifications</p>
                  <p className="text-3xl font-[900] text-rose-600 mb-0.5">
                    {parentTuitions.filter((p) => p.adminStatus === "pending").length +
                      schoolVacancies.filter((s) => s.adminStatus === "pending").length}
                  </p>
                  <p className="text-xs text-brand-text font-[500]">Parent &amp; School Posts</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs">
                  <p className="text-xs font-[800] uppercase tracking-widest text-brand-muted mb-1">Total Users</p>
                  <p className="text-3xl font-[900] text-brand-blue mb-0.5">{users.length}</p>
                  <p className="text-xs text-brand-text font-[500]">Tutors, Parents &amp; Schools</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs">
                  <p className="text-xs font-[800] uppercase tracking-widest text-brand-muted mb-1">Applications</p>
                  <p className="text-3xl font-[900] text-emerald-600 mb-0.5">{tuitionApps.length + schoolApps.length}</p>
                  <p className="text-xs text-brand-text font-[500]">Tuition &amp; School Faculty</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs">
                  <p className="text-xs font-[800] uppercase tracking-widest text-brand-muted mb-1">Reviews &amp; CMS</p>
                  <p className="text-3xl font-[900] text-amber-500 mb-0.5">{reviews.length}</p>
                  <p className="text-xs text-brand-text font-[500]">Platform Testimonials</p>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pending Parent Tuitions Card */}
                <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-[900]">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <h3 className="font-[900] text-brand-navy text-sm">Parent Tuitions Pending Approval</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("parent-tuitions")}
                      className="text-xs text-brand-blue font-[800] hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  {parentTuitions.filter((p) => p.adminStatus === "pending").length === 0 ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-[600] rounded-xl border border-emerald-200">
                      All parent tuition posts have been reviewed and verified!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {parentTuitions
                        .filter((p) => p.adminStatus === "pending")
                        .slice(0, 3)
                        .map((p) => (
                          <div key={p.id} className="p-3 bg-brand-bg rounded-xl border border-brand-border flex items-center justify-between gap-3 text-xs">
                            <div className="min-w-0 flex-1">
                              <p className="font-[800] text-brand-navy truncate">{p.title}</p>
                              <p className="text-[10px] text-brand-muted font-[500] truncate">Posted by {p.parentName} · {p.location}</p>
                            </div>
                            <button
                              onClick={() => handleApproveParentTuition(p.id)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-[800] text-[11px] shrink-0"
                            >
                              Approve Now
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Pending School Vacancies Card */}
                <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 text-brand-teal-dark flex items-center justify-center font-[900]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <h3 className="font-[900] text-brand-navy text-sm">School Vacancies Pending Approval</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("school-vacancies")}
                      className="text-xs text-brand-blue font-[800] hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  {schoolVacancies.filter((s) => s.adminStatus === "pending").length === 0 ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-[600] rounded-xl border border-emerald-200">
                      All school vacancies have been verified and approved!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {schoolVacancies
                        .filter((s) => s.adminStatus === "pending")
                        .slice(0, 3)
                        .map((s) => (
                          <div key={s.id} className="p-3 bg-brand-bg rounded-xl border border-brand-border flex items-center justify-between gap-3 text-xs">
                            <div className="min-w-0 flex-1">
                              <p className="font-[800] text-brand-navy truncate">{s.jobTitle}</p>
                              <p className="text-[10px] text-brand-muted font-[500] truncate">{s.schoolName} · {s.schoolLocation}</p>
                            </div>
                            <button
                              onClick={() => handleApproveSchoolVacancy(s.id)}
                              className="px-3 py-1 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full font-[800] text-[11px] shrink-0"
                            >
                              Approve Now
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── 2. PARENT TUITIONS MODERATION ───────────────────────── */}
          {activeTab === "parent-tuitions" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-brand-border shadow-xs">
                <div>
                  <h2 className="text-lg font-[900] text-brand-navy">Parent Tuitions Verification Desk</h2>
                  <p className="text-xs text-brand-muted font-[500] mt-0.5">
                    Verify and approve home &amp; online tuition requests posted by parents. Approved requests become visible on the Tutor Dashboard without revealing private contact info.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-brand-bg p-1 rounded-full border border-brand-border text-xs font-[700]">
                  <button
                    onClick={() => setPreviewMode("admin")}
                    className={`px-3.5 py-1.5 rounded-full transition-all ${
                      previewMode === "admin" ? "bg-brand-navy text-white shadow-xs" : "text-brand-muted hover:text-brand-navy"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 inline mr-1" /> Admin View (Full Details)
                  </button>
                  <button
                    onClick={() => setPreviewMode("tutor")}
                    className={`px-3.5 py-1.5 rounded-full transition-all ${
                      previewMode === "tutor" ? "bg-emerald-600 text-white shadow-xs" : "text-brand-muted hover:text-brand-navy"
                    }`}
                  >
                    <EyeOff className="w-3.5 h-3.5 inline mr-1" /> Tutor View (Anonymized)
                  </button>
                </div>
              </div>

              {/* Tuitions List */}
              <div className="space-y-4">
                {parentTuitions.map((req) => (
                  <div
                    key={req.id}
                    className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all space-y-4 ${
                      req.adminStatus === "pending"
                        ? "border-amber-300 ring-2 ring-amber-100"
                        : req.adminStatus === "approved"
                        ? "border-emerald-200"
                        : "border-rose-200 bg-rose-50/20"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`text-[10px] font-[800] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              req.adminStatus === "pending"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : req.adminStatus === "approved"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-rose-100 text-rose-800 border border-rose-300"
                            }`}
                          >
                            Status: {req.adminStatus}
                          </span>
                          <span className="text-xs text-brand-muted font-[500]">{req.postedDate}</span>
                          <span className="text-[10px] font-[700] bg-brand-blue-light text-brand-blue px-2 py-0.5 rounded-full">
                            ● {req.tuitionMode} Tuition
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-[900] text-brand-navy leading-snug">{req.title}</h3>
                      </div>

                      {/* Verification Action Buttons */}
                      <div className="flex items-center gap-2">
                        {req.adminStatus !== "approved" && (
                          <button
                            onClick={() => handleApproveParentTuition(req.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-[800] text-xs px-4 py-2 rounded-full transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve &amp; Publish
                          </button>
                        )}
                        {req.adminStatus !== "rejected" && (
                          <button
                            onClick={() => handleRejectParentTuition(req.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-[800] text-xs px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject Post
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-brand-text font-[500] leading-relaxed">{req.description}</p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-brand-bg rounded-xl p-3.5 border border-brand-border text-xs">
                      <div>
                        <p className="text-[10px] text-brand-muted font-[600] uppercase">Grade &amp; Mode</p>
                        <p className="font-[800] text-brand-navy">{req.gradeLevel} ({req.tuitionMode})</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-brand-muted font-[600] uppercase">Budget Rate</p>
                        <p className="font-[800] text-brand-navy">{req.budget}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-brand-muted font-[600] uppercase">Location</p>
                        <p className="font-[800] text-brand-navy">{req.location}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-brand-muted font-[600] uppercase">Timing &amp; Gender</p>
                        <p className="font-[800] text-brand-navy">{req.timing} · {req.genderPreference}</p>
                      </div>
                    </div>

                    {/* Sensitivity Banner: Admin Full View vs Tutor Anonymized View */}
                    <div className="p-3.5 rounded-xl border text-xs space-y-1">
                      {previewMode === "admin" ? (
                        <div className="bg-blue-50/70 border-blue-200 text-brand-navy space-y-1 p-2 rounded-lg">
                          <p className="font-[800] text-brand-blue flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> Admin View (Private Contact Details Visible to Admin):
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs font-[600] text-brand-navy">
                            <span>Parent Name: <strong>{req.parentName}</strong></span>
                            <span>Phone: <strong>{req.parentPhone}</strong></span>
                            <span>Email: <strong>{req.parentEmail}</strong></span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-emerald-50/80 border-emerald-300 text-emerald-900 space-y-1 p-2 rounded-lg">
                          <p className="font-[800] text-emerald-700 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Tutor View (Anonymized on Tutor Dashboard):
                          </p>
                          <p className="text-xs font-[500] text-emerald-800">
                            Tutor sees ONLY salary, subject requirements, timing, gender, &amp; location. Parent name, email, and phone number are hidden until matched!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── 3. SCHOOL VACANCIES MODERATION ──────────────────────── */}
          {activeTab === "school-vacancies" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-brand-border shadow-xs">
                <div>
                  <h2 className="text-lg font-[900] text-brand-navy">School Faculty Vacancies Verification Desk</h2>
                  <p className="text-xs text-brand-muted font-[500] mt-0.5">
                    Review and verify teacher job postings from registered schools and colleges in Nepal. Approved vacancies appear live for qualified tutors.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-brand-bg p-1 rounded-full border border-brand-border text-xs font-[700]">
                  <button
                    onClick={() => setPreviewMode("admin")}
                    className={`px-3.5 py-1.5 rounded-full transition-all ${
                      previewMode === "admin" ? "bg-brand-navy text-white shadow-xs" : "text-brand-muted hover:text-brand-navy"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 inline mr-1" /> Admin View (Full Details)
                  </button>
                  <button
                    onClick={() => setPreviewMode("tutor")}
                    className={`px-3.5 py-1.5 rounded-full transition-all ${
                      previewMode === "tutor" ? "bg-emerald-600 text-white shadow-xs" : "text-brand-muted hover:text-brand-navy"
                    }`}
                  >
                    <EyeOff className="w-3.5 h-3.5 inline mr-1" /> Tutor View (Anonymized)
                  </button>
                </div>
              </div>

              {/* Vacancies List */}
              <div className="space-y-4">
                {schoolVacancies.map((vac) => (
                  <div
                    key={vac.id}
                    className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all space-y-4 ${
                      vac.adminStatus === "pending"
                        ? "border-amber-300 ring-2 ring-amber-100"
                        : vac.adminStatus === "approved"
                        ? "border-emerald-200"
                        : "border-rose-200 bg-rose-50/20"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-teal-light border border-brand-teal/30 flex items-center justify-center shrink-0 overflow-hidden">
                          {previewMode === "admin" ? (
                            <img src={vac.schoolLogo} alt={vac.schoolName} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="w-6 h-6 text-brand-teal-dark" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-[800] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                vac.adminStatus === "pending"
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : vac.adminStatus === "approved"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : "bg-rose-100 text-rose-800 border border-rose-300"
                              }`}
                            >
                              Status: {vac.adminStatus}
                            </span>
                            <span className="text-xs text-brand-muted font-[500]">{vac.postedDate}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-[900] text-brand-navy leading-snug">{vac.jobTitle}</h3>
                          <p className="text-xs font-[700] text-brand-teal-dark">
                            {previewMode === "admin" ? vac.schoolName : "Verified Educational Institution"} · {vac.schoolLocation}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        {vac.adminStatus !== "approved" && (
                          <button
                            onClick={() => handleApproveSchoolVacancy(vac.id)}
                            className="bg-brand-teal hover:bg-brand-teal-dark text-white font-[800] text-xs px-4 py-2 rounded-full transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve &amp; Publish
                          </button>
                        )}
                        {vac.adminStatus !== "rejected" && (
                          <button
                            onClick={() => handleRejectSchoolVacancy(vac.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-[800] text-xs px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject Vacancy
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-brand-text font-[500] leading-relaxed">{vac.description}</p>

                    {/* Requirements */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-brand-bg rounded-xl p-3.5 border border-brand-border text-xs">
                      <div>
                        <p className="text-[10px] text-brand-muted font-[600] uppercase">Salary</p>
                        <p className="font-[800] text-brand-navy">{vac.salary}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-brand-muted font-[600] uppercase">Qualification Required</p>
                        <p className="font-[800] text-brand-navy">{vac.qualificationRequired}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-brand-muted font-[600] uppercase">Experience Required</p>
                        <p className="font-[800] text-brand-navy">{vac.experienceRequired}</p>
                      </div>
                    </div>

                    {/* Sensitivity Banner */}
                    <div className="p-3.5 rounded-xl border text-xs space-y-1">
                      {previewMode === "admin" ? (
                        <div className="bg-blue-50/70 border-blue-200 text-brand-navy space-y-1 p-2 rounded-lg">
                          <p className="font-[800] text-brand-blue flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> Admin Full View (Institution Contacts):
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs font-[600] text-brand-navy">
                            <span>Institution: <strong>{vac.schoolName}</strong></span>
                            <span>Phone: <strong>{vac.schoolPhone}</strong></span>
                            <span>Email: <strong>{vac.schoolEmail}</strong></span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-emerald-50/80 border-emerald-300 text-emerald-900 space-y-1 p-2 rounded-lg">
                          <p className="font-[800] text-emerald-700 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Tutor View (School Logo &amp; Direct Phone Hidden):
                          </p>
                          <p className="text-xs font-[500] text-emerald-800">
                            Tutor sees ONLY vacancy details, qualification, &amp; salary. Direct phone and logo are hidden until application screening!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── 4. TUITION APPLICATIONS ──────────────────────────────── */}
          {activeTab === "tuition-applications" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs">
                <h2 className="text-lg font-[900] text-brand-navy">Parent Tuition Applications Tracking</h2>
                <p className="text-xs text-brand-muted font-[500] mt-0.5">
                  Track tutor applications submitted for parent home and online tuitions across Nepal.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-brand-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-brand-bg/80 border-b border-brand-border text-brand-navy font-[800]">
                        <th className="p-3.5">Tutor Name</th>
                        <th className="p-3.5">Tuition Request</th>
                        <th className="p-3.5">Qualification &amp; Exp</th>
                        <th className="p-3.5">Applied Date</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {tuitionApps.map((app) => (
                        <tr key={app.id} className="hover:bg-brand-bg/40 transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <img src={app.tutorPhoto} alt={app.tutorName} className="w-8 h-8 rounded-full border" />
                              <div>
                                <p className="font-[800] text-brand-navy">{app.tutorName}</p>
                                <p className="text-[10px] text-brand-muted">{app.tutorPhone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <p className="font-[800] text-brand-navy max-w-xs truncate">{app.tuitionTitle}</p>
                            <span className="text-[10px] font-[700] text-brand-blue">{app.tuitionMode} Tuition</span>
                          </td>
                          <td className="p-3.5 font-[500]">
                            <p className="text-brand-navy font-[700]">{app.tutorQualification}</p>
                            <p className="text-brand-muted">{app.tutorExperience} years experience</p>
                          </td>
                          <td className="p-3.5 text-brand-muted font-[500]">{app.appliedDate}</td>
                          <td className="p-3.5">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-[800] bg-blue-50 text-brand-blue border border-blue-200">
                              {app.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button className="px-3 py-1 bg-brand-blue text-white rounded-full font-[800] text-[11px] hover:bg-brand-blue-dark transition-all cursor-pointer">
                              Forward to Parent
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── 5. SCHOOL APPLICATIONS ───────────────────────────────── */}
          {activeTab === "school-applications" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs">
                <h2 className="text-lg font-[900] text-brand-navy">School Faculty Applications Tracking</h2>
                <p className="text-xs text-brand-muted font-[500] mt-0.5">
                  Review tutor resumes/CVs submitted for school teacher &amp; lecturer job vacancies.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-brand-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-brand-bg/80 border-b border-brand-border text-brand-navy font-[800]">
                        <th className="p-3.5">Applicant Tutor</th>
                        <th className="p-3.5">Target Vacancy &amp; School</th>
                        <th className="p-3.5">Attached CV</th>
                        <th className="p-3.5">Applied Date</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {schoolApps.map((app) => (
                        <tr key={app.id} className="hover:bg-brand-bg/40 transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <img src={app.tutorPhoto} alt={app.tutorName} className="w-8 h-8 rounded-full border" />
                              <div>
                                <p className="font-[800] text-brand-navy">{app.tutorName}</p>
                                <p className="text-[10px] text-brand-muted">{app.tutorQualification}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <p className="font-[800] text-brand-navy">{app.jobTitle}</p>
                            <p className="text-[10px] text-brand-teal-dark font-[600]">{app.schoolName}</p>
                          </td>
                          <td className="p-3.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-[700] text-brand-blue bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                              <FileText className="w-3.5 h-3.5" /> {app.cvFileName}
                            </span>
                          </td>
                          <td className="p-3.5 text-brand-muted font-[500]">{app.appliedDate}</td>
                          <td className="p-3.5">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-[800] bg-teal-50 text-brand-teal-dark border border-teal-200">
                              {app.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button className="px-3 py-1 bg-brand-teal text-white rounded-full font-[800] text-[11px] hover:bg-brand-teal-dark transition-all cursor-pointer">
                              Forward to School HR
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── 6. USERS MANAGEMENT & DELETION ──────────────────────── */}
          {activeTab === "users" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-[900] text-brand-navy">User Accounts &amp; Deletion Management</h2>
                  <p className="text-xs text-brand-muted font-[500] mt-0.5">
                    Manage registered Tutors, Parents, and Schools/Institutes. Delete accounts or toggle verification status.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-48 sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-brand-muted" />
                    <Input
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="pl-8 text-xs h-9 rounded-full border-brand-border"
                    />
                  </div>
                </div>
              </div>

              {/* Role filter buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "All Users", count: users.length },
                  { id: "tutor", label: "Tutors", count: users.filter((u) => u.role === "tutor").length },
                  { id: "parent", label: "Parents", count: users.filter((u) => u.role === "parent").length },
                  { id: "school", label: "Schools & Institutes", count: users.filter((u) => u.role === "school").length },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setUserRoleFilter(f.id as any)}
                    className={`px-4 py-2 rounded-full text-xs font-[800] transition-all cursor-pointer ${
                      userRoleFilter === f.id
                        ? "bg-brand-navy text-white shadow-xs"
                        : "bg-white text-brand-navy border border-brand-border hover:bg-brand-bg"
                    }`}
                  >
                    {f.label} ({f.count})
                  </button>
                ))}
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl border border-brand-border shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-brand-bg/80 border-b border-brand-border text-brand-navy font-[800]">
                        <th className="p-3.5">Name &amp; Role</th>
                        <th className="p-3.5">Contact Info</th>
                        <th className="p-3.5">Location &amp; Details</th>
                        <th className="p-3.5">Verified Status</th>
                        <th className="p-3.5">Joined Date</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {users
                        .filter((u) => userRoleFilter === "all" || u.role === userRoleFilter)
                        .filter(
                          (u) =>
                            !userSearch ||
                            u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                            u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                            u.location.toLowerCase().includes(userSearch.toLowerCase())
                        )
                        .map((u) => (
                          <tr key={u.id} className="hover:bg-brand-bg/40 transition-colors">
                            <td className="p-3.5">
                              <p className="font-[800] text-brand-navy">{u.name}</p>
                              <span
                                className={`inline-block text-[9px] font-[800] uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${
                                  u.role === "tutor"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : u.role === "parent"
                                    ? "bg-blue-50 text-brand-blue border border-blue-200"
                                    : "bg-teal-50 text-brand-teal-dark border border-teal-200"
                                }`}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td className="p-3.5 font-[500]">
                              <p className="text-brand-navy font-[600]">{u.email}</p>
                              <p className="text-brand-muted">{u.phone}</p>
                            </td>
                            <td className="p-3.5 font-[500]">
                              <p className="text-brand-navy font-[700]">{u.location}</p>
                              <p className="text-brand-muted truncate max-w-xs">{u.details}</p>
                            </td>
                            <td className="p-3.5">
                              <button
                                onClick={() => handleToggleUserVerification(u.id)}
                                className={`text-[10px] font-[800] px-2.5 py-1 rounded-full border cursor-pointer ${
                                  u.verified
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                    : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                                }`}
                              >
                                {u.verified ? "Verified ✓" : "Unverified"}
                              </button>
                            </td>
                            <td className="p-3.5 text-brand-muted font-[500]">{u.joinedDate}</td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => setUserToDelete(u)}
                                className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-full font-[800] text-[11px] transition-all flex items-center gap-1 ml-auto cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete Account
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── 7. REVIEWS & TESTIMONIALS CMS ───────────────────────── */}
          {activeTab === "reviews-cms" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-[900] text-brand-navy">Platform Reviews &amp; Testimonials CMS</h2>
                  <p className="text-xs text-brand-muted font-[500] mt-0.5">
                    Approve, edit, or reject reviews submitted by Parents, Tutors, Students, and Schools before they publish on the website.
                  </p>
                </div>
                <button
                  onClick={handleOpenCreateReview}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-[800] text-xs px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Testimonial via CMS
                </button>
              </div>

              {/* Reviews Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className={`bg-white rounded-2xl border p-5 shadow-xs space-y-3 flex flex-col justify-between ${
                      r.status === "pending"
                        ? "border-amber-300 ring-2 ring-amber-100"
                        : r.status === "approved"
                        ? "border-emerald-200"
                        : "border-rose-200 opacity-60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-[800] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              r.authorRole === "Parent"
                                ? "bg-blue-50 text-brand-blue"
                                : r.authorRole === "Tutor"
                                ? "bg-emerald-50 text-emerald-700"
                                : r.authorRole === "School"
                                ? "bg-teal-50 text-brand-teal-dark"
                                : "bg-purple-50 text-purple-700"
                            }`}
                          >
                            {r.authorRole} Review
                          </span>
                          <span
                            className={`text-[9px] font-[800] px-2.5 py-0.5 rounded-full ${
                              r.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : r.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            Status: {r.status}
                          </span>
                        </div>
                        <span className="text-[10px] text-brand-muted font-[500]">{r.date}</span>
                      </div>

                      <div className="flex items-center gap-1 mb-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "fill-amber-400" : "text-slate-200"}`} />
                        ))}
                      </div>

                      <h4 className="font-[800] text-brand-navy text-sm mb-1">{r.title}</h4>
                      <p className="text-xs text-brand-text font-[500] leading-relaxed mb-3">"{r.feedback}"</p>
                      <p className="text-[11px] font-[700] text-brand-navy">{r.authorName} · <span className="text-brand-muted font-[500]">{r.location}</span></p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                      <div className="flex items-center gap-1.5">
                        {r.status !== "approved" && (
                          <button
                            onClick={() => handleApproveReview(r.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-[800] text-[11px] cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                        {r.status !== "rejected" && (
                          <button
                            onClick={() => handleRejectReview(r.id)}
                            className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-full font-[800] text-[11px] cursor-pointer"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditReview(r)}
                          className="p-1.5 text-brand-blue hover:bg-brand-blue-light rounded-full transition-colors cursor-pointer"
                          title="Edit Review Content"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(r.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── 8. ADMIN SETTINGS ───────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs space-y-4">
                <h2 className="text-lg font-[900] text-brand-navy">Admin System Configuration</h2>
                <p className="text-xs text-brand-muted font-[500]">
                  Configure automatic verification rules, WhatsApp coordinator numbers, and admin notification dispatch parameters.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="bg-brand-bg rounded-xl p-4 border border-brand-border space-y-2">
                    <Label className="text-xs font-[800] text-brand-navy">Parent Coordinator WhatsApp Number</Label>
                    <Input defaultValue="+977 9762511114" className="text-xs bg-white rounded-xl font-[600]" />
                  </div>

                  <div className="bg-brand-bg rounded-xl p-4 border border-brand-border space-y-2">
                    <Label className="text-xs font-[800] text-brand-navy">Auto-Verification Criteria</Label>
                    <div className="space-y-2 text-xs font-[500] text-brand-navy">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded text-brand-blue" />
                        Require manual admin verification before tuition post appears on Tutor Portal
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded text-brand-blue" />
                        Anonymize parent phone, email, &amp; school logo until candidate screening
                      </label>
                    </div>
                  </div>

                  <Button className="bg-brand-navy hover:bg-slate-950 text-white font-[800] rounded-full text-xs h-10 px-6 shadow-md">
                    Save System Settings
                  </Button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── USER DELETION CONFIRMATION MODAL ─────────────────────────────────────── */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-brand-border shadow-2xl space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-[900] text-brand-navy">Delete Account</h3>
                <p className="text-xs text-brand-muted font-[500] mt-0.5">Are you sure you want to permanently delete this user?</p>
              </div>
            </div>

            <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200 text-xs text-rose-900 font-[600] space-y-1">
              <p>User: <strong>{userToDelete.name}</strong> ({userToDelete.role.toUpperCase()})</p>
              <p className="text-[11px] font-[400] text-rose-700">Email: {userToDelete.email}</p>
              <p className="text-[11px] font-[400] text-rose-700">This action cannot be undone and will remove all profile data.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-5 py-2.5 rounded-full border border-brand-border text-brand-navy font-[700] text-xs hover:bg-brand-bg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-[800] text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Yes, Delete User Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── REVIEWS CMS MODAL ─────────────────────────────────────── */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-brand-border shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-[900] text-brand-navy">
                {editingReview ? "Edit Review via CMS" : "Add Official Testimonial via CMS"}
              </h3>
              <button
                onClick={() => setShowAddReviewModal(false)}
                className="p-1 rounded-full text-brand-muted hover:bg-brand-bg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReviewCMS} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-[800] text-brand-navy">Author Name *</Label>
                  <Input
                    value={reviewForm.authorName}
                    onChange={(e) => setReviewForm({ ...reviewForm, authorName: e.target.value })}
                    required
                    placeholder="e.g. Ramesh Adhikari"
                    className="text-xs rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs font-[800] text-brand-navy">Author Role *</Label>
                  <select
                    value={reviewForm.authorRole}
                    onChange={(e) => setReviewForm({ ...reviewForm, authorRole: e.target.value as any })}
                    className="w-full text-xs font-[600] text-brand-navy bg-white border border-brand-border rounded-xl p-2.5"
                  >
                    <option value="Parent">Parent</option>
                    <option value="Tutor">Tutor</option>
                    <option value="Student">Student</option>
                    <option value="School">School</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-xs font-[800] text-brand-navy">Location</Label>
                <Input
                  value={reviewForm.location}
                  onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                  placeholder="e.g. New Baneshwor, Kathmandu"
                  className="text-xs rounded-xl"
                />
              </div>

              <div>
                <Label className="text-xs font-[800] text-brand-navy">Review Title *</Label>
                <Input
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  required
                  placeholder="e.g. Exceptional home tutor found within 24 hours!"
                  className="text-xs rounded-xl"
                />
              </div>

              <div>
                <Label className="text-xs font-[800] text-brand-navy">Feedback Text *</Label>
                <textarea
                  rows={4}
                  value={reviewForm.feedback}
                  onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                  required
                  placeholder="Write feedback..."
                  className="w-full text-xs font-[500] border border-brand-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddReviewModal(false)}
                  className="rounded-full border-brand-border text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-[800]"
                >
                  Save Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SIGN OUT CONFIRMATION MODAL ─────────────────────────────────────── */}
      {showSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-brand-border shadow-2xl space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                <LogOut className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-[900] text-brand-navy">Sign Out Admin</h3>
                <p className="text-xs text-brand-muted font-[500] mt-0.5">Are you sure you want to log out of Mero Tutor Admin Panel?</p>
              </div>
            </div>

            <div className="bg-brand-bg/60 rounded-2xl p-4 border border-brand-border/60 text-xs text-brand-navy font-[600]">
              You will need to sign in again to verify posts and moderate platform data.
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
                Yes, Sign Out Admin
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
