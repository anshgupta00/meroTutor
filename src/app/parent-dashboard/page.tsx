"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Briefcase,
  Star,
  Plus,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Wifi,
  Home,
  Menu,
  X,
  LayoutDashboard,
  TrendingUp,
  Camera,
  Save,
  Search,
  MessageSquare,
  ShieldCheck,
  Edit3,
  Trash2,
  LogOut,
  Globe,
  Settings,
  UserCheck,
  Sparkles,
  BookOpen,
  Calendar,
  Filter,
  DollarSign,
  Users,
  Bell,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────────────────────
   TYPES & DATA MODELS
───────────────────────────────────────────── */

export interface ParentChildInfo {
  name: string;
  grade: string;
  school: string;
  targetSubjects: string[];
}

export interface ParentProfile {
  name: string;
  email: string;
  phone: string;
  photo: string;
  location: string;
  preferredMode: "home" | "online" | "both";
  budgetRange: string;
  bio: string;
  children: ParentChildInfo[];
}

export interface TuitionRequirement {
  id: string;
  title: string;
  gradeLevel: string;
  subjects: string[];
  tuitionMode: "Home" | "Online" | "Both";
  genderPreference: "Any" | "Male Tutor Required" | "Female Tutor Required";
  location: string;
  budget: string;
  timing: string;
  daysPerWeek: string;
  urgency: "Urgent" | "Normal";
  status: "active" | "matched" | "closed";
  postedDate: string;
  applicantCount: number;
  description: string;
  studentsCount?: string;
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
  bio: string;
}

export interface SelectedTutorRequest {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorPhoto: string;
  subject: string;
  classLevel: string;
  tuitionMode: "Home" | "Online";
  status: "Pending Contact" | "Demo Scheduled" | "Hired" | "Completed";
  requestDate: string;
  notes: string;
}

export interface ParentReview {
  id: string;
  parentName: string;
  location: string;
  rating: number;
  tutorQuality: number;
  matchingSpeed: number;
  platformEase: number;
  title: string;
  feedback: string;
  date: string;
  isMyReview?: boolean;
}

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */

const MOCK_PARENT_PROFILE: ParentProfile = {
  name: "Ramesh Adhikari",
  email: "ramesh.adhikari@gmail.com",
  phone: "+977 9851012345",
  photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=ramesh&backgroundColor=b6e3f4",
  location: "New Baneshwor, Kathmandu",
  preferredMode: "both",
  budgetRange: "NPR 9,000 – 15,000 / month",
  bio: "Parent looking for patient, qualified home & online tutors for my son in Grade 10 (SEE preparation) and daughter in Grade 6.",
  children: [
    {
      name: "Aayush Adhikari",
      grade: "Class 10 (SEE)",
      school: "St. Xavier's School, Jawalakhel",
      targetSubjects: ["Compulsory Mathematics", "Optional Math", "Physics"],
    },
    {
      name: "Ananya Adhikari",
      grade: "Class 6",
      school: "Little Angels' High School",
      targetSubjects: ["English", "Science", "Social Studies"],
    },
  ],
};

const MOCK_TUITION_REQUIREMENTS: TuitionRequirement[] = [
  {
    id: "req-101",
    title: "SEE Compulsory Math & Science Home Tutor",
    gradeLevel: "Class 10 (SEE)",
    subjects: ["Mathematics", "Science"],
    tuitionMode: "Home",
    genderPreference: "Male Tutor Required",
    location: "New Baneshwor, Kathmandu",
    budget: "NPR 10,000 – 12,000 / month",
    timing: "5:00 PM – 6:30 PM (Evening Shift)",
    daysPerWeek: "6 days/week",
    urgency: "Urgent",
    status: "active",
    postedDate: "2024-09-22",
    applicantCount: 5,
    description: "Looking for an experienced home tutor for Grade 10 SEE preparation with emphasis on algebra, geometry and physics numericals.",
  },
  {
    id: "req-102",
    title: "Grade 6 All Subjects Online Tutor",
    gradeLevel: "Class 6",
    subjects: ["English", "Science", "Mathematics"],
    tuitionMode: "Online",
    genderPreference: "Female Tutor Required",
    location: "Online / Home",
    budget: "NPR 8,000 – 10,000 / month",
    timing: "4:00 PM – 5:30 PM (Afternoon Shift)",
    daysPerWeek: "5 days/week",
    urgency: "Normal",
    status: "active",
    postedDate: "2024-09-20",
    applicantCount: 3,
    description: "Online interactive tuition for primary/lower secondary level. Needs friendly tutor for homework help and reading practice.",
  },
];

const MOCK_TUTORS_DIRECTORY: TutorProfile[] = [
  {
    id: "tut-1",
    name: "Anish Shrestha",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=anish&backgroundColor=b6e3f4",
    qualification: "BScIT, Tribhuvan University",
    experience: 4,
    subjects: ["Mathematics", "Physics", "Computer"],
    classes: ["Class 8", "Class 9", "Class 10 (SEE)", "+2 Science"],
    location: "Kathmandu (Baneshwor / Koteshwor)",
    teachingMode: "both",
    rating: 4.8,
    reviewCount: 23,
    rate: "NPR 10,000 – 15,000 / mo",
    isVerified: true,
    bio: "Specialised in SEE Board Math and Physics. 4+ years tutoring experience with proven track record of GPA 3.6+ student results.",
  },
  {
    id: "tut-2",
    name: "Suman Adhikari",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=suman&backgroundColor=c0aede",
    qualification: "M.Sc. Physics, Kirtipur TU",
    experience: 6,
    subjects: ["Physics", "Mathematics", "Science"],
    classes: ["Class 10", "+2 Science", "Entrance Prep"],
    location: "Lalitpur (Jawalakhel / Lagankhel)",
    teachingMode: "home",
    rating: 4.9,
    reviewCount: 31,
    rate: "NPR 12,000 – 18,000 / mo",
    isVerified: true,
    bio: "Senior Physics tutor. Focus on conceptual understanding, numerical problem solving, and exam technique.",
  },
  {
    id: "tut-3",
    name: "Pooja Gurung",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=pooja&backgroundColor=ffdfbf",
    qualification: "M.A. English, Gold Medalist",
    experience: 5,
    subjects: ["English", "Social Studies", "Creative Writing"],
    classes: ["Class 4", "Class 5", "Class 6", "Class 7", "Class 8"],
    location: "Kathmandu / Bhaktapur",
    teachingMode: "both",
    rating: 4.7,
    reviewCount: 19,
    rate: "NPR 9,000 – 14,000 / mo",
    isVerified: true,
    bio: "Passionate language & primary educator helping young learners excel in English grammar, handwriting, and social studies.",
  },
  {
    id: "tut-4",
    name: "Rohan Pokharel",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=rohan&backgroundColor=d1d4f9",
    qualification: "B.E. Computer Engineering",
    experience: 3,
    subjects: ["Computer Science", "QBASIC / C", "Math"],
    classes: ["Class 8", "Class 9", "Class 10", "+2 Computer"],
    location: "Online / Kathmandu",
    teachingMode: "online",
    rating: 4.6,
    reviewCount: 14,
    rate: "NPR 8,000 – 12,000 / mo",
    isVerified: true,
    bio: "Tech enthusiast providing interactive online coding & computer science classes for school and college students.",
  },
  {
    id: "tut-5",
    name: "Prashant Thapa",
    photo: "https://api.dicebear.com/8.x/avataaars/svg?seed=prashant&backgroundColor=b6e3f4",
    qualification: "M.Sc. Chemistry, Pulchowk Campus",
    experience: 7,
    subjects: ["Chemistry", "Science"],
    classes: ["Class 9", "Class 10", "+2 Science", "MBBS / CEE Prep"],
    location: "Lalitpur / Kathmandu",
    teachingMode: "both",
    rating: 4.95,
    reviewCount: 42,
    rate: "NPR 14,000 – 20,000 / mo",
    isVerified: true,
    bio: "Experienced Chemistry faculty for SEE, NEB +2, and CEE medical entrance aspirants.",
  },
];

