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
  // font-size: 100%
  // font-size: 14px
body
  @include font-base(1.4rem)
  display: flex
  align-items: center
  justify-content: center
  min-width: 100vw
  min-height: 100vh
  // margin: 0
  // padding: 0
  // color: $text-color-default
  // word-break: normal
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-rendering: optimizeLegibility
  background: $background-main
  background-repeat: no-repeat
  // overflow-x: hidden

  // #app
  //   display: flex
  //   flex-direction: column
  //   align-items: center
  //   position: relative
  //   min-width: 100vw
  //   min-height: 100vh

  //   main
  //     display: flex
  //     flex-direction: column
  //     flex: 1 1 100%
  //     align-items: center
  //     justify-content: center
  //     margin: $offset-xs
  //     max-width: 100vw
      // margin: $offset-xs 0
      // width: 100%
      // max-height: calc(100vh - $controlPanelHeight - $offset-3xs - $offset-xs)
      // overflow: auto
</style>
