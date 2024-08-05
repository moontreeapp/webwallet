import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vuetify from 'vite-plugin-vuetify'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    vue()
    // vuetify({
    //   styles: { configFile: 'src/styles/settings.scss' }
    // })
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
