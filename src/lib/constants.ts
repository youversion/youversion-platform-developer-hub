// YouVersion Platform Configuration
export const YVP_CONFIG = {
  APP_ID: "dkV1PqA2YwNdtzGGYlZWAxAk72mJDUWmVd6QeIRqr9WlLjX2",
  API_BASE_URL: "https://api-dev.youversion.com",
} as const;

// Legacy export for backward compatibility
export const APP_ID = YVP_CONFIG.APP_ID; 