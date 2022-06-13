export default [
    {
        path: '/groups',
        name: 'groups',
        redirect: { name: 'groupsMain' },
        component: () => import(/* webpackChunkName: "register" */ '@/modules/groups/views/Main.vue'),
        children: [
          {
            path: '/groups/main',
            name: 'groupsMain',
            component: () => import(/* webpackChunkName: "register" */ '@/modules/groups/views/Main.vue')
          },
        ]
    },
]