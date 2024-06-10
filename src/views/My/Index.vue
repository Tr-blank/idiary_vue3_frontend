<script setup>
import {
  UserCircleIcon,
  UsersIcon,
  DocumentDuplicateIcon,
  BookOpenIcon,
  StarIcon
} from '@heroicons/vue/24/solid'
</script>

<template>
  <main class="main-container flex justify-between">
    <aside class="w-52 py-2 text-lg">
      <RouterLink to="/my/profile" class="py-2 flex items-center">
        <UserCircleIcon class="w-6 mr-1" />
        <span>會員資訊</span>
      </RouterLink>
      <RouterLink to="/my/identities" class="py-2 flex items-center">
        <UsersIcon class="w-6 mr-1" />
        <span>身份設定</span>
      </RouterLink>
      <RouterLink to="/my/diaries" class="py-2 flex items-center">
        <DocumentDuplicateIcon class="w-6 mr-1" />
        <span>我的日記</span>
      </RouterLink>
      <RouterLink to="/my/exchange" class="py-2 flex items-center">
        <BookOpenIcon class="w-6 mr-1" />
        <span>交換日記本</span>
      </RouterLink>
      <RouterLink to="/my/following" class="py-2 flex items-center">
        <StarIcon class="w-6 mr-1" />
        <span>追隨清單</span>
      </RouterLink>
    </aside>
    <div class="flex-auto p-4">
      <div class="bg-white rounded border border-gray-300">
        <RouterView />
      </div>
    </div>
    <aside class="w-52 py-4">切換身分</aside>
  </main>
</template>
