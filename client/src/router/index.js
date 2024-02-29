import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Ui from '@/views/Ui.vue'

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: Home,
  },
  {
    path: '/ui',
    name: 'Ui',
    component: Ui,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
