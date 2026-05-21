import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import ArrowIcon from "@/components/icons/ArrowIcon";

const COLUMNS = [
  {
    title: "Розділи",
    links: [
      { href: "/pk", label: "Ігрові ПК" },
      { href: "/catalog", label: "Аксесуари" },
      { href: "/pidbir", label: "Підбір" },
      { href: "/sborka", label: "Кастомна збірка" },
      { href: "/garantiya", label: "Гарантія" },
      { href: "/dostavka-oplata", label: "Доставка та оплата" },
      { href: "/kontakty", label: "Контакти" },
    ],
  },
  {
    title: "Юридична",
    links: [
      { href: "/legal/publichna-oferta", label: "Публічна оферта" },
      {
        href: "/legal/politika-konfidentsiynosti",
        label: "Політика конфіденційності",
      },
      { href: "/legal/pravova-informatsiya", label: "Реквізити" },
    ],
  },
  {
    title: "Соцмережі",
    links: [
      { href: "https://t.me/kondor_pc", label: "Telegram", external: true },
      {
        href: "https://instagram.com/kondor_pc",
        label: "Instagram",
        external: true,
      },
      {
        href: "https://youtube.com/@kondor-pc",
        label: "YouTube",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container-site grid gap-10 pt-[92px] pb-12 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
        <div className="space-y-4">
          <Wordmark size="md" />
          <p className="max-w-sm text-[12px] leading-[120%] text-muted-foreground">
            Ігрові ПК під замовлення. Зібрано в Києві з гарантією 12 місяців від
            Kondor PC та оригінальною гарантією виробника.
          </p>
          <div className="text-xs text-muted-foreground">
            <div>
              <p className="mb-3 text-[14px] font-light leading-[120%] text-white">
                Номер телефону
              </p>
              <a
                href="tel:+380633631066"
                className="inline-block mb-5.5 transition hover:text-foreground text-[16px] leading-[120%]"
              >
                +380 63 363 10 66
              </a>
            </div>
            <p className="mb-3 text-[14px] font-light leading-[120%] text-white">
              Email
            </p>
            <a
              href="mailto:info@kondor-pc.ua"
              className="inline-block mb-3.5 transition hover:text-foreground text-[16px] leading-[120%]"
            >
              info@kondor-pc.ua
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {col.title}
            </div>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  {"external" in l ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground"
                    >
                      {l.label}{" "}
                      <ArrowIcon className="-rotate-45 text-muted-foreground size-4" />
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-muted-foreground transition hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} Kondor PC · ФОП [назва клієнта] ·
            ЄДРПОУ [XXXXXXXX]
          </div>
          <div>Сайт працює на Next.js 15 · Sanity · Vercel</div>
        </div>
      </div>
    </footer>
  );
}
