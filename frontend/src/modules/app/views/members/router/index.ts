export default [
    {
        path: '/app/members',
        name: 'members',
        redirect: { name: 'membersMain' },
        component: () => import(/* webpackChunkName: "membersMain" */ '@/modules/app/views/members/views/Main.vue'),
        children: [
          {
            path: '/app/members/main',
            name: 'membersMain',
            component: () => import(/* webpackChunkName: "membersMain" */ '@/modules/app/views/members/views/Main.vue')
          },
        ]
    },
]