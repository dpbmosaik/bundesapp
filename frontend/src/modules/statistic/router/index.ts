export default [
    {
        path: '/statistic',
        name: 'statistic',
        redirect: { name: 'statisticMain' },
        component: () => import(/* webpackChunkName: "register" */ '@/modules/statistic/views/Main.vue'),
        children: [
          {
            path: '/statistic/main',
            name: 'statisticMain',
            component: () => import(/* webpackChunkName: "register" */ '@/modules/statistic/views/Main.vue')
          },
        ]
    },
]