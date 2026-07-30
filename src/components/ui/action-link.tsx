import type { ReactNode } from "react";
import Link from "next/link";

type ActionLinkProps = {
  href?: string | null;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  download?: boolean | string;
  unavailableHint?: string;
  className?: string;
};

const variants = {
  primary:
    "border-cyan-100/30 bg-[var(--primary)] text-[var(--primary-text)] hover:-translate-y-0.5 hover:border-cyan-100 hover:bg-[var(--primary-hover)]",
  secondary:
    "border-white/12 bg-white/[0.04] text-slate-100 hover:-translate-y-0.5 hover:border-cyan-200/25 hover:bg-cyan-200/[0.06]",
  quiet:
    "border-transparent bg-transparent text-slate-300 hover:bg-white/[0.05] hover:text-white",
} as const;

const baseClass =
  "interactive-pill inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200";

export function ActionLink({
  href,
  children,
  icon,
  variant = "secondary",
  download = false,
  unavailableHint = "内容待补充",
  className = "",
}: ActionLinkProps) {
  const classes = `${baseClass} ${variants[variant]} ${className}`;

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${baseClass} cursor-not-allowed border-white/[0.07] bg-white/[0.018] text-slate-500 ${className}`}
        title={unavailableHint}
      >
        {children}
        <span className="sr-only">（{unavailableHint}）</span>
        {icon}
      </span>
    );
  }

  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal && !download) {
    return (
      <Link className={classes} href={href}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <a
      className={classes}
      download={download || undefined}
      href={href}
      rel={isInternal ? undefined : "noreferrer"}
      target={isInternal ? undefined : "_blank"}
    >
      {children}
      {icon}
    </a>
  );
}
