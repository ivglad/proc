<script setup>
import { ref } from 'vue'
import TheHome from '@/components/TheHome.vue'
import { useGetUsers } from '@/services/queries'

components: {
  TheHome
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
  <TheHome />
</template>

<style lang="sass" scoped></style>
