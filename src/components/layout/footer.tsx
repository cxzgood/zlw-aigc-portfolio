import Link from "next/link";

import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/7">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <Link className="inline-flex items-center gap-3 text-white" href="/">
            <span className="grid size-8 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-200/8 font-mono text-[10px] font-bold text-cyan-200">
              {siteConfig.identity.logoInitials}
            </span>
            <span className="font-semibold">{siteConfig.identity.chineseName}</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            ComfyUI 与 AIGC 视觉工作流技术作品集。项目内容以可核查的环境、参数与排错记录为核心。
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-slate-400 md:items-end">
          <nav aria-label="页脚导航" className="flex gap-5">
            <Link className="transition hover:text-white" href="/projects/">
              项目
            </Link>
            <Link className="transition hover:text-white" href="/about/">
              关于我
            </Link>
            <Link className="transition hover:text-white" href="/#contact">
              联系
            </Link>
          </nav>
          <p>
            © {new Date().getFullYear()} {siteConfig.identity.chineseName}. Built
            for clarity.
          </p>
        </div>
      </div>
    </footer>
  );
}
