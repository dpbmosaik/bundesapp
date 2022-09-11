import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import "./assets/index.postcss";

import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import { VueKeycloakInstance } from "@dsb-norge/vue-keycloak-js/dist/types"
import keycl from './auth/keycloak'; // @ts-ignore
import auth from './auth'; // @ts-ignore

auth.interceptorsSetup();

const option = {
  init: {
    onLoad: 'login-required',
    checkLoginIframe: true,
  },

  config: {
    url: import.meta.env.VITE_APP_KEYCLOAK_URL,
    realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
  },
  onReady (keycloak: VueKeycloakInstance) {
    keycloak.loadUserProfile().then((userInfo) => { // @ts-ignore
      if (userInfo) {
        keycl.saveUserInfoInStore(userInfo)
        keycl.saveAuthInfoInStore(keycloak)
      } else {
        router.push('login')
      }
    });
  },
  onInitError (keycloak: VueKeycloakInstance) {
    console.log('Keycloak FehlerVueKeyCloakInstance keycloak')
  }
}

const head = createHead();
console.log(option)
const app = createApp(App).use(VueKeyCloak, option)

app.use(createPinia());
app.use(router);
app.use(head);

app.mount("#app");

// Allow usage of this.$keycloak in components
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties  {
    $keycloak: VueKeycloakInstance
  }
}
