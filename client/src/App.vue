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
  @include font
  width: 100vw
  min-width: 320px
  height: 100vh
  min-height: 320px
  margin: 0
  padding: 0
  color: $text-color-default
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
    height: 100%

    main
      display: flex
      flex-direction: column
      width: 100%
      height: 100%
      align-items: center
      padding: calc($index * 0.8)
      // justify-content: center
      // overflow: hidden

    .main-padding
      padding-bottom: calc(68px + $offset-3xs)
      @include mq(s)
        padding-bottom: calc(130px + $offset-3xs)
</style>
