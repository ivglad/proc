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
  @include transition
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  min-width: min-content
  height: 42px
  padding: 12px 15px 15px 15px
  margin: 1px
  cursor: pointer
  outline: none
  border: none
  color: $text-color-default
  user-select: none
  text-wrap: nowrap
  &:hover
    @include transition-enter
  &-inline
    @include background-button-inline
  &-disabled
    @include background-button-disabled
</style>
