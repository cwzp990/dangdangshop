import fs from 'fs'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

export default defineConfig((env) => {
  let server = {}
  const envFileName = `.env.${env.mode}`
  const envData = fs.readFileSync(envFileName)
  const envConf = dotenv.parse(envData)

  if (env.mode === 'development') {
    server = {
      host: envConf.VITE_HOST,
      port: envConf.VITE_PORT,
      proxy: {
        [envConf.VITE_BASE_URL]: {
          target: envConf.VITE_PROXY_DOMAIN
        }
      }
    }
  }
  if (env.mode === 'production') {
    // production
  }
  return {
    server,
    plugins: [vue()]
  }
})
