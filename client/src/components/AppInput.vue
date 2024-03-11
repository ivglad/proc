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
const infoClasses = computed(() => {
  return {
    'info-show': props.errors.length > 0,
  }
})
</script>

<template>
  <Transition name="blur" mode="out-in" :key="placeholder" appear>
    <div class="input-wrap">
      <label class="input" :class="inputClasses">
        <input
          :type="type"
          :placeholder="placeholder"
          v-model.trim="model"
          @focus="$emit('update:errors', [])" />
      </label>
      <!-- <Transition name="blur"> -->
      <div
        class="info"
        @mouseenter="showInfo = true"
        @mouseleave="showInfo = false"
        v-if="props.errors.length">
        <Transition name="blur" mode="out-in">
          <div class="info-errors" v-show="showInfo">
            <span v-for="error in props.errors" :key="error">
              {{ error }}
            </span>
          </div>
        </Transition>
        <div class="info-icon">!</div>
      </div>
      <!-- </Transition> -->
    </div>
  </Transition>
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
        @include background(blur, 20)
        @include transition
        position: absolute
        content: ""
        right: 0
        display: flex
        align-items: center
        justify-content: end
        border-radius: 14px
        cursor: pointer
        user-select: none
        padding: 0 15px
        &-errors
          // @include background(blur, 20)
          @include transition
          display: flex
          flex-direction: column
          font-size: 12px
          padding: 12px 0 15px 15px
          color: $text-color-error
        &-icon
          font-size: 14px
          font-weight: bold
          color: $text-color-error
          // margin: 0 15px

        &:hover

      .info-show
        @include background(blur, 20)
        @include background-input-error
        @include transition-enter
        position: absolute
        content: ""
        right: 0

  input
    @include background-input
    @include transition
    width: 100%
    height: 100%
    padding: 12px 15px 15px 15px
    &:hover
      @include transition-enter


.error
  input
    @include background-input-error
</style>
