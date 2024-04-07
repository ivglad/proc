<script setup>
import { ref } from 'vue'
import VipMovie from '@/components/VipMovie.vue'
import { useVipMoviesStore } from '@/store/vipMoviesStore'

components: {
  VipMovie
}

const vipMoviesStore = useVipMoviesStore()
const movies = vipMoviesStore.movies
</script>

<template>
  <router-view />
  <div class="movies">
    <VipMovie v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<style lang="sass" scoped>
.movies
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(min(530px, 100%), 1fr))
  grid-auto-rows: 1fr
  gap: $offset-2xs
  width: $container-width
  max-width: 1200px
  margin-top: auto
  margin-bottom: auto

:deep(.movie)
  @include active
    @include background-active
    .title
      @include transition-enter
      color: $text-color-active
</style>
