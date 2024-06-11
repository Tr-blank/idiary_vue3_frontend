import { createRouter, createWebHistory } from 'vue-router'
// import store from './store'
import Diaries from '../views/Diaries.vue'
import Diary from '../views/Diary.vue'
import Identity from '../views/Identity.vue'
import Auth from '../views/Auth.vue'
import MyIndex from '../views/My/Index.vue'
import MyHome from '../views/My/children/Home.vue'
import MyProfile from '../views/My/children/Profile.vue'
import MyDiaries from '../views/My/children/Diaries.vue'
import MyExchange from '../views/My/children/Exchange.vue'
import MyIdentities from '../views/My/children/Identities.vue'
import MyFollowing from '../views/My/children/Following.vue'

// function requireAuth(to, from, next) {
//   const requireAuth = to.matched.some((record) => record.meta.requiresAuth)
//   const { $cookies } = router.app.config.globalProperties
//   cookiesRes = $cookies.get('idiary')
//   console.log('_ga', $cookies.get('_ga'))
//   next()
// }

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
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/my/index',
      name: 'MyIndex',
      component: MyIndex,
      children: [
        {
          path: '/my/index',
          name: 'MyHome',
          component: MyHome
        },
        {
          path: '/my/profile',
          name: 'MyProfile',
          component: MyProfile
        },
        {
          path: '/my/identities',
          name: 'MyIdentities',
          component: MyIdentities
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
          path: '/my/following',
          name: 'MyFollowing',
          component: MyFollowing
        }
      ],
      meta: {
        requiresAuth: true
      }
    }
  ]
})

export default router
