<template lang="">
    <FilterIcon>
        <TabGroup>
            <TabList class="grid grid-cols-2 divide-x border-b">
                <Tab v-slot="{ selected }" as="template" class="py-4">
                    <button :class="['font-highlight ', selected ? 'text-proto-darkgrey' : 'text-proto-grey']">
                        Gruppen
                    </button>
                </Tab>
                <Tab v-slot="{ selected }" as="template" class="py-4">
                    <button :class="['font-highlight', selected ? 'text-proto-darkgrey' : 'text-proto-grey']">
                        Rollen
                    </button>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel class="mt-4 max-h-80 overflow-y-auto">
                    <div v-for="(group, index) in groups" :key="index" class="flex flex-row items-center gap-2">
                        <input type="checkbox" :checked="searchTags.includes(group)" class="ml-1 h-4 w-4 rounded border-proto-grey text-proto-darkgrey focus:ring-proto-darkgrey" @click="handleSelection(group)" />
                        <p class="font-p">{{ group }}</p>
                    </div>
                </TabPanel>
                <TabPanel class="mt-4">
                    <div v-for="(role, index) in roles" :key="index" class="flex flex-row items-center gap-2" >
                        <input type="checkbox" :checked="searchTags.includes(role)" class="ml-1 h-4 w-4 rounded border-proto-grey text-proto-darkgrey focus:ring-proto-darkgrey" @click="handleSelection(role)" />
                        <p class="font-p">{{ role }}</p>
                    </div>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </FilterIcon>
</template>

<script lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import FilterIcon from "@/components/searchbar/FilterIcon.vue"
import { PropType } from 'vue';
export default defineComponent({
    name: 'FilterIconMembers',
    components: {
        FilterIcon,
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel
    },
    props: {
        searchTags: {
            type: Array as PropType<string[]>,
            default: () => []
        }
    },
    emits: ['select-filter'],
    setup() {
        const groups = ['Hellas', 'Sperber', 'Köln', 'Silberfüchse', 'Pan', 'Hellas', 'Sperber', 'Köln', 'Silberfüchse', 'Sippe Pan', 'Stamm Hellas', 'Stamm Sperber', 'Ring Köln', 'Stamm Silberfüchse', 'Sippe Pan'];
        const roles = ['Stammesführer_in', 'Stv. Stammesführer_in', 'Sippenführer_in', 'Bundesführung'];
        return {
            groups,
            roles
        }
    },
    methods: {
        handleSelection(val: string) {
            this.$emit("select-filter", val);
        }
    }
})
</script>
