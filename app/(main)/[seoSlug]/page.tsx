import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { BuildCard } from "@/components/shared/BuildCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FaqBlock } from "@/components/shared/FaqBlock";
import { BUILDS } from "@/lib/mock/builds";
import {
  SEO_LANDINGS,
  seoLandingBySlug,
  type SeoLanding,
} from "@/lib/mock/seo-landings";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return SEO_LANDINGS.map((l) => ({ seoSlug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}): Promise<Metadata> {
  const { seoSlug } = await params;
  const landing = seoLandingBySlug(seoSlug);
  if (!landing) return { title: "Не знайдено" };
  return {
    title: landing.title,
    description: landing.metaDescription,
    alternates: {
      canonical: `https://kondor-pc.ua/${landing.slug}`,
    },
    openGraph: {
      title: landing.title,
      description: landing.metaDescription,
      type: "website",
      locale: "uk_UA",
    },
  };
}

function filterBuilds(landing: SeoLanding) {
  const { filter } = landing;
  let pool = BUILDS;
  if (filter.onlySlugs) {
    pool = pool.filter((b) => filter.onlySlugs!.includes(b.slug));
  }
  if (filter.budgetMaxUah) {
    pool = pool.filter((b) => b.priceUah <= filter.budgetMaxUah!);
  }
  if (filter.gameSlug) {
    pool = pool
      .filter((b) => b.fps.some((f) => f.gameSlug === filter.gameSlug))
      .sort((a, b) => {
        const fa = a.fps
          .filter((f) => f.gameSlug === filter.gameSlug)
          .reduce((m, f) => Math.max(m, f.fpsAvg), 0);
        const fb = b.fps
          .filter((f) => f.gameSlug === filter.gameSlug)
          .reduce((m, f) => Math.max(m, f.fpsAvg), 0);
        return fb - fa;
      });
  } else {
    pool = [...pool].sort((a, b) => a.priceUah - b.priceUah);
  }
  return pool.slice(0, filter.maxBuilds ?? 4);
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}) {
  const { seoSlug } = await params;
  const landing = seoLandingBySlug(seoSlug);
  if (!landing) notFound();

  const builds = filterBuilds(landing);
  const highlightGames = landing.filter.gameSlug
    ? [landing.filter.gameSlug]
    : ["cs2", "warzone", "cyberpunk"];

  const faqItems = landing.faqs.map((f, i) => ({
    key: `seo-${landing.slug}-${i}`,
    scope: "seo" as const,
    question: f.question,
    answer: f.answer,
  }));

  // FAQPage JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.35 0.07 280 / 0.5), transparent 70%)",
          }}
        />
        <div className="container-site relative py-20 md:py-28">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {landing.type === "by_game"
              ? "Під гру"
              : landing.type === "by_budget"
                ? "За бюджетом"
                : "За задачею"}
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {landing.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {landing.intro}
          </p>
        </div>
      </section>

      {/* Builds grid */}
      <section className="container-site py-16 md:py-20">
        <SectionHeader
          kicker="Рекомендуємо"
          title={`${builds.length} оптимальних ПК`}
          subtitle="Відсортовано за релевантністю до запиту."
        />
        {builds.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-10 text-center">
            <p className="text-muted-foreground">
              У цьому діапазоні немає збірок. Подивись{" "}
              <Link href="/pk" className="text-foreground underline underline-offset-4">
                повний каталог
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {builds.map((b) => (
              <BuildCard
                key={b.slug}
                build={b}
                variant="full"
                highlightGames={highlightGames}
              />
            ))}
          </div>
        )}
      </section>

      {/* Body content */}
      <section className="border-y border-border bg-surface/30">
        <div className="container-prose py-16 md:py-20">
          <SectionHeader
            kicker="Деталі"
            title="Чому саме ці збірки"
          />
          <article className="space-y-8">
            {landing.body.map((section, i) => (
              <div key={i}>
                <h3 className="font-display mb-3 text-lg font-semibold md:text-xl">
                  {section.heading}
                </h3>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="mb-3 text-muted-foreground">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-2 space-y-1.5">
                    {section.list.map((li, j) => (
                      <li key={j} className="flex gap-2 text-muted-foreground">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="container-prose py-16 md:py-20">
          <SectionHeader
            kicker="Часті питання"
            title="Часті питання"
          />
          <FaqBlock items={faqItems} />
        </section>
      )}

      {/* Final CTA */}
      <section className="border-t border-border">
        <div className="container-prose py-16 md:py-20 text-center">
          <SectionHeader
            align="center"
            kicker="Не знайшов ідеального?"
            title="Підбір під твої критерії"
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pidbir"
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-6")}
            >
              Почати підбір →
            </Link>
            <Link
              href="/sborka"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Кастомна збірка
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
