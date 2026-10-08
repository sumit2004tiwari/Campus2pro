"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  X,
  Check,
  CheckCheck,
  ShieldCheck,
  GraduationCap,
  ArrowUpRight,
  LoaderCircle,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp";
import {
  careerGoals,
  careerAreas,
  skillLevels,
  challenges,
} from "@/data/form-options";
import { emptyEnquiry, normalizeMobile, validateStep } from "@/lib/validation";
import { enquiryWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import type { StudentEnquiry, FormErrors } from "@/types";
const stepTitles = [
  "Personal details",
  "Academic details",
  "Career goals",
  "Batch preferences",
];
const programArea: Record<string, string> = {
  "AI & Machine Learning": "AI / Machine Learning",
  "Cloud & DevOps": "Cloud / DevOps",
  "Career & Placement": "Aptitude & Placement",
};
export function Registration() {
  const [open, setOpen] = useState(false);
  const [program, setProgram] = useState("");
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      setProgram(detail?.program || "");
      setOpen(true);
    };
    window.addEventListener("campus:register", handler);
    return () => window.removeEventListener("campus:register", handler);
  }, []);
  return open ? (
    <RegistrationForm program={program} onClose={() => setOpen(false)} />
  ) : null;
}
function RegistrationForm({
  program,
  onClose,
}: {
  program: string;
  onClose: () => void;
}) {
  const [data, setData] = useState<StudentEnquiry>(() => ({
    ...emptyEnquiry,
    interestedAreas: program ? [programArea[program] || program] : [],
  }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [completed, setCompleted] = useState(false);
  const [sending, setSending] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastSubmit = useRef(0);
  const completedRef = useRef(false);
  const stageRef = useRef(0);
  stageRef.current = step;
  const abandonmentTracked = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    track("form_started", { source: program || "general" });
    const abandoned = () => {
      if (!completedRef.current && !abandonmentTracked.current) {
        track("form_abandoned", { step: stageRef.current + 1 });
        abandonmentTracked.current = true;
      }
    };
    window.addEventListener("pagehide", abandoned);
    return () => {
      abandoned();
      window.removeEventListener("pagehide", abandoned);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [program]);
  useEffect(() => {
    if (step > 0 || completed) titleRef.current?.focus();
  }, [step, completed]);
  function update<K extends keyof StudentEnquiry>(
    key: K,
    value: StudentEnquiry[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }
  function showErrors(found: FormErrors) {
    setErrors(found);
    requestAnimationFrame(() =>
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus(),
    );
  }
  function send(url: string) {
    const now = Date.now();
    if (now - lastSubmit.current < 3000) return;
    lastSubmit.current = now;
    setSending(true);
    const opened = openWhatsApp(url);
    setBlocked(!opened);
    setSent(opened);
    track("whatsapp_click", { source: "registration" });
    timerRef.current = setTimeout(() => setSending(false), 3000);
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateStep(data, step);
    if (Object.keys(found).length) {
      showErrors(found);
      return;
    }
    if (step < 3) {
      setErrors({});
      setStep(step + 1);
      return;
    }
    for (let i = 0; i < 4; i++) {
      const prior = validateStep(data, i);
      if (Object.keys(prior).length) {
        setStep(i);
        showErrors(prior);
        return;
      }
    }
    if (completedRef.current) return;
    const normalized = {
      ...data,
      mobile: normalizeMobile(data.mobile),
      whatsapp: normalizeMobile(data.whatsapp),
    };
    setData(normalized);
    completedRef.current = true;
    setCompleted(true);
    track("form_completed", { areas: data.interestedAreas.length });
    send(enquiryWhatsAppUrl(normalized));
  }
  const field = (
    key: keyof StudentEnquiry,
    label: string,
    options?: {
      type?: string;
      required?: boolean;
      placeholder?: string;
      autoComplete?: string;
      maxLength?: number;
    },
  ) => (
    <div className="field" key={key}>
      <label htmlFor={`field-${key}`}>
        {label}
        {options?.required && <span aria-hidden="true"> *</span>}
        {!options?.required && <small> optional</small>}
      </label>
      <input
        id={`field-${key}`}
        name={key}
        type={options?.type || "text"}
        autoComplete={options?.autoComplete}
        placeholder={options?.placeholder}
        maxLength={options?.maxLength || 120}
        value={String(data[key])}
        required={options?.required}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `error-${key}` : undefined}
        onChange={(e) => update(key, e.target.value as never)}
      />
      {errors[key] && (
        <p className="field-error" id={`error-${key}`}>
          {errors[key]}
        </p>
      )}
    </div>
  );
  const select = (
    key: keyof StudentEnquiry,
    label: string,
    values: string[],
    required = false,
  ) => (
    <div className="field" key={key}>
      <label htmlFor={`field-${key}`}>
        {label}
        {required ? (
          <span aria-hidden="true"> *</span>
        ) : (
          <small> optional</small>
        )}
      </label>
      <select
        id={`field-${key}`}
        value={String(data[key])}
        required={required}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `error-${key}` : undefined}
        onChange={(e) => update(key, e.target.value as never)}
      >
        <option value="">Choose an option</option>
        {values.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
      {errors[key] && (
        <p className="field-error" id={`error-${key}`}>
          {errors[key]}
        </p>
      )}
    </div>
  );
  return (
    <Modal
      label={completed ? "Enquiry ready" : "Student enquiry"}
      onClose={onClose}
    >
      <div className="registration">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close enquiry form"
        >
          <X size={22} />
        </button>
        {completed ? (
          <div className="success-screen">
            <span className="success-icon">
              <CheckCheck size={38} />
            </span>
            <span className="eyebrow">YOUR NEXT CHAPTER IS CLOSE</span>
            <h2 ref={titleRef} tabIndex={-1}>
              You’re almost there!
            </h2>
            <p>
              Your details are ready. Send your information to the Campus2Pro
              team on WhatsApp to complete your enquiry.
            </p>
            <div className="enquiry-summary">
              <strong>{data.fullName}</strong>
              <span>{data.interestedAreas.join(" · ")}</span>
              <span>{data.college}</span>
            </div>
            <button
              className="button button-whatsapp"
              disabled={sending}
              onClick={() => send(enquiryWhatsAppUrl(data))}
            >
              {sending ? (
                <LoaderCircle className="spin" size={20} />
              ) : (
                <WhatsAppIcon size={20} />
              )}{" "}
              {sending ? "Opening WhatsApp…" : "Send Details on WhatsApp"}
              <ArrowUpRight size={18} />
            </button>
            <div className="success-status" role="status">
              {blocked
                ? "Your browser blocked the new tab. Use the link below to open WhatsApp."
                : sent
                  ? "WhatsApp has opened. Remember to tap Send there to share your enquiry."
                  : "Your enquiry is prepared and ready to send."}
            </div>
            {blocked && (
              <a
                className="text-button"
                href={enquiryWhatsAppUrl(data)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("whatsapp_click", { source: "popup_fallback" })
                }
              >
                Open WhatsApp directly <ArrowUpRight size={16} />
              </a>
            )}
            <div className="next-step">
              <strong>What happens next?</strong>
              <p>
                After you send the message, our team will review your profile
                and contact you about a suitable program and upcoming batch.
              </p>
            </div>
            <button className="text-button" onClick={onClose}>
              Back to exploring <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="registration-header">
              <span className="form-brand">
                <GraduationCap size={21} /> CAMPUS2PRO
              </span>
              <h2 ref={titleRef} tabIndex={-1}>
                Let’s build your next chapter.
              </h2>
              <p>A few details to help us guide you in the right direction.</p>
            </div>
            <ol className="form-progress" aria-label="Enquiry progress">
              {stepTitles.map((s, i) => (
                <li
                  key={s}
                  className={`${step === i ? "current" : ""} ${step > i ? "done" : ""}`}
                  aria-current={step === i ? "step" : undefined}
                >
                  <span>{step > i ? <Check size={15} /> : i + 1}</span>
                  <small>{s}</small>
                </li>
              ))}
            </ol>
            <form onSubmit={submit} ref={formRef} noValidate>
              <div className="form-step-title">
                <h3>{stepTitles[step]}</h3>
                <span>Step {step + 1} of 4</span>
              </div>
              <p className="required-note">Fields marked * are required.</p>
              <div className="fields-grid">
                {step === 0 && (
                  <>
                    {field("fullName", "Full name", {
                      required: true,
                      autoComplete: "name",
                      placeholder: "Your full name",
                      maxLength: 80,
                    })}
                    {field("mobile", "Mobile number", {
                      required: true,
                      type: "tel",
                      autoComplete: "tel",
                      placeholder: "10-digit Indian mobile number",
                      maxLength: 18,
                    })}
                    {field("whatsapp", "WhatsApp number", {
                      type: "tel",
                      placeholder: "Leave blank if same as mobile",
                      maxLength: 18,
                    })}
                    {field("email", "Email address", {
                      required: true,
                      type: "email",
                      autoComplete: "email",
                      placeholder: "you@example.com",
                      maxLength: 254,
                    })}
                    {field("city", "City", {
                      required: true,
                      autoComplete: "address-level2",
                      placeholder: "Your city",
                      maxLength: 80,
                    })}
                  </>
                )}
                {step === 1 && (
                  <>
                    {field("college", "College / University", {
                      required: true,
                      placeholder: "Your college or university",
                    })}
                    {field("course", "Course / Degree", {
                      required: true,
                      placeholder: "e.g. B.Tech, B.Com, BCA",
                    })}
                    {field("branch", "Branch / Specialization", {
                      required: true,
                      placeholder: "e.g. Computer Science",
                    })}
                    {field("currentYear", "Current year / Semester", {
                      required: true,
                      placeholder: "e.g. 3rd year / 5th semester",
                    })}
                    {field("graduationYear", "Graduation year", {
                      required: true,
                      placeholder: "e.g. 2027",
                      maxLength: 4,
                    })}
                    {field("cgpa", "CGPA / Percentage", {
                      placeholder: "e.g. 7.8 CGPA or 78%",
                      maxLength: 20,
                    })}
                  </>
                )}
                {step === 2 && (
                  <>
                    {select(
                      "careerGoal",
                      "What are you looking for?",
                      careerGoals,
                      true,
                    )}
                    {select(
                      "skillLevel",
                      "Current skill level",
                      skillLevels,
                      true,
                    )}
                    <fieldset className="career-areas">
                      <legend>
                        Interested career areas <span>*</span>
                        <small>Choose one or more</small>
                      </legend>
                      <div className="area-choices">
                        {careerAreas.map((area, i) => (
                          <label
                            key={area}
                            className={
                              data.interestedAreas.includes(area)
                                ? "selected"
                                : ""
                            }
                          >
                            <input
                              type="checkbox"
                              name="interestedAreas"
                              checked={data.interestedAreas.includes(area)}
                              aria-invalid={i === 0 && !!errors.interestedAreas}
                              aria-describedby={
                                errors.interestedAreas
                                  ? "error-interestedAreas"
                                  : undefined
                              }
                              onChange={(e) =>
                                update(
                                  "interestedAreas",
                                  e.target.checked
                                    ? [...data.interestedAreas, area]
                                    : data.interestedAreas.filter(
                                        (x) => x !== area,
                                      ),
                                )
                              }
                            />
                            <span>{area}</span>
                          </label>
                        ))}
                      </div>
                      {errors.interestedAreas && (
                        <p className="field-error" id="error-interestedAreas">
                          {errors.interestedAreas}
                        </p>
                      )}
                    </fieldset>
                    {select(
                      "challenge",
                      "Biggest career challenge",
                      challenges,
                    )}
                  </>
                )}
                {step === 3 && (
                  <>
                    {select("learningMode", "Preferred learning mode", [
                      "Offline",
                      "Online",
                      "Hybrid",
                    ])}
                    {select("timing", "Preferred timing", [
                      "Morning",
                      "Afternoon",
                      "Evening",
                      "Weekend",
                      "Flexible",
                    ])}
                    <div className="field full-width">
                      <label htmlFor="field-message">
                        Additional message <small>optional</small>
                      </label>
                      <textarea
                        id="field-message"
                        maxLength={1000}
                        rows={4}
                        value={data.message}
                        placeholder="Tell us about your career goal or anything you would like our team to know."
                        onChange={(e) => update("message", e.target.value)}
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "error-message" : undefined
                        }
                      />
                      <span className="character-count">
                        {data.message.length}/1,000
                      </span>
                      {errors.message && (
                        <p className="field-error" id="error-message">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div className="consent-field">
                      <label>
                        <input
                          id="field-consent"
                          type="checkbox"
                          checked={data.consent}
                          required
                          aria-invalid={!!errors.consent}
                          aria-describedby={
                            errors.consent ? "error-consent" : undefined
                          }
                          onChange={(e) => update("consent", e.target.checked)}
                        />
                        <span>
                          I agree to be contacted by Campus2Pro regarding
                          training programs, career guidance and placement
                          preparation. *
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="field-error" id="error-consent">
                          {errors.consent}
                        </p>
                      )}
                    </div>
                    <div className="privacy-note">
                      <ShieldCheck size={18} />
                      <p>
                        Your details are prepared in your browser. They are
                        shared with our team only when you send the message on
                        WhatsApp.{" "}
                        <a
                          href="/privacy/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy policy
                        </a>
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </div>
              {errors.website && (
                <p className="field-error" role="alert">
                  {errors.website}
                </p>
              )}
              <div className="form-actions">
                {step > 0 ? (
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() => {
                      setErrors({});
                      setStep(step - 1);
                    }}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <span className="form-safe">
                    <ShieldCheck size={15} /> No payment required
                  </span>
                )}
                <button className="button button-primary" type="submit">
                  {step === 3 ? "Submit & Connect on WhatsApp" : "Continue"}
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}
