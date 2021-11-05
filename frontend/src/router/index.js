import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingStartMain from '@/views/landing/start/Main.vue'

import AboutContactMain from '@/views/about/contact/Main.vue'
import AboutImpressumMain from '@/views/about/impressum/Main.vue'
import AboutPrivacyMain from '@/views/about/privacy/Main.vue'

import SignInCreateAccountMain from '@/views/signIn/createAccount/Main.vue'
import SignInUpdateAccountMain from '@/views/signIn/updateAccount/Main.vue'

import MasterDataStammMain from '@/views/masterData/stamm/Main.vue'
import MasterDataRingMain from '@/views/masterData/ring/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingStartMain',
    component: LandingStartMain
  },

  {
    path: '/about/contact',
    name: 'AboutContactMain',
    component: AboutContactMain
  },
  {
    path: '/about/impressum',
    name: 'AboutImpressumMain',
    component: AboutImpressumMain
  },
  {
    path: '/about/privacy',
    name: 'AboutPrivacyMain',
    component: AboutPrivacyMain
  },

  {
    path: '/sign-up/create-account',
    name: 'SignInCreateAccountMain',
    component: SignInCreateAccountMain
  },
  {
    path: '/sign-up/update-account',
    name: 'SignInUpdateAccountMain',
    component: SignInUpdateAccountMain
  },

  {
    path: '/master-data/stamm',
    name: 'MasterDataStammMain',
    component: MasterDataStammMain
  },
  {
    path: '/master-data/ring',
    name: 'MasterDataRingMain',
    component: MasterDataRingMain
  }
]

const router = new VueRouter({
  routes
})

export default router
