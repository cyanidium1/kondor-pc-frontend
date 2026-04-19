"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { TechButtonLink } from "@/components/shared/TechButton";

interface NavItem {
  href: string;
  label: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}) {
  const pathname = usePathname();

  // Auto-close when route changes (link click inside menu triggers this via pathname).
  useEffect(() => {
    if (isOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Body scroll lock while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <div
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-x-0 bottom-0 top-[var(--header-h,64px)] z-20 lg:hidden",
        "transition-opacity duration-200 ease-out",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Закрити меню"
        onClick={onClose}
        className="absolute inset-0 size-full cursor-default bg-black/70 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Мобільне меню"
        className={cn(
          "absolute inset-x-0 top-0 flex max-h-full flex-col overflow-y-auto",
          "border-b border-white/10 bg-background/95 backdrop-blur-xl",
          "shadow-[0_24px_48px_-20px_rgba(0,0,0,0.8)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-y-0" : "-translate-y-4",
        )}
      >
        {/* Top accent hairline for continuity with header */}
        <div
          aria-hidden
          className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <nav className="container-site flex flex-col gap-1 pt-4 pb-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                data-active={active}
                className={cn(
                  "group/mitem relative flex items-center justify-between py-3.5",
                  "text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground",
                  "transition-colors duration-200 ease-out",
                  "hover:text-foreground data-[active=true]:text-foreground",
                )}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden
                  className="tabular text-[10px] text-muted-foreground/40 transition-transform duration-300 ease-out group-hover/mitem:translate-x-0.5"
                >
                  →
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-foreground/20",
                    "transition-transform duration-300 ease-out",
                    "scale-x-0 group-hover/mitem:scale-x-100 data-[active=true]:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="container-site pb-6 pt-4">
          <TechButtonLink
            href="/pidbir"
            size="md"
            className="w-full"
            onClick={() => onClose()}
          >
            Підібрати ПК
          </TechButtonLink>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <a
              href="tel:+380000000000"
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 rounded-sm border border-white/8 bg-surface/50 py-3 text-[10px] uppercase tracking-wider text-muted-foreground transition hover:border-white/20 hover:text-foreground"
            >
              <Phone className="size-4" strokeWidth={1.75} />
              Телефон
            </a>
            <a
              href="https://t.me/kondor_pc"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 rounded-sm border border-white/8 bg-surface/50 py-3 text-[10px] uppercase tracking-wider text-muted-foreground transition hover:border-white/20 hover:text-foreground"
            >
              <MessageSquare className="size-4" strokeWidth={1.75} />
              Telegram
            </a>
            <a
              href="mailto:info@kondor-pc.ua"
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 rounded-sm border border-white/8 bg-surface/50 py-3 text-[10px] uppercase tracking-wider text-muted-foreground transition hover:border-white/20 hover:text-foreground"
            >
              <Mail className="size-4" strokeWidth={1.75} />
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
