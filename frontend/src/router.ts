import { createRouter, createWebHistory } from 'vue-router'

import AppRouter from '@/modules/app/router/index.js';
import AuthRouter from '@/modules/auth/router/index.js';

const routes = [
  ...AppRouter,
  ...AuthRouter,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
