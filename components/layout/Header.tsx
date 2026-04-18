import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { CartButton } from "@/components/layout/CartButton";

const NAV = [
  { href: "/pk", label: "Ігрові ПК" },
  { href: "/pidbir", label: "Підбір" },
  { href: "/sborka", label: "Кастомна збірка" },
  { href: "/garantiya", label: "Гарантія" },
  { href: "/dostavka-oplata", label: "Доставка" },
  { href: "/kontakty", label: "Контакти" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="container-site flex items-center justify-between gap-6 py-3 md:py-4">
        <Link href="/" aria-label="Kondor PC — головна">
          <Wordmark size="md" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-200 ease-out hover:bg-accent hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <CartButton />
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label="Меню"
          >
            <Menu className="size-4" />
          </Button>
          <Link
            href="/pidbir"
            className={cn(
              buttonVariants({ size: "sm" }),
              "ml-1 hidden sm:inline-flex",
            )}
          >
            Підібрати ПК
          </Link>
        </div>
      </div>
    </header>
  );
}
