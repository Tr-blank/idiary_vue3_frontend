<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import Avatar from '@/components/Avatar.vue'
import { PencilSquareIcon } from '@heroicons/vue/24/solid'
const userStore = useUserStore()
const isLogin = computed(() => userStore.isLogin)
</script>

<template>
  <header class="fixed top-0 z-50 bg-white w-full border-b border-gray-300">
    <div class="h-12 main-container flex justify-between items-center">
      <h1 class="py-2">
        <RouterLink to="/" class="text-2xl">
          <span class="font-bold text-yellow-500">ID</span>
          <span>iary</span>
        </RouterLink>
      </h1>
      <div class="flex items-center">
        <div v-if="isLogin" class="ml-4 border rounded px-2 flex justify-center items-center">
          <span class="inline-block">寫日記</span>
          <PencilSquareIcon class="m-1 text-gray-300 w-6" />
        </div>
        <RouterLink v-else to="/auth" class="ml-4">註冊/登入</RouterLink>
        <div class="ml-4">
          <RouterLink to="/my/profile">
            <Avatar />
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
