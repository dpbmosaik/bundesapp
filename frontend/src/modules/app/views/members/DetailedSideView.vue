<template lang="">
    <div>
        <p v-for="(user, index) in focusedUsers" :key="index" >{{ buildFullName(focusedUser(user)) }}</p>
    </div>
</template>

<script lang="ts">
import dummyTestDB from "@/mixins/dummyTestDB";
import DummyDBEntry from "@/types/DummyDBEntry";
import { PropType } from "vue";

export default defineComponent({
    props: {
        focusedUsers: Array as PropType<string[]>,
    },
    mixins: [dummyTestDB],
    methods: {
        focusedUser(userId: string): DummyDBEntry {
            return this.getUserSafely(userId);
        },
    },
})
</script>
