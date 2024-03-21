<script setup>
import AppIcon from '@/components/AppIcon.vue'
import Player from '@/components/Player.vue'

components: {
  AppIcon
}
</script>

<template>
  <nav class="control-panel">
    <div class="first-block">
      <AppIcon name="user" type="button" />
      <AppIcon name="home" type="button" />
      <AppIcon name="films" type="button" />
      <AppIcon name="food" type="button" />
    </div>
    <div class="second-block">
      <Player />
    </div>
    <div class="third-block">
      <AppIcon name="cart" type="button" />
    </div>
  </nav>
</template>

<style lang="sass" scoped>
.control-panel
  @include background(default, 80)
  position: fixed
  bottom: 10px
  display: flex
  align-items: center
  justify-content: space-between
  gap: 30px
  // width: 80%
  padding: 10px 30px

  div
    display: flex
    gap: 15px
    height: 100%

  .icon
    cursor: pointer
    &:hover
      color: $element-color-active
</style>
