import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router'
import PrimeVue from 'primevue/config'
import Preset from '@/assets/styles/presets/default.js'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Preset,
  },
})
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.mount('#app')
