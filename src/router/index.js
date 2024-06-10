import { createRouter, createWebHistory } from 'vue-router'
import Diaries from '../views/Diaries.vue'
import Diary from '../views/Diary.vue'
import Identity from '../views/Identity.vue'
import Login from '../views/Login.vue'
import MyIndex from '../views/My/Index.vue'
import MyProfile from '../views/My/Profile.vue'
import MyDiaries from '../views/My/Diaries.vue'
import MyExchange from '../views/My/Exchange.vue'
import MyIdentities from '../views/My/Identities.vue'
import MyFollowing from '../views/My/Following.vue'

const router = createRouter({
  history: createWebHistory('/#/'),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Diaries
    },
    {
      path: '/:tag',
      name: 'Diaries',
      component: Diaries
    },
    {
      path: '/diary/:diaryID',
      name: 'Diary',
      component: Diary
    },
    {
      path: '/identity/:identityId',
      name: 'Identity',
      component: Identity
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/my',
      name: 'MyIndex',
      component: MyIndex
    },
    {
      path: '/my/profile',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: '/my/diaries',
      name: 'MyDiaries',
      component: MyDiaries
    },
    {
      path: '/my/exchange',
      name: 'MyExchange',
      component: MyExchange
    },
    {
      path: '/my/identities',
      name: 'MyIdentities',
      component: MyIdentities
    },
    {
      path: '/my/following',
      name: 'MyFollowing',
      component: MyFollowing
    }
  ]
})

export default router
