/**
 * Site-wide primary navigation.
 * Single source of truth — consumed by Header (desktop), MobileMenu (burger),
 * and Footer. Edit here, all three update at once.
 */

export type NavLink = { href: string; label: string };
export type NavGroup = { label: string; children: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export const isNavGroup = (n: NavEntry): n is NavGroup => "children" in n;

export const NAV: NavEntry[] = [
  { href: "/pk", label: "Ігрові ПК" },
  { href: "/catalog", label: "Аксесуари" },
  { href: "/pidbir", label: "Підбір" },
  { href: "/sborka", label: "Кастомна збірка" },
  {
    label: "Підбірки",
    children: [
      { href: "/dlya/cs2", label: "ПК для CS2" },
      { href: "/dlya/montazh-4k", label: "ПК для монтажу 4К" },
    ],
  },
  { href: "/blog", label: "Блог" },
  {
    label: "Сервіс",
    children: [
      { href: "/garantiya", label: "Гарантія" },
      { href: "/dostavka-oplata", label: "Доставка та оплата" },
      { href: "/kontakty", label: "Контакти" },
    ],
  },
];
