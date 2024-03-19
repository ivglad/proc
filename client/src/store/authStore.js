import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, watch } from 'vue'
import router from '@/router/index'

export const useAuthStore = defineStore('authStore', () => {
  const getUserFromLocalStorage = () => {
    try {
      const data = localStorage.getItem('user')
      return JSON.parse(data)
    } catch (e) {
      localStorage.removeItem('user')
      return null
    }
  }

  const setUserToLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const watchUserState = () => {
    setUserToLocalStorage()
    if (!user.value) {
      router.push('/auth')
    }
  }

  const user = ref(getUserFromLocalStorage())

  watch(user, watchUserState, { deep: true })

  return { user }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
