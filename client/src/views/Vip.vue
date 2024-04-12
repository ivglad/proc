<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="vip">
    <div class="tiles">
      <div class="movies" @click="router.push('/vip/movies')">
        <div class="title">Фильмы</div>
        <div class="img">
          <picture>
            <source
              srcset="../assets/img/vip/movies-logo.webp"
              type="image/webp" />
            <img src="../assets/img/vip/movies-logo.jpg" alt="Фильмы" />
          </picture>
        </div>
        <div class="text">
          Может
          <br class="break" />
          кино?
        </div>
      </div>
      <div class="products" @click="router.push('/vip/products')">
        <div class="title">Меню</div>
        <div class="img">
          <picture>
            <source
              srcset="../assets/img/vip/products-logo.webp"
              type="image/webp" />
            <img src="../assets/img/vip/products-logo.jpg" alt="Еда" />
          </picture>
        </div>
        <div class="text">
          Хочу
          <br class="break" />
          есть!
        </div>
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
  @include mq(s)
    flex-direction: column
  .movies,
  .products
    @include background
    @include transition
    display: flex
    flex-direction: column
    flex: 1 1 100%
    gap: $offset-2xs
    min-width: 140px
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
    @include mq(s)
      gap: $offset-4xs
    .title
      @include font(3rem, 200)
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
      .break
        @include mq(s)
          display: none
  .movies
    .title
      color: $text-color-active
    .text
      color: $text-color-active
      mask-image: linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2))
  .products
    .title
      color: $text-color-food
    .text
      color: $text-color-food
      mask-image: linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2))
</style>
