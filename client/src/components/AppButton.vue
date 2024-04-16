<script setup>
import { computed } from 'vue'

components: {
}

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
  styleType: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const classes = computed(() => {
  return {
    'button-inline': props.styleType === 'inline',
    'button-disabled': props.disabled,
  }
})
</script>

<template>
  <!-- <Transition name="blur" mode="out-in" :key="title" appear> -->
  <button :type="type" class="button" :class="classes" @click.prevent>
    {{ title }}
  </button>
  <!-- </Transition> -->
</template>

<style lang="sass" scoped>
.button
  @include background-button
  @include active
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  min-width: min-content
  height: 2.625rem
  padding: 0.625rem 1rem 0.8rem 1rem
  cursor: pointer
  outline: none
  border: 1px solid $border-color-default
  color: $text-color-default
  user-select: none
  text-align: center
  text-wrap: nowrap
  &-inline
    @include background-button-inline
  &-disabled
    @include background-button-disabled
</style>
