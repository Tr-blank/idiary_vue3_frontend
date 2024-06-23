<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import DiaryFormPopup from '@/components/DiaryFormPopup.vue'
const route = useRoute()
const isOpenDiaryPopup = ref(false)
const pageName = computed(() => route.params?.name)
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
      <RouterView :key="pageName" />
    </div>
  </div>
</template>

<style scoped>
.page_bg {
  background: linear-gradient(to bottom, #eae9e2, #f4f4f5);
}
</style>
