import type { Metadata } from "next";

import { ProjectFilter } from "@/components/projects/project-filter";
import { completedProjects, inDevelopmentProjects, projects } from "@/data/projects";
import { projectCategoryOptions, siteConfig } from "@/data/site";
import { resolveProjectsAssets } from "@/lib/project-assets";

const pageDescription =
  `浏览${siteConfig.identity.chineseName}的 ComfyUI 部署、图像生成、LoRA 项目记录，以及可控生成、视频与自动化开发方向。`;

export const metadata: Metadata = {
  title: "项目",
  description: pageDescription,
  openGraph: {
    title: `项目｜${siteConfig.identity.chineseName}`,
    description: pageDescription,
  },
  twitter: {
    card: "summary",
    title: `项目｜${siteConfig.identity.chineseName}`,
    description: pageDescription,
  },
};

export default function ProjectsPage() {
  const projectsWithAssets = resolveProjectsAssets(projects);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <header className="grid gap-10 border-b border-white/8 pb-12 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase">
            Project archive
          </p>
          <h1 className="text-balance mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
            项目与实验记录
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
            以项目类型筛选本地部署、图像生成、模型接入和后续开发方向。已完成项目提供技术过程；开发中项目不展示未发生的结果。
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-3">
          {[
            ["全部", projects.length],
            ["已完成", completedProjects.length],
            ["开发中", inDevelopmentProjects.length],
          ].map(([label, value]) => (
            <div
              className="min-w-0 rounded-2xl border border-white/8 bg-white/[0.025] p-3 sm:p-4"
              key={label}
            >
              <dt className="text-xs text-slate-400">{label}</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-labelledby="project-list-heading" className="pt-10 sm:pt-12">
        <h2 className="sr-only" id="project-list-heading">
          项目列表
        </h2>
        <ProjectFilter
          categories={projectCategoryOptions}
          projects={projectsWithAssets}
        />
      </section>
    </div>
  );
}
