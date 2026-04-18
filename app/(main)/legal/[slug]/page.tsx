import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEGAL_PAGES, legalBySlug } from "@/lib/mock/legal-pages";

export async function generateStaticParams() {
  return LEGAL_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = legalBySlug(slug);
  if (!page) return { title: "Не знайдено" };
  return {
    title: page.title,
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = legalBySlug(slug);
  if (!page) notFound();

  return (
    <div className="container-prose py-16 md:py-24">
      <div className="mb-10">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Правова інформація
        </div>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          {page.title}
        </h1>
        <div className="mt-3 text-xs text-muted-foreground">
          Оновлено: {page.updatedAt}
        </div>
      </div>

      <article className="space-y-8 text-sm leading-relaxed md:text-base">
        {page.body.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <h2 className="font-display mb-3 text-lg font-semibold md:text-xl">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p key={j} className="mb-3 text-muted-foreground">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="mt-2 space-y-1.5">
                {section.list.map((li, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-muted-foreground before:mt-2 before:size-1 before:shrink-0 before:rounded-full before:bg-foreground/40 before:content-['']"
                  >
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
