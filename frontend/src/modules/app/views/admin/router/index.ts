export default [
    {
        path: '/app/admin',
        name: 'admin',
        redirect: { name: 'adminMain' },
        component: () => import(/* webpackChunkName: "adminMain" */ '@/modules/app/views/admin/views/Main.vue'),
        children: [
          {
            path: '/main',
            name: 'adminMain',
            component: () => import(/* webpackChunkName: "adminMain" */ '@/modules/app/views/admin/views/Main.vue')
          },
        ]
    },
]