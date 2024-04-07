<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useVipPlayerStore } from '@/store/vipPlayerStore'

const vipPlayerStore = useVipPlayerStore()
const player = vipPlayerStore.player

const changePlayer = () => {
  if (player.mode === 'show') {
    player.mode = 'hide'
  } else {
    player.mode = 'show'
  }
}
</script>

<template>
  <div class="player">
    <section class="main" :class="{ show: player.mode === 'show' }">
      <div class="first-controls" v-if="player.mode === 'show'">
        <AppIcon name="play" type="button" />
        <AppIcon name="stop" type="button" />
      </div>
      <div class="progress" @click="changePlayer">
        <div class="title">
          <span>Грань будущего</span>
          <AppIcon
            class="show-player-button"
            name="back"
            type="button"
            :bg="false" />
        </div>
        <span class="line">
          <span class="line-progress"></span>
        </span>
        <div class="time">
          <span class="current">00:42:51</span>
          <span class="separator">/</span>
          <span class="left">-01:10:09</span>
          <span class="total">01:53:00</span>
        </div>
      </div>
      <div class="second-controls" v-if="player.mode === 'show'">
        <AppIcon name="volume" type="button" />
        <AppIcon name="light" type="button" />
      </div>
    </section>
    <section class="info" v-if="player.mode === 'show'"></section>
  </div>
</template>

<style lang="sass" scoped>
.player
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  height: 100%
  .main
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: $offset-xs $offset-xs
    width: 100%
    height: 100%
    padding: 0
    div
      display: flex
      flex: 0 1 auto
      gap: $offset-3xs
    .first-controls
      @include mq(s)
          order: 2
    .progress
      display: flex
      flex-direction: column
      flex: 1 0 max-content
      justify-content: space-between
      height: 100%
      min-height: 48px
      gap: 0
      user-select: none
      cursor: pointer
      @include mq(s)
        flex: 1 0 100%
      .title
        position: relative
        .show-player-button
          position: absolute
          top: 0
          right: 0
          transform: rotate(90deg) translate(-18%, -38%)
          transform-origin: 50%
      .line
        position: relative
        width: 100%
        height: 3px
        border-radius: 2px
        background: $element-color-inactive
        &-progress
          position: absolute
          top: 0
          left: 0
          width: 38%
          height: 100%
          border-radius: 2px
          background: $element-color-default
      .time
        @include font(0.8125rem)
        display: flex
        gap: $offset-4xs
        width: 100%
        text-wrap: nowrap
        .current,
        .separator,
        .left
          color: $text-color-inactive
        .total
          color: $text-color-inactive
          margin-left: auto
    .second-controls
      margin-left: auto
      @include mq(s)
          order: 2
  .show
    @include background(blur, 80)
    padding: $offset-3xs $offset-xs
    cursor: default
    background: rgba(36, 36, 36, 0.7)
    .show-player-button
      transform: rotate(-90deg) translate(18%, 34%) !important
    .title
    .time
      span
        color: $text-color-default !important
</style>
