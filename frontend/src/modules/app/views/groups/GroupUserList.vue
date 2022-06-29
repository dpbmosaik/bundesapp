<template lang="">
    <div class="flex flex-col gap-4">
        <p class="font-description text-proto-grey">
            {{ title }}
        </p>
        <div class="flex flex-col gap-2">
            <GroupUserListElement v-for="(user, index) in getUserListsById(userList)" :key="index" :user="user" />
        </div>
    </div>
</template>

<script lang="ts">
import GroupUserListElement from "./GroupUserListElement.vue"
export default defineComponent({
    setup() {
        const store = useStore();
        return { 
            store,
        }
    },
    props: {
        title: String,
        userList: Array
    },
    methods: {
        getUserListsById(userIds: string[]) {
            return this.store.getUserListsById!(userIds)
        }
    },
    components: {
        GroupUserListElement
    }
})
</script>