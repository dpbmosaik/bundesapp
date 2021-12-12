import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';
import keycl from '@/modules/auth/helpers/keycloak.js';
import auth from '@/modules/auth/helpers/index.js';

auth.interceptorsSetup(store, router);

const vueOptions = {
  init: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html"
  },
  config: {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID
  },
  onReady(keycloak) {
    console.log('onReady');
    console.log(keycloak);
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
  },
  onInitError(error) {
    console.log('error', error);
  },
};

createApp(App).use(store).use(router).use(VueKeycloakJs, vueOptions).mount('#app');