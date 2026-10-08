import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import {
  TrustSection,
  WhyCampus2Pro,
} from "@/components/why-campus2pro/why-campus2pro";
import { Programs } from "@/components/programs/programs";
import { Methodology, Roadmap } from "@/components/methodology/methodology";
import { Projects } from "@/components/projects/projects";
import { Placement } from "@/components/placement/placement";
import { Testimonials } from "@/components/testimonials/testimonials";
import {
  Assessment,
  About,
  Parents,
  FinalCTA,
} from "@/components/sections/about";
import { FAQ } from "@/components/faq/faq";
import { Footer } from "@/components/footer/footer";
import { Registration } from "@/components/registration/registration";
import { FloatingWhatsApp } from "@/components/whatsapp/whatsapp";
import { Enhancements } from "@/components/ui/enhancements";
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustSection />
        <Programs />
        <WhyCampus2Pro />
        <Methodology />
        <Projects />
        <Roadmap />
        <Placement />
        <Testimonials />
        <Assessment />
        <About />
        <Parents />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Registration />
      <Enhancements />
    </>
  );
}
