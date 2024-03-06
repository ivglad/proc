<script setup>
import { ref, reactive, computed, watch } from 'vue'

components: {
}

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
})

const classes = computed(() => {
  return {
    button: true,
    'button--inline': props.type === 'inline',
  }
})
</script>

<template>
  <button :class="classes" @click.prevent="">{{ title }}</button>
</template>

<style lang="sass" scoped>
.button
  @include background-button
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  min-width: min-content
  height: 46px
  padding: 12px 15px 15px 15px
  cursor: pointer
  outline: none
  border: none
  color: $text-color-default
  user-select: none
  text-wrap: nowrap
  &--inline
    @include background-button-inline
</style>
