export const PROJECT_CATEGORIES = [
  "Deployment",
  "Image Generation",
  "LoRA",
  "Controlled Generation",
  "Video",
  "Automation",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_STATUSES = ["Completed", "In Development"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type AssetLocation =
  | {
      readonly available: true;
      readonly publicPath: `/${string}`;
      readonly suggestedPath: `public/${string}`;
    }
  | {
      readonly available: false;
      readonly publicPath?: never;
      readonly suggestedPath: `public/${string}`;
    };

export type ProjectImage = AssetLocation & {
  readonly id: string;
  readonly kind: "image";
  readonly label: string;
  readonly alt: string;
  readonly caption?: string;
};

export type DownloadAsset = AssetLocation & {
  readonly id: string;
  readonly kind: "workflow" | "report" | "resume";
  readonly label: string;
  readonly format: "JSON" | "PDF";
  readonly description: string;
  readonly downloadName?: string;
};

export type ExternalLink =
  | {
      readonly available: true;
      readonly label: string;
      readonly href: `https://${string}`;
      readonly description?: string;
    }
  | {
      readonly available: false;
      readonly label: string;
      readonly href?: never;
      readonly description: string;
    };

export interface KeyValue {
  readonly label: string;
  readonly value: string;
  readonly note?: string;
}

export interface WorkflowStep {
  readonly title: string;
  readonly description: string;
}

export interface ProjectIssue {
  readonly title: string;
  readonly observations: readonly string[];
  readonly resolution: readonly string[];
  readonly outcome?: string;
}

export interface ImageComparison {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly layout: "single" | "before-after" | "grid";
  readonly images: readonly ProjectImage[];
}

export interface ProjectSeo {
  readonly title: string;
  readonly description: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly status: ProjectStatus;
  readonly categories: readonly ProjectCategory[];
  readonly featured: boolean;
  readonly summary: string;
  readonly background: string;
  readonly objectives: readonly string[];
  readonly technologies: readonly string[];
  readonly environment: readonly KeyValue[];
  readonly workflow: readonly WorkflowStep[];
  readonly parameters: readonly KeyValue[];
  readonly comparisons: readonly ImageComparison[];
  readonly problems: readonly ProjectIssue[];
  readonly resolutionProcess: readonly string[];
  readonly results: readonly string[];
  readonly cover: ProjectImage;
  readonly downloads: readonly DownloadAsset[];
  readonly github: ExternalLink;
  readonly seo: ProjectSeo;
}

export interface CategoryOption {
  readonly value: "All" | ProjectCategory;
  readonly label: string;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: "/" | "/projects" | "/about" | "/#contact";
}

export type SiteAction =
  | {
      readonly id: string;
      readonly label: string;
      readonly available: true;
      readonly href: string;
      readonly download?: boolean | string;
    }
  | {
      readonly id: string;
      readonly label: string;
      readonly available: false;
      readonly href?: never;
      readonly download?: never;
      readonly unavailableMessage: string;
    };

export type ContactItem =
  | {
      readonly id: "email" | "phone" | "github";
      readonly label: string;
      readonly available: true;
      readonly value: string;
      readonly action: "copy";
      readonly copyValue: string;
      readonly href?: never;
    }
  | {
      readonly id: "email" | "phone" | "github";
      readonly label: string;
      readonly available: true;
      readonly value: string;
      readonly action: "link";
      readonly copyValue?: never;
      readonly href: string;
    }
  | {
      readonly id: "email" | "phone" | "github";
      readonly label: string;
      readonly available: false;
      readonly value?: never;
      readonly action?: never;
      readonly copyValue?: never;
      readonly href?: never;
      readonly unavailableMessage: string;
    };

export interface SkillGroup {
  readonly title: string;
  readonly description: string;
  readonly items: readonly string[];
}

export interface RoadmapItem {
  readonly title: string;
  readonly status: ProjectStatus;
  readonly description: string;
}
