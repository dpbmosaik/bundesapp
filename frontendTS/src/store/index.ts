import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueJwtDecode from 'vue-jwt-decode'

export default createStore({
  state: {
    userinfo: {
      fahrtenname: '',
      stamm: '',
      bund: ''
    },
    accessToken: null,
    refreshToken: null,
    isAuth: false,
    register: {
      firstname: '',
      lastname: '',
      scoutname: '',
      email: '',
      stamm: '',
      group: '',
      birthdate: '',
      gender: '',
      street: '',
      zipCode: '',
      additional: '',
      phone: '',
      password: '',
      stepsDone: {
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false
      }
    }
  },
  getters: {
    userinfo (state) {
      return state.userinfo
    },
    getJwtData (state) {
      if (state.accessToken) {
        return VueJwtDecode.decode(state.accessToken)
      }
      return {}
    },
    isAuth (state) {
      return !!state.accessToken
    }
  },
  mutations: {
    setRegisterFirstName (state, payload) {
      state.register.firstname = payload.firstname
    },
    setRegisterLastName (state, payload) {
      state.register.lastname = payload.lastname
    },
    setRegisterScoutName (state, payload) {
      state.register.scoutname = payload.scoutname
    },
    setRegisterEmail (state, payload) {
      state.register.email = payload.email
    },
    changeStateOfFirstStep (state, payload) {
      state.register.stepsDone.step1 = payload.value
    },
    setUserinfo (state, userinfo) {
      state.userinfo = userinfo
    },
    setIsAuth (state, value) {
      state.isAuth = value
    },
    clearUserinfo (state) {
      state.userinfo = {
        fahrtenname: '',
        stamm: '',
        bund: ''
      }
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTokens: function (state, access, refresh) {
      state.accessToken = access
      state.refreshToken = refresh
    },
    clearTokens (state) {
      state.accessToken = null
      state.refreshToken = null
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
