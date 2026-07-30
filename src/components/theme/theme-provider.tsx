"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  THEME_STORAGE_KEY,
  type ThemePreference,
} from "@/lib/theme";

declare global {
  interface Window {
    __applyPortfolioTheme?: (preference: ThemePreference) => ThemePreference;
    __portfolioThemePreference?: ThemePreference;
  }
}

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getResolvedTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "light" || preference === "dark") {
    return preference;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function syncDocumentTheme(preference: ThemePreference) {
  const resolved = getResolvedTheme(preference);
  const root = document.documentElement;
  root.dataset.themePreference = preference;
  root.dataset.theme = resolved;

  const existingMeta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][data-runtime-theme]',
  );

  if (preference === "system") {
    existingMeta?.remove();
    return;
  }

  const meta = existingMeta ?? document.createElement("meta");
  meta.name = "theme-color";
  meta.dataset.runtimeTheme = "true";
  meta.content = resolved === "dark" ? "#070a0e" : "#f3f1ec";

  if (!existingMeta) {
    document.head.append(meta);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, updatePreference] =
    useState<ThemePreference>("system");

  const setPreference = useCallback((next: ThemePreference) => {
    window.__applyPortfolioTheme?.(next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // The visual theme still works when storage is unavailable.
    }

    updatePreference(next);
    syncDocumentTheme(next);
  }, []);

  useEffect(() => {
    const initial = window.__portfolioThemePreference ?? "system";
    window.__applyPortfolioTheme?.(initial);
    syncDocumentTheme(initial);

    const stateFrame = requestAnimationFrame(() => updatePreference(initial));
    const readyFrame = requestAnimationFrame(() => {
      document.documentElement.classList.add("theme-ready");
    });

    return () => {
      cancelAnimationFrame(stateFrame);
      cancelAnimationFrame(readyFrame);
    };
  }, []);

  useEffect(() => {
    if (preference !== "system") {
      syncDocumentTheme(preference);
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => syncDocumentTheme("system");
    syncDocumentTheme("system");
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [preference]);

  const contextValue = useMemo(
    () => ({ preference, setPreference }),
    [preference, setPreference],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }

  return context;
}
