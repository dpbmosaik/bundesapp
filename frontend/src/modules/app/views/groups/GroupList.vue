<template>
    <RadioGroup v-model="selected" class="grid grid-cols-2 overflow-x-auto gap-6">
        <RadioGroupLabel class="sr-only">Gruppenauswahl</RadioGroupLabel>
        <RadioGroupOption v-for="(group, index) in allGroups" :key="index" v-slot="{ checked }" :value="index">
            <GroupCard :groupData="group" :checked="checked" interactive />
        </RadioGroupOption>
    </RadioGroup>
</template>


<script lang="ts">
import GroupCard from "@/components/groupCard/GroupCard.vue"
import { allGroupTypes } from '@/types/GroupDBEntry';
import { ref } from 'vue'
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupDescription,
} from '@headlessui/vue'

export default defineComponent({
    setup() {
        const selected = ref('1');
        const store = useStore();
        return { 
            store,
            selected,
            GroupCard
        }
    },
    computed: {
        allGroups(): Array<allGroupTypes> {
            return this.store.getAllGroups;
        },
    },
    components: {
        GroupCard,
        RadioGroup,
        RadioGroupLabel,
        RadioGroupOption,
        RadioGroupDescription,
    }
})
</script>