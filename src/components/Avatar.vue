<script setup>
import { computed } from 'vue'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
const { avatar } = defineProps({
  avatar: {
    type: Object
    // required: true
  },
  sizeClass: {
    type: String,
    default: 'w-8 h-8'
  }
})
const isImgUrl = computed(() => {
  return avatar?.imgUrl
})
</script>

<template>
  <div>{{ isImgUrl }}</div>
  <div
    v-if="isImgUrl"
    :class="sizeClass"
    class="rounded-full overflow-hidden border border-gray-200"
  >
    <img :src="avatar.imgUrl" :alt="avatar.name" />
  </div>
  <div
    v-else
    :class="sizeClass"
    class="rounded-full overflow-hidden border border-gray-200 flex items-center justify-center"
  >
    <UserCircleIcon class="text-gray-300" />
  </div>
</template>
