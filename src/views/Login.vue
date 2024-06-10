<script setup>
import { reactive } from 'vue'
// import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user'
const store = useUserStore()
const loginForm = reactive({
  email: '',
  password: ''
})

// 将 action 作为 store 的方法进行调用
// store.login()
const login = () => {
  // console.log('page login function', loginForm)
  const res = store.login(loginForm)
  console.log(res)
}
</script>

<template>
  <main class="my-10 flex items-center justify-center">
    <div class="bg-white border border-gray-300 p-6 rounded w-full max-w-xl">
      <h1 class="text-center text-4xl pt-3 pb-6">註冊 / 登入</h1>
      <el-form label-position="top" label-width="auto" :model="loginForm" class="max-w-80 mx-auto">
        <el-form-item label="常用信箱">
          <el-input v-model="loginForm.email" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-button color="#F59E0C" :dark="false" class="w-full mt-4 mb-10" @click="login">
          <span class="font-bold text-white">註冊/登入</span>
        </el-button>
      </el-form>
    </div>
  </main>
</template>
