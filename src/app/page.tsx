import Link from "next/link";

import { ContactActions } from "@/components/contact/contact-actions";
import { ComparisonGrid } from "@/components/media/comparison-grid";
import { ProjectMedia } from "@/components/media/project-media";
import { ActionLink } from "@/components/ui/action-link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  DownloadIcon,
  GithubIcon,
  LayersIcon,
  SlidersIcon,
  TerminalIcon,
  WrenchIcon,
} from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  completedProjects,
  getProjectBySlug,
  inDevelopmentProjects,
  projects,
} from "@/data/projects";
import { contactItems, resumeAsset, siteConfig } from "@/data/site";
import { resolveProjectAssets } from "@/lib/project-assets";

const skillIcons = [TerminalIcon, LayersIcon, SlidersIcon, WrenchIcon] as const;

function getResolvedProject(slug: string) {
  const project = getProjectBySlug(slug);

  if (!project) {
    throw new Error(`Missing required portfolio project: ${slug}`);
  }

  return resolveProjectAssets(project);
}

export default function HomePage() {
  const githubContact = contactItems.find((item) => item.id === "github");
  const portraitProject = getResolvedProject("sdxl-photoreal-portrait");
  const denoiseProject = getResolvedProject("img2img-denoise-study");
  const deploymentProject = getResolvedProject("comfyui-local-deployment");
  const loraProject = getResolvedProject("sd15-lora-integration");
  const denoiseComparison = denoiseProject.comparisons.find(
    (comparison) => comparison.id === "denoise-grid",
  );
  const loraComparison = loraProject.comparisons.find(
    (comparison) => comparison.id === "lora-strength-comparison",
  );
  const hasLoraComparison =
    loraComparison?.images.some((image) => image.available) === true;

  if (!denoiseComparison) {
    throw new Error("Denoise comparison data is required on the home page.");
  }

  return (
    <>
      <section className="home-hero relative isolate overflow-hidden">
        <div aria-hidden="true" className="hero-ambient hero-ambient--cyan" />
        <div aria-hidden="true" className="hero-ambient hero-ambient--violet" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8 lg:pt-28 lg:pb-36">
          <div className="grid min-w-0 items-center gap-14 lg:grid-cols-[minmax(0,1.22fr)_minmax(21rem,0.78fr)] lg:gap-20">
            <div className="min-w-0">
              <div className="hero-enter hero-enter--1 inline-flex items-center gap-2 rounded-full bg-white/[0.035] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-400 ring-1 ring-white/[0.08] uppercase">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-emerald-300"
                />
                AIGC workflow / technical portfolio
              </div>
              <p className="hero-enter hero-enter--2 mt-8 font-mono text-sm font-semibold tracking-[0.1em] text-cyan-200">
                {siteConfig.hero.name}
              </p>
              <h1 className="hero-enter hero-enter--3 text-balance mt-5 max-w-5xl text-[2.7rem] leading-[0.98] font-semibold tracking-[-0.06em] text-slate-400 sm:text-6xl sm:leading-[1.02] lg:text-[5.4rem]">
                ComfyUI &amp; AIGC
                <span className="mt-3 block text-white">视觉工作流工程师</span>
              </h1>
              <p className="hero-enter hero-enter--4 mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                {siteConfig.introduction}
              </p>
              <div className="hero-enter hero-enter--5 mt-9 flex flex-wrap gap-3">
                <ActionLink
                  href="#selected-work"
                  icon={<ArrowRightIcon className="size-4" />}
                  variant="primary"
                >
                  查看精选项目
                </ActionLink>
                <ActionLink
                  download={
                    resumeAsset.available ? resumeAsset.downloadName : false
                  }
                  href={resumeAsset.available ? resumeAsset.publicPath : null}
                  icon={<DownloadIcon className="size-4" />}
                  unavailableHint={`简历待补充：${resumeAsset.suggestedPath}`}
                >
                  下载简历
                </ActionLink>
                <ActionLink
                  href={githubContact?.available === true ? githubContact.href : null}
                  icon={<GithubIcon className="size-4" />}
                  variant="quiet"
                >
                  GitHub
                </ActionLink>
              </div>
            </div>

            <div className="hero-enter hero-enter--panel min-w-0">
              <aside className="runtime-panel glass-panel relative min-w-0 overflow-hidden rounded-[2rem] p-2">
                <div className="technical-grid rounded-[1.55rem] bg-[var(--surface-inset)]/92 p-5 ring-1 ring-white/[0.06] sm:p-7">
                  <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                        Local inference / verified
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-200">
                        ComfyUI Runtime
                      </p>
                    </div>
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="size-2 rounded-full bg-slate-700" />
                      <span className="size-2 rounded-full bg-slate-700" />
                      <span className="size-2 rounded-full bg-emerald-300" />
                    </div>
                  </div>

                  <dl className="mt-6 space-y-4">
                    {[
                      ["GPU", "RTX 4050 Laptop / 6GB"],
                      ["PYTHON", "3.13.14"],
                      ["PYTORCH", "2.13.0+cu130"],
                      ["CUDA CHECK", "torch.cuda.is_available() = True"],
                      ["LOCALHOST", "127.0.0.1:8188"],
                    ].map(([label, value]) => (
                      <div
                        className="grid grid-cols-[5.4rem_minmax(0,1fr)] gap-3 font-mono text-[10px] leading-5 sm:grid-cols-[6rem_minmax(0,1fr)] sm:text-[11px]"
                        key={label}
                      >
                        <dt className="text-slate-500">{label}</dt>
                        <dd className="min-w-0 break-all text-slate-300">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-7 grid grid-cols-2 gap-3 rounded-2xl bg-white/[0.025] p-4 ring-1 ring-white/[0.06]">
                    <div>
                      <p className="text-2xl font-semibold text-white">
                        {completedProjects.length}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">已完成项目</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-white">
                        {projects.length - completedProjects.length}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">正在开发</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        id="selected-work"
      >
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              description="以结果为入口，展开真实环境、关键参数、控制变量和排错过程。尚未接入的图片保持稳定占位，不推测成品。"
              eyebrow="Selected work"
              title="用项目讲清楚技术判断"
            />
            <Link
              className="interactive-pill inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full px-5 text-sm font-semibold text-slate-300 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/[0.05] hover:text-white"
              href="/projects/"
            >
              查看全部项目
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal className="mt-12 sm:mt-16" variant="image">
          <article className="editorial-feature overflow-hidden rounded-[2rem] bg-[var(--surface)] ring-1 ring-white/[0.08] sm:rounded-[2.5rem]">
            <div
              className={[
                "grid lg:items-stretch",
                portraitProject.cover.available
                  ? "lg:grid-cols-[0.82fr_1.18fr]"
                  : "lg:grid-cols-[1.05fr_0.95fr]",
              ].join(" ")}
            >
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12 xl:p-14">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={portraitProject.status} />
                    <span className="font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
                      Lead project / 01
                    </span>
                  </div>
                  <h3 className="text-balance mt-7 text-3xl leading-[1.12] font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                    {portraitProject.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    {portraitProject.summary}
                  </p>
                </div>

                <div className="mt-10">
                  <p className="border-l border-cyan-200/40 pl-5 text-lg leading-8 font-medium text-slate-100">
                    在RTX 4050 Laptop 6GB显存下完成768×1024 SDXL本地推理
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Link
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:gap-3 hover:text-cyan-100"
                      href={`/projects/${portraitProject.slug}/`}
                    >
                      查看技术过程
                      <ArrowRightIcon className="size-4" />
                    </Link>
                    <span className="font-mono text-[10px] text-slate-500">
                      {portraitProject.technologies.slice(0, 5).join(" · ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="min-w-0 p-2 pt-0 lg:p-3 lg:pl-0">
                <ProjectMedia
                  aspect="wide"
                  asset={portraitProject.cover}
                  className={[
                    "w-full rounded-[1.6rem] lg:aspect-auto lg:h-full lg:rounded-[2rem]",
                    portraitProject.cover.available
                      ? "lg:min-h-[35rem]"
                      : "lg:min-h-[28rem]",
                  ].join(" ")}
                  eager
                  fit="contain"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-10 sm:mt-14" delay={70}>
          <article className="rounded-[2rem] bg-white/[0.018] p-5 ring-1 ring-white/[0.07] sm:p-8 lg:p-10">
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={denoiseProject.status} />
                  <span className="font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
                    Controlled study / 02
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
                  {denoiseProject.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                  固定模型、Prompt、Seed、Steps、CFG、Sampler 与 Scheduler，仅改变
                  Denoise，观察重构程度。
                </p>
              </div>
              <Link
                className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start text-sm font-semibold text-cyan-200 transition hover:gap-3 hover:text-cyan-100"
                href={`/projects/${denoiseProject.slug}/`}
              >
                查看实验记录
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <ComparisonGrid
              comparison={denoiseComparison}
              eagerImageId="denoise-035"
              recommendedImageId="denoise-035"
              variant="strip"
            />
          </article>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal delay={80} variant="card">
            <article className="h-full rounded-[1.75rem] bg-[var(--surface)] p-7 ring-1 ring-white/[0.07] transition duration-300 hover:-translate-y-[3px] hover:bg-[var(--surface-hover)] hover:ring-cyan-200/15 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatusBadge status={deploymentProject.status} />
                <span className="font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
                  Environment / 03
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">
                {deploymentProject.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                {deploymentProject.summary}
              </p>
              {deploymentProject.cover.available ? (
                <ProjectMedia
                  aspect="landscape"
                  asset={deploymentProject.cover}
                  className="mt-7 rounded-[1.35rem]"
                  fit="contain"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              ) : (
                <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/[0.07] pt-7 sm:grid-cols-4">
                  {[
                    ["隔离", "venv"],
                    ["CUDA", "可用性验证"],
                    ["GPU", "矩阵计算"],
                    ["快照", "commit / pip / nodes"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-mono text-[9px] tracking-[0.12em] text-slate-500 uppercase">
                        {label}
                      </dt>
                      <dd className="mt-2 text-xs leading-5 font-medium text-slate-200">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <Link
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:gap-3 hover:text-cyan-100"
                href={`/projects/${deploymentProject.slug}/`}
              >
                查看部署验证
                <ArrowRightIcon className="size-4" />
              </Link>
            </article>
          </Reveal>

          <Reveal delay={150} variant="card">
            <article className="h-full rounded-[1.75rem] bg-white/[0.018] p-7 ring-1 ring-white/[0.07] transition duration-300 hover:-translate-y-[3px] hover:bg-white/[0.028] hover:ring-violet-200/15 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatusBadge status={loraProject.status} />
                <span className="font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
                  Debug case / 04
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">
                {loraProject.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                从节点异常追到模型目录与资源缺失，再完成识别验证。
              </p>
              {hasLoraComparison && loraComparison ? (
                <div className="mt-7">
                  <ComparisonGrid comparison={loraComparison} variant="strip" />
                </div>
              ) : (
                <ol
                  aria-label="LoRA 排错链路"
                  className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
                >
                  {["undefined", "目录检查", "下载模型", "成功识别"].map(
                    (step, index) => (
                      <li
                        className="relative rounded-xl bg-black/20 px-3 py-4 text-center ring-1 ring-white/[0.06]"
                        key={step}
                      >
                        <span className="block font-mono text-[9px] text-slate-600">
                          0{index + 1}
                        </span>
                        <span className="mt-1 block text-xs font-medium text-slate-300">
                          {step}
                        </span>
                      </li>
                    ),
                  )}
                </ol>
              )}
              <Link
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:gap-3 hover:text-cyan-100"
                href={`/projects/${loraProject.slug}/`}
              >
                查看排错过程
                <ArrowRightIcon className="size-4" />
              </Link>
            </article>
          </Reveal>
        </div>

        <Reveal className="mt-16 border-t border-white/[0.07] pt-10 sm:mt-20 sm:pt-12">
          <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.18em] text-violet-300 uppercase">
                In development
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                正在开发
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
                仅展示已确认方向，不提前包装为完成项目。
              </p>
            </div>
            <div className="divide-y divide-white/[0.07]">
              {inDevelopmentProjects.map((project) => (
                <article
                  className="grid gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                  key={project.slug}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={project.status} />
                      <h4 className="font-semibold text-slate-200">{project.title}</h4>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                      {project.summary}
                    </p>
                  </div>
                  <Link
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-200"
                    href={`/projects/${project.slug}/`}
                  >
                    查看范围
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.012]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <Reveal>
            <SectionHeading
              description="能力来自已记录的部署、工作流、控制变量和排错案例；标签只保留用于快速判断的核心技术。"
              eyebrow="Capabilities"
              title="从稳定环境，到可解释结果"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {siteConfig.coreSkills.map((skill, index) => {
              const Icon = skillIcons[index];

              return (
                <Reveal delay={index * 65} key={skill.title} variant="card">
                  <article className="group border-t border-white/[0.08] pt-6">
                    <span className="grid size-10 place-items-center rounded-xl bg-cyan-200/[0.06] text-cyan-200 ring-1 ring-cyan-200/10 transition group-hover:bg-cyan-200/[0.09]">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold text-white">
                      {skill.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {skill.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                      {skill.items.slice(0, 5).map((item) => (
                        <span
                          className="font-mono text-[10px] text-slate-500"
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-20 sm:mt-24">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
              <div>
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase">
                  Engineering mindset
                </p>
                <h3 className="text-balance mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                  让过程可追溯，让判断有依据
                </h3>
              </div>
              <ol className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {siteConfig.engineeringCapabilities.map((capability, index) => (
                  <li
                    className="grid gap-3 py-6 sm:grid-cols-[3rem_12rem_minmax(0,1fr)] sm:gap-5"
                    key={capability.title}
                  >
                    <span className="font-mono text-xs text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-semibold text-slate-200">{capability.title}</h4>
                    <p className="text-sm leading-7 text-slate-400">
                      {capability.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
        id="contact"
      >
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface)] px-7 py-10 ring-1 ring-white/[0.07] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="absolute -top-32 -right-20 size-72 rounded-full bg-cyan-300/[0.04] blur-3xl"
            />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase">
                  Contact
                </p>
                <h2 className="text-balance mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  期待讨论 ComfyUI 与 AIGC 视觉工作流机会
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
                  可通过邮箱、电话或 GitHub 联系。电话仅在页面中脱敏显示，复制按钮会复制完整号码。
                </p>
                <div className="mt-8">
                  <ContactActions contacts={contactItems} />
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                  Target roles
                </p>
                <ul className="mt-5 space-y-4">
                  {siteConfig.identity.targetRoles.map((role) => (
                    <li
                      className="flex items-center gap-3 text-sm text-slate-300"
                      key={role}
                    >
                      <CheckIcon className="size-4 text-emerald-300" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
