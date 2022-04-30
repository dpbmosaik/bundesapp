import Register from '@/modules/auth/views/register/RegisterMain.vue';
import Login from '@/modules/auth/views/login/LoginMain.vue';

export default [
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
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/logout',
        name: 'Logout',
        component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/logout/LogoutMain.vue')
      },
]