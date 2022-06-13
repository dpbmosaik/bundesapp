import { createRouter, createWebHistory } from 'vue-router'

import AuthRouter from '@/modules/auth/router/index.js';
import AdminRouter from '@/modules/admin/router';
import DashboardRouter from '@/modules/dashboard/router';
import EventRouter from '@/modules/event/router';
import FinanceRouter from '@/modules/finance/router';
import ManagementRouter from '@/modules/management/router';
import MemberRouter from '@/modules/member/router';
import StatisticRouter from '@/modules/statistic/router';
import SettingsRouter from '@/modules/settings/router';
import GroupsRouter from '@/modules/groups/router';

const routes = [
  ...AuthRouter,
  ...AdminRouter,
  ...DashboardRouter,
  ...EventRouter,
  ...FinanceRouter,
  ...ManagementRouter,
  ...MemberRouter,
  ...StatisticRouter,
  ...SettingsRouter,
  ...GroupsRouter
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
