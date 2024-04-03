<script setup>
const props = defineProps({
  movie: Object,
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
  display: flex
  gap: $offset-2xs
  width: 100%
  height: 100%
  max-height: 302px
  padding: $offset-2xs
  overflow: hidden
  @include mq(s)
    flex-direction: column
    gap: $offset-4xs
    max-height: 610px
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
    overflow: hidden
    .title
      @include font(2rem, 400, 100%)
      margin-bottom: $offset-4xs
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
      margin-bottom: $offset-4xs
    .description
      padding-right: clamp($offset-4xs, $index, $offset-xs)
</style>
