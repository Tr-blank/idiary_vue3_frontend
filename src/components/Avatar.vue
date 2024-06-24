<script setup>
const { avatar, sizeClass } = defineProps({
  avatar: {
    type: Object
  },
  sizeClass: {
    type: String,
    default: 'w-8 h-8'
  }
})
</script>

<template>
  <div :class="sizeClass" class="rounded-full overflow-hidden border border-gray-200">
    <img v-lazy="avatar.imgUrl" :alt="avatar.name" class="w-full h-full object-cover" />
  </div>
</template>
