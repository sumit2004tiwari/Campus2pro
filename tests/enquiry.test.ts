import { test } from "node:test";
import assert from "node:assert/strict";
import {
  emptyEnquiry,
  normalizeMobile,
  validateStep,
} from "../src/lib/validation";
import {
  formatEnquiry,
  enquiryWhatsAppUrl,
  getWhatsAppUrl,
} from "../src/lib/whatsapp";
const complete = {
  ...emptyEnquiry,
  fullName: "Rahul Sharma",
  mobile: "+91 98765 43210",
  email: "rahul@example.com",
  city: "Lucknow",
  college: "ABC College",
  course: "B.Tech",
  branch: "Computer Science",
  currentYear: "3rd Year",
  graduationYear: "2027",
  cgpa: "7.8",
  careerGoal: "Placement Preparation",
  interestedAreas: ["Full Stack Development", "AI / Machine Learning"],
  skillLevel: "Basic",
  challenge: "Interview",
  learningMode: "Offline",
  timing: "Evening",
  message: "I want to build projects & prepare for interviews.\nLet’s talk!",
  consent: true,
};
test("complete enquiry passes every step", () => {
  for (let step = 0; step < 4; step++)
    assert.deepEqual(validateStep(complete, step), {});
});
test("required fields and consent are enforced", () => {
  assert.equal(Object.keys(validateStep(emptyEnquiry, 0)).length, 4);
  assert.equal(Object.keys(validateStep(emptyEnquiry, 1)).length, 5);
  assert.equal(Object.keys(validateStep(emptyEnquiry, 2)).length, 3);
  assert.ok(validateStep(emptyEnquiry, 3).consent);
});
test("Indian numbers normalize without accepting invalid prefixes", () => {
  for (const value of [
    "9876543210",
    "+91 98765 43210",
    "919876543210",
    "(98765) 43210",
  ])
    assert.equal(normalizeMobile(value), "9876543210");
  for (const value of [
    "1234567890",
    "987654321",
    "+1 9876543210",
    "abcdefghij",
  ])
    assert.ok(validateStep({ ...complete, mobile: value }, 0).mobile);
  assert.ok(validateStep({ ...complete, whatsapp: "123" }, 0).whatsapp);
});
test("email, years, and maximum lengths are checked", () => {
  assert.ok(validateStep({ ...complete, email: "bad@" }, 0).email);
  assert.ok(
    validateStep({ ...complete, fullName: "A".repeat(81) }, 0).fullName,
  );
  assert.ok(
    validateStep({ ...complete, graduationYear: "9999" }, 1).graduationYear,
  );
  assert.ok(
    validateStep({ ...complete, message: "x".repeat(1001) }, 3).message,
  );
});
test("WhatsApp message preserves every field and encodes special characters", () => {
  const url = new URL(enquiryWhatsAppUrl(complete));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/919005666050");
  assert.equal(url.searchParams.get("text"), formatEnquiry(complete));
  for (const value of [
    "Rahul Sharma",
    "rahul@example.com",
    "ABC College",
    "B.Tech",
    "Computer Science",
    "3rd Year",
    "2027",
    "7.8",
    "Placement Preparation",
    "Full Stack Development, AI / Machine Learning",
    "Basic",
    "Interview",
    "Offline",
    "Evening",
    complete.message,
    "Source: Campus2Pro Website",
  ])
    assert.ok(formatEnquiry(complete).includes(value));
  assert.ok(!formatEnquiry(complete).includes("website:"));
  assert.equal(getWhatsAppUrl(), "https://wa.me/919005666050");
});
test("empty optional values and honeypot are handled", () => {
  assert.ok(
    formatEnquiry({ ...complete, mobile: "9876543210" }).includes(
      "WhatsApp: 9876543210",
    ),
  );
  assert.ok(validateStep({ ...complete, website: "spam" }, 3).website);
});
