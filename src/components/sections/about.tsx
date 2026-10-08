import {
  ArrowUpRight,
  Check,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AdvisorButton, JoinButton } from "@/components/ui/actions";
export function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-layout">
        <div className="about-visual reveal">
          <span className="eyebrow">THE GAP WE’RE HERE TO BRIDGE</span>
          <div>
            <span className="about-node">
              <GraduationCap size={28} />
              <strong>Campus</strong>
              <small>Learn the fundamentals.</small>
            </span>
            <span className="bridge-line">
              <ArrowRight size={25} />
              <small>Campus2Pro</small>
            </span>
            <span className="about-node">
              <Sparkles size={28} />
              <strong>Career</strong>
              <small>Put them into practice.</small>
            </span>
          </div>
          <p>Knowledge → Application → Confidence</p>
        </div>
        <div className="section-heading reveal">
          <span className="eyebrow">OUR PURPOSE</span>
          <h2>
            We help students
            <br />
            become industry-ready.
          </h2>
          <p>
            College teaches students the fundamentals. Industry expects students
            to apply them. Campus2Pro exists to bridge that gap.
          </p>
          <p>
            Through practical learning, project development, professional
            skills, and interview preparation, we help students confidently
            transition from campus to the professional world.
          </p>
        </div>
      </div>
    </section>
  );
}
export function Parents() {
  return (
    <section className="section parents-section">
      <div className="container parents-layout">
        <div className="section-heading reveal">
          <span className="eyebrow">FOR PARENTS, TOO</span>
          <h2>
            Invest in skills.
            <br />
            Build beyond certificates.
          </h2>
          <p>
            Help your student take a thoughtful step toward their future with
            structured learning and professional guidance.
          </p>
          <AdvisorButton>Talk to Our Team</AdvisorButton>
        </div>
        <div className="parents-list reveal">
          {[
            "Structured learning",
            "Practical project experience",
            "Professional guidance",
            "Interview preparation",
            "Career-focused curriculum",
            "Regular progress tracking",
          ].map((p, i) => (
            <div key={p}>
              <span>0{i + 1}</span>
              <strong>{p}</strong>
              <Check size={18} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Assessment() {
  return (
    <section id="career-assessment" className="assessment-section">
      <div className="container assessment-panel reveal">
        <div className="assessment-orbit" aria-hidden="true">
          <i />
          <i />
          <span>
            <Sparkles size={36} />
          </span>
        </div>
        <div>
          <span className="eyebrow">LET’S FIND YOUR DIRECTION</span>
          <h2>
            Not sure which career path
            <br />
            is right for you?
          </h2>
          <p>
            Tell us about your education, skills, and goals.
            <br className="desktop-break" /> We’ll help you find a suitable
            learning path.
          </p>
        </div>
        <JoinButton className="button button-white">
          Get Career Guidance
        </JoinButton>
      </div>
    </section>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container reveal">
        <span className="eyebrow">
          YOUR FUTURE IS A WORK IN PROGRESS. START BUILDING.
        </span>
        <h2>
          Your degree is
          <br />
          just the <span>beginning.</span>
        </h2>
        <p>Build the skills that take you from campus to career.</p>
        <div className="final-buttons">
          <JoinButton />
          <AdvisorButton />
        </div>
        <div className="final-signoff">
          A little curiosity. A little courage. A whole new chapter.{" "}
          <ArrowUpRight size={17} />
        </div>
      </div>
    </section>
  );
}
