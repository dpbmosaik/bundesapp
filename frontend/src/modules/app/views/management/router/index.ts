export default [
    {
        path: '/app/management',
        name: 'management',
        redirect: { name: 'managementMain' },
        component: () => import(/* webpackChunkName: "managementMain" */ '@/modules/app/views/management/views/Main.vue'),
        children: [
          {
            path: '/app/management/main',
            name: 'managementMain',
            component: () => import(/* webpackChunkName: "managementMain" */ '@/modules/app/views/management/views/Main.vue')
          },
        ]
    },
]