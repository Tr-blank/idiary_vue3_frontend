<script setup>
import Avatar from '@/components/Avatar.vue'
import { PencilSquareIcon } from '@heroicons/vue/24/solid'
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
        <RouterLink to="/login" class="ml-4">註冊/登入</RouterLink>
        <div class="ml-4 border rounded px-2 flex justify-center items-center">
          <span class="inline-block">寫日記</span>
          <PencilSquareIcon class="m-1 text-gray-300 w-6" />
        </div>
        <div class="ml-4">
          <RouterLink to="/my/index">
            <Avatar />
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
