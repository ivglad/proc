import axios from 'axios'
import { useAuthStore } from '@/store/authStore'
import { useRefreshUser } from '@/services/queries'

const api = axios.create({
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const user = authStore.user

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
    const authStore = useAuthStore()
    const user = authStore.user

    if (
      error.response.status == 401 &&
      error.response.statusText === 'Unauthorized' &&
      user
    ) {
      const result = await axios.get('/api/auth/refresh', {
        headers: {
          Authorization: `Bearer ${user.refreshToken}`,
        },
      })

      user.accessToken = result.data.accessToken
      user.refreshToken = result.data.refreshToken
    }

    return Promise.reject(error)
  },
)

export default api
