export default [
    {
        path: '/finance',
        name: 'finance',
        redirect: { name: 'financeMain' },
        component: () => import(/* webpackChunkName: "register" */ '@/modules/finance/views/Main.vue'),
        children: [
          {
            path: '/finance/main',
            name: 'financeMain',
            component: () => import(/* webpackChunkName: "register" */ '@/modules/finance/views/Main.vue')
          },
        ]
    },
]