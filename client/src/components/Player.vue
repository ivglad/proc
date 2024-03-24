<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  mainPlayer: {
    type: Boolean,
  },
  type: {
    type: String,
    default: 'player',
  },
})

const emit = defineEmits(['update:mainPlayer'])

const changePlayer = () => {
  if (props.type === 'player') return
  emit('update:mainPlayer', !props.mainPlayer)
}
</script>

<template>
  <div class="player">
    <section class="main" :class="{ 'main-player': props.type === 'player' }">
      <div class="first-controls" v-if="props.type === 'player'">
        <AppIcon name="play" type="button" />
        <AppIcon name="stop" type="button" />
      </div>
      <div class="progress" @click="changePlayer">
        <div class="title">
          <span>Грань будущего</span>
          <AppIcon
            v-if="props.type === 'info'"
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
      <div class="second-controls" v-if="props.type === 'player'">
        <AppIcon name="volume" type="button" />
        <AppIcon name="light" type="button" />
      </div>
    </section>
    <section class="info" v-if="props.type === 'player'"></section>
  </div>
</template>

<style lang="sass" scoped>
.player
  display: flex
  flex-direction: column
  width: 100%

  .main
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: $offset-xs $offset-xs
    width: 100%
    padding: 0
    cursor: pointer

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
      gap: $offset-4xs
      user-select: none
      @include mq(s)
        flex: 1 0 100%
      .title
        position: relative
        .show-player-button
          position: absolute
          top: 0
          right: 0
          transform: rotate(90deg) translate(-16%, -34%)
      .line
        position: relative
        width: 100%
        height: 4px
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
        @include font(13px)
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

  .main-player
    @include background(default, 80)
    padding: $offset-3xs $offset-xs
    cursor: default

.play-info
</style>
