import type { ZudokuConfig } from "zudoku";
import { ZudokuNavigation } from "./components/ZudokuNavigation";
import DevdocsSearchBar from "./components/DevdocsSearchBar";
import { getDevdocsNavItems } from "../shared/config/navigation";
import { getPlatformUrl } from "../shared/config/urls";
import { PageBanner } from "./components/PageBanner";
import CustomFooter from "./components/CustomFooter";
import { LogoUrlUpdater } from "./components/LogoUrlUpdater";

const config: ZudokuConfig = {
  site: {
    title: "YouVersion Platform",
    logo: {
      src: { light: "/youversion-logo.png", dark: "/youversion-logo.png" },
      alt: "YouVersion Bible API",
      width: "32px",
      href: getPlatformUrl(),
    } as any,
    // banner: {
    //   message: "Welcome to our documentation!",
    //   color: "info",
    //   dismissible: true
    // },
     footer: {
    //   // Footer configuration goes here
    //   //position: "center",
    //   copyright: ` `,
    //   // Other options...
    },

  },
  // Add MDX components configuration
  mdx: {
    components: {
      PageBanner: PageBanner as any,
    },
  },
  // Add slots configuration to integrate your navigation
  slots: {
    // "layout-before-head": () => (
    //   <div className="flex items-center border border-gray-200 pb-2">
    //     <img 
    //       src="/youversion-logo.png" 
    //       alt="YouVersion Bible API" 
    //       className="h-8 w-auto"
    //     />
    //     <span className="ml-2 font-semibold text-lg">YouVersion Platform</span>
    //   </div>
    // ),
            "head-navigation-start": () => (
      <ZudokuNavigation
        isAuthenticated={false}
        navItems={getDevdocsNavItems()}
      />
    ),
    "footer-after": () => <CustomFooter />,
    "head-navigation-end": () => <LogoUrlUpdater />,
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
    },
    // Add custom CSS to override header styling
    customCss: `
      /* Import Inter font */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
      
      /* Set Inter as the base font family globally */
      * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
      }
      
      /* Ensure body and html also use Inter */
      body, html {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
      }
      
      /* Apply Inter font to all text elements */
      h1, h2, h3, h4, h5, h6, p, span, div, a, button, input, textarea, select, label {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
      }
      
      /* Ensure navigation and sidebar use Inter */
      nav, aside, .sidebar, .navigation {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
      }
      
      /* Ensure font-medium works properly */
      .font-medium {
        font-weight: 500 !important;
      }
      /* Override Zudoku header container to match main site styling */
      header .max-w-screen-2xl {
        max-width: 1400px !important;
        width: 1400px !important;
        font-weight: 500 !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
        }
      /* Override Zudoku header fonts to match main site styling */
      header .max-w-screen-2xl .flex a .font-semibold.text-2xl {
        font-weight: 700 !important;
        font-size: 18px !important;
        letter-spacing: -0.05em !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
        }
      header .max-w-screen-2xl .flex a div {
        column-gap: 8px !important;
        }
      /* Footer */
      footer {
        background-color: rgba(246, 246, 246, 0.3);
        border-top: 1px solid rgb(226, 232, 240);
      }
      footer div:first-child { padding-top:10px; }
      /* Hide Zudoku footer link */
      nav + div {
        display: none !important;
      } */
      /* Hide Zudoku logo */
      header img[src*="zudoku"],
      header img[alt*="Zudoku"],
      header .zudoku-logo,
      header [data-zudoku-logo],
      header a[href*="zudoku"] img,
      header .logo img[src*="zudoku"],
      header .brand img[src*="zudoku"] {
        display: none !important;
      }
    `
  },

  navigation: [
    {
      type: "category",
      label: "Documentation",
      icon: "book-open",
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
              icon: "code",
              label: "API Reference",
              to: "/api",
            },
          ],
        },
        {
          type: "category",
          label: "Guides",
          icon: "book",
          items: [
            "/quick-reference",
            "/usfm-reference",
            "/examples",
            "/error-codes",
            "/search",
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
      type: "category",
      label: "SDKs",
      icon: "file-box",
      items: [
        {
          type: "doc",
          icon: "smartphone",
          label: "Apple OS",
          file: "sdks/apple-os",
        },
        {
          type: "doc",
          icon: "code",
          label: "React",
          file: "sdks/react",
        },
        {
          type: "doc",
          icon: "file-code",
          label: "Javascript",
          file: "sdks/javascript",
        },
      ],
    },
    {
      type: "link",
      to: "/api",
      label: "API Reference",
      icon: "code",
    },
    {
      type: "link",
      to: "/for-llms",
      label: "For LLMs",
      icon: "bot",
      description: "Complete documentation index for LLM consumption",
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
  // search: {
  //   type: "pagefind",
  //   // Optional: Maximum number of sub results per page
  //   maxSubResults: 3,
  //   // Optional: Configure search result ranking (defaults shown below)
  //   ranking: {
  //     termFrequency: 0.8,
  //     pageLength: 0.6,
  //     termSimilarity: 1.2,
  //     termSaturation: 1.2,
  //   },
  // },
};


export default config;
