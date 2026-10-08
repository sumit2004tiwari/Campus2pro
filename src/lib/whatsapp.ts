import type { StudentEnquiry } from "@/types";
import { WHATSAPP_NUMBER } from "./config";
export { WHATSAPP_NUMBER } from "./config";
export function formatEnquiry(data: StudentEnquiry): string {
  const value = (text: string) => text.trim() || "Not provided";
  return [
    "Campus2Pro – New Student Enquiry",
    "",
    `Name: ${value(data.fullName)}`,
    `Mobile: ${value(data.mobile)}`,
    `WhatsApp: ${value(data.whatsapp || data.mobile)}`,
    `Email: ${value(data.email)}`,
    `City: ${value(data.city)}`,
    "",
    `College: ${value(data.college)}`,
    `Course: ${value(data.course)}`,
    `Branch: ${value(data.branch)}`,
    `Year: ${value(data.currentYear)}`,
    `Graduation: ${value(data.graduationYear)}`,
    `CGPA / Percentage: ${value(data.cgpa)}`,
    "",
    `Career Goal: ${value(data.careerGoal)}`,
    `Interested Areas: ${data.interestedAreas.join(", ")}`,
    `Skill Level: ${value(data.skillLevel)}`,
    `Biggest Challenge: ${value(data.challenge)}`,
    "",
    `Learning Mode: ${value(data.learningMode)}`,
    `Preferred Timing: ${value(data.timing)}`,
    `Message: ${value(data.message)}`,
    "",
    "Contact consent: Yes",
    "Source: Campus2Pro Website",
  ].join("\n");
}
export function getWhatsAppUrl(message?: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
export function enquiryWhatsAppUrl(data: StudentEnquiry): string {
  return getWhatsAppUrl(formatEnquiry(data));
}
export function openWhatsApp(url: string): boolean {
  const opened = window.open(url, "_blank");
  if (opened) opened.opener = null;
  return Boolean(opened);
}
