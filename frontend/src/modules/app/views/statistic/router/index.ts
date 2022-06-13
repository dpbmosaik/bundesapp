export default [
    {
        path: '/app/statistic',
        name: 'statistic',
        redirect: { name: 'statisticMain' },
        component: () => import(/* webpackChunkName: "statisticMain" */ '@/modules/app/views/statistic/views/Main.vue'),
        children: [
          {
            path: '/app/statistic/main',
            name: 'statisticMain',
            component: () => import(/* webpackChunkName: "statisticMain" */ '@/modules/app/views/statistic/views/Main.vue')
          },
        ]
    },
]