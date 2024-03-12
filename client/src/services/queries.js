import axios from 'axios'
import { useMutation } from '@tanstack/vue-query'

export const useSignupUser = () => {
  return useMutation({
    mutationFn: (data) => {
      return axios.post('/api/auth/signup', data)
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
      return axios.post('/api/auth/signin', data)
    },
    onMutate: (variables) => {},
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: (data) => {
      return axios.post('/api/auth/logout', data)
    },
    onMutate: (variables) => {},
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}

export const useRefreshUser = () => {
  return useMutation({
    mutationFn: (data) => {
      return axios.post('/api/auth/refresh', data)
    },
    onMutate: (variables) => {},
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}
