<script setup>
import {
  UserCircleIcon,
  UsersIcon,
  DocumentDuplicateIcon,
  BookOpenIcon,
  StarIcon
} from '@heroicons/vue/24/solid'
import { computed } from 'vue'
import IdentityCard from '@/components/IdentityCard.vue'
import IdentityDetailCard from '@/components/IdentityDetailCard.vue'
import { useUserStore } from '@/stores/user'
import { apiUser } from '@/api'
const userStore = useUserStore()
const currentIdentity = computed(() => userStore.currentIdentity)
const userIdentities = computed(() =>
  userStore.identities.filter((identity) => identity.id !== currentIdentity.value.id)
)
const isOtherIdentities = computed(() => userIdentities.value.length > 0)
const changeCurrentIdentity = async (identityID) => {
  await apiUser.updateCurrentIdentity({ identityID })
  await userStore.getProfile()
}
</script>

<template>
  <main class="main-container flex justify-between">
    <aside class="w-52 py-2 text-lg">
      <RouterLink to="/my/profile" class="py-2 flex items-center">
        <UserCircleIcon class="w-6 mr-1" />
        <span>會員資訊</span>
      </RouterLink>
      <RouterLink to="/my/identities" class="py-2 flex items-center">
        <UsersIcon class="w-6 mr-1" />
        <span>身份設定</span>
      </RouterLink>
      <RouterLink to="/my/diaries" class="py-2 flex items-center">
        <DocumentDuplicateIcon class="w-6 mr-1" />
        <span>我的日記</span>
      </RouterLink>
      <RouterLink to="/my/exchange" class="py-2 flex items-center">
        <BookOpenIcon class="w-6 mr-1" />
        <span>交換日記本</span>
      </RouterLink>
      <RouterLink to="/my/following" class="py-2 flex items-center">
        <StarIcon class="w-6 mr-1" />
        <span>追隨清單</span>
      </RouterLink>
    </aside>
    <div class="flex-auto p-4">
      <div class="bg-white rounded border border-gray-300">
        <RouterView />
      </div>
    </div>
    <aside class="w-52 py-4">
      <IdentityDetailCard :identity="currentIdentity" />
      <div v-if="isOtherIdentities">
        <div class="text-gray-400 pt-8">切換身份</div>
        <div class="py-2">
          <IdentityCard
            v-for="identity in userIdentities"
            type="change"
            :key="identity.id"
            :identity="identity"
            @click="changeCurrentIdentity(identity._id)"
          />
        </div>
      </div>
    </aside>
  </main>
</template>
