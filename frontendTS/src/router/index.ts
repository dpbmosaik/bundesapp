import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/modules/marketing/views/landing/LandingMain.vue'

import AppRouter from '@/modules/app/router'
import MarketingRouter from '@/modules/marketing/router'
import AuthRouter from '@/modules/auth/router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...MarketingRouter,
  ...AuthRouter,
  ...AppRouter,
  // Separated into two routes so that you can also programmatically
  // direct the user to the /404 if missing some data, etc.
  { path: '/404', component: () => import(/* webpackChunkName: "page404" */ '@/modules/views/page404/page404Main.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

console.log(AppRouter)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
