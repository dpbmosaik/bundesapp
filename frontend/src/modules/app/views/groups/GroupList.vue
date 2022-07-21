<template>
    <RadioGroup v-if="filteredGroups.length" v-model="selected" class="grid grid-cols-2 overflow-x-auto gap-6">
        <RadioGroupLabel class="sr-only">Gruppenauswahl</RadioGroupLabel>
        <RadioGroupOption v-for="(group, index) in filteredGroups" :key="index" v-slot="{ checked }" :value="index">
            <GroupCard :group-data="group" :checked="checked" interactive/>
        </RadioGroupOption>
    </RadioGroup>
    <div v-else>
        <p class="font-p">Keine passenden Gruppen gefunden</p>
    </div>
</template>


<script lang="ts">
import GroupCard from "@/components/groupCard/GroupCard.vue"
import { allGroupTypes } from '@/types/GroupDBEntry';
import { PropType, ref } from 'vue'
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
    props: {
        filterStrings: {
            type: Array as PropType<string[]>,
            default: () => {return []}
        }
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
        filteredGroups(): Array<allGroupTypes> {
            let groups = this.store.getAllGroups;

            groups = groups.filter((group : allGroupTypes) => {
                const type = group.type;
                const name = group.name;

                const allStrings = `${type}, ${name}`.toLowerCase()
                
                const filterStrings = this.filterStrings;
                const validationArray: boolean[] = []
                
                filterStrings.forEach(filterString => {
                    validationArray.push(allStrings.includes(filterString.toLowerCase()))
                });

                if (validationArray.includes(false)) {
                    return false
                } else {
                    return true
                }
            })

            return groups
        },
    }
})
</script>