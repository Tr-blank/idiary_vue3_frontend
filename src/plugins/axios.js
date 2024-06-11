import axios from 'axios'
import { useUserStore } from '@/stores/user'

// create an axios instance
const instance = axios.create({
  // baseURL: 'https://idiary-express-api.onrender.com',
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// request interceptor
instance.interceptors.request.use(
  (request) => {
    const userStore = useUserStore()
    const token = userStore?.userToken
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  (response) => {
    const res = response.data
    const SUCCESS_CODE = /^20[0-9]$/
    if (!SUCCESS_CODE.test(res.status) && !SUCCESS_CODE.test(response.status)) {
      console.error(`🚨 [API] ${response.config.url.replace(response.config.baseURL, '')}`, res)
    }
    return res
  },
  (error) => {
    console.log('instance.interceptors.response', error)
    // const isAuthMe = error?.request?.responseURL?.includes('auth/me')

    // const status = error?.response?.data?.status ?? error?.response?.status
    // if (status === 401) {
    //   store.dispatch('auth/logout')

    //   if (isAuthMe) {
    //     router.push('/')
    //   } else {
    //     store.dispatch('auth/login', router.currentRoute.value.fullPath)
    //   }
    // }

    // if (error.response) {
    //   console.error('🚨 [API ERR] ' + error)
    // } else if (error.request) {
    //   console.error('🚨 [REQUEST ERR] ' + error)
    // } else {
    //   console.error('🚨 [UNKNOWN ERR] ' + error)
    // }
    return Promise.reject(error.response)
  }
)

export default instance
