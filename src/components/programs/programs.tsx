"use client";
import { useEffect, useState } from "react";
import {
  Code2,
  BrainCircuit,
  ChartNoAxesCombined,
  Smartphone,
  Cloud,
  BriefcaseBusiness,
  ArrowUpRight,
  Check,
  X,
} from "lucide-react";
import { programs } from "@/data/programs";
import type { Program } from "@/types";
import { track } from "@/lib/analytics";
import { JoinButton } from "@/components/ui/actions";
import { Modal } from "@/components/ui/modal";
const icons = {
  code: Code2,
  brain: BrainCircuit,
  chart: ChartNoAxesCombined,
  phone: Smartphone,
  cloud: Cloud,
  briefcase: BriefcaseBusiness,
};
export function Programs() {
  const [filter, setFilter] = useState("All programs");
  const [selected, setSelected] = useState<Program | null>(null);
  useEffect(() => {
    const close = () => setSelected(null);
    window.addEventListener("campus:register", close);
    return () => window.removeEventListener("campus:register", close);
  }, []);
  return (
    <section id="programs" className="section programs-section">
      <div className="container">
        <div className="section-heading section-heading-row reveal">
          <div>
            <span className="eyebrow">SKILLS THAT TAKE YOU PLACES</span>
            <h2>Choose your career path.</h2>
            <p>Learn the skills companies actually look for.</p>
          </div>
          <div className="section-aside">
            <span className="small-line" /> Your ambition. Your direction.
          </div>
        </div>
        <div className="program-filters" aria-label="Filter programs">
          {["All programs", "Development", "Data & AI", "Career"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="program-grid">
          {programs
            .filter((p) => filter === "All programs" || p.category === filter)
            .map((p) => {
              const Icon = icons[p.icon];
              return (
                <article className="program-card" key={p.id}>
                  <div className="program-card-top">
                    <span className={`icon-box ${p.color}`}>
                      <Icon size={25} />
                    </span>
                    <span className="program-category">{p.category}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.skills.slice(0, 4).map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                    {p.skills.length > 4 && (
                      <span>+{p.skills.length - 4} more</span>
                    )}
                  </div>
                  <button
                    className="program-link"
                    onClick={(event) => {
                      event.currentTarget.focus({ preventScroll: true });
                      setSelected(p);
                      track("program_click", { program: p.name });
                    }}
                  >
                    Explore Program <ArrowUpRight size={19} />
                  </button>
                </article>
              );
            })}
        </div>
        <p className="program-footnote">
          <span className="status-dot" /> Start at your level. Grow at your
          pace. Batch schedules and learning modes are confirmed by our team.
        </p>
      </div>
      {selected && (
        <Modal label={selected.name} onClose={() => setSelected(null)}>
          <div className="program-detail">
            <button
              className="modal-close"
              aria-label="Close program details"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <span className={`icon-box ${selected.color}`}>
              {(() => {
                const Icon = icons[selected.icon];
                return <Icon size={28} />;
              })()}
            </span>
            <span className="eyebrow">EXPLORE YOUR NEXT CHAPTER</span>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <h3>What you’ll learn</h3>
            <div className="curriculum">
              {selected.skills.map((s) => (
                <span key={s}>
                  <Check size={16} />
                  {s}
                </span>
              ))}
            </div>
            <div className="program-outcome">
              <strong>Your practical outcome</strong>
              <p>{selected.outcome}</p>
            </div>
            <p className="detail-note">
              Ask our team about upcoming batches, fees, duration, and available
              learning modes.
            </p>
            <JoinButton program={selected.name}>
              Enquire About This Program
            </JoinButton>
          </div>
        </Modal>
      )}
    </section>
  );
}
