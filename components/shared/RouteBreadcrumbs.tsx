"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const LABELS: Record<string, string> = {
  pk: "Ігрові ПК",
  catalog: "Аксесуари",
  pidbir: "Підбір",
  rezultat: "Результат",
  sborka: "Кастомна збірка",
  garantiya: "Гарантія",
  "dostavka-oplata": "Доставка та оплата",
  kontakty: "Контакти",
  legal: "Юридична інформація",
  blog: "Блог",
  dlya: "Для",
  promo: "Промо",
  styleguide: "Styleguide",
  oformlennya: "Оформлення",
  uspikh: "Успіх",
};

function humanizeSlug(segment: string): string {
  const decoded = decodeURIComponent(segment);
  return decoded
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function segmentLabel(segment: string): string {
  return LABELS[segment] ?? humanizeSlug(segment);
}

export function RouteBreadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;
  if (pathname.startsWith("/dlya/") || pathname.startsWith("/promo/"))
    return null;
  if (pathname.startsWith("/blog")) return null;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, index) => ({
    label: segmentLabel(segment),
    href: `/${segments.slice(0, index + 1).join("/")}`,
  }));

  return (
    <nav
      aria-label="Хлібні крихти"
      className="container-site py-7 lg:pt-9 text-xs text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center">
        <li>
          <Link href="/" className="hover:text-foreground">
            Головна
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="inline-flex items-center">
              <ChevronRight className="mx-1 inline size-3" />
              {isLast ? (
                <span className="text-foreground">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-foreground">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
