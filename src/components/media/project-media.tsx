"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CloseIcon, ExpandIcon, ImageIcon } from "@/components/ui/icons";
import type { ProjectImage } from "@/types/project";

type ProjectMediaProps = {
  asset: ProjectImage;
  aspect?: "portrait" | "landscape" | "square" | "wide" | "strip";
  className?: string;
  eager?: boolean;
  fit?: "cover" | "contain";
  sizes?: string;
};

const aspectClasses = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
  strip: "aspect-[4/5]",
} as const;

function MissingMedia({
  asset,
  state = "missing",
}: {
  asset: ProjectImage;
  state?: "missing" | "loading" | "error";
}) {
  const title = {
    missing: "真实图片待补充",
    loading: "图片加载中",
    error: "图片加载失败",
  }[state];

  return (
    <div className="missing-media flex h-full w-full flex-col items-center justify-center bg-[var(--placeholder)] px-6 text-center">
      <span className="grid size-10 place-items-center rounded-xl bg-white/[0.035] text-slate-500 ring-1 ring-white/[0.07]">
        <ImageIcon className="size-5" />
      </span>
      <p className="mt-3 text-xs font-semibold text-slate-400">{title}</p>
      <p className="mt-1 max-w-xs text-[11px] leading-5 text-slate-500">{asset.label}</p>
      {state === "missing" ? (
        <p className="mt-3 font-mono text-[9px] tracking-[0.08em] text-slate-600 uppercase">
          接入资源后自动显示
        </p>
      ) : null}
    </div>
  );
}

export function ProjectMedia({
  asset,
  aspect = "landscape",
  className = "",
  eager = false,
  fit = "cover",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ProjectMediaProps) {
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "error">("loading");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const available = asset.available;

  useEffect(() => {
    if (!open) {
      return;
    }

    const triggerElement = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [open]);

  if (!available) {
    return (
      <div
        className={`${aspectClasses[aspect]} overflow-hidden rounded-2xl border border-white/8 ${className}`}
      >
        <MissingMedia asset={asset} />
      </div>
    );
  }

  const showImage = loadState !== "error";

  return (
    <>
      <button
        aria-label={`放大查看：${asset.label}`}
        className={`${aspectClasses[aspect]} group relative block w-full overflow-hidden rounded-2xl border border-white/8 bg-[var(--placeholder)] text-left ${className}`}
        disabled={loadState !== "loaded"}
        onClick={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        {showImage ? (
          <Image
            alt={asset.alt}
            className={[
              fit === "contain" ? "object-contain" : "object-cover",
              "transition duration-500 ease-out",
              loadState === "loaded" ? "opacity-100 group-hover:scale-[1.025]" : "opacity-0",
            ].join(" ")}
            fill
            loading={eager ? "eager" : "lazy"}
            onError={() => setLoadState("error")}
            onLoad={() => setLoadState("loaded")}
            sizes={sizes}
            src={asset.publicPath}
          />
        ) : (
          <MissingMedia asset={asset} state="error" />
        )}
        {loadState === "loading" ? (
          <div className="absolute inset-0">
            <MissingMedia asset={asset} state="loading" />
          </div>
        ) : null}
        {loadState === "loaded" ? (
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-2 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
            <ExpandIcon className="size-4" />
            放大
          </span>
        ) : null}
      </button>

      {open
        ? createPortal(
            <div
          aria-labelledby={titleId}
          aria-modal="true"
          className="media-dialog fixed inset-0 z-[100] grid place-items-center bg-[var(--dialog-backdrop)] p-4 backdrop-blur-md sm:p-8"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setOpen(false);
            }
          }}
          role="dialog"
        >
          <div className="flex h-full max-h-[92vh] w-full max-w-6xl flex-col">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-cyan-300 uppercase">
                  Image preview
                </p>
                <h2
                  className="mt-1 text-sm font-semibold text-[var(--dialog-text)]"
                  id={titleId}
                >
                  {asset.label}
                </h2>
              </div>
              <button
                aria-label="关闭图片预览"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/8 text-[var(--dialog-text)] transition hover:bg-white/14"
                onClick={() => setOpen(false)}
                ref={closeRef}
                type="button"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[var(--dialog-surface)]">
              <Image
                alt={asset.alt}
                className="object-contain"
                fill
                sizes="100vw"
                src={asset.publicPath}
              />
            </div>
            {asset.caption ? (
              <p className="mt-3 text-center text-sm leading-6 text-[var(--dialog-muted)]">
                {asset.caption}
              </p>
            ) : null}
          </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
