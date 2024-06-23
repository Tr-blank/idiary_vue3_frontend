<script setup>
import { ref } from 'vue'
import PublicAside from '@/components/PublicAside.vue'
import IdentityCard from '@/components/IdentityCard.vue'
import { apiIdentity } from '@/api'
const identities = ref([])

const getIdentities = async () => {
  const params = {
    // { identity: currentIdentity.value._id } : {},
    // ...(type && type !== 'all' ? { type } : {})
  }
  const { data } = await apiIdentity.getPublicList(params)
  identities.value = data
}
getIdentities()
</script>

<template>
  <main class="main-container flex justify-between">
    <PublicAside currentPage="identities" />
    <div class="flex-auto p-4">
      <div v-for="identity in identities" :key="identity.id">
        <IdentityCard :identity="identity" />
      </div>
    </div>
    <aside class="w-52 py-4">
      <div>如何設定</div>
    </aside>
  </main>
</template>
