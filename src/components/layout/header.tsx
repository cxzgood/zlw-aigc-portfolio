"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { siteConfig } from "@/data/site";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/projects/", label: "项目" },
  { href: "/about/", label: "关于我" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled((current) => {
          const next = window.scrollY > 20;
          return current === next ? current : next;
        });
      });
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const menuButtonElement = menuButtonRef.current;
    const panelFocusable = Array.from(
      menuPanelRef.current?.querySelectorAll<HTMLElement>(
        'a, button:not([disabled])',
      ) ?? [],
    );
    const focusableElements = [menuButtonElement, ...panelFocusable].filter(
      (element): element is HTMLElement => element !== null,
    );
    menuPanelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }

      if (event.key === "Tab" && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      menuButtonElement?.focus();
    };
  }, [menuOpen]);

  return (
    <header
      className={[
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || menuOpen
          ? "border-[var(--line-soft)] bg-[var(--header-scrolled)] shadow-[var(--shadow-header)] backdrop-blur-xl"
          : "border-transparent bg-[var(--header-top)]",
      ].join(" ")}
    >
      <div className="mx-auto flex h-18 w-full min-w-0 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          aria-label={`${siteConfig.identity.chineseName}首页`}
          className="group inline-flex items-center gap-3"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid size-9 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-200/8 font-mono text-xs font-bold text-cyan-200 transition group-hover:border-cyan-200/40">
            {siteConfig.identity.logoInitials}
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-semibold tracking-wide text-white">
              {siteConfig.identity.chineseName}
            </span>
            <span className="mt-1 block font-mono text-[9px] tracking-[0.2em] text-slate-400 uppercase">
              AIGC Workflow Lab
            </span>
          </span>
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={[
                  "relative rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-white/[0.07] text-white after:absolute after:right-4 after:bottom-1 after:left-4 after:h-px after:bg-cyan-200/70"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                ].join(" ")}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ml-3">
            <ThemeSwitcher />
          </div>
          <Link
            className="ml-2 inline-flex min-h-10 items-center rounded-full border border-cyan-200/20 bg-cyan-200/[0.07] px-4 text-sm font-semibold text-cyan-100 transition hover:-translate-y-px hover:border-cyan-200/35 hover:bg-cyan-200/[0.11]"
            href="/#contact"
          >
            联系我
          </Link>
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
          className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-200/25 hover:bg-cyan-200/[0.07] md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          ref={menuButtonRef}
          type="button"
        >
          {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div
          className="fixed inset-x-0 top-18 h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-[var(--line-soft)] bg-[var(--menu-surface)] px-4 py-6 backdrop-blur-2xl md:hidden"
          id="mobile-navigation"
          ref={menuPanelRef}
        >
          <div className="mx-auto mb-5 max-w-lg">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
                Theme
              </p>
              <p className="text-xs text-slate-500">浅色 / 深色 / 跟随系统</p>
            </div>
            <ThemeSwitcher mobile />
          </div>
          <nav aria-label="移动端导航" className="mx-auto flex max-w-lg flex-col gap-2">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex min-h-14 items-center justify-between rounded-2xl border px-5 text-base font-semibold",
                    active
                      ? "border-cyan-200/20 bg-cyan-200/8 text-cyan-100"
                      : "border-white/7 bg-white/3 text-slate-300",
                  ].join(" ")}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <span aria-hidden="true" className="font-mono text-xs text-slate-400">
                    0{navItems.indexOf(item) + 1}
                  </span>
                </Link>
              );
            })}
            <Link
              className="mt-2 flex min-h-14 items-center justify-center rounded-2xl bg-[var(--primary)] font-semibold text-[var(--primary-text)]"
              href="/#contact"
              onClick={() => setMenuOpen(false)}
            >
              联系我
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
