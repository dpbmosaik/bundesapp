import { defineStore } from "pinia";

export const useLoggedInUserStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "loggedInUser",
  state: () => ({
    user: {
      firstName: null,
    },
    keycloak: {
      token: null,
    },
  }),
  getters: {
    token: function() {
      return this.keycloak.token;
    },
    isAuth: function() {
      return !!this.keycloak.token;
    },
    firstName: function() {
      return this.user.firstName;
    }
  },
  actions: {
    async updateUserData(post) {
      this.user = post;
    },
    async updateAuthData(data) {
      this.keycloak = data
  },
}
});