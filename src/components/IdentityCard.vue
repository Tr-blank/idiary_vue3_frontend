<script setup>
const { identity } = defineProps({
  identity: {
    type: Object
    // required: true
  },
  type: {
    type: String
    // required: true
  }
})
import { computed } from 'vue'
import { ArrowPathRoundedSquareIcon } from '@heroicons/vue/24/solid'
import Avatar from '@/components/Avatar.vue'

const avatarData = computed(() => {
  return {
    imgUrl: identity?.avatar || '',
    name: identity?.name || ''
  }
})
</script>

<template>
  <article class="py-1 flex justify-between items-center cursor-pointer hover:text-green-800">
    <div class="flex items-center">
      <Avatar :avatar="avatarData" size-class="w-7 h-7" />
      <div class="text-base font-bold pl-1 text-center">{{ identity.name }}</div>
    </div>
    <ArrowPathRoundedSquareIcon v-if="type === 'change'" class="w-4 h-4" />
  </article>
</template>
