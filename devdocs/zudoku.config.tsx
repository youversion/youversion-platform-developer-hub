import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  site: {
    logo: {
      src: { light: "/youversion-logo.png", dark: "/youversion-logo.png" },
      alt: "YouVersion Bible API",
      width: "40px",
    },
    title: "YouVersion Bible API Documentation",
  },
  theme: {
    light: {
      background: "oklch(100% 0 none)",
      foreground: "oklch(13.7% 0.036 259)",
      card: "oklch(100% 0 none)",
      cardForeground: "oklch(13.7% 0.036 259)",
      popover: "oklch(100% 0 none)",
      popoverForeground: "oklch(13.7% 0.036 259)",
      primary: "oklch(20.8% 0.04 266)",
      primaryForeground: "oklch(98.4% 0.003 248)",
      secondary: "oklch(96.8% 0.007 248)",
      secondaryForeground: "oklch(20.8% 0.04 266)",
      muted: "oklch(96.8% 0.007 248)",
      mutedForeground: "oklch(55.5% 0.041 257)",
      accent: "oklch(96.8% 0.007 248)",
      accentForeground: "oklch(20.8% 0.04 266)",
      destructive: "oklch(63.7% 0.208 25.3)",
      destructiveForeground: "oklch(98.4% 0.003 248)",
      border: "oklch(92.9% 0.013 256)",
      input: "oklch(92.9% 0.013 256)",
      ring: "oklch(13.7% 0.036 259)"
    },
    dark: {
      background: "oklch(13.7% 0.036 259)",
      foreground: "oklch(98.4% 0.003 248)",
      card: "oklch(13.7% 0.036 259)",
      cardForeground: "oklch(98.4% 0.003 248)",
      popover: "oklch(13.7% 0.036 259)",
      popoverForeground: "oklch(98.4% 0.003 248)",
      primary: "oklch(98.4% 0.003 248)",
      primaryForeground: "oklch(20.8% 0.04 266)",
      secondary: "oklch(28% 0.037 260)",
      secondaryForeground: "oklch(98.4% 0.003 248)",
      muted: "oklch(28% 0.037 260)",
      mutedForeground: "oklch(71.1% 0.035 257)",
      accent: "oklch(28% 0.037 260)",
      accentForeground: "oklch(98.4% 0.003 248)",
      destructive: "oklch(39.6% 0.133 25.7)",
      destructiveForeground: "oklch(98.4% 0.003 248)",
      border: "oklch(28% 0.037 260)",
      input: "oklch(28% 0.037 260)",
      ring: "212.7 26.8% 83.9"
    }
  },
  navigation: [
    {
      type: "category",
      label: "Documentation",
      items: [
        {
          type: "category",
          label: "Getting Started",
          icon: "sparkles",
          items: [
            "/introduction",
            "/getting-started",
            "/authentication",
          ],
        },
        {
          type: "category",
          label: "API Reference",
          icon: "folder-cog",
          items: [
            {
              type: "link",
              icon: "book",
              label: "API Reference",
              to: "/api",
            },
          ],
        },
        {
          type: "category",
          label: "Guides",
          icon: "book-open",
          items: [
            "/quick-reference",
            "/examples",
            "/error-codes",
          ],
        },
        {
          type: "category",
          label: "Useful Links",
          collapsible: false,
          icon: "link",
          items: [
            {
              type: "link",
              icon: "globe",
              label: "YouVersion",
              to: "https://youversion.com/",
            },
            {
              type: "link",
              icon: "github",
              label: "GitHub",
              to: "https://github.com/youversion",
            },
          ],
        },
      ],
    },
    {
      type: "link",
      to: "/api",
      label: "API Reference",
    },
  ],
  redirects: [
    { from: "/", to: "/introduction" },
    { from: "/api/~endpoints", to: "/api" },
  ],
  apis: [
    {
      type: "file",
      input: "./apis/openapi.yaml",
      path: "/api",
    },
  ],
};


export default config;
