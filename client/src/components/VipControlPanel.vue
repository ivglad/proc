<script setup>
import { ref, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import VipPlayer from '@/components/VipPlayer.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import { useVipPlayerStore } from '@/store/vipPlayerStore'

components: {
  AppIcon
}

const router = useRouter()
const userStore = useUserStore()
const vipPlayerStore = useVipPlayerStore()

const player = vipPlayerStore.player
</script>

<template>
  <nav class="control" ref="control">
    <div class="control-panel">
      <section class="main-section">
        <div class="first-block">
          <AppIcon name="user" type="button" />
          <AppIcon
            name="home"
            type="button"
            @click="router.push(`${userStore.user.homePage}`)" />
          <AppIcon
            name="movies"
            type="button"
            @click="router.push('/vip/movies')" />
          <AppIcon
            name="food"
            type="button"
            @click="router.push('/vip/products')" />
        </div>
        <div class="center-block">
          <VipPlayer v-if="player.mode === 'hide'" />
        </div>
        <div class="third-block">
          <AppIcon name="cart" type="button" />
        </div>
      </section>
      <section class="second-section">
        <VipPlayer v-if="player.mode === 'show'" class="show" />
      </section>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
.control
  display: flex
  justify-content: center
  width: $container-width
  height: 72px
  margin-bottom: $offset-3xs
  @include mq(s)
    height: 134px

.control-panel
  @include background(blur, 80)
  position: fixed
  bottom: $offset-3xs
  display: flex
  align-items: center
  width: $container-width
  max-width: 1000px
  background: rgba(36, 36, 36, 0.7)
  @include mq(xs)
    width: 100%

  .main-section
    display: flex
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
        left: 0
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
