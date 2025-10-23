// Configuration file for the teleprompter app

// Backend API Configuration
// Update these values based on your deployment environment
export const API_CONFIG = {
  // Development - When running on local machine or emulator
  development: {
    baseURL: 'http://localhost:5000',
  },
  
  // For testing on real device, use your computer's IP address
  // Find your IP: 
  //   - macOS/Linux: ifconfig | grep "inet "
  //   - Windows: ipconfig
  device: {
    baseURL: 'http://192.168.1.100:5000', // Replace with your computer's IP
  },
  
  // Production - Update with your production backend URL
  production: {
    baseURL: 'https://your-production-backend.com',
  },
};

// Current environment
// Change this to 'device' when testing on real device
// Change to 'production' when deploying
export const CURRENT_ENV = __DEV__ ? 'development' : 'production';

// Get the current API base URL
export const getApiBaseURL = () => {
  return API_CONFIG[CURRENT_ENV].baseURL;
};

// App Settings
export const APP_CONFIG = {
  // Default teleprompter settings
  defaults: {
    speed: 10,
    fontSize: 32,
    width: 80,
    textColor: '#ffffff',
    bgColor: '#000000',
  },
  
  // Settings limits
  limits: {
    speed: { min: 1, max: 50 },
    fontSize: { min: 12, max: 60 },
    width: { min: 40, max: 95 },
  },
  
  // Storage keys
  storage: {
    content: 'inscriptionContent',
    config: 'inscriptionConfig',
    linePosition: 'horizontalLineTop',
  },
};

export default {
  API_CONFIG,
  APP_CONFIG,
  CURRENT_ENV,
  getApiBaseURL,
};
