/// <reference types="vite/client" />

// https://cn.vitejs.dev/guide/env-and-mode.html#env-files

interface ImportMetaEnv {
  VITE_HOST: string
  VITE_PORT: number
  VITE_BASE_URL: string
  VITE_PROXY_DOMAIN: string
}
