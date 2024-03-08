<script setup>
import { ref, reactive, computed, watch } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import axios from 'axios'

components: {
  AppButton
  AppInput
}

const signupData = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
  name: '',
})

const signinData = ref({
  email: '',
  password: '',
})

const formState = ref('signin')

const changeForm = () => {
  formState.value = formState.value === 'signin' ? 'signup' : 'signin'
}

const signupDataValid = () => {}

const signUp = async () => {
  if (!signupDataValid) return
  const request = await axios.post('/api/auth/signup', signupData.value)
}

const signIn = async () => {
  const request = await axios.post('/api/auth/signin', signinData.value)
}
</script>

<template>
  <div class="auth">
    <div class="form-wrap">
      <div class="title h1">
        <span
          :class="[formState === 'signin' ? 'title-active' : 'title-inactive']">
          Войдите
        </span>
        <span class="title-separator">или</span>
        <span
          :class="[formState === 'signup' ? 'title-active' : 'title-inactive']">
          Зарегистрируйтесь
        </span>
      </div>
      <Transition name="transform" mode="out-in" appear>
        <form v-if="formState === 'signin'" class="form">
          <div class="inputs">
            <AppInput v-model="signinData.email" placeholder="Email" />
            <AppInput
              v-model="signinData.password"
              type="password"
              placeholder="Пароль" />
          </div>
          <div class="buttons">
            <AppButton
              class="signup-button"
              type="submit"
              title="Регистрация"
              styleType="inline"
              @click="changeForm" />
            <AppButton class="signin-button" title="Вход" @click="signIn" />
          </div>
        </form>
        <form v-else-if="formState === 'signup'" class="form">
          <div class="inputs">
            <AppInput v-model="signupData.email" placeholder="Email" />
            <AppInput
              v-model="signupData.password"
              type="password"
              placeholder="Пароль" />
            <AppInput
              v-model="signupData.passwordConfirm"
              type="password"
              placeholder="Пароль еще раз" />
            <AppInput v-model="signupData.username" placeholder="Никнейм" />
            <AppInput v-model="signupData.name" placeholder="Ваше имя" />
          </div>
          <div class="buttons">
            <AppButton
              class="signin-button"
              title="Назад"
              styleType="inline"
              @click="changeForm" />
            <AppButton
              class="signup-button"
              type="submit"
              title="Отправить"
              @click="signUp" />
          </div>
        </form>
      </Transition>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.auth
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%

.form
  @include transition
  display: flex
  flex-direction: column
  gap: $offset-m
  &-wrap
    @include transition
    @include background
    display: flex
    flex-direction: column
    gap: $offset-m
    padding: $offset-m
    min-width: 400px
    .title
      display: flex
      flex-direction: column
      &-active
        @include transition
        color: $text-color-active
      &-inactive
        @include transition
        color: $text-color-default
      &-separator
        color: $text-color-default
        // color: $text-color-inactive

  .inputs
    display: flex
    flex-direction: column
    gap: $offset-xs
    &-signup
      display: flex
      flex-direction: column
      gap: $offset-xs
  .buttons
    display: flex
    justify-content: space-between
    gap: $offset-xs
    flex-flow: row
    .signup-button
      // @include transition(all, 0.9s)
      // order: 1
    .signin-button
      // order: 2

  &-signup
    .buttons
      display: flex
      flex-flow: row-reverse
      .signup-button
        // @include transition-enter(all, 0.9s)
      .signin-button
        // order: 1
</style>
