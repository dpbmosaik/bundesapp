import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/pages/Index.vue'
import AppRouter from '@/modules/app/router/index.js';
import MarketingRouter from '@/modules/marketing/router/index.js';
import AuthRouter from '@/modules/auth/router/index.js';

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: 'Vite + Vue + TypeScript + Tailwind Starter Template',
    },
  },
  ...AppRouter,
  ...MarketingRouter,
  ...AuthRouter,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
