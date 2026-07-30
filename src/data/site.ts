import type {
  CategoryOption,
  ContactItem,
  DownloadAsset,
  NavigationItem,
  RoadmapItem,
  SiteAction,
  SkillGroup,
} from "@/types/project";

export const navigationItems = [
  { label: "首页", href: "/" },
  { label: "项目", href: "/projects" },
  { label: "关于我", href: "/about" },
  { label: "联系", href: "/#contact" },
] as const satisfies readonly NavigationItem[];

export const projectCategoryOptions = [
  { value: "All", label: "全部" },
  { value: "Deployment", label: "Deployment" },
  { value: "Image Generation", label: "Image Generation" },
  { value: "LoRA", label: "LoRA" },
  { value: "Controlled Generation", label: "Controlled Generation" },
  { value: "Video", label: "Video" },
  { value: "Automation", label: "Automation" },
] as const satisfies readonly CategoryOption[];

export const personalProfile = {
  name: "钟连炜",
  logoInitials: "ZLW",
  age: 22,
  ageLabel: "22岁",
  city: "广州市",
  email: "2241411709@qq.com",
  phone: "15118861041",
  phoneDisplay: "151****1041",
  github: "https://github.com/cxzgood",
  education: {
    school: "广东省外语艺术职业学院",
    major: "计算机应用技术",
    degree: "大专",
    period: "2023.09—2026.06",
  },
  targetRoles: [
    "ComfyUI工程师",
    "AIGC视觉工作流工程师",
    "AI图像/视频生成工程师",
  ],
} as const;

function defineDownloadAsset(asset: DownloadAsset): DownloadAsset {
  return asset;
}

function createDownloadAction(
  id: string,
  asset: DownloadAsset,
): SiteAction {
  if (asset.available) {
    return {
      id,
      label: asset.label,
      available: true,
      href: asset.publicPath,
      download: asset.downloadName ?? true,
    };
  }

  return {
    id,
    label: asset.label,
    available: false,
    unavailableMessage: `${asset.description} 建议路径：${asset.suggestedPath}。`,
  };
}

export const resumeAsset = defineDownloadAsset({
  id: "resume",
  kind: "resume",
  label: "下载简历",
  format: "PDF",
  description: "钟连炜个人简历 PDF。",
  available: true,
  publicPath: "/downloads/resume/ZhongLianwei_Resume.pdf",
  suggestedPath: "public/downloads/resume/ZhongLianwei_Resume.pdf",
  downloadName: "钟连炜ComfyUI_AIGC视觉工作流工程师简历.pdf",
});

export const heroActions: readonly SiteAction[] = [
  {
    id: "projects",
    label: "查看项目",
    available: true,
    href: "/projects",
  },
  createDownloadAction("resume", resumeAsset),
  {
    id: "github",
    label: "GitHub",
    available: true,
    href: personalProfile.github,
  },
  {
    id: "contact",
    label: "联系我",
    available: true,
    href: "#contact",
  },
];

export const coreSkills = [
  {
    title: "ComfyUI 本地环境",
    description: "从官方 Git 仓库手动部署，并使用独立 venv 管理依赖和验证 GPU 推理。",
    items: ["Windows", "PowerShell", "Python", "venv", "PyTorch", "CUDA"],
  },
  {
    title: "视觉生成工作流",
    description: "围绕 SDXL 写实生成、图生图和 VAE 潜空间流程记录节点与关键参数。",
    items: ["ComfyUI", "SDXL", "KSampler", "VAE", "Image-to-Image"],
  },
  {
    title: "模型接入与实验",
    description: "通过控制变量对比 Denoise 与 LoRA 强度，并记录模型适配结论。",
    items: ["LoRA", "Denoise", "Control Variables", "Model Management"],
  },
  {
    title: "后续方向",
    description:
      "ControlNet、IPAdapter 与 Wan2.2 对应正在开发的项目；Python 自动化是指定的方向文案，当前尚无项目记录。",
    items: ["ControlNet", "IPAdapter", "Wan2.2", "AI Video", "Python Automation"],
  },
] as const satisfies readonly SkillGroup[];

export const engineeringCapabilities = [
  {
    title: "环境隔离与验证",
    description:
      "使用独立 venv 隔离依赖，并通过 torch.cuda.is_available() 与 GPU 矩阵乘法验证推理环境。",
  },
  {
    title: "变更前快照",
    description:
      "安装自定义节点前保存 Git commit、pip freeze 与节点清单，便于定位环境变化。",
  },
  {
    title: "控制变量实验",
    description:
      "固定模型、Prompt、Seed、Steps、CFG、Sampler 与 Scheduler，仅改变目标参数进行对比。",
  },
  {
    title: "模型目录排错",
    description:
      "从节点显示异常追查到 LoRA 目录缺少模型文件，并在文件被识别后继续验证强度与风格匹配。",
  },
] as const;

