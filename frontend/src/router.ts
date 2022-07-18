import { createRouter, createWebHistory } from 'vue-router'

import AuthRouter from '@/modules/auth/router/index.js';
import HomeRouter from '@/modules/home/router';
import AppRouter from '@/modules/app/router'

const routes = [
  ...AuthRouter,
  ...AppRouter,
  ...HomeRouter
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const isAuthenticated = true;

router.beforeEach((to, from, next) => {
  if (to.path == '/' && isAuthenticated) {
    next({ path: '/app' });
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next({
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }) 
  } else {
    next();
  }
});

export default router
