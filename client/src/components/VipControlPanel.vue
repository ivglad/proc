<script setup>
import { ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import VipPlayer from '@/components/VipPlayer.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import { useVipPlayerStore } from '@/store/vipPlayerStore'
import { useVipProductsStore } from '@/store/vipProductsStore'
import { useLogoutUser } from '@/helpers/queries'

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

const showUserSettings = ref(false)
const logoutUserMutation = useLogoutUser()
const logout = async () => {
  logoutUserMutation.mutate(
    {
      email: signinData.value.email.value,
      password: signinData.value.password.value,
    },
    {
      onError: (error) => {
        
      },
      onSuccess: (data) => {
        
      },
    },
  )
}
</script>

<template>
  <nav class="control" ref="control">
    <div class="control-panel">
      <section class="main-section">
        <div class="first-block">
          <AppIcon
            name="user"
            type="button"
            @click="showUserSettings = !showUserSettings" />
          <AppIcon
            name="home"
            type="button"
            :class="{
              'icon-active':
                router.currentRoute.value.path === userStore.user.homePage,
            }"
            @click="router.push(`${userStore.user.homePage}`)" />
          <AppIcon
            name="movies"
            type="button"
            :class="{
              'icon-active': router.currentRoute.value.path === '/vip/movies',
            }"
            @click="router.push('/vip/movies')" />
          <AppIcon
            name="food"
            type="button"
            :class="{
              'icon-active': router.currentRoute.value.path === '/vip/products',
            }"
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
        </div>
      </section>
      <section class="second-section">
        <div v-if="showCart" class="cart">
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
        <VipPlayer v-if="player.mode === 'show'" class="show" />
        <div v-if="showUserSettings" class="user-settings">
          <AppButton class="user-profile" title="Профиль" />
          <AppButton class="user-logout-button" title="Выход" />
        </div>
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
  background: $background-dark
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
  .second-section
    position: absolute
    left: -1px
    bottom: calc(100% + $offset-3xs)
    display: flex
    flex-direction: column
    gap: $offset-3xs
    width: calc(100% + 2px)
    @include mq(m)
      bottom: calc(100% + $offset-4xs)
      gap: $offset-4xs
    .cart
      @include background(blur, 80)
      display: flex
      flex-direction: column
      align-self: end
      gap: $offset-5xs
      width: 12rem
      padding: $offset-3xs
      background: $background-dark
      @include mq(m)
        bottom: calc(100% + $offset-4xs)
      @include mq(s)
        width: calc(100% + 2px)
      .summ,
      .quantity
        display: flex
        justify-content: space-between
        width: 100%
        gap: $offset-5xs
        span
          text-wrap: nowrap
          color: $text-color-inactive
      .cart-button
        margin-top: $offset-3xs
    .user
      &-settings
        @include background(blur, 80)
</style>
