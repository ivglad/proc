<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { useSignupUser, useSigninUser } from '@/services/queries'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'

components: {
  AppButton
  AppInput
}

const authStore = useAuthStore()

const router = useRouter()

const signupData = ref({
  email: {
    value: '',
    errors: [],
  },
  password: {
    value: '',
    errors: [],
  },
  passwordConfirm: {
    value: '',
    errors: [],
  },
  username: {
    value: '',
    errors: [],
  },
  name: {
    value: '',
    errors: [],
  },
})

const signinData = ref({
  email: {
    value: '',
    errors: [],
  },
  password: {
    value: '',
    errors: [],
  },
})

const formState = ref('signin')

const changeForm = () => {
  formState.value = formState.value === 'signin' ? 'signup' : 'signin'
}

const validator = (data) => {
  let valid = true
  const checkErrors = (key) => {
    const value = data[key].value
    let errors = data[key].errors
    if (value === '') {
      errors.push('Поле не может быть пустым')
      valid = false
      return
    }
    if (key === 'email') {
      const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      if (!pattern.test(value)) {
        errors.push('Некорректный email')
        valid = false
      }
    }
    if (key === 'password') {
      if (value.length < 6) {
        errors.push('Пароль должен быть более 6 символов')
        valid = false
      }
    }
    if (key === 'passwordConfirm') {
      if (data['password'].value !== value) {
        errors.push('Пароли не совпадают')
        valid = false
      }
    }
    if (key === 'username') {
      if (value.length < 2) {
        errors.push('Никнейм должен быть более 2 символов')
        valid = false
      }
    }
    if (key === 'name') {
      if (value.length < 2) {
        errors.push('Имя должно быть более 2 символов')
        valid = false
      }
    }
  }

  const keys = Object.keys(data)
  const clearErrors = () => {
    keys.forEach((key) => {
      data[key].errors = []
    })
  }
  clearErrors()

  keys.forEach((key) => {
    checkErrors(key)
  })

  return valid
}

const signinUserMutation = useSigninUser()
const signin = async () => {
  if (!validator(signinData.value)) return false

  signinUserMutation.mutate(
    {
      email: signinData.value.email.value,
      password: signinData.value.password.value,
    },
    {
      onError: (error) => {
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message

        if (errorMessage.indexOf('пароль') >= 0) {
          signinData.value.password.errors.push(errorMessage)
        } else {
          signinData.value.email.errors.push(errorMessage)
        }
      },
      onSuccess: (data) => {
        authStore.user = data.data
        router.push('/')
      },
    },
  )
}

const signupUserMutation = useSignupUser()
const signup = async () => {
  if (!validator(signupData.value)) return false

  signupUserMutation.mutate(
    {
      email: signupData.value.email.value,
      password: signupData.value.password.value,
      username: signupData.value.username.value,
      name: signupData.value.name.value,
    },
    {
      onError: (error) => {
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message

        if (errorMessage.indexOf('никнейм') >= 0) {
          signupData.value.username.errors.push(errorMessage)
        } else {
          signupData.value.email.errors.push(errorMessage)
        }
      },
      onSuccess: (data) => {
        signinData.email.value = ''
        signinData.email.errors = []
        signinData.password.value = ''
        signinData.password.errors = []
        formState.value = 'signin'
      },
    },
  )
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
          зарегистрируйтесь
        </span>
      </div>
      <Transition name="blur" mode="out-in">
        <form v-if="formState === 'signin'" class="form" key="signin">
          <div class="inputs">
            <AppInput
              v-model="signinData.email.value"
              v-model:errors="signinData.email.errors"
              placeholder="Email" />
            <AppInput
              v-model="signinData.password.value"
              v-model:errors="signinData.password.errors"
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
            <AppButton class="signin-button" title="Вход" @click="signin" />
          </div>
        </form>
        <form v-else-if="formState === 'signup'" class="form" key="signun">
          <div class="inputs">
            <AppInput
              v-model="signupData.email.value"
              v-model:errors="signupData.email.errors"
              placeholder="Email" />
            <AppInput
              v-model="signupData.password.value"
              v-model:errors="signupData.password.errors"
              type="password"
              placeholder="Пароль" />
            <AppInput
              v-model="signupData.passwordConfirm.value"
              v-model:errors="signupData.passwordConfirm.errors"
              type="password"
              placeholder="Пароль еще раз" />
            <AppInput
              v-model="signupData.username.value"
              v-model:errors="signupData.username.errors"
              placeholder="Никнейм" />
            <AppInput
              v-model="signupData.name.value"
              v-model:errors="signupData.name.errors"
              placeholder="Ваше имя" />
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
              @click="signup" />
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
    @include background(blur, 20)
    display: flex
    flex-direction: column
    gap: $offset-m
    padding: $offset-m
    min-width: 400px
    .title
      display: flex
      flex-wrap: wrap
      gap: 0 5px
      span:first-child
        width: 100%
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
