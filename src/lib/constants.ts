// YouVersion Platform Configuration
export const YVP_CONFIG = {
  APP_ID: "1IuLqckR2TeTBSfwbBRD5Q65G2cMg0UrOIaYZQpqxcMdoeVX",
  API_BASE_URL: "https://api-dev.youversion.com",
} as const;

// Legacy export for backward compatibility
export const APP_ID = YVP_CONFIG.APP_ID; 