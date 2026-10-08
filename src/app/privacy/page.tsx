import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy | Campus2Pro",
  alternates: { canonical: "/privacy/" },
};
export default function Privacy() {
  return (
    <main className="privacy-page container">
      <a href="/" className="text-button">
        ← Back to Campus2Pro
      </a>
      <span className="eyebrow">YOUR INFORMATION</span>
      <h1>Privacy at Campus2Pro</h1>
      <p>Last updated: 8 October 2026</p>
      <h2>Student enquiries</h2>
      <p>
        The enquiry form prepares your details in your browser’s memory. This
        website does not send form data to a backend, database, or analytics
        service, and does not save your details in local storage. Closing the
        form clears its contents.
      </p>
      <h2>Connecting on WhatsApp</h2>
      <p>
        Submitting the form opens WhatsApp with a pre-filled message containing
        your enquiry details. WhatsApp receives those details when its link is
        opened. You must tap Send in WhatsApp to share the message with the
        Campus2Pro team at +91 9005666050. Your use of WhatsApp is subject to
        WhatsApp’s privacy policy.
      </p>
      <h2>Contact permission</h2>
      <p>
        By checking the consent box, you agree to be contacted about training
        programs, career guidance, and placement preparation. You can ask our
        team on WhatsApp to stop contacting you or to delete enquiry details you
        have shared.
      </p>
      <h2>Site events</h2>
      <p>
        The website prepares non-personal interaction events, such as program
        clicks and form steps, for future analytics. No analytics service is
        currently connected. Form field values are not included in those events.
      </p>
      <h2>Information to avoid</h2>
      <p>
        Please do not include passwords, identity documents, financial
        information, or other sensitive information in your enquiry. We only ask
        for the details needed to guide you toward a learning path.
      </p>
      <h2>Questions</h2>
      <p>
        Contact Campus2Pro on WhatsApp at{" "}
        <a
          href="https://wa.me/919005666050"
          target="_blank"
          rel="noopener noreferrer"
        >
          +91 9005666050
        </a>
        .
      </p>
    </main>
  );
}
