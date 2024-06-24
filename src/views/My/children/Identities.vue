<script setup>
import { PhotoIcon } from '@heroicons/vue/24/solid'
import Avatar from '@/components/Avatar.vue'
import { ref, reactive, computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { apiIdentity, apiUpload } from '@/api'
const userStore = useUserStore()
const isCreateForm = ref(false)
const currentIdentity = computed(() => userStore.currentIdentity)
const avatarData = computed(() => {
  return {
    imgUrl: currentIdentity.value?.avatar || '',
    name: currentIdentity.value?.name || ''
  }
})
let createForm = reactive({
  codeName: '',
  name: '',
  description: ''
})
let editForm = reactive({
  codeName: currentIdentity.value.code_name,
  name: currentIdentity.value.name,
  description: currentIdentity.value.description
})

watch(currentIdentity, () => {
  updateEditForm()
})

const clearCreateForm = () => {
  createForm.codeName = ''
  createForm.name = ''
  createForm.description = ''
}

const updateEditForm = () => {
  editForm.codeName = currentIdentity.value.code_name
  editForm.name = currentIdentity.value.name
  editForm.description = currentIdentity.value.description
}

const changeFormPage = () => {
  isCreateForm.value = !isCreateForm.value
}
const createIdentity = async () => {
  const postData = {
    ...createForm,
    code_name: createForm.codeName
  }
  await apiIdentity.create(postData)
  await userStore.getProfile()
  clearCreateForm()
  updateEditForm()
  isCreateForm.value = false
}
const updateIdentity = async () => {
  await apiIdentity.updateDetail(currentIdentity.value._id, editForm)
  await userStore.getProfile()
}
const deleteIdentity = async () => {
  await apiIdentity.delete(currentIdentity.value._id)
  await userStore.getProfile()
  updateEditForm()
}
const uploadAvatar = async (event) => {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  const formData = new FormData()
  formData.append('files', file)
  try {
    const { data } = await apiUpload.postAvatar(formData)
    await apiIdentity.updateDetail(currentIdentity.value._id, { avatar: data.imgUrl })
    await userStore.getProfile()
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}
</script>

<template>
  <main>
    <div class="border-b border-gray-300 p-4 flex justify-between">
      <h2 class="text-2xl font-bold">{{ isCreateForm ? '新增身分' : '身份設定' }}</h2>
      <el-button @click="changeFormPage">
        <span class="font-bold">{{ isCreateForm ? '返回' : '新增身分' }}</span>
      </el-button>
    </div>
    <el-form
      v-if="isCreateForm"
      label-position="top"
      label-width="auto"
      :model="createForm"
      class="p-4"
    >
      <div class="pb-4">
        <div class="inline-block relative">
          <Avatar :avatar="avatarData" size-class="w-32 h-32" />
          <input
            type="file"
            id="uploadButton"
            name="filename"
            class="hidden"
            @change="uploadAvatar"
          />
          <label
            for="uploadButton"
            class="absolute bottom-0 right-0 rounded-full bg-gray-100 p-2 border border-gray-300 cursor-pointer"
          >
            <PhotoIcon class="w-7" />
          </label>
        </div>
      </div>
      <el-form-item label="代號">
        <el-input v-model="createForm.codeName" />
      </el-form-item>
      <el-form-item label="名稱">
        <el-input v-model="createForm.name" />
      </el-form-item>
      <el-form-item label="簡介">
        <el-input v-model="createForm.description" type="textarea" />
      </el-form-item>
      <el-button color="#F59E0C" :dark="false" class="w-full mt-4 mb-10" @click="createIdentity">
        <span class="font-bold text-white">新增身份</span>
      </el-button>
    </el-form>
    <el-form v-else label-position="top" label-width="auto" :model="editForm" class="p-4">
      <div class="pb-4">
        <div class="inline-block relative">
          <Avatar :avatar="avatarData" size-class="w-32 h-32" />
          <input
            type="file"
            id="uploadButton"
            name="filename"
            class="hidden"
            @change="uploadAvatar"
          />
          <label
            for="uploadButton"
            class="absolute bottom-0 right-0 rounded-full bg-gray-100 p-2 border border-gray-300 cursor-pointer"
          >
            <PhotoIcon class="w-7" />
          </label>
        </div>
      </div>
      <el-form-item label="代號">
        <el-input v-model="editForm.codeName" />
      </el-form-item>
      <el-form-item label="名稱">
        <el-input v-model="editForm.name" />
      </el-form-item>
      <el-form-item label="簡介">
        <el-input v-model="editForm.description" type="textarea" />
      </el-form-item>
      <div class="mt-4 mb-10 flex">
        <el-button class="w-1/4" @click="deleteIdentity">
          <span class="font-bold">刪除身份</span>
        </el-button>
        <el-button color="#F59E0C" :dark="false" class="w-3/4" @click="updateIdentity">
          <span class="font-bold text-white">更新身份設定</span>
        </el-button>
      </div>
    </el-form>
  </main>
</template>
