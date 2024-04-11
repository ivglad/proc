<script setup>
import { ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import VipPlayer from '@/components/VipPlayer.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import { useVipPlayerStore } from '@/store/vipPlayerStore'
import { useVipProductsStore } from '@/store/vipProductsStore'

components: {
  AppButton, AppIcon
}

const router = useRouter()
const userStore = useUserStore()
const vipPlayerStore = useVipPlayerStore()
const player = vipPlayerStore.player
const vipProductsStore = useVipProductsStore()
const products = vipProductsStore.products

const showCart = ref(false)
const cartCounter = computed(() => {
  let counter = 0
  products.forEach((product) => {
    if (product.quantity > 0) {
      counter += product.quantity
    }
  })
  return counter
})
const cartSumm = computed(() => {
  let summ = 0
  products.forEach((product) => {
    if (product.quantity > 0) {
      summ += product.price * product.quantity
    }
  })
  return summ
})
</script>

<template>
  <nav class="control" ref="control">
    <div class="control-panel">
      <section class="main-section">
        <div class="first-block">
          <AppIcon name="user" type="button" />
          <AppIcon
            name="home"
            type="button"
            @click="router.push(`${userStore.user.homePage}`)" />
          <AppIcon
            name="movies"
            type="button"
            @click="router.push('/vip/movies')" />
          <AppIcon
            name="food"
            type="button"
            @click="router.push('/vip/products')" />
        </div>
        <div class="center-block">
          <VipPlayer v-if="player.mode === 'hide'" />
        </div>
        <div class="third-block">
          <AppIcon
            name="cart"
            type="button"
            :info="cartCounter > 0 ? `${cartCounter}` : ''"
            @click="showCart = !showCart" />
          <div class="cart" v-if="showCart">
            <div class="summ">
              <span>Сумма:</span>
              {{ cartSumm }} ₽
            </div>
            <div class="quantity">
              <span>Позиций:</span>
              {{ cartCounter }}
            </div>
            <AppButton class="cart-button" title="Заказать" />
          </div>
        </div>
      </section>
      <section class="second-section">
        <VipPlayer v-if="player.mode === 'show'" class="show" />
      </section>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
.control
  display: flex
  justify-content: center
  width: $container-width
  height: 72px
  margin-bottom: $offset-3xs
  @include mq(s)
    height: 134px

.control-panel
  @include background(blur, 80)
  position: fixed
  bottom: $offset-3xs
  display: flex
  align-items: center
  width: $container-width
  max-width: 1000px
  background: rgba(36, 36, 36, 0.7)
  @include mq(xs)
    width: 100%
  .main-section
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    gap: $offset-2xs $offset-xs
    padding: $offset-3xs $offset-xs
    width: 100%
    div
      display: flex
      align-items: center
      flex: 0 1 auto
      gap: 0 $offset-3xs
    .first-block
      min-height: 48px
      @include mq(s)
        order: 2
    .center-block
      flex: 1 0 max-content
      @include mq(s)
        flex: 1 1 100%
      .main-player
        position: absolute
        left: 0
        bottom: calc(100% + $offset-3xs)
        display: flex
        width: 100%
    .third-block
      @include mq(s)
        order: 3
      .cart
        @include background(blur, 80)
        position: absolute
        bottom: calc(100% + $offset-3xs)
        right: 0
        display: flex
        flex-direction: column
        gap: $offset-5xs
        min-width: 12rem
        padding: $offset-3xs
        .summ,
        .quantity
          display: flex
          // align-self: start
          justify-content: space-between
          width: 100%
          gap: $offset-5xs
          span
            text-wrap: nowrap
            color: $text-color-inactive
        .cart-button
          margin-top: $offset-3xs

  .second-section
    position: absolute
    bottom: calc(100% + $offset-3xs)
    display: flex
    width: 100%
    @include mq(m)
      bottom: calc(100% + $offset-4xs)
</style>
