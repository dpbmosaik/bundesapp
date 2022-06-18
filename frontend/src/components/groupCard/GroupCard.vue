<template lang="">
    <div class="flex flex-row items-center w-full justify-between border border-proto-lightgrey rounded-lg pr-4">
        <div class="flex flex-row gap-4 items-center">
            <div class="h-16">
                <img :src="getPlaceholderAvatar()" alt="Avatar" class="h-full w-full rounded-l-lg"/>
            </div>
            <div>
                <p class="font-h3">Stamm Hellas</p>
                <p class="font-p text-proto-grey">24 Mitglieder</p>
            </div>
        </div>
        <Menu as="div" class="relative">
            <MenuButton>
                <AppIcon name="moreSqaure" type="light" color="#C4C4C4" />
            </MenuButton>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <MenuItems class="absolute w-56 bottom-0 right-8 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-1 py-1" >
                        <MenuItem v-slot="{ active }" v-for="(elem, index) in cardMenu" :key="index" >
                            <button
                                @click="elem.action"
                                :class="[
                                    active ? 'bg-proto-grey' : '',
                                    'group flex gap-4 w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                            >
                                <AppIcon :name="elem.icon" type="light" />
                                {{ elem.name }}
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>


<script lang="ts">
import AppIcon from "../icons/AppIcon.vue"
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const cardMenu = [
    {
        name: 'Zu Favoriten hinzufügen',
        icon: 'heart',
        action: () => alert('Zu Favoriten hinzugefügt')
    },
    {
        name: 'Löschen',
        icon: 'delete',
        action: () => alert('Gruppe gelöscht')
    },
    {
        name: 'Bearbeiten',
        icon: 'edit',
        action: () => alert('Bearbeiten')
    },
]

export default defineComponent({
    components: {
        AppIcon,
        Menu,
        MenuButton,
        MenuItems,
        MenuItem
    },
    methods: {
        getPlaceholderAvatar() {
            const name = 'Hellas';
            const size = '148';
            return `https://ui-avatars.com/api/?background=3B3B3B&color=fff&size=${size}&name=${name}&font-size=0.33`
        }
    },
    setup() {
        return {
            cardMenu,
        }
    }
})
</script>