import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { apiUser, apiIdentity } from '@/api'

const isDev = process.env.NODE_ENV.trim() === 'dev'

export const useUserStore = defineStore('user', () => {
  const userToken = ref('')
  const isLogin = ref(false)
  const profile = ref({})
  const identities = ref([])
  const currentIdentity = ref({})
  const { cookies } = useCookies()

  const setUserToken = (token) => {
    const cookieToken = cookies.get('idiary_token')
    if (cookieToken !== token) {
      cookies.set('idiary_token', token, {
        domain: isDev ? 'http://localhost:5173' : 'https://tr-blank.github.io',
        maxAge: 24 * 60 * 60, //一天
        path: '/'
      })
    }
    userToken.value = token
    isLogin.value = true
  }
  const getProfile = async () => {
    const { data } = await apiUser.getProfile()
    profile.value = {
      id: data._id,
      account: data.account,
      email: data.email
    }
    currentIdentity.value = data.current_identity
    identities.value = []
    data.identity.forEach((identity) => {
      identities.value.push(identity)
    })
    return data
  }
  // const getIdentities = async () => {
  //   const { data } = await apiUser.getProfile()
  //   profile.value = data
  // }
  const singUp = async (formData) => {
    try {
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
  const logout = async () => {
    try {
      const cookieToken = cookies.get('idiary_token')
      if (cookieToken) {
        cookies.remove('idiary_token')
      }
      userToken.value = ''
      isLogin.value = false
      profile.value = {}
      identities.value = []
      currentIdentity.value = {}
    } catch (error) {
      console.log(error)
      throw error.data
    }
  }
  return {
    userToken,
    isLogin,
    profile,
    identities,
    currentIdentity,
    login,
    logout,
    singUp,
    getProfile,
    setUserToken
  }
})
