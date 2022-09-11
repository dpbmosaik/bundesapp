import TopBar from '@/components/layout/TopBar.vue';

<template lang="">
    <div class="border-b px-8 py-4 flex flex-row justify-end">
        <Menu>
          <div class="box-border h-10 w-20">
              Hallo {{user.firstName}}
          </div>
            <MenuButton>
                <Avatar size="small" :src="getPlaceholderAvatar()" alt="Avatar" />
            </MenuButton>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <MenuItems
                    class="absolute right-8 mt-8 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <div class="px-1 py-1" >
                        <MenuItem v-for="(elem, index) in topBarNavigation" v-slot="{ active }" :key="index">
                            <router-link
                                :to="elem.href"
                                :class="[
                                    active ? 'bg-proto-grey' : '',
                                    'group flex gap-4 w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                            >
                                <AppIcon :name="elem.icon" type="light" />
                                {{ elem.name }}
                            </router-link>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script lang="ts">
import Avatar from "../Avatar/Avatar.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import AppIcon from "@/components/icons/AppIcon.vue";
import { useLoggedInUserStore } from "@/store/loggedInUser";

const topBarNavigation = [
  {
    name: "Profil",
    icon: "profile",
    href: "/app/profile/main",
  },
  {
    name: "Einstellungen",
    icon: "setting",
    href: "/app/settings/main",
  },
  {
    name: "Support",
    icon: "star",
    href: "",
  },
  {
    name: "FAQ",
    icon: "ticketStar",
    href: "",
  },
  {
    name: "Abmelden",
    icon: "logout",
    href: "/logout",
  }
];


export default {
  components: {
    Avatar,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    AppIcon,
  },
  setup() {
    const user = useLoggedInUserStore()
    function getPlaceholderAvatar() {
      const size = "128";
      return `https://ui-avatars.com/api/?background=3B3B3B&color=fff&size=${size}&name=${user.firstName}+${user.lastName}`;
    }
    return {
      topBarNavigation,
      getPlaceholderAvatar,
      user,
    };
  },
};
</script>

<style lang="">
</style>