import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

const COLUMNS = [
  {
    title: "Розділи",
    links: [
      { href: "/pk", label: "Ігрові ПК" },
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
      { href: "/legal/politika-konfidentsiynosti", label: "Політика конфіденційності" },
      { href: "/legal/pravova-informatsiya", label: "Реквізити" },
    ],
  },
  {
    title: "Соцмережі",
    links: [
      { href: "https://t.me/kondor_pc", label: "Telegram", external: true },
      { href: "https://instagram.com/kondor_pc", label: "Instagram", external: true },
      { href: "https://youtube.com/@kondor-pc", label: "YouTube", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
        <div className="space-y-4">
          <Wordmark size="md" />
          <p className="max-w-sm text-sm text-muted-foreground">
            Ігрові ПК під замовлення. Зібрано в Києві з гарантією 12 місяців від
            Kondor PC та оригінальною гарантією виробника.
          </p>
          <div className="text-xs text-muted-foreground">
            <div>+380 XX XXX XX XX · щодня 9:00–21:00</div>
            <div>info@kondor-pc.ua</div>
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
                      className="text-muted-foreground transition hover:text-foreground"
                    >
                      {l.label} ↗
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
          <div>© {new Date().getFullYear()} Kondor PC · ФОП [назва клієнта] · ЄДРПОУ [XXXXXXXX]</div>
          <div>Сайт працює на Next.js 15 · Sanity · Vercel</div>
        </div>
      </div>
    </footer>
  );
}
