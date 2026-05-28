import type { FaqSection } from "@/types/blogPost";
import { FaqBlock } from "@/components/shared/FaqBlock";

interface BlogFaqProps {
  faq: FaqSection;
  uniqueKey: string;
}

export default function BlogFaq({ faq, uniqueKey }: BlogFaqProps) {
  const items = (faq.items ?? []).filter((it) => it?.question && it?.answer);
  if (items.length === 0) return null;
  const faqItems = items.map((it, i) => ({
    key: `${uniqueKey}-${it._key ?? i}`,
    scope: "seo" as const,
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
    <section className="py-12 md:py-16">
      <h2 className="mb-2 font-display text-[22px] font-bold uppercase leading-[120%] text-foreground lg:text-[32px]">
        Часті питання
      </h2>
      {faq.description ? (
        <p className="mb-6 max-w-2xl text-[14px] leading-[150%] text-muted-foreground lg:text-[16px]">
          {faq.description}
        </p>
      ) : null}

      <FaqBlock items={faqItems} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
