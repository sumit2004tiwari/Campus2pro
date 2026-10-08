import { Check, FileCheck2, ArrowUpRight, ShieldCheck } from "lucide-react";
import { AdvisorButton } from "@/components/ui/actions";
export function Placement() {
  return (
    <section id="placement" className="section placement-section">
      <div className="container placement-layout">
        <div className="placement-visual reveal">
          <div className="interview-card">
            <div className="interview-top">
              <span>
                <FileCheck2 size={18} /> CAREER READINESS
              </span>
              <span className="tiny-pill">Your toolkit</span>
            </div>
            <h3>
              Show your skills.
              <br />
              Tell your story.
            </h3>
            {[
              "A resume with substance",
              "A portfolio of real work",
              "Interview practice",
              "A focused application plan",
            ].map((x) => (
              <div className="readiness-row" key={x}>
                <span>
                  <Check size={15} />
                </span>
                {x}
              </div>
            ))}
            <div className="interview-footer">
              Prepared for the next conversation.
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="honest-label">
            <ShieldCheck size={18} /> Real preparation. Honest expectations.
          </div>
        </div>
        <div className="section-heading reveal">
          <span className="eyebrow">PREPARATION WITH PURPOSE</span>
          <h2>
            Training designed for
            <br />
            real career outcomes.
          </h2>
          <p>
            Skills are one part of the journey. Knowing how to present them is
            another. We help you prepare for both.
          </p>
          <div className="placement-checks">
            {[
              "Resume preparation",
              "Portfolio building",
              "Technical interview preparation",
              "Aptitude preparation",
              "Mock interviews",
              "Communication training",
              "Job application guidance",
              "Career counselling",
            ].map((x) => (
              <span key={x}>
                <Check size={16} />
                {x}
              </span>
            ))}
          </div>
          <AdvisorButton />
          <p className="honesty-note">
            We focus on career readiness and placement preparation. Jobs and
            placements are not guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}
