import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TrustStrip } from "@/components/shared/TrustStrip";
import { BuildCard } from "@/components/shared/BuildCard";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { FaqBlock } from "@/components/shared/FaqBlock";
import { SKU_ACCENTS } from "@/lib/sku-accents";
import { popularBuilds } from "@/lib/mock/builds";
import { REVIEWS } from "@/lib/mock/reviews";
import { faqsByScope } from "@/lib/mock/faqs";
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import {
  Video,
  ShieldCheck,
  Truck,
  RotateCcw,
  Gamepad2,
  Target,
  Car,
  Radio,
  Baby,
  Swords,
} from "lucide-react";

const BUDGET_BUCKETS = [
  { label: "До 25 000 ₴", href: "/pidbir/rezultat?budget=0-25" },
  { label: "25–50 000 ₴", href: "/pidbir/rezultat?budget=25-50" },
  { label: "50 000 ₴+", href: "/pidbir/rezultat?budget=50-200" },
];

const TRUST_PILLARS = [
  {
    icon: Video,
    title: "Збираємо при тобі на відео",
    text: "Кожна збірка — з відеопроцесом. Бачиш, що всередині та як упаковано.",
  },
  {
    icon: ShieldCheck,
    title: "Оригінальні компоненти з гарантією",
    text: "Тільки нові деталі з офіційною гарантією виробника. Жодних сумнівних постачальників.",
  },
  {
    icon: Truck,
    title: "Якщо зламається — ми забираємо НП",
    text: "Безкоштовна доставка до сервісу за наш рахунок. Ремонт або заміна за 3–10 днів.",
  },
  {
    icon: RotateCcw,
    title: "Повернення протягом 14 днів",
    text: "Не підійшло — повертаємо кошти без зайвих питань за українським законом.",
  },
];

const USE_CASES = [
  { icon: Target, label: "Для CS2 та Valorant", href: "/pk-dlya-cs2", sku: "nebula" as const },
  { icon: Gamepad2, label: "Для Warzone та CoD", href: "/pk-dlya-warzone", sku: "hyper" as const },
  { icon: Car, label: "Для GTA V та GTA VI", href: "/pk-dlya-gta5", sku: "vega" as const },
  { icon: Radio, label: "Для стрімінгу та монтажу", href: "/pk-dlya-strimu", sku: "pulsar" as const },
  { icon: Baby, label: "Для дитини-початківця", href: "/pk-dlya-pochatkivtsya", sku: "comet" as const },
  { icon: Swords, label: "Для Dota 2 та ліги", href: "/pk-dlya-dota2", sku: "orbitra" as const },
];

const STEPS = [
  {
    n: "01",
    icon: Target,
    title: "Обери гри",
    text: "Показуємо FPS саме у твоїх іграх — CS2, Warzone, GTA V та інших",
  },
  {
    n: "02",
    icon: Gamepad2,
    title: "Обери бюджет",
    text: "Від 20 до 100+ тисяч гривень. Варіанти з запасом на 2 роки.",
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "Отримай 3–5 варіантів",
    text: "Порівняй, обери, купи в один клік або частинами без %",
  },
];

export default function HomePage() {
  const top3 = popularBuilds(["vega", "nebula", "orbitra"]);
  const homeReviews = REVIEWS.slice(0, 3);
  const homeFaqs = faqsByScope("global");

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          faqPageJsonLd(homeFaqs),
        ]}
      />
      {/* 1 · HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.35 0.07 280 / 0.55), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <div className="container-site relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:py-32">
          <div>
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Готові ігрові ПК · Збираємо під замовлення
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-[80px]">
              Знайдемо ПК під твої ігри та бюджет.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Показуємо реальні FPS у твоїх іграх, а не абстрактні
              характеристики. Підбір за 30 секунд, гарантія до 3 років.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/pidbir"
                className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 text-sm")}
              >
                Підібрати ПК за 30 секунд →
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="mr-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                або за бюджетом:
              </span>
              {BUDGET_BUCKETS.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "tabular",
                  )}
                >
                  {b.label}
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <TrustStrip />
            </div>
          </div>

          {/* Right hero — showcase SKU card */}
          <div className="relative hidden lg:block">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-40 blur-3xl"
              style={{ background: SKU_ACCENTS.orbitra }}
            />
            <BuildCard
              build={top3[2]}
              variant="full"
              badge="Рекомендовано"
              highlightGames={["cs2", "warzone", "cyberpunk"]}
            />
          </div>
        </div>
      </section>

      {/* 2 · TOP-3 BUILDS */}
      <section className="container-site py-20 md:py-24">
        <Reveal>
          <SectionHeader
            kicker="Найчастіше обирають цього місяця"
            title="Три перевірені збірки в різних бюджетах"
            subtitle="По одній оптимальній моделі на кожен ціновий діапазон — з реальними FPS у популярних іграх."
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="grid gap-4 md:grid-cols-3">
            {top3.map((build, i) => (
              <BuildCard
                key={build.slug}
                build={build}
                variant="full"
                highlightGames={["cs2", "warzone", "gta5"]}
                badge={i === 1 ? "Хіт" : undefined}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* 3 · HOW IT WORKS */}
      <section className="border-y border-border bg-surface/30">
        <div className="container-site py-20 md:py-24">
          <Reveal>
            <SectionHeader
              kicker="Як це працює"
              title="Як знайти свій ПК за 30 секунд"
            />
          </Reveal>
          <Reveal delay={80}>
          <div className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="relative overflow-hidden rounded-lg border border-border bg-surface p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                    <s.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div className="tabular font-display text-2xl font-bold text-muted-foreground/30">
                    {s.n}
                  </div>
                </div>
                <div className="font-display text-lg font-semibold">
                  {s.title}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/pidbir"
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-6")}
            >
              Почати підбір →
            </Link>
          </div>
          </Reveal>
        </div>
      </section>

      {/* 4 · TRUST PILLARS */}
      <section className="container-site py-20 md:py-24">
        <Reveal>
          <SectionHeader
            kicker="Чому нам довіряють"
            title="5000+ клієнтів обирають Kondor PC"
            subtitle="Ми беремо на себе все — від пошуку комплектуючих до післяпродажного обслуговування."
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                  <p.icon className="size-5" strokeWidth={1.5} />
                </div>
                <div className="font-display text-base font-semibold leading-tight">
                  {p.title}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 5 · USE CASES */}
      <section className="border-y border-border bg-surface/30">
        <div className="container-site py-20 md:py-24">
          <Reveal>
            <SectionHeader
              kicker="Під задачу"
              title="Для яких задач збираємо ПК"
            />
          </Reveal>
          <Reveal delay={80}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u) => (
              <Link
                key={u.href}
                href={u.href}
                className="smooth-hover group relative flex items-center gap-4 overflow-hidden rounded-lg border border-border bg-surface p-5 hover:-translate-y-0.5 hover:border-white/15"
                style={{ ["--sku" as string]: SKU_ACCENTS[u.sku] }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full opacity-25 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-45"
                  style={{ background: "var(--sku)" }}
                />
                <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                  <u.icon className="size-5" strokeWidth={1.5} />
                </div>
                <div className="relative flex-1 text-sm font-medium">
                  {u.label}
                </div>
                <div className="relative text-muted-foreground transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-foreground">
                  →
                </div>
              </Link>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* 6 · REVIEWS */}
      <section className="container-site py-20 md:py-24">
        <Reveal>
          <SectionHeader
            kicker="Відгуки клієнтів"
            title="Реальні відгуки наших клієнтів"
            subtitle="500+ відгуків у Google, 800+ у соцмережах. Посилання ведуть на платформи — відгуки не підроблені."
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="grid gap-4 md:grid-cols-3">
            {homeReviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://g.page/kondor-pc"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Всі відгуки в Google Maps ↗
            </a>
            <a
              href="https://instagram.com/kondor_pc"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              Instagram ↗
            </a>
          </div>
        </Reveal>
      </section>

      {/* 7 · BOTTOM CTA + FAQ */}
      <section className="border-t border-border bg-surface/30">
        <div className="container-prose py-20 md:py-24">
          <Reveal>
            <SectionHeader
              align="center"
              kicker="Готовий?"
              title="Обери свій ПК"
              subtitle="Підбір за 30 секунд або обирай за бюджетом. Доставка Новою Поштою безкоштовно."
            />
          </Reveal>
          <Reveal delay={80}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pidbir"
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-6")}
            >
              Підібрати ПК →
            </Link>
            {BUDGET_BUCKETS.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "tabular",
                )}
              >
                {b.label}
              </Link>
            ))}
          </div>

          <FaqBlock items={homeFaqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