const MOCK_SELECTED_TUTORS: SelectedTutorRequest[] = [
  {
    id: "sel-201",
    tutorId: "tut-1",
    tutorName: "Anish Shrestha",
    tutorPhoto: "https://api.dicebear.com/8.x/avataaars/svg?seed=anish&backgroundColor=b6e3f4",
    subject: "SEE Mathematics & Science",
    classLevel: "Class 10 (SEE)",
    tuitionMode: "Home",
    status: "Demo Scheduled",
    requestDate: "2024-09-23",
    notes: "Demo class scheduled for Tuesday at 5:00 PM at New Baneshwor residence.",
  },
  {
    id: "sel-202",
    tutorId: "tut-3",
    tutorName: "Pooja Gurung",
    tutorPhoto: "https://api.dicebear.com/8.x/avataaars/svg?seed=pooja&backgroundColor=ffdfbf",
    subject: "English & Social Studies",
    classLevel: "Class 6",
    tuitionMode: "Online",
    status: "Hired",
    requestDate: "2024-09-18",
    notes: "Active online tuition session 5 days a week.",
  },
];

const MOCK_PARENT_REVIEWS: ParentReview[] = [
  {
    id: "prev-01",
    parentName: "Ramesh Adhikari",
    location: "New Baneshwor, Kathmandu",
    rating: 5,
    tutorQuality: 5,
    matchingSpeed: 5,
    platformEase: 5,
    title: "Found an exceptional SEE Math home tutor within 24 hours!",
    feedback: "Mero Tutor connected us with an outstanding home tutor for my son. The tutor is punctual, background verified, and highly skilled in SEE preparation. Truly 100% free and hassle-free service for parents.",
    date: "2024-09-21",
    isMyReview: true,
  },
  {
    id: "prev-02",
    parentName: "Sunita Karki",
    location: "Jhamsikhel, Lalitpur",
    rating: 5,
    tutorQuality: 5,
    matchingSpeed: 5,
    platformEase: 5,
    title: "Best tutor platform in Nepal for home tuition",
    feedback: "We requested an A-Level Physics online tutor for our daughter. The Mero Tutor team coordinated everything smoothly over WhatsApp and scheduled a free demo class.",
    date: "2024-09-10",
    isMyReview: false,
  },
  {
    id: "prev-03",
    parentName: "Binod Shrestha",
    location: "Suryabinayak, Bhaktapur",
    rating: 5,
    tutorQuality: 5,
    matchingSpeed: 4,
    platformEase: 5,
    title: "Safe, background checked & professional tutors",
    feedback: "As parents, security and tutor credibility were our main concerns. Mero Tutor provided ID-verified home tutors with genuine academic degrees.",
    date: "2024-08-30",
    isMyReview: false,
  },
];

