<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="vip">
    <div class="tiles">
      <div class="movie">
        <div class="title">Фильмы</div>
        <div class="img">
          <picture>
            <img src="../assets/img/vip/movies-logo.jpg" alt="Фильмы" />
          </picture>
        </div>
        <div class="text">Может<br />кино?</div>
      </div>
      <div class="food">
        <div class="title">Меню</div>
        <div class="img">
          <picture>
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
  width: 100%
  height: 100%

.tiles
  display: flex
  justify-content: center
  width: $container-width
  gap: calc(1vh * 2) calc(1vw * 3)
  .movie,
  .food
    @include background-button(blur, 80)
    @include transition
    display: flex
    flex-direction: column
    gap: calc(1vh * 2) calc(1vw * 3)
    aspect-ratio: 0.76
    width: calc(1vh * 50)
    padding: $offset-2xs
    cursor: pointer
    &:hover
      @include transition-enter
      .img img
        @include transition-enter
        opacity: 1
    .title
      @include font(calc($index * 3))
      text-transform: uppercase
    .img
      @include background
      width: 100%
      max-width: 450px
      height: 100%
      max-height: 580px
      img
        @include transition
        width: 100%
        height: 100%
        object-fit: cover
        border-radius: $radius-default
        opacity: 0.6
        filter: grayscale(20%) contrast(90%)
    .text
      @include font(calc($index * 1.5))
      align-self: end
      text-align: end
      text-transform: uppercase
</style>
