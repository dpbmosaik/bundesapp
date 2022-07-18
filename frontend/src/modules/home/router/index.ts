export default [
    {
        path: '/',
        name: 'home',
        alias: '/home',
        component: () => import(/* webpackChunkName: "Home" */ '@/modules/home/views/Main.vue'),
    },
]