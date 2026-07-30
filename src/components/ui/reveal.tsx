"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "card" | "image";
};

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={[
        "scroll-reveal",
        `scroll-reveal--${variant}`,
        visible ? "is-visible" : "",
        className,
      ].join(" ")}
      ref={elementRef}
      style={{ "--reveal-delay": `${delay}ms` } as RevealStyle}
    >
      {children}
    </div>
  );
}
