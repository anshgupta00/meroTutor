export type TeachingMode = "home" | "online" | "both";
export type Gender = "male" | "female";
export type Availability = "morning" | "afternoon" | "evening" | "flexible";

export interface FeeRange {
  min: number;
  max: number;
  currency: "NPR";
  per: "hour" | "month";
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Tutor {
  id: string;
  name: string;
  photo: string;
  qualification: string;
  subjects: string[];
  classes: string[];
  location: string[];
  mode: TeachingMode;
  experience: number; // years
  fee: FeeRange;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  availability: Availability[];
  about: string;
  isVerified: boolean;
  gender: Gender;
  teachingAreas: string[];
  education: EducationEntry[];
  teachingExperience: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
}

export type TutorFilterState = {
  subject: string;
  class: string;
  location: string;
  mode: TeachingMode | "all";
  experience: string; // "any" | "1+" | "3+" | "5+"
  gender: Gender | "any";
  maxFee: number | null;
  availability: Availability | "any";
  sortBy: "recommended" | "experience" | "rating" | "fee-low" | "fee-high";
};
