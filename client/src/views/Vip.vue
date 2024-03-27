<script setup>
import { ref } from 'vue'
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
        <div class="text">Может кино?</div>
      </div>
      <div class="food">
        <div class="title">Меню</div>
        <div class="img">
          <picture>
            <img src="../assets/img/vip/food-logo.jpg" alt="Еда" />
          </picture>
        </div>
        <div class="text">Хочу есть!</div>
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
  gap: $offset-l
  .movie,
  .food
    @include background(default, 80)
    display: flex
    flex-direction: column
    // flex: 1 1 40%
    // max-width: 40%
    // width: 100%

    .img
      width: 100%
      max-width: 450px
      height: 100%
      max-height: 580px
      img
        width: 100%
        height: 100%
        object-fit: cover
</style>
