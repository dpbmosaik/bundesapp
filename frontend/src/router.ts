import { createRouter, createWebHistory } from 'vue-router'

import AuthRouter from '@/modules/auth/router/index.js';
import HomeRouter from '@/modules/home/router';
// import AdminRouter from '@/modules/app/views/admin/router';
// import DashboardRouter from '@/modules/app/views/dashboard/router';
// import EventRouter from '@/modules/app/views/events/router';
// import FinanceRouter from '@/modules/app/views/finance/router';
// import ManagementRouter from '@/modules/app/views/management/router';
// import MemberRouter from '@/modules/app/views/members/router';
// import StatisticRouter from '@/modules/app/views/statistic/router';
// import SettingsRouter from '@/modules/app/views/settings/router';
// import GroupsRouter from '@/modules/app/views/groups/router';
import AppRouter from '@/modules/app/router'

const routes = [
  ...AuthRouter,
  ...AppRouter,
  // ...AdminRouter,
  // ...DashboardRouter,
  // ...EventRouter,
  // ...FinanceRouter,
  // ...ManagementRouter,
  // ...MemberRouter,
  // ...StatisticRouter,
  // ...SettingsRouter,
  // ...GroupsRouter,
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
