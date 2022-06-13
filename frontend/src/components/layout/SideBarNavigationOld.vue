<template>
  <div class="min-h-full">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="
              relative
              flex-1 flex flex-col
              max-w-xs
              w-full
              pt-5
              pb-4
              bg-white
            "
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="
                    ml-1
                    flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-white
                  "
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2">
                <div class="space-y-1">
                  <router-link
                    :to="{ name: item.href }"
                    v-for="item in navigation"
                    :key="item.name"
                    :class="[
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </router-link>
                </div>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="
        hidden
        lg:flex
        lg:flex-col
        lg:w-64
        lg:fixed
        lg:inset-y-0
        lg:border-r
        lg:border-gray-200
        lg:pt-5
        lg:pb-4
        lg:bg-gray-100
      "
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
        <!-- User account dropdown -->
        <Menu as="div" class="px-3 relative inline-block text-left">
          <div>
            <MenuButton
              class="
                group
                w-full
                bg-gray-100
                rounded-md
                px-3.5
                py-2
                my-4
                text-sm text-left
                font-medium
                text-gray-700
                hover:bg-gray-200
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-gray-100
                focus:ring-dpbm-blue-500
              "
            >
              <span class="flex w-full justify-between items-center">
                <span
                  class="flex min-w-0 items-center justify-between space-x-3"
                >
                  <span
                    class="flex-1 flex flex-col min-w-0"
                  >
                    <span class="text-gray-900 text-sm font-medium truncate"
                      >Robert</span
                    >
                    <span class="text-gray-500 text-sm truncate">Admin</span>
                          </span>
                                    </span>
                <SelectorIcon
                  class="
                    flex-shrink-0
                    h-5
                    w-5
                    text-gray-400
                    group-hover:text-gray-500
                  "
                  aria-hidden="true"
                />
              </span>
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="
                z-10
                mx-3
                origin-top
                absolute
                right-0
                left-0
                mt-1
                rounded-md
                shadow-lg
                bg-white
                ring-1 ring-black ring-opacity-5
                divide-y divide-gray-200
                focus:outline-none
              "
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="/settings/my-profile"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Mein Profil</a
                  >
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                  >
                    Login
                  </button>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <button

                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                  >
                    Logout
                  </button>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="/register"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Registrieren</a
                  >
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <!-- Sidebar Search -->
        <!-- <div class="px-3 mt-5">
          <label for="search" class="sr-only">Search</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
              <SearchIcon class="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input type="text" name="search" id="search" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md" placeholder="Search" />
          </div>
        </div> -->
        <!-- Navigation -->
        <nav class="px-3 mt-6">
          <div class="space-y-1">
            <router-link
              :to="{ name: item.href }"
              v-for="item in navigation"
              :key="item.name"
              :class="[
                item.current
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>
    <!-- Main column -->
    <div class="lg:pl-64 flex flex-col">
      <!-- Search header -->
      <div
        class="
          sticky
          top-0
          z-10
          flex-shrink-0 flex
          h-16
          bg-white
          border-b border-gray-200
          lg:hidden
        "
      >
        <button
          type="button"
          class="
            px-4
            border-r border-gray-200
            text-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-inset
            focus:ring-dpbm-blue-500
            lg:hidden
          "
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex-1 flex">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
              >
                <div
                  class="
                    absolute
                    inset-y-0
                    left-0
                    flex
                    items-center
                    pointer-events-none
                  "
                >
                  <SearchIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  name="search-field"
                  class="
                    block
                    w-full
                    h-full
                    pl-8
                    pr-3
                    py-2
                    border-transparent
                    text-gray-900
                    placeholder-gray-500
                    focus:outline-none
                    focus:ring-0
                    focus:border-transparent
                    focus:placeholder-gray-400
                    sm:text-sm
                  "
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="
                    max-w-xs
                    bg-white
                    flex
                    items-center
                    text-sm
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-dpbm-blue-500
                  "
                >
                  <span class="sr-only">Open user menu</span>
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="
                    origin-top-right
                    absolute
                    right-0
                    mt-2
                    w-48
                    rounded-md
                    shadow-lg
                    bg-white
                    ring-1 ring-black ring-opacity-5
                    divide-y divide-gray-200
                    focus:outline-none
                  "
                >
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href=""
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Mein Profil</a
                      >
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href="/login"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Login</a
                      >
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href="/register"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Registrieren</a
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <!-- Page title & actions -->
        <div
          class="
            border-b border-gray-200
            px-4
            py-4
            sm:flex sm:items-center sm:justify-between sm:px-6
            lg:px-8
          "
        >
          <div class="flex-1 min-w-0">
            <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Home1
            </h1>
          </div>
        </div>

        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  HomeIcon,
  ViewGridIcon,
  MenuAlt1Icon,
  ChartBarIcon,
  XIcon,
  UserGroupIcon,
  CalendarIcon,
  CubeIcon,
  AdjustmentsIcon,
} from "@heroicons/vue/outline";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  SearchIcon,
  SelectorIcon,
  UsersIcon,
} from "@heroicons/vue/solid";

const navigation = [
  {
    name: "Dashboard",
    href: "dashboardMain",
    icon: ViewGridIcon,
    current: true,
  },
  {
    name: "Mitglieder",
    href: "memberMain",
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: "Verwaltung",
    href: "managementMain",
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Veranstaltung",
    href: "eventMain",
    icon: CalendarIcon,
    current: false,
  },
  { name: "Statstiken", href: "statisticMain", icon: CubeIcon, current: false },
  { name: "Finanzen", href: "financeMain", icon: ChartBarIcon, current: false },
  {
    name: "Administration",
    href: "adminMain",
    icon: AdjustmentsIcon,
    current: false,
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
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    ChevronRightIcon,
    DotsVerticalIcon,
    MenuAlt1Icon,
    SearchIcon,
    SelectorIcon,
    XIcon,
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