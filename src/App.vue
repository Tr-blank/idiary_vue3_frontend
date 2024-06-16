<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import DiaryFormPopup from '@/components/DiaryFormPopup.vue'
const isOpenDiaryPopup = ref(false)
const openDiaryPopup = () => {
  isOpenDiaryPopup.value = true
}
const closeDiaryPopup = () => {
  isOpenDiaryPopup.value = false
}
</script>

<template>
  <div class="page_bg min-h-screen">
    <Header @open-diary-popup="openDiaryPopup" />
    <DiaryFormPopup v-if="isOpenDiaryPopup" @close-diary-popup="closeDiaryPopup" />
    <div class="pt-12">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.page_bg {
  background: linear-gradient(to bottom, #eae9e2, #f4f4f5);
}
</style>
