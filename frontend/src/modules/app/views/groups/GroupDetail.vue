<template lang="">
    <div>
        <!-- {{ groupId }} -->
        <TabGroup>
            <TabList class="grid grid-cols-2 divide-x border-b">
                <Tab as="template" v-slot="{ selected }" class="py-4">
                    <button :class="['font-highlight ', selected ? 'text-proto-darkgrey' : 'text-proto-grey']">
                        Übersicht
                    </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }" class="py-4">
                    <button :class="['font-highlight', selected ? 'text-proto-darkgrey' : 'text-proto-grey']">
                        Mitglieder
                    </button>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <GroupOverviewTab :groupData="groupData" />
                </TabPanel>
                <TabPanel>
                    <GroupMembersTab :groupData="groupData" />
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
    setup() {
        const store = useStore()
        return {
            store
        }
    },
    props: {
        groupId: {
            type: String,
            default: ''
        }
    },
    components: {
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        GroupOverviewTab,
        GroupMembersTab
    },
    computed: {
        groupData(): allGroupTypes {
            return this.store.getgroupById!(this.groupId);
        }
    }
})
</script>