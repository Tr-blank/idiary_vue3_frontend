<script setup>
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="page_bg min-h-screen">
    <Header />
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
