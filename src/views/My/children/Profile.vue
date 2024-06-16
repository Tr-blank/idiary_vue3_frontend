<script setup>
import { computed, reactive, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { apiUser } from '@/api'
const userStore = useUserStore()
const userProfile = computed(() => userStore.profile)
const profileData = reactive({})
const newProfileData = reactive({
  account: '',
  email: ''
})
const passwordData = reactive({
  password: '',
  confirmPassword: ''
})
watch(userProfile, () => {
  setProfile()
})
const setProfile = async () => {
  profileData.account = userProfile.value.account
  profileData.email = userProfile.value.email
  newProfileData.account = userProfile.value.account
  newProfileData.email = userProfile.value.email
}
const editProfile = async () => {
  let postData = {}
  const porfileKey = Object.keys(profileData)
  porfileKey.forEach((key) => {
    if (profileData[key] !== newProfileData[key]) {
      postData[key] = newProfileData[key]
    }
  })
  await apiUser.updateProfile(postData)
  await userStore.getProfile()
}
const editPassword = () => {
  // const res = apiUser.updateProfile(postData)
  console.log(profileData)
}
setProfile()
</script>

<template>
  <main>
    <h2 class="text-2xl font-bold border-b border-gray-300 p-4">會員資訊</h2>
    <el-form label-position="top" label-width="auto" :model="newProfileData" class="p-4">
      <el-form-item label="帳號">
        <el-input v-model="newProfileData.account" />
      </el-form-item>
      <el-form-item label="常用信箱">
        <el-input v-model="newProfileData.email" />
      </el-form-item>
      <el-button color="#F59E0C" :dark="false" class="w-full mt-4 mb-10" @click="editProfile">
        <span class="font-bold text-white">更新會員資訊</span>
      </el-button>
    </el-form>
    <el-form label-position="top" label-width="auto" :model="passwordData" class="p-4">
      <el-form-item label="密碼">
        <el-input v-model="passwordData.password" type="password" />
      </el-form-item>
      <el-form-item label="確認密碼">
        <el-input v-model="passwordData.confirmPassword" type="password" />
      </el-form-item>
      <el-button color="#F59E0C" :dark="false" class="w-full my-4" @click="editPassword">
        <span class="font-bold text-white">更新密碼</span>
      </el-button>
    </el-form>
  </main>
</template>