export const aboutData = {
  education: {
    school: personalProfile.education.school,
    major: personalProfile.education.major,
    degree: personalProfile.education.degree,
    period: personalProfile.education.period,
  },
  profile: [
    { label: "姓名", value: personalProfile.name },
    { label: "年龄", value: personalProfile.ageLabel },
    { label: "所在城市", value: personalProfile.city },
  ],
  technicalBackground:
    "当前公开项目记录覆盖 ComfyUI 本地部署、SDXL 写实图像生成、图生图参数实验，以及 SD1.5 LoRA 接入与排错。",
  currentLearningDirections: [
    "ControlNet 与 IPAdapter 可控角色生成（正在开发）",
    "Wan2.2 本地图生视频工作流（正在开发）",
  ],
  environment: [
    { label: "操作系统", value: "Windows" },
    { label: "Shell", value: "PowerShell" },
    { label: "GPU", value: "NVIDIA GeForce RTX 4050 Laptop GPU（6GB）" },
    { label: "Python", value: "3.13.14" },
    { label: "PyTorch", value: "2.13.0+cu130" },
    { label: "ComfyUI", value: "官方 Git 仓库手动克隆，独立 venv" },
  ],
} as const;

export const learningRoadmap = [
  {
    title: "本地推理基础",
    status: "Completed",
    description: "完成 ComfyUI 本地部署、依赖隔离、CUDA 可用性与 GPU 运算验证。",
  },
  {
    title: "图像生成与参数实验",
    status: "Completed",
    description: "完成 SDXL 写实人像、图生图 Denoise 控制变量和 SD1.5 LoRA 接入实验。",
  },
  {
    title: "可控角色生成",
    status: "In Development",
    description: "ControlNet 与 IPAdapter 项目正在开发，尚未提供实验结果。",
  },
  {
    title: "本地图生视频",
    status: "In Development",
    description: "Wan2.2 本地图生视频项目正在开发，尚未提供实验结果。",
  },
] as const satisfies readonly RoadmapItem[];

export const contactItems: readonly ContactItem[] = [
  {
    id: "email",
    label: "邮箱",
    available: true,
    value: personalProfile.email,
    copyValue: personalProfile.email,
    action: "copy",
  },
  {
    id: "phone",
    label: "电话",
    available: true,
    value: personalProfile.phoneDisplay,
    copyValue: personalProfile.phone,
    action: "copy",
  },
  {
    id: "github",
    label: "GitHub",
    available: true,
    value: personalProfile.github,
    href: personalProfile.github,
    action: "link",
  },
];

export const siteConfig = {
  identity: {
    chineseName: personalProfile.name,
    logoInitials: personalProfile.logoInitials,
    age: personalProfile.age,
    city: personalProfile.city,
    role: "ComfyUI & AIGC视觉工作流工程师",
    targetRoles: personalProfile.targetRoles,
  },
  audience: ["HR", "技术面试官", "AIGC业务负责人"],
  metadata: {
    title: "钟连炜｜ComfyUI & AIGC视觉工作流工程师",
    description:
      "钟连炜的技术作品集，记录 ComfyUI 本地部署、AIGC 视觉工作流、模型管理、参数实验与故障排查过程。",
  },
  hero: {
    name: personalProfile.name,
    title: "ComfyUI & AIGC视觉工作流工程师",
    lines: [
      "本地部署 · SDXL · LoRA · ControlNet",
      "IPAdapter · AI视频 · Python自动化",
    ],
    actions: heroActions,
  },
  introduction:
    "围绕 ComfyUI 本地部署、视觉生成工作流、模型接入和参数实验持续积累可复核的项目记录；每个项目同时呈现技术环境、实验过程、问题与结论。",
  navigation: navigationItems,
  coreSkills,
  engineeringCapabilities,
  about: aboutData,
  learningRoadmap,
  contacts: contactItems,
  resume: resumeAsset,
} as const;

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalProfile.name,
  email: personalProfile.email,
  homeLocation: {
    "@type": "City",
    name: personalProfile.city,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: personalProfile.education.school,
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: personalProfile.education.degree,
    description: personalProfile.education.period,
    educationalLevel: personalProfile.education.degree,
    name: personalProfile.education.major,
  },
  additionalProperty: {
    "@type": "PropertyValue",
    name: "年龄",
    value: personalProfile.ageLabel,
  },
  jobTitle: personalProfile.targetRoles,
  sameAs: [personalProfile.github],
  knowsAbout: ["ComfyUI", "AIGC视觉工作流", "AI图像生成", "AI视频生成"],
} as const;
