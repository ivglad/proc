<template>
  <header></header>
  <main>
    <section>
      <router-view />
    </section>
  </main>
</template>

<script setup></script>

<style lang="sass" module>

html
  width: 100vw
  height: 100vh
  font-size: 62.5%
  line-height: 100%

body
  @include font
  width: 100vw
  height: 100vh
  margin: 0
  padding: 0
  box-sizing: border-box
  color: $text-color-default
  background: $background-gradient-default

  #app
    display: flex
    flex-direction: column
    position: relative
    width: 100%
    height: 100%
    overflow-x: hidden

    header
      display: flex
      align-content: center
      justify-content: center
      position: absolute
      width: 100%
      bottom: 0
      z-index: 100

    main
      display: flex
      padding: $offset-l
      position: relative
      overflow: hidden

      .content
        display: flex
        flex-direction: column
        margin-left: $offset-l
</style>
