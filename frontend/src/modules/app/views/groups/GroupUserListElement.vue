<template lang="">
    <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center gap-2">
            <Avatar size="small" :src="user.avatar" alt="Avatar" />
            <p class="font-p">{{ user.name }}</p>
        </div>
        <div class="flex flex-row">
            <button v-show="userListLength >= 2" @click="() => removeUserFromList()">
                <AppIcon name="closeSquare" type="light" color="#C4C4C4" hover/>
            </button>
            <Menu as="div" class="relative flex">
                <MenuButton>
                    <AppIcon name="moreSqaure" type="light" color="#C4C4C4" hover/>
                </MenuButton>
                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <MenuItems class="absolute w-56 z-10 right-8 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="px-1 py-1" >
                            <MenuItem v-for="(elem, index) in moreNavigation" v-slot="{ active }" :key="index" >
                                <button
                                    :class="[
                                        active ? 'bg-proto-grey' : '',
                                        'group flex gap-4 w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                    @click="elem.action(user.id)"
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
    </div>
</template>


<script lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { defineComponent } from 'vue'

const moreNavigation = [
    {
        name: 'Ansehen',
        icon: 'profile',
        action: (id: string) => alert('User Profil ansehen, Id: ' + id)
    },
]

export default defineComponent({
    components: {
            Menu,
            MenuButton,
            MenuItems,
            MenuItem
    },
    props: {
        user: {
            type: Object,
            default: undefined
        },
        userListLength: Number
    },
    setup() {
        return {
            moreNavigation
        }
    },
    emits: ['remove-user'],
    methods: {
        removeUserFromList() {
            if (this.user) {
                this.$emit("remove-user", this.user.id)
            }
        }
    },
})
</script>