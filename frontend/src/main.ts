import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import "./assets/index.postcss";
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'
import {VueKeycloakInstance} from "@dsb-norge/vue-keycloak-js/dist/types";
import {KeycloakInstance} from "keycloak-js";
const option = {
  init: {
    onLoad: 'check-sso',
    checkLoginIframe: false,
  },

  config: {
    url: import.meta.env.VITE_APP_KEYCLOAK_URL,
    realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
  },
  onReady (keycloak: KeycloakInstance) {
    console.log('Keycloak ready', keycloak)
  },
  onInitError (keycloak: KeycloakInstance) {
    console.log('Keycloak Fehler', keycloak)
  }
}

const head = createHead();
const app = createApp(App).use(VueKeycloakJs, option);

app.use(createPinia());
app.use(router);
app.use(head);

app.mount("#app");
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties  {
    $keycloak: VueKeycloakInstance
  }
}

