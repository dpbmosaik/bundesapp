export default [
    {
        path: '/member',
        name: 'member',
        redirect: { name: 'memberMain' },
        component: () => import(/* webpackChunkName: "register" */ '@/modules/member/views/Main.vue'),
        children: [
          {
            path: '/member/main',
            name: 'memberMain',
            component: () => import(/* webpackChunkName: "register" */ '@/modules/member/views/Main.vue')
          },
        ]
    },
]