<template lang="">
    <div
        class="flex flex-row items-center w-full justify-between rounded-lg pr-4 overflow-clip"
        :class="[checked ? 'border-2 border-proto-darkgrey' : 'border-2 border-proto-lightgrey', interactive ? 'cursor-pointer' : 'cursor-default']"
        @click="interactive ? setSelectedGroup() : ''"
    >
        <div class="flex flex-row gap-4 items-center">
            <div class="h-16">
                <img :src="groupData.groupAvatar" alt="Avatar" class="h-full w-full"/>
            </div>
            <div>
                <p class="font-h3">{{ `${getGroupPrefix()}${groupData.name}` }}</p>
                <p class="font-p text-proto-grey">{{ `${groupData.groupMember.length} Mitglieder` }}</p>
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <AppIcon v-if="isFavorite" name="heart" type="bold" />
            <button v-if="isRemovable" @click="() => removeGroup()">
                <AppIcon name="closeSquare" type="light" color="#C4C4C4" hover/>
            </button>
            <Menu v-show="interactive" as="div" class="relative flex">
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
                    <MenuItems class="fixed w-56 z-10 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="px-1 py-1" >
                            <MenuItem v-for="(elem, index) in cardMenu" :key="index" v-slot="{ active }" >
                                <button
                                    :class="[
                                        active ? 'bg-proto-grey' : '',
                                        'group flex gap-4 w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                    @click="elem.action"
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
import AppIcon from "../icons/AppIcon.vue"
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PropType } from 'vue';
import { allGroupTypes } from "@/types/GroupDBEntry";

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
    props: {
        groupData: { 
            type: Object as PropType<allGroupTypes>,
            required: true
        },
        checked: {
            default: false,
            type: Boolean
        },
        interactive: {
            type: Boolean,
            default: false
        },
        isFavorite : {
            type: Boolean,
            default: false
        },
        isRemovable : {
            type: Boolean,
            default: false
        }
    },
    emits: ['remove-group'],
    setup() {
        const store = useStore();
        return {
            store,
            cardMenu,
        }
    },
    methods: {
        getPlaceholderAvatar() {
            const name = 'Hellas';
            const size = '148';
            return `https://ui-avatars.com/api/?background=3B3B3B&color=fff&size=${size}&name=${name}&font-size=0.33`
        },
        getGroupPrefix() {
            const type = this.groupData?.type
            if (type === 'Rollen' || type === 'Individuell') {
                return ''
            } else {
                return `${type} `
            }
        },
        setSelectedGroup() {
            // this.store.clearSelectedGroup();
            if (this.groupData) {
                this.store.selectGroup(this.groupData.groupId);
            }
        },
        removeGroup() {
            this.$emit("remove-group", this.groupData.groupId)
        }
    },

})
</script>