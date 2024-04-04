<script setup>
import { onMounted, ref, computed } from 'vue'

const props = defineProps({
  movie: Object,
})

const infoEl = ref(null)
const infoBottomEl = ref(null)
// const infoBottomElHeight = ref(0)
onMounted(() => {
  // const elHeight = infoBottomEl.value.offsetHeight
  // infoBottomElHeight.value = Math.round(elHeight / (16 * 1.2)) + 'rem'
})

const infoBottomElHeight = computed(() => {
  //   const infoElHeight = infoEl.value.offsetHeight
  if (!infoBottomEl.value) return
  const infoBottomElHeight = infoBottomEl.value.offsetHeight
  infoBottomEl.value.style.height =
    Math.round(infoBottomElHeight / 16) + 1 + 'rem'
  //   const finalHeight = infoElHeight - (infoElHeight - infoBottomElHeight)
  console.log(
    //     infoEl.value,
    //     infoElHeight,
    infoBottomElHeight,
    //     Math.round(infoBottomElHeight / (16 * 1.2)),
  )
  // return infoBottomElHeight + 'px'
  return Math.round(infoBottomElHeight / (16 * 1.2)) + 'rem'
})
</script>

<template>
  <div class="movie">
    <div class="img">
      <picture>
        <source srcset="../assets/img/vip/movies-logo.webp" type="image/webp" />
        <img src="../assets/img/vip/movies-logo.jpg" :alt="movie.title" />
      </picture>
    </div>
    <div class="info" ref="infoEl">
      <div class="title">
        {{ movie.title }}
      </div>
      <div class="info__top">
        <div class="year">
          <span>Год:</span>
          {{ movie.year }}
        </div>
        <div class="duration">
          <span>Длительность:</span>
          {{ movie.duration }} мин.
        </div>
        <div class="production">
          <span>Производство:</span>
          {{ movie.production }}
        </div>
        <div class="genre">
          <span>Жанр:</span>
          {{ movie.genre }}
        </div>
      </div>
      <div
        class="info__bottom"
        ref="infoBottomEl"
        :style="{ 'max-height': infoBottomElHeight }">
        <div class="description">
          <span>Описание:</span>
          {{ movie.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.movie
  @include background
  display: flex
  gap: $offset-2xs
  width: 100%
  height: 100%
  // max-height: 100%
  padding: $offset-2xs
  overflow: hidden
  @include mq(s)
    flex-direction: column
    gap: $offset-3xs
    max-height: 620px
  .img
    max-width: 200px
    min-width: 200px
    aspect-ratio: 0.8
    @include mq(s)
      max-width: 100%
      aspect-ratio: 1.4
    img
      border-radius: $radius-default
  .info
    display: flex
    flex-direction: column
    gap: $offset-4xs
    width: 100%
    min-width: 285px
    // height: 100%
    max-height: 16.8rem
    // height: fit-content
    // height: calc(1rem * 16.5)
    // max-height: calc(1rem * 12)
    overflow: hidden
    .title
      @include font(2rem, 400, 100%)
      margin-bottom: $offset-2xs
      padding-right: clamp($offset-4xs, $index, $offset-xs)
    &__top
      display: flex
      flex-wrap: wrap
      gap: $offset-4xs
      max-width: 100%
      padding-right: clamp($offset-4xs, $index, $offset-xs)
      div
        span
          text-wrap: nowrap
          color: $text-color-inactive
      .year,
      .duration
        text-wrap: nowrap
      .genre
        width: 100%
    div
      span
        height: min-content
        text-wrap: nowrap
        color: $text-color-inactive
    &__bottom
      overflow-y: auto
      // height: 100%
      max-height: 100%
      // flex: 1 1 100%
      // margin-bottom: $offset-4xs
      // height: 10rem
      // max-height: 100%
      // max-height: calc((1rem * 1.2) * 8)
      // max-height: calc(100% - (5rem * 1.2))
      // max-height: round(up, 100%, 1rem * 1.2)
      // $height: calc(16.5rem - 100%)
      // max-height: v-bind(infoBottomElHeight)
    .description
      padding-right: clamp($offset-4xs, $index, $offset-xs)
      // height: calc(100% - 20rem)
</style>
