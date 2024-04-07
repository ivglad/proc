<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useUserStore } from '@/store/userStore'
import VipControlPanel from '@/components/VipControlPanel.vue'

components: {
  VipControlPanel
}

const userStore = useUserStore()
</script>

<template>
  <header></header>
  <main>
    <router-view />
  </main>
  <VipControlPanel v-if="userStore.user" />
  <footer></footer>
</template>

<style lang="sass">
body
  @include font-base(1rem)
  display: flex
  align-items: center
  justify-content: center
  min-width: 100vw
  min-height: 100vh
  margin: 0
  padding: 0
  color: $text-color-default
  word-break: normal
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-rendering: optimizeLegibility
  background: $background-main
  background-repeat: no-repeat
  overflow-x: hidden

  #app
    display: flex
    flex-direction: column
    align-items: center
    position: relative
    min-width: 100vw
    min-height: 100vh

    main
      display: flex
      flex-direction: column
      flex: 1 1 100%
      align-items: center
      justify-content: center
      margin: $offset-xs
</style>
