export default [
    {
        path: '/app/dashboard',
        name: 'dashboard',
        redirect: { name: 'dashboardMain' },
        component: () => import(/* webpackChunkName: "dashboardMain" */ '@/modules/app/views/dashboard/views/Main.vue'),
        children: [
          {
            path: '/app/dashboard/main',
            name: 'dashboardMain',
            component: () => import(/* webpackChunkName: "dashboardMain" */ '@/modules/app/views/dashboard/views/Main.vue')
          },
        ]
    },
]