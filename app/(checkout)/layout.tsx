import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="container-site flex items-center justify-between py-4">
          <Link href="/" aria-label="Kondor PC — головна">
            <Wordmark size="md" />
          </Link>
          <div className="hidden items-center gap-5 text-xs uppercase tracking-wider text-muted-foreground sm:flex">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" strokeWidth={2} />
              SSL · безпечно
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="size-3.5" strokeWidth={2} />
              Доставка НП безкоштовно
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="size-3.5" strokeWidth={2} />
              14 днів повернення
            </span>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kondor PC ·{" "}
        <Link href="/legal/publichna-oferta" className="underline underline-offset-4">Оферта</Link>
        {" · "}
        <Link href="/legal/politika-konfidentsiynosti" className="underline underline-offset-4">Конфіденційність</Link>
      </footer>
    </>
  );
}
