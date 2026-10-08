import {
  Code2,
  Layers,
  Compass,
  BriefcaseBusiness,
  Hammer,
  BookOpen,
  FolderGit2,
  Mic,
  Route,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { JoinButton } from "@/components/ui/actions";
const benefits = [
  {
    icon: Code2,
    title: "Practical skills",
    text: "Learn technologies and skills used in real-world jobs.",
  },
  {
    icon: Layers,
    title: "Real projects",
    text: "Build work that strengthens your resume and portfolio.",
  },
  {
    icon: Compass,
    title: "Career preparation",
    text: "Prepare for aptitude tests, technical interviews, and HR rounds.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Industry readiness",
    text: "Build the confidence and professional skills to enter the workplace.",
  },
];
const reasons = [
  {
    icon: Hammer,
    title: "Learn by building",
    text: "Put every new concept into practice through real projects.",
  },
  {
    icon: BookOpen,
    title: "Industry-oriented curriculum",
    text: "Focus on practical skills used in modern jobs.",
  },
  {
    icon: FolderGit2,
    title: "A portfolio that speaks",
    text: "Showcase your work on GitHub, LinkedIn, and your resume.",
  },
  {
    icon: Mic,
    title: "Interview preparation",
    text: "Technical, aptitude, communication, and HR preparation.",
  },
  {
    icon: Route,
    title: "Personal career guidance",
    text: "Get direction on a career path that fits your interests.",
  },
  {
    icon: Target,
    title: "Readiness with a purpose",
    text: "The objective goes beyond completing a course: become job-ready.",
  },
];
export function TrustSection() {
  return (
    <section className="section trust-section">
      <div className="container">
        <div className="section-heading centered reveal">
          <span className="eyebrow">BEYOND THE CLASSROOM</span>
          <h2>
            Built for students who want
            <br />
            more than a degree.
          </h2>
          <p>
            A degree can help you enter the job market.
            <br className="desktop-break" /> Industry-ready skills help you
            stand out.
          </p>
        </div>
        <div className="trust-grid">
          {benefits.map((b) => (
            <article key={b.title} className="trust-item reveal">
              <b.icon size={26} />
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function WhyCampus2Pro() {
  return (
    <section id="why-campus2pro" className="section why-section">
      <div className="container why-layout">
        <div className="section-heading reveal">
          <span className="eyebrow">THE CAMPUS2PRO DIFFERENCE</span>
          <h2>
            Learn for the career
            <br />
            you want.
            <br />
            <span className="muted-heading">
              Build the future
              <br />
              you imagine.
            </span>
          </h2>
          <p>
            Why students choose Campus2Pro: a practical approach to closing the
            gap between knowing and doing.
          </p>
          <JoinButton className="text-button">
            Find your starting point
          </JoinButton>
          <div className="why-note">
            <span>01 → 05</span>
            <p>
              From your first assessment
              <br />
              to your next opportunity.
            </p>
            <ArrowUpRight size={24} />
          </div>
        </div>
        <div className="reason-grid">
          {reasons.map((r, i) => (
            <article key={r.title} className="reason-card reveal">
              <div>
                <r.icon size={23} />
                <span>0{i + 1}</span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
