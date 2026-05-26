import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import {
  Play,
  ChevronRight,
  Bell,
  Camera,
  Truck,
  Package,
  Shield,
  RotateCcw,
  PackageCheck,
  Wrench,
  Flame,
  Send,
} from "lucide-react";

import { ProductGallery } from "@/components/shared/ProductGallery";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FpsTable } from "@/components/shared/FpsTable";
import { ComponentList } from "@/components/shared/ComponentList";
import { IncludedFeaturesBlock } from "@/components/shared/IncludedFeaturesBlock";
import { FaqBlock } from "@/components/shared/FaqBlock";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { BuildCard } from "@/components/shared/BuildCard";
import { StickyMobileBuyBar } from "@/components/shared/StickyMobileBuyBar";
import { ProductConfiguratorProvider } from "@/components/shared/ProductConfigurator";
import { BuildIdentityColumn } from "@/components/shared/BuildIdentityColumn";
import { BuildAudience } from "@/components/shared/BuildAudience";
import { BuildRepeatCta } from "@/components/shared/BuildRepeatCta";
import { AccessoriesRail } from "@/components/catalog/AccessoriesRail";
import { SKU_ACCENTS } from "@/lib/sku-accents";
import {
  JsonLd,
  productJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";
import { BUILDS, buildBySlug, similarBuilds } from "@/lib/mock/builds";
import { reviewsForBuild } from "@/lib/mock/reviews";
import { FAQS } from "@/lib/mock/faqs";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import MarqueeLine from "@/components/shared/MarqueeLine";

export async function generateStaticParams() {
  return BUILDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = buildBySlug(slug);
  if (!b) return { title: "Не знайдено" };
  return {
    title: `${b.name} — ${b.spec.cpu} + ${b.spec.gpu}`,
    description: `${b.name} — ігровий ПК: ${b.spec.cpu}, ${b.spec.gpu}, ${b.spec.ram}. ${b.shortTagline}. Купити за ${formatPrice(b.priceUah)}.`,
  };
}

const ASSEMBLY_STEPS = [
  {
    n: 1,
    icon: PackageCheck,
    title: "Отримання компонентів",
    text: "Тільки нові деталі від офіційних постачальників. Перевіряємо кожну.",
  },
  {
    n: 2,
    icon: Wrench,
    title: "Ручна збірка",
    text: "Налаштовуємо BIOS, драйвери та систему для стабільної роботи й максимальної продуктивності.",
  },
  {
    n: 3,
    icon: Flame,
    title: "Стрес-тест 4 години",
    text: "Перевірка під максимальним навантаженням: температури, стабільність, шум.",
  },
  {
    n: 4,
    icon: Camera,
    title: "Відеозвіт",
    text: "Знімаємо відео готового ПК. Ти бачиш, що саме отримаєш.",
  },
  {
    n: 5,
    icon: Send,
    title: "Упаковка та відправка",
    text: "Подвійна коробка, пінопласт, фіксація. Відправляємо НП з трек-номером.",
  },
];

const AFTER_STEPS = [
  { icon: Bell, title: "Відразу", text: "SMS + email з номером замовлення" },
  {
    icon: Truck,
    title: "Доставка",
    text: "1–3 дні Новою Поштою, трек-номер у email",
  },
  {
    icon: Shield,
    title: "Гарантія",
    text: "Якщо щось зламається — забираємо НП. Ремонт за 3–10 днів.",
  },
  {
    icon: Camera,
    title: "Через 3–5 днів",
    text: "Відео готового ПК перед відправкою",
  },

  {
    icon: Package,
    title: "Отримання",
    text: "Перевір коробку при отриманні. Пошкодження? Не приймай — ми вирішимо.",
  },

  {
    icon: RotateCcw,
    title: "Повернення",
    text: "14 днів без пояснення причини за українським законом.",
  },
];

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("", className)}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const build = buildBySlug(slug);
  if (!build) notFound();

  const accent = SKU_ACCENTS[build.slug];
  const reviews = reviewsForBuild(build.slug, 3);
  const faqs = FAQS.filter((f) => build.faqKeys.includes(f.key));
  const similar = similarBuilds(build.slug, 3);

  return (
    <Suspense fallback={null}>
      <ProductConfiguratorProvider build={build}>
        <div style={{ ["--sku" as string]: accent }}>
          <JsonLd
            data={[
              productJsonLd(build),
              breadcrumbJsonLd([
                { name: "Головна", url: "/" },
                { name: "Ігрові ПК", url: "/pk" },
                { name: build.name, url: `/pk/${build.slug}` },
              ]),
              faqPageJsonLd(faqs),
            ]}
          />
          {/* BREADCRUMBS */}
          <div className="container-site py-7 lg:pt-9 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Головна
            </Link>
            <ChevronRight className="mx-1 inline size-3" />
            <Link href="/pk" className="hover:text-foreground">
              Ігрові ПК
            </Link>
            <ChevronRight className="mx-1 inline size-3" />
            <span className="text-foreground">{build.name}</span>
          </div>

          {/* BLOCK 1 — ID + PRICE + CTA */}
          <section className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 30% 20%, color-mix(in srgb, var(--sku) 50%, transparent), transparent 70%)",
              }}
            />
            {/* Matches `container-site` paddings (px-4 sm:px-6 lg:px-8) so every
            card under this column aligns edge-to-edge with BuildAudience and
            the later full-width sections on mobile. */}
            <div className="container-site relative grid gap-10 pb-12 lg:pb-0 lg:grid-cols-[1.1fr_1fr] [&>*]:min-w-0">
              {/* Gallery */}
              <ProductGallery
                images={
                  build.galleryImageUrls ??
                  (build.heroImageUrl ? [build.heroImageUrl] : [])
                }
                videoUrl={build.assemblyVideoUrl}
                videoPosterUrl={build.assemblyVideoPosterUrl}
                alt={`${build.name} — ігровий ПК`}
                priority
              />

              {/* Identification */}
              <BuildIdentityColumn />
            </div>
          </section>

          {/* BLOCK 1.5 — "Для кого цей ПК" */}
          {/* <div className="container-site pb-2">
            <BuildAudience build={build} />
          </div> */}

          {/* BLOCK 2 — FPS TABLE */}
          <Section className="pt-3 pb-15 lg:pb-0 lg:pt-[128px]">
            <SectionHeader
              kicker="Що ти отримаєш"
              title="СКІЛЬКИ FPS ТИ ОТРИМАЄШ У СВОЇХ ІГРАХ"
              subtitle="Тестуємо кожну збірку в нашій лабораторії. Значення нижче — середні FPS на налаштуваннях «Високі»."
              titleClassName="mt-3 lg:mt-7 mb-5 lg:mb-10 lg:text-[36px]"
              subtitleClassName="lg:max-w-[466px]"
            />
            <FpsTable build={build} />
          </Section>

          {/* BLOCK 4 — ASSEMBLY VIDEO */}
          <Section className="pb-22 lg:pb-0 lg:pt-30">
            <SectionHeader
              kicker="реальний геймплей"
              title="РЕАЛЬНІ ТЕСТИ НАШИХ ПК"
              className="mb-9"
              titleClassName="mt-3 lg:mt-7 lg:text-[36px]"
            />
            <div className="relative mx-auto max-w-4xl">
              <div
                className="sku-glow group relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-border bg-background"
                style={{ ["--sku" as string]: "var(--brand-primary)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 60% at 50% 40%, color-mix(in srgb, var(--sku) 60%, transparent), transparent 70%)",
                  }}
                />
                <button
                  type="button"
                  aria-label="Переглянути відео збірки"
                  className="relative flex size-20 items-center justify-center rounded-full bg-foreground/90 text-background transition group-hover:scale-105"
                >
                  <Play className="ml-1 size-8" fill="currentColor" />
                </button>
                <div className="absolute bottom-4 left-4 text-[11px] uppercase tracking-wider text-muted-foreground">
                  assembly video · 60–90s
                </div>
              </div>
            </div>
          </Section>

          {/* BLOCK 5 — COMPONENTS */}
          <Section className="pb-[348px] lg:pb-30 lg:pt-[178px]">
            <SectionHeader
              kicker="Що всередині"
              title={`Компоненти ${build.name}`}
              subtitle="Бренд, модель, пояснення новачку, гарантія виробника."
              className="mb-[168px] lg:mb-10"
              titleClassName="mt-3 lg:mt-7 mb-5 lg:mb-10 lg:text-[36px]"
            />
            <ComponentList build={build} />
          </Section>

          {/* BLOCK 6 — INCLUDED FEATURES */}
          <Section className="pb-[92px] lg:pb-[111px]">
            <SectionHeader
              kicker="Без доплат"
              title="ВЖЕ ВКЛЮЧЕНО В ЦІНУ"
              subtitle="Ми продаємо готове рішення, а не набір деталей. У багатох інших магазинах це продають як додаткові функції, або взагалі про це не згадують, у нас це безкоштовно"
              titleClassName="mt-3 lg:mt-7 mb-5 lg:mb-10 lg:text-[36px]"
              subtitleClassName="lg:max-w-[672px]"
            />
            <IncludedFeaturesBlock featureKeys={build.includedFeatureKeys} />
          </Section>

          {/* BLOCK 6.5 — ACCESSORIES CROSS-SELL */}
          <AccessoriesRail
            title={`Аксесуари до ${build.name}`}
            subtitle="Клавіатура, миша, ігрова поверхня — обираються окремо й доповнюють збірку."
            limit={4}
          />

          {/* BLOCK 7 — HOW WE BUILD */}
          <Section className="pb-[92px] lg:pb-30">
            <SectionHeader
              kicker="5 кроків"
              title="ЯК ПРОХОДИТЬ КОЖНА ЗБІРКА"
              className="mb-8"
              titleClassName="mt-3 lg:mt-7 lg:text-[36px]"
            />
            <div className="grid gap-4 md:grid-cols-5">
              {ASSEMBLY_STEPS.map((s) => (
                <div
                  key={s.n}
                  className="relative overflow-hidden clip-angular-12 bg-brand-primary p-5 text-black"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5 text-white">
                      <s.icon className="size-4.5" strokeWidth={1.5} />
                    </div>
                    <div className="tabular font-heading text-[20px] font-bold">
                      {String(s.n).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="font-heading text-[16px] font-semibold leading-[120%] uppercase">
                    {s.title}
                  </div>
                  <p className="mt-1.5 text-xs">{s.text}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* BLOCK 8 — AFTER PURCHASE (CRITICAL) */}
          <Section className="pb-15 lg:pb-30">
            <SectionHeader
              kicker="Без сюрпризів"
              title="ЩО ВІДБУВАЄТЬСЯ ПІСЛЯ ОПЛАТИ"
              subtitle="Точний сценарій від кнопки «Купити» до того, як ти вмикаєш ПК удома."
              titleClassName="mt-3 lg:mt-7 mb-5 lg:mb-10 lg:text-[36px]"
              className="mb-12"
              subtitleClassName="lg:max-w-[422px]"
            />
            <ol className="grid gap-3 md:grid-cols-2">
              {AFTER_STEPS.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-surface p-5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                    <s.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {s.title}
                    </div>
                    <div className="mt-0.5 text-[12px] leading-[120%]">
                      {s.text}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* BLOCK 9 — REPEAT CTA */}
          <Section className="pb-12 lg:pb-23">
            <BuildRepeatCta />
          </Section>

          <MarqueeLine className="mb-16 lg:mb-[107px]" />

          {/* BLOCK 10 — REVIEWS FOR THIS BUILD */}
          {reviews.length > 0 && (
            <Section className="pb-11 lg:pb-[69px]">
              <SectionHeader
                kicker="Досвід клієнтів"
                title={`Що кажуть власники ${build.name}`}
                titleClassName="mt-3 lg:mt-7 lg:text-[36px]"
              />
              <div className="grid gap-4 md:grid-cols-3">
                {reviews.map((r, i) => (
                  <ReviewCard key={i} review={r} />
                ))}
              </div>
            </Section>
          )}

          {/* BLOCK 11 — FAQ */}
          <Section className="relative pt-[233px] lg:py-[66px] pb-[122px] rounded-[40px]">
            <div className="absolute -z-40 inset-0 bg-brand-primary rounded-[40px]" />
            <SectionHeader
              kicker="Часті питання"
              title={`Про ${build.name}`}
              kickerClassName="text-center text-black"
              titleClassName="mt-3 lg:mt-7 text-center text-black"
              showKickerDot={false}
              className="lg:max-w-[706px] lg:mx-auto"
            />
            <FaqBlock items={faqs} className="lg:max-w-[706px] lg:mx-auto" />
          </Section>

          {/* BLOCK 12 — SIMILAR */}
          {similar.length > 0 && (
            <Section className="pt-[92px]">
              <SectionHeader
                kicker="Альтернативи"
                title="ІНШІ ЗБІРКИ ЦЬОГО КЛАСУ"
                subtitle="Якщо сумніваєшся — глянь сусідів по ціні."
                titleClassName="mt-3 lg:mt-7 mb-5 lg:mb-10"
              />
              <div className="grid gap-4 md:grid-cols-3">
                {similar.map((s) => (
                  <BuildCard
                    key={s.slug}
                    build={s}
                    variant="compact"
                    highlightGames={["cs2", "warzone", "cyberpunk"]}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* BLOCK 13 — STICKY MOBILE BUY BAR */}
          <StickyMobileBuyBar
            name={build.name}
            slug={build.slug}
            priceUah={build.priceUah}
          />
        </div>
      </ProductConfiguratorProvider>
    </Suspense>
  );
}
