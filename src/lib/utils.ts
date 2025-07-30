import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { YVP_CONFIG } from './constants';

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
  
  // Prepare headers
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'x-app-id': 'r4JBXiG5GAIbxQOBdhAw8k2yikjeE17l4nZ14FLEPIZLmGtN',
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
