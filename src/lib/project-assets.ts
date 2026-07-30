import { existsSync } from "node:fs";
import { join } from "node:path";

import type { Project, ProjectImage } from "@/types/project";

function toPublicPath(suggestedPath: `public/${string}`): `/${string}` {
  return `/${suggestedPath.slice("public/".length).replaceAll("\\", "/")}`;
}

function resolveImageAsset(asset: ProjectImage): ProjectImage {
  const publicPath = asset.available
    ? asset.publicPath
    : toPublicPath(asset.suggestedPath);
  const diskPath = join(
    process.cwd(),
    "public",
    publicPath.slice(1).replaceAll("/", "\\"),
  );
  const base = {
    id: asset.id,
    kind: asset.kind,
    label: asset.label,
    alt: asset.alt,
    caption: asset.caption,
    suggestedPath: asset.suggestedPath,
  } as const;

  if (existsSync(diskPath)) {
    return {
      ...base,
      available: true,
      publicPath,
    };
  }

  return {
    ...base,
    available: false,
  };
}

export function resolveProjectAssets(project: Project): Project {
  return {
    ...project,
    cover: resolveImageAsset(project.cover),
    comparisons: project.comparisons.map((comparison) => ({
      ...comparison,
      images: comparison.images.map(resolveImageAsset),
    })),
  };
}

export function resolveProjectsAssets(
  projects: readonly Project[],
): readonly Project[] {
  return projects.map(resolveProjectAssets);
}
