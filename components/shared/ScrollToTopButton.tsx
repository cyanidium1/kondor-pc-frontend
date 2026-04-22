"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const compute = () => {
      // Show after the user has scrolled past ~1.5 screens of content.
      const threshold = Math.max(480, window.innerHeight * 1.25);
      setVisible(window.scrollY > threshold);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  function toTop() {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Наверх"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={toTop}
      className={cn(
        "fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6",
        "clip-angular-sm flex size-11 items-center justify-center",
        "bg-surface/90 backdrop-blur-md text-foreground",
        "border border-white/10 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)]",
        "transition-[opacity,transform] duration-300 ease-out will-change-transform",
        "hover:border-white/25 hover:scale-105 active:scale-95",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
      )}
    >
      <ArrowUp className="size-4" strokeWidth={2} />
    </button>
  );
}
