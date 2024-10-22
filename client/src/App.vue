<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/userStore'

const route = useRoute()
const userStore = useUserStore()
</script>

<template>
  <header></header>
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<style lang="sass">
html
  font-size: 62.5%

  body
    @include font-base(1.4rem)
    display: flex
    align-items: center
    justify-content: center
    min-width: 100vw
    min-height: 100vh
    margin: 0
    padding: 0
    color: var(--p-surface-200)
    word-break: normal
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-rendering: optimizeLegibility
    background: var(--p-surface-800)
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
        max-width: 100vw
        width: 100%
        overflow: auto
</style>
