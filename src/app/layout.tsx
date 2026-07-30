import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { BackToTop } from "@/components/layout/back-to-top";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { personStructuredData, siteConfig } from "@/data/site";
import { THEME_BOOT_SCRIPT, THEME_TOKEN_CSS } from "@/lib/theme";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.metadata.title,
    template: `%s｜${siteConfig.identity.chineseName}`,
  },
  description: siteConfig.metadata.description,
  applicationName: `${siteConfig.identity.chineseName}个人作品集`,
  authors: [{ name: siteConfig.identity.chineseName }],
  creator: siteConfig.identity.chineseName,
  keywords: [
    siteConfig.identity.chineseName,
    "ComfyUI",
    "AIGC",
    "SDXL",
    "LoRA",
    "ControlNet",
    "视觉工作流",
    "AI图像生成",
    "AI视频生成",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    siteName: `${siteConfig.identity.chineseName}个人作品集`,
  },
  twitter: {
    card: "summary",
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
  },
  other: {
    "darkreader-lock": "true",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { color: "#f3f1ec", media: "(prefers-color-scheme: light)" },
    { color: "#070a0e", media: "(prefers-color-scheme: dark)" },
  ],
};

const personJsonLd = JSON.stringify(personStructuredData).replace(
  /</g,
  "\\u003c",
);

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="zh-CN">
      <head>
        <style
          dangerouslySetInnerHTML={{ __html: THEME_TOKEN_CSS }}
          id="portfolio-theme-tokens"
        />
        <script
          dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }}
          id="portfolio-theme-boot"
        />
        <script
          dangerouslySetInnerHTML={{ __html: personJsonLd }}
          id="person-structured-data"
          type="application/ld+json"
        />
      </head>
      <body>
        <ThemeProvider>
          <a
            className="fixed top-3 left-3 z-[200] -translate-y-20 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-text)] transition focus:translate-y-0"
            href="#main-content"
          >
            跳到主要内容
          </a>
          <div className="page-shell flex min-h-screen flex-col">
            <Header />
            <main className="flex-1" id="main-content">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
