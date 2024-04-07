<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="vip">
    <div class="tiles">
      <div class="movie" @click="router.push('/vip/movies')">
        <div class="title">Фильмы</div>
        <div class="img">
          <picture>
            <source
              srcset="../assets/img/vip/movies-logo.webp"
              type="image/webp" />
            <img src="../assets/img/vip/movies-logo.jpg" alt="Фильмы" />
          </picture>
        </div>
        <div class="text">Может<br />кино?</div>
      </div>
      <div class="food" @click="router.push('/vip/food')">
        <div class="title">Меню</div>
        <div class="img">
          <picture>
            <source
              srcset="../assets/img/vip/food-logo.webp"
              type="image/webp" />
            <img src="../assets/img/vip/food-logo.jpg" alt="Еда" />
          </picture>
        </div>
        <div class="text">Хочу<br />есть!</div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.vip
  display: flex
  align-items: center
  justify-content: center
  width: $container-width
  max-width: 1200px
  max-height: calc(100vh - $controlPanelHeight - $offset-3xs - $offset-xs * 2)

.tiles
  display: flex
  justify-content: center
  max-height: inherit
  gap: $offset-2xs
  .movie,
  .food
    @include background
    @include transition
    display: flex
    flex-direction: column
    flex: 1 1 100%
    gap: $offset-2xs
    aspect-ratio: 0.6
    padding: $offset-3xs
    cursor: pointer
    user-select: none
    overflow: hidden
    &:hover
      @include transition-enter
      .img img
        @include transition-enter
        opacity: 1
    .title
      @include font(3rem, 200)
      @include transition
      display: flex
      width: fit-content
      text-transform: uppercase
      text-wrap: nowrap
      mask-image: linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2))
    .img
      @include background
      width: 100%
      height: 100%
      overflow: hidden
      mask-image: linear-gradient(135deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.2))
      img
        @include transition
        width: 100%
        height: 100%
        object-fit: cover
        object-position: top
        border-radius: $radius-default
        opacity: 0.6
        filter: grayscale(20%) contrast(90%)
    .text
      @include font(1.5rem, 200)
      color: $text-color-inactive
      align-self: end
      text-align: end
      text-transform: uppercase
      // -webkit-background-clip: text
      // -webkit-text-fill-color: transparent
      // background-clip: text
  .movie
    .title
      color: $text-color-active
    .text
      color: $text-color-active
      mask-image: linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2))
      // background-image: linear-gradient(135deg, $text-color-active, transparent)
  .food
    .title
      color: $text-color-error
    .text
      color: $text-color-error
      mask-image: linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2))
      // background-image: linear-gradient(135deg, $text-color-error, transparent)
</style>
