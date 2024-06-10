import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiUser } from '@/api'

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
  const login = (postData) => {
    try {
      // console.log('stores', postData)
      const res = apiUser.login(postData)
      // console.log(res)
      userToken.value = res.user.token
      return res
    } catch (error) {
      console.log(error)
    }
  }
  return { userToken, login }
})
