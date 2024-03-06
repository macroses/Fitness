import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import postcssNesting from 'postcss-nesting'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },
  plugins: [
    vue(),
    Components(),
    VueDevTools(),
    VitePWA({
      manifest: {
        icons: [
          {
            src: '/icons/512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [postcssNesting]
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          bodyParams: ['./src/views/BodyParameters.vue'],
          workoutMode: ['./src/views/WorkoutMode.vue'],
          program: ['./src/views/Program.vue']
        }
      }
    }
  }
})
