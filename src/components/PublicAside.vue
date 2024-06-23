<script setup>
import { FireIcon, UsersIcon } from '@heroicons/vue/24/solid'
defineProps({
  currentPage: {
    type: String
    // required: true
  }
})
</script>

<template>
  <aside class="w-52 py-4 text-lg">
    <RouterLink
      to="/"
      :class="{ 'bg-white': currentPage === 'diaries' }"
      class="pl-4 py-2 flex items-center rounded"
    >
      <FireIcon class="w-6 mr-1" />
      <span>最新公開日記</span>
    </RouterLink>
    <RouterLink
      to="/identities"
      :class="{ 'bg-white': currentPage === 'identities' }"
      class="pl-4 py-2 flex items-center rounded"
    >
      <UsersIcon class="w-6 mr-1" />
      <span>邀請交換日記</span>
    </RouterLink>
    <!-- <div>
      <div class="text-gray-400 pt-8">分類標籤</div>

    </div>  -->
  </aside>
</template>
