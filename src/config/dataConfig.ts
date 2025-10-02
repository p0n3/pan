import type { DataServiceConfig } from '../utils/dataService';

// This will be replaced at build time based on the build mode
declare const BUILD_MODE: 'demo' | 'production';
declare const API_URL: string | undefined;

export const dataConfig: DataServiceConfig = {
  mode: typeof BUILD_MODE !== 'undefined' ? BUILD_MODE : 'demo',
  apiUrl: typeof API_URL !== 'undefined' ? API_URL : undefined,
  // Add any additional API headers here if needed
  apiHeaders: {
    // Example: 'Authorization': 'Bearer token'
  }
};

// For development, we can override the config
if (import.meta.env.DEV) {
  // In development, default to demo mode unless specified otherwise
  const devMode = import.meta.env.VITE_DATA_MODE as 'demo' | 'production' || 'demo';
  const devApiUrl = import.meta.env.VITE_API_URL;
  
  dataConfig.mode = devMode;
  if (devApiUrl) {
    dataConfig.apiUrl = devApiUrl;
  }
}

