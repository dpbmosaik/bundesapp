import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'; // eslint-disable-line

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    username: null,
  },
  getters: {
    isAuthenticated(state) {
      return !!state.accessToken;
    },
    username(state) {
      return state.username;
    },
  },
  setters: {
    setUsername(state, newData) {
      state.username = newData;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
