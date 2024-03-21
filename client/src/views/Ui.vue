<script setup>
import { ref, reactive, computed, watch } from 'vue'
import AppButton from '@/components/AppButton.vue'

components: {
  AppButton
}
</script>

<template>
  <div class="ui">
    <AppButton />
  </div>
</template>

<style lang="sass" scoped>

.ui
  display: flex
  padding: $offset-l
</style>
