<template>
    <RadioGroup v-model="selected" class="grid grid-cols-2 overflow-x-auto gap-6">
        <RadioGroupLabel class="sr-only">Gruppenauswahl</RadioGroupLabel>
        <RadioGroupOption v-for="(group, index) in allGroups" :key="index" v-slot="{ checked }" :value="index">
            <GroupCard :group-data="group" :checked="checked" interactive />
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
} from '@headlessui/vue'

export default defineComponent({
    components: {
        GroupCard,
        RadioGroup,
        RadioGroupLabel,
        RadioGroupOption,
    },
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
    }
})
</script>