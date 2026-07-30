"use client";

import { useEffect, useState } from "react";

import { ChevronUpIcon } from "@/components/ui/icons";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 640);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      aria-label="返回页面顶部"
      className="fixed right-4 bottom-4 z-30 grid size-11 place-items-center rounded-full border border-slate-600/70 bg-slate-900/92 text-slate-200 shadow-2xl transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:text-cyan-100 sm:right-6 sm:bottom-6"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      type="button"
    >
      <ChevronUpIcon className="size-5" />
    </button>
  );
}
