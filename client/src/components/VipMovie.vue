<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  movie: Object,
})

const router = useRouter()
</script>

<template>
  <div class="movie" @click="router.push(`/vip/movies/${movie.id}/play`)">
    <div class="img">
      <picture>
        <source srcset="../assets/img/vip/movies-logo.webp" type="image/webp" />
        <img src="../assets/img/vip/movies-logo.jpg" :alt="movie.title" />
      </picture>
    </div>
    <div class="info">
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
      <div class="info__bottom">
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
  @include active
  display: flex
  gap: $offset-2xs
  width: 100%
  height: 100%
  max-height: 18rem
  padding: $offset-3xs
  overflow: hidden
  @include mq(s)
    flex-direction: column
    gap: $offset-3xs
    max-height: 35rem
  .img
    flex: 1 1 25%
    min-width: 200px
    aspect-ratio: 0.8
    mask-image: linear-gradient(135deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.2))
    @include mq(s)
      max-width: 100%
      aspect-ratio: 1.8
    img
      border-radius: $radius-default
      @include mq(s)
        object-position: 10% top
  .info
    display: flex
    flex-direction: column
    flex: 1 1 75%
    gap: $offset-5xs
    // width: 100%
    // height: 100%
    overflow: hidden
    .title
      @include font(2rem, 300, 100%)
      @include transition
      padding-right: clamp($offset-4xs, $index, $offset-xs)
      padding-bottom: $offset-3xs
    &__top
      display: flex
      flex-wrap: wrap
      gap: $offset-5xs
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
      mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%)
    .description
      padding-right: clamp($offset-5xs, $index, $offset-xs)
      padding-bottom: $offset-3xs
</style>
