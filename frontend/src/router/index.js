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
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    children: [
      {
        path: '/register/1',
        name: 'Register1',
        component: () => import(/* webpackChunkName: "register" */ '../components/form/RegisterProcess/RegisterFirstStep.vue')
      },
      {
        path: '/register/2',
        name: 'Register2',
        component: () => import(/* webpackChunkName: "register" */ '../components/form/RegisterProcess/RegisterSecondStep.vue')
      },
      {
        path: '/register/3',
        name: 'Register3',
        component: () => import(/* webpackChunkName: "register" */ '../components/form/RegisterProcess/RegisterThirdStep.vue')
      },
      {
        path: '/register/4',
        name: 'Register4',
        component: () => import(/* webpackChunkName: "register" */ '../components/form/RegisterProcess/RegisterFourthStep.vue')
      },
      {
        path: '/register/5',
        name: 'Register5',
        component: () => import(/* webpackChunkName: "register" */ '../components/form/RegisterProcess/RegisterFifthStep.vue')
      },
      {
        path: '/register/6',
        name: 'Register6',
        component: () => import(/* webpackChunkName: "register" */ '../components/form/RegisterProcess/RegisterSixthStep.vue')
      },
    ]
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
    component: () => import(/* webpackChunkName: "login" */ '../views/Demo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
