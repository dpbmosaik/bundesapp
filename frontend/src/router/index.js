import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/modules/views/Home.vue';
import About from '@/modules/views/About.vue';
import Register from '@/modules/views/Register.vue';
import Contact from '@/modules/views/Contact.vue';
import Login from '@/modules/views/Login';
import Demo from '@/modules/views/Demo.vue';

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
        component: () => import(/* webpackChunkName: "register" */ '@/common/components/form/RegisterProcess/RegisterFirstStep.vue')
      },
      {
        path: '/register/2',
        name: 'Register2',
        component: () => import(/* webpackChunkName: "register" */ '@/common/components/form/RegisterProcess/RegisterSecondStep.vue')
      },
      {
        path: '/register/3',
        name: 'Register3',
        component: () => import(/* webpackChunkName: "register" */ '@/common/components/form/RegisterProcess/RegisterThirdStep.vue')
      },
      {
        path: '/register/4',
        name: 'Register4',
        component: () => import(/* webpackChunkName: "register" */ '@/common/components/form/RegisterProcess/RegisterFourthStep.vue')
      },
      {
        path: '/register/5',
        name: 'Register5',
        component: () => import(/* webpackChunkName: "register" */ '@/common/components/form/RegisterProcess/RegisterFifthStep.vue')
      },
      {
        path: '/register/6',
        name: 'Register6',
        component: () => import(/* webpackChunkName: "register" */ '@/common/components/form/RegisterProcess/RegisterSixthStep.vue')
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
    component: () => import(/* webpackChunkName: "main-app" */ '@/modules/views/Main.vue'),
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/common/components/app/Dashboard.vue')
      },
      {
        path: 'mitglieder',
        name: 'Mitgliederverwaltung',
        component: () => import(/* webpackChunkName: "mitglieder" */ '@/common/components/app/Members.vue')
      },
      {
        path: 'gruppen',
        name: 'Gruppenverwaltung',
        component: () => import(/* webpackChunkName: "Gruppen" */ '@/common/components/app/Groups.vue')
      },
      {
        path: 'verwaltung',
        name: 'Verwaltung',
        component: () => import(/* webpackChunkName: "Verwaltung" */ '@/common/components/app/Management.vue')
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import(/* webpackChunkName: "Analytics" */ '@/common/components/app/Analytics.vue')
      },
      {
        path: 'profil',
        name: 'Profil',
        component: () => import(/* webpackChunkName: "profil" */ '@/common/components/app/Profile.vue')
      },
      {
        path: 'einstellungen',
        name: 'Einstellungen',
        component: () => import(/* webpackChunkName: "einstellungen" */ '@/common/components/app/Settings.vue')
      },
    ]
  },
  // Separated into two routes so that you can also programmatically
  // direct the user to the /404 if missing some data, etc.
  { path: '/404', component: () => import(/* webpackChunkName: "NotFound" */ '@/modules/views/NotFound.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
	history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router;
