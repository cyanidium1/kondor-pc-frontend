import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
import { Reveal } from "@/components/shared/Reveal";
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
import { BuildRepeatCta } from "@/components/shared/BuildRepeatCta";
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
  { n: 1, icon: PackageCheck, title: "Отримання компонентів", text: "Тільки нові деталі від офіційних постачальників. Перевіряємо кожну." },
  { n: 2, icon: Wrench, title: "Ручна збірка", text: "Досвідчений інженер збирає твій ПК за 3–5 днів." },
  { n: 3, icon: Flame, title: "Стрес-тест 4 години", text: "Перевірка під максимальним навантаженням: температури, стабільність, шум." },
  { n: 4, icon: Camera, title: "Відеозвіт", text: "Знімаємо відео готового ПК. Ти бачиш, що саме отримаєш." },
  { n: 5, icon: Send, title: "Упаковка та відправка", text: "Подвійна коробка, пінопласт, фіксація. Відправляємо НП з трек-номером." },
];

const AFTER_STEPS = [
  { icon: Bell, title: "Відразу", text: "SMS + email з номером замовлення" },
  { icon: Camera, title: "Через 3–5 днів", text: "Відео готового ПК перед відправкою" },
  { icon: Truck, title: "Доставка", text: "1–3 дні Новою Поштою, трек-номер у email" },
  { icon: Package, title: "Отримання", text: "Перевір коробку при отриманні. Пошкодження? Не приймай — ми вирішимо." },
  { icon: Shield, title: "Гарантія", text: "Якщо щось зламається — забираємо НП. Ремонт за 3–10 днів." },
  { icon: RotateCcw, title: "Повернення", text: "14 днів без пояснення причини за українським законом." },
];

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-14 md:py-20", className)}>
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
      <div className="container-site pb-4 pt-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <ChevronRight className="mx-1 inline size-3" />
        <Link href="/pk" className="hover:text-foreground">Ігрові ПК</Link>
        <ChevronRight className="mx-1 inline size-3" />
        <span className="text-foreground">{build.name}</span>
      </div>

      {/* BLOCK 1 — ID + PRICE + CTA */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 20%, oklch(from var(--sku) l c h / 0.5), transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-12 pt-4 lg:grid-cols-[1.1fr_1fr]">
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

      {/* BLOCK 2 — FPS TABLE */}
      <Section>
        <SectionHeader
          kicker="Що ти отримаєш"
          title="Скільки FPS ти отримаєш у своїх іграх"
          subtitle="Тестуємо кожну збірку в нашій лабораторії. Значення нижче — середні FPS на налаштуваннях «Високі»."
        />
        <FpsTable build={build} />
      </Section>

      {/* BLOCK 4 — ASSEMBLY VIDEO */}
      <Section className="border-y border-border bg-surface/30">
        <SectionHeader
          kicker="Процес"
          title="Як ми збираємо твій ПК"
        />
        <div className="relative mx-auto max-w-4xl">
          <div
            className="sku-glow group relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-border bg-background"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 50% 40%, oklch(from var(--sku) l c h / 0.6), transparent 70%)",
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
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Для кожної моделі знімаємо окреме відео збірки
          </p>
        </div>
      </Section>

      {/* BLOCK 5 — COMPONENTS */}
      <Section>
        <SectionHeader
          kicker="Що всередині"
          title={`Компоненти ${build.name}`}
          subtitle="Бренд, модель, пояснення новачку, гарантія виробника."
        />
        <ComponentList build={build} />
      </Section>

      {/* BLOCK 6 — INCLUDED FEATURES */}
      <Section className="border-y border-border bg-surface/30">
        <SectionHeader
          kicker="Без доплат"
          title="Вже включено в ціну"
          subtitle="Ми продаємо готове рішення, а не набір деталей. Нічого не доведеться доплачувати після покупки."
        />
        <IncludedFeaturesBlock featureKeys={build.includedFeatureKeys} />
      </Section>

      {/* BLOCK 7 — HOW WE BUILD */}
      <Section>
        <SectionHeader
          kicker="5 кроків"
          title="Як проходить кожна збірка"
        />
        <div className="grid gap-4 md:grid-cols-5">
          {ASSEMBLY_STEPS.map((s) => (
            <div
              key={s.n}
              className="relative rounded-lg border border-border bg-surface p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                  <s.icon className="size-4.5" strokeWidth={1.5} />
                </div>
                <div className="tabular font-display text-xl font-bold text-muted-foreground/30">
                  {String(s.n).padStart(2, "0")}
                </div>
              </div>
              <div className="font-display text-sm font-semibold leading-tight">
                {s.title}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BLOCK 8 — AFTER PURCHASE (CRITICAL) */}
      <Section className="border-y border-border bg-surface/30">
        <SectionHeader
          kicker="Без сюрпризів"
          title="Що відбувається після оплати"
          subtitle="Точний сценарій від кнопки «Купити» до того, як ти вмикаєш ПК удома."
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
                <div className="mt-0.5 text-sm">{s.text}</div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* BLOCK 9 — REPEAT CTA */}
      <Section>
        <BuildRepeatCta />
      </Section>

      {/* BLOCK 10 — REVIEWS FOR THIS BUILD */}
      {reviews.length > 0 && (
        <Section className="border-t border-border">
          <SectionHeader
            kicker="Досвід клієнтів"
            title={`Що кажуть власники ${build.name}`}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
        </Section>
      )}

      {/* BLOCK 11 — FAQ */}
      <Section className="border-t border-border">
        <SectionHeader
          kicker="Часті питання"
          title={`Про ${build.name}`}
        />
        <FaqBlock items={faqs} />
      </Section>

      {/* BLOCK 12 — SIMILAR */}
      {similar.length > 0 && (
        <Section className="border-t border-border bg-surface/30">
          <SectionHeader
            kicker="Альтернативи"
            title="Інші збірки цього класу"
            subtitle="Якщо сумніваєшся — глянь сусідів по ціні."
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

      <div className="h-20 md:h-0" />
    </div>
    </ProductConfiguratorProvider>
  );
}
