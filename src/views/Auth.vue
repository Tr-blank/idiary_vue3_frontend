<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { apiUser } from '@/api'
const router = useRouter()
const userStore = useUserStore()
const isUniqueEmail = ref(false)
const isbButtonLoading = ref(false)
const refForm = ref()
const errorMessage = ref('')
const formData = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const formRules = computed(() => {
  return {
    email: [
      { required: true, message: '請輸入常用信箱', trigger: 'blur' },
      { type: 'email', message: '信箱格式有誤', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '請輸入密碼', trigger: 'blur' },
      { min: 8, message: '密碼長度至少要8字元', trigger: 'blur' }
    ],
    ...(isUniqueEmail.value
      ? {
          confirmPassword: [
            { required: true, message: '請再次輸入密碼', trigger: 'blur' },
            { min: 8, message: '密碼長度至少要8字元', trigger: 'blur' }
          ]
        }
      : {})
  }
})

const validateEmail = () => {
  return new Promise((resolve) => {
    refForm.value.validateField('email', (valid) => {
      resolve(valid)
    })
  })
}

const onEmailBlur = async () => {
  const valid = await validateEmail()
  if (valid) {
    const postData = {
      email: formData.email
    }
    const { data } = await apiUser.checkEmailUnique(postData)
    isUniqueEmail.value = data.isEmailUnique
  }
}

const singUp = async () => {
  try {
    const isValid = await refForm.value.validate()
    if (!isValid) return
    isbButtonLoading.value = true
    await userStore.singUp(formData)
    router.push('/my/profile')
  } catch (error) {
    console.log(error, error.status === 400)
    if (error.status === 400) errorMessage.value = error.message
  } finally {
    isbButtonLoading.value = false
  }
}

const login = async () => {
  try {
    const isValid = await refForm.value.validate()
    if (!isValid) return
    isbButtonLoading.value = true
    await userStore.login(formData)
    router.push('/my/profile')
  } catch (error) {
    console.log(error, error.status === 400)
    if (error.status === 400) errorMessage.value = error.message
  } finally {
    isbButtonLoading.value = false
  }
}
</script>

<template>
  <main class="my-10 flex items-center justify-center">
    <div class="bg-white border border-gray-300 p-6 rounded w-full max-w-xl">
      <h2 class="text-center text-4xl pt-3 pb-6">註冊 / 登入</h2>
      <el-form
        ref="refForm"
        label-position="top"
        label-width="auto"
        :model="formData"
        :rules="formRules"
        class="max-w-80 mx-auto"
      >
        <el-form-item prop="email" label="常用信箱">
          <el-input v-model="formData.email" @blur="onEmailBlur" />
        </el-form-item>
        <el-form-item prop="password" label="密碼">
          <el-input v-model="formData.password" type="password" />
        </el-form-item>
        <el-form-item v-if="isUniqueEmail" prop="confirmPassword" label="確認密碼">
          <el-input v-model="formData.confirmPassword" type="password" />
        </el-form-item>
        <div v-if="errorMessage !== ''" class="text-red-500 text-sm">{{ errorMessage }}</div>
        <el-button
          v-if="isUniqueEmail"
          :loading="isbButtonLoading"
          color="#F59E0C"
          :dark="false"
          class="w-full mt-4 mb-10"
          @click="singUp"
        >
          <span class="font-bold text-white">註冊</span>
        </el-button>
        <el-button
          v-else
          :loading="isbButtonLoading"
          color="#F59E0C"
          :dark="false"
          class="w-full mt-4 mb-10"
          @click="login"
        >
          <span class="font-bold text-white">登入</span>
        </el-button>
      </el-form>
    </div>
  </main>
</template>
