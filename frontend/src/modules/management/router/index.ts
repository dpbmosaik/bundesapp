export default [
    {
        path: '/management',
        name: 'management',
        redirect: { name: 'managementMain' },
        component: () => import(/* webpackChunkName: "register" */ '@/modules/management/views/Main.vue'),
        children: [
          {
            path: '/management/main',
            name: 'managementMain',
            component: () => import(/* webpackChunkName: "register" */ '@/modules/management/views/Main.vue')
          },
        ]
    },
]