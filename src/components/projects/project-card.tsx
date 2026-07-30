import Link from "next/link";

import { ComparisonGrid } from "@/components/media/comparison-grid";
import { ProjectMedia } from "@/components/media/project-media";
import { ArrowRightIcon, TerminalIcon, WrenchIcon } from "@/components/ui/icons";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Project } from "@/types/project";

function ProjectVisual({
  eager,
  project,
}: {
  eager: boolean;
  project: Project;
}) {
  if (project.slug === "img2img-denoise-study") {
    const comparison = project.comparisons.find(
      (item) => item.id === "denoise-grid",
    );

    if (comparison) {
      return (
        <div className="p-2">
          <ComparisonGrid
            comparison={comparison}
            eagerImageId="denoise-035"
            recommendedImageId="denoise-035"
            variant="strip"
          />
        </div>
      );
    }
  }

  if (project.slug === "sd15-lora-integration") {
    const comparison = project.comparisons[0];
    const hasImage = comparison?.images.some((image) => image.available);

    if (comparison && hasImage) {
      return (
        <div className="p-2">
          <ComparisonGrid comparison={comparison} variant="strip" />
        </div>
      );
    }

    return (
      <div className="m-2 rounded-[1.35rem] bg-[var(--code-surface)] p-5 ring-1 ring-white/[0.07]">
        <div className="flex items-center gap-2 text-violet-200">
          <WrenchIcon className="size-4" />
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase">
            Debug trace
          </span>
        </div>
        <ol className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["undefined", "目录检查", "下载模型", "成功识别"].map(
            (step, index) => (
              <li
                className="rounded-xl bg-black/10 px-2 py-3 text-center ring-1 ring-white/[0.06]"
                key={step}
              >
                <span className="block font-mono text-[9px] text-slate-500">
                  0{index + 1}
                </span>
                <span className="mt-1 block text-[11px] font-medium text-slate-300">
                  {step}
                </span>
              </li>
            ),
          )}
        </ol>
      </div>
    );
  }

  if (project.slug === "comfyui-local-deployment" && !project.cover.available) {
    return (
      <div className="technical-grid m-2 rounded-[1.35rem] bg-[var(--surface-inset)] p-5 ring-1 ring-white/[0.07]">
        <div className="flex items-center gap-2 text-cyan-200">
          <TerminalIcon className="size-4" />
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase">
            Environment verified
          </span>
        </div>
        <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 text-xs">
          {[
            ["Isolation", "venv"],
            ["CUDA", "Available"],
            ["Compute", "GPU matrix"],
            ["Snapshot", "pip / nodes"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[9px] tracking-[0.1em] text-slate-500 uppercase">
                {label}
              </dt>
              <dd className="mt-1.5 font-semibold text-slate-200">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  if (project.status === "In Development") {
    return (
      <div className="m-2 flex min-h-36 items-end rounded-[1.35rem] bg-[var(--surface-subtle)] p-5 ring-1 ring-white/[0.06]">
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-violet-200 uppercase">
            Scope confirmed
          </p>
          <p className="mt-2 text-sm text-slate-400">
            尚无可发布结果或视觉资产
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2">
      <ProjectMedia
        aspect={project.slug === "sdxl-photoreal-portrait" ? "strip" : "landscape"}
        asset={project.cover}
        className="rounded-[1.35rem]"
        eager={eager}
        fit={project.slug === "sdxl-photoreal-portrait" ? "contain" : "cover"}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
      />
    </div>
  );
}

export function ProjectCard({
  eager = false,
  project,
}: {
  eager?: boolean;
  project: Project;
}) {
  const developing = project.status === "In Development";

  return (
    <article
      className={[
        "group flex h-full flex-col overflow-hidden rounded-[1.75rem] ring-1 transition duration-300 hover:-translate-y-[3px]",
        developing
          ? "bg-[var(--surface-subtle)] ring-[var(--line-soft)] hover:bg-[var(--surface-hover)]"
          : "bg-[var(--surface)] ring-white/[0.08] hover:bg-[var(--surface-hover)] hover:ring-cyan-200/20",
      ].join(" ")}
      data-project-type={project.categories[0]}
    >
      <ProjectVisual eager={eager} project={project} />
      <div className="flex flex-1 flex-col p-5 pt-4 sm:p-6 sm:pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={project.status} />
          <span className="font-mono text-[10px] tracking-[0.12em] text-slate-400 uppercase">
            {project.categories.join(" · ")}
          </span>
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-white">
          <Link
            className="transition hover:text-cyan-100"
            href={`/projects/${project.slug}/`}
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
          {project.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
          {project.technologies.slice(0, developing ? 2 : 4).map((technology) => (
            <span
              className="font-mono text-[10px] text-slate-500"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-white/7 pt-4">
          <span className="text-sm font-semibold text-slate-300 transition group-hover:text-cyan-200">
            {developing ? "查看已确认范围" : "查看技术过程"}
          </span>
          <ArrowRightIcon className="size-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-200" />
        </div>
      </div>
    </article>
  );
}
