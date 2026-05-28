import type { FaqSection } from "@/types/blogPost";

interface BlogFaqProps {
  faq: FaqSection;
  uniqueKey: string;
}

export default function BlogFaq({ faq, uniqueKey }: BlogFaqProps) {
  const items = (faq.items ?? []).filter((it) => it?.question && it?.answer);
  if (items.length === 0) return null;

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

      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <details
            key={`${uniqueKey}-${it._key ?? i}`}
            className="group rounded-lg border border-border bg-card [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5">
              <span className="text-[13px] font-medium leading-[130%] text-foreground lg:text-[15px]">
                {it.question}
              </span>
              <span
                aria-hidden
                className="mt-0.5 shrink-0 text-brand-primary transition-transform group-open:rotate-45"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </summary>
            <div className="px-5 pb-5 text-[13px] leading-[150%] whitespace-pre-line text-muted-foreground lg:text-[15px]">
              {it.answer}
            </div>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
