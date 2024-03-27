import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import middlewarePipeline from './middleware/_middlewarePipeline'
import auth from './middleware/auth'
import vipGuest from './middleware/vipGuest'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/',
    name: 'Главная',
    component: () => import('@/views/Home.vue'),
    meta: {
      middleware: [auth, vipGuest],
    },
  },
  {
    path: '/auth',
    name: 'Вход и регистрация',
    component: () => import('@/views/Auth.vue'),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/ui',
    name: 'Ui',
    component: () => import('@/views/Ui.vue'),
    meta: {
      middleware: [auth, vipGuest],
    },
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import('@/views/Vip.vue'),
    meta: {
      middleware: [auth, vipGuest],
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.name === '404') {
    return next({
      path: from.path,
    })
  }
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const middlewareName = middleware[0]
  const context = {
    to,
    from,
    next,
    store: useAuthStore(),
  }
  return middlewareName({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  })
})

export default router
