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
  <main :class="{ 'main-padding': userStore.user }">
    <router-view />
  </main>
  <VipControlPanel v-if="userStore.user" />
  <footer></footer>
</template>

<style lang="sass">
body
  @include font-base
  width: 100vw
  min-width: 320px
  height: 100vh
  min-height: 320px
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
    justify-content: center
    position: relative
    width: 100%

    main
      display: flex
      flex-direction: column
      width: 100%
      align-items: center
      padding: $offset-xs

    .main-padding
      padding-bottom: calc(78px + $offset-3xs + $offset-xs)
      @include mq(s)
        padding-bottom: calc(140px + $offset-3xs + $offset-xs)
</style>
