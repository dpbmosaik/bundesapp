export default [
    {
        path: '/admin',
        name: 'admin',
        redirect: { name: 'adminMain' },
        component: () => import(/* webpackChunkName: "register" */ '@/modules/admin/views/Main.vue'),
        children: [
          {
            path: '/admin/main',
            name: 'adminMain',
            component: () => import(/* webpackChunkName: "register" */ '@/modules/admin/views/Main.vue')
          },
        ]
    },
]