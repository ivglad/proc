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
  errors: {
    type: Array,
    default: () => [],
  },
})

const model = defineModel()
defineEmits(['update:errors'])

const inputClasses = computed(() => {
  return {
    error: props.errors.length > 0,
  }
})

const showInfo = ref(false)
</script>

<template>
  <!-- <Transition name="blur" mode="out-in" :key="placeholder" appear> -->
  <div class="input-wrap">
    <label class="input" :class="inputClasses">
      <input
        :type="type"
        :placeholder="placeholder"
        v-model.trim="model"
        @focus="$emit('update:errors', [])" />
    </label>
    <div
      class="info"
      :class="{ 'show-info': showInfo }"
      @mouseenter="showInfo = true"
      @mouseleave="showInfo = false"
      v-if="props.errors.length">
      <div class="info-errors" v-show="showInfo">
        <span v-for="error in props.errors" :key="error">
          {{ error }}
        </span>
      </div>
      <div class="info-icon">!</div>
    </div>
  </div>
  <!-- </Transition> -->
</template>

<style lang="sass" scoped>
.input
  display: flex
  width: 100%
  height: 100%
  &-wrap
      position: relative
      display: flex
      align-items: center
      width: 100%
      height: 46px
      .info
        position: absolute
        content: ""
        right: 0
        height: 100%
        display: flex
        align-items: center
        justify-content: end
        border-radius: 14px
        cursor: pointer
        user-select: none
        padding: 0 15px
        &-errors
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          height: 100%
          font-size: 12px
          padding: 0px 10px 0px 0px
          color: $text-color-error
        &-icon
          font-size: 14px
          font-weight: bold
          color: $text-color-error

      .show-info
        @include background(default, 20)
        position: absolute

  input
    @include background-input
    @include transition
    width: 100%
    height: 100%
    padding: 12px 35px 15px 15px
    &:hover
      @include transition-enter


.error
  input
    @include background-input-error
</style>
