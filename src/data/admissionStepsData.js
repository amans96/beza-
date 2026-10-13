import { FileText, Upload, PenTool, GraduationCap } from 'lucide-react';

export const admissionStepsData = [
  {
    id: 1,
    stepNumber: 1,
    title: "Submit Application",
    description: "Start your journey by filling out our comprehensive online application form.",
    bullets: [
      "Complete the online application form.",
      "Provide accurate personal information.",
      "Review your details before submitting."
    ],
    icon: FileText
  },
  {
    id: 2,
    stepNumber: 2,
    title: "Required Documents",
    description: "Upload the necessary academic and personal documents for our admissions team to review.",
    bullets: [
      "Previous school transcripts and reports.",
      "Copy of student's passport or birth certificate.",
      "Recent passport-sized photographs."
    ],
    icon: Upload
  },
  {
    id: 3,
    stepNumber: 3,
    title: "Entrance Assessment",
    description: "Candidates will complete an age-appropriate academic assessment and a brief interview.",
    bullets: [
      "Mathematics and English proficiency test.",
      "Behavioral and social evaluation.",
      "Meeting with the Head of Admissions."
    ],
    icon: PenTool
  },
  {
    id: 4,
    stepNumber: 4,
    title: "Admission Confirmation",
    description: "Upon successful review, you will receive an official offer letter to join our school.",
    bullets: [
      "Review the official admission offer letter.",
      "Sign and return the enrollment agreement.",
      "Pay the registration fee to secure your seat."
    ],
    icon: GraduationCap
  }
];