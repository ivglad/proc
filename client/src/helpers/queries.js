import api from '@/helpers/api'
import { useMutation } from '@tanstack/vue-query'

export const useSignupUser = () => {
  return useMutation({
    mutationFn: (data) => {
      return api.post('/api/auth/signup', data)
    },
    onMutate: (variables) => {},
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}

export const useSigninUser = () => {
  return useMutation({
    mutationFn: (data) => {
      return api.post('/api/auth/signin', data)
    },
    onMutate: (variables) => {},
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: () => {
      return api.get('/api/auth/logout')
    },
    onMutate: (variables) => {},
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}

export const useRefreshUser = () => {
  return useMutation({
    mutationFn: () => {
      return api.get('/api/auth/refresh')
    },
    onMutate: (variables) => {},
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}

export const useGetUsers = () => {
  return useMutation({
    mutationFn: () => {
      return api.get('/api/users')
    },
    onMutate: (variables) => {},
    onError: (error, variables, context) => {
      // console.log('useGetUsers', error)
    },
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}
