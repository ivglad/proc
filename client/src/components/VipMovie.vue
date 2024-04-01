<script setup>
const props = defineProps({
  movie: Object,
});
</script>

<template>
  <div class="movie">
    <div class="img">
      <picture>
        <source :srcset="`${movie.image}.webp`" type="image/webp" />
        <img :src="`${movie.image}.jpg`" :alt="movie.title" />
      </picture>
    </div>
    <div class="info"></div>
  </div>
</template>

<style lang="sass" scoped></style>
