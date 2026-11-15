/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: 'development' | 'production' | 'test';
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG_LOGS: string;
  readonly VITE_STORAGE_PREFIX: string;
  readonly VITE_DEFAULT_QR_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
