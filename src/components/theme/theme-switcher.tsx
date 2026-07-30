"use client";

import {
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from "@/components/ui/icons";
import { useTheme } from "@/components/theme/theme-provider";
import type { ThemePreference } from "@/lib/theme";

const options = [
  { value: "light", label: "浅色", Icon: SunIcon },
  { value: "dark", label: "深色", Icon: MoonIcon },
  { value: "system", label: "系统", Icon: MonitorIcon },
] as const satisfies readonly {
  value: ThemePreference;
  label: string;
  Icon: typeof SunIcon;
}[];

export function ThemeSwitcher({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const { preference, setPreference } = useTheme();

  return (
    <div
      aria-label="主题模式"
      className={[
        "theme-switcher grid grid-cols-3 rounded-full bg-[var(--surface-subtle)] p-1 ring-1 ring-[var(--line-soft)]",
        mobile ? "w-full" : "shrink-0",
      ].join(" ")}
      role="group"
    >
      {options.map(({ value, label, Icon }) => {
        const active = preference === value;

        return (
          <button
            aria-label={`切换至${label}模式${active ? "，当前已选择" : ""}`}
            aria-pressed={active}
            className={[
              "inline-flex min-h-9 items-center justify-center gap-2 rounded-full px-2.5 text-xs font-semibold transition duration-200",
              mobile ? "min-h-11" : "",
              active
                ? "bg-[var(--surface-elevated)] text-[var(--text-strong)] shadow-[0_2px_10px_rgb(20_30_36_/_0.08)] ring-1 ring-[var(--line-soft)]"
                : "text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-strong)]",
            ].join(" ")}
            key={value}
            onClick={() => setPreference(value)}
            title={`${label}模式${active ? "（当前）" : ""}`}
            type="button"
          >
            <Icon className="size-4" />
            <span className={mobile ? "" : "hidden xl:inline"}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
