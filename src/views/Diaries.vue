<script setup>
import { ref, computed } from 'vue'
import PublicAside from '@/components/PublicAside.vue'
import DiaryCard from '@/components/DiaryCard.vue'
import IdentityCard from '@/components/IdentityCard.vue'
import { apiDiary } from '@/api'
const diaries = ref([])
const isLoading = ref(true)
const identities = computed(() => {
  const identityIDs = []
  const identityList = []
  diaries.value.forEach((diary) => {
    if (!identityIDs.includes(diary.identity?._id)) {
      identityIDs.push(diary.identity?._id)
      identityList.push({
        ...diary.identity
      })
    }
  })
  return identityList
})
const isOtherIdentities = computed(() => identities.value.length > 0)

const getDiaries = async () => {
  isLoading.value = true
  const params = {
    // { identity: currentIdentity.value._id } : {},
    // ...(type && type !== 'all' ? { type } : {})
  }
  const { data } = await apiDiary.getPublicList(params)
  diaries.value = data.filter((item) => {
    return item.identity !== null
  })
  isLoading.value = false
}
getDiaries()
</script>

<template>
  <main class="main-container flex justify-between">
    <PublicAside currentPage="diaries" />
    <div v-if="isLoading" class="pt-20 test-center text-xl">Loading...</div>
    <div v-else class="flex-auto p-4 max-w-3xl">
      <RouterLink v-for="diary in diaries" :key="diary.id" :to="`/diary/${diary._id}`">
        <DiaryCard :diary="diary" class="mb-4" />
      </RouterLink>
    </div>
    <aside class="w-52 py-4">
      <div v-if="isOtherIdentities">
        <div class="text-gray-400">活躍身份</div>
        <div class="py-2">
          <IdentityCard v-for="identity in identities" :key="identity.id" :identity="identity" />
        </div>
      </div>
    </aside>
  </main>
</template>
