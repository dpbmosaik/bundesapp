export default [
    {
        path: '/app/events',
        name: 'events',
        redirect: { name: 'eventsMain' },
        component: () => import(/* webpackChunkName: "eventsMain" */ '@/modules/app/views/events/views/Main.vue'),
        children: [
          {
            path: '/app/events/main',
            name: 'eventsMain',
            component: () => import(/* webpackChunkName: "eventsMain" */ '@/modules/app/views/events/views/Main.vue')
          },
        ]
    },
]