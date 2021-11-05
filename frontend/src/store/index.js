import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'; // eslint-disable-line

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
  },
  getters: {
    isAuthenticated(state) {
      return !!state.accessToken;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
