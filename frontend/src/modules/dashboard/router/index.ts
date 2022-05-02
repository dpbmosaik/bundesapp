export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        redirect: { name: 'dashboardMain' },
        component: () => import(/* webpackChunkName: "register" */ '@/modules/dashboard/views/Main.vue'),
        children: [
          {
            path: '/dashboard/main',
            name: 'dashboardMain',
            component: () => import(/* webpackChunkName: "register" */ '@/modules/dashboard/views/Main.vue')
          },
        ]
    },
]