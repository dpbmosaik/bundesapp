export default [
    {
        path: '/app',
        name: 'app',
        meta: { requiresAuth: true },
        redirect: { name: 'dashboard' },
        component: () => import(/* webpackChunkName: "AppMain" */ '@/modules/app/AppMain.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                meta: { requiresAuth: true },
                redirect: { name: 'dashboardMain' },
                component: () => import(/* webpackChunkName: "dashboardMain" */ '@/modules/app/views/dashboard/views/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'dashboardMain',
                        meta: { requiresAuth: true },
                        component: () => import(/* webpackChunkName: "dashboardMain" */ '@/modules/app/views/dashboard/views/Main.vue'),
                    },
                ]
            },
            {
                path: 'admin',
                name: 'admin',
                meta: { requiresAuth: true },
                redirect: { name: 'adminMain' },
                component: () => import(/* webpackChunkName: "adminMain" */ '@/modules/app/views/admin/views/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'adminMain',
                        component: () => import(/* webpackChunkName: "adminMain" */ '@/modules/app/views/admin/views/Main.vue')
                    },
                ]
            },
            {
                path: 'events',
                name: 'events',
                meta: { requiresAuth: true },
                redirect: { name: 'eventsMain' },
                component: () => import(/* webpackChunkName: "eventsMain" */ '@/modules/app/views/events/views/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'eventsMain',
                        component: () => import(/* webpackChunkName: "eventsMain" */ '@/modules/app/views/events/views/Main.vue')
                    },
                ]
            },
            {
                path: 'finance',
                name: 'finance',
                meta: { requiresAuth: true },
                redirect: { name: 'financeMain' },
                component: () => import(/* webpackChunkName: "financeMain" */ '@/modules/app/views/finance/views/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'financeMain',
                        component: () => import(/* webpackChunkName: "financeMain" */ '@/modules/app/views/finance/views/Main.vue')
                    },
                ]
            },
            {
                path: 'groups',
                name: 'groups',
                meta: { requiresAuth: true },
                redirect: { name: 'groupsMain' },
                component: () => import(/* webpackChunkName: "groupsMain" */ '@/modules/app/views/groups/views/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'groupsMain',
                        component: () => import(/* webpackChunkName: "groupsMain" */ '@/modules/app/views/groups/views/Main.vue')
                    },
                ]
            },
            {
                path: 'management',
                name: 'management',
                meta: { requiresAuth: true },
                redirect: { name: 'managementMain' },
                component: () => import(/* webpackChunkName: "managementMain" */ '@/modules/app/views/management/views/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'managementMain',
                        component: () => import(/* webpackChunkName: "managementMain" */ '@/modules/app/views/management/views/Main.vue')
                    },
                ]
            },
            {
                path: 'members',
                name: 'members',
                meta: { requiresAuth: true },
                redirect: { name: 'membersMain' },
                component: () => import(/* webpackChunkName: "membersMain" */ '@/modules/app/views/members/views/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'membersMain',
                        component: () => import(/* webpackChunkName: "membersMain" */ '@/modules/app/views/members/views/Main.vue')
                    },
                ]
            },
            {
                path: 'settings',
                name: 'settings',
                meta: { requiresAuth: true },
                redirect: { name: 'settingsMain' },
                component: () => import(/* webpackChunkName: "settingsMain" */ '@/modules/app/views/settings/views/Main.vue'),
                children: [
                    {
                        path: "main",
                        name: "settingsMain",
                        component: () => import(/* webpackChunkName: "settingsMain" */ "@/modules/app/views/settings/views/Main.vue"),
                    },
                    {
                        path: "my-profile",
                        name: "myProfile",
                        component: () => import(/* webpackChunkName: "myProfile" */ "@/modules/app/views/settings/views/MyProfile.vue"),
                    },
                ]
            },
            {
                path: 'statistic',
                name: 'statistic',
                meta: { requiresAuth: true },
                redirect: { name: 'statisticMain' },
                component: () => import(/* webpackChunkName: "statisticMain" */ '@/modules/app/views/statistic/views/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'statisticMain',
                        component: () => import(/* webpackChunkName: "statisticMain" */ '@/modules/app/views/statistic/views/Main.vue')
                    },
                ]
            },
        ]
    },
]