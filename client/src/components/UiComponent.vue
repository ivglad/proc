<script setup>
import { ref, reactive, computed, watch } from 'vue'
import ButtonComponent from './ui/ButtonComponent.vue'

components: {
  ButtonComponent
}
</script>

<template>
  <div class="ui">
    <ButtonComponent />
  </div>
</template>

<style lang="sass" scoped>

.ui
  display: flex
  padding: $offset-l
</style>
