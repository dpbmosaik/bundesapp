<template lang="">
    <FilterIcon>
        
        <p class="font-highlight text-proto-darkgrey mb-4">
            Gruppentypen
        </p>
        <div v-for="(type, index) in groupTypes" :key="index" class="flex flex-row items-center gap-2" >
            <input type="checkbox" :checked="searchTags.includes(type)" class="ml-1 h-4 w-4 rounded border-proto-grey text-proto-darkgrey focus:ring-proto-darkgrey" @click="handleSelection(type)" />
            <p class="font-p">{{ type }}</p>
        </div>
         
    </FilterIcon>
</template>

<script lang="ts">
import FilterIcon from "@/components/searchbar/FilterIcon.vue"
import { PropType } from 'vue';
export default defineComponent({
    name: 'FilterIconMembers',
    components: {
        FilterIcon,
    },
    props: {
        searchTags: {
            type: Array as PropType<string[]>,
            default: () => []
        }
    },
    emits: ['select-filter'],
    setup() {
        const groupTypes = ['Stamm', 'Horst', 'Ring', 'Sippe' , 'Meute', 'Roverrunde', 'Trupp', 'Rudel', 'Veranstaltung', 'Rollengruppe', 'Individuell'];
        return {
            groupTypes,
        }
    },
    methods: {
        handleSelection(val: string) {
            this.$emit("select-filter", val);
        }
    }
})
</script>
