export const THEME_STORAGE_KEY = "ascendzhou-theme";

export type ThemePreference = "light" | "dark" | "system";

const darkTokens = `
  color-scheme: dark;
  --background: #070a0e;
  --surface: #0d1218;
  --surface-strong: #121922;
  --surface-inset: #090d12;
  --surface-elevated: #141b24;
  --surface-subtle: #10161d;
  --surface-hover: #111922;
  --line: #222d39;
  --line-soft: #1b242e;
  --line-strong: #344150;
  --text: #f0f5f8;
  --text-strong: #f6f8fa;
  --text-soft: #cbd4dc;
  --text-muted: #94a2b2;
  --text-faint: #687787;
  --accent: #75dcf5;
  --accent-strong: #9be9fa;
  --accent-soft: #102a31;
  --accent-contrast: #071015;
  --violet: #a99cf8;
  --success: #7de2b8;
  --warning: #f7d187;
  --overlay: #000000;
  --primary: #75dcf5;
  --primary-hover: #a6eefb;
  --primary-text: #071015;
  --focus: #75dcf5;
  --selection-bg: rgb(117 220 245 / 0.22);
  --selection-text: #ffffff;
  --panel-start: rgb(18 25 34 / 0.90);
  --panel-end: rgb(10 15 21 / 0.86);
  --panel-hover-start: rgb(19 27 36 / 0.94);
  --panel-hover-end: rgb(11 17 23 / 0.90);
  --shadow-panel: 0 28px 70px rgb(0 0 0 / 0.20);
  --shadow-header: 0 10px 40px rgb(0 0 0 / 0.16);
  --grid-color: rgb(117 220 245 / 0.045);
  --ambient-cyan: rgb(34 211 238 / 0.035);
  --ambient-violet: rgb(139 92 246 / 0.04);
  --page-glow: rgb(117 220 245 / 0.025);
  --page-wash: rgb(255 255 255 / 0.008);
  --hero-glow: rgb(117 220 245 / 0.05);
  --hero-wash: rgb(255 255 255 / 0.012);
  --header-top: rgb(7 10 14 / 0.45);
  --header-scrolled: rgb(7 10 14 / 0.78);
  --menu-surface: rgb(7 10 14 / 0.96);
  --placeholder: #0b1016;
  --code-surface: #081016;
  --dialog-backdrop: rgb(0 0 0 / 0.92);
  --dialog-surface: #06080b;
  --dialog-text: #f6f8fa;
  --dialog-muted: #94a2b2;
  --divider: rgb(148 163 184 / 0.22);
`;

const lightTokens = `
  color-scheme: light;
  --background: #f3f1ec;
  --surface: #faf9f6;
  --surface-strong: #f5f4f0;
  --surface-inset: #e8edef;
  --surface-elevated: #fcfbf8;
  --surface-subtle: #eeece7;
  --surface-hover: #e8eef0;
  --line: #d2d5d4;
  --line-soft: #dde0df;
  --line-strong: #b8c0c2;
  --text: #182026;
  --text-strong: #11181e;
  --text-soft: #37444d;
  --text-muted: #5f6b74;
  --text-faint: #7b858d;
  --accent: #146f80;
  --accent-strong: #0d5f70;
  --accent-soft: #d7e9ec;
  --accent-contrast: #f7fbfb;
  --violet: #655b9b;
  --success: #1d7258;
  --warning: #8b641e;
  --overlay: #101820;
  --primary: #176f7f;
  --primary-hover: #0f6070;
  --primary-text: #f8fcfc;
  --focus: #0f6c7c;
  --selection-bg: rgb(20 111 128 / 0.18);
  --selection-text: #10171c;
  --panel-start: rgb(250 251 249 / 0.96);
  --panel-end: rgb(235 240 241 / 0.92);
  --panel-hover-start: rgb(251 252 250 / 0.98);
  --panel-hover-end: rgb(229 237 239 / 0.95);
  --shadow-panel: 0 24px 62px rgb(36 43 48 / 0.09);
  --shadow-header: 0 10px 34px rgb(40 47 52 / 0.08);
  --grid-color: rgb(20 111 128 / 0.075);
  --ambient-cyan: rgb(20 111 128 / 0.06);
  --ambient-violet: rgb(101 91 155 / 0.045);
  --page-glow: rgb(20 111 128 / 0.035);
  --page-wash: rgb(255 255 255 / 0.25);
  --hero-glow: rgb(20 111 128 / 0.055);
  --hero-wash: rgb(255 255 255 / 0.32);
  --header-top: rgb(243 241 236 / 0.68);
  --header-scrolled: rgb(243 241 236 / 0.86);
  --menu-surface: rgb(243 241 236 / 0.97);
  --placeholder: #edf0ef;
  --code-surface: #e5ebec;
  --dialog-backdrop: rgb(18 23 27 / 0.88);
  --dialog-surface: #0d1318;
  --dialog-text: #f6f8fa;
  --dialog-muted: #aab5bd;
  --divider: rgb(82 94 102 / 0.20);
`;

export const THEME_TOKEN_CSS = `
:root {
${darkTokens}
}

@media (prefers-color-scheme: light) {
  :root {
${lightTokens}
  }
}

:root:not(*) {
  --theme-override: light;
${lightTokens}
}

:root:not(*) {
  --theme-override: dark;
${darkTokens}
}
`;

export const THEME_BOOT_SCRIPT = `
(function () {
  var allowed = { light: true, dark: true, system: true };
  var style = document.getElementById("portfolio-theme-tokens");
  var lightRule;
  var darkRule;

  if (style && style.sheet) {
    var rules = style.sheet.cssRules;
    for (var index = 0; index < rules.length; index += 1) {
      var rule = rules[index];
      if (!rule.style) continue;
      var marker = rule.style.getPropertyValue("--theme-override").trim();
      if (marker === "light") lightRule = rule;
      if (marker === "dark") darkRule = rule;
    }
  }

  function applyTheme(preference) {
    var next = allowed[preference] ? preference : "system";
    if (lightRule) {
      lightRule.selectorText = next === "light" ? ":root" : ":root:not(*)";
    }
    if (darkRule) {
      darkRule.selectorText = next === "dark" ? ":root" : ":root:not(*)";
    }
    window.__portfolioThemePreference = next;
    return next;
  }

  var preference = "system";
  try {
    var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (saved && allowed[saved]) preference = saved;
  } catch (error) {}

  window.__applyPortfolioTheme = applyTheme;
  applyTheme(preference);
})();
`;
