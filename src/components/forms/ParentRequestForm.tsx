"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  PenLine,
  Globe,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CLASSES } from "@/data/classes";
import { SUBJECTS } from "@/data/subjects";
import { LOCATIONS } from "@/data/locations";

type WizardData = {
  studentClass: string;
  customClass: string;
  board: string;
  customBoard: string;
  subjects: string[];
  customSubject: string;
  mode: string;
  location: string;
  customLocation: string;
  shiftTime: string;
  duration: string;
  salaryBudget: string;
  startDate: string;
  genderPref: string;
  studentsCount: string;
  name: string;
  phone: string;
  email: string;
};

const INITIAL: WizardData = {
  studentClass: "",
  customClass: "",
  board: "",
  customBoard: "",
  subjects: [],
  customSubject: "",
  mode: "",
  location: "",
  customLocation: "",
  shiftTime: "",
  duration: "",
  salaryBudget: "NPR 8,000 – 12,000 / month",
  startDate: "Immediately",
  genderPref: "Any Gender",
  studentsCount: "1 Student",
  name: "",
  phone: "",
  email: "",
};

const CLASS_OPTIONS = [...CLASSES, "Entrance Preparation"];

const FORM_TRANSLATIONS = {
  en: {
    headerTitle: "Post Your Tutor Requirement",
    headerSubtitle:
      "Fill in your tuition details below. Our coordinator will match you with a verified tutor within 24 hours.",
    stepLabel: "Step",
    ofLabel: "of",
    optionalBadge: "Optional",
    completeSuffix: "% complete",
    optionalDesc: "This step is optional — you can skip it.",
    backBtn: "Back",
    nextBtn: "Next",
    skipBtn: "Skip",
    submitBtn: "Submit Tutor Request",
    submittingBtn: "Submitting...",
    selectSubjectHint: "Select all that apply",
    othersBtn: "Others",

    // Steps
    step1Question: "Which class does the student study in?",
    step1CustomPlaceholder: "Please specify your class or level...",

    step2Question: "Which subject(s) do they need help with?",
    step2CustomPlaceholder: "Please specify your subject(s)...",

    step3Question: "Which board / curriculum are they following?",
    step3CustomPlaceholder: "e.g. Pearson Edexcel, IGCSE, State Board...",

    step4Question: "How would you prefer classes?",
    step5Question: "Where are you located?",
    step5SelectDefault: "Select your area in Nepal",
    step5SelectOther: "Other — Write your area",
    step5CustomPlaceholder: "e.g. Bhaktapur, Kirtipur, Budhanilkantha...",

    step6Question: "When would you prefer classes?",
    step6ShiftLabel: "Tuition Shift Time *",
    step6DurationLabel: "Class Duration *",

    step7Question: "What is your budget & start preference?",
    step7SalaryLabel: "Expected Monthly Salary Budget *",
    step7StartLabel: "Start Date *",
    step7GenderLabel: "Gender Preference",

    step8Question: "How can we contact you?",
    step8NameLabel: "Full Name *",
    step8NamePlaceholder: "Parent or student name",
    step8PhoneLabel: "Contact Phone Number *",
    step8PhonePlaceholder: "+977-98XXXXXXXX",
    step8EmailLabel: "Email Address (Optional)",
    step8EmailPlaceholder: "your@email.com",

    // Validation Errors
    errClass: "Please select or enter a class",
    errSubject: "Please select at least one subject",
    errCustomSubject: "Please specify your subject",
    errCustomBoard: "Please specify your board or curriculum",
    errMode: "Please select a learning mode",
    errLocation: "Please select or enter your location",
    errCustomLocation: "Please enter your area",
    errShiftTime: "Please select a shift time",
    errDuration: "Please select a duration",
    errName: "Please enter your name",
    errPhone: "Please enter your phone number",

    // Success Screen
    successTitle: "We've Received Your Request!",
    successDesc1Head: "Thank you, ",
    successDesc1Tail: ". Our team will review your requirements and match you with a verified tutor.",
    successDesc2Head: "We'll contact you on ",
    successDesc2Tail: " shortly.",
    successFasterHelp: "Need faster help?",
    successWhatsappText: "WhatsApp us at +977-9762511114",
    successResetBtn: "Submit Another Request",

    // Options mapping
    classes: {
      Nursery: "Nursery",
      LKG: "LKG",
      UKG: "UKG",
      "Class 1": "Class 1",
      "Class 2": "Class 2",
      "Class 3": "Class 3",
      "Class 4": "Class 4",
      "Class 5": "Class 5",
      "Class 6": "Class 6",
      "Class 7": "Class 7",
      "Class 8": "Class 8",
      "Class 9": "Class 9",
      "Class 10 (SEE)": "Class 10 (SEE)",
      "Class 11 (+2)": "Class 11 (+2)",
      "Class 12 (+2)": "Class 12 (+2)",
      "Bachelor Level": "Bachelor Level",
      "Entrance Preparation": "Entrance Preparation",
    },

    subjects: {
      Mathematics: "Mathematics",
      Science: "Science",
      English: "English",
      Nepali: "Nepali",
      "Social Studies": "Social Studies",
      Physics: "Physics",
      Chemistry: "Chemistry",
      Biology: "Biology",
      Accountancy: "Accountancy",
      Economics: "Economics",
      "Computer Science": "Computer Science",
    },

    boards: [
      { val: "CDC", label: "CDC", desc: "Class 1–10 (National Curriculum)" },
      { val: "NEB", label: "NEB", desc: "Class 11 / 12 (National Exam Board)" },
      { val: "CBSE", label: "CBSE", desc: "Central Board of Secondary Education" },
      { val: "A-Level", label: "A-Level", desc: "Cambridge Advanced Level" },
      { val: "IB", label: "IB", desc: "International Baccalaureate" },
    ],

    modes: [
      { val: "Home Tuition", label: "Home Tuition (In-Person)", desc: "A tutor comes to your home" },
      { val: "Online Tuition", label: "Online Tuition (Virtual)", desc: "Classes via video call" },
      { val: "Flexible (Both)", label: "Flexible — Either is Fine", desc: "Open to both options" },
    ],

    shifts: [
      { val: "Morning (6:30 AM – 9:00 AM)", label: "Morning", desc: "6:30 AM – 9:00 AM" },
      { val: "Afternoon (12:00 PM – 3:00 PM)", label: "Afternoon", desc: "12:00 PM – 3:00 PM" },
      { val: "Evening (4:00 PM – 7:00 PM)", label: "Evening", desc: "4:00 PM – 7:00 PM" },
      { val: "Flexible Timing", label: "Flexible", desc: "Any time works" },
    ],

    durations: [
      { val: "1 Hour / session", label: "1 Hour" },
      { val: "1.5 Hours / session", label: "1.5 Hours" },
      { val: "2 Hours / session", label: "2 Hours" },
      { val: "Flexible Duration", label: "Flexible" },
    ],

    salaryBudgets: [
      { val: "NPR 4,000 – 7,000 / month", label: "NPR 4,000 – 7,000 / month" },
      { val: "NPR 8,000 – 12,000 / month", label: "NPR 8,000 – 12,000 / month" },
      { val: "NPR 12,000 – 18,000 / month", label: "NPR 12,000 – 18,000 / month" },
      { val: "NPR 18,000 – 25,000+ / month", label: "NPR 18,000 – 25,000+ / month" },
    ],

    startDates: [
      { val: "Immediately", label: "Immediately" },
      { val: "Within 3 Days", label: "Within 3 Days" },
      { val: "Next Week", label: "Next Week" },
      { val: "Flexible", label: "Flexible" },
    ],

    genderPrefs: [
      { val: "Any Gender", label: "Any Gender" },
      { val: "Female Tutor Preferred", label: "Female Tutor Preferred" },
      { val: "Male Tutor Preferred", label: "Male Tutor Preferred" },
    ],
  },

  np: {
    headerTitle: "तपाईंको ट्युटर आवश्यकता पोस्ट गर्नुहोस्",
    headerSubtitle:
      "तपाईंको ट्युसन सम्बन्धी विवरणहरू तल भर्नुहोस्। हाम्रा प्रतिनिधिले २४ घण्टाभित्र प्रमाणित ट्युटर मिलाइदिनेछन्।",
    stepLabel: "चरण",
    ofLabel: "/",
    optionalBadge: "ऐच्छिक",
    completeSuffix: "% पूरा भयो",
    optionalDesc: "यो चरण ऐच्छिक हो — तपाईं यसलाई छोड्न (Skip) सक्नुहुन्छ।",
    backBtn: "पछाडि",
    nextBtn: "अगाडि",
    skipBtn: "छोड्नुहोस् (Skip)",
    submitBtn: "ट्युटर अनुरोध पठाउनुहोस्",
    submittingBtn: "पठाउँदैछ...",
    selectSubjectHint: "लागू हुने सबै विषयहरू छान्नुहोस्",
    othersBtn: "अन्य",

    // Steps
    step1Question: "विद्यार्थी कुन कक्षामा पढ्छन्?",
    step1CustomPlaceholder: "कृपया आफ्नो कक्षा वा तह लेख्नुहोस्...",

    step2Question: "विद्यार्थीलाई कुन विषय(हरू) मा सहयोग चाहिन्छ?",
    step2CustomPlaceholder: "कृपया विषय(हरू) को नाम लेख्नुहोस्...",

    step3Question: "विद्यार्थी कुन बोर्ड / पाठ्यक्रम अनुसार पढ्दैछन्?",
    step3CustomPlaceholder: "जस्तै: Pearson Edexcel, IGCSE, State Board...",

    step4Question: "तपाईं कसरी कक्षा सञ्चालन गर्न चाहनुहुन्छ?",
    step5Question: "तपाईंको ठेगाना / स्थान कहाँ हो?",
    step5SelectDefault: "नेपालको आफ्नो क्षेत्र छान्नुहोस्",
    step5SelectOther: "अन्य — आफ्नो ठाउँ लेख्नुहोस्",
    step5CustomPlaceholder: "जस्तै: भक्तपुर, कीर्तिपुर, बुढानीलकण्ठ...",

    step6Question: "तपाईं कुन समयमा कक्षा सञ्चालन गर्न चाहनुहुन्छ?",
    step6ShiftLabel: "ट्युसनको समय (Shift) *",
    step6DurationLabel: "कक्षाको समय अवधि *",

    step7Question: "तपाईंको बजेट र कक्षा सुरु गर्ने प्राथमिकता के हो?",
    step7SalaryLabel: "अनुमानित मासिक बजेट (रु.) *",
    step7StartLabel: "कक्षा कहिले सुरु गर्ने? *",
    step7GenderLabel: "ट्युटरको लिङ्ग प्राथमिकता",

    step8Question: "हामी तपाईंलाई कसरी सम्पर्क गर्न सक्छौं?",
    step8NameLabel: "पूरा नाम *",
    step8NamePlaceholder: "अभिभावक वा विद्यार्थीको नाम",
    step8PhoneLabel: "सम्पर्क फोन नम्बर *",
    step8PhonePlaceholder: "+977-98XXXXXXXX",
    step8EmailLabel: "इमेल ठेगाना (ऐच्छिक)",
    step8EmailPlaceholder: "your@email.com",

    // Validation Errors
    errClass: "कृपया कक्षा छान्नुहोस् वा लेख्नुहोस्",
    errSubject: "कृपया कम्तीमा एउटा विषय छान्नुहोस्",
    errCustomSubject: "कृपया आफ्नो विषय उल्लेख गर्नुहोस्",
    errCustomBoard: "कृपया बोर्ड वा पाठ्यक्रम उल्लेख गर्नुहोस्",
    errMode: "कृपया पढाइको माध्यम छान्नुहोस्",
    errLocation: "कृपया आफ्नो स्थान छान्नुहोस् वा लेख्नुहोस्",
    errCustomLocation: "कृपया आफ्नो क्षेत्र लेख्नुहोस्",
    errShiftTime: "कृपया समय (shift) छान्नुहोस्",
    errDuration: "कृपया कक्षाको समय अवधि छान्नुहोस्",
    errName: "कृपया आफ्नो नाम भर्नुहोस्",
    errPhone: "कृपया फोन नम्बर भर्नुहोस्",

    // Success Screen
    successTitle: "हामीले तपाईंको अनुरोध प्राप्त गर्यौं!",
    successDesc1Head: "धन्यवाद, ",
    successDesc1Tail: "। हाम्रो टोलीले तपाईंको आवश्यकता समीक्षा गरी २४ घण्टाभित्र प्रमाणित ट्युटर मिलाइदिनेछ।",
    successDesc2Head: "हामी छिट्टै तपाईंलाई ",
    successDesc2Tail: " मा सम्पर्क गर्नेछौं।",
    successFasterHelp: "छिटो सहयोग चाहिन्छ?",
    successWhatsappText: "हामीलाई ह्वाट्सएप गर्नुहोस् (+977-9762511114)",
    successResetBtn: "अर्को नयाँ अनुरोध पठाउनुहोस्",

    // Options mapping
    classes: {
      Nursery: "नर्सरी (Nursery)",
      LKG: "एल.के.जी. (LKG)",
      UKG: "यु.के.जी. (UKG)",
      "Class 1": "कक्षा १ (Class 1)",
      "Class 2": "कक्षा २ (Class 2)",
      "Class 3": "कक्षा ३ (Class 3)",
      "Class 4": "कक्षा ४ (Class 4)",
      "Class 5": "कक्षा ५ (Class 5)",
      "Class 6": "कक्षा ६ (Class 6)",
      "Class 7": "कक्षा ७ (Class 7)",
      "Class 8": "कक्षा ८ (Class 8)",
      "Class 9": "कक्षा ९ (Class 9)",
      "Class 10 (SEE)": "कक्षा १० (SEE)",
      "Class 11 (+2)": "कक्षा ११ (+२)",
      "Class 12 (+2)": "कक्षा १२ (+२)",
      "Bachelor Level": "स्नातक (Bachelor)",
      "Entrance Preparation": "प्रवेश परीक्षा (Entrance)",
    },

    subjects: {
      Mathematics: "गणित (Mathematics)",
      Science: "विज्ञान (Science)",
      English: "अंग्रेजी (English)",
      Nepali: "नेपाली (Nepali)",
      "Social Studies": "सामाजिक (Social)",
      Physics: "भौतिकशास्त्र (Physics)",
      Chemistry: "रसायनशास्त्र (Chemistry)",
      Biology: "जीवविज्ञान (Biology)",
      Accountancy: "लेखाशास्त्र (Accounts)",
      Economics: "अर्थशास्त्र (Economics)",
      "Computer Science": "कम्प्युटर (Computer)",
    },

    boards: [
      { val: "CDC", label: "CDC", desc: "कक्षा १–१० (राष्ट्रिय पाठ्यक्रम)" },
      { val: "NEB", label: "NEB", desc: "कक्षा ११ / १२ (राष्ट्रिय परीक्षा बोर्ड)" },
      { val: "CBSE", label: "CBSE", desc: "सेन्ट्रल बोर्ड अफ सेकेन्डरी एजुकेसन" },
      { val: "A-Level", label: "A-Level", desc: "क्याम्ब्रिज एडभान्स लेभल" },
      { val: "IB", label: "IB", desc: "इन्टरनेसनल ब्याकालोरिएट" },
    ],

    modes: [
      { val: "Home Tuition", label: "होम ट्युसन (भौतिक कक्षा)", desc: "शिक्षक तपाईंको घरमै आउनुहुनेछ" },
      { val: "Online Tuition", label: "अनलाइन ट्युसन (भर्चुअल)", desc: "भिडियो कल मार्फत कक्षा" },
      { val: "Flexible (Both)", label: "लचिलो (दुवै उपयुक्त)", desc: "होम वा अनलाइन दुवै मान्य" },
    ],

    shifts: [
      { val: "Morning (6:30 AM – 9:00 AM)", label: "बिहान (Morning)", desc: "६:३० AM – ९:०० AM" },
      { val: "Afternoon (12:00 PM – 3:00 PM)", label: "दिउँसो (Afternoon)", desc: "१२:०० PM – ३:०० PM" },
      { val: "Evening (4:00 PM – 7:00 PM)", label: "बेलुका (Evening)", desc: "४:०० PM – ७:०० PM" },
      { val: "Flexible Timing", label: "लचिलो (Flexible)", desc: "कुनै पनि समय मिल्ने" },
    ],

    durations: [
      { val: "1 Hour / session", label: "१ घण्टा (1 Hour)" },
      { val: "1.5 Hours / session", label: "१.५ घण्टा (1.5 Hours)" },
      { val: "2 Hours / session", label: "२ घण्टा (2 Hours)" },
      { val: "Flexible Duration", label: "लचिलो (Flexible)" },
    ],

    salaryBudgets: [
      { val: "NPR 4,000 – 7,000 / month", label: "रु. ४,००० – ७,००० / महिना" },
      { val: "NPR 8,000 – 12,000 / month", label: "रु. ८,००० – १२,००० / महिना" },
      { val: "NPR 12,000 – 18,000 / month", label: "रु. १२,००० – १८,००० / महिना" },
      { val: "NPR 18,000 – 25,000+ / month", label: "रु. १८,००० – २५,०००+ / महिना" },
    ],

    startDates: [
      { val: "Immediately", label: "तुरुन्तै (Immediately)" },
      { val: "Within 3 Days", label: "३ दिनभित्र" },
      { val: "Next Week", label: "अर्को हप्ता" },
      { val: "Flexible", label: "लचिलो" },
    ],

    genderPrefs: [
      { val: "Any Gender", label: "महिला वा पुरुष (कुनै पनि)" },
      { val: "Female Tutor Preferred", label: "महिला ट्युटर (Female)" },
      { val: "Male Tutor Preferred", label: "पुरुष ट्युटर (Male)" },
    ],
  },
};

