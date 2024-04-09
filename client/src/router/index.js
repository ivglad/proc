import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/userStore'

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
      roles: ['admin', 'vip', 'spectator'],
    },
  },
  {
    path: '/vip/movies',
    name: 'VipMovies',
    component: () => import('@/views/VipMovies.vue'),
    meta: {
      roles: ['admin', 'vip', 'spectator'],
    },
  },
  {
    path: '/vip/movies/:id/play',
    name: 'VipMoviePlay',
    component: () => import('@/components/VipMoviePlay.vue'),
    meta: {
      roles: ['admin', 'vip'],
    },
  },
  {
    path: '/vip/products',
    name: 'VipProducts',
    component: () => import('@/views/VipProducts.vue'),
    meta: {
      roles: ['admin', 'vip', 'spectator'],
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const authMiddleware = (to, next, userStore) => {
  let userInLocalStorage = null
  try {
    userInLocalStorage = JSON.parse(localStorage.getItem('user'))
  } catch (e) {}

  if (!userInLocalStorage?.role && userStore.user) {
    userStore.resetUser()
  }
  if (!userStore.user && to.path !== '/auth') {
    next('/auth')
    return false
  }
  if (userStore.user && to.path === '/auth') {
    next(userStore.user.homePage)
    return false
  }
  return true
}

const errorMiddleware = (to, next, user) => {
  if (to.name !== '404') return true
  if (!user) {
    next('/auth')
    return false
  }

  next(roleDefaultPath(user))
  return false
}

const roleMiddleware = (to, next, user) => {
  if (to.path === '/auth') return true
  if (user.role === 'creator') return true
  if (to.meta?.roles.includes(user.role)) return true

  next(roleDefaultPath(user))
  return false
}

const roleDefaultPath = (user) => {
  return user.homePage
}

const middlewarePipeline = (context) => {
  const { to, from, next, userStore } = context
  if (!authMiddleware(to, next, userStore)) return false
  if (!errorMiddleware(to, next, userStore.user)) return false
  if (!roleMiddleware(to, next, userStore.user)) return false
  return true
}

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const context = {
    to,
    from,
    next,
    userStore,
  }

  const pipeline = middlewarePipeline(context)
  if (pipeline) next()
  else return false
})

router.onError((e) => {
  console.log('router.onError', e)
})

export default router
