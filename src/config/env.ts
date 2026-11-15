/**
 * QuickQR Studio - Centralized Environment Configuration
 */

const metaEnv = import.meta.env;

export const ENV = {
  mode: metaEnv.MODE || 'development',
  isDev: metaEnv.DEV,
  isProd: metaEnv.PROD,
  appEnv: metaEnv.VITE_APP_ENV || metaEnv.MODE || 'development',
  appTitle: metaEnv.VITE_APP_TITLE || 'QuickQR Studio',
  appUrl: metaEnv.VITE_APP_URL || 'https://quickqr.io',
  apiBaseUrl: metaEnv.VITE_API_BASE_URL || '/api',
  enableAnalytics: metaEnv.VITE_ENABLE_ANALYTICS === 'true',
  enableDebugLogs: metaEnv.VITE_ENABLE_DEBUG_LOGS === 'true' || metaEnv.DEV,
  storagePrefix: metaEnv.VITE_STORAGE_PREFIX || 'quickqr_',
  defaultQrUrl: metaEnv.VITE_DEFAULT_QR_URL || 'https://quickqr.io',
} as const;

export const logger = {
  debug: (...args: unknown[]) => {
    if (ENV.enableDebugLogs) {
      // eslint-disable-next-line no-console
      console.log('[DEBUG]', ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (ENV.enableDebugLogs) {
      // eslint-disable-next-line no-console
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.error('[ERROR]', ...args);
  },
};
