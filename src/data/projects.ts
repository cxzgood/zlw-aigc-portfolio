import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/types/project";

export const projects: readonly Project[] = [
  {
    slug: "comfyui-local-deployment",
    title: "ComfyUI本地GPU推理环境部署与验证",
    status: "Completed",
    categories: ["Deployment"],
    featured: true,
    summary:
      "在 Windows 上从 ComfyUI 官方 Git 仓库手动部署本地环境，使用独立 venv 隔离依赖，并完成 CUDA 可用性与 GPU 矩阵乘法验证。",
    background:
      "该项目记录 ComfyUI 本地 GPU 推理环境的手动部署与验证过程。目标硬件为 NVIDIA GeForce RTX 4050 Laptop GPU，显存 6GB。",
    objectives: [
      "从官方 Git 仓库手动克隆并运行 ComfyUI。",
      "使用独立 venv 隔离 Python 依赖。",
      "确认 PyTorch 能够识别并使用本地 GPU。",
      "在安装自定义节点前保留可追溯的环境快照。",
    ],
    technologies: [
      "Windows",
      "PowerShell",
      "Python 3.13",
      "venv",
      "Git",
      "PyTorch",
      "CUDA",
      "ComfyUI",
    ],
    environment: [
      { label: "操作系统", value: "Windows" },
      { label: "Shell", value: "PowerShell" },
      { label: "GPU", value: "NVIDIA GeForce RTX 4050 Laptop GPU" },
      { label: "显存", value: "6GB" },
      { label: "Python", value: "3.13.14" },
      { label: "PyTorch", value: "2.13.0+cu130" },
      {
        label: "ComfyUI",
        value: "从官方 Git 仓库手动克隆部署",
      },
      { label: "本地地址", value: "127.0.0.1:8188" },
    ],
    workflow: [
      {
        title: "克隆 ComfyUI",
        description: "从 ComfyUI 官方 Git 仓库手动克隆项目。",
      },
      {
        title: "创建隔离环境",
        description: "创建并使用独立 venv，避免依赖与系统 Python 混用。",
      },
      {
        title: "启动本地服务",
        description: "启动 ComfyUI，并通过 127.0.0.1:8188 访问本地界面。",
      },
      {
        title: "验证 CUDA",
        description:
          "确认 torch.cuda.is_available() 返回 True，并完成 GPU 矩阵乘法验证。",
      },
      {
        title: "保存变更前快照",
        description:
          "安装自定义节点前保存 Git commit、pip freeze 和节点清单快照。",
      },
    ],
    parameters: [
      { label: "Python", value: "3.13.14" },
      { label: "PyTorch", value: "2.13.0+cu130" },
      { label: "GPU 显存", value: "6GB" },
      { label: "服务地址", value: "127.0.0.1:8188" },
    ],
    comparisons: [],
    problems: [],
    resolutionProcess: [
      "使用独立 venv 隔离项目依赖。",
      "通过 torch.cuda.is_available() 检查 CUDA 可用性。",
      "执行 GPU 矩阵乘法，进一步验证计算任务确实可在 GPU 上运行。",
      "在引入自定义节点前记录 Git commit、pip freeze 和节点清单。",
    ],
    results: [
      "ComfyUI 已在 127.0.0.1:8188 本地运行。",
      "torch.cuda.is_available() 已验证为 True。",
      "GPU 矩阵乘法验证已完成。",
      "依赖已隔离在独立 venv 中。",
    ],
    cover: {
      id: "local-deployment-cover",
      kind: "image",
      label: "部署验证截图",
      alt: "ComfyUI 本地 GPU 推理环境部署与验证项目占位图",
      available: false,
      suggestedPath: "public/images/projects/local-deployment/cover.png",
    },
    downloads: [
      {
        id: "local-deployment-workflow",
        kind: "workflow",
        label: "下载工作流 JSON",
        format: "JSON",
        description: "该项目的工作流 JSON 尚未提供。",
        available: false,
        suggestedPath:
          "public/downloads/workflows/comfyui-local-deployment.json",
      },
      {
        id: "local-deployment-report",
        kind: "report",
        label: "下载实验记录 PDF",
        format: "PDF",
        description: "该项目的实验记录 PDF 尚未提供。",
        available: false,
        suggestedPath:
          "public/downloads/reports/comfyui-local-deployment-record.pdf",
      },
    ],
    github: {
      label: "GitHub 相关链接",
      available: false,
      description: "尚未提供该项目的 GitHub 链接。",
    },
    seo: {
      title: "ComfyUI本地GPU推理环境部署与验证",
      description:
        "记录 Windows、Python 3.13、PyTorch 与 CUDA 环境下的 ComfyUI 手动部署、GPU 验证和依赖快照过程。",
    },
  },
  {
    slug: "sdxl-photoreal-portrait",
    title: "基于Juggernaut XL的写实人像生成工作流",
    status: "Completed",
    categories: ["Image Generation"],
    featured: true,
    summary:
      "使用 Juggernaut XL 构建 768 × 1024 写实人像工作流，并在 RTX 4050 Laptop GPU 6GB 显存上完成生成。",
    background:
      "该实验使用 Juggernaut-XL_v9_RunDiffusionPhoto_v2 检查 SDXL 写实人像生成效果，并与此前使用 SD1.5 基础模型的体验进行对照。",
    objectives: [
      "建立基于 Juggernaut XL 的 SDXL 写实人像生成流程。",
      "记录模型、分辨率和采样参数。",
      "验证工作流能否在 RTX 4050 Laptop GPU 6GB 显存上完成生成。",
    ],
    technologies: [
      "ComfyUI",
      "SDXL",
      "Juggernaut XL",
      "CLIP",
      "KSampler",
      "VAE",
    ],
    environment: [
      {
        label: "GPU",
        value: "NVIDIA GeForce RTX 4050 Laptop GPU（6GB）",
      },
      {
        label: "Checkpoint",
        value: "Juggernaut-XL_v9_RunDiffusionPhoto_v2",
      },
      { label: "工作流", value: "ComfyUI" },
    ],
    workflow: [
      {
        title: "加载模型",
        description: "加载 Juggernaut-XL_v9_RunDiffusionPhoto_v2 checkpoint。",
      },
      {
        title: "文本条件",
        description: "通过 CLIP 为采样流程提供文本条件；具体 Prompt 尚未提供。",
      },
      {
        title: "执行采样",
        description:
          "以 768 × 1024 分辨率和已记录的 Steps、CFG、Sampler、Scheduler 参数执行 KSampler。",
      },
      {
        title: "解码图像",
        description: "使用 VAE 将采样后的潜空间结果解码为图像。",
      },
    ],
    parameters: [
      {
        label: "Checkpoint",
        value: "Juggernaut-XL_v9_RunDiffusionPhoto_v2",
      },
      { label: "Resolution", value: "768 × 1024" },
      { label: "Steps", value: "25" },
      { label: "CFG", value: "5.5" },
      { label: "Sampler", value: "euler" },
      { label: "Scheduler", value: "karras" },
      { label: "LoRA", value: "无" },
      {
        label: "Prompt / Seed",
        value: "未提供",
        note: "当前数据不推测未提供的 Prompt 或 Seed。",
      },
    ],
    comparisons: [
      {
        id: "photoreal-baseline",
        title: "写实人像基线结果",
        description: "真实生成图片尚未放入 public 目录。",
        layout: "single",
        images: [
          {
            id: "photoreal-baseline-image",
            kind: "image",
            label: "Juggernaut XL 基线",
            alt: "Juggernaut XL 写实人像基线结果占位图",
            caption: "768 × 1024，25 Steps，CFG 5.5，euler / karras，无 LoRA。",
            available: false,
            suggestedPath:
              "public/images/projects/photoreal-portrait/baseline.png",
          },
        ],
      },
    ],
    problems: [],
    resolutionProcess: [],
    results: [
      "人物写实度明显优于此前使用的 SD1.5 基础模型。",
      "已在 RTX 4050 Laptop GPU 6GB 显存上成功生成。",
    ],
    cover: {
      id: "photoreal-portrait-cover",
      kind: "image",
      label: "写实人像生成结果",
      alt: "Juggernaut XL 写实人像生成结果占位图",
      available: false,
      suggestedPath:
        "public/images/projects/photoreal-portrait/baseline.png",
    },
    downloads: [
      {
        id: "photoreal-baseline-workflow",
        kind: "workflow",
        label: "下载工作流 JSON",
        format: "JSON",
        description: "写实人像基线工作流 JSON 尚未提供。",
        available: false,
        suggestedPath:
          "public/downloads/workflows/photoreal-baseline.json",
      },
      {
        id: "photoreal-baseline-report",
        kind: "report",
        label: "下载实验记录 PDF",
        format: "PDF",
        description: "写实人像基线实验记录 PDF 尚未提供。",
        available: false,
        suggestedPath:
          "public/downloads/reports/photoreal-baseline-record.pdf",
      },
    ],
    github: {
      label: "GitHub 相关链接",
      available: false,
      description: "尚未提供该项目的 GitHub 链接。",
    },
    seo: {
      title: "基于Juggernaut XL的写实人像生成工作流",
      description:
        "记录 Juggernaut XL、SDXL、KSampler 与 VAE 组成的写实人像工作流及其关键采样参数。",
    },
  },
  {
    slug: "img2img-denoise-study",
    title: "图生图Denoise控制变量实验",
    status: "Completed",
    categories: ["Image Generation"],
    featured: true,
    summary:
      "固定模型、Prompt、Seed、Steps、CFG、Sampler 与 Scheduler，仅改变 Denoise，对比 0.20、0.35、0.50 和 0.65。",
    background:
      "该项目通过控制变量方式观察图生图流程中 Denoise 数值变化对结果重构程度的影响。",
    objectives: [
      "保持除 Denoise 外的实验条件一致。",
      "对比四个 Denoise 数值对应的图像变化程度。",
      "记录自然写实与原图保留之间的平衡结论。",
    ],
    technologies: [
      "Image-to-Image",
      "VAE Encode",
      "Latent",
      "KSampler",
      "VAE Decode",
    ],
    environment: [],
    workflow: [
      {
        title: "编码输入图像",
        description: "通过 VAE Encode 将输入图像转换到潜空间。",
      },
      {
        title: "固定其余变量",
        description:
          "固定模型、Prompt、Seed、Steps、CFG、Sampler 与 Scheduler。",
      },
      {
        title: "改变 Denoise",
        description: "依次使用 0.20、0.35、0.50 与 0.65 执行 KSampler。",
      },
      {
        title: "解码并对比",
        description: "通过 VAE Decode 输出图像，并以四图方式比较重构程度。",
      },
    ],
    parameters: [
      { label: "Denoise 0.20", value: "轻量精修" },
      { label: "Denoise 0.35", value: "自然写实的较好平衡" },
      { label: "Denoise 0.50", value: "明显重构" },
      {
        label: "Denoise 0.65",
        value: "更接近基于原图重新生成",
      },
      {
        label: "固定变量",
        value: "模型、Prompt、Seed、Steps、CFG、Sampler、Scheduler",
        note: "这些固定变量的具体取值尚未提供。",
      },
    ],
    comparisons: [
      {
        id: "denoise-source",
        title: "原始输入图",
        description: "图生图控制变量实验使用的原始输入图。",
        layout: "single",
        images: [
          {
            id: "denoise-source-image",
            kind: "image",
            label: "原始输入图",
            alt: "图生图 Denoise 控制变量实验的原始输入图",
            caption: "固定输入图；后续四档实验仅改变 Denoise。",
            available: false,
            suggestedPath:
              "public/images/projects/denoise-study/source.png",
          },
        ],
      },
      {
        id: "denoise-grid",
        title: "Denoise 四档对比",
        description:
          "四张真实对比图片尚未放入 public 目录；资源就位后可直接展示。",
        layout: "grid",
        images: [
          {
            id: "denoise-020",
            kind: "image",
            label: "Denoise 0.20",
            alt: "Denoise 0.20 轻量精修结果占位图",
            caption: "轻量精修",
            available: false,
            suggestedPath:
              "public/images/projects/denoise-study/denoise-020.png",
          },
          {
            id: "denoise-035",
            kind: "image",
            label: "Denoise 0.35",
            alt: "Denoise 0.35 自然写实平衡结果占位图",
            caption: "自然写实的较好平衡",
            available: false,
            suggestedPath:
              "public/images/projects/denoise-study/denoise-035.png",
          },
          {
            id: "denoise-050",
            kind: "image",
            label: "Denoise 0.50",
            alt: "Denoise 0.50 明显重构结果占位图",
            caption: "明显重构",
            available: false,
            suggestedPath:
              "public/images/projects/denoise-study/denoise-050.png",
          },
          {
            id: "denoise-065",
            kind: "image",
            label: "Denoise 0.65 结果",
            alt: "Denoise 0.65 接近重新生成的结果占位图",
            caption: "更接近基于原图重新生成",
            available: false,
            suggestedPath:
              "public/images/projects/denoise-study/denoise-065.png",
          },
        ],
      },
    ],
    problems: [],
    resolutionProcess: [
      "固定模型、Prompt、Seed、Steps、CFG、Sampler 与 Scheduler。",
      "仅改变 Denoise 数值，避免其他变量干扰对比。",
      "按 0.20、0.35、0.50、0.65 四档记录图像重构程度。",
    ],
    results: [
      "Denoise 0.20 对应轻量精修。",
      "Denoise 0.35 在自然写实方向取得较好平衡。",
      "Denoise 0.50 出现明显重构。",
      "Denoise 0.65 更接近基于原图重新生成。",
    ],
    cover: {
      id: "denoise-study-cover",
      kind: "image",
      label: "Denoise 对比结果",
      alt: "图生图 Denoise 控制变量实验占位图",
      available: false,
      suggestedPath:
        "public/images/projects/denoise-study/denoise-035.png",
    },
    downloads: [
      {
        id: "denoise-study-workflow",
        kind: "workflow",
        label: "下载工作流 JSON",
        format: "JSON",
        description: "Denoise 控制变量工作流 JSON 尚未提供。",
        available: false,
        suggestedPath:
          "public/downloads/workflows/img2img-denoise-study.json",
      },
      {
        id: "denoise-study-report",
        kind: "report",
        label: "下载实验记录 PDF",
        format: "PDF",
        description: "Denoise 控制变量实验记录 PDF 尚未提供。",
        available: false,
        suggestedPath:
          "public/downloads/reports/img2img-denoise-study-record.pdf",
      },
    ],
    github: {
      label: "GitHub 相关链接",
      available: false,
      description: "尚未提供该项目的 GitHub 链接。",
    },
    seo: {
      title: "图生图Denoise控制变量实验",
      description:
        "固定模型与采样条件，仅改变 Denoise，对比 0.20、0.35、0.50 和 0.65 的图生图重构程度。",
    },
  },
  {
    slug: "sd15-lora-integration",
    title: "SD1.5 LoRA接入与故障排查实验",
    status: "Completed",
    categories: ["LoRA"],
    featured: true,
    summary:
      "从 Load LoRA 节点显示 undefined 开始排查模型目录，补充 blindbox_V1Mix.safetensors 后完成识别和 0.0 / 0.7 强度对比。",
    background:
      "该实验记录 SD1.5 LoRA 接入时的节点异常、模型目录检查、文件下载与识别，以及 LoRA 风格是否匹配写实目标的判断。",
    objectives: [
      "定位 Load LoRA 节点显示 undefined 的原因。",
      "使 ComfyUI 正确识别 blindbox_V1Mix.safetensors。",
      "对比 LoRA 强度 0.0 与 0.7 的生成结果。",
      "判断该风格 LoRA 是否适合当前写实目标。",
    ],
    technologies: [
      "SD1.5",
      "LoRA",
      "ComfyUI模型目录",
      "PowerShell",
      "断点续传",
    ],
    environment: [
      { label: "基础模型体系", value: "SD1.5" },
      { label: "工作流", value: "ComfyUI" },
      { label: "模型目录", value: "models/loras" },
      { label: "LoRA 文件", value: "blindbox_V1Mix.safetensors" },
    ],
    workflow: [
      {
        title: "发现节点异常",
        description: "Load LoRA 节点最初显示 undefined。",
      },
      {
        title: "检查模型目录",
        description:
          "检查 models/loras，确认目录中只有 put_loras_here 占位文件。",
      },
      {
        title: "补充 LoRA 文件",
        description:
          "使用支持断点续传的下载方式取得 blindbox_V1Mix.safetensors，并放入 LoRA 模型目录。",
      },
      {
        title: "确认识别",
        description: "文件放入目录后，ComfyUI 成功识别该 LoRA。",
      },
      {
        title: "执行强度对比",
        description: "对比 LoRA 强度 0.0 与 0.7 的生成结果。",
      },
    ],
    parameters: [
      { label: "LoRA", value: "blindbox_V1Mix.safetensors" },
      { label: "对照强度", value: "0.0" },
      { label: "实验强度", value: "0.7" },
      {
        label: "Prompt / Seed / 采样参数",
        value: "未提供",
        note: "当前数据不推测未提供的实验参数。",
      },
    ],
    comparisons: [
      {
        id: "lora-strength-comparison",
        title: "LoRA 强度前后对比",
        description: "真实对比图片尚未放入 public 目录。",
        layout: "before-after",
        images: [
          {
            id: "lora-strength-000",
            kind: "image",
            label: "LoRA 强度 0.0",
            alt: "LoRA 强度 0.0 对照结果占位图",
            caption: "未应用 LoRA 效果的对照组。",
            available: false,
            suggestedPath:
              "public/images/projects/lora-integration/lora-strength-000.png",
          },
          {
            id: "lora-strength-070",
            kind: "image",
            label: "LoRA 强度 0.7",
            alt: "LoRA 强度 0.7 实验结果占位图",
            caption: "blindbox_V1Mix.safetensors 强度 0.7。",
            available: false,
            suggestedPath:
              "public/images/projects/lora-integration/lora-strength-070.png",
          },
        ],
      },
    ],
    problems: [
      {
        title: "Load LoRA 节点显示 undefined",
        observations: [
          "Load LoRA 节点最初显示 undefined。",
          "models/loras 目录中只有 put_loras_here 占位文件。",
        ],
        resolution: [
          "下载 blindbox_V1Mix.safetensors。",
          "将文件放入 ComfyUI 的 models/loras 目录。",
        ],
        outcome: "ComfyUI 成功识别该 LoRA 文件。",
      },
      {
        title: "LoRA 风格与写实目标不匹配",
        observations: ["对比 LoRA 强度 0.0 与 0.7 的生成结果。"],
        resolution: ["根据对比结果评估风格与目标的匹配程度。"],
        outcome: "得出该风格 LoRA 与当前写实目标不匹配的结论。",
      },
    ],
    resolutionProcess: [
      "从 Load LoRA 节点的 undefined 状态开始检查资源是否存在。",
      "确认 models/loras 目录只有占位文件。",
      "通过断点续传方式下载 blindbox_V1Mix.safetensors。",
      "将模型文件放入正确目录并确认 ComfyUI 成功识别。",
      "使用 0.0 与 0.7 两档强度进行对比，判断风格适配性。",
    ],
    results: [
      "blindbox_V1Mix.safetensors 已被 ComfyUI 成功识别。",
      "已完成 LoRA 强度 0.0 与 0.7 的结果对比。",
      "该风格 LoRA 与写实目标不匹配。",
    ],
    cover: {
      id: "lora-integration-cover",
      kind: "image",
      label: "LoRA 强度对比",
      alt: "SD1.5 LoRA 接入与故障排查实验占位图",
      available: false,
      suggestedPath:
        "public/images/projects/lora-integration/lora-strength-070.png",
    },
    downloads: [
      {
        id: "lora-integration-workflow",
        kind: "workflow",
        label: "下载工作流 JSON",
        format: "JSON",
        description: "SD1.5 LoRA 接入工作流 JSON 尚未提供。",
        available: false,
        suggestedPath:
          "public/downloads/workflows/sd15-lora-integration.json",
      },
      {
        id: "lora-integration-report",
        kind: "report",
        label: "下载实验记录 PDF",
        format: "PDF",
        description: "SD1.5 LoRA 接入实验记录 PDF 尚未提供。",
        available: false,
        suggestedPath:
          "public/downloads/reports/sd15-lora-integration-record.pdf",
      },
    ],
    github: {
      label: "GitHub 相关链接",
      available: false,
      description: "尚未提供该项目的 GitHub 链接。",
    },
    seo: {
      title: "SD1.5 LoRA接入与故障排查实验",
      description:
        "记录 ComfyUI Load LoRA undefined 问题、models/loras 目录排查、模型识别与 0.0 / 0.7 强度对比。",
    },
  },
  {
    slug: "controlnet-ipadapter-character",
    title: "ControlNet与IPAdapter可控角色生成",
    status: "In Development",
    categories: ["Controlled Generation"],
    featured: false,
    summary:
      "正在开发的可控角色生成项目；目前尚未提供实验环境、过程、图片或结果。",
    background:
      "该项目已明确列入后续开发计划。当前仅确认方向为 ControlNet 与 IPAdapter 可控角色生成。",
    objectives: [],
    technologies: ["ControlNet", "IPAdapter"],
    environment: [],
    workflow: [],
    parameters: [],
    comparisons: [],
    problems: [],
    resolutionProcess: [],
    results: [],
    cover: {
      id: "controlnet-ipadapter-cover",
      kind: "image",
      label: "正在开发",
      alt: "ControlNet 与 IPAdapter 可控角色生成项目占位图",
      available: false,
      suggestedPath:
        "public/images/projects/controlnet-ipadapter/cover.png",
    },
    downloads: [
      {
        id: "controlnet-ipadapter-workflow",
        kind: "workflow",
        label: "下载工作流 JSON",
        format: "JSON",
        description: "项目正在开发，尚未提供工作流 JSON。",
        available: false,
        suggestedPath:
          "public/downloads/workflows/controlnet-ipadapter-character.json",
      },
      {
        id: "controlnet-ipadapter-report",
        kind: "report",
        label: "下载实验记录 PDF",
        format: "PDF",
        description: "项目正在开发，尚未提供实验记录 PDF。",
        available: false,
        suggestedPath:
          "public/downloads/reports/controlnet-ipadapter-character-record.pdf",
      },
    ],
    github: {
      label: "GitHub 相关链接",
      available: false,
      description: "项目正在开发，尚未提供 GitHub 链接。",
    },
    seo: {
      title: "ControlNet与IPAdapter可控角色生成｜正在开发",
      description:
        "ControlNet 与 IPAdapter 可控角色生成项目占位页；当前正在开发，尚未发布实验结果。",
    },
  },
  {
    slug: "wan22-local-image-to-video",
    title: "Wan2.2本地图生视频工作流",
    status: "In Development",
    categories: ["Video"],
    featured: false,
    summary:
      "正在开发的 Wan2.2 本地图生视频项目；目前尚未提供实验环境、过程、视频或结果。",
    background:
      "该项目已明确列入后续开发计划。当前仅确认方向为 Wan2.2 本地图生视频工作流。",
    objectives: [],
    technologies: ["Wan2.2", "Image-to-Video"],
    environment: [],
    workflow: [],
    parameters: [],
    comparisons: [],
    problems: [],
    resolutionProcess: [],
    results: [],
    cover: {
      id: "wan22-video-cover",
      kind: "image",
      label: "正在开发",
      alt: "Wan2.2 本地图生视频工作流项目占位图",
      available: false,
      suggestedPath:
        "public/images/projects/wan22-image-to-video/cover.png",
    },
    downloads: [
      {
        id: "wan22-video-workflow",
        kind: "workflow",
        label: "下载工作流 JSON",
        format: "JSON",
        description: "项目正在开发，尚未提供工作流 JSON。",
        available: false,
        suggestedPath:
          "public/downloads/workflows/wan22-local-image-to-video.json",
      },
      {
        id: "wan22-video-report",
        kind: "report",
        label: "下载实验记录 PDF",
        format: "PDF",
        description: "项目正在开发，尚未提供实验记录 PDF。",
        available: false,
        suggestedPath:
          "public/downloads/reports/wan22-local-image-to-video-record.pdf",
      },
    ],
    github: {
      label: "GitHub 相关链接",
      available: false,
      description: "项目正在开发，尚未提供 GitHub 链接。",
    },
    seo: {
      title: "Wan2.2本地图生视频工作流｜正在开发",
      description:
        "Wan2.2 本地图生视频工作流占位页；当前正在开发，尚未发布实验结果。",
    },
  },
];

export const projectCategories = PROJECT_CATEGORIES;

export const featuredProjects = projects.filter((project) => project.featured);

export const completedProjects = projects.filter(
  (project) => project.status === "Completed",
);

export const inDevelopmentProjects = projects.filter(
  (project) => project.status === "In Development",
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(
  category: "All" | ProjectCategory,
): readonly Project[] {
  if (category === "All") {
    return projects;
  }

  return projects.filter((project) => project.categories.includes(category));
}

export function getAllProjectSlugs(): readonly string[] {
  return projects.map((project) => project.slug);
}
