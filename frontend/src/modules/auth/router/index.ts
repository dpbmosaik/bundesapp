export default [
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/register/RegisterMain.vue'),        
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/views/login/LoginMain.vue'),
      },
      {
        path: '/logout',
        name: 'Logout',
        component: () => import(/* webpackChunkName: "logout" */ '@/modules/auth/views/logout/LogoutMain.vue')
      },
]