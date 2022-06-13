export default [
    {
        path: '/app/finance',
        name: 'finance',
        redirect: { name: 'financeMain' },
        component: () => import(/* webpackChunkName: "financeMain" */ '@/modules/app/views/finance/views/Main.vue'),
        children: [
          {
            path: '/app/finance/main',
            name: 'financeMain',
            component: () => import(/* webpackChunkName: "financeMain" */ '@/modules/app/views/finance/views/Main.vue')
          },
        ]
    },
]