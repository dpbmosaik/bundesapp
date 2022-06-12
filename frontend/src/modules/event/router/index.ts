export default [
    {
        path: '/event',
        name: 'event',
        redirect: { name: 'eventMain' },
        component: () => import(/* webpackChunkName: "register" */ '@/modules/event/views/Main.vue'),
        children: [
          {
            path: '/event/main',
            name: 'eventMain',
            component: () => import(/* webpackChunkName: "register" */ '@/modules/event/views/Main.vue')
          },
        ]
    },
]