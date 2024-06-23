<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Avatar from '@/components/Avatar.vue'
import { PencilSquareIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['openDiaryPopup'])
const userStore = useUserStore()
const router = useRouter()
const isOpenUserDropdown = ref(false)
const isLogin = computed(() => userStore.isLogin)
const openDiaryPopup = () => {
  emit('openDiaryPopup')
}
const triggerUserDropdown = () => {
  isOpenUserDropdown.value = !isOpenUserDropdown.value
}
const logout = async () => {
  await userStore.logout()
  isOpenUserDropdown.value = false
  router.push('/')
}
</script>

<template>
  <header class="fixed top-0 z-10 bg-white w-full border-b border-gray-300">
    <div class="h-12 main-container flex justify-between items-center">
      <h1 class="py-2">
        <RouterLink to="/" class="text-2xl">
          <span class="font-bold text-yellow-500">ID</span>
          <span>iary</span>
        </RouterLink>
      </h1>
      <div class="flex items-center">
        <template v-if="isLogin">
          <div
            class="ml-4 border rounded px-2 flex justify-center items-center cursor-pointer"
            @click="openDiaryPopup"
          >
            <span class="inline-block">寫日記</span>
            <PencilSquareIcon class="m-1 text-gray-300 w-6" />
          </div>
          <div class="ml-4 relative">
            <span class="cursor-pointer" @click="triggerUserDropdown">
              <Avatar />
            </span>
            <div
              v-if="isOpenUserDropdown"
              class="absolute right-0 top-10 w-48 bg-white border border-gray-300 py-2 rounded"
            >
              <RouterLink to="/my/diaries" class="block py-2 px-4 hover:bg-gray-100 cursor-pointer">
                <span>我的日記</span>
              </RouterLink>
              <div class="py-2 px-4 hover:bg-gray-100 cursor-pointer" @click="logout">登出</div>
            </div>
          </div>
        </template>
        <RouterLink v-else to="/auth" class="ml-4">註冊/登入</RouterLink>
      </div>
    </div>
  </header>
</template>
