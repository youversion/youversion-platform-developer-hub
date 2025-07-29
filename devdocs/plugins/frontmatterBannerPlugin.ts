import type { ZudokuPlugin } from "zudoku";
import { PageBanner } from "../components/PageBanner";

export const frontmatterBannerPlugin: ZudokuPlugin = {
  getMdxComponents: () => ({
    // This will make PageBanner available in MDX files
    PageBanner: PageBanner as any,
  }),
  
  // Optional: Add any initialization logic if needed
  initialize: async (context) => {
    // Plugin initialization logic can go here
  },
}; 