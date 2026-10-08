import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { AdvisorButton } from "@/components/ui/actions";
export function FAQ() {
  return (
    <section id="faq" className="section faq-section">
      <div className="container faq-layout">
        <div className="section-heading reveal">
          <span className="eyebrow">A LITTLE MORE CLARITY</span>
          <h2>
            Questions?
            <br />
            We’ve got answers.
          </h2>
          <p>
            Choosing your next step should feel clear.
            <br />
            Here’s what students often ask.
          </p>
          <AdvisorButton className="text-button">Ask our team</AdvisorButton>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details className="faq-item reveal" key={f.question} name="faq">
              <summary>
                <span className="faq-number">0{i + 1}</span>
                <span>{f.question}</span>
                <Plus size={20} />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
