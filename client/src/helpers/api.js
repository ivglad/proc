import axios from 'axios'
import { useUserStore } from '@/store/userStore'

const api = axios.create({
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const user = userStore.user

    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const userStore = useUserStore()
    const user = userStore.user
    const originalConfig = error.config

    if (
      error.response.status == 401 &&
      error.response.statusText === 'Unauthorized' &&
      user &&
      !originalConfig._retry &&
      originalConfig.url !== '/api/auth/signin'
    ) {
      originalConfig._retry = true
      try {
        const result = await axios.get('/api/auth/refresh', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.refreshToken}`,
          },
        })
        user.accessToken = result.data.accessToken
        user.refreshToken = result.data.refreshToken

        return api.request(originalConfig)
      } catch (e) {
        userStore.$patch({ user: null })
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

export default api
