<script setup>
const { identity } = defineProps({
  identity: {
    type: Object
    // required: true
  }
})
import { computed } from 'vue'
import { StarIcon, BookOpenIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/solid'
import Avatar from '@/components/Avatar.vue'

const avatarData = computed(() => {
  return {
    imgUrl: identity.avatar,
    name: identity.name
  }
})
</script>

<template>
  <article class="border border-gray-300 rounded p-4">
    <Avatar :avatar="avatarData" size-class="w-16 h-16 mx-auto" />
    <div class="text-base font-bold py-2 text-center">{{ identity.name }}</div>
    <div class="flex flex-wrap">
      <div class="inline-flex items-center w-full">
        <StarIcon class="w-4 h-4" />
        <span>0已追隨/0追隨者</span>
      </div>
      <div class="inline-flex items-center mr-2">
        <DocumentDuplicateIcon class="w-4 h-4" />
        <span>0篇</span>
      </div>
      <div class="inline-flex items-center">
        <BookOpenIcon class="w-4 h-4" />
        <span>0本</span>
      </div>
    </div>
    <div class="flex">
      <span>#tag</span>
    </div>
  </article>
</template>
