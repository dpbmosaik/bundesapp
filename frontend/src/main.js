import Vue from 'vue'
import Vuelidate from 'vuelidate';
import moment from 'moment';
import store from './store';
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import vuetify from './plugins/vuetify'
import auth from './auth';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuelidate);

Vue.prototype.moment = moment;

auth.interceptorsSetup(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
