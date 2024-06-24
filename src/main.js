import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyLoad from 'vue3-lazyload'
import VueCookies from 'vue3-cookies'
import App from './App.vue'
import router from './router'
// import format from './plugins/format'

const app = createApp(App)

app.use(createPinia())
app.use(VueCookies)
app.use(VueLazyLoad, {
  loading:
    'https://storage.googleapis.com/fir-express-f30ab.appspot.com/idiary_images/avatar/ecf7a4de-43b9-4115-9f8f-59e8e8481760.JPG?GoogleAccessId=firebase-adminsdk-kq06k%40fir-express-f30ab.iam.gserviceaccount.com&Expires=16756646400&Signature=h%2BEc%2F6ENBB1H9tkpaA%2FbfJgKAQdBnsm68fbUOlIjNS2UkfLLGUS1LX95i%2FkU%2BqXLG3W6EbHrWq2NL%2FKHLXAVzLrLz2mve%2BEw1JOxLNCPJlL6mDTk5X2srGzng2pNBGarKUaNKgSkYhxLyIXBnmDemg4J9tj%2FHXap%2BhLWxZL7oxvM4mTrQdmoJM7SoGoepydEf6MpyQq1Os8QMJlbQ%2FVEAXVG8m2j5Zw%2BTIRkEK5QYoP6LMAA466szRumLwXBKfzUCgJHScrUtiyo10Ia6v6%2B2GKzDPRiAGbz4acxXzCC7d8OCPqFymVcLGFqWpDLAEpZrFRPhwQg86W3Prag%2BqAjJA%3D%3D',
  error:
    'https://storage.googleapis.com/fir-express-f30ab.appspot.com/idiary_images/avatar/ecf7a4de-43b9-4115-9f8f-59e8e8481760.JPG?GoogleAccessId=firebase-adminsdk-kq06k%40fir-express-f30ab.iam.gserviceaccount.com&Expires=16756646400&Signature=h%2BEc%2F6ENBB1H9tkpaA%2FbfJgKAQdBnsm68fbUOlIjNS2UkfLLGUS1LX95i%2FkU%2BqXLG3W6EbHrWq2NL%2FKHLXAVzLrLz2mve%2BEw1JOxLNCPJlL6mDTk5X2srGzng2pNBGarKUaNKgSkYhxLyIXBnmDemg4J9tj%2FHXap%2BhLWxZL7oxvM4mTrQdmoJM7SoGoepydEf6MpyQq1Os8QMJlbQ%2FVEAXVG8m2j5Zw%2BTIRkEK5QYoP6LMAA466szRumLwXBKfzUCgJHScrUtiyo10Ia6v6%2B2GKzDPRiAGbz4acxXzCC7d8OCPqFymVcLGFqWpDLAEpZrFRPhwQg86W3Prag%2BqAjJA%3D%3D'
})
app.use(router)
router.app = app
// app.use(format)

app.mount('#app')
