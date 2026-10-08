"use client";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/whatsapp";
export function JoinButton({
  children = "Join the Next Batch",
  className = "button button-primary",
  program,
}: {
  children?: React.ReactNode;
  className?: string;
  program?: string;
}) {
  return (
    <button
      className={className}
      onClick={(event) => {
        event.currentTarget.focus({ preventScroll: true });
        track("join_batch_click", { location: program || "page" });
        window.dispatchEvent(
          new CustomEvent("campus:register", { detail: { program } }),
        );
      }}
    >
      {children}
      <ArrowUpRight size={18} />
    </button>
  );
}
export function AdvisorButton({
  children = "Talk to a Career Advisor",
  className = "button button-outline",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={getWhatsAppUrl(
        "Hi Campus2Pro! I would like to talk to a career advisor about the right learning path for me.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("career_advisor_click");
        track("whatsapp_click", { source: "career_advisor" });
      }}
    >
      <MessageCircle size={18} />
      {children}
    </a>
  );
}
