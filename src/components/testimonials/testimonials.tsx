import { MessageSquareQuote, Sprout } from "lucide-react";
export function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container stories-layout">
        <div className="section-heading reveal">
          <span className="eyebrow">REAL PEOPLE. REAL PROGRESS.</span>
          <h2>What our students say.</h2>
          <p>
            Good stories take time. We’re building ours with the students who
            take this journey with us.
          </p>
        </div>
        <div className="coming-soon-card reveal">
          <span className="quote-icon">
            <MessageSquareQuote size={29} />
          </span>
          <span className="tiny-pill">
            <Sprout size={13} /> The journey is beginning
          </span>
          <h3>
            Student success stories
            <br />
            coming soon.
          </h3>
          <p>
            Genuine experiences from our students will appear here as they
            complete their programs.
          </p>
        </div>
      </div>
    </section>
  );
}
