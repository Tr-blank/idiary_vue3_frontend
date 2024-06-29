<script setup>
const { identity, isCurrentIdentity } = defineProps({
  identity: {
    type: Object
    // required: true
  },
  isCurrentIdentity: {
    type: Boolean
    // required: true
  }
})
import { computed } from 'vue'
import { StarIcon, BookOpenIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/solid'
import Avatar from '@/components/Avatar.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const avatarData = computed(() => {
  const data = isCurrentIdentity ? userStore.currentIdentity : identity
  return {
    imgUrl: data?.avatar || '',
    name: data?.name || ''
  }
})
</script>

<template>
  <article class="border border-gray-300 rounded p-4">
    <Avatar :avatar="avatarData" size-class="w-16 h-16 mx-auto" />
    <div class="text-base font-bold py-2 text-center">{{ avatarData.name }}</div>
    <div class="flex flex-wrap">
      <div class="inline-flex items-center w-full">
        <StarIcon class="w-4 h-4" />
        <span>3已追隨/2追隨者</span>
      </div>
      <div class="inline-flex items-center mr-2">
        <DocumentDuplicateIcon class="w-4 h-4" />
        <span>5篇</span>
      </div>
      <div class="inline-flex items-center">
        <BookOpenIcon class="w-4 h-4" />
        <span>0本</span>
      </div>
    </div>
    <div class="flex">
      <span>#心情</span>
    </div>
  </article>
</template>
