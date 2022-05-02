export default [
  {
    path: "/settings",
    name: "settings",
    redirect: { name: 'settingsMain' },
  },
  {
    path: "/settings/main",
    name: "settingsMain",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "@/modules/settings/views/Main.vue"
      ),
  },
  {
    path: "/settings/my-profile",
    name: "myProfil",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "@/modules/settings/views/MyProfile.vue"
      ),
  },
];
