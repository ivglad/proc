<script setup>
import { ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'

components: {
  AppButton
}

const props = defineProps({
  product: Object,
})

const emit = defineEmits(['update:product'])

const addQuantity = () => {
  emit('update:product', {
    ...props.product,
    quantity: props.product.quantity + 1,
  })
}
const reduceQuantity = () => {
  if (props.product.quantity < 1) return
  emit('update:product', {
    ...props.product,
    quantity: props.product.quantity - 1,
  })
}

const finalPrice = computed(() => {
  return props.product.quantity < 1
    ? props.product.price
    : props.product.price * props.product.quantity
})

const isSelected = ref(false)
const showCalculations = ref(false)

const selectProduct = () => {
  if (isSelected.value && props.product.quantity < 1) {
    isSelected.value = false
    showCalculations.value = false
    return
  }
  if (props.product.quantity == 0) {
    addQuantity()
  }
  isSelected.value = true
  showCalculations.value = true
}

const classes = computed(() => {
  return {
    'product-select': isSelected.value,
  }
})
</script>

<template>
  <div class="product" :class="classes" @click="selectProduct">
    <div class="img">
      <picture>
        <source
          srcset="../assets/img/vip/products-logo.webp"
          type="image/webp" />
        <img src="../assets/img/vip/products-logo.jpg" :alt="product.title" />
      </picture>
    </div>
    <div class="info">
      <div class="title">
        {{ product.title }}
      </div>
      <div class="info__top">
        <div class="description">
          {{ product.description }}
        </div>
        <div class="portion">
          <span>Порция:</span>
          {{ product.portion }}
        </div>
      </div>
      <div
        class="info__bottom"
        :class="{ 'hide-calculations': !showCalculations }">
        <AppButton
          class="button-reduce"
          :disabled="product.quantity < 1"
          title="-"
          @click="reduceQuantity" />
        <div class="quantity">
          {{ product.quantity }}
        </div>
        <AppButton class="button-add" title="+" @click="addQuantity" />
        <div class="price">{{ finalPrice }} ₽</div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.product
  @include background
  display: flex
  gap: $offset-2xs
  width: 100%
  height: 100%
  max-height: 18rem
  padding: $offset-3xs
  overflow: hidden
  @include mq(s)
    flex-direction: column
    gap: $offset-3xs
    max-height: 35rem
  @include active
    @include background-active-error
    .title
      @include transition-enter
      color: $text-color-error
  .img
    flex: 1 1 25%
    min-width: 200px
    aspect-ratio: 0.8
    mask-image: linear-gradient(135deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.2))
    @include mq(s)
      max-width: 100%
      aspect-ratio: 1.8
    img
      border-radius: $radius-default
      @include mq(s)
        object-position: 10% top
  .info
    display: flex
    flex-direction: column
    flex: 1 1 75%
    gap: $offset-5xs
    overflow: hidden
    @include mq(s)
    gap: $offset-3xs
    .title
      @include font(2rem, 300, 100%)
      @include transition
      padding-right: clamp($offset-4xs, $index, $offset-xs)
      padding-bottom: $offset-3xs
    &__top
      display: flex
      flex-wrap: wrap
      gap: $offset-5xs
      max-width: 100%
      padding-right: clamp($offset-4xs, $index, $offset-xs)
      div
        span
          text-wrap: nowrap
          color: $text-color-inactive
      .portion
        @include font($font-size-2xl, 300)
        color: $text-color-inactive
    div
      span
        height: min-content
        text-wrap: nowrap
        color: $text-color-inactive
    &__bottom
      display: flex
      align-items: center
      gap: $offset-3xs
      margin-top: auto
      .button-reduce,
      .button-add
        @include font(1.25rem, 300)
        width: 42px
      .quantity
        @include font($font-size-2xl, 300)
        @include transition
        display: flex
        align-items: center
        justify-content: center
        min-width: 42px
      .price
        @include font($font-size-2xl, 300)
        margin-left: auto
        text-wrap: nowrap

    .hide-calculations
      .button-reduce,
      .button-add,
      .quantity
        opacity: 0
      .quantity
        @include transition-enter

  &-select
    @include background-active-error
    .title
      @include transition-enter
      color: $text-color-error
</style>
