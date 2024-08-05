import 'reflect-metadata'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import './styles/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'
import { createPinia } from 'pinia'
import { useWebSocketStore } from './stores/useWebSocketStore'
import { myCustomTheme } from './styles/myCustomTheme'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme
    }
  },
  components,
  directives,
  blueprint: md3
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

// Initialize WebSocket after creating the app and setting up Pinia
const socketStore = useWebSocketStore()
socketStore.initializeWebSocket()

app.mount('#app')
