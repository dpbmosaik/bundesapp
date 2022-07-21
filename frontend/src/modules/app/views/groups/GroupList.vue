<template>
    <RadioGroup  v-model="selected" class="overflow-x-auto flex flex-col gap-8">
        <RadioGroupLabel class="sr-only">Gruppenauswahl</RadioGroupLabel>
        <div v-if="favoriteGroups.length" class="grid grid-cols-2 gap-6">
            <RadioGroupOption v-for="(group, index) in favoriteGroups" :key="index" v-slot="{ checked }" :value="group.groupId">
                <GroupCard :group-data="group" :checked="checked" interactive is-favorite />
            </RadioGroupOption>
        </div>
        <Divider v-if="favoriteGroups.length" />
        <div v-if="filteredGroups.length" class="grid grid-cols-2 gap-6">
            <RadioGroupOption v-for="(group, index) in filteredGroups" :key="index" v-slot="{ checked }" :value="group.groupId">
                <GroupCard :group-data="group" :checked="checked" interactive/>
            </RadioGroupOption>
        </div>
        <div v-else>
            <p class="font-p">Keine passenden Gruppen gefunden</p>
        </div>
    </RadioGroup>
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
import Divider from "@/components/divider/Divider.vue";

export default defineComponent({
    components: {
        GroupCard,
        RadioGroup,
        RadioGroupLabel,
        RadioGroupOption,
        Divider
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
        favoriteGroups(): Array<allGroupTypes> {
            const user = this.store.getLoggedInUserData();
            const favoriteGroupIds = user.favoriteGroups;
            return this.store.getgroupsByIdList(favoriteGroupIds);
        },
        filteredGroups(): Array<allGroupTypes> {
            let groups = this.store.getAllGroups;
            groups = groups.filter((group : allGroupTypes) => {
                const user = this.store.getLoggedInUserData();
                const favoriteGroupIds = user.favoriteGroups;
                if (favoriteGroupIds.includes(group.groupId)) {
                    return false // remove groups from normal list that are favorites
                }

                const type = group.type;
                const name = group.name;
                const allStrings = `${type}, ${name}`.toLowerCase()
                
                const filterStrings = this.filterStrings;
                const validationArray: boolean[] = []
                
                filterStrings.forEach(filterString => {
                    validationArray.push(allStrings.includes(filterString.toLowerCase()))
                });

                if (validationArray.includes(false)) {
                    return false // remove groups that do not match any filter tag
                } else {
                    return true
                }
            })

            return groups
        },
    }
})
</script>