<script setup>
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
const model = defineModel()
</script>

<template>
  <Transition name="blur" mode="out-in" :key="placeholder" appear>
    <label class="input">
      <input :type="type" :placeholder="placeholder" v-model="model" />
    </label>
  </Transition>
</template>

<style lang="sass" scoped>
.input
  width: 100%
  height: 46px

  input
    @include background-input
    @include transition
    width: 100%
    height: 100%
    padding: 12px 15px 15px 15px
    &:hover
      @include transition-enter
</style>
