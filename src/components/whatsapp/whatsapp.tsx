"use client";
import { track } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/whatsapp";
export function WhatsAppIcon({ size = 23 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6a11.9 11.9 0 0 0 5.7 1.5c6.6 0 12-5.4 12-12a11.9 11.9 0 0 0-3.5-8.4ZM12 21.9a9.9 9.9 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.8 9.8 0 0 1-1.5-5.3C2 6.4 6.5 2 12 2c5.5 0 10 4.5 10 10s-4.5 9.9-10 9.9Zm5.5-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.4-.5-.6-.5H8c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.2 2.7c.1.2 1.8 2.8 4.3 3.9.6.2 1.1.4 1.4.5.6.2 1.1.2 1.6.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" />
    </svg>
  );
}
export function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl()}
      className="floating-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Campus2Pro on WhatsApp"
      title="Chat with Campus2Pro"
      onClick={() => track("whatsapp_click", { source: "floating_button" })}
    >
      <WhatsAppIcon />
      <span>Chat with Campus2Pro</span>
    </a>
  );
}
