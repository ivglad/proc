<script setup>
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'div',
  },
  size: {
    type: Number,
    default: 36,
  },
  bg: {
    type: Boolean,
    default: true,
  },
})
const SvgIcon = defineAsyncComponent(() =>
  import(`@/assets/svg/icons/${props.name}.svg`),
)

const isInteractive = computed(() => {
  return props.type === 'button' ? true : false
})

const classes = computed(() => {
  return {
    icon: true,
    'icon-bg': props.bg,
    [`icon-${props.name}`]: true,
    'icon-interactive': isInteractive.value,
  }
})
</script>

<template>
  <component :is="type" :class="classes">
    <SvgIcon />
  </component>
</template>

<style lang="sass" scoped>

.icon
  @include transition
  display: flex
  align-items: center
  justify-content: center
  width: 40px
  height: 40px
  min-width: 40px
  min-height: 40px
  padding: 0
  &:hover
    @include transition-enter
    color: $element-color-active
  &-bg
    @include background-button
  &-active
    @include transition-enter
    color: $element-color-active

  svg
    position: absolute
    transform-origin: 50%
    transform: scale(calc(v-bind(size) / 46))

  &-interactive
    cursor: pointer
</style>
