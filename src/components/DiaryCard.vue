<script setup>
import { computed } from 'vue'
import {
  // BookmarkIcon as BookmarkSolidIcon,
  TrashIcon,
  PencilSquareIcon
  // EllipsisHorizontalIcon
} from '@heroicons/vue/24/solid'
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/vue/24/outline'
import Avatar from '@/components/Avatar.vue'
const { diary, cardType } = defineProps(['diary', 'cardType'])
const emit = defineEmits(['deleteDiaries', 'openDiaryPopup'])
const isEditType = computed(() => cardType === 'edit')
const isDataLoading = computed(() => diary)
const avatarData = computed(() => {
  return {
    imgUrl: diary?.identity?.avatar || '',
    name: diary?.identity?.name || ''
  }
})
const deleteDiary = () => {
  emit('deleteDiaries', diary?._id)
}
const openDiaryPopup = () => {
  emit('openDiaryPopup', diary?._id)
}
</script>

<template>
  <article class="border border-gray-300 rounded p-4 bg-white">
    <div v-if="isDataLoading" class="flex justify-between pb-4">
      <div v-if="avatarData" class="flex">
        <Avatar :avatar="avatarData" size-class="w-10 h-10" />
        <div class="pl-2">
          <div>
            <span class="text-base font-bold leading-4">{{ diary.identity.name }}</span>
          </div>
          <div class="text-sm leading-4">
            {{ new Date(diary.updatedAt).toLocaleString('sv') }}
          </div>
        </div>
      </div>
      <div class="flex">
        <!-- <i class="pl-1" v-if="isEditType">
          <EllipsisHorizontalIcon class="size-5 text-gray-900" />
        </i> -->
        <template v-if="isEditType">
          <i class="pl-1 cursor-pointer" @click="openDiaryPopup">
            <PencilSquareIcon class="size-5 text-gray-900" />
          </i>
          <i class="pl-1 cursor-pointer" @click="deleteDiary">
            <TrashIcon class="size-5 text-gray-900" />
          </i>
        </template>
      </div>
    </div>
    <div class="flex pb-4">
      <div :class="diary.image ? 'w-2/3' : 'w-full'">
        <h4 class="text-xl font-bold">{{ diary.title }}</h4>
        <div class="text-base w-full whitespace-break-spaces">{{ diary.content }}</div>
      </div>
      <div v-if="diary.image" class="w-1/3 h-36 ml-2 rounded overflow-hidden relative">
        <img :src="diary.image" :alt="diary.title" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="flex justify-between">
      <div class="text-gray-500 text-sm">
        <span>電影 · #腦筋急轉彎 #心情 #認識情緒</span>
      </div>
      <div>
        <!-- <BookmarkSolidIcon class="size-5 text-yellow-400" /> -->
        <span v-if="isEditType">{{ diary.type }}</span>
        <BookmarkOutlineIcon v-else class="size-5 text-gray-400" />
      </div>
    </div>
  </article>
</template>