type Tab = "overview" | "vacancies" | "tutors" | "selections" | "reviews" | "profile" | "settings";

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
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export default function ParentDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as Tab | null;
      const validTabs: Tab[] = ["overview", "vacancies", "tutors", "selections", "reviews", "profile", "settings"];
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

  // Profile State
  const [profile, setProfile] = useState<ParentProfile>(MOCK_PARENT_PROFILE);
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [profileForm, setProfileForm] = useState<ParentProfile>({ ...MOCK_PARENT_PROFILE });

  // Children management in profile
  const [newChildName, setNewChildName] = useState("");
  const [newChildGrade, setNewChildGrade] = useState("Class 8");
  const [newChildSchool, setNewChildSchool] = useState("");

  // Tuition Requirements State (Post Vacancies)
  const [requirements, setRequirements] = useState<TuitionRequirement[]>(MOCK_TUITION_REQUIREMENTS);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingRequirementId, setEditingRequirementId] = useState<string | null>(null);

  const [newRequirement, setNewRequirement] = useState<{
    title: string;
    gradeLevel: string;
    customGrade: string;
    subjects: string;
    tuitionMode: "Home" | "Online" | "Both";
    genderPreference: "Any" | "Male Tutor Required" | "Female Tutor Required";
    location: string;
    budget: string;
    timing: string;
    daysPerWeek: string;
    urgency: "Urgent" | "Normal";
    description: string;
  }>({
    title: "",
    gradeLevel: "Class 10 (SEE)",
    customGrade: "",
    subjects: "Mathematics, Science",
    tuitionMode: "Home",
    genderPreference: "Any",
    location: "New Baneshwor, Kathmandu",
    budget: "NPR 10,000 – 12,000 / month",
    timing: "5:00 PM – 6:30 PM (Evening Shift)",
    daysPerWeek: "6 days/week",
    urgency: "Urgent",
    description: "",
  });

  const handleOpenCreateRequirement = () => {
    setEditingRequirementId(null);
    setNewRequirement({
      title: "",
      gradeLevel: "Class 10 (SEE)",
      customGrade: "",
      subjects: "Mathematics, Science",
      tuitionMode: "Home",
      genderPreference: "Any",
      location: profile.location || "New Baneshwor, Kathmandu",
      budget: "NPR 10,000 – 12,000 / month",
      timing: "5:00 PM – 6:30 PM (Evening Shift)",
      daysPerWeek: "6 days/week",
      urgency: "Urgent",
      description: "",
    });
    setShowPostModal(true);
  };

  const handleOpenEditRequirement = (req: TuitionRequirement) => {
    const standardGrades = [
      "Class 1-5 (Primary)",
      "Class 6-7 (Lower Secondary)",
      "Class 8 (BLE Prep)",
      "Class 9-10 (SEE)",
      "+2 Science (Class 11-12)",
      "+2 Management (Class 11-12)",
      "A-Level / IB",
      "Entrance Prep (IOE/IOM/CMAT)",
      "Bachelor Level",
    ];
    const isCustom = !standardGrades.includes(req.gradeLevel);

    setNewRequirement({
      title: req.title,
      gradeLevel: isCustom ? "Other Level" : req.gradeLevel,
      customGrade: isCustom ? req.gradeLevel : "",
      subjects: req.subjects.join(", "),
      tuitionMode: req.tuitionMode,
      genderPreference: req.genderPreference,
      location: req.location,
      budget: req.budget,
      timing: req.timing,
      daysPerWeek: req.daysPerWeek,
      urgency: req.urgency,
      description: req.description || "",
    });
    setEditingRequirementId(req.id);
    setShowPostModal(true);
  };

  const handleToggleRequirementStatus = (id: string) => {
    setRequirements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === "active" ? "closed" : "active" } : r))
    );
  };

  const handleDeleteRequirement = (id: string) => {
    setRequirements((prev) => prev.filter((r) => r.id !== id));
  };

  // Tutors Directory & Selection State
  const [tutors] = useState<TutorProfile[]>(MOCK_TUTORS_DIRECTORY);
  const [tutorSearch, setTutorSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedTeachingMode, setSelectedTeachingMode] = useState<"All" | "Home" | "Online">("All");

  const [selectingTutor, setSelectingTutor] = useState<TutorProfile | null>(null);
  const [selectionNotes, setSelectionNotes] = useState("");
  const [selectionSuccess, setSelectionSuccess] = useState(false);

  // Selected Tutors Tracker State
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorRequest[]>(MOCK_SELECTED_TUTORS);

  // Reviews State
  const [reviews, setReviews] = useState<ParentReview[]>(MOCK_PARENT_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const myReview = reviews.find((r) => r.isMyReview);

  const [reviewForm, setReviewForm] = useState({
    rating: myReview ? myReview.rating : 5,
    tutorQuality: myReview ? myReview.tutorQuality : 5,
    matchingSpeed: myReview ? myReview.matchingSpeed : 5,
    platformEase: myReview ? myReview.platformEase : 5,
    title: myReview ? myReview.title : "Found an exceptional SEE Math home tutor within 24 hours!",
    feedback: myReview
      ? myReview.feedback
      : "Mero Tutor connected us with an outstanding home tutor for my son. Highly recommended 100% free service for parents in Nepal.",
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: "5 verified tutors applied for your SEE Math & Science Home Tuition post.", time: "1 hr ago", read: false },
    { id: 2, text: "Tutor Anish Shrestha accepted your demo class request for Tuesday 5:00 PM.", time: "4 hrs ago", read: false },
    { id: 3, text: "Welcome to Mero Tutor Parent Dashboard! 100% Free Tutor Matching Active.", time: "Yesterday", read: true },
  ]);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // Profile Save
  const handleSaveProfile = () => {
    setProfile({ ...profileForm });
    setEditProfileMode(false);
  };

  const handleAddChild = () => {
    if (!newChildName) return;
    const child: ParentChildInfo = {
      name: newChildName,
      grade: newChildGrade,
      school: newChildSchool || "School in Kathmandu",
      targetSubjects: ["Mathematics", "Science"],
    };
    setProfileForm((prev) => ({ ...prev, children: [...prev.children, child] }));
    setNewChildName("");
    setNewChildSchool("");
  };

  const handleRemoveChild = (index: number) => {
    setProfileForm((prev) => ({ ...prev, children: prev.children.filter((_, i) => i !== index) }));
  };

  // Post or Edit Tuition Requirement
  const handleCreateRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequirement.title) return;

    const finalGrade =
      newRequirement.gradeLevel === "Other Level"
        ? newRequirement.customGrade.trim() || "Custom Grade"
        : newRequirement.gradeLevel;

    const subjectList = newRequirement.subjects.split(",").map((s) => s.trim()).filter(Boolean);

    if (editingRequirementId) {
      setRequirements((prev) =>
        prev.map((req) =>
          req.id === editingRequirementId
            ? {
                ...req,
                title: newRequirement.title,
                gradeLevel: finalGrade,
                subjects: subjectList.length > 0 ? subjectList : ["General"],
                tuitionMode: newRequirement.tuitionMode,
                genderPreference: newRequirement.genderPreference,
                location: newRequirement.location,
                budget: newRequirement.budget,
                timing: newRequirement.timing,
                daysPerWeek: newRequirement.daysPerWeek,
                urgency: newRequirement.urgency,
                description: newRequirement.description || "Looking for qualified home/online tutor.",
              }
            : req
        )
      );
    } else {
      const created: TuitionRequirement = {
        id: `req-${Date.now()}`,
        title: newRequirement.title,
        gradeLevel: finalGrade,
        subjects: subjectList.length > 0 ? subjectList : ["General"],
        tuitionMode: newRequirement.tuitionMode,
        genderPreference: newRequirement.genderPreference,
        location: newRequirement.location,
        budget: newRequirement.budget,
        timing: newRequirement.timing,
        daysPerWeek: newRequirement.daysPerWeek,
        urgency: newRequirement.urgency,
        status: "active",
        postedDate: new Date().toISOString().split("T")[0],
        applicantCount: 0,
        description: newRequirement.description || "Looking for qualified home/online tutor.",
      };
      setRequirements((prev) => [created, ...prev]);
    }

    setEditingRequirementId(null);
    setShowPostModal(false);
    setNewRequirement({
      title: "",
      gradeLevel: "Class 10 (SEE)",
      customGrade: "",
      subjects: "Mathematics, Science",
      tuitionMode: "Home",
      genderPreference: "Any",
      location: profile.location,
      budget: "NPR 10,000 – 12,000 / month",
      timing: "5:00 PM – 6:30 PM (Evening Shift)",
      daysPerWeek: "6 days/week",
      urgency: "Urgent",
      description: "",
    });
  };

  // Request / Select Tutor
  const handleSelectTutor = async () => {
    if (!selectingTutor) return;

    await new Promise((r) => setTimeout(r, 600));

    const newReq: SelectedTutorRequest = {
      id: `sel-${Date.now()}`,
      tutorId: selectingTutor.id,
      tutorName: selectingTutor.name,
      tutorPhoto: selectingTutor.photo,
      subject: selectingTutor.subjects.slice(0, 2).join(" & "),
      classLevel: selectingTutor.classes[0] || "Class 10 (SEE)",
      tuitionMode: selectingTutor.teachingMode === "online" ? "Online" : "Home",
      status: "Pending Contact",
      requestDate: new Date().toISOString().split("T")[0],
      notes: selectionNotes || "Selected tutor profile from parent dashboard.",
    };

    setSelectedTutors((prev) => [newReq, ...prev]);
    setSelectionSuccess(true);
    setTimeout(() => {
      setSelectionSuccess(false);
      setSelectingTutor(null);
      setSelectionNotes("");
    }, 1800);
  };

  // Save Review
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.title || !reviewForm.feedback) return;

    const newRev: ParentReview = {
      id: myReview ? myReview.id : `prev-${Date.now()}`,
      parentName: profile.name,
      location: profile.location,
      rating: reviewForm.rating,
      tutorQuality: reviewForm.tutorQuality,
      matchingSpeed: reviewForm.matchingSpeed,
      platformEase: reviewForm.platformEase,
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

  // Filtered Tutors
  const filteredTutors = tutors.filter((t) => {
    const q = tutorSearch.toLowerCase();
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.qualification.toLowerCase().includes(q) ||
      t.subjects.join(" ").toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q);

    const matchesSubject = selectedSubject === "All" || t.subjects.includes(selectedSubject);
    const matchesMode =
      selectedTeachingMode === "All" ||
      t.teachingMode === "both" ||
      t.teachingMode === selectedTeachingMode.toLowerCase();

    return matchesSearch && matchesSubject && matchesMode;
  });

  const NAV_ITEMS: { id: Tab; label: string; icon: React.ElementType; badge?: number; highlight?: boolean }[] = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "vacancies", label: "Post & Manage Tuitions", icon: Briefcase, badge: requirements.filter((r) => r.status === "active").length, highlight: true },
    { id: "tutors", label: "Browse & Select Tutors", icon: Users, badge: tutors.length },
    { id: "selections", label: "My Selected Tutors", icon: UserCheck, badge: selectedTutors.length },
    { id: "reviews", label: "Review Mero Tutor", icon: Star, badge: reviews.length },
    { id: "profile", label: "Parent Profile", icon: User },
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
          <p className="text-[10px] text-brand-blue font-[800] uppercase tracking-wider mt-1.5 flex items-center gap-1">
            <Home className="w-3 h-3 text-brand-blue" /> Parent Portal &amp; Tutor Desk
          </p>
        </div>

        {/* Parent mini-profile */}
        <div className="p-4 border-b border-brand-border bg-brand-bg/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-brand-blue-light border-2 border-brand-blue/30 flex-shrink-0">
              <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-[800] text-brand-navy truncate">{profile.name}</p>
              <p className="text-[10px] text-brand-muted font-[600] truncate">{profile.location}</p>
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
                        ? "bg-brand-blue-light text-brand-blue font-[800]"
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
              <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">

          {/* ─── OVERVIEW ─────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="max-w-5xl mx-auto space-y-6">

              {/* Welcome banner */}
              <div className="relative overflow-hidden bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 rounded-3xl p-6 sm:p-8 text-brand-navy border border-brand-teal/30 shadow-md">
                <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/10 rounded-full -translate-y-20 translate-x-20 blur-2xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 bg-brand-blue-light text-brand-blue border border-brand-blue/30 px-3 py-1 rounded-full text-xs font-[800] mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" /> 100% Free Service for Parents
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-[900] text-brand-navy tracking-tight mb-1">Namaste, {profile.name}!</h2>
                  <p className="text-brand-muted text-sm font-[500] mb-5 max-w-xl">
                    Manage tuition posts for your children ({profile.children.map((c) => c.name).join(", ")}), select verified home or online tutors, and track your tutor requests.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={handleOpenCreateRequirement}
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-[800] px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Post Home/Online Tuition
                    </button>
                    <button
                      onClick={() => setActiveTab("tutors")}
                      className="bg-white hover:bg-brand-blue-light/50 text-brand-navy border border-brand-border text-xs font-[800] px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <Users className="w-3.5 h-3.5 text-brand-blue" />
                      Browse Tutors ({tutors.length})
                    </button>
                    <a
                      href="https://wa.me/9779762511114?text=Namaste!%20I%20am%20a%20parent%20looking%20for%20a%20tutor%20for%20my%20child."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-[800] px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Contact Us via WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Active Tuition Posts" value={requirements.filter((r) => r.status === "active").length} sub="Open for tutor applications" color="text-brand-blue" />
                <StatCard label="Selected Tutors" value={selectedTutors.length} sub="Requested or hired" color="text-emerald-600" />
                <StatCard label="Verified Tutors" value={`${tutors.length}+`} sub="In Kathmandu & Nepal" color="text-brand-teal-dark" />
                <StatCard label="Parent Reviews" value={reviews.length} sub="Community testimonials" color="text-amber-500" />
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Plus, label: "Post Tuition Opening", desc: "Post home or online tuition requirement", color: "text-brand-blue bg-brand-blue-light", action: handleOpenCreateRequirement },
                  { icon: Users, label: "Browse & Select Tutors", desc: "Inspect verified tutor profiles", color: "text-brand-teal-dark bg-brand-teal-light", action: () => setActiveTab("tutors") },
                  { icon: UserCheck, label: "My Selected Tutors", desc: "Track requested tutors & demo classes", color: "text-emerald-700 bg-emerald-50", action: () => setActiveTab("selections") },
                  { icon: Star, label: "Review Mero Tutor", desc: "Share feedback & rating for platform", color: "text-amber-600 bg-amber-50", action: () => setShowReviewModal(true) },
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

              {/* WhatsApp & Call Desk Callout */}
              <div className="bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 rounded-3xl p-6 text-brand-navy shadow-md border border-brand-teal/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-[800] mb-2">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> Mero Tutor Parent Coordinator Desk
                  </div>
                  <h3 className="text-lg font-[900] text-brand-navy mb-1">Need Urgent Tutor Matching or Personal Assistance?</h3>
                  <p className="text-xs text-brand-muted font-[500] max-w-xl">
                    Connect directly with our parent coordinator over WhatsApp or call. We match background-checked home &amp; online tutors within 24 hours.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  <a
                    href="https://wa.me/9779762511114?text=Namaste!%20I%20am%20a%20parent%20looking%20for%20a%20tutor%20for%20my%20child."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-[800] text-xs px-4 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" /> WhatsApp Coordinator
                  </a>
                  <a
                    href="tel:+9779762511114"
                    className="bg-white hover:bg-slate-50 text-brand-navy border border-brand-border font-[800] text-xs px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-navy" /> Call +977-9762511114
                  </a>
                </div>
              </div>

              {/* Active Tuition Posts Table */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-[900] text-brand-navy">Your Active Tuition Requirements</h2>
                  <button onClick={() => setActiveTab("vacancies")} className="text-xs text-brand-blue font-[800] hover:underline">
                    Manage all ({requirements.length}) →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {requirements.map((req) => (
                    <div key={req.id} className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[10px] font-[800] px-2.5 py-0.5 rounded-full ${
                            req.tuitionMode === "Home"
                              ? "bg-brand-blue-light text-brand-blue border border-brand-blue/30"
                              : "bg-brand-teal-light text-brand-teal-dark border border-brand-teal/30"
                          }`}>
                            ● {req.tuitionMode} Tuition
                          </span>
                          <span className="text-[10px] text-brand-muted font-[500]">{req.postedDate}</span>
                        </div>
                        <h4 className="font-[800] text-brand-navy text-sm mb-1">{req.title}</h4>
                        <div className="flex flex-wrap gap-1.5 items-center mb-2">
                          <span className="text-xs text-brand-blue font-[700]">{req.gradeLevel}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-700 font-[700] px-2 py-0.5 rounded-full border border-slate-200">
                            {req.genderPreference}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {req.subjects.map((s) => (
                            <span key={s} className="text-xs bg-brand-bg text-brand-navy font-[600] border border-brand-border px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-brand-border/60">
                        <span className="text-xs font-[800] text-brand-navy">{req.budget}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-[800] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            {req.applicantCount} Applicants
                          </span>
                          <button
                            onClick={() => handleOpenEditRequirement(req)}
                            className="text-xs font-[800] text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 bg-brand-blue-light/50 border border-brand-blue/20 px-2.5 py-1 rounded-full transition-colors"
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

          {/* ─── POST & MANAGE TUITION VACANCIES TAB ───────────────────── */}
          {activeTab === "vacancies" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-[900] text-brand-navy">Post &amp; Manage Tuition Vacancies</h2>
                  <p className="text-sm text-brand-muted font-[500]">Create new home or online tuition requirements for your children</p>
                </div>
                <Button
                  onClick={handleOpenCreateRequirement}
                  className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[800] rounded-full text-xs h-10 px-5 shadow-md shadow-blue-200 gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Post New Tuition
                </Button>
              </div>

              {/* Vacancies List */}
              <div className="space-y-4">
                {requirements.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-brand-border">
                    <Briefcase className="w-12 h-12 text-brand-muted mx-auto mb-3" />
                    <h3 className="font-[800] text-brand-navy text-lg">No tuition vacancies posted yet</h3>
                    <p className="text-xs text-brand-muted mt-1 font-[500]">Click below to create your first home or online tuition opening.</p>
                    <Button onClick={handleOpenCreateRequirement} className="mt-4 bg-brand-blue text-white rounded-full text-xs font-[800]">
                      + Post First Tuition
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {requirements.map((req) => (
                      <div key={req.id} className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[10px] font-[800] px-2.5 py-0.5 rounded-full ${
                              req.tuitionMode === "Home"
                                ? "bg-brand-blue-light text-brand-blue border border-brand-blue/30"
                                : req.tuitionMode === "Online"
                                ? "bg-brand-teal-light text-brand-teal-dark border border-brand-teal/30"
                                : "bg-purple-50 text-purple-700 border border-purple-200"
                            }`}>
                              ● {req.tuitionMode} Tuition
                            </span>
                            <span className="text-xs text-brand-muted font-[500]">Posted {req.postedDate}</span>
                          </div>

                          <h3 className="font-[900] text-brand-navy text-base mb-1">{req.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs font-[700] text-brand-blue">{req.gradeLevel}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-700 font-[700] px-2 py-0.5 rounded-full border border-slate-200">
                              {req.genderPreference}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {req.subjects.map((s) => (
                              <span key={s} className="text-xs bg-brand-bg text-brand-navy font-[600] border border-brand-border px-2.5 py-0.5 rounded-full">{s}</span>
                            ))}
                          </div>

                          <p className="text-xs text-brand-text line-clamp-2 mb-3 leading-relaxed font-[500]">{req.description}</p>

                          <div className="bg-brand-bg rounded-xl p-3 text-xs text-brand-text mb-3 space-y-1 border border-brand-border">
                            <p className="font-[600] text-brand-navy truncate"><MapPin className="w-3.5 h-3.5 inline mr-1 text-brand-muted" /> Location: {req.location}</p>
                            <p className="font-[500] truncate"><Clock className="w-3.5 h-3.5 inline mr-1 text-brand-muted" /> Timing &amp; Shift: {req.timing} ({req.daysPerWeek})</p>
                          </div>
                        </div>

                        <div>
                          <Separator className="my-3" />
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="text-[10px] text-brand-muted font-[500] uppercase tracking-wide">Budget / Salary</p>
                              <p className="font-[900] text-brand-navy text-xs sm:text-sm">{req.budget}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-xs font-[800] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                {req.applicantCount} Applicants
                              </span>
                              <button
                                onClick={() => handleOpenEditRequirement(req)}
                                className="inline-flex items-center gap-1 text-xs font-[800] bg-brand-blue-light hover:bg-brand-blue/20 text-brand-blue px-3 py-1.5 rounded-full transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" /> Edit
                              </button>
                              <button
                                onClick={() => handleToggleRequirementStatus(req.id)}
                                className={`text-xs font-[800] px-3 py-1.5 rounded-full transition-colors ${
                                  req.status === "active"
                                    ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                                    : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                                }`}
                              >
                                {req.status === "active" ? "Close" : "Reopen"}
                              </button>
                              <button
                                onClick={() => handleDeleteRequirement(req.id)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors"
                                title="Delete Tuition Requirement"
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

          {/* ─── BROWSE & SELECT TUTORS TAB ──────────────────────────── */}
          {activeTab === "tutors" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 text-brand-navy rounded-3xl p-6 sm:p-8 shadow-md border border-brand-teal/30 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-brand-blue-light text-brand-blue border border-brand-blue/30 px-3 py-1 rounded-full text-xs font-[800] mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" /> Background Verified Tutors Directory
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-[900] text-brand-navy tracking-tight mb-2">
                    Browse &amp; Select Tutors for Your Child
                  </h2>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6 font-[500]">
                    Filter certified home &amp; online tutors in Nepal. Click &ldquo;Select Tutor&rdquo; on any profile to request a free demo class.
                  </p>

                  {/* Search & Mode Filters */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <Input
                        placeholder="Search by tutor name, qualification, subject, or location..."
                        value={tutorSearch}
                        onChange={(e) => setTutorSearch(e.target.value)}
                        className="pl-10 bg-white border border-brand-teal/20 text-brand-navy placeholder:text-brand-muted text-sm h-11 rounded-xl focus:ring-2 focus:ring-brand-blue/30"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 items-center justify-between">
                      <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
                        {["All", "Mathematics", "Physics", "English", "Chemistry", "Computer"].map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubject(sub)}
                            className={`text-xs font-[800] px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                              selectedSubject === sub
                                ? "bg-brand-blue text-white shadow-xs"
                                : "bg-white text-brand-navy hover:bg-brand-blue-light/50 border border-brand-border"
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-brand-border">
                        {(["All", "Home", "Online"] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setSelectedTeachingMode(mode)}
                            className={`text-xs font-[800] px-3 py-1 rounded-lg transition-all ${
                              selectedTeachingMode === mode
                                ? "bg-brand-blue text-white shadow-xs"
                                : "text-brand-muted hover:text-brand-navy"
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
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
                            <span className="flex items-center gap-1 text-xs font-[800] text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {tutor.rating}
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
                          <p className="text-[10px] text-brand-muted font-[500] uppercase">Tuition Rate</p>
                          <p className="text-xs font-[900] text-brand-navy">{tutor.rate}</p>
                        </div>
                        <Button
                          onClick={() => setSelectingTutor(tutor)}
                          className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full text-xs font-[800] h-9 px-4 shadow-xs"
                        >
                          Select Tutor
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── MY SELECTED TUTORS TAB ──────────────────────────────── */}
          {activeTab === "selections" && (
            <div className="max-w-4xl mx-auto space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-[900] text-brand-navy">My Selected Tutors &amp; Demo Tracker</h2>
                  <p className="text-sm text-brand-muted font-[500]">Track demo class schedules &amp; tutor selection requests</p>
                </div>
              </div>

              <div className="space-y-3">
                {selectedTutors.map((req) => (
                  <div key={req.id} className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={req.tutorPhoto} alt={req.tutorName} className="w-12 h-12 rounded-2xl object-cover border border-brand-border" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-[800] text-brand-blue bg-brand-blue-light px-2.5 py-0.5 rounded-full">
                            {req.subject} ({req.classLevel})
                          </span>
                          <span className="text-xs text-brand-muted font-[500]">Requested {req.requestDate}</span>
                        </div>
                        <h4 className="font-[900] text-brand-navy text-base">Tutor: {req.tutorName}</h4>
                        <p className="text-xs text-brand-text font-[500]">{req.notes}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-[800] px-3 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {req.status}
                      </span>
                      <a
                        href={`https://wa.me/9779762511114?text=Hi%20Mero%20Tutor,%20I%20have%20selected%20tutor%20${encodeURIComponent(req.tutorName)}%20for%20my%20child.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-[800] text-emerald-600 hover:text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" /> WhatsApp Coordinator
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

              {/* Review Banner */}
              <div className="bg-gradient-to-br from-brand-teal-light/80 via-white to-brand-blue-light/80 rounded-3xl p-6 sm:p-8 text-brand-navy shadow-md border border-brand-teal/30 relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded-full text-xs font-[800] mb-3">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Parent Feedback &amp; Reviews
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-[900] text-brand-navy tracking-tight mb-2">Review Mero Tutor Platform</h2>
                    <p className="text-brand-muted text-sm font-[500] max-w-xl">
                      Share your experience regarding tutor quality, matching speed, and customer support to help other parents across Nepal.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 flex-shrink-0">
                    <Button
                      onClick={() => {
                        setReviewForm({
                          rating: 5,
                          tutorQuality: 5,
                          matchingSpeed: 5,
                          platformEase: 5,
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
                            tutorQuality: myReview.tutorQuality,
                            matchingSpeed: myReview.matchingSpeed,
                            platformEase: myReview.platformEase,
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

              {/* My Review Spotlight */}
              {myReview ? (
                <div className="bg-white rounded-3xl border-2 border-brand-blue/40 p-6 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-blue text-white text-[10px] font-[800] px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
                    Your Published Review ✓
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <img src={profile.photo} alt={profile.name} className="w-14 h-14 rounded-2xl object-cover border border-brand-border" />
                    <div>
                      <h3 className="font-[900] text-brand-navy text-lg">{myReview.parentName}</h3>
                      <p className="text-xs text-brand-muted font-[500]">{myReview.location} · {myReview.date}</p>
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
                    <div className="bg-brand-blue-light/50 p-3 rounded-xl border border-brand-blue/20 text-center">
                      <p className="text-[10px] text-brand-muted font-[800] uppercase">Tutor Quality</p>
                      <p className="text-base font-[900] text-brand-blue">{myReview.tutorQuality}.0 / 5.0 ★</p>
                    </div>
                    <div className="bg-brand-teal-light/50 p-3 rounded-xl border border-brand-teal/20 text-center">
                      <p className="text-[10px] text-brand-muted font-[800] uppercase">Matching Speed</p>
                      <p className="text-base font-[900] text-brand-teal-dark">{myReview.matchingSpeed}.0 / 5.0 ★</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-center">
                      <p className="text-[10px] text-brand-muted font-[800] uppercase">Platform Ease</p>
                      <p className="text-base font-[900] text-purple-700">{myReview.platformEase}.0 / 5.0 ★</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-brand-border">
                    <Button
                      onClick={() => {
                        setReviewForm({
                          rating: myReview.rating,
                          tutorQuality: myReview.tutorQuality,
                          matchingSpeed: myReview.matchingSpeed,
                          platformEase: myReview.platformEase,
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
                          tutorQuality: 5,
                          matchingSpeed: 5,
                          platformEase: 5,
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
                    Your review helps us maintain high quality standards for home &amp; online tutors in Nepal.
                  </p>
                  <Button onClick={() => setShowReviewModal(true)} className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-[800] text-xs rounded-full">
                    + Leave a Review for Mero Tutor
                  </Button>
                </div>
              )}

              {/* Parents Testimonials Feed */}
              <div>
                <h3 className="text-lg font-[900] text-brand-navy mb-4">Reviews from Parents Across Nepal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-brand-blue-light border border-brand-blue/30 flex items-center justify-center font-[800] text-brand-blue">
                            {rev.parentName[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-[800] text-brand-navy text-sm truncate">{rev.parentName}</h4>
                            <p className="text-[11px] text-brand-muted font-[500] truncate">{rev.location}</p>
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
                        <span>Verified Parent</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── PARENT PROFILE TAB ──────────────────────────────────── */}
          {activeTab === "profile" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-[900] text-brand-navy">Parent &amp; Family Profile</h2>
                  {!editProfileMode ? (
                    <Button onClick={() => { setProfileForm({ ...profile }); setEditProfileMode(true); }} variant="outline" className="rounded-full border-brand-border text-brand-navy hover:bg-brand-bg text-xs font-[800] h-9 gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" /> Edit Profile Details
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

                {/* Photo & Header */}
                <div className="flex items-start gap-5 mb-6 pb-6 border-b border-brand-border">
                  <div className="relative group cursor-pointer" onClick={() => photoInputRef.current?.click()}>
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-brand-blue-light border-2 border-brand-blue/30 group-hover:border-brand-blue transition-colors">
                      <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <input ref={photoInputRef} type="file" accept="image/*" className="hidden" />
                  </div>
                  <div>
                    <p className="font-[900] text-brand-navy text-xl">{profile.name}</p>
                    <p className="text-sm text-brand-blue font-[700] mb-2"><MapPin className="w-3.5 h-3.5 inline text-brand-muted mr-1" />{profile.location}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-[700] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Parent Account
                    </span>
                  </div>
                </div>

                {/* Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-1.5 block">Parent / Guardian Name</Label>
                    {editProfileMode ? (
                      <Input
                        value={profileForm.name}
                        onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                        className="text-sm font-[600]"
                      />
                    ) : (
                      <p className="text-sm font-[600] text-brand-navy bg-brand-bg rounded-lg px-3 py-2 border border-brand-border">{profile.name}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-1.5 block">Email Address</Label>
                    {editProfileMode ? (
                      <Input
                        value={profileForm.email}
                        onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))}
                        className="text-sm font-[600]"
                      />
                    ) : (
                      <p className="text-sm font-[600] text-brand-navy bg-brand-bg rounded-lg px-3 py-2 border border-brand-border">{profile.email}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-1.5 block">Phone Number</Label>
                    {editProfileMode ? (
                      <Input
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                        className="text-sm font-[600]"
                      />
                    ) : (
                      <p className="text-sm font-[600] text-brand-navy bg-brand-bg rounded-lg px-3 py-2 border border-brand-border">{profile.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-1.5 block">City &amp; Address Location</Label>
                    {editProfileMode ? (
                      <Input
                        value={profileForm.location}
                        onChange={(e) => setProfileForm((f) => ({ ...f, location: e.target.value }))}
                        className="text-sm font-[600]"
                      />
                    ) : (
                      <p className="text-sm font-[600] text-brand-navy bg-brand-bg rounded-lg px-3 py-2 border border-brand-border">{profile.location}</p>
                    )}
                  </div>
                </div>

                {/* Children / Students List */}
                <div className="mb-6 pt-4 border-t border-brand-border">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-xs font-[800] text-brand-navy uppercase tracking-wider">Children / Student Details</Label>
                  </div>

                  <div className="space-y-3 mb-4">
                    {(editProfileMode ? profileForm.children : profile.children).map((child, idx) => (
                      <div key={idx} className="bg-brand-bg rounded-2xl p-4 border border-brand-border flex items-start justify-between gap-3">
                        <div>
                          <p className="font-[900] text-brand-navy text-sm">{child.name}</p>
                          <p className="text-xs text-brand-blue font-[700]">{child.grade} · {child.school}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {child.targetSubjects.map((sub) => (
                              <span key={sub} className="text-[11px] bg-white text-brand-navy font-[600] px-2 py-0.5 rounded-md border border-brand-border">{sub}</span>
                            ))}
                          </div>
                        </div>
                        {editProfileMode && (
                          <button onClick={() => handleRemoveChild(idx)} className="text-xs text-rose-500 font-[800] hover:underline">
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {editProfileMode && (
                    <div className="bg-brand-blue-light/40 rounded-2xl p-4 border border-brand-blue/20 space-y-3">
                      <p className="text-xs font-[800] text-brand-blue uppercase">Add Another Child / Student</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <Input
                          placeholder="Child's Name"
                          value={newChildName}
                          onChange={(e) => setNewChildName(e.target.value)}
                          className="text-xs font-[600]"
                        />
                        <select
                          value={newChildGrade}
                          onChange={(e) => setNewChildGrade(e.target.value)}
                          className="text-xs font-[600] bg-white border border-brand-border rounded-xl px-2 h-9"
                        >
                          <option value="Class 1-5">Primary (Class 1-5)</option>
                          <option value="Class 6-8">Lower Sec (Class 6-8)</option>
                          <option value="Class 9 & 10 (SEE)">Class 9 &amp; 10 (SEE)</option>
                          <option value="+2 Science">+2 Science</option>
                          <option value="+2 Management">+2 Management</option>
                          <option value="Entrance Prep">Entrance Prep</option>
                        </select>
                        <Input
                          placeholder="School Name"
                          value={newChildSchool}
                          onChange={(e) => setNewChildSchool(e.target.value)}
                          className="text-xs font-[600]"
                        />
                      </div>
                      <Button onClick={handleAddChild} type="button" className="bg-brand-blue text-white rounded-full text-xs font-[800] h-8 px-4">
                        + Add Child
                      </Button>
                    </div>
                  )}
                </div>

                {/* Additional Notes / Bio */}
                <div>
                  <Label className="text-xs font-[800] text-brand-muted uppercase tracking-wider mb-1.5 block">Parent Preferences / Notes</Label>
                  {editProfileMode ? (
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))}
                      rows={3}
                      className="w-full text-sm font-[500] text-brand-navy bg-white border border-brand-border rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  ) : (
                    <p className="text-sm text-brand-text bg-brand-bg rounded-xl px-3 py-3 leading-relaxed border border-brand-border font-[500]">{profile.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── SETTINGS TAB ───────────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs">
                <h3 className="text-sm font-[800] text-brand-navy mb-4">Notification &amp; Tutor Matching Preferences</h3>
                <div className="space-y-3">
                  {[
                    { label: "SMS & WhatsApp alerts when matching tutors apply", checked: true },
                    { label: "Email notifications for free demo class confirmations", checked: true },
                    { label: "Weekly digest of recommended verified tutors", checked: false },
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

      {/* ── CREATE TUITION POST MODAL ────────────────────────────────────── */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-2xl border border-brand-border my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-brand-border">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-light flex items-center justify-center text-brand-blue font-[800]">
                  {editingRequirementId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-[900] text-brand-navy">
                    {editingRequirementId ? "Edit Tuition Requirement" : "Post Home or Online Tuition Requirement"}
                  </h3>
                  <p className="text-xs text-brand-muted font-[500]">
                    {editingRequirementId ? "Modify requirement specs and update matching options" : "100% Free Service for Parents in Nepal"}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowPostModal(false)} className="p-2 rounded-xl hover:bg-brand-bg text-brand-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequirement} className="space-y-4">
              <div>
                <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Tuition Requirement Title *</Label>
                <Input
                  placeholder="e.g. SEE Compulsory Math & Science Home Tutor"
                  value={newRequirement.title}
                  onChange={(e) => setNewRequirement({ ...newRequirement, title: e.target.value })}
                  required
                  className="text-sm font-[600]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Tuition Mode *</Label>
                  <select
                    value={newRequirement.tuitionMode}
                    onChange={(e) => setNewRequirement({ ...newRequirement, tuitionMode: e.target.value as any })}
                    className="w-full h-10 rounded-xl border border-brand-border bg-white px-3 text-sm font-[600] text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Home">Home Tuition (Teacher comes to home)</option>
                    <option value="Online">Online Tuition (Zoom / Google Meet)</option>
                    <option value="Both">Both / Hybrid</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Gender Preference *</Label>
                  <select
                    value={newRequirement.genderPreference}
                    onChange={(e) => setNewRequirement({ ...newRequirement, genderPreference: e.target.value as any })}
                    className="w-full h-10 rounded-xl border border-brand-border bg-white px-3 text-sm font-[600] text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Any">Any Gender Preference</option>
                    <option value="Male Tutor Required">Male Tutor Required</option>
                    <option value="Female Tutor Required">Female Tutor Required</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Class / Grade Level *</Label>
                  <select
                    value={newRequirement.gradeLevel}
                    onChange={(e) => setNewRequirement({ ...newRequirement, gradeLevel: e.target.value })}
                    className="w-full h-10 rounded-xl border border-brand-border bg-white px-3 text-sm font-[600] text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="Primary Level (Grade 1-5)">Primary Level (Grade 1-5)</option>
                    <option value="Lower Secondary (Grade 6-8)">Lower Secondary (Grade 6-8)</option>
                    <option value="Class 9 & 10 (SEE)">Class 9 &amp; 10 (SEE)</option>
                    <option value="+2 Science (Class 11-12)">+2 Science (Class 11-12)</option>
                    <option value="+2 Management (Class 11-12)">+2 Management (Class 11-12)</option>
                    <option value="A-Level (Cambridge AS & A Level)">A-Level (Cambridge AS &amp; A Level)</option>
                    <option value="IB Level (International Baccalaureate)">IB Level (International Baccalaureate)</option>
                    <option value="Entrance Preparation (IOE / IOM / CEE)">Entrance Preparation (IOE / IOM / CEE)</option>
                    <option value="Other Level">Other Level</option>
                  </select>

                  {newRequirement.gradeLevel === "Other Level" && (
                    <Input
                      placeholder="Specify custom grade level..."
                      value={newRequirement.customGrade}
                      onChange={(e) => setNewRequirement({ ...newRequirement, customGrade: e.target.value })}
                      className="mt-2 text-xs font-[600]"
                    />
                  )}
                </div>

                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Subject(s) Required *</Label>
                  <Input
                    placeholder="e.g. Mathematics, Science"
                    value={newRequirement.subjects}
                    onChange={(e) => setNewRequirement({ ...newRequirement, subjects: e.target.value })}
                    required
                    className="text-sm font-[600]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Preferred Shift &amp; Timing *</Label>
                  <Input
                    placeholder="e.g. 5:00 PM – 6:30 PM (Evening Shift)"
                    value={newRequirement.timing}
                    onChange={(e) => setNewRequirement({ ...newRequirement, timing: e.target.value })}
                    required
                    className="text-sm font-[600]"
                  />
                </div>

                <div>
                  <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Monthly Budget / Rate *</Label>
                  <Input
                    placeholder="e.g. NPR 10,000 – 12,000 / month"
                    value={newRequirement.budget}
                    onChange={(e) => setNewRequirement({ ...newRequirement, budget: e.target.value })}
                    required
                    className="text-sm font-[600]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Location / Address *</Label>
                <Input
                  placeholder="e.g. New Baneshwor, Kathmandu"
                  value={newRequirement.location}
                  onChange={(e) => setNewRequirement({ ...newRequirement, location: e.target.value })}
                  required
                  className="text-sm font-[600]"
                />
              </div>

              <div>
                <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Detailed Requirement Notes</Label>
                <textarea
                  rows={3}
                  placeholder="Mention preferred timing, days per week, gender preference or specific exam preparation goals..."
                  value={newRequirement.description}
                  onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
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
                  className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full font-[800] text-sm h-11 shadow-lg shadow-blue-200"
                >
                  {editingRequirementId ? "Save Requirement Changes" : "Post Tuition Now"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SELECT / REQUEST TUTOR MODAL ──────────────────────────────── */}
      {selectingTutor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl border border-brand-border animate-in fade-in zoom-in-95">
            {selectionSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-[900] text-brand-navy mb-1">Tutor Selection Requested!</h3>
                <p className="text-sm text-brand-text mb-3 font-[500]">
                  Your request for <span className="font-[800] text-brand-navy">{selectingTutor.name}</span> has been sent to Mero Tutor parent desk.
                </p>
                <p className="text-xs text-brand-muted font-[500]">A coordinator will contact you to schedule a free demo class.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-brand-border">
                  <div className="flex items-center gap-3">
                    <img src={selectingTutor.photo} alt={selectingTutor.name} className="w-12 h-12 rounded-2xl object-cover border border-brand-border" />
                    <div>
                      <h3 className="text-base font-[900] text-brand-navy">{selectingTutor.name}</h3>
                      <p className="text-xs text-brand-muted font-[500]">{selectingTutor.qualification} · {selectingTutor.experience} yrs exp</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectingTutor(null)} className="p-1.5 rounded-lg hover:bg-brand-bg text-brand-muted">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-brand-blue-light/40 border border-brand-blue/20 rounded-2xl p-4">
                    <p className="text-xs font-[800] text-brand-blue uppercase tracking-wider mb-2">Request Demo Class &amp; Tutor Selection</p>
                    <p className="text-xs text-brand-text font-[500] leading-relaxed mb-3">
                      Select this tutor for your child. We provide a free trial demo session before finalizing tuition arrangements.
                    </p>
                    <textarea
                      rows={3}
                      placeholder="Add specific notes (e.g. Need home tuition for Class 10 SEE Math starting next Monday)..."
                      value={selectionNotes}
                      onChange={(e) => setSelectionNotes(e.target.value)}
                      className="w-full text-xs font-[500] text-brand-navy bg-white border border-brand-border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-center">
                    <p className="text-xs font-[800] text-emerald-900 mb-1">Want immediate assistance over WhatsApp?</p>
                    <a
                      href={`https://wa.me/9779762511114?text=Namaste%20Mero%20Tutor,%20I%20am%20interested%20in%20selecting%20tutor%20${encodeURIComponent(selectingTutor.name)}%20for%20my%20child.`}
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
                    onClick={() => setSelectingTutor(null)}
                    className="flex-1 rounded-full border-brand-border text-brand-navy font-[800] text-sm h-11"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSelectTutor}
                    className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full font-[800] text-sm h-11 shadow-lg shadow-blue-200"
                  >
                    Confirm Selection
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
                  Thank you for reviewing Mero Tutor! Your review helps parents across Nepal find quality home &amp; online tutors.
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
                      <p className="text-xs text-brand-muted font-[500]">Share your parent rating &amp; experience</p>
                    </div>
                  </div>
                  <button onClick={() => setShowReviewModal(false)} className="p-2 rounded-xl hover:bg-brand-bg text-brand-muted">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveReview} className="space-y-4">
                  {/* Overall Rating */}
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

                  {/* Sub Ratings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: "tutorQuality", label: "Tutor Quality" },
                      { key: "matchingSpeed", label: "Matching Speed" },
                      { key: "platformEase", label: "Platform Ease" },
                    ].map(({ key, label }) => (
                      <div key={key} className="bg-brand-bg p-3 rounded-xl border border-brand-border">
                        <Label className="text-[10px] font-[800] text-brand-muted uppercase block mb-1">{label}</Label>
                        <select
                          value={(reviewForm as any)[key]}
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
                    <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Review Headline / Title *</Label>
                    <Input
                      placeholder="e.g. Found an exceptional SEE Math home tutor within 24 hours!"
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                      required
                      className="text-sm font-[600]"
                    />
                  </div>

                  {/* Feedback Text */}
                  <div>
                    <Label className="text-xs font-[800] text-brand-navy uppercase mb-1.5 block">Detailed Feedback &amp; Review *</Label>
                    <textarea
                      rows={4}
                      placeholder="Share your experience finding tutors, scheduling demo classes, or working with Mero Tutor..."
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
