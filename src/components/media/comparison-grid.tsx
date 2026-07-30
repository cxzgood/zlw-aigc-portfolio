import { ProjectMedia } from "@/components/media/project-media";
import type { ImageComparison } from "@/types/project";

export function ComparisonGrid({
  comparison,
  eagerImageId,
  recommendedImageId,
  variant = "default",
}: {
  comparison: ImageComparison;
  eagerImageId?: string;
  recommendedImageId?: string;
  variant?: "default" | "strip";
}) {
  const compact = variant === "strip";
  const gridClass = compact
    ? "grid-cols-2 lg:grid-cols-4"
    : comparison.images.length >= 4
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      : comparison.images.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1";

  return (
    <figure>
      <div className={`grid gap-4 ${gridClass}`}>
        {comparison.images.map((image) => {
          const recommended = image.id === recommendedImageId;

          return (
            <div
              className={[
                "relative bg-white/[0.025] transition duration-300",
                compact ? "rounded-[1.35rem] p-1.5" : "rounded-[1.6rem] p-2",
                recommended
                  ? "ring-1 ring-cyan-200/30"
                  : "ring-1 ring-white/[0.07]",
              ].join(" ")}
              key={image.id}
            >
              {recommended ? (
                <span className="absolute top-4 left-4 z-10 rounded-full border border-cyan-100/20 bg-[var(--code-surface)]/88 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.1em] text-cyan-200 uppercase backdrop-blur-md">
                  推荐平衡
                </span>
              ) : null}
              <ProjectMedia
                aspect={
                  compact
                    ? "strip"
                    : comparison.images.length >= 4
                      ? "portrait"
                      : "strip"
                }
                asset={image}
                eager={image.id === eagerImageId}
                fit="contain"
                sizes={
                  comparison.images.length >= 4
                    ? "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    : "(max-width: 768px) 100vw, 50vw"
                }
              />
              <div className={compact ? "px-2 pt-2.5 pb-2" : "px-2 pt-3 pb-2"}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{image.label}</p>
                  <span className="font-mono text-[9px] text-slate-500">
                    {String(comparison.images.indexOf(image) + 1).padStart(2, "0")}
                  </span>
                </div>
                {image.caption && !compact ? (
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {image.caption}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {!compact ? (
        <figcaption className="mt-4 text-sm leading-6 text-slate-400">
          {comparison.description}
        </figcaption>
      ) : null}
    </figure>
  );
}
