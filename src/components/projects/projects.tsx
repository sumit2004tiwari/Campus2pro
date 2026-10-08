import {
  ArrowUpRight,
  ShoppingBag,
  Bot,
  Search,
  Check,
  Plus,
  MoreHorizontal,
  LayoutDashboard,
  Smartphone,
  BarChart3,
} from "lucide-react";
import { projects } from "@/data/projects";
function Mockup({ type }: { type: string }) {
  return (
    <div className={`project-mockup mockup-${type}`} aria-hidden="true">
      <div className="mock-browser">
        <span />
        <span />
        <span />
        <div>your-next-project</div>
      </div>
      {type === "store" ? (
        <div className="mock-store">
          <div>
            <strong>
              FORM<span> / </span>
            </strong>
            <ShoppingBag size={12} />
          </div>
          <p>Everyday, elevated.</p>
          <div className="mock-products">
            <i />
            <i />
            <i />
          </div>
          <div className="mock-labels">
            <span>Everyday essentials</span>
            <span>Made for you</span>
          </div>
        </div>
      ) : type === "ai" ? (
        <div className="mock-ai">
          <span className="ai-symbol">
            <Bot size={26} />
          </span>
          <strong>What will you create?</strong>
          <div className="mock-bubble">
            Help me bring my idea to life <ArrowUpRight size={12} />
          </div>
          <div className="mock-response">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : type === "dashboard" ? (
        <div className="mock-dash">
          <div className="mock-sidebar">
            <LayoutDashboard size={15} />
            <span />
            <span />
            <span />
          </div>
          <div className="mock-dash-body">
            <strong>
              Business overview <BarChart3 size={12} />
            </strong>
            <div className="mock-metrics">
              <span>
                Revenue<b>₹48.2k</b>
              </span>
              <span>
                Growth<b>+24.8%</b>
              </span>
            </div>
            <div className="mock-chart">
              {[30, 48, 38, 65, 50, 77, 62, 90].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      ) : type === "jobs" ? (
        <div className="mock-jobs">
          <strong>Find your next opportunity.</strong>
          <div className="mock-search">
            <Search size={12} /> Search roles, skills, companies
          </div>
          {["Frontend Developer", "Data Analyst"].map((x, i) => (
            <div className="mock-job" key={x}>
              <span>{i ? "D" : "F"}</span>
              <b>
                {x}
                <small>Full-time · Entry level</small>
              </b>
              <ArrowUpRight size={13} />
            </div>
          ))}
        </div>
      ) : type === "mobile" ? (
        <div className="mock-mobile">
          <div className="mock-phone">
            <div className="phone-notch" />
            <small>9:41</small>
            <strong>
              Make today
              <br />a good day.
            </strong>
            <span className="phone-card">
              <Check size={18} /> Daily goals
            </span>
            <span className="phone-line" />
            <span className="phone-line" />
            <div className="phone-nav">
              <Smartphone size={13} />
              <Plus size={13} />
              <MoreHorizontal size={13} />
            </div>
          </div>
          <span className="mobile-float">
            <Check size={15} /> Idea → App
          </span>
        </div>
      ) : (
        <div className="mock-saas">
          <strong>
            Workspace <Plus size={13} />
          </strong>
          <div className="kanban">
            {["To do", "In progress", "Done"].map((x, i) => (
              <div key={x}>
                <small>{x}</small>
                <span>
                  <i /> {["Design system", "Build something", "Ship it"][i]}
                </span>
                <span>
                  <i /> Next big idea
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-heading section-heading-row reveal">
          <div>
            <span className="eyebrow">LESS WATCHING. MORE MAKING.</span>
            <h2>Don’t just learn. Build.</h2>
            <p>
              Finish with practical experience and work you can show recruiters.
              <br className="desktop-break" /> These are examples of the
              projects you could build.
            </p>
          </div>
          <span className="project-label">
            ILLUSTRATIVE PROJECTS <ArrowUpRight size={17} />
          </span>
        </div>
        <div className="projects-grid">
          {projects.map((p) => (
            <article key={p.name} className="project-card reveal">
              <Mockup type={p.type} />
              <div className="project-copy">
                <span className="project-level">{p.level}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
