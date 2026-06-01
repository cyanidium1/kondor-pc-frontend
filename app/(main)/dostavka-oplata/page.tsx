import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FaqBlock } from "@/components/shared/FaqBlock";
import { faqsByScope, FAQS } from "@/lib/mock/faqs";
import {
  Truck,
  Package,
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  Building2,
  Bitcoin,
  Box,
  Shield,
} from "lucide-react";
import MarqueeLine from "@/components/shared/MarqueeLine";
import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";
import { getSiteContactEmail } from "@/lib/sanity/siteContacts";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Доставка та оплата",
  description:
    "Безкоштовна доставка Новою Поштою по Україні. 8 способів оплати: карта, MonoPay, частинами, IBAN, крипто, накладений платіж.",
};

const DELIVERY = [
  {
    icon: Truck,
    title: "Нова Пошта — відділення",
    price: "200–400 ₴",
    term: "1–3 дні",
    note: "Доставка по всій Україні",
  },
  {
    icon: Package,
    title: "Нова Пошта — кур'єр",
    price: "200–400 ₴",
    term: "1–2 дні",
    note: "Залежно від адреси",
  },
  {
    icon: MapPin,
    title: "Самовивіз",
    price: "Безкоштовно",
    term: "за записом",
    note: "Київ",
  },
];

const PACKING = [
  { icon: Package, text: "Страхуємо кожне замовлення на повну вартість" },
  { icon: Package, text: "Додаткова фіксація компонентів всередині корпусу" },
  { icon: Shield, text: "Пінопластові вставки на всіх сторонах" },
];

const PAYMENT = [
  {
    icon: CreditCard,
    title: "Карта онлайн (MonoPay)",
    text: "Миттєве підтвердження. Комісія 1.3% додається до суми.",
  },

  {
    icon: Wallet,
    title: "Monobank Частинами",
    text: "3 платежі без %. Оформлення онлайн 2 хв.",
  },

  {
    icon: Wallet,
    title: "ПУМБ Частинами",
    text: "До 24 місяців (% залежить від терміну).",
  },

  {
    icon: Building2,
    title: "ФОП / ЮО — рахунок",
    text: "Рахунок, договір та закриваючі документи для ФОП/ЮО.",
  },
  {
    icon: Package,
    title: "Оплата при отриманні на НП",
    text: "Для замовлень до 50 000 ₴. Комісія НП: 2% + 20 ₴.",
  },
  {
    icon: Wallet,
    title: "ПриватБанк Оплата частинами",
    text: "До 24 місяців (% залежить від терміну).",
  },
  {
    icon: Banknote,
    title: "Безготівковий IBAN",
    text: "Переказ на наш IBAN — для фізосіб.",
  },
  {
    icon: Bitcoin,
    title: "Криптовалюта",
    text: "USDT, BTC, ETH — за домовленістю з менеджером.",
  },
];

const BUSINESS_DOCS = [
  "Рахунок на оплату",
  "Договір поставки",
  "УПД / видаткова накладна",
  "Акт приймання-передачі",
];

