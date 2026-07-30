"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import type { CategoryOption, Project } from "@/types/project";

type ProjectFilterProps = {
  projects: readonly Project[];
  categories: readonly CategoryOption[];
};

export function ProjectFilter({ projects, categories }: ProjectFilterProps) {
  const [activeCategory, setActiveCategory] =
    useState<CategoryOption["value"]>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeCategory));
  const completed = filteredProjects.filter(
    (project) => project.status === "Completed",
  );
  const developing = filteredProjects.filter(
    (project) => project.status === "In Development",
  );

  return (
    <div>
      <div
        aria-label="按项目类型筛选"
        className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:thin]"
        role="group"
      >
        {categories.map((category) => {
          const active = category.value === activeCategory;

          return (
            <button
              aria-pressed={active}
              className={[
                "min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                active
                  ? "border-cyan-200/35 bg-cyan-200/10 text-cyan-100"
                  : "border-white/8 bg-white/[0.025] text-slate-400 hover:border-slate-600 hover:text-white",
              ].join(" ")}
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              type="button"
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-5 font-mono text-xs text-slate-400">
        显示 {filteredProjects.length} / {projects.length} 个项目
      </p>

      {filteredProjects.length > 0 ? (
        <div className="mt-6">
          {completed.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {completed.map((project, index) => (
                <ProjectCard
                  eager={index < 2}
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          ) : null}

          {developing.length > 0 ? (
            <section
              aria-labelledby="developing-projects-heading"
              className={completed.length > 0 ? "mt-14 border-t border-white/8 pt-9" : ""}
            >
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-violet-200 uppercase">
                    In development
                  </p>
                  <h3
                    className="mt-2 text-xl font-semibold text-white"
                    id="developing-projects-heading"
                  >
                    正在开发
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  仅展示方向与已确认范围
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {developing.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : (
        <div className="technical-grid mt-6 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
          <p className="text-lg font-semibold text-slate-300">该类型暂无已录入项目</p>
          <p className="mt-2 text-sm text-slate-400">
            这是一个有效的空筛选结果，不会用虚构案例填充。
          </p>
        </div>
      )}
    </div>
  );
}
