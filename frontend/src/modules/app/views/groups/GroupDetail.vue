<template lang="">
    <div>
        <TabGroup>
            <TabList class="grid grid-cols-2 divide-x border-b">
                <Tab v-slot="{ selected }" as="template" class="py-4">
                    <button :class="['font-highlight ', selected ? 'text-proto-darkgrey' : 'text-proto-grey']">
                        Übersicht
                    </button>
                </Tab>
                <Tab v-slot="{ selected }" as="template" class="py-4">
                    <button :class="['font-highlight', selected ? 'text-proto-darkgrey' : 'text-proto-grey']">
                        Mitglieder
                    </button>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <GroupOverviewTab :group-data="groupData" />
                </TabPanel>
                <TabPanel>
                    <GroupMembersTab :group-data="groupData" />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>


<script lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { allGroupTypes } from '@/types/GroupDBEntry';
import GroupOverviewTab from './GroupOverviewTab.vue';
import GroupMembersTab from './GroupMembersTab.vue';

export default defineComponent({
    components: {
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        GroupOverviewTab,
        GroupMembersTab
    },
    props: {
        groupId: {
            type: String,
            default: ''
        }
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    },
    computed: {
        groupData(): allGroupTypes | undefined {
            return this.store.getgroupById?.(this.groupId);
        }
    }
})
</script>