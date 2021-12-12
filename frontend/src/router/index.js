import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue')
  },
  {
    path: '/app',
    name: 'App',
    component: () => import(/* webpackChunkName: "main-app" */ '../views/Main.vue'),
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/app/Dashboard.vue')
      },
      {
        path: 'mitglieder',
        name: 'Mitgliederverwaltung',
        component: () => import(/* webpackChunkName: "mitglieder" */ '../components/app/Members.vue')
      },
      {
        path: 'gruppen',
        name: 'Gruppenverwaltung',
        component: () => import(/* webpackChunkName: "Gruppen" */ '../components/app/Groups.vue')
      },
      {
        path: 'verwaltung',
        name: 'Verwaltung',
        component: () => import(/* webpackChunkName: "Verwaltung" */ '../components/app/Management.vue')
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import(/* webpackChunkName: "Analytics" */ '../components/app/Analytics.vue')
      },
      {
        path: 'profil',
        name: 'Profil',
        component: () => import(/* webpackChunkName: "profil" */ '../components/app/Profile.vue')
      },
      {
        path: 'einstellungen',
        name: 'Einstellungen',
        component: () => import(/* webpackChunkName: "einstellungen" */ '../components/app/Settings.vue')
      },
    ]
  },
  // Separated into two routes so that you can also programmatically
  // direct the user to the /404 if missing some data, etc.
  { path: '/404', component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
