import { GraduationCap, ArrowUpRight } from "lucide-react";
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#home"
      className={`logo ${light ? "logo-light" : ""}`}
      aria-label="Campus2Pro home"
    >
      <span className="logo-mark">
        <GraduationCap size={25} />
        <ArrowUpRight size={12} className="logo-arrow" />
      </span>
      <span>
        Campus<span className="logo-two">2</span>Pro
        <span className="logo-dot">.</span>
      </span>
    </a>
  );
}
