export default [
  {
    path: '/',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/modules/app/views/dashboard/DashboardMain.vue"
      ),
    meta: {
      title: 'Vite + Vue + TypeScript + Tailwind Starter Template',
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/modules/app/views/dashboard/DashboardMain.vue"
      ),
  },
  {
    path: "/mitglieder",
    name: "Mitgliederverwaltung",
    component: () =>
      import(
        /* webpackChunkName: "mitglieder" */ "@/modules/app/views/members/MembersMain.vue"
      ),
  },
  {
    path: "/gruppen",
    name: "Gruppenverwaltung",
    component: () =>
      import(
        /* webpackChunkName: "Gruppen" */ "@/modules/app/views/groups/GroupsMain.vue"
      ),
  },
  {
    path: "/verwaltung",
    name: "Verwaltung",
    component: () =>
      import(
        /* webpackChunkName: "Verwaltung" */ "@/modules/app/views/management/ManagementMain.vue"
      ),
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () =>
      import(
        /* webpackChunkName: "Analytics" */ "@/modules/app/views/analytics/AnalyticsMain.vue"
      ),
  },
  {
    path: "/profil",
    name: "Profil",
    component: () =>
      import(
        /* webpackChunkName: "profil" */ "@/modules/app/views/profile/ProfileMain.vue"
      ),
  },
  {
    path: "/einstellungen",
    name: "Einstellungen",
    component: () =>
      import(
        /* webpackChunkName: "einstellungen" */ "@/modules/app/views/settings/SettingsMain.vue"
      ),
  },
];
