import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router'
import PrimeVue from 'primevue/config'
import Preset from '@/assets/styles/presets/default.js'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import KeyFilter from 'primevue/keyfilter'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Preset,
    options: {
      darkModeSelector: '.p-dark-mode',
      cssLayer: {
        name: 'proc',
        order: 'proc, default',
      },
    },
  },
  // ripple: true,
})
app.use(ToastService)
app.directive('tooltip', Tooltip)
app.directive('keyfilter', KeyFilter)

app.mount('#app')
