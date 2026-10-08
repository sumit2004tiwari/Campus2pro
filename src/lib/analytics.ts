export type AnalyticsEvent =
  | "page_view"
  | "program_click"
  | "join_batch_click"
  | "whatsapp_click"
  | "form_started"
  | "form_completed"
  | "form_abandoned"
  | "career_advisor_click";
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
// Only non-personal event metadata is emitted. Attach GTM/GA when ready.
export function track(
  event: AnalyticsEvent,
  metadata: Record<string, string | number> = {},
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...metadata });
}
