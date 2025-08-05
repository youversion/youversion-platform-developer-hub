import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { YVP_CONFIG } from './constants';

// App ID constants
const EXAMPLES_APP_ID = 'r4JBXiG5GAIbxQOBdhAw8k2yikjeE17l4nZ14FLEPIZLmGtN';
const ADMIN_APP_ID = 'dkV1PqA2YwNdtzGGYlZWAxAk72mJDUWmVd6QeIRqr9WlLjX2';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Centralized API utility for YouVersion API calls
 * Automatically adds required headers and handles authentication
 */
export async function yvpFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  // Get LAT token from localStorage
  const lat = localStorage.getItem('yvp_lat');
  
  // Determine which app ID to use based on endpoint
  const isAdminEndpoint = endpoint.startsWith('/admin/');
  const appId = isAdminEndpoint ? ADMIN_APP_ID : EXAMPLES_APP_ID;
  
  // Prepare headers
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'x-app-id': appId,
    'x-yv-iid': 'install_id_example',
    ...options.headers,
  };

  // Add LAT token if available
  if (lat) {
    headers['lat'] = lat;
  }

  // Remove any Authorization headers as requested
  delete (headers as any)['Authorization'];

  // Construct full URL
  const url = endpoint.startsWith('http') ? endpoint : `${YVP_CONFIG.API_BASE_URL}${endpoint}`;

  // Make the request
  return fetch(url, {
    ...options,
    headers,
  });
}
