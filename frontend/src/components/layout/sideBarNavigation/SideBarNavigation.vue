<template>
  <div
    class="
      h-screen
      p-6
      w-full
      bg-proto-lightgrey
      flex flex-col
      gap-4
      overflow-y-auto
    "
  >
    <div class="w-full rounded-lg px-4 py-2">
      <img src="@/assets/logo.png" class="object-scale-down h-48 w-30">
    </div>
    <div class="flex flex-col grow gap-8">
      <nav class="flex flex-col gap-2 grow ">
        <NavigationElement
          v-for="(elem, index) in navigation"
          :key="index"
          :elem="elem"
          :external-link="false"
        />
      </nav>
      <Disclosure
        v-slot="{ open }"
        as="div"
        class="border-t flex flex-col grow-0"
      >
        <DisclosureButton class="text-left flex flex-row items-center">
          <span class="font-description my-2 grow">Externe Links</span>
          <AppIcon
            name="arrowDown"
            type="light"
            :class="open ? '' : 'transform rotate-180'"
          />
        </DisclosureButton>
        <DisclosurePanel>
          <NavigationElement
            v-for="(elem, index) in externalNavigation"
            :key="index"
            :elem="elem"
            :external-link="true"
          />
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationElement from "./NavigationElement.vue";
import AppIcon from "@/components/icons/AppIcon.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const navigation = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
    icon: "category",
    news: 0,
  },
  {
    name: "Mitglieder",
    href: "/app/members",
    icon: "profile",
    news: 0,
  },
  {
    name: "Gruppen",
    href: "/app/groups",
    icon: "threeUser",
    news: 0,
  },
  {
    name: "Verwaltung",
    href: "/app/management",
    icon: "work",
    news: 4,
  },
  {
    name: "Veranstaltungen",
    href: "/app/events",
    icon: "discovery",
    news: 2,
  },
  {
    name: "Statstiken",
    href: "/app/statistic",
    icon: "graph",
    news: 0,
  },
  {
    name: "Finanzen",
    href: "/app/finance",
    icon: "wallet",
    news: 0,
  },
  {
    name: "Administration",
    href: "/app/admin",
    icon: "password",
    news: 0,
  },
];

const externalNavigation = [
  {
    name: "Inspirator",
    href: "https://inspirator.dpbm.de/",
    icon: "heart",
  },
  {
    name: "haddak",
    href: "https://haddak.de/",
    icon: "bookmark",
  },
  {
    name: "Wiki",
    href: "https://wiki.bundesapp.org/",
    icon: "infoSqaure",
  },
  {
    name: "Cloud",
    href: "https://cloud.bundesapp.org/",
    icon: "paper",
  },
  {
    name: "Kalender",
    href: "https://cal.bundesapp.org/",
    icon: "calendar",
  },
  {
    name: "Chat",
    href: "https://chat.bundesapp.org/",
    icon: "chat",
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
    NavigationElement,
    AppIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  setup() {
    const onLogoutClicked = () => {};
    const onLoginClicked = () => {};

    return {
      onLogoutClicked,
      onLoginClicked,
      navigation,
      externalNavigation,
    };
  },
};
</script>