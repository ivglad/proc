import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useVipPlayerStore = defineStore('vipPlayerStore', () => {
  const player = ref({
    mode: 'hide', // hide, show
  })

  return { player }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVipPlayerStore, import.meta.hot))
}
