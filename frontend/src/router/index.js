import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/modules/marketing/views/landing/LandingMain.vue';
import About from '@/modules/marketing/views/about/AboutMain.vue';
import Register from '@/modules/auth/views/register/RegisterMain.vue';
import Contact from '@/modules/marketing/views/contact/ContactMain.vue';
import Login from '@/modules/auth/views/login/LoginMain.vue';
import Demo from '@/modules/marketing/views/demo/DemoMain.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    redirect: { name: 'Register1' },
    children: [
      {
        path: '/register/1',
        name: 'Register1',
        component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/register/components/RegisterFirstStep.vue')
      },
      {
        path: '/register/2',
        name: 'Register2',
        component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/register/components/RegisterSecondStep.vue')
      },
      {
        path: '/register/3',
        name: 'Register3',
        component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/register/components/RegisterThirdStep.vue')
      },
      {
        path: '/register/4',
        name: 'Register4',
        component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/register/components/RegisterFourthStep.vue')
      },
      {
        path: '/register/5',
        name: 'Register5',
        component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/register/components/RegisterFifthStep.vue')
      },
      {
        path: '/register/6',
        name: 'Register6',
        component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/register/components/RegisterSixthStep.vue')
      },
    ]
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo,
	},
  {
    path: '/app',
    name: 'App',
    component: () => import(/* webpackChunkName: "main-app" */ '@/modules/app/views/MainView.vue'),
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/modules/app/views/dashboard/DashboardMain.vue')
      },
      {
        path: 'mitglieder',
        name: 'Mitgliederverwaltung',
        component: () => import(/* webpackChunkName: "mitglieder" */ '@/modules/app/views/members/MembersMain.vue')
      },
      {
        path: 'gruppen',
        name: 'Gruppenverwaltung',
        component: () => import(/* webpackChunkName: "Gruppen" */ '@/modules/app/views/groups/GroupsMain.vue')
      },
      {
        path: 'verwaltung',
        name: 'Verwaltung',
        component: () => import(/* webpackChunkName: "Verwaltung" */ '@/modules/app/views/management/ManagementMain.vue')
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import(/* webpackChunkName: "Analytics" */ '@/modules/app/views/analytics/AnalyticsMain.vue')
      },
      {
        path: 'profil',
        name: 'Profil',
        component: () => import(/* webpackChunkName: "profil" */ '@/modules/app/views/profile/ProfileMain.vue')
      },
      {
        path: 'einstellungen',
        name: 'Einstellungen',
        component: () => import(/* webpackChunkName: "einstellungen" */ '@/modules/app/views/settings/SettingsMain.vue')
      },
    ]
  },
  // Separated into two routes so that you can also programmatically
  // direct the user to the /404 if missing some data, etc.
  { path: '/404', component: () => import(/* webpackChunkName: "NotFound" */ '@/modules/views/page404/page404Main.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
	history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router;
