<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useGetUsers } from '@/helpers/queries'
import ControlPanel from '@/components/ControlPanel.vue'

components: {
  ControlPanel
}

const getUsersMutation = useGetUsers()
getUsersMutation.mutate({
  onError: (error) => {
    console.log('getUsersMutation onError', error)
  },
  onSuccess: (data) => {
    console.log('getUsersMutation onSuccess', data)
  },
})
</script>

<template>
  <div class="home">
    <ControlPanel />
  </div>
</template>

<style lang="sass" scoped>
.home
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
</style>
