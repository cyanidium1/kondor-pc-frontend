"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/button";
import { TechButtonLink } from "@/components/shared/TechButton";
import { CartButton } from "@/components/layout/CartButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/pk", label: "Ігрові ПК" },
  { href: "/catalog", label: "Аксесуари" },
  { href: "/pidbir", label: "Підбір" },
  { href: "/sborka", label: "Кастомна збірка" },
  { href: "/garantiya", label: "Гарантія" },
  { href: "/dostavka-oplata", label: "Доставка" },
  { href: "/kontakty", label: "Контакти" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Publish header's current height as a CSS variable so MobileMenu can offset under it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const sync = () => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`,
      );
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled={scrolled}
        data-menu-open={menuOpen}
        className={cn(
          "sticky top-0 z-30 isolate",
          "transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-out",
          "bg-background/85 backdrop-blur-lg",
          "data-[scrolled=true]:bg-background/95 data-[scrolled=true]:backdrop-blur-xl",
          "data-[menu-open=true]:bg-background/95 data-[menu-open=true]:backdrop-blur-xl",
          "data-[scrolled=true]:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.75)]",
        )}
      >
        {/* Top shimmer hairline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        />
        {/* Bottom sector line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300"
        />

        <div className="container-site flex items-center justify-between gap-4 py-3.5 md:py-4">
          {/* LOGO */}
          <Link
            href="/"
            aria-label="Kondor PC — головна"
            className="group/logo relative inline-flex items-center transition-opacity duration-200 hover:opacity-90"
          >
            <Wordmark size="md" />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-foreground/50 transition-transform duration-300 ease-out group-hover/logo:scale-x-100"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "group/nav relative rounded-sm px-3 py-1.5",
                  "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
                  "transition-colors duration-200 ease-out hover:text-foreground",
                )}
              >
                {n.label}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 ease-out group-hover/nav:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-1.5">
            <CartButton />

            {/* Burger — mobile only */}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden transition-transform duration-200 ease-out active:scale-95"
            >
              <span className="relative block size-4">
                <Menu
                  className={cn(
                    "absolute inset-0 size-4 transition-all duration-200",
                    menuOpen
                      ? "scale-75 opacity-0"
                      : "scale-100 opacity-100",
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 size-4 transition-all duration-200",
                    menuOpen
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-0",
                  )}
                />
              </span>
            </Button>

            {/* Primary CTA — desktop only. Mobile CTA lives inside MobileMenu. */}
            <TechButtonLink
              href="/pidbir"
              size="sm"
              className="ml-1 hidden lg:inline-flex"
            >
              Підібрати ПК
            </TechButtonLink>
          </div>
        </div>
      </header>

      <div id="mobile-menu">
        <MobileMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          navItems={NAV}
        />
      </div>
    </>
  );
}