export default async function DeliveryPaymentPage() {
  const contactEmail = await getSiteContactEmail();
  const faqs = [...faqsByScope("delivery"), ...faqsByScope("payment")];
  const items = faqs.length > 0 ? faqs : FAQS.slice(0, 5);

  return (
    <>
      <div className="rounded-b-[28px] lg:rounded-b-[40px] overflow-hidden">
        {" "}
        <section>
          <Reveal>
            {" "}
            <div className="relative container-site pt-8 lg:pt-12 pb-[50px] lg:pb-25">
              <SectionHeader
                kicker="Доставка та оплата"
                title="ШВИДКА ДОСТАВКА ПО УКРАЇНІ, ЗРУЧНА ОПЛАТА"
                subtitle="Надійно пакуємо та відправляємо ПК по всій Україні. Доступна розстрочка, безготівкова оплата та кілька способів отримання замовлення."
                titleAs="h1"
                className="mb-0"
                titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10 md:max-w-[1054px]"
                subtitleClassName="text-[14px] lg:text-[16px] leading-[120%] lg:max-w-[644px]"
              />
            </div>
          </Reveal>
        </section>
        {/* DELIVERY */}
        <section className="relative container-site pb-6 lg:pb-20">
          <div className="hidden lg:block absolute -z-30 bottom-[-40px] lg:top-[-210px] right-[-218px] lg:right-[-160px] w-[503px] h-[522px]">
            <Image
              src="/images/delivery/pc.webp"
              alt="PC"
              width="503"
              height="522"
              className="object-cover w-[460px] lg:w-[640px] h-auto"
            />
          </div>
          <div className="hidden lg:block absolute -z-20 bottom-[-182px] right-[-256px] w-[632px] h-[632px]">
            <Image
              src="/images/garantiya/right-mask.webp"
              alt="Steps right shadow desk"
              width="632"
              height="632"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-10 bottom-[-276px] right-[-675px] w-[735px] h-[735px]">
            <Image
              src="/images/garantiya/steps-right-shadow-desk.svg"
              alt="Steps right shadow desk"
              width="735"
              height="735"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-40 bottom-[-278px] left-[-541px] lg:bottom-[-578px] lg:left-[-771px] w-[1131px] h-[954px]">
            <Image
              src="/images/garantiya/steps-shadows.svg"
              alt="Steps shadows"
              width="1131"
              height="954"
              className="object-cover"
            />
          </div>
          <div className="lg:hidden absolute -z-40 bottom-[-348px] left-[-221px] lg:bottom-[-658px] lg:left-[-771px] w-[836px] h-[811px]">
            <Image
              src="/images/delivery/hero-shadows-mob.svg"
              alt="Hero shadows"
              width="836"
              height="811"
              className="object-cover"
            />
          </div>
          <SectionHeader
            kicker="01 · Доставка"
            title="Способи доставки"
            className="mb-7 lg:mb-10"
            showKickerDot={false}
            titleClassName="lg:text-[36px]"
          />

          <Reveal delay={80}>
            {" "}
            <div className="grid gap-4 md:grid-cols-3">
              {DELIVERY.map((d) => (
                <div
                  key={d.title}
                  className="rounded-lg border border-border bg-surface p-6"
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                    <d.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div className="text-[16px] leading-[120%] font-semibold tracking-wide uppercase">
                    {d.title}
                  </div>
                  <div className="tabular mt-3 flex flex-wrap items-baseline gap-3">
                    <span className="font-display text-xl font-bold">
                      {d.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      · {d.term}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{d.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      {/* PACKING */}
      <section className="overflow-hidden">
        <div className="relative container-site pt-14 pb-[195px] lg:pt-20 lg:pb-[170px]">
          <div className="absolute -z-20 top-[-796px] lg:top-[-154px] right-[-1359px] lg:left-[-120px] w-[1929px] h-[2007px] rotate-180 lg:rotate-0">
            <Image
              src="/images/pk/shadows.svg"
              alt="PK background"
              width="1929"
              height="2007"
              className="object-cover"
            />
          </div>
          <div className="absolute -z-10 bottom-[158px] lg:bottom-[103px] left-[-30px] w-[247px] h-[247px]">
            <Image
              src="/images/home/trust/figure.svg"
              alt="pc"
              width="247"
              height="247"
              className="object-cover"
            />
          </div>
          <div className="absolute -z-10 bottom-0 right-[-7px] lg:right-[90px] w-[307px] lg:w-[501px] h-auto aspect-[501/367]">
            <Image
              src="/images/delivery/pc-packaging.webp"
              alt="PC"
              width="501"
              height="367"
              className="object-cover w-[307px] lg:w-[501px] h-auto"
            />
          </div>
          <Reveal>
            <SectionHeader
              kicker="Як пакуємо"
              title="ЯК МИ УПАКОВУЄМО ПК ДЛЯ ДОСТАВКИ"
              subtitle="Жодної поломки за всі роки доставки. Якщо коробка прийшла пошкодженою — не приймай, ми вирішимо."
              className="mb-[70px]"
              titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10 lg:text-[36px]"
              subtitleClassName="text-[16px] leading-[120%] lg:max-w-[492px]"
            />
          </Reveal>
          <Reveal delay={80}>
            {" "}
            <div className="grid gap-3 sm:grid-cols-2">
              {PACKING.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-md border border-border bg-surface p-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                    <p.icon className="size-4.5" strokeWidth={1.5} />
                  </div>
                  <div className="text-sm">{p.text}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <MarqueeLine />

      {/* PAYMENT */}
      <section className="relative container-site py-[92px] lg:pt-[66px] lg:pb-[76px]">
        <div className="absolute -z-10 top-[301px] sm:top-[231px] lg:top-[81px] left-[52px] sm:left-[362px] lg:left-[787px] xl:left-[827px] w-[252px] h-[269px] sm:w-[252px] sm:h-[269px] lg:w-[354px] lg:h-[346px]">
          <Image
            src="/images/home/top-rated/figure.svg"
            alt="figure"
            width="354"
            height="346"
            className="object-cover"
          />
          <div className="absolute bottom-[-60px] left-[-10px] lg:bottom-[-348px] lg:left-[-138px] w-[302px] h-[291px] lg:w-[617px] lg:h-[582px] rounded-full bg-black blur-[35px]" />
        </div>
        <Reveal>
          {" "}
          <SectionHeader
            kicker="02 · Оплата"
            title="8 способів оплати"
            subtitle="Вибирай при оформленні замовлення — умови відображаються прямо в чекауті."
            className="mb-[92px]"
            titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10 lg:text-[36px]"
            subtitleClassName="text-[16px] leading-[120%]"
          />
        </Reveal>
        <Reveal delay={80}>
          {" "}
          <div className="grid gap-3 sm:grid-cols-2">
            {PAYMENT.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-surface p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                  <p.icon className="size-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-medium">{p.title}</div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* BUSINESS */}
      <section className="relative rounded-[40px] overflow-hidden">
        <div className="absolute -z-40 inset-0 bg-brand-primary rounded-[40px]" />
        <div className="relative container-site pt-[233px] pb-16 md:py-20 lg:max-w-[861px]">
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
          <div className="hidden lg:block absolute -z-30 top-[69px] right-[calc(50%-1510px)] w-[1889px] h-[1200px]">
            <Image
              src="/images/delivery/right-decor-desk.webp"
              alt="right-decor-desk"
              width="1889"
              height="1200"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-20 bottom-0 left-[calc(50%-627px)] w-[1004px] h-[600px]">
            <Image
              src="/images/delivery/shadow-bottom-desk.svg"
              alt="shadow-bottom-desk"
              width="1004"
              height="600"
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
            {" "}
            <SectionHeader
              kicker="ФОП та ЮО"
              title="Для юридичних осіб"
              subtitle="Оформлюй замовлення як ФОП або ЮО — надамо всі необхідні документи."
              className="mb-10"
              kickerClassName="text-center text-black"
              titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10 text-center text-black"
              subtitleClassName="text-[14px] lg:text-[16px] leading-[120%] text-center lg:max-w-[424px] lg:mx-auto text-black"
              showKickerDot={false}
            />
          </Reveal>
          <Reveal delay={80}>
            {" "}
            <div className="rounded-lg border border-border bg-surface p-6 mb-9">
              <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Працюємо з документами
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {BUSINESS_DOCS.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2 text-[12px] lg:text-[14px] leading-[120%]"
                  >
                    <span className="text-brand-primary">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[12px] lg:text-[14px] leading-[120%] text-muted-foreground">
                {contactEmail ? (
                  <>
                    Для оформлення напиши на{" "}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-foreground underline underline-offset-1"
                    >
                      {contactEmail}
                    </a>{" "}
                    або обери «Для ФОП/ЮО» при оформленні замовлення.
                  </>
                ) : (
                  <>
                    Для оформлення обери «Для ФОП/ЮО» при оформленні замовлення
                    або зв&apos;яжись з нами через сторінку контактів.
                  </>
                )}
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            {" "}
            <FaqBlock items={items} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
