import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import auth from '@/modules/auth/helpers/index.js'
import { vueKeycloak } from '@/plugin/keycloak'

auth.interceptorsSetup(store, router)

const vueOptions = {
  initOptions: {
    onLoad: 'check-sso',
    checkLoginIframe: false,
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  },
  config: {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID
  }
}

createApp(App).use(store).use(router).use(vueKeycloak, vueOptions).mount('#app')

// In the descendant component
export default {
  inject: ['myGlobalVariable']
}
