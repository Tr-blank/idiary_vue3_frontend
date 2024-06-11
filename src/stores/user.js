import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { apiUser } from '@/api'

const isDev = process.env.NODE_ENV.trim() === 'dev'
// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

export const useUserStore = defineStore('user', () => {
  const userToken = ref('')
  const isLogin = ref(false)
  const profile = ref({})
  // const identities = ref([])

  const setUserToken = (token) => {
    const { cookies } = useCookies()
    const cookieValue = { userToken: token }
    cookies.set('idiary', cookieValue, {
      domain: isDev ? 'http://localhost:5173' : 'https://tr-blank.github.io',
      maxAge: 24 * 60 * 60, //一天
      path: '/'
    })
    userToken.value = token
    isLogin.value = true
  }

  const getProfile = async () => {
    const { data } = await apiUser.getProfile()
    profile.value = { data }
    return data
  }
  // const getIdentities = async () => {
  //   const { data } = await apiUser.getProfile()
  //   profile.value = data
  // }
  const singUp = async (formData) => {
    try {
      // console.log('stores', postData)
      const account = formData.email.split('@')[0]
      const postData = {
        ...formData,
        account
      }
      const { data } = await apiUser.singUp(postData)
      setUserToken(data.user.token)
      await getProfile()
      return data
    } catch (error) {
      console.log(error)
      throw error.data
    }
  }
  const login = async (postData) => {
    try {
      const { data } = await apiUser.login(postData)
      setUserToken(data.user.token)
      await getProfile()
      return data
    } catch (error) {
      console.log(error)
      throw error.data
    }
  }
  return { userToken, isLogin, profile, login, singUp, getProfile }
})
