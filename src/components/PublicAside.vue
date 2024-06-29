<script setup>
import { FireIcon, UsersIcon, Squares2X2Icon, StarIcon } from '@heroicons/vue/24/solid'
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
      to="/"
      :class="{ 'bg-white': currentPage === 'identities' }"
      class="pl-4 py-2 flex items-center rounded"
    >
      <UsersIcon class="w-6 mr-1" />
      <span>邀請交換日記</span>
    </RouterLink>
    <RouterLink
      to="/"
      :class="{ 'bg-white': currentPage === 'identities' }"
      class="pl-4 py-2 flex items-center rounded"
    >
      <Squares2X2Icon class="w-6 mr-1" />
      <span>所有分類標籤</span>
    </RouterLink>
    <div class="pl-4">
      <div class="text-gray-400 pt-8">熱門分類標籤</div>
      <div class="py-2 flex items-end leading-4 text-base">
        <StarIcon class="w-5 mr-1 text-gray-400" />
        <span># 心情</span>
      </div>
      <div class="py-2 flex items-end leading-4 text-base">
        <StarIcon class="w-5 mr-1 text-gray-400" />
        <span>電影</span>
      </div>
      <div class="py-2 flex items-end leading-4 text-base">
        <StarIcon class="w-5 mr-1 text-gray-400" />
        <span># 腦筋急轉彎</span>
      </div>
      <div class="py-2 flex items-end leading-4 text-base">
        <StarIcon class="w-5 mr-1 text-gray-400" />
        <span># 認識情緒</span>
      </div>
    </div>
  </aside>
</template>
