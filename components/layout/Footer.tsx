import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import ArrowIcon from "@/components/icons/ArrowIcon";
import CodeSiteIcon from "../icons/CodeSiteIcon";
import TagIcon from "../icons/TagIcon";

const CODE_SITE_URL = "https://www.code-site.art";

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
    <footer className="bg-background  pt-[92px] pb-12">
      <div className="container-site grid gap-10 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
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
      <div className="container-site">
        <div className="py-5 text-[14px] text-white uppercase font-heading">
          © 2020 - {new Date().getFullYear()} Kondor PC
        </div>
        <p className="text-[8px] leading-[120%] font-medium uppercase">
          Created by:
        </p>

        <a
          href={CODE_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[13px] leading-[120%] font-heading"
        >
          CODE-SITE.ART <TagIcon className="mb-1" />
        </a>
      </div>
    </footer>
  );
}
