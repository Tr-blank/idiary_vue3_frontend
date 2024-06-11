import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue3-cookies'
import App from './App.vue'
import router from './router'
// import format from './plugins/format'

const app = createApp(App)

app.use(createPinia())
app.use(VueCookies)
app.use(router)
router.app = app
// app.use(format)

app.mount('#app')
