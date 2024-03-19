import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

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

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const user = authStore.user

  if (!user && to.path !== '/auth') {
    return '/auth'
  }

  if (user && to.path === '/auth') {
    return '/'
  }
})

export default router
