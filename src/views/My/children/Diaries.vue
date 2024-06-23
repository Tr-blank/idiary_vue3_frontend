<script setup>
import DiaryCard from '@/components/DiaryCard.vue'
import DiaryFormPopup from '@/components/DiaryFormPopup.vue'
import { computed, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { apiDiary } from '@/api'
const userStore = useUserStore()
const currentIdentity = computed(() => userStore.currentIdentity)
const activeTab = ref('all')
const diaries = ref([])
const diaryDetail = ref({})
const isOpenDiaryPopup = ref(false)
watch(currentIdentity, () => {
  activeTab.value = 'all'
  getDiaries(activeTab.value)
})

const openDiaryPopup = (diaryID) => {
  isOpenDiaryPopup.value = true
  diaryDetail.value = diaries.value.find((diary) => diary._id === diaryID)
}
const closeDiaryPopup = async (isSaveDiary) => {
  isOpenDiaryPopup.value = false
  if (isSaveDiary) await getDiaries(activeTab.value)
}
const handleTabChange = (tabName) => {
  getDiaries(tabName)
}
const getDiaries = async (type) => {
  const params = {
    identity: currentIdentity.value._id,
    ...(type && type !== 'all' ? { type } : {})
  }
  const { data } = await apiDiary.getAllByUser(params)
  diaries.value = data
}
const deleteDiaries = async (identityID) => {
  await apiDiary.delete(identityID)
  await getDiaries(activeTab.value)
}

getDiaries()
</script>

<template>
  <main>
    <h2 class="text-2xl font-bold border-b border-gray-300 p-4">
      {{ currentIdentity.name }}的日記
    </h2>
    <el-tabs v-model="activeTab" class="demo-tabs" @tab-change="handleTabChange">
      <el-tab-pane label="全部" name="all">
        <div class="px-4">
          <DiaryCard
            v-for="diary in diaries"
            :key="diary._id + '全部'"
            card-type="edit"
            :diary="diary"
            class="mb-4"
            @delete-diaries="deleteDiaries"
            @open-diary-popup="openDiaryPopup"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="私人" name="私人">
        <div class="px-4">
          <DiaryCard
            v-for="diary in diaries"
            :key="diary._id + '私人'"
            card-type="edit"
            :diary="diary"
            class="mb-4"
            @delete-diaries="deleteDiaries"
            @open-diary-popup="openDiaryPopup"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="公開" name="公開">
        <div class="px-4">
          <DiaryCard
            v-for="diary in diaries"
            :key="diary._id + '公開'"
            card-type="edit"
            :diary="diary"
            class="mb-4"
            @delete-diaries="deleteDiaries"
            @open-diary-popup="openDiaryPopup"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="交換" name="交換">
        <div class="px-4">
          <DiaryCard
            v-for="diary in diaries"
            :key="diary._id + '交換'"
            card-type="edit"
            :diary="diary"
            class="mb-4"
            @delete-diaries="deleteDiaries"
            @open-diary-popup="openDiaryPopup"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <DiaryFormPopup
      v-if="isOpenDiaryPopup"
      type="edit"
      :diary="diaryDetail"
      @close-diary-popup="closeDiaryPopup"
    />
  </main>
</template>
