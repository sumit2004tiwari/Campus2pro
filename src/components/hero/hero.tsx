import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  GraduationCap,
  BriefcaseBusiness,
  Layers,
  Sparkles,
  GitBranch,
  Terminal,
  CircleCheck,
  Mic,
  Zap,
} from "lucide-react";
import { JoinButton } from "@/components/ui/actions";
export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-grid-bg" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-badge">
            <span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE
          </div>
          <p className="hero-overline">
            Career-focused learning for college students
          </p>
          <h1>
            From Campus
            <br />
            to{" "}
            <span className="career-word">
              Career
              <svg viewBox="0 0 330 18" fill="none" aria-hidden="true">
                <path
                  d="M3 13C81 2 219 1 326 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="heading-period">.</span>
          </h1>
          <h2>Build Skills. Build Projects. Get Hired.</h2>
          <p className="hero-description">
            Your degree is the beginning. Build industry-ready skills,
            real-world projects, and the confidence to take your next career
            step.
          </p>
          <div className="hero-buttons">
            <JoinButton />
            <a href="#programs" className="button button-outline">
              Explore Programs <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-trust">
            {[
              "Practical learning",
              "Real projects",
              "Industry skills",
              "Placement preparation",
            ].map((x) => (
              <span key={x}>
                <CircleCheck size={14} />
                {x}
              </span>
            ))}
          </div>
        </div>
        <div
          className="hero-visual"
          aria-label="Illustration of the journey from college student to career-ready professional"
        >
          <div className="floating-chip chip-top">
            <Sparkles size={16} />
            <span>Built for your next big move</span>
          </div>
          <div className="career-dashboard">
            <div className="dashboard-top">
              <div className="mini-logo">
                <Layers size={18} /> Your career workspace
              </div>
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="dashboard-body">
              <div className="dashboard-greeting">
                <span className="eyebrow">THE CAMPUS2PRO JOURNEY</span>
                <h3>Potential → Possibility.</h3>
                <p>One practical step at a time.</p>
              </div>
              <div className="journey-list">
                {[
                  {
                    icon: GraduationCap,
                    label: "Start with curiosity",
                    desc: "College student",
                    tag: "01",
                    color: "blue",
                  },
                  {
                    icon: Code2,
                    label: "Learn industry skills",
                    desc: "Turn knowledge into ability",
                    tag: "02",
                    color: "purple",
                  },
                  {
                    icon: Layers,
                    label: "Build real projects",
                    desc: "Create a portfolio that speaks",
                    tag: "03",
                    color: "teal",
                  },
                  {
                    icon: Mic,
                    label: "Prepare for interviews",
                    desc: "Practice. Improve. Show up.",
                    tag: "04",
                    color: "orange",
                  },
                  {
                    icon: BriefcaseBusiness,
                    label: "Become career-ready",
                    desc: "Your professional chapter",
                    tag: "05",
                    color: "blue",
                  },
                ].map((s, i) => (
                  <div
                    key={s.tag}
                    className={`journey-row ${i === 4 ? "journey-last" : ""}`}
                  >
                    <span className={`icon-box ${s.color}`}>
                      <s.icon size={20} />
                    </span>
                    <div>
                      <strong>{s.label}</strong>
                      <p>{s.desc}</p>
                    </div>
                    <span className="journey-number">
                      {i === 4 ? <ArrowUpRight size={19} /> : s.tag}
                    </span>
                  </div>
                ))}
              </div>
              <div className="dashboard-bottom">
                <span>
                  <span className="status-dot" /> Learning by doing
                </span>
                <span>
                  Always moving forward <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </div>
          <div className="floating-card code-card">
            <div>
              <Terminal size={15} /> project.js <span className="code-dot" />
            </div>
            <code>
              <span>const</span> future = {"{"}
              <br />
              &nbsp; skills: <em>"industry-ready"</em>,<br />
              &nbsp; mindset: <em>"let’s build"</em>
              <br />
              {"}"};
            </code>
            <p>
              <GitBranch size={13} /> Your first commit to your career.
            </p>
          </div>
          <div className="floating-card ready-card">
            <span className="ready-icon">
              <Check size={18} />
            </span>
            <div>
              <strong>Future you is ready.</strong>
              <p>Skills + projects + confidence</p>
            </div>
          </div>
          <div className="visual-corner">
            <Zap size={14} /> Less theory. More doing.
          </div>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>
          A DEGREE OPENS THE DOOR.
          <br />
          <strong>Skills help you walk through it.</strong>
        </span>
        <div>
          <span>LEARN WITH PURPOSE</span>
          <ArrowRight size={20} />
          <span>BUILD WITH CONFIDENCE</span>
          <ArrowRight size={20} />
          <span>GROW INTO YOUR CAREER</span>
        </div>
      </div>
    </section>
  );
}
