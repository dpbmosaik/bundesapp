<template>
  <div class="h-screen p-6 w-fit bg-proto-lightgrey">
    <div class="">

    </div>
    <nav class="flex flex-col gap-2">
        <NavigationElement
          v-for="(elem, index) in navigation"
          :elem="elem"
          :index="index"
          :key="elem.name"
        />
    </nav>
  </div>
</template>

<script lang="ts">
  import NavigationElement from "./NavigationElement.vue";

  const navigation = [
    {
      name: "Dashboard",
      href: "/app/dashboard",
      icon: "category",
      news: 0
    },
    {
      name: "Mitglieder",
      href: "/app/members",
      icon: "profile",
      news: 0
    },
    {
      name: "Gruppen",
      href: "/app/groups",
      icon: "threeUser",
      news: 0
    },
    {
      name: "Verwaltung",
      href: "/app/management",
      icon: "work",
      news: 4
    },
    {
      name: "Veranstaltungen",
      href: "/app/events",
      icon: "discovery",
      news: 2
    },
    { 
      name: "Statstiken",
      href: "/app/statistic",
      icon: "graph",
      news: 0
    },
    { 
      name: "Finanzen",
      href: "/app/finance",
      icon: "wallet",
      news: 0  
    },
    {
      name: "Administration",
      href: "/app/admin",
      icon: "password",
      news: 0
    },
  ];

  const RootComponent = {
    data() {
      return {
        isAuthenticated: true,
      };
    },
  };

  export default {
    components: {
      NavigationElement
    },
    setup() {
      const sidebarOpen = ref(false);

      const onLogoutClicked = () => {
        debugger;
      };
      const onLoginClicked = () => {
        debugger;
      };

      return {
        onLogoutClicked,
        onLoginClicked,
        navigation,
        sidebarOpen,
      };
    },
  };
</script>