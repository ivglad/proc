<template>
  <header></header>
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<script setup></script>

<style lang="sass">

html
  @include font
  width: 100vw
  height: 100vh
  color: $text-color-default
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-rendering: optimizeLegibility
  background: $background-main

body
  width: 100%
  height: 100%
  margin: 0
  padding: 0

  #app
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    position: relative
    width: 100%
    height: 100%
    overflow-x: hidden

    header
      position: fixed
      display: flex
      align-content: center
      justify-content: center
      width: 100%
      bottom: 0
      z-index: 100

    main
      display: flex
      width: 100%
      height: 100%
      align-items: center
      justify-content: center
      overflow: hidden
</style>
