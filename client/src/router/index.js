import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import middlewarePipeline from './middlewares/_middlewarePipeline'
import auth from './middlewares/auth'
import vipGuest from './middlewares/vipGuest'

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
      middleware: [vipGuest],
    },
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
    meta: {
      middleware: [vipGuest],
    },
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import('@/views/Vip.vue'),
    meta: {
      middleware: [vipGuest],
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const errorGuard = (to, from) => {
  if (to.name === '404') return from.path
  else return null
}

const authGuard = (to, user) => {
  if (!user && to.path !== '/auth') return '/auth'
  else if (user && to.path === '/auth') return '/'
  else return null
}

const vipGuestGuard = (to, user) => {
  if (user.role === 'vip' && to.fullPath.indexOf('/vip') === -1) return '/vip'
  else return null
}

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const user = authStore.user

  const errorGuardResult = errorGuard(to, from)
  const authGuardResult = authGuard(to, user)
  const vipGuestGuardResult = vipGuestGuard(to, user)

  console.log(user)

  if (errorGuardResult) next(errorGuardResult)
  else if (authGuardResult) next(authGuardResult)
  else if (vipGuestGuardResult) next(vipGuestGuardResult)
  else next()

  // if (!to.meta.middleware) {
  //   return next()
  // }
  // const middleware = to.meta.middleware
  // const firstMiddleware = middleware[0]
  // const context = {
  //   to,
  //   from,
  //   next,
  //   store: useAuthStore(),
  // }
  // return firstMiddleware({
  //   ...context,
  //   next: middlewarePipeline(context, middleware, 1),
  // })
})

export default router
