<template lang="">
    <div class="h-full">
        <div v-if="getSelectedMembersLength === 1" class="">
            <UserDetail :user-id="store.getSelectedMembers[0]" />
        </div>
        <div v-else-if="getSelectedMembersLength > 1" class="h-full">
            <FocusedMemberList />
        </div>
        <div v-else class="w-full h-full flex justify-center items-center">
            <p class="text-proto-grey h-fit">Noch keine Auswahl getroffen</p>
        </div>
    </div>
</template>

<script lang="ts">
import UserDetail from "./UserDetail.vue";
import FocusedMemberList from "./FocusedMemberList.vue";

export default defineComponent({
    components: {
        UserDetail,
        FocusedMemberList
    },
    setup() {
        const store = useStore()
        return { store }
    },
    computed: {
        getSelectedMembersLength() {
            return this.store.getSelectedMembersLength
        }
    }
})
</script>
