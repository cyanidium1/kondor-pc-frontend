import { SectionHeader } from "@/components/shared/SectionHeader";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({
  heading,
  items,
}: {
  heading?: string;
  items: FaqItem[];
}) {
  if (!items || items.length === 0) return null;

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

      <div className="mx-auto max-w-3xl flex flex-col gap-2 rounded-lg overflow-hidden">
        {items.map((it, i) => (
          <details
            key={i}
            className="group bg-white text-black rounded-lg [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-start justify-between gap-4 p-5 list-none">
              <span className="text-[12px] lg:text-[14px] font-medium leading-[120%]">
                {it.question}
              </span>
              <span
                aria-hidden
                className="mt-0.5 shrink-0 transition-transform group-open:rotate-45"
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
            <div className="px-5 pb-5 text-[12px] lg:text-[14px] leading-[140%] text-black/80">
              {it.answer}
            </div>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
