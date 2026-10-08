import {
  Search,
  BookOpen,
  Layers,
  MessagesSquare,
  Rocket,
  ArrowRight,
  GraduationCap,
  Check,
  FileText,
  BriefcaseBusiness,
} from "lucide-react";
const steps = [
  {
    title: "Assess",
    icon: Search,
    description: "Understand your current level, goals, and career interests.",
  },
  {
    title: "Learn",
    icon: BookOpen,
    description:
      "Build strong foundations with structured, practical learning.",
  },
  {
    title: "Build",
    icon: Layers,
    description: "Create real projects and develop a professional portfolio.",
  },
  {
    title: "Prepare",
    icon: MessagesSquare,
    description: "Practice aptitude, interviews, communication, and HR rounds.",
  },
  {
    title: "Launch",
    icon: Rocket,
    description: "Become placement-ready and start applying for opportunities.",
  },
];
export function Methodology() {
  return (
    <section id="how-it-works" className="section methodology">
      <div className="container">
        <div className="section-heading centered reveal">
          <span className="eyebrow">A CLEAR PATH FORWARD</span>
          <h2>Our 5-step career journey.</h2>
          <p>Big ambitions. Small, meaningful steps. A plan to connect them.</p>
        </div>
        <ol className="method-steps">
          {steps.map((s, i) => (
            <li className="method-step reveal" key={s.title}>
              <div className="method-icon">
                <s.icon size={24} />
                <span>0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function Roadmap() {
  const milestones = [
    { icon: GraduationCap, label: "College", text: "Your starting point" },
    { icon: Search, label: "Skill assessment", text: "Know where you stand" },
    {
      icon: ArrowRight,
      label: "Choose your path",
      text: "Follow your interests",
    },
    { icon: BookOpen, label: "Learn", text: "Build your foundations" },
    { icon: Layers, label: "Build projects", text: "Put skills into action" },
    { icon: FileText, label: "Build your resume", text: "Tell your story" },
    {
      icon: MessagesSquare,
      label: "Mock interviews",
      text: "Practice with purpose",
    },
    { icon: Check, label: "Placement preparation", text: "Get ready to apply" },
    { icon: BriefcaseBusiness, label: "Career", text: "Your next chapter" },
  ];
  return (
    <section className="section roadmap-section">
      <div className="container roadmap-layout">
        <div className="section-heading reveal">
          <span className="eyebrow">FROM WHERE YOU ARE TO WHAT’S NEXT</span>
          <h2>
            Your career,
            <br />
            mapped step by step.
          </h2>
          <p>
            You don’t need to have it all figured out. You just need a starting
            point and a path to keep moving.
          </p>
          <div className="roadmap-note">
            <span className="status-dot" /> A direction, not a shortcut.
          </div>
        </div>
        <ol className="roadmap-grid">
          {milestones.map((m, i) => (
            <li
              key={m.label}
              className={`roadmap-node reveal ${i === 0 || i === 8 ? "endpoint" : ""}`}
            >
              <span className="roadmap-index">0{i + 1}</span>
              <m.icon size={21} />
              <strong>{m.label}</strong>
              <p>{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
