export default [
    {
        path: '/app/groups',
        name: 'groups',
        redirect: { name: 'groupsMain' },
        component: () => import(/* webpackChunkName: "groupsMain" */ '@/modules/app/views/groups/views/Main.vue'),
        children: [
          {
            path: '/app/groups/main',
            name: 'groupsMain',
            component: () => import(/* webpackChunkName: "groupsMain" */ '@/modules/app/views/groups/views/Main.vue')
          },
        ]
    },
]