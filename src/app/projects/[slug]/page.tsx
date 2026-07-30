import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComparisonGrid } from "@/components/media/comparison-grid";
import { ProjectMedia } from "@/components/media/project-media";
import {
  DetailSection,
  EmptyRecord,
  IssueList,
  KeyValueGrid,
  ProjectDownloads,
  WorkflowTimeline,
} from "@/components/projects/project-detail";
import { ArrowLeftIcon, CheckIcon } from "@/components/ui/icons";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  projects,
} from "@/data/projects";
import { siteConfig } from "@/data/site";
import { resolveProjectAssets } from "@/lib/project-assets";
import type { Project } from "@/types/project";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "项目未找到",
    };
  }

  const socialTitle = `${project.seo.title}｜${siteConfig.identity.chineseName}`;

  return {
    title: project.seo.title,
    description: project.seo.description,
    openGraph: {
      title: socialTitle,
      description: project.seo.description,
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description: project.seo.description,
    },
  };
}

function DevelopingProject({
  project,
  projectIndex,
}: {
  project: Project;
  projectIndex: number;
}) {
  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <Link
        className="inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-slate-400 transition hover:text-cyan-200"
        href="/projects/"
      >
        <ArrowLeftIcon className="size-4" />
        返回项目列表
      </Link>

      <header className="mt-10 max-w-5xl">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
            Project {String(projectIndex).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <h1 className="text-balance mt-7 text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-white sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
          {project.summary}
        </p>
      </header>

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.75rem] bg-[var(--surface)] p-7 ring-1 ring-white/[0.08] sm:p-9">
          <p className="font-mono text-[10px] tracking-[0.16em] text-cyan-300 uppercase">
            Confirmed scope
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">已确认范围</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            {project.background}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                className="rounded-full bg-white/[0.035] px-3 py-1.5 font-mono text-[10px] text-slate-400 ring-1 ring-white/[0.07]"
                key={technology}
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <aside className="rounded-[1.75rem] bg-[var(--surface-subtle)] p-7 ring-1 ring-[var(--line-soft)] sm:p-9">
          <p className="font-mono text-[10px] tracking-[0.16em] text-violet-200 uppercase">
            Current state
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">正在开发</h2>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            当前没有可发布的实验结果、参数、工作流文件或视觉资产。页面只保留已经确认的方向，不使用推测内容补全。
          </p>
        </aside>
      </div>
    </article>
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const sourceProject = getProjectBySlug(slug);

  if (!sourceProject) {
    notFound();
  }

  const project = resolveProjectAssets(sourceProject);
  const developing = project.status === "In Development";
  const projectIndex = projects.findIndex((item) => item.slug === project.slug) + 1;

  if (developing) {
    return <DevelopingProject project={project} projectIndex={projectIndex} />;
  }

  const heroVisual = project.cover;
  const showHeroVisual = heroVisual.available;
  const evidenceComparisons = project.comparisons.filter(
    (comparison) =>
      !(
        project.slug === "sdxl-photoreal-portrait" &&
        comparison.id === "photoreal-baseline"
      ),
  );
  const hasEvidence = evidenceComparisons.length > 0;
  const resultLead =
    project.slug === "img2img-denoise-study"
      ? "Denoise 0.35 在自然写实方向取得较好平衡。"
      : project.results[0];
  const sectionNumber = (position: number) =>
    String(position - (hasEvidence ? 0 : 1)).padStart(2, "0");

  return (
    <article>
      <header className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8 lg:pt-16 lg:pb-24">
        <Link
          className="inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-slate-400 transition hover:text-cyan-200"
          href="/projects/"
        >
          <ArrowLeftIcon className="size-4" />
          返回项目列表
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                Project {String(projectIndex).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
            <h1 className="text-balance mt-6 max-w-5xl text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-white sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              {project.summary}
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-subtle)] p-5 ring-1 ring-[var(--line-soft)]">
            <p className="font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
              Core stack
            </p>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
              {project.technologies.slice(0, 6).map((technology) => (
                <span
                  className="font-mono text-[10px] text-slate-500"
                  key={technology}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section
          className={[
            "mt-12 overflow-hidden rounded-[2rem] bg-[var(--surface)] ring-1 ring-white/[0.08] sm:mt-16",
            showHeroVisual
              ? "grid lg:grid-cols-[1.05fr_0.95fr]"
              : "max-w-4xl",
          ].join(" ")}
        >
          {showHeroVisual ? (
            <div className="min-w-0 p-2 sm:p-3">
              <ProjectMedia
                aspect="strip"
                asset={heroVisual}
                className="rounded-[1.5rem] lg:h-full lg:min-h-[34rem]"
                eager
                fit="contain"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          ) : null}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="font-mono text-[10px] tracking-[0.16em] text-cyan-300 uppercase">
              Outcome first
            </p>
            <h2 className="text-balance mt-5 text-2xl leading-[1.25] font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              {resultLead}
            </h2>
            <ul className="mt-8 space-y-4 border-t border-white/8 pt-7">
              {project.results.map((result) => (
                <li
                  className="flex gap-3 text-sm leading-7 text-slate-300"
                  key={result}
                >
                  <CheckIcon className="mt-1.5 size-4 shrink-0 text-emerald-300" />
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        {hasEvidence ? (
          <DetailSection
            description="先看视觉证据，再展开环境、参数与工作流。真实图片可点击放大。"
            number="01 / EVIDENCE"
            title="视觉结果与对比"
          >
            <div className="space-y-14 sm:space-y-18">
              {evidenceComparisons.map((comparison) => (
                <div key={comparison.id}>
                  <h3 className="mb-5 text-xl font-semibold text-white">
                    {comparison.title}
                  </h3>
                  <ComparisonGrid
                    comparison={comparison}
                    eagerImageId={
                      comparison.id === "denoise-grid"
                        ? "denoise-035"
                        : undefined
                    }
                    recommendedImageId={
                      comparison.id === "denoise-grid"
                        ? "denoise-035"
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          </DetailSection>
        ) : null}

        <DetailSection
          number={`${sectionNumber(2)} / CONTEXT`}
          title="背景与目标"
        >
          <p className="max-w-3xl text-base leading-8 text-slate-300">
            {project.background}
          </p>
          {project.objectives.length > 0 ? (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {project.objectives.map((objective) => (
                <li
                  className="flex gap-3 rounded-2xl bg-white/[0.025] p-4 text-sm leading-6 text-slate-300 ring-1 ring-white/[0.07]"
                  key={objective}
                >
                  <CheckIcon className="mt-1 size-4 shrink-0 text-cyan-300" />
                  {objective}
                </li>
              ))}
            </ul>
          ) : null}
        </DetailSection>

        <DetailSection
          number={`${sectionNumber(3)} / SETUP`}
          title="环境与参数"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 font-semibold text-white">技术环境</h3>
              {project.environment.length > 0 ? (
                <KeyValueGrid items={project.environment} />
              ) : (
                <EmptyRecord />
              )}
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-white">关键参数</h3>
              {project.parameters.length > 0 ? (
                <KeyValueGrid items={project.parameters} />
              ) : (
                <EmptyRecord />
              )}
            </div>
          </div>
        </DetailSection>

        <DetailSection
          number={`${sectionNumber(4)} / WORKFLOW`}
          title="工作流"
        >
          {project.workflow.length > 0 ? (
            <WorkflowTimeline steps={project.workflow} />
          ) : (
            <EmptyRecord />
          )}
        </DetailSection>

        <DetailSection
          number={`${sectionNumber(5)} / DEBUGGING`}
          title="问题与解决过程"
        >
          <div className="space-y-10">
            {project.problems.length > 0 ? (
              <IssueList issues={project.problems} />
            ) : (
              <p className="text-sm leading-7 text-slate-400">
                该项目记录中没有单独列出的故障条目。
              </p>
            )}

            {project.resolutionProcess.length > 0 ? (
              <div>
                <h3 className="mb-4 font-semibold text-white">处理链路</h3>
                <ol className="space-y-3">
                  {project.resolutionProcess.map((step, index) => (
                    <li
                      className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 rounded-2xl bg-white/[0.025] p-4 text-sm leading-6 text-slate-300 ring-1 ring-white/[0.07]"
                      key={`${step}-${index}`}
                    >
                      <span className="font-mono text-xs text-cyan-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </DetailSection>

        <DetailSection
          description="只有数据中明确标记为可用的本地文件才会生成下载链接。"
          number={`${sectionNumber(6)} / ASSETS`}
          title="下载与链接"
        >
          <ProjectDownloads project={project} />
        </DetailSection>
      </div>
    </article>
  );
}
