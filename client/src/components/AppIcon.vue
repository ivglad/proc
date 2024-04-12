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
  info: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 38,
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
    [`icon-${props.name}`]: true,
    'icon-bg': props.bg,
    'icon-interactive': isInteractive.value,
  }
})
</script>

<template>
  <component :is="type" class="icon" :class="classes">
    <SvgIcon />
    <Transition name="blur" mode="out-in">
      <div class="info" v-show="props.info">{{ props.info }}</div>
    </Transition>
  </component>
</template>

<style lang="sass" scoped>

.icon
  @include transition
  display: flex
  align-items: center
  justify-content: center
  width: 42px
  height: 42px
  min-width: 42px
  min-height: 42px
  padding: 0
  &:hover
    @include transition-enter
    color: $element-color-active
  &-bg
    @include background-button
  &-active
    @include transition-enter
    color: $element-color-active
  &-interactive
    cursor: pointer
  svg
    position: absolute
    transform-origin: 50%
    transform: scale(calc(v-bind(size) / 46))
  .info
    @include background-active(default, 20)
    @include font(0.75rem, 400)
    position: absolute
    bottom: calc(100% - 10px)
    left: calc(100% - 10px)
    min-width: 20px
    height: 20px
    padding: 1px 2px 2px 2px
    color: $text-color-active
    border-radius: 8px
    border: 1px solid $border-color-active
</style>
