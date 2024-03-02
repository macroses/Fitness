import './assets/styles/main.css'
import 'vue3-toastify/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toasity from 'vue3-toastify'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)
app.use(Vue3Toasity, {
  autoClose: 3000,
  limit: 3,
  style: {
    fontSize: '13px'
  },
  hideProgressBar: true,
  pauseOnHover: true
})
app.mount('#app')
