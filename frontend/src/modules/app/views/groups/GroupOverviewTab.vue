<template lang="">
    <div class="flex flex-col gap-6 mt-10">
        <div class="flex flex-row justify-between gap-8">
            <div class="flex flex-col ">
                <div class="flex flex-row gap-4">
                    <p class="font-h2">{{ `${groupPrefix}${groupData.name}` }}</p>
                    <button @click="() => editGroupName()">
                        <AppIcon name="edit" type="light" color="#C4C4C4" hover/>
                    </button>
                    <button @click="() => markGroupAsFavorit()">
                        <AppIcon name="heart" type="light" color="#C4C4C4" hover/>
                    </button>
                </div>
                <div class="flex flex-col h-full justify-end">
                    <p class="font-info text-proto-grey font-normal">{{ `Zuletzt bearbeitet am ${groupData.lastEditedAt} von ${groupData.lastEditedByUser}` }}</p>
                    <p class="font-info text-proto-grey font-normal">{{ `Erstellt am ${groupData.createdAt} von ${groupData.createdByUser}` }}</p>
                </div>
            </div>
            <div class="flex flex-row gap-4">
                <div class="flex flex-col gap-4">
                    <button @click="() => setGroupAvatarToStandard()">
                        <AppIcon name="closeSquare" type="light" color="#C4C4C4" hover/>
                    </button>
                    <button @click="() => changeGroupAvatar()">
                        <AppIcon name="edit" type="light" color="#C4C4C4" hover/>
                    </button>
                </div>
                <div class="h-36 w-36 rounded-lg overflow-clip">
                    <img class="h-full w-full" :src="groupData.groupAvatar" alt="Avatar" />
                </div>
            </div>
        </div>
        <Divider /> <!-- ------------------------------------------------ -->
        <div v-if="isBundesGroup" class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
                <GroupUserList :title="groupLeadRoleName" :userList="groupData.leader" />
                <TertiaryButton class="self-center" :target="() => addUserToLead()">hinzufügen</TertiaryButton>
            </div>
            <div class="flex flex-col gap-4">
                <GroupUserList title="Stellvertreter_innen" :userList="groupData.deputies" />
                <TertiaryButton class="self-center" :target="() => addUserToDeputies()">hinzufügen</TertiaryButton>
            </div>
            <div class="flex flex-col gap-4">
                <GroupUserList title="Schatzmeister_in" :userList="groupData.headOfFinance" />
                <TertiaryButton class="self-center" :target="() => addUserTHeadOfFinance()">hinzufügen</TertiaryButton>
            </div>
        </div>
        <div v-else-if="isStammesGroup">

        </div>
        <div v-else-if="isRoleGroup">

        </div>
        <div v-else-if="isIndividualGroup">

        </div>
    </div>
</template>


<script lang="ts">
import { allGroupTypes } from "@/types/GroupDBEntry";
import { PropType } from "vue";
import AppIcon from "@/components/icons/AppIcon.vue";
import Divider from '@/components/divider/Divider.vue';
import GroupUserList from "./GroupUserList.vue";
import TertiaryButton from '@/components/button/TertiaryButton.vue';

export default defineComponent({
    setup() {
        const store = useStore();
        return { 
            store,
        }
    },
    props: {
        groupData: Object as PropType<allGroupTypes>
    },
    computed: {
        isBundesGroup() {
            const type = this.groupData?.type
            if (type === 'Stamm' || type === 'Aufbaustamm' || type === 'Horst' || type === 'Ring' || type === 'Aufbauring') {
                return true
            }
            return false
        },
        isStammesGroup() {
            const type = this.groupData?.type
            if (type === 'Meute' || type === 'Sippe' || type === 'Rudel' || type === 'Trupp' || type === 'Roverrunde') {
                return true
            }
            return false
        },
        isRoleGroup() {
            const type = this.groupData?.type
            if (type === 'Rollen') {
                return true
            }
            return false
        },
        isIndividualGroup() {
            const type = this.groupData?.type
            if (type === 'Individuell') {
                return true
            }
            return false
        },
        groupPrefix() {
            const type = this.groupData?.type
            if (type === 'Rollen' || type === 'Individuell') {
                return ''
            } else {
                return `${type} `
            }
        },
        groupLeadRoleName() {
            const type = this.groupData?.type
            switch (type) {
                case 'Stamm':
                case 'Aufbaustamm':
                    return 'Stammesführer_in'
                case 'Horst':
                    return 'Horstführer_in'
                case 'Ring':
                case 'Aufbauring':
                    return 'Ringführer_in'
                default:
                    return 'Leiter_in'
            }
        },
    },
    methods: {
        markGroupAsFavorit() {
            alert(`Group with id ${this.groupData?.groupId} marked as favorite`)
        },
        editGroupName() {
            alert(`Edit Groupname with id ${this.groupData?.groupId}`)
        },
        setGroupAvatarToStandard() {
            alert('Open Modal to ask for confirmation to set avatar to standard')
        },
        changeGroupAvatar() {
            alert('Open Modal to change group Avatar')
        },
        addUserToLead() {
            alert('Open Something to add new user to Lead');
        },
        addUserToDeputies() {
            alert('Open Something to add new user to Deputies');
        },
        addUserTHeadOfFinance() {
            alert('Open Something to add new user to Head of Finance');
        },
    },
    components: {
        AppIcon,
        Divider,
        GroupUserList,
        TertiaryButton
    }
})
</script>