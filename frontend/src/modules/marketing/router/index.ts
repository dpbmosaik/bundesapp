export default [
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/modules/marketing/views/about/AboutMain.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "about" */ '@/modules/marketing/views/contact/ContactMain.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "about" */ '@/modules/marketing/views/demo/DemoMain.vue')
  }
]
