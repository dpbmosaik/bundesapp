<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >

        <p class="font-h2">Gruppe auswählen</p>

        <div v-if="selectedGroup.length" class="flex flex-row gap-2">
            <Tag v-for="user in selectedGroup" :key="user" icon="closeSquare" @icon-clicked="removeTag">{{ user }}</Tag>
        </div>

        <div class="flex flex-row items-end gap-3 w-full">
            
            <div class="w-full divide-y divide-proto-lightgrey overflow-hidden rounded-xl bg-white ring-1 ring-proto-grey ring-opacity-5">
                <Combobox @update:model-value="onSelect">
                    <div class="relative">
                        <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-4 pr-4 text-proto-darkgrey placeholder-proto-grey focus:ring-0" placeholder="Suchen..." @change="query = $event.target.value" />
                    </div>

                    <ComboboxOptions v-if="filteredPeople.length > 0" static class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                        <ComboboxOption v-for="person in filteredPeople" :key="person.id" v-slot="{ active }" :value="person" as="template">
                            <li :class="[groupIsSelected(person.name) ? 'cursor-not-allowed text-proto-grey bg-proto-lightgrey' : 'cursor-default', 'select-none px-4 py-2', active && 'bg-proto-darkgrey text-white']">
                                {{ person.name }}
                            </li>
                        </ComboboxOption>
                    </ComboboxOptions>

                    <p v-if="query !== '' && filteredPeople.length === 0" class="p-4 text-sm text-gray-500">No people found.</p>
                </Combobox>
            </div>

        </div>
        <div class="flex flex-row gap-4 justify-center mt-8">
            <SecondaryButton :target="() => {closeModal(); selectedGroup = [];}">Abbrechen</SecondaryButton>
            <PrimaryButton :target="() => handleGroupSelection()">Speichern</PrimaryButton>
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
        name: "AddGroupToGroupModal",
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
            }
        },
        emits: ['close-modal'],
        setup() {
            const selectedGroup: Ref<string[]> = ref([]);
            const people = [
                { id: 1, name: 'Stamm Hellas' },
                { id: 2, name: 'Stamm Zugvögel' },
                { id: 3, name: 'Stamm Deutschritter' },
                { id: 4, name: 'Stamm Argonauten' },
            ]
            const query = ref('')
            return {
                selectedGroup,
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
                this.selectedGroup = []
                this.$emit('close-modal');
            },
            handleGroupSelection() {
                alert(`Added the following groups to group (id: ${this.groupId}): ${this.selectedGroup.join(', ')}`)
                this.selectedGroup = [];
                this.closeModal();
            },
            onSelect(group: {id: number, name: string}) {
                if (!this.selectedGroup.includes(group.name)) {
                    this.query = ''
                    this.selectedGroup.push(group.name)
                }
            },
            groupIsSelected(group: string) {
                return this.selectedGroup.includes(group)
            },
            removeTag(tagToRemove: string) {
                this.selectedGroup = this.selectedGroup.filter(tag => {       
                    return tag != tagToRemove
                })
            }
        }
    })
</script>