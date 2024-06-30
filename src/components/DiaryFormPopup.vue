<script setup>
import { PencilSquareIcon, XMarkIcon, PhotoIcon } from '@heroicons/vue/24/solid'
import IdentityCard from '@/components/IdentityCard.vue'
import { ref, computed, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { apiDiary, apiUser, apiUpload } from '@/api'
import router from '@/router'
const { diary, type } = defineProps(['diary', 'type'])
const emit = defineEmits(['closeDiaryPopup'])
const userStore = useUserStore()
const popupType = ref(type)
const diaryID = ref(diary?._id || '')
const currentIdentity = computed(() => userStore.currentIdentity)
const userIdentities = computed(() => userStore.identities)
const isCanSaveDiary = computed(() => createForm.content.trim() !== '')
const imageUrl = computed(() => createForm?.image || diary?.image)
const isEditForm = computed(() => popupType.value === 'edit')
const isPublicDiary = computed(() => isEditForm.value && diary?.type === '公開')
const selectIdentity = computed(() =>
  userIdentities.value.find((identity) => identity._id === createForm.identity)
)
const createForm = reactive({
  identity: isEditForm.value ? diary.identity._id : currentIdentity.value._id,
  title: isEditForm.value ? diary.title : '',
  content: isEditForm.value ? diary.content : '',
  type: isEditForm.value ? diary.type : '私人',
  image: isEditForm.value ? diary.image : ''
})
const closePopup = () => {
  emit('closeDiaryPopup')
}
const saveDiary = async (imageData) => {
  const postData = {
    ...createForm,
    type: isEditForm.value ? createForm.type : '私人',
    code_name: createForm.codeName
  }
  if (isEditForm.value) {
    await apiDiary.updateDetail(diaryID.value, postData)
  } else {
    const { data } = await apiDiary.create(postData)
    diaryID.value = data._id
  }
  // isEditForm.value
  //   ? await apiDiary.updateDetail(diary._id, postData)
  //   : await apiDiary.create(postData)
  await changeCurrentIdentity(createForm.identity)
  if (imageData?.image) {
    popupType.value = 'edit'
    return
  }
  router.push('/my/diaries')
  emit('closeDiaryPopup', true)
}

const savePublicDiary = async (imageData) => {
  const postData = {
    ...createForm,
    type: '公開',
    code_name: createForm.codeName
  }
  isEditForm.value
    ? await apiDiary.updateDetail(diary._id, postData)
    : await apiDiary.create(postData)
  await changeCurrentIdentity(createForm.identity)
  if (imageData?.image) {
    popupType.value = 'edit'
    return
  }
  router.push('/my/diaries')
  emit('closeDiaryPopup', true)
}
const changeCurrentIdentity = async (identityID) => {
  await apiUser.updateCurrentIdentity({ identityID })
  await userStore.getProfile()
}
const uploadPhoto = async (event) => {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  const formData = new FormData()
  formData.append('files', file)
  try {
    const { data } = await apiUpload.postPhoto(formData)
    createForm.image = data.imgUrl
    saveDiary({ image: data.imgUrl })
    // if(diary?._id) {
    //   await apiDiary.updateDetail(diary._id, { image: data.imgUrl })
    // }else{
    //   saveDiary()
    // }
    // await apiDiary.updateDetail(diary._id, { image: data.imgUrl })
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 w-screen h-screen bg-gray-100 bg-opacity-90 z-20 pt-20">
    <div class="bg-white mx-auto w-full max-w-3xl">
      <div class="flex justify-between p-4 border-b border-gray-200">
        <div class="flex items-center">
          <div class="w-64">
            <el-select v-model="createForm.identity">
              <template #label="">
                <IdentityCard :identity="selectIdentity" />
              </template>
              <el-option
                v-for="identity in userIdentities"
                :key="identity.id"
                :label="identity.name"
                :value="identity._id"
              >
                <IdentityCard :identity="identity" />
              </el-option>
            </el-select>
          </div>
          <PencilSquareIcon class="m-1 text-gray-300 w-6 cursor-pointer" />
          <span>新增日記</span>
        </div>
        <div class="flex">
          <el-button
            color="#F59E0C"
            :dark="false"
            :disabled="!isCanSaveDiary"
            @click="savePublicDiary"
          >
            <span class="font-bold text-white">公開發佈</span>
          </el-button>
          <el-button :disabled="!isCanSaveDiary" class="mr-3" @click="saveDiary">
            <span class="font-bold">儲存</span>
          </el-button>
          <XMarkIcon class="m-1 w-6 cursor-pointer" @click="closePopup" />
        </div>
      </div>
      <el-form :model="createForm" class="p-4">
        <el-form-item v-if="isPublicDiary">
          <div class="w-20">
            <el-select v-model="createForm.type">
              <el-option label="私人" value="私人" />
              <el-option label="公開" value="公開" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="createForm.title"
            maxlength="80"
            placeholder="請輸入標題 2024/05/10 "
            show-word-limit
            type="text"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="createForm.content"
            placeholder="請輸入內容"
            type="textarea"
            rows="10"
          />
        </el-form-item>
        <div class="flex">
          <div
            v-if="imageUrl"
            :class="imageUrl ? 'w-1/2' : ''"
            class="rounded overflow-hidden mr-2"
          >
            <img :src="imageUrl" class="" />
          </div>
          <input
            type="file"
            id="uploadButton"
            name="filename"
            class="hidden"
            @change="uploadPhoto"
          />
          <label
            for="uploadButton"
            class="w-full bg-gray-100 min-h-24 border border-gray-300 cursor-pointer flex items-center justify-center rounded relative"
          >
            <div class="flex text-gray-500 items-center">
              <PhotoIcon class="w-6 mr-1" />
              <span>上傳圖片</span>
            </div>
          </label>
        </div>
      </el-form>
    </div>
  </div>
</template>
