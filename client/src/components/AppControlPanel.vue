<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import Player from '@/components/Player.vue'

components: {
  AppIcon
}

const mainPlayer = ref(false)
</script>

<template>
  <nav class="control-panel">
    <section class="main-section">
      <div class="first-block">
        <AppIcon name="user" type="button" />
        <AppIcon name="home" type="button" />
        <AppIcon name="films" type="button" />
        <AppIcon name="food" type="button" />
      </div>
      <div class="center-block">
        <Transition name="blur" mode="out-in">
          <Player
            v-if="!mainPlayer"
            type="info"
            v-model:mainPlayer="mainPlayer" />
          <Player
            v-else
            class="main-player"
            v-model:mainPlayer="mainPlayer"
            @click="mainPlayer = false" />
        </Transition>
      </div>
      <div class="third-block">
        <AppIcon name="cart" type="button" />
      </div>
    </section>
    <!-- <section class="second-section">
      <Transition name="blur" mode="out-in">
        <Player
          v-if="mainPlayer"
          v-model:mainPlayer="mainPlayer"
          @click="mainPlayer = false" />
      </Transition>
    </section> -->
  </nav>
</template>

<style lang="sass" scoped>
.control-panel
  @include background(default, 80)
  position: fixed
  bottom: $offset-2xs
  display: flex
  align-items: center
  width: clamp(50vw, 90%, 1920px)

  .main-section
    display: flex
    align-items: center
    justify-content: space-between
    flex-wrap: wrap
    gap: $offset-xs $offset-xs
    padding: $offset-3xs $offset-xs
    width: 100%
    min-height: 70px

    div
      display: flex
      flex: 0 1 auto
      gap: $offset-3xs
      // height: 100%
    .first-block
      @include mq(s)
        order: 2
    .center-block
      flex: 1 0 max-content
      @include mq(s)
        flex: 1 1 100%
      .main-player
        position: absolute
        left: 0px
        bottom: calc(100% + $offset-3xs)
        display: flex
        width: 100%
    .third-block
      @include mq(s)
        order: 3

  .second-section
    position: absolute
    bottom: calc(100% + $offset-3xs)
    display: flex
    width: 100%
</style>
