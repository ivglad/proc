import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

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
      roles: ['creator'],
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
      roles: ['creator'],
    },
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import('@/views/Vip.vue'),
    meta: {
      roles: ['creator', 'admin', 'vip'],
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const errorMiddleware = (to, next, user) => {
  if (to.name !== '404') return true
  if (!user) {
    next('/auth')
    return false
  }

  if (user.role === 'vip') {
    next('/vip')
  } else {
    next('/')
  }
  return false
}

const authMiddleware = (to, next, user) => {
  if (!user && to.path !== '/auth') {
    next('/auth')
    return false
  } else if (user && to.path === '/auth') {
    next('/')
    return false
  }
  return true
}

const roleDefaultPath = (user) => {
  if (user.role === 'vip') return '/vip'
  if (user.role === 'admin') return '/vip'
  return '/'
}

const roleMiddleware = (to, from, next, user) => {
  if (!to.meta.roles) return true
  if (to.meta.roles.includes(user.role)) return true

  if (from.path === to.path) {
    next(roleDefaultPath(user))
  } else {
    next(from.path)
  }
  return false
}

const middlewarePipeline = (context) => {
  const { to, from, next, authStore } = context
  const errorMiddlewareResult = errorMiddleware(to, next, authStore.user)
  const authMiddlewareResult = authMiddleware(to, next, authStore.user)

  if (!errorMiddlewareResult || !authMiddlewareResult) {
    return false
  }

  const roleMiddlewareResult = roleMiddleware(to, from, next, authStore.user)

  if (!roleMiddlewareResult) {
    return false
  }

  return true
}

router.beforeEach(async (to, from, next) => {
  const context = {
    to,
    from,
    next,
    authStore: useAuthStore(),
  }

  const pipeline = middlewarePipeline(context)

  if (pipeline) next()
  else return false
})

router.onError((error) => {
  console.log('router.onError', error)
})

export default router
