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
        <div class="genre">
          <span>Жанр:</span>
          {{ movie.genre }}
        </div>
        <div class="production">
          <span>Производство:</span>
          {{ movie.production }}
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
  max-height: 280px
  padding: $offset-2xs
  overflow: hidden
  .img
    width: 100%
    max-width: 25%
    min-width: 200px
    img
      aspect-ratio: 0.6
      border-radius: $radius-default
  .info
    // position: relative
    display: flex
    flex-direction: column
    gap: $offset-4xs
    width: 70%
    overflow: hidden

    .title
      @include font(2rem, 400)
      text-wrap: nowrap
      margin-bottom: $offset-4xs
    &__top
      display: flex
      flex-wrap: wrap
      gap: $offset-4xs
      max-width: 100%
      div
        span
          text-wrap: nowrap
          color: $text-color-inactive
      .year,
      .duration
        text-wrap: nowrap
    div
      span
        height: min-content
        text-wrap: nowrap
        color: $text-color-inactive
    &__bottom
      overflow: hidden
      // &::before
      //   content: ''
      //   position: absolute
      //   bottom: 0
      //   left: 0
      //   width: 100%
      //   height: 20%
        // background: linear-gradient(0deg, rgba(36, 36, 36, 1) 20%, transparent 100%)
    .description
      // background: linear-gradient(0deg, transparent 10%, $text-color-default 10%)
      // // background: -webkit-gradient(linear, left top, left bottom, from($text-color-default), to(rgba(0, 0, 0, 0)))
      // -webkit-background-clip: text
      // -webkit-text-fill-color: transparent
</style>