interface ParentRequestFormProps {
  lang?: "en" | "np";
}

export default function ParentRequestForm({ lang: propLang }: ParentRequestFormProps) {
  const [currentLang, setCurrentLang] = useState<"en" | "np">(propLang || "en");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (propLang) {
      setCurrentLang(propLang);
    }
  }, [propLang]);

  const t = FORM_TRANSLATIONS[currentLang];

  const STEPS = [
    { id: 1, question: t.step1Question },
    { id: 2, question: t.step2Question },
    { id: 3, question: t.step3Question, optional: true },
    { id: 4, question: t.step4Question },
    { id: 5, question: t.step5Question },
    { id: 6, question: t.step6Question },
    { id: 7, question: t.step7Question },
    { id: 8, question: t.step8Question },
  ];

  const totalSteps = STEPS.length;
  const progress = (step / totalSteps) * 100;
  const currentStep = STEPS[step - 1];

  function validate(): boolean {
    const e: Record<string, string> = {};

    if (step === 1) {
      const cls = data.studentClass === "Others" ? data.customClass.trim() : data.studentClass;
      if (!cls) e.studentClass = t.errClass;
    }
    if (step === 2) {
      const hasSelected = data.subjects.length > 0;
      const hasCustom = data.subjects.includes("Others") ? data.customSubject.trim() !== "" : true;
      if (!hasSelected) e.subjects = t.errSubject;
      else if (!hasCustom) e.customSubject = t.errCustomSubject;
    }
    if (step === 3 && data.board === "Others" && !data.customBoard.trim()) {
      e.customBoard = t.errCustomBoard;
    }
    if (step === 4 && !data.mode) e.mode = t.errMode;
    if (step === 5) {
      const loc = data.location === "Other / Write your area" ? data.customLocation.trim() : data.location;
      if (!loc) e.location = t.errLocation;
      else if (data.location === "Other / Write your area" && !data.customLocation.trim()) {
        e.customLocation = t.errCustomLocation;
      }
    }
    if (step === 6) {
      if (!data.shiftTime) e.shiftTime = t.errShiftTime;
      if (!data.duration) e.duration = t.errDuration;
    }
    if (step === 8) {
      if (!data.name.trim()) e.name = t.errName;
      if (!data.phone.trim()) e.phone = t.errPhone;
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function next() {
    if (!validate()) return;
    if (step < totalSteps) {
      setStep((s) => s + 1);
      setErrors({});
    } else {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      setLoading(false);
      setSubmitted(true);
    }
  }

  function skipStep() {
    setStep((s) => s + 1);
    setErrors({});
  }

  function toggleSubject(s: string) {
    setData((d) => ({
      ...d,
      subjects: d.subjects.includes(s)
        ? d.subjects.filter((x) => x !== s)
        : [...d.subjects, s],
    }));
  }

  // Summary labels
  const displayClass = data.studentClass === "Others"
    ? (data.customClass || t.othersBtn)
    : (t.classes[data.studentClass as keyof typeof t.classes] || data.studentClass);

  const displayBoard = data.board === "Others"
    ? (data.customBoard || t.othersBtn)
    : (t.boards.find((b) => b.val === data.board)?.label || data.board);

  const displayLocation =
    data.location === "Other / Write your area" ? data.customLocation || t.othersBtn : data.location;

  const displayMode = t.modes.find((m) => m.val === data.mode)?.label || data.mode;
  const displayShift = t.shifts.find((s) => s.val === data.shiftTime)?.label || data.shiftTime;
  const displaySalary = t.salaryBudgets.find((b) => b.val === data.salaryBudget)?.label || data.salaryBudget;

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-brand-border p-8 shadow-sm mb-10 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-[800] text-brand-navy mb-3">
          {t.successTitle}
        </h2>
        <p className="text-brand-text leading-relaxed mb-2 text-sm sm:text-base">
          {t.successDesc1Head}<strong className="text-brand-navy">{data.name}</strong>{t.successDesc1Tail}
        </p>
        <p className="text-brand-text leading-relaxed mb-6 text-sm sm:text-base">
          {t.successDesc2Head}<strong className="text-brand-navy">{data.phone}</strong>{t.successDesc2Tail}
        </p>
        <div className="bg-brand-bg rounded-xl p-4 text-sm mb-6">
          <p className="font-[600] text-brand-navy mb-1">{t.successFasterHelp}</p>
          <a
            href="https://wa.me/9779762511114"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-[600] hover:underline"
          >
            {t.successWhatsappText}
          </a>
        </div>
        <Button
          variant="outline"
          onClick={() => { setSubmitted(false); setStep(1); setData(INITIAL); }}
          className="rounded-full border-brand-border text-brand-navy font-[700] px-6 text-sm"
        >
          {t.successResetBtn}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm mb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-brand-border pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-[800] text-brand-navy">
            {t.headerTitle}
          </h2>
          <p className="text-xs sm:text-sm text-brand-text mt-1">
            {t.headerSubtitle}
          </p>
        </div>

        {/* Inline Language Switcher Toggle */}
        <div className="inline-flex items-center p-1 bg-slate-100/90 border border-slate-200 rounded-full shrink-0 self-start sm:self-center shadow-2xs">
          <button
            type="button"
            onClick={() => setCurrentLang("en")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-[700] transition-all duration-200 ${
              currentLang === "en"
                ? "bg-brand-blue text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Globe className="w-3 h-3" />
            English
          </button>

          <button
            type="button"
            onClick={() => setCurrentLang("np")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-[700] transition-all duration-200 ${
              currentLang === "np"
                ? "bg-brand-blue text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Languages className="w-3 h-3" />
            नेपाली
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-sm text-brand-muted mb-2">
          <span className="font-[600] text-xs sm:text-sm">
            {t.stepLabel} {step} {t.ofLabel} {totalSteps}
          </span>
          <div className="flex items-center gap-2">
            {currentStep.optional && (
              <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-[600]">
                {t.optionalBadge}
              </span>
            )}
            <span className="text-xs sm:text-sm">{Math.round(progress)}{t.completeSuffix}</span>
          </div>
        </div>
        <div className="h-2 bg-brand-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-blue rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Card */}
      <div className="bg-brand-bg rounded-2xl border border-brand-border p-6">
        <p className="text-xs font-[700] text-brand-blue uppercase tracking-widest mb-2">
          {t.stepLabel} {step}
        </p>
        <h3 className="text-xl font-[800] text-brand-navy mb-1">{currentStep.question}</h3>
        {currentStep.optional && (
          <p className="text-xs text-brand-muted mb-5">{t.optionalDesc}</p>
        )}
        {!currentStep.optional && <div className="mb-6" />}

        {/* ── Step 1: Class ── */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CLASS_OPTIONS.map((c) => {
                const label = t.classes[c as keyof typeof t.classes] || c;
                return (
                  <button
                    key={c}
                    onClick={() => setData((d) => ({ ...d, studentClass: c, customClass: "" }))}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left ${
                      data.studentClass === c
                        ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                        : "border-brand-border text-brand-text hover:border-brand-blue/40"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              {/* Others */}
              <button
                onClick={() => setData((d) => ({ ...d, studentClass: "Others" }))}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left flex items-center gap-1.5 ${
                  data.studentClass === "Others"
                    ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                    : "border-brand-border text-brand-text hover:border-brand-blue/40"
                }`}
              >
                <PenLine className="w-3.5 h-3.5 flex-shrink-0" /> {t.othersBtn}
              </button>
            </div>
            {data.studentClass === "Others" && (
              <div className="mt-2">
                <Input
                  placeholder={t.step1CustomPlaceholder}
                  value={data.customClass}
                  onChange={(e) => setData((d) => ({ ...d, customClass: e.target.value }))}
                  className="bg-white border-brand-border h-10 text-sm rounded-xl"
                  autoFocus
                />
              </div>
            )}
            {errors.studentClass && <p className="text-xs text-red-500">{errors.studentClass}</p>}
          </div>
        )}

        {/* ── Step 2: Subjects ── */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-sm text-brand-muted -mt-4 mb-2">{t.selectSubjectHint}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SUBJECTS.map((s) => {
                const label = t.subjects[s as keyof typeof t.subjects] || s;
                return (
                  <button
                    key={s}
                    onClick={() => toggleSubject(s)}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left ${
                      data.subjects.includes(s)
                        ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                        : "border-brand-border text-brand-text hover:border-brand-blue/40"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              {/* Others */}
              <button
                onClick={() => toggleSubject("Others")}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left flex items-center gap-1.5 ${
                  data.subjects.includes("Others")
                    ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                    : "border-brand-border text-brand-text hover:border-brand-blue/40"
                }`}
              >
                <PenLine className="w-3.5 h-3.5 flex-shrink-0" /> {t.othersBtn}
              </button>
            </div>
            {data.subjects.includes("Others") && (
              <div className="mt-2">
                <Input
                  placeholder={t.step2CustomPlaceholder}
                  value={data.customSubject}
                  onChange={(e) => setData((d) => ({ ...d, customSubject: e.target.value }))}
                  className="bg-white border-brand-border h-10 text-sm rounded-xl"
                  autoFocus
                />
                {errors.customSubject && <p className="text-xs text-red-500 mt-1">{errors.customSubject}</p>}
              </div>
            )}
            {errors.subjects && <p className="text-xs text-red-500">{errors.subjects}</p>}
          </div>
        )}

        {/* ── Step 3: Board (Optional) ── */}
        {step === 3 && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.boards.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setData((d) => ({ ...d, board: opt.val, customBoard: "" }))}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    data.board === opt.val
                      ? "border-brand-blue bg-brand-blue-light"
                      : "border-brand-border hover:border-brand-blue/40"
                  }`}
                >
                  <div>
                    <p className={`font-[700] text-sm ${data.board === opt.val ? "text-brand-blue" : "text-brand-navy"}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-brand-muted mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
              {/* Others */}
              <button
                onClick={() => setData((d) => ({ ...d, board: "Others" }))}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  data.board === "Others"
                    ? "border-brand-blue bg-brand-blue-light"
                    : "border-brand-border hover:border-brand-blue/40"
                }`}
              >
                <PenLine className={`w-4 h-4 flex-shrink-0 ${data.board === "Others" ? "text-brand-blue" : "text-brand-muted"}`} />
                <div>
                  <p className={`font-[700] text-sm ${data.board === "Others" ? "text-brand-blue" : "text-brand-navy"}`}>
                    {t.othersBtn}
                  </p>
                  <p className="text-xs text-brand-muted mt-0.5">{t.step3CustomPlaceholder}</p>
                </div>
              </button>
            </div>
            {data.board === "Others" && (
              <div className="mt-2">
                <Input
                  placeholder={t.step3CustomPlaceholder}
                  value={data.customBoard}
                  onChange={(e) => setData((d) => ({ ...d, customBoard: e.target.value }))}
                  className="bg-white border-brand-border h-10 text-sm rounded-xl"
                  autoFocus
                />
                {errors.customBoard && <p className="text-xs text-red-500 mt-1">{errors.customBoard}</p>}
              </div>
            )}
          </div>
        )}

        {/* ── Step 4: Mode ── */}
        {step === 4 && (
          <div className="grid grid-cols-1 gap-3">
            {t.modes.map((opt) => (
              <button
                key={opt.val}
                onClick={() => setData((d) => ({ ...d, mode: opt.val }))}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                  data.mode === opt.val
                    ? "border-brand-blue bg-brand-blue-light"
                    : "border-brand-border hover:border-brand-blue/40"
                }`}
              >
                <div>
                  <p className={`font-[700] text-sm ${data.mode === opt.val ? "text-brand-blue" : "text-brand-navy"}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-brand-muted mt-0.5">{opt.desc}</p>
                </div>
              </button>
            ))}
            {errors.mode && <p className="text-xs text-red-500">{errors.mode}</p>}
          </div>
        )}

        {/* ── Step 5: Location ── */}
        {step === 5 && (
          <div className="space-y-3">
            <select
              value={data.location}
              onChange={(e) => setData((d) => ({ ...d, location: e.target.value, customLocation: "" }))}
              className="w-full h-12 px-4 rounded-xl border-2 border-brand-border text-brand-navy bg-white focus:outline-none focus:border-brand-blue text-sm"
            >
              <option value="">{t.step5SelectDefault}</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
              <option value="Other / Write your area">{t.step5SelectOther}</option>
            </select>
            {data.location === "Other / Write your area" && (
              <div>
                <Input
                  placeholder={t.step5CustomPlaceholder}
                  value={data.customLocation}
                  onChange={(e) => setData((d) => ({ ...d, customLocation: e.target.value }))}
                  className="bg-white border-brand-border h-10 text-sm rounded-xl"
                  autoFocus
                />
                {errors.customLocation && (
                  <p className="text-xs text-red-500 mt-1">{errors.customLocation}</p>
                )}
              </div>
            )}
            {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
          </div>
        )}

        {/* ── Step 6: Schedule ── */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <Label className="text-sm font-[600] text-brand-navy mb-2 block">{t.step6ShiftLabel}</Label>
              <div className="grid grid-cols-2 gap-3">
                {t.shifts.map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setData((d) => ({ ...d, shiftTime: opt.val }))}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      data.shiftTime === opt.val
                        ? "border-brand-blue bg-brand-blue-light"
                        : "border-brand-border hover:border-brand-blue/40"
                    }`}
                  >
                    <div className={`font-[700] text-sm ${data.shiftTime === opt.val ? "text-brand-blue" : "text-brand-navy"}`}>
                      {opt.label}
                    </div>
                    <div className="text-xs text-brand-muted mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
              {errors.shiftTime && <p className="text-xs text-red-500 mt-1">{errors.shiftTime}</p>}
            </div>
            <div>
              <Label className="text-sm font-[600] text-brand-navy mb-2 block">{t.step6DurationLabel}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {t.durations.map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setData((d) => ({ ...d, duration: opt.val }))}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-center ${
                      data.duration === opt.val
                        ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                        : "border-brand-border text-brand-text hover:border-brand-blue/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration}</p>}
            </div>
          </div>
        )}

        {/* ── Step 7: Budget & Preferences ── */}
        {step === 7 && (
          <div className="space-y-5">
            <div>
              <Label className="text-sm font-[600] text-brand-navy mb-2 block">Number of Students *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["1 Student", "2 Students", "3 Students", "4+ Students (Group)"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setData((d) => ({ ...d, studentsCount: opt }))}
                    className={`py-2 px-3 rounded-xl border-2 text-xs font-[600] transition-all text-center ${
                      data.studentsCount === opt
                        ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                        : "border-brand-border text-brand-text hover:border-brand-blue/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-[600] text-brand-navy mb-2 block">{t.step7SalaryLabel}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t.salaryBudgets.map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setData((d) => ({ ...d, salaryBudget: opt.val }))}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-[600] transition-all text-left ${
                      data.salaryBudget === opt.val
                        ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                        : "border-brand-border text-brand-text hover:border-brand-blue/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-[600] text-brand-navy mb-2 block">{t.step7StartLabel}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {t.startDates.map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setData((d) => ({ ...d, startDate: opt.val }))}
                      className={`py-2 px-3 rounded-xl border-2 text-xs font-[600] transition-all text-center ${
                        data.startDate === opt.val
                          ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                          : "border-brand-border text-brand-text hover:border-brand-blue/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-[600] text-brand-navy mb-2 block">{t.step7GenderLabel}</Label>
                <div className="grid grid-cols-1 gap-2">
                  {t.genderPrefs.map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setData((d) => ({ ...d, genderPref: opt.val }))}
                      className={`py-2 px-3 rounded-xl border-2 text-xs font-[600] transition-all text-left ${
                        data.genderPref === opt.val
                          ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                          : "border-brand-border text-brand-text hover:border-brand-blue/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 8: Contact ── */}
        {step === 8 && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-[600] text-brand-navy flex items-center gap-1.5 mb-1.5">
                <User className="h-3.5 w-3.5" /> {t.step8NameLabel}
              </Label>
              <Input
                placeholder={t.step8NamePlaceholder}
                value={data.name}
                onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                className={errors.name ? "border-red-400" : ""}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label className="text-sm font-[600] text-brand-navy flex items-center gap-1.5 mb-1.5">
                <Phone className="h-3.5 w-3.5" /> {t.step8PhoneLabel}
              </Label>
              <Input
                type="tel"
                placeholder={t.step8PhonePlaceholder}
                value={data.phone}
                onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                className={errors.phone ? "border-red-400" : ""}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Label className="text-sm font-[600] text-brand-navy flex items-center gap-1.5 mb-1.5">
                <Mail className="h-3.5 w-3.5" /> {t.step8EmailLabel}
              </Label>
              <Input
                type="email"
                placeholder={t.step8EmailPlaceholder}
                value={data.email}
                onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => { setStep((s) => s - 1); setErrors({}); }}
            disabled={step === 1}
            className="text-brand-muted hover:text-brand-navy gap-1 text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> {t.backBtn}
          </Button>

          <div className="flex items-center gap-2">
            {currentStep.optional && (
              <Button
                variant="ghost"
                onClick={skipStep}
                className="text-brand-muted hover:text-brand-navy text-sm font-[600]"
              >
                {t.skipBtn}
              </Button>
            )}
            <Button
              onClick={next}
              disabled={loading}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-[700] rounded-full px-8 text-sm gap-2"
            >
              {loading ? t.submittingBtn : step === totalSteps ? t.submitBtn : t.nextBtn}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Pills */}
      {step > 1 && (
        <div className="mt-4 bg-brand-bg rounded-2xl border border-brand-border p-3 flex flex-wrap gap-2">
          {displayClass && (
            <span className="text-xs bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded-full font-[600]">
              {displayClass}
            </span>
          )}
          {data.subjects.map((s) => {
            const subjectLabel = s === "Others" && data.customSubject
              ? data.customSubject
              : (t.subjects[s as keyof typeof t.subjects] || s);
            return (
              <span key={s} className="text-xs bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded-full font-[600]">
                {subjectLabel}
              </span>
            );
          })}
          {displayBoard && step > 3 && (
            <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-[600]">
              {displayBoard}
            </span>
          )}
          {data.mode && step > 4 && (
            <span className="text-xs bg-brand-teal-light text-brand-teal-dark px-2.5 py-1 rounded-full font-[600]">
              {displayMode}
            </span>
          )}
          {displayLocation && step > 5 && (
            <span className="text-xs bg-gray-100 text-brand-text px-2.5 py-1 rounded-full font-[600]">
              {displayLocation}
            </span>
          )}
          {data.shiftTime && step > 6 && (
            <span className="text-xs bg-brand-yellow-light text-brand-yellow-dark px-2.5 py-1 rounded-full font-[600]">
              {displayShift}
            </span>
          )}
          {data.salaryBudget && step > 7 && (
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-[600]">
              {displaySalary}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

