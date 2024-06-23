import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useCookies } from 'vue3-cookies'
import Diaries from '../views/Diaries.vue'
import Diary from '../views/Diary.vue'
import Identity from '../views/Identity.vue'
import Identities from '../views/Identities.vue'
import Auth from '../views/Auth.vue'
import MyIndex from '../views/My/Index.vue'
import MyHome from '../views/My/children/Home.vue'
import MyProfile from '../views/My/children/Profile.vue'
import MyDiaries from '../views/My/children/Diaries.vue'
import MyExchange from '../views/My/children/Exchange.vue'
import MyIdentities from '../views/My/children/Identities.vue'
import MyFollowing from '../views/My/children/Following.vue'

const router = createRouter({
  history: createWebHistory('/#/'),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Diaries
    },
    {
      path: '/identities',
      name: 'Identities',
      component: Identities
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
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/my/index',
      name: 'MyIndex',
      component: MyIndex,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/my/index',
          name: 'MyHome',
          component: MyHome,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/my/profile',
          name: 'MyProfile',
          component: MyProfile,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/my/identities',
          name: 'MyIdentities',
          component: MyIdentities,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/my/diaries',
          name: 'MyDiaries',
          component: MyDiaries,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/my/exchange',
          name: 'MyExchange',
          component: MyExchange,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/my/following',
          name: 'MyFollowing',
          component: MyFollowing,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { cookies } = useCookies()
  const cookieToken = cookies.get('idiary_token')
  const requireAuth = to?.meta?.requiresAuth || false
  const accessToken = userStore?.userToken

  if (cookieToken && !accessToken) {
    userStore.setUserToken(cookieToken)
    userStore.getProfile()
  }
  if (requireAuth && !cookieToken) {
    next('/auth')
  } else {
    next()
  }
})

export default router
