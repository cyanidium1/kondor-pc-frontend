import { SectionHeader } from "@/components/shared/SectionHeader";
import { FaqBlock } from "@/components/shared/FaqBlock";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({
  heading,
  items,
}: {
  heading?: string;
  items: FaqItem[];
}) {
  if (!items || items.length === 0) return null;
  const faqItems = items.map((it, index) => ({
    key: `faq-accordion-${index}`,
    scope: "build" as const,
    question: it.question,
    answer: it.answer,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };

  return (
    <div className="container-site py-16 md:py-20">
      <SectionHeader
        kicker="FAQ"
        title={heading ?? "ЧАСТІ ПИТАННЯ"}
        titleClassName="mt-3"
      />

      <FaqBlock items={faqItems} className="mx-auto max-w-3xl" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
