<script setup>
import { watch } from 'vue'
import { useVipProductsStore } from '@/store/vipProductsStore'
import VipProduct from '@/components/VipProduct.vue'

components: {
  VipProduct
}

const vipProductsStore = useVipProductsStore()
const products = vipProductsStore.products
</script>

<template>
  <div class="products">
    <VipProduct
      v-for="(product, index) in products"
      :key="product.id"
      v-model:product="products[index]" />
  </div>
</template>

<style lang="sass" scoped>
.products
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(min(530px, 100%), 1fr))
  grid-auto-rows: 1fr
  gap: $offset-2xs
  width: $container-width
  max-width: 1200px
  margin-top: auto
  margin-bottom: auto
</style>
