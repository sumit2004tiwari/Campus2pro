import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { getWhatsAppUrl } from "@/lib/whatsapp";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo light />
            <p>From Campus to Career.</p>
            <small>
              Learn the right skills. Build real projects.
              <br />
              Become placement-ready.
            </small>
          </div>
          <div className="footer-nav">
            <strong>Explore</strong>
            {[
              { label: "Home", href: "#home" },
              { label: "Programs", href: "#programs" },
              { label: "About", href: "#about" },
              { label: "Career Assessment", href: "#career-assessment" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ].map((n) => (
              <a href={n.href} key={n.href}>
                {n.label}
              </a>
            ))}
          </div>
          <div id="contact" className="footer-contact">
            <strong>Let’s talk about your future.</strong>
            <p>
              A question today could be
              <br />
              your first step tomorrow.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 9005666050 <ArrowUpRight size={18} />
            </a>
            <small>Connect with us on WhatsApp</small>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Campus2Pro. All rights reserved.</span>
          <span>Made for the next generation of professionals.</span>
          <a href="/privacy/">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
