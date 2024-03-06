<script setup>
import { ref, reactive, computed, watch } from 'vue'
import ButtonComponent from './ui/ButtonComponent.vue'
import InputComponent from './ui/InputComponent.vue'

components: {
  ButtonComponent
  InputComponent
}
</script>

<template>
  <div class="home">
    <form class="form">
      <h1 class="h1">Войдите <br />или зарегистрируйтесь</h1>
      <div class="inputs">
        <InputComponent placeholder="Email" />
        <InputComponent placeholder="Пароль" />
      </div>
      <div class="buttons">
        <ButtonComponent title="Регистрация" type="inline" />
        <ButtonComponent title="Вход" />
      </div>
    </form>
  </div>
</template>

<style lang="sass" scoped>
.home
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%

.form
  @include background
  display: flex
  flex-direction: column
  gap: $offset-m
  padding: $offset-m
  min-width: 400px
  .inputs
    display: flex
    flex-direction: column
    gap: $offset-xs
  .buttons
    display: flex
    justify-content: space-between
    gap: $offset-xs
</style>
