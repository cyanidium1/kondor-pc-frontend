import Link from "next/link";
import { Fragment } from "react";

export type Crumb = { label: string; href: string };

interface BlogBreadcrumbsProps {
  crumbs: Crumb[];
}

export default function BlogBreadcrumbs({ crumbs }: BlogBreadcrumbsProps) {
  return (
    <nav
      aria-label="Хлібні крихти"
      className="container-site pt-6 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <Fragment key={`${crumb.href}-${i}`}>
              {isLast ? (
                <li
                  aria-current="page"
                  className="line-clamp-1 max-w-[60vw] text-foreground"
                >
                  {crumb.label}
                </li>
              ) : (
                <li>
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-brand-primary"
                  >
                    {crumb.label}
                  </Link>
                </li>
              )}
              {!isLast ? (
                <li aria-hidden className="text-muted-foreground/40">
                  /
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
