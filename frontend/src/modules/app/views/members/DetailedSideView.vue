<template lang="">
    <div class="h-full">
        <div v-if="focusedUsers.length === 1" class="">
            <UserDetail :userId="focusedUsers[0]" />
        </div>
        <div v-else-if="focusedUsers.length > 1">
            <p 
                v-for="(user, index) in focusedUsers"
                :key="index"
                class="bg-proto-darkgrey text-white w-fit"
            >
                {{ buildFullName(focusedUser(user)) }}
            </p>
        </div>
        <div v-else class="w-full h-full flex justify-center items-center">
            <p class="text-proto-grey h-fit">Noch keine Auswahl getroffen</p>
        </div>
    </div>
</template>

<script lang="ts">
import dummyTestDB from "@/mixins/dummyTestDB";
import DummyDBEntry from "@/types/DummyDBEntry";
import { PropType } from "vue";
import UserDetail from "./UserDetail.vue";

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
    components: {
        UserDetail
    }
})
</script>
