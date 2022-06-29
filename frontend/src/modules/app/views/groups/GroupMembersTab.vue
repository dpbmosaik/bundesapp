<template lang="">
    <div>
        {{ groupData.groupMember.length }} Mitglieder
    </div>
</template>


<script lang="ts">
import { allGroupTypes } from "@/types/GroupDBEntry";
import { PropType } from "vue";

export default defineComponent({
    props: {
        groupData: Object as PropType<allGroupTypes>
    }
})
</script>