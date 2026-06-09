import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TrustStrip } from "@/components/shared/TrustStrip";
import { BuildCard } from "@/components/shared/BuildCard";
import { BuildHeroCard } from "@/components/shared/BuildHeroCard";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { FaqBlock } from "@/components/shared/FaqBlock";
import {
  collectHomepageReviews,
  getAllBuilds,
  selectHomeTopBuilds,
} from "@/lib/sanity-pc/builds";
import {
  getAllGames,
  makeGameLabelMap,
  makeGameShortLabelMap,
} from "@/lib/sanity-pc/games";
import { getHomePcTasks } from "@/lib/sanity/homePcTasksSection";
import { faqsByScope } from "@/lib/mock/faqs";
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";
import { Reveal } from "@/components/shared/Reveal";
import { BudgetChipLink } from "@/components/shared/BudgetChipLink";
import { TechButtonLink } from "@/components/shared/TechButton";
import { cn } from "@/lib/utils";
import {
  Video,
  ShieldCheck,
  Truck,
  RotateCcw,
  Gamepad2,
  Target,
} from "lucide-react";
import Image from "next/image";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { SitePageSchemaJson } from "@/components/seo/SitePageSchemaJson";
import {
  fetchSiteSeoByPageId,
  metadataForSitePage,
} from "@/lib/sanity/siteSeoFetcher";
import { resolveOrganizationLogoUrl } from "@/lib/sanity/seoImage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return metadataForSitePage("seoHomePage");
}

const BUDGET_BUCKETS = [
  { label: "До 40 000 ₴", href: "/pk?max=40" },
  { label: "40–80 000 ₴", href: "/pk?min=40&max=80" },
  { label: "80 000 ₴+", href: "/pk?min=80" },
];

const TRUST_PILLARS = [
  {
    icon: Video,
    title: "ВІДЕОЗВІТ",
    text: "Знімаємо відео саме твого готового ПК. Ти бачиш, що саме отримуєш",
  },
  {
    icon: ShieldCheck,
    title: "ОРИГІНАЛЬНІ КОМПОНЕНТИ З ГАРАНТІЄЮ",
    text: "Нові комплектуючі та перевірені б/у відеокарти з гарантією до 12 місяців. Кожен ПК проходить обслуговування та тестування перед продажем.",
  },
  {
    icon: Truck,
    title: "ЯКЩО ЗЛАМАЄТЬСЯ — МИ ЗАБИРАЄМО НП",
    text: "Безкоштовна доставка до сервісу за наш рахунок. Ремонт або заміна за 3–10 днів.",
  },
  {
    icon: RotateCcw,
    title: "ПОВЕРНЕННЯ ПРОТЯГОМ 14 ДНІВ",
    text: "Не підійшло — повертаємо кошти без зайвих питань за українським законом.",
  },
];

const STEPS = [
  {
    n: "01",
    icon: Target,
    title: "Обери ігри",
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

const HOME_REVIEWS_LIMIT = 3;

export default async function HomePage() {
  const [builds, gamesCatalog, pcTasks, homeSeo] = await Promise.all([
    getAllBuilds(),
    getAllGames(),
    getHomePcTasks(),
    fetchSiteSeoByPageId("seoHomePage").catch(() => null),
  ]);
  const organizationLogoUrl = resolveOrganizationLogoUrl(homeSeo);
  const organizationSchema = await organizationJsonLd({
    logoUrl: organizationLogoUrl,
  });
  const gameLabels = makeGameLabelMap(gamesCatalog);
  const gameShortLabels = makeGameShortLabelMap(gamesCatalog);
  const topBuilds = selectHomeTopBuilds(builds);
  const heroBuild = topBuilds[2] ?? topBuilds[0];
  const homeReviews = collectHomepageReviews(builds, HOME_REVIEWS_LIMIT);
  const hasHomeReviewsSection = homeReviews.length > 0;
  const homeFaqs = faqsByScope("global");

  return (
    <>
      <SitePageSchemaJson
        pageId="seoHomePage"
        excludeTypes={["Organization", "WebSite", "FAQPage"]}
      />
      <JsonLd
        data={[
          organizationSchema,
          websiteJsonLd(),
          faqPageJsonLd(homeFaqs),
        ]}
      />
      {/* 1 · HERO */}
      <section className="relative overflow-hidden rounded-b-[28px]">
        <div className="absolute bottom-[-92px] md:bottom-[-319px] left-[-261px] size-[469px] rounded-full bg-[#00FFFE] blur-[100px]" />
        <div className="absolute bottom-[-395px] lg:bottom-[-403px] right-[-235px] md:left-0 size-[469px] rounded-full bg-[#0097FF] blur-[100px]" />
        <div className="hidden md:block absolute bottom-[-100px] lg:bottom-[-490px] right-[-585px] size-[735px] rounded-full bg-[#005996] blur-[226px]" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <div className="container-site relative grid gap-12 py-10 md:py-16 md:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h1 className="relative md:max-w-[448px] lg:max-w-full font-display text-[44px] font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-[102px]">
              МАЄМО ПК
              <Image
                src="/images/home/hero/triangle.svg"
                alt="triangle decoration"
                width={41}
                height={41}
                className="absolute top-0 lg:top-1 -left-1 -z-10 w-[41px] lg:w-[62px] h-auto"
              />
            </h1>
            <p className="max-w-[148px] lg:max-w-[358px] mt-3.5 font-heading text-[14px] lg:text-[33px] uppercase font-bold leading-[120%]">
              під твої ігри та бюджет
            </p>
            <p className="mt-6 max-w-[190px] lg:max-w-[346px] text-[14px] font-light lg:text-[16px] leading-[120%]">
              Показуємо реальні FPS у твоїх іграх, а не абстрактні
              характеристики. Підбір за 30 секунд, гарантія до 3 років.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3 relative">
              <div className="absolute bottom-[-120px] lg:bottom-[-40px] left-[197px] lg:left-[357px] xl:left-[417px] w-[338px] lg:w-[395px] aspect-[395/527] h-auto -z-10">
                {" "}
                <Image
                  src="/images/home/hero/pc.webp"
                  alt="pc"
                  width={395}
                  height={527}
                  className="w-[338px] lg:w-[395px] h-auto"
                />
                <div className="absolute bottom-[-58px] lg:bottom-[-140px] left-[-131px] w-[495px] lg:w-[882px] h-[270px] lg:h-[316px] z-10 bg-black rounded-full blur-[46px]" />
              </div>
              <TechButtonLink
                href="/pidbir"
                size="lg"
                className="w-full max-w-[320px] lg:max-w-[555px] h-[42px]"
              >
                ПІДІБРАТИ ПК ЗА 30 СЕКУНД
              </TechButtonLink>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row lg:items-center gap-2">
              <p className="text-[10px] uppercase tracking-wider leading-[120%]">
                або за бюджетом:
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 lg:mt-0">
                {BUDGET_BUCKETS.map((b) => (
                  <BudgetChipLink
                    key={b.href}
                    href={b.href}
                    className="tabular"
                  >
                    {b.label}
                  </BudgetChipLink>
                ))}
              </div>
            </div>

            <div className="mt-10  md:max-w-[461px] lg:max-w-full">
              <TrustStrip />
            </div>
          </div>

          {/* Right hero — showcase SKU card */}
          <div className="relative">
            {heroBuild && (
              <BuildHeroCard
                build={heroBuild}
                variant="full"
                gameLabels={gameLabels}
                highlightGames={["cs2", "warzone", "cyberpunk"]}
              />
            )}
          </div>
        </div>
      </section>

      {/* 2 · TOP-3 BUILDS */}
      <section className="relative container-site py-[92px] lg:pt-[154px] lg:pb-[90px]">
        <div className="hidden lg:block absolute -z-40 top-[-96px] left-[-43px] w-[2245px] h-[2316px]">
          <Image
            src="/images/home/top-rated/shadow-desk.svg"
            alt="shadow-desk"
            width="2245"
            height="2316"
            className="object-cover"
          />
        </div>
        <div className="block lg:hidden absolute -z-40 top-[-20px] left-[-43px] w-[878px] h-[906px]">
          <Image
            src="/images/home/top-rated/shadow-mob.svg"
            alt="shadow-mob"
            width="878"
            height="906"
            className="object-cover"
          />
        </div>
        <div className="hidden lg:block -z-30 absolute top-[281px] lg:left-[787px] xl:left-[897px] w-[354px] h-[346px]">
          <Image
            src="/images/home/top-rated/figure.svg"
            alt="figure"
            width="354"
            height="346"
            className="object-cover"
          />
          <div className="absolute bottom-[-388px] left-[-138px] w-[617px] h-[582px] rounded-full bg-black blur-[35px]" />
        </div>
        <Reveal>
          <SectionHeader
            kicker="Найчастіше обирають цього місяця"
            title="ТРИ ПЕРЕВІРЕНІ ЗБІРКИ В РІЗНИХ БЮДЖЕТАХ"
            subtitle="По одній оптимальній моделі на кожен ціновий діапазон — з реальними FPS у популярних іграх."
            className="lg:mb-[130px]"
            titleClassName="lg:max-w-[891px] lg:mt-7 lg:mb-10"
            subtitleClassName="lg:max-w-[428px]"
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="grid gap-4 md:grid-cols-3">
            {topBuilds.map((build, i) => (
              <BuildCard
                key={build.slug}
                build={build}
                variant="full"
                gameLabels={gameLabels}
                gameShortLabels={gameShortLabels}
                highlightGames={["cs2", "warzone", "gta5"]}
                badge={i === 1 ? "Хіт" : undefined}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* 3 · HOW IT WORKS */}
      <section className="relative rounded-[40px] overflow-hidden">
        <div className="absolute -z-10 inset-0 bg-brand-primary rounded-[40px]" />
        <div className="container-site py-10 md:py-14">
          <div className="absolute top-[-424px] left-[-540px] w-[1113px] h-[997px]">
            <Image
              src="/images/home/how-it-works/top-shadow.svg"
              alt="top-shadow"
              width="1113"
              height="997"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-[-209px] right-0 w-[633px] h-[633px]">
            <Image
              src="/images/home/how-it-works/bottom-shadow.webp"
              alt="top-shadow"
              width="633"
              height="633"
              className="object-cover"
            />
          </div>
          <Reveal>
            <SectionHeader
              kicker="Як це працює"
              title="Як знайти свій ПК за 30 секунд"
              titleClassName="text-black"
              kickerClassName="text-black mb-3"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="grid gap-4 sm:grid-cols-3">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="relative overflow-hidden clip-angular-12 border border-border bg-surface p-6 min-h-[183px] sm:min-h-[230px] md:min-h-[183px]"
                >
                  <div className="mb-4 flex items-center justify-between"></div>
                  <div className="font-display text-[20px] font-semibold leading-[120%]">
                    {s.title}
                  </div>
                  <p className="max-w-[204px] mt-3 text-[12px] leading-[120%] text-muted-foreground">
                    {s.text}
                  </p>
                  <div className="absolute bottom-[0px] lg:bottom-[-27px] right-[0px] lg:right-[-27px] tabular font-heading text-[60px] lg:text-[104px] font-bold text-muted-foreground/30">
                    {s.n}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-8 flex justify-center md:justify-start">
              <TechButtonLink
                href="/pidbir"
                size="md"
                variant="swap"
                className="w-full md:max-w-[209px] h-[49px]"
              >
                Почати підбір
              </TechButtonLink>
              <div className="absolute -z-10 top-[20px] hidden md:block h-[3px] w-full bg-black"></div>
              <div className="size-[19px] rounded-full bg-black absolute top-[11px] right-0" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 · TRUST PILLARS */}
      <section className="relative container-site pt-20 pb-10 lg:py-30">
        <div className="absolute -z-10 top-[272px] sm:top-[182px] right-0 lg:right-[-180px] w-[275px] h-[286px] lg:w-[477px] lg:h-[496px]">
          <Image
            src="/images/home/trust/pc.webp"
            alt="pc"
            width="477"
            height="496"
            className="object-cover"
          />
        </div>
        <div className="absolute -z-10 bottom-[18px] lg:bottom-[83px] left-[-2px] w-[247px] h-[247px]">
          <Image
            src="/images/home/trust/figure.svg"
            alt="pc"
            width="247"
            height="247"
            className="object-cover"
          />
        </div>
        <Reveal>
          <SectionHeader
            kicker="Чому нам довіряють"
            title="5000+ КЛІЄНТІВ ОБИРАЮТЬ KONDOR PC"
            subtitle="Ми беремо на себе все — від пошуку комплектуючих до післяпродажного обслуговування."
            titleClassName="mt-3 mb-5 max-w-[320px] md:max-w-full"
            subtitleClassName="mb-[60px] max-w-[320px] md:max-w-[473px]"
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-border bg-surface p-6 min-h-[256px]"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                  <p.icon className="size-5" strokeWidth={1.5} />
                </div>
                <div className="font-display text-[20px] lg:text-[16px] font-semibold leading-[120%]">
                  {p.title}
                </div>
                <p className="mt-4 text-[12px] leading-[120%] text-muted-foreground">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 5 · USE CASES */}
      <section className="relative  bg-surface/30 rounded-[15px] lg:rounded-[40px] overflow-hidden">
        <div className="lg:hidden absolute -z-10 bottom-[-20px] left-[-200px] w-[618px] h-[347px]">
          <Image
            src="/images/home/use-cases/bottom-shadows-mob.webp"
            alt="top-image-mob"
            width="618"
            height="347"
            className="object-cover"
          />
        </div>

        <div className="lg:hidden absolute -z-10 bottom-[-80px] right-[-260px] w-[686px] h-[436px]">
          <Image
            src="/images/home/use-cases/bottom-decor-mob.webp"
            alt="bottom-decor-mob"
            width="686"
            height="436"
            className="object-cover"
          />
        </div>

        <div className="absolute -z-20 bottom-[-529px] right-[-559px] w-[735px] h-[735px] rounded-full bg-[#005996] blur-[255px]" />

        <div className="relative container-site pt-[200px] pb-20 lg:pt-[213px] lg:pb-[109px] lg:max-w-[825px]">
          <div className="hidden lg:block absolute -z-10 bottom-[-600px] left-[-1130px] w-[1631px] h-[1253px]">
            <Image
              src="/images/home/use-cases/bottom-shadows-desk.webp"
              alt="bottom-shadows-desk"
              width="1631"
              height="1253"
              className="object-cover"
            />
          </div>
          <div className="lg:hidden absolute -z-10 top-[50px] left-[calc(50%-180px)] w-[360px] h-[450px]">
            <Image
              src="/images/home/use-cases/top-image-mob.webp"
              alt="top-image-mob"
              width="360"
              height="450"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-20 top-[30px] left-[calc(50%-840px)] w-[890px] h-[916px]">
            <Image
              src="/images/home/use-cases/top-left-image-desk.webp"
              alt="top-left-image-desk"
              width="890"
              height="916"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-10 top-[-20px] right-[calc(50%-960px)] w-[1430px] h-[803px]">
            <Image
              src="/images/home/use-cases/top-right-image-desk.webp"
              alt="top-right-image-desk"
              width="1430"
              height="803"
              className="object-cover"
            />
          </div>

          <div className="hidden lg:block absolute -z-20 bottom-[-624px] right-[calc(50%-1260px)] w-[1607px] h-[1500px]">
            <Image
              src="/images/home/use-cases/bottom-right-shadows-desk.webp"
              alt="bottom-right-shadows-desk"
              width="1607"
              height="1500"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-20 top-[0px] right-[calc(50%-310px)] w-[733px] h-[1133px] rounded-full bg-black blur-[105px]" />

          {pcTasks.length > 0 && (
            <>
              <Reveal>
                <SectionHeader
                  kicker="Під задачу"
                  title="ДЛЯ ЯКИХ ЗАДАЧ ЗБИРАЄМО ПК"
                  titleClassName="mt-2.5"
                />
              </Reveal>
              <Reveal delay={80}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                  {pcTasks.map((task) => (
                    <Link
                      key={task.href}
                      href={task.href}
                      className="group relative flex items-center gap-4 overflow-hidden rounded-lg border border-border bg-surface p-5 hover:-translate-y-0.5 hover:border-white/15 transition-all duration-300 ease-out"
                    >
                      <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                        <Image
                          src={task.iconUrl}
                          alt=""
                          width={20}
                          height={20}
                          className="size-5 object-contain"
                        />
                      </div>
                      <div className="relative flex-1 font-heading uppercase text-[14px] leading-[120%]">
                        {task.name}
                      </div>
                      <div className="relative rounded-full size-9 bg-white flex items-center justify-center text-black transition duration-300 ease-out group-hover:translate-x-0.5">
                        <ArrowIcon />
                      </div>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </>
          )}
        </div>
      </section>

      {/* 6 · REVIEWS */}
      {hasHomeReviewsSection && (
        <section className="relative container-site pt-[92px] pb-10 lg:pt-30 lg:pb-[86px]">
          <div className="absolute -z-30 bottom-[-123px] lg:bottom-[-431px] right-[-685px] w-[735px] h-[735px] bg-[#005996] rounded-full blur-[220px]" />
          <Reveal>
            <SectionHeader
              kicker="Відгуки клієнтів"
              title="РЕАЛЬНІ ВІДГУКИ НАШИХ КЛІЄНТІВ"
              subtitle="500+ відгуків та відміток у Instagram. Клієнти самі показують результати після покупки та діляться враженнями від ПК."
              titleClassName="mt-3 mb-5"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="grid gap-4 md:grid-cols-3">
              {homeReviews.map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
            </div>
            <div className="mt-8 flex flex-col md:flex-row items-center gap-3">
              <a
                href="https://instagram.com/kondor_pc"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full md:max-w-[176px]",
                )}
              >
                Instagram <ArrowIcon className="-rotate-45 size-5" />
              </a>
              <a
                href="https://g.page/kondor-pc"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full md:max-w-[276px]",
                )}
              >
                Всі відгуки в Google <ArrowIcon className="-rotate-45 size-5" />
              </a>
            </div>
          </Reveal>
        </section>
      )}

      {/* 7 · BOTTOM CTA + FAQ */}
      <section className="relative rounded-[40px] overflow-hidden">
        <div className="absolute -z-30 inset-0 bg-brand-primary rounded-[40px]" />
        <div className="relative container-prose pt-[233px] pb-20.5 lg:py-[66px] lg:max-w-[706px]">
          <div className="lg:hidden absolute -z-20 top-[-125px] left-[calc(50%-460px)] w-[630px] h-[487px]">
            <Image
              src="/images/home/faq/top-decor-mob.webp"
              alt="top-decor-mob"
              width="630"
              height="487"
              className="object-cover"
            />
          </div>
          <div className="lg:hidden absolute -z-10 top-[-520px] left-[calc(50%-710px)] w-[1175px] h-[1153px]">
            <Image
              src="/images/home/faq/top-shadows-mob.svg"
              alt="top-shadows-mob"
              width="1175"
              height="1153"
              className="object-cover"
            />
          </div>
          <div className="lg:hidden absolute -z-10 bottom-[-345px] left-[calc(50%-340px)] w-[748px] h-[549px]">
            <Image
              src="/images/home/faq/bottom-decor-mob.webp"
              alt="bottom-decor-mob"
              width="748"
              height="549"
              className="object-cover"
            />
          </div>
          <div className="lg:hidden absolute -z-20 bottom-[-265px] left-[calc(50%-467px)] w-[975px] h-[975px]">
            <Image
              src="/images/home/faq/bottom-shadows-mob.svg"
              alt="bottom-shadows-mob"
              width="975"
              height="975"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-20 top-[22px] left-[calc(50%-1440px)] w-[1231px] h-[767px]">
            <Image
              src="/images/home/faq/left-decor-desk.webp"
              alt="left-decor-desk"
              width="1231"
              height="767"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-20 top-[-69px] right-[calc(50%-1000px)] w-[1160px] h-[852px]">
            <Image
              src="/images/home/faq/right-decor-desk.webp"
              alt="right-decor-desk"
              width="1160"
              height="852"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-10 top-[0px] left-[calc(50%-502px)] w-[1004px] h-[695px]">
            <Image
              src="/images/home/faq/center-shadows-desk.svg"
              alt="center-decor-desk"
              width="1004"
              height="695"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-10 top-[-453px] left-[calc(50%-1480px)] w-[1056px] h-[1021px]">
            <Image
              src="/images/home/faq/top-left-shadows-desk.svg"
              alt="top-left-shadows-desk"
              width="1056"
              height="1021"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-10 bottom-[-462px] left-[calc(50%-1377px)] w-[975px] h-[975px]">
            <Image
              src="/images/home/faq/bottom-left-shadows-desk.svg"
              alt="bottom-left-shadows-desk"
              width="975"
              height="975"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-10 bottom-[-404px] right-[calc(50%-1277px)] w-[735px] h-[735px]">
            <Image
              src="/images/home/faq/bottom-right-shadows-desk.svg"
              alt="bottom-right-shadows-desk"
              width="735"
              height="735"
              className="object-cover"
            />
          </div>

          <Reveal>
            <SectionHeader
              align="center"
              kicker="Готовий?"
              title="Обери свій ПК"
              subtitle="Підбір за 30 секунд або обирай за бюджетом. Доставка Новою Поштою."
              kickerClassName="text-black"
              titleClassName="text-black py-4"
              subtitleClassName="text-black lg:max-w-[424px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mb-12 flex flex-col lg:flex-row items-center justify-center gap-5">
              <TechButtonLink
                href="/pidbir"
                size="sm"
                variant="swap"
                className="w-full md:max-w-[209px] h-[49px] lg:h-[51px] lg:text-[14px]"
              >
                Підібрати ПК
              </TechButtonLink>
              <div className="flex flex-wrap items-center gap-2">
                {" "}
                {BUDGET_BUCKETS.map((b) => (
                  <BudgetChipLink
                    key={b.href}
                    href={b.href}
                    className="tabular text-[12px]"
                  >
                    {b.label}
                  </BudgetChipLink>
                ))}
              </div>
            </div>

            <FaqBlock items={homeFaqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
