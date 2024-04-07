<script setup>
import { computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import VipMovie from '@/components/VipMovie.vue'
import { useVipMoviesStore } from '@/store/vipMoviesStore'
import { useVipPlayerStore } from '@/store/vipPlayerStore'

components: {
  VipMovie
}
const router = useRouter()

const vipPlayerStore = useVipPlayerStore()
const player = vipPlayerStore.player
onBeforeMount(() => {
  player.mode = 'show'
})
onBeforeUnmount(() => {
  player.mode = 'hide'
})

const vipMoviesStore = useVipMoviesStore()
const movies = vipMoviesStore.movies
const movie = computed(() => {
  return movies.find((movie) => movie.id == router.currentRoute.value.params.id)
})
</script>

<template>
  <div class="movie-play">
    <VipMovie :movie="movie" />
  </div>
</template>

<style lang="sass" scoped>
.movie-play
  display: flex
  align-items: center
  justify-content: center
  width: $container-width
  max-width: 1200px
  max-height: calc(100vh - $controlPanelHeight - $offset-3xs - $offset-xs * 2)
  :deep(.movie)
    height: min-content
    max-height: inherit
    cursor: default
    .img
      min-width: 200px
    .info
      gap: $offset-4xs
      &__top
        flex-direction: column
        gap: $offset-4xs
</style>
