import Link from "next/link";

import { ArrowLeftIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[65vh] max-w-3xl place-items-center px-4 py-20 text-center sm:px-6">
      <div>
        <p className="font-mono text-xs tracking-[0.18em] text-cyan-300 uppercase">
          404 / Not found
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white">
          没有找到这个页面
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-400">
          页面可能尚未创建，或项目 slug 已发生变化。
        </p>
        <Link
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/8 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-200/12"
          href="/projects/"
        >
          <ArrowLeftIcon className="size-4" />
          返回项目列表
        </Link>
      </div>
    </div>
  );
}
