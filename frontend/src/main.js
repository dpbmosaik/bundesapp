import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';
import keycl from './auth/keycloak';
import auth from './auth';

auth.interceptorsSetup(store, router);

const vueOptions = {
    init: {
        // Use 'login-required' to always require authentication
        // If using 'login-required', there is no need for the router guards in router.js
        onLoad: 'check-sso',
        checkLoginIframe: false,
    },
    config: {
        url: process.env.VUE_APP_KEYCLOAK_URL,
        realm: process.env.VUE_APP_KEYCLOAK_REALM,
        clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
        onLoad: 'check-sso',
        checkLoginIframe: false,
    },
    onReady(keycloak) {
        store.commit('setTokens', keycloak.token, keycloak.refreshToken);
        keycloak.loadUserInfo()
            .then((userInfo) => {
                store.commit('setUserinfo', userInfo);
                keycl.setRefreshInterval(keycloak);

            });
        keycl.getPersonalData();
    },
    onInitError(error) {
        console.log('error', error);
    },
};

createApp(App).use(store).use(router).use(VueKeycloakJs, vueOptions).mount('#app')
