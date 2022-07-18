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
                component: () => import(/* webpackChunkName: "dashboardMain" */ '@/modules/app/views/dashboard/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'dashboardMain',
                        meta: { requiresAuth: true },
                        component: () => import(/* webpackChunkName: "dashboardMain" */ '@/modules/app/views/dashboard/Main.vue'),
                    },
                ]
            },
            {
                path: 'admin',
                name: 'admin',
                meta: { requiresAuth: true },
                redirect: { name: 'adminMain' },
                component: () => import(/* webpackChunkName: "adminMain" */ '@/modules/app/views/admin/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'adminMain',
                        component: () => import(/* webpackChunkName: "adminMain" */ '@/modules/app/views/admin/Main.vue')
                    },
                ]
            },
            {
                path: 'events',
                name: 'events',
                meta: { requiresAuth: true },
                redirect: { name: 'eventsMain' },
                component: () => import(/* webpackChunkName: "eventsMain" */ '@/modules/app/views/events/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'eventsMain',
                        component: () => import(/* webpackChunkName: "eventsMain" */ '@/modules/app/views/events/Main.vue')
                    },
                ]
            },
            {
                path: 'finance',
                name: 'finance',
                meta: { requiresAuth: true },
                redirect: { name: 'financeMain' },
                component: () => import(/* webpackChunkName: "financeMain" */ '@/modules/app/views/finance/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'financeMain',
                        component: () => import(/* webpackChunkName: "financeMain" */ '@/modules/app/views/finance/Main.vue')
                    },
                ]
            },
            {
                path: 'groups',
                name: 'groups',
                meta: { requiresAuth: true },
                redirect: { name: 'groupsMain' },
                component: () => import(/* webpackChunkName: "groupsMain" */ '@/modules/app/views/groups/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'groupsMain',
                        component: () => import(/* webpackChunkName: "groupsMain" */ '@/modules/app/views/groups/Main.vue')
                    },
                ]
            },
            {
                path: 'management',
                name: 'management',
                meta: { requiresAuth: true },
                redirect: { name: 'managementMain' },
                component: () => import(/* webpackChunkName: "managementMain" */ '@/modules/app/views/management/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'managementMain',
                        component: () => import(/* webpackChunkName: "managementMain" */ '@/modules/app/views/management/Main.vue')
                    },
                ]
            },
            {
                path: 'members',
                name: 'members',
                meta: { requiresAuth: true },
                redirect: { name: 'membersMain' },
                component: () => import(/* webpackChunkName: "membersMain" */ '@/modules/app/views/members/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'membersMain',
                        component: () => import(/* webpackChunkName: "membersMain" */ '@/modules/app/views/members/Main.vue')
                    },
                ]
            },
            {
                path: 'settings',
                name: 'settings',
                meta: { requiresAuth: true },
                redirect: { name: 'settingsMain' },
                component: () => import(/* webpackChunkName: "settingsMain" */ '@/modules/app/views/settings/Main.vue'),
                children: [
                    {
                        path: "main",
                        name: "settingsMain",
                        component: () => import(/* webpackChunkName: "settingsMain" */ "@/modules/app/views/settings/Main.vue"),
                    },
                ]
            },
            {
                path: 'profile',
                name: 'profile',
                meta: { requiresAuth: true },
                redirect: { name: 'profileMain' },
                component: () => import(/* webpackChunkName: "profileMain" */ '@/modules/app/views/profile/Main.vue'),
                children: [
                    {
                        path: "main",
                        name: "profileMain",
                        component: () => import(/* webpackChunkName: "profileMain" */ "@/modules/app/views/profile/Main.vue"),
                    },
                ]
            },
            {
                path: 'statistic',
                name: 'statistic',
                meta: { requiresAuth: true },
                redirect: { name: 'statisticMain' },
                component: () => import(/* webpackChunkName: "statisticMain" */ '@/modules/app/views/statistic/Main.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'statisticMain',
                        component: () => import(/* webpackChunkName: "statisticMain" */ '@/modules/app/views/statistic/Main.vue')
                    },
                ]
            },
        ]
    },
]