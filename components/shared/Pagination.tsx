"use client";
/**
 * Generic paginator — ported from nbyg-front (preserve API).
 * Receives a list of items, renders a slice based on ?page=, and emits
 * page-number buttons with an ellipsis for long sets.
 */
import { useState, useEffect, ReactNode, RefObject } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface PaginationProps<T> {
  items: T[];
  renderItems: (items: T[]) => ReactNode;
  useItemsPerPage: () => number;
  scrollTargetRef: RefObject<HTMLElement | null>;
  className?: string;
}

export default function Pagination<T>({
  items,
  renderItems,
  useItemsPerPage,
  scrollTargetRef,
  className = "",
}: PaginationProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = useItemsPerPage();
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || "1", 10));
  }, [searchParams]);

  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setCurrentPage(next);

    requestAnimationFrame(() => {
      scrollTargetRef.current?.scrollIntoView({ block: "start" });
    });

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", next.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getPageButtons = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3);
      if (currentPage === 3) pages.push(4);
      pages.push("...", totalPages - 1, totalPages);
    } else if (currentPage === 4) {
      pages.push(1, "...", 3, 4, 5, "...", totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 3) {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages - 1,
        totalPages,
      );
    } else if (currentPage === totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else if (currentPage >= totalPages - 1) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages - 1,
        totalPages,
      );
    }

    return pages;
  };

  const pageButtons = getPageButtons();

  return (
    <>
      <div key={currentPage} className={className}>
        {renderItems(currentItems)}
      </div>
      <nav
        aria-label="Сторінки"
        className={`${totalPages > 1 ? "flex" : "hidden"} mx-auto mt-10 items-center justify-center gap-3 lg:mt-16`}
      >
        <button
          type="button"
          aria-label="Попередня сторінка"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition enabled:cursor-pointer enabled:hover:border-brand-primary enabled:hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span aria-hidden>‹</span>
        </button>

        <div className="flex items-center gap-1.5">
          {pageButtons.map((item, index) =>
            item === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-1 text-[14px] text-muted-foreground"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => handlePageChange(Number(item))}
                aria-current={currentPage === item ? "page" : undefined}
                className={`size-9 cursor-pointer rounded-full text-[14px] font-medium transition ${
                  currentPage === item
                    ? "bg-brand-primary text-primary-foreground"
                    : "text-foreground hover:text-brand-primary"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          aria-label="Наступна сторінка"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition enabled:cursor-pointer enabled:hover:border-brand-primary enabled:hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span aria-hidden>›</span>
        </button>
      </nav>
    </>
  );
}
