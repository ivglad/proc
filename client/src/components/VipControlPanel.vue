<script setup>
import { ref, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import VipPlayer from '@/components/VipPlayer.vue'

components: {
  AppIcon
}

const props = defineProps({})

const mainPlayer = ref(false)
</script>

<template>
  <nav class="control" ref="control">
    <div class="control-panel">
      <section class="main-section">
        <div class="first-block">
          <AppIcon name="user" type="button" />
          <AppIcon name="home" type="button" />
          <AppIcon name="films" type="button" />
          <AppIcon name="food" type="button" />
        </div>
        <div class="center-block" v-if="!mainPlayer">
          <VipPlayer
            v-if="!mainPlayer"
            type="info"
            v-model:mainPlayer="mainPlayer" />
        </div>
        <div class="third-block">
          <AppIcon name="cart" type="button" />
        </div>
      </section>
      <section class="second-section">
        <VipPlayer
          v-if="mainPlayer"
          class="main-player"
          v-model:mainPlayer="mainPlayer" />
      </section>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
.control
  position: fixed
  bottom: $offset-3xs
  display: flex
  justify-content: center
  width: 100%
  max-width: 1200px

.control-panel
  @include background(blur, 80)
  display: flex
  align-items: center
  width: $container-width
  background: rgba(36, 36, 36, 0.7)
  @include mq(xs)
    width: 100%

  .main-section
    display: flex
    align-items: center
    justify-content: space-between
    flex-wrap: wrap
    gap: $offset-2xs $offset-xs
    padding: $offset-3xs $offset-xs
    width: 100%

    div
      display: flex
      align-items: center
      flex: 0 1 auto
      gap: 0 $offset-3xs
    .first-block
      min-height: 48px
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
    @include mq(m)
      bottom: calc(100% + $offset-4xs)
</style>
