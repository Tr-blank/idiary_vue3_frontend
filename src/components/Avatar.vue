<script setup>
// import { computed } from 'vue'
const { avatar } = defineProps({
  avatar: {
    type: Object
  },
  sizeClass: {
    type: String,
    default: 'w-8 h-8'
  }
})
// const avatarUrl = computed(() => avatar?.imgUrl)
</script>

<template>
  <div :class="sizeClass" class="rounded-full overflow-hidden border border-gray-200">
    <img v-lazy="avatar.imgUrl" class="w-full h-full object-cover" />
  </div>
</template>
