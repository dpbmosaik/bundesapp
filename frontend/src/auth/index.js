import axios from 'axios';
import { useLoggedInUserStore } from "@/store/loggedInUser";

export default {
  interceptorsSetup() {
    axios.interceptors.request.use(
      (config) => {
        const userStore = useLoggedInUserStore()
        if (userStore && userStore.keycloak && userStore.keycloak.token) {
          config.headers.Authorization = `Bearer ${userStore.keycloak.token}`; // eslint-disable-line no-param-reassign
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
  },
};