import './assets/main.css'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

registerSW({ immediate: true })

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
