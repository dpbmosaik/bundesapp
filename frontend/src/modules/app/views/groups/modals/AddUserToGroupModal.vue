<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >

        <p class="font-h2">Benutzer auswählen</p>

        <div v-if="selectedUser.length" class="flex flex-row gap-2">
            <Tag v-for="user in selectedUser" :key="user" icon="closeSquare" @icon-clicked="removeTag">{{ user }}</Tag>
        </div>

        <div class="flex flex-row items-end gap-3 w-full">
            
            <div class="w-full divide-y divide-proto-lightgrey overflow-hidden rounded-xl bg-white ring-1 ring-proto-grey ring-opacity-5">
                <Combobox @update:model-value="onSelect">
                    <div class="relative">
                        <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-4 pr-4 text-proto-darkgrey placeholder-proto-grey focus:ring-0" placeholder="Suchen..." @change="query = $event.target.value" />
                    </div>

                    <ComboboxOptions v-if="filteredPeople.length > 0" static class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                        <ComboboxOption v-for="person in filteredPeople" :key="person.id" v-slot="{ active }" :value="person" as="template">
                            <li :class="[personIsSelected(person.name) ? 'cursor-not-allowed text-proto-grey bg-proto-lightgrey' : 'cursor-default', 'select-none px-4 py-2', active && 'bg-proto-darkgrey text-white']">
                                {{ person.name }}
                            </li>
                        </ComboboxOption>
                    </ComboboxOptions>

                    <p v-if="query !== '' && filteredPeople.length === 0" class="p-4 text-sm text-gray-500">No people found.</p>
                </Combobox>
            </div>

        </div>
        <div class="flex flex-row gap-4 justify-center mt-8">
            <SecondaryButton :target="() => {closeModal(); selectedUser = [];}">Abbrechen</SecondaryButton>
            <PrimaryButton :target="() => handleUserSelection()">Speichern</PrimaryButton>
        </div>
    </ModalWithSlot>
</template>
  
<script lang="ts">
    import ModalWithSlot from '@/components/modal/ModalWithSlot.vue';
    import PrimaryButton from '@/components/button/PrimaryButton.vue';
    import SecondaryButton from '@/components/button/SecondaryButton.vue';
    import { ref, PropType, Ref } from 'vue';
    import {
        Combobox,
        ComboboxInput,
        ComboboxOptions,
        ComboboxOption,
    } from '@headlessui/vue'
    import Tag from '@/components/tag/Tag.vue';

    export default defineComponent({
        name: "AddUserToGroupModal",
        components: {
            ModalWithSlot,
            PrimaryButton,
            SecondaryButton,
            Combobox,
            ComboboxInput,
            ComboboxOptions,
            ComboboxOption,
            Tag
        },
        props: {
            isOpen: Boolean,
            groupId: {
                type: String,
                required: true
            },
            role: {
                type: String as PropType<'groupMember' | 'deputies' | 'headOfFinance' | 'editAccessUsers' | 'leader'>,
                required: true
            }
        },
        emits: ['close-modal'],
        setup() {
            const selectedUser: Ref<string[]> = ref([]);
            const people = [
                { id: 1, name: 'Leslie Alexander' },
                { id: 2, name: 'Brendan Fraser' },
                { id: 3, name: 'Lucas Holm' },
                { id: 4, name: 'Sabrina Hubbel' },
            ]
            const query = ref('')
            return {
                selectedUser,
                query,
                people
            }
        },
        computed: {
            filteredPeople() {
                return this.query === ''
                    ? []
                    : this.people.filter((person) => {
                        return person.name.toLowerCase().includes(this.query.toLowerCase())
                     })
            },

        },
        methods: {
            closeModal() {
                this.query = ''
                this.selectedUser = []
                this.$emit('close-modal');
            },
            handleUserSelection() {
                alert(`Added the following User to group (id: ${this.groupId}) as ${this.role}: ${this.selectedUser.join(', ')}`)
                this.selectedUser = [];
                this.closeModal();
            },
            onSelect(person: {id: number, name: string}) {
                if (!this.selectedUser.includes(person.name)) {
                    this.query = ''
                    this.selectedUser.push(person.name)
                }
            },
            personIsSelected(user: string) {
                return this.selectedUser.includes(user)
            },
            removeTag(tagToRemove: string) {
                this.selectedUser = this.selectedUser.filter(tag => {       
                    return tag != tagToRemove
                })
            }
        }
    })
</script>