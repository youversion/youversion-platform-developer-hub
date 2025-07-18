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
