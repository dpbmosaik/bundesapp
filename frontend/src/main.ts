import { createApp } from 'vue';
import App from './App.vue'; // @ts-ignore
import router from './router'; // @ts-ignore
import store from './store'; // @ts-ignore
import './index.css';
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';
import { VueKeycloakInstance } from "@dsb-norge/vue-keycloak-js/dist/types";
import { KeycloakInstance } from "keycloak-js"; // eslint-disable-line
import keycl from './auth/keycloak'; // @ts-ignore
import auth from './auth'; // @ts-ignore

auth.interceptorsSetup(store, router);

const vueOptions = {
  init: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  },
  config: {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
  },
  onReady (keycloak: KeycloakInstance) {
    console.log('onReady');
    console.log(keycloak);
    store.commit('setIsAuth', true);
    // app.config.globalProperties.$keycloak = keycloak;
    // debugger; // eslint-disable-line
    store.commit('setTokens', keycloak.token, keycloak.refreshToken);
    keycloak.loadUserInfo().then((userInfo) => {
      console.log('userInfo');
      console.log(userInfo);
      // debugger; // eslint-disable-line
      store.commit('setIsAuth', true);
      store.commit('setUserinfo', userInfo);
      keycl.setRefreshInterval(keycloak);
    });
    keycl.getPersonalData();
  }
};

createApp(App).use(store).use(router).use(VueKeycloakJs, vueOptions).mount('#app');


// In the descendant component
export default {
  inject: ['myGlobalVariable']
}