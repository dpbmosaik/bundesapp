<template lang="">
    <div class="flex flex-col gap-6 mt-5">
        <div class="flex flex-col gap-4">
            <p class="font-description text-proto-grey">Gruppen</p>
            <div v-if="subGroupList.length >= 1" class="flex flex-col gap-4">
                <GroupCard v-for="(group, index) in subGroupList" :key="index" :group-data="group" />
                <TertiaryButton class="self-center" :target="() => addGroupToGroupModalIsOpen=true">hinzufügen</TertiaryButton>
                <AddGroupToGroupModal 
                    :is-open="addGroupToGroupModalIsOpen"
                    :group-id="groupData.groupId"
                    @close-modal="addGroupToGroupModalIsOpen=false"
                />
            </div>
            <div v-else>
                <p>Keine Gruppenzugehörigkeit</p>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <GroupUserList title="Mitglieder" :user-list="groupData.groupMember" @remove-user="removeUserFromGroup" />
            <TertiaryButton class="self-center" :target="() => addMemberToGroupModalIsOpen=true">hinzufügen</TertiaryButton>
            <AddUserToGroupModal 
                :is-open="addMemberToGroupModalIsOpen"
                :group-id="groupData.groupId"
                role="member"
                @close-modal="addMemberToGroupModalIsOpen=false"
            />
        </div>
        <RemoveUserFromGroupModal 
            :is-open="removeUserFromGroupModalIsOpen"
            :group-id="groupData.groupId"
            :user-id="userToRemove.userId"
            :list-type="userToRemove.role"
            @close-modal="removeUserFromGroupModalIsOpen=false"
        />
    </div>
</template>


<script lang="ts">
import { allGroupTypes } from "@/types/GroupDBEntry";
import { PropType } from "vue";
import GroupUserList from "./GroupUserList.vue";
import AddUserToGroupModal from "./modals/AddUserToGroupModal.vue";
import AddGroupToGroupModal from "./modals/AddGroupToGroupModal.vue";
import RemoveUserFromGroupModal from "./modals/RemoveUserFromGroupModal.vue";

export default defineComponent({
    components: {
        GroupUserList,
        AddUserToGroupModal,
        AddGroupToGroupModal,
        RemoveUserFromGroupModal
    },
    props: {
        groupData: {
            type: Object as PropType<allGroupTypes>,
            required: true
        }
    },
    setup() {
        const store = useStore();
        const addMemberToGroupModalIsOpen = ref(false);
        const addGroupToGroupModalIsOpen = ref(false);
        const userToRemove = ref({userId: '', role: ''});
        const removeUserFromGroupModalIsOpen = ref(false);
        return { 
            store,
            addMemberToGroupModalIsOpen,
            addGroupToGroupModalIsOpen,
            userToRemove,
            removeUserFromGroupModalIsOpen
        }
    },
    computed: {
        subGroupList() {
            let groupList: allGroupTypes[] = []
            for (const groupId of this.groupData!.subGroups) {
                groupList.push(this.store.getgroupById!(groupId))
            }
            return groupList
        }
    },
    methods: {
        addSubgroupToGroup() {
            alert('Open Modal to Add Subgroup to Group')
        },
        removeUserFromGroup(e: {userId: string, role: string}) {
            this.userToRemove = e;
            this.removeUserFromGroupModalIsOpen = true;
        }
    }
})
</script>