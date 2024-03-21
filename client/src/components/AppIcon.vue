<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'div',
  },
})
const SvgIcon = defineAsyncComponent(() =>
  import(`@/assets/svg/icons/${props.name}.svg`),
)
</script>

<template>
  <component :is="type" :class="`icon icon-${name}`">
    <SvgIcon />
  </component>
</template>

<style lang="sass" scoped>
.icon
  @include background-button
  @include transition
  display: flex
  align-items: center
  justify-content: center
  width: 46px
  height: 46px
  padding: 0
</style>
