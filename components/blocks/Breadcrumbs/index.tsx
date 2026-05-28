import Link from "next/link";
import type { ResolvedPageContext } from "@/lib/data/types";

export function Breadcrumbs({
  pageContext,
}: {
  pageContext: ResolvedPageContext;
}) {
  return (
    <nav
      aria-label="Хлібні крихти"
      className="container-site pt-6 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition-colors hover:text-brand-primary">
            Головна
          </Link>
        </li>
        <li aria-hidden className="text-muted-foreground/40">/</li>
        <li>
          <Link
            href="/pidbir"
            className="transition-colors hover:text-brand-primary"
          >
            Підбір
          </Link>
        </li>
        <li aria-hidden className="text-muted-foreground/40">/</li>
        <li aria-current="page" className="text-foreground">
          ПК для {pageContext.displayName}
        </li>
      </ol>
    </nav>
  );
}
