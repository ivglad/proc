import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/auth',
    name: 'Вход и регистрация',
    component: () => import('@/views/Auth.vue'),
  },
  {
    path: '/ui',
    name: 'Ui',
    component: () => import('@/views/Ui.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
