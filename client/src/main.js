import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')
