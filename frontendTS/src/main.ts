import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import auth from '@/modules/auth/helpers/index.js'

auth.interceptorsSetup(store, router)

createApp(App).use(store).use(router).mount('#app')

// In the descendant component
export default {
  inject: ['myGlobalVariable']
}
