import { ActionLink } from "@/components/ui/action-link";
import {
  CheckIcon,
  DownloadIcon,
  GithubIcon,
  WrenchIcon,
} from "@/components/ui/icons";
import type {
  DownloadAsset,
  KeyValue,
  Project,
  ProjectIssue,
  WorkflowStep,
} from "@/types/project";

type DetailSectionProps = {
  number: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function DetailSection({
  number,
  title,
  description,
  children,
}: DetailSectionProps) {
  return (
    <section className="grid gap-6 border-t border-white/8 py-12 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10 md:py-16">
      <div>
        <p className="font-mono text-[10px] tracking-[0.16em] text-cyan-300 uppercase">
          {number}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">{title}</h2>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function EmptyRecord({ developing = false }: { developing?: boolean }) {
  return (
    <div className="technical-grid rounded-2xl border border-dashed border-white/10 bg-white/[0.018] px-5 py-9 text-center">
      <p className="text-sm font-medium text-slate-400">
        {developing ? "项目正在开发，该部分尚无可发布记录。" : "该部分尚未记录。"}
      </p>
      <p className="mt-1 text-xs text-slate-400">不会使用推测内容补全空白。</p>
    </div>
  );
}

export function KeyValueGrid({ items }: { items: readonly KeyValue[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          className="rounded-2xl border border-white/8 bg-white/[0.025] p-5"
          key={`${item.label}-${item.value}`}
        >
          <dt className="font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
            {item.label}
          </dt>
          <dd className="mt-2 break-words text-sm font-semibold leading-6 text-slate-200">
            {item.value}
          </dd>
          {item.note ? (
            <dd className="mt-2 text-xs leading-5 text-slate-400">{item.note}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

export function WorkflowTimeline({ steps }: { steps: readonly WorkflowStep[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li
          className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-4 sm:p-5"
          key={`${step.title}-${index}`}
        >
          <span className="grid size-10 place-items-center rounded-xl border border-cyan-200/15 bg-cyan-200/7 font-mono text-xs font-semibold text-cyan-200">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white">{step.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function IssueList({ issues }: { issues: readonly ProjectIssue[] }) {
  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <article
          className="rounded-2xl border border-amber-200/10 bg-amber-100/[0.025] p-5 sm:p-6"
          key={issue.title}
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-amber-200/15 bg-amber-200/7 text-amber-200">
              <WrenchIcon className="size-4" />
            </span>
            <div>
              <h3 className="font-semibold text-white">{issue.title}</h3>
              {issue.observations.length > 0 ? (
                <div className="mt-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                    观察
                  </p>
                  <ul className="mt-2 space-y-2">
                    {issue.observations.map((item) => (
                      <li className="flex gap-2 text-sm leading-6 text-slate-400" key={item}>
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-slate-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {issue.resolution.length > 0 ? (
                <div className="mt-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                    处理
                  </p>
                  <ul className="mt-2 space-y-2">
                    {issue.resolution.map((item) => (
                      <li className="flex gap-2 text-sm leading-6 text-slate-300" key={item}>
                        <CheckIcon className="mt-1 size-4 shrink-0 text-emerald-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {issue.outcome ? (
                <p className="mt-4 rounded-xl bg-black/20 px-4 py-3 text-sm leading-6 text-slate-300">
                  {issue.outcome}
                </p>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function AssetAction({ asset }: { asset: DownloadAsset }) {
  const hint = `文件待补充：${asset.suggestedPath}`;

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-cyan-300 uppercase">
            {asset.format}
          </p>
          <h3 className="mt-2 text-sm font-semibold text-white">{asset.label}</h3>
          <p className="mt-2 text-xs leading-5 text-slate-400">{asset.description}</p>
        </div>
        <DownloadIcon className="size-5 shrink-0 text-slate-400" />
      </div>
      <ActionLink
        className="mt-5 w-full"
        download
        href={asset.available ? asset.publicPath : null}
        unavailableHint={hint}
      >
        {asset.available ? `下载 ${asset.format}` : "文件待补充"}
      </ActionLink>
      {!asset.available ? (
        <p className="mt-3 break-all font-mono text-[10px] leading-5 text-slate-400">
          {asset.suggestedPath}
        </p>
      ) : null}
    </div>
  );
}

export function ProjectDownloads({ project }: { project: Project }) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {project.downloads.map((asset) => (
          <AssetAction asset={asset} key={asset.id} />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.025] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
              Source
            </p>
            <h3 className="mt-2 text-sm font-semibold text-white">{project.github.label}</h3>
            {!project.github.available ? (
              <p className="mt-1 text-xs leading-5 text-slate-400">
                {project.github.description}
              </p>
            ) : null}
          </div>
          <ActionLink
            href={project.github.available ? project.github.href : null}
            icon={<GithubIcon className="size-4" />}
            unavailableHint={
              project.github.available ? undefined : project.github.description
            }
          >
            GitHub
          </ActionLink>
        </div>
      </div>
    </div>
  );
}
