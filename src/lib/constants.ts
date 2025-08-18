// YouVersion Platform Configuration
export const YVP_CONFIG = {
  APP_ID: "dkV1PqA2YwNdtzGGYlZWAxAk72mJDUWmVd6QeIRqr9WlLjX2",
  API_BASE_URL: "https://api-dev.youversion.com",
} as const;

// Legacy export for backward compatibility
export const APP_ID = YVP_CONFIG.APP_ID; 

// Centralized SDK script URL. Change this to point to a local SDK while developing.
// For example: "/sdk.js" (local) or "https://api-dev.youversion.com/sdk.js" (remote)
export const YVP_SDK_URL = "https://api-dev.youversion.com/sdk.js";