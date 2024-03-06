<script setup>
import { ref, reactive, computed, watch } from 'vue'

components: {
}

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <label class="input">
    <input type="text" :placeholder="placeholder" />
  </label>
</template>

<style lang="sass" scoped>
.input
  width: 100%
  height: 46px

  input
    @include background-input
    width: 100%
    height: 100%
    padding: 12px 15px 15px 15px
</style>
