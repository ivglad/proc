import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('userStore', () => {
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
    if (!user.value) return
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const setUserHomePage = () => {
    if (!user.value) return
    if (user.value.role === 'spectator') user.value.homePage = '/vip'
    else if (user.value.role === 'vip') user.value.homePage = '/vip'
    else if (user.value.role === 'admin') user.value.homePage = '/vip'
    else user.value.homePage = '/vip'
  }

  const initUser = (data) => {
    user.value = data
    setUserHomePage()
  }
  const resetUser = () => {
    user.value = null
  }

  const user = ref(null)
  initUser(getUserFromLocalStorage())

  const watchUserState = () => {
    setUserToLocalStorage()
  }
  watch(user, watchUserState, { deep: true })

  return { user, resetUser, initUser }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
