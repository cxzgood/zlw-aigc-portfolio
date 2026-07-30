import type { ProjectStatus } from "@/types/project";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const complete = status === "Completed";

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase",
        complete
          ? "border-emerald-300/20 bg-emerald-300/8 text-emerald-200"
          : "border-violet-300/20 bg-violet-300/8 text-violet-200",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "size-1.5 rounded-full",
          complete ? "bg-emerald-300" : "bg-violet-300",
        ].join(" ")}
      />
      {complete ? "已完成" : "正在开发"}
    </span>
  );
}
