<script setup>
defineProps(['diary', 'cardType'])
// import { ref } from 'vue'
import {
  // BookmarkIcon as BookmarkSolidIcon,
  TrashIcon,
  PencilSquareIcon,
  EllipsisHorizontalIcon,
  UserCircleIcon
} from '@heroicons/vue/24/solid'
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/vue/24/outline'
// const isEditType = ref(cardType.value === 'edit')
</script>

<template>
  <article class="border border-gray-300 rounded p-4 bg-white">
    <div class="flex justify-between pb-4">
      <div class="flex">
        <div
          v-if="diary.identity.avatar !== ''"
          class="w-10 h-10 rounded-full overflow-hidden border border-gray-200"
        >
          <img :src="diary.identity.avatar" :alt="diary.identity.name" />
        </div>
        <div
          v-else
          class="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center"
        >
          <UserCircleIcon class="text-gray-300" />
        </div>
        <div class="pl-2">
          <div>
            <span class="text-base font-bold leading-4">{{ diary.identity.name }}</span>
            <!-- <span>{{ diary.identity.name }}</span> -->
          </div>
          <div class="text-sm leading-4">
            {{ new Date(diary.updatedAt).toLocaleString('sv') }}
          </div>
        </div>
      </div>
      <div class="flex">
        <i class="pl-1" v-if="cardType === 'edit'">
          <EllipsisHorizontalIcon class="size-5 text-gray-900" />
        </i>
        <template v-else>
          <i class="pl-1"><PencilSquareIcon class="size-5 text-gray-900" /></i>
          <i class="pl-1"><TrashIcon class="size-5 text-gray-900" /></i>
        </template>
      </div>
    </div>
    <div class="flex pb-4">
      <div>
        <h4 class="text-xl font-bold">{{ diary.title }}</h4>
        <div class="text-base">{{ diary.content }}</div>
      </div>
      <div v-if="diary.image">
        <img :src="diary.image" :alt="diary.title" />
      </div>
    </div>
    <div class="flex justify-between">
      <div>
        <span>#tag</span>
      </div>
      <div>
        <!-- <BookmarkSolidIcon class="size-5 text-yellow-400" /> -->
        <BookmarkOutlineIcon class="size-5 text-gray-400" />
      </div>
    </div>
  </article>
</template>
