<template lang="">
    <div class="flex flex-col gap-4">
        <p class="font-description text-proto-grey">
            {{ title }}
        </p>
        <div class="flex flex-col gap-2">
            <GroupUserListElement
                v-for="(user, index) in getUserListsById(userList)"
                :key="index"
                :user="user"
                :user-list-length="getUserListsById(userList).length"
                @remove-user="removeUser"
            />
        </div>
    </div>
</template>

<script lang="ts">
import GroupUserListElement from "./GroupUserListElement.vue"
export default defineComponent({
    components: {
        GroupUserListElement
    },
    props: {
        title: {
            type: String,
            default: 'Fehler'
        },
        userList: {
            type: Array,
            default: () => {return []}
        }
    },
    setup() {
        const store = useStore();
        return { 
            store,
        }
    },
    emits: ['remove-user'],
    methods: {
        getUserListsById(userIds: string[]) {
            return this.store.getUserListsById?.(userIds)
        },
        removeUser(e: string) {
            this.$emit("remove-user", {userId: e, role: this.title})
        }
    }
})
</script>