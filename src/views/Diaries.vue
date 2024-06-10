<script setup>
import axios from 'axios'
import DiaryCard from '@/components/DiaryCard.vue'
import IdentityCard from '@/components/IdentityCard.vue'
import { ref } from 'vue'
const apiBaseUrl = 'https://idiary-express-api.onrender.com'
const users = ref([])
const diaries = ref([])
const identities = ref([])

const getUsers = async () => {
  try {
    const { data } = await axios.get(`${apiBaseUrl}/users`)
    users.value = data.data
  } catch (error) {
    console.log(error)
  }
}
const getIdentities = async () => {
  try {
    const { data } = await axios.get(`${apiBaseUrl}/identities`)
    identities.value = data.data
  } catch (error) {
    console.log(error)
  }
}
const getDiaries = async () => {
  try {
    const { data } = await axios.get(`${apiBaseUrl}/diaries`)
    diaries.value = data.data
  } catch (error) {
    console.log(error)
  }
}

getUsers()
getIdentities()
getDiaries()
</script>

<template>
  <main>
    <div class="main-container py-40">
      <div>
        <div>使用者清單 users</div>
        <div>{{ users }}</div>
      </div>
      <div>
        <div>身份清單 identities</div>
        <div class="flex flex-wrap">
          <IdentityCard
            v-for="identity in identities"
            :key="identity.id"
            :identity="identity"
            class="w-1/3"
          />
        </div>
        <div>{{ identities }}</div>
      </div>
      <div>
        <div>日記清單 diaries</div>
        <div v-for="diary in diaries" :key="diary.id">
          <DiaryCard card-type="edit" :diary="diary" class="mb-4" />
        </div>
      </div>
    </div>
  </main>
</template>
