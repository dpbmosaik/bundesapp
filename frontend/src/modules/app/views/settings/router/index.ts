export default [
  {
    path: "/app/settings",
    name: "settings",
    redirect: { name: 'settingsMain' },
    
  },
  {
    path: "/app/settings/main",
    name: "settingsMain",
    component: () =>
      import(
        /* webpackChunkName: "settingsMain" */ "@/modules/app/views/settings/views/Main.vue"
      ),
  },
  {
    path: "/app/settings/my-profile",
    name: "myProfile",
    component: () =>
      import(
        /* webpackChunkName: "myProfile" */ "@/modules/app/views/settings/views/MyProfile.vue"
      ),
  },
];
