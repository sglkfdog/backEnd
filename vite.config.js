import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import dayjs from 'dayjs'
import { createVitePlugins } from "./build/vitePlugins"
import { dependencies, devDependencies, version } from './package.json'

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}
// inject info
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let prefix = loadEnv(mode, process.cwd()).VITE_API_URL
  let reg = "/^\/"+prefix+"/"
  let isBuild = command === 'build'
  console.log("command=", command)
  return {
    base: loadEnv(mode, process.cwd()).VITE_PUBLIC_PATH,
    resolve: {
      // alias: {
      //   '@': resolve(__dirname, 'src'),
      // },
      alias: [
        { find: '@', replacement: resolve('src') },
        { find: 'core', replacement: resolve('src/core') },
        // { find: 'vue-i18n',  replacement: 'vue-i18n/dist/vue-i18n.cjs.js'}
      ],
    },
    plugins: createVitePlugins(),
    build: {
      outDir: loadEnv(mode, process.cwd()).VITE_OUT_PUT_DIR,
      assetsDir: 'static',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: mode === 'production',
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[hash].[ext]"
        }
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    server: {
      open: true,
      host: "0.0.0.0",
      port: "9333",
      proxy: {
        [prefix]: {
          target: loadEnv(mode, process.cwd()).VITE_API_TAG,
          changeOrigin: true,
          secure: true,
          // rewrite: (path) => path.replace(/^\/demo_api/, ''),
          rewrite: (path) => path.replace(reg, ''),
        },
      },
    }
  }
})
