<script setup>
import { useAuthStore } from "@/store/authStore";
import ControlPanel from "@/components/ControlPanel.vue";

components: {
  ControlPanel;
}

const authStore = useAuthStore();
</script>

<template>
  <header></header>
  <main>
    <router-view />
  </main>
  <ControlPanel v-if="authStore.user" />
  <footer></footer>
</template>

<style lang="sass">

html
  width: 100vw
  height: 100vh

body
  @include font
  width: 100%
  min-width: 320px
  height: 100%
  margin: 0
  padding: 0
  color: $text-color-default
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-rendering: optimizeLegibility
  background: $background-main
  overflow-x: hidden


  #app
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    position: relative
    width: 100%
    min-width: 320px
    height: 100%
    overflow-x: hidden


    header
      // position: sticky
      // display: flex
      // align-content: center
      // justify-content: center
      // width: 100%
      // // bottom: 0
      // top: 100%
      // z-index: 100

    main
      display: flex
      width: 100%
      height: 100%
      align-items: center
      justify-content: center
      margin-bottom: 80px
      overflow: hidden
</style>
