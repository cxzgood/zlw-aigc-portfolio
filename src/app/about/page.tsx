import type { Metadata } from "next";

import { ContactActions } from "@/components/contact/contact-actions";
import { ActionLink } from "@/components/ui/action-link";
import { ArrowRightIcon, CheckIcon, DownloadIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  aboutData,
  contactItems,
  learningRoadmap,
  resumeAsset,
  siteConfig,
} from "@/data/site";

const pageDescription =
  `了解${siteConfig.identity.chineseName}的个人信息、教育背景、当前学习方向、本地软硬件环境与 AIGC 技术学习路线。`;

export const metadata: Metadata = {
  title: "关于我",
  description: pageDescription,
  openGraph: {
    title: `关于我｜${siteConfig.identity.chineseName}`,
    description: pageDescription,
  },
  twitter: {
    card: "summary",
    title: `关于我｜${siteConfig.identity.chineseName}`,
    description: pageDescription,
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:px-8 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-end lg:gap-20">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase">
              About / {siteConfig.identity.chineseName}
            </p>
            <h1 className="text-balance mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
              以可复核的实验过程，
              <span className="block text-slate-400">建立视觉工作流能力。</span>
            </h1>
          </div>
          <p className="text-base leading-8 text-slate-400 sm:text-lg">
            {aboutData.technicalBackground}
          </p>
        </div>
      </section>

      <div className="soft-divider mx-auto max-w-7xl" />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="glass-panel rounded-3xl p-7 sm:p-9">
            <p className="font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">
              Education
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              个人信息与教育背景
            </h2>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {aboutData.profile.map((item) => (
                <div
                  className="rounded-2xl bg-white/[0.025] p-4 ring-1 ring-white/[0.07]"
                  key={item.label}
                >
                  <dt className="font-mono text-[10px] tracking-[0.12em] text-slate-500 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-200">
                    {item.value}
                  </dd>
                </div>
              ))}
              <div className="rounded-2xl bg-white/[0.025] p-4 ring-1 ring-white/[0.07] sm:col-span-2">
                <dt className="font-mono text-[10px] tracking-[0.12em] text-slate-500 uppercase">
                  学校
                </dt>
                <dd className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                  {aboutData.education.school}
                </dd>
              </div>
              {[
                ["专业", aboutData.education.major],
                ["学历", aboutData.education.degree],
                ["就读时间", aboutData.education.period],
              ].map(([label, value]) => (
                <div
                  className="rounded-2xl bg-white/[0.025] p-4 ring-1 ring-white/[0.07]"
                  key={label}
                >
                  <dt className="font-mono text-[10px] tracking-[0.12em] text-slate-500 uppercase">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-200">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="glass-panel rounded-3xl p-7 sm:p-9">
            <p className="font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">
              Learning now
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">当前学习方向</h2>
            <ul className="mt-6 space-y-3">
              {aboutData.currentLearningDirections.map((direction) => (
                <li
                  className="flex gap-3 rounded-2xl border border-violet-200/10 bg-violet-200/[0.025] p-4 text-sm leading-6 text-slate-300"
                  key={direction}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-300"
                  />
                  {direction}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-5 text-slate-400">
              以上方向对应正在开发的项目，尚未声明实验结果。
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-white/7 bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            description="仅列出已在 ComfyUI 本地部署项目中记录并验证的信息。cu130 是 PyTorch 构建标记，不用于推断系统 CUDA Toolkit 版本。"
            eyebrow="Local environment"
            title="硬件与软件环境"
          />
          <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aboutData.environment.map((item) => (
              <div
                className="rounded-2xl border border-white/8 bg-[var(--surface)] p-5"
                key={item.label}
              >
                <dt className="font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                  {item.label}
                </dt>
                <dd className="mt-3 text-sm font-semibold leading-6 text-slate-200">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionHeading
            description="路线以已完成记录和明确的开发中方向为边界，避免把计划写成结果。"
            eyebrow="Learning roadmap"
            title="技术学习路线"
          />
          <ol className="relative space-y-4 before:absolute before:top-6 before:bottom-6 before:left-5 before:w-px before:bg-white/10">
            {learningRoadmap.map((item, index) => (
              <li
                className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-5"
                key={item.title}
              >
                <span className="z-10 grid size-10 place-items-center rounded-full border border-slate-700 bg-[var(--surface)] font-mono text-xs text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="glass-panel grid overflow-hidden rounded-[2rem] lg:grid-cols-[1fr_0.7fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase">
              Contact
            </p>
            <h2 className="text-balance mt-4 text-3xl font-semibold tracking-[-0.035em] text-white">
              联系方式
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              邮箱和 GitHub 完整显示；电话仅显示脱敏号码，复制时使用完整号码。
            </p>
            <div className="mt-7">
              <ContactActions contacts={contactItems} />
            </div>
          </div>
          <div className="technical-grid border-t border-white/7 p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
            <p className="font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">
              Roles
            </p>
            <ul className="mt-5 space-y-4">
              {siteConfig.identity.targetRoles.map((role) => (
                <li className="flex items-center gap-3 text-sm text-slate-300" key={role}>
                  <CheckIcon className="size-4 text-emerald-300" />
                  {role}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ActionLink
                className="w-full sm:w-auto"
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
                className="w-full sm:w-auto"
                href="/projects/"
                icon={<ArrowRightIcon className="size-4" />}
                variant="quiet"
              >
                查看项目
              </ActionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
