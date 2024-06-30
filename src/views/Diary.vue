<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import PublicAside from '@/components/PublicAside.vue'
import DiaryCard from '@/components/DiaryCard.vue'
import IdentityDetailCard from '@/components/IdentityDetailCard.vue'
import { apiDiary, apiIdentity } from '@/api'
const route = useRoute()
const diary = ref({})
const identity = ref({})
const otherDiaries = ref([])
const diaryID = computed(() => route.params.diaryID)
// const isOtherDiaries = computed(() => otherDiaries.value.length > 0)
const getDiary = async () => {
  const { data } = await apiDiary.getDetail(diaryID.value)
  diary.value = data
  identity.value = data.identity
  await getIdentity(data.identity._id)
}
const getIdentity = async (identityID) => {
  const { data } = await apiIdentity.getDetail(identityID)
  // identity.value = data.identity
  otherDiaries.value = data.publicDiaries.filter((diary) => diary._id !== diaryID.value)
}
getDiary()
</script>

<template>
  <main class="main-container flex justify-between">
    <PublicAside />
    <div class="flex-auto p-4 max-w-3xl">
      <DiaryCard :diary="diary" class="mb-4" />
    </div>
    <aside class="w-52 py-4">
      <div class="py-2">
        <IdentityDetailCard :identity="identity" :is-current-identity="false" />
      </div>
      <!-- <div v-if="isOtherDiaries">
        <div class="text-gray-400 pt-8">{{ identity.name }}的其他日記</div>
        <div class="py-2">
          <RouterLink
            v-for="diary in otherDiaries"
            :key="`otherDiaries_${diary._id}`"
            :to="`/diary/${diary._id}`"
          >
            {{ diary.title }}
          </RouterLink>
        </div>
      </div> -->
    </aside>
  </main>
</template>
