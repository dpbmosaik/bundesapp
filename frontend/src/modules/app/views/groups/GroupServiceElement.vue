<template lang="">
    <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center gap-2">
            <div v-if="serviceData.type != 'email' && serviceData.enabled">
                <TertiaryButton :target="serviceData.url">{{serviceData.url}}</TertiaryButton>
            </div>
            <div v-else-if="serviceData.type == 'email' && serviceData.enabled">
                <p>{{ emailsAsString }}</p>
            </div>
            <div v-else>
                <TertiaryButton :target="() => addService()">hinzufügen</TertiaryButton>
            </div>
        </div>
        <div v-if="serviceData.enabled" class="flex flex-row">
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
                            <MenuItem v-for="(elem, index) in dropdownNav" v-slot="{ active }" :key="index" >
                                <button
                                    :class="[
                                        active ? 'bg-proto-grey' : '',
                                        'group flex gap-4 w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                    @click="elem.action()"
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
        <RemoveServiceFromGroupModal
            :is-open="removeServiceModalIsOpen"
            :group-id="groupId"
            :service="serviceData.type"
            @close-modal="removeServiceModalIsOpen=false"
        />
    </div>
</template>

<script lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PropType } from 'vue';
import TertiaryButton from '@/components/button/TertiaryButton.vue';
import RemoveServiceFromGroupModal from './modals/RemoveServiceFromGroupModal.vue';

export default defineComponent({
    components: {
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        TertiaryButton,
        RemoveServiceFromGroupModal
    },
    props: {
        serviceData: {
            type: Object as PropType<{enabled: boolean, url: string, type: string, emails: string[]}>,
            required: true
        },
        groupId: {
            type: String,
            required: true
        }
    },
    setup() {
        const removeServiceModalIsOpen = ref(false);
        const emailServiceModalIsOpen = ref(false);

        return {
            removeServiceModalIsOpen,
            emailServiceModalIsOpen
        }
    },
    computed: {
        emailsAsString() {
            if (this.serviceData) {
                const emailArray = this.serviceData.emails;
                return emailArray.join(", ")
            }
            return null
        },
        dropdownNav() {
            const nav = [
                {
                    name: 'Entfernen',
                    icon: 'delete',
                    action: () => this.removeServiceModalIsOpen = true
                },
            ]
            if (this.serviceData.type == 'email') {
                nav.push({
                    name: 'Bearbeiten',
                    icon: 'edit',
                    action: () => this.emailServiceModalIsOpen = true
                })
            }
            return nav
        }
    },
    methods: {
        removeEnabledService() {
            alert('Open Modal and ask for cofirmation to remove service from group')
        },
        addService() {
            alert(`Open Modal to add ${this.serviceData.type} service`)
        }
    },

})
</script>