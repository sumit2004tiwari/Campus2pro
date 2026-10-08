import type { StudentEnquiry, FormErrors } from "@/types";
export const emptyEnquiry: StudentEnquiry = {
  fullName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  city: "",
  college: "",
  course: "",
  branch: "",
  currentYear: "",
  graduationYear: "",
  cgpa: "",
  careerGoal: "",
  interestedAreas: [],
  skillLevel: "",
  challenge: "",
  learningMode: "",
  timing: "",
  message: "",
  consent: false,
  website: "",
};
export function normalizeMobile(value: string): string {
  return value.replace(/[\s()-]/g, "").replace(/^(\+91|91)(?=\d{10}$)/, "");
}
export function validateStep(data: StudentEnquiry, step: number): FormErrors {
  const errors: FormErrors = {};
  const required = (
    key: keyof StudentEnquiry,
    label: string,
    min = 2,
    max = 120,
  ) => {
    const val = String(data[key]).trim();
    if (!val) errors[key] = `Please enter ${label}.`;
    else if (val.length < min)
      errors[key] = `Please enter at least ${min} characters.`;
    else if (val.length > max)
      errors[key] = `Please keep this under ${max} characters.`;
  };
  if (step === 0) {
    required("fullName", "your full name", 2, 80);
    required("city", "your city", 2, 80);
    if (!/^[6-9]\d{9}$/.test(normalizeMobile(data.mobile)))
      errors.mobile = "Please enter a valid 10-digit Indian mobile number.";
    if (
      data.whatsapp.trim() &&
      !/^[6-9]\d{9}$/.test(normalizeMobile(data.whatsapp))
    )
      errors.whatsapp = "Please enter a valid 10-digit Indian WhatsApp number.";
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) ||
      data.email.length > 254
    )
      errors.email = "Please enter a valid email address.";
  }
  if (step === 1) {
    required("college", "your college or university");
    required("course", "your course or degree");
    required("branch", "your branch or specialization");
    required("currentYear", "your current year or semester");
    const year = Number(data.graduationYear);
    if (
      !/^\d{4}$/.test(data.graduationYear) ||
      year < new Date().getFullYear() - 20 ||
      year > new Date().getFullYear() + 10
    )
      errors.graduationYear =
        "Please enter a valid four-digit graduation year.";
    if (data.cgpa.length > 20)
      errors.cgpa = "Please keep this under 20 characters.";
  }
  if (step === 2) {
    if (!data.careerGoal) errors.careerGoal = "Please choose your career goal.";
    if (!data.interestedAreas.length)
      errors.interestedAreas = "Please choose at least one career area.";
    if (!data.skillLevel)
      errors.skillLevel = "Please choose your current skill level.";
  }
  if (step === 3) {
    if (!data.consent)
      errors.consent =
        "Please agree to be contacted so we can help with your enquiry.";
    if (data.message.length > 1000)
      errors.message = "Please keep your message under 1,000 characters.";
    if (data.website)
      errors.website = "We could not prepare this enquiry. Please try again.";
  }
  return errors;
}
