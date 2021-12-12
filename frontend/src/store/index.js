import { createStore } from 'vuex';
import VueJwtDecode from 'vue-jwt-decode';

export default createStore({
  state: {
    userinfo: {
      fahrtenname: '',
      stamm: '',
      bund: '',
    },
    accessToken: null,
    refreshToken: null,
    isAuth: false,
  },
  getters: {
    userinfo(state) {
      return state.userinfo;
    },
    getJwtData(state) {
      if (state.accessToken) {
        return VueJwtDecode.decode(state.accessToken);
      }
      return {};
    },
    isAuth(state) {
      return state.isAuth;
    }
  },
  mutations: {
    setUserinfo(state, userinfo) {
      state.userinfo = userinfo;
    },
    setIsAuth(state, value) {
      state.isAuth = value;
    },
    clearUserinfo(state) {
      state.userinfo = {
        fahrtenname: '',
        stamm: '',
        bund: '',
      };
    },
    setTokens(state, access, refresh) {
      state.accessToken = access;
      state.refreshToken = refresh;
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  actions: {},
  modules: {},
});
