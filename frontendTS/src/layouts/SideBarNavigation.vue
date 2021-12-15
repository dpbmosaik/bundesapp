<template>
  <div class="h-full flex h-screen overflow-hidden">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 md:hidden"
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
            class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
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
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex items-center px-4">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
              />
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2 space-y-1 h-full flex flex-col justify-between">
                <div class="px-2 space-y-1">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[
                      isCurrent(item.name)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-4 flex-shrink-0 h-6 w-6',
                      ]"
                      aria-hidden="true"
                    />
                    <span class="flex-1">
                      {{ item.name }}
                    </span>

                    <span
                      v-if="item.count"
                      :class="[
                        item.current
                          ? 'bg-white'
                          : 'bg-gray-100 group-hover:bg-gray-200',
                        'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full',
                      ]"
                    >
                      {{ item.count }}
                    </span>
                  </router-link>
                </div>
                <div class="space-y-1 p-2">
                  <h3
                    id="projects-headline"
                    class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Externe Services
                  </h3>
                  <div
                    class="space-y-1"
                    role="group"
                    aria-labelledby="projects-headline"
                  >
                    <a
                      v-for="item in secondaryNavigation"
                      :key="item.name"
                      :href="item.href"
                      class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      <span class="truncate">
                        {{ item.name }}
                      </span>
                    </a>
                  </div>
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
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto"
      >
        <div class="flex items-center flex-shrink-0 px-4">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
            alt="Workflow"
          />
        </div>
        <div class="mt-5 flex-grow flex flex-col">
          <nav class="flex-1 px-2 pb-4 space-y-1 flex flex-col justify-between">
            <div class="px-2 space-y-1">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  isCurrent(item.name)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
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
                <span class="flex-1">
                  {{ item.name }}
                </span>

                <span
                  v-if="item.count"
                  :class="[
                    item.current
                      ? 'bg-white'
                      : 'bg-gray-100 group-hover:bg-gray-200',
                    'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full',
                  ]"
                >
                  {{ item.count }}
                </span>
              </router-link>
            </div>
            <div class="space-y-1 p-2">
              <h3
                id="projects-headline"
                class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Externe Services
              </h3>
              <div
                class="space-y-1"
                role="group"
                aria-labelledby="projects-headline"
              >
                <a
                  v-for="item in secondaryNavigation"
                  :key="item.name"
                  target="_blank"
                  rel="noopener"
                  :href="item.href"
                  class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                >
                  <span class="truncate flex-1">
                    {{ item.name }}
                  </span>
                  <span>
                    <ChevronRightIcon class="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <div class="md:pl-64 flex flex-col flex-1">
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex">
            <!-- Search Field -->
            <!-- <form class="w-full flex md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
              >
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                >
                  <SearchIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </form> -->
            <!-- Search Field End -->
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
              <!-- <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {{ newNotifications.length }}
                </span> -->
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
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
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <router-link
                      :to="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >{{ item.name }}
                    </router-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                      ]"
                      @click="logOut"
                    >
                      Ausloggen
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import {
  HomeIcon,
  BellIcon,
  UsersIcon,
  MenuIcon,
  ChartBarIcon,
  ArchiveIcon,
  UserGroupIcon,
  XIcon,
  MenuAlt2Icon,
  SearchIcon,
  ChevronRightIcon
} from '@heroicons/vue/outline'

const newNotifications = [
  {
    person: '',
    action: '',
    date: ''
  }
]

const navigation = [
  {
    name: 'Dashboard',
    href: '/app/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Mitgliederverwaltung',
    href: '/app/mitglieder/',
    icon: UsersIcon
  },
  {
    name: 'Gruppenverwaltung',
    href: '/app/gruppen',
    icon: UserGroupIcon,
    count: 3
  },
  {
    name: 'Verwaltung',
    href: '/app/verwaltung',
    icon: ArchiveIcon,
    count: 1
  },
  {
    name: 'Analytics',
    href: '/app/analytics',
    icon: ChartBarIcon
  }
]

const secondaryNavigation = [
  { name: 'Heimabendinspirator', href: 'https://inspirator.dpbm.de/' },
  { name: 'Cloud', href: 'https://cloud.bundesapp.org/' },
  // { name: "Kalender", href: "#" },
  { name: 'Chat', href: 'https://chat.bundesapp.org/' }
]

const userNavigation = [
  { name: 'Dein Profil', href: '/app/profil' },
  { name: 'Einstellungen', href: '/app/einstellungen' }
  // { name: "Abmelden", href: logOut },
]

export default {
  name: 'SideBarNavigation',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    MenuIcon,
    XIcon,
    BellIcon,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    MenuAlt2Icon,
    SearchIcon,
    ChevronRightIcon
  },
  setup () {
    const sidebarOpen = ref(false)

    return {
      navigation,
      secondaryNavigation,
      sidebarOpen,
      userNavigation,
      newNotifications
    }
  },
  computed: {},
  methods: {
    isCurrent: function (name) {
      const currentPage = this.$route.name
      if (currentPage === name) {
        return true
      }
      return false
    },
    logOut: function () {
      console.log('Logged Out')
    }
  }
}
</script>
