<template lang="">
    <div class="flex flex-col gap-6 mt-10">
        <div class="flex flex-row justify-between gap-8">
            <div class="flex flex-col ">
                <div class="flex flex-row gap-4">
                    <p class="font-h2">{{ `${groupNameWithPrefix}` }}</p>

                    <button @click="() => renameGroupModalIsOpen = true">
                        <AppIcon name="edit" type="light" color="#C4C4C4" hover/>
                        <RenameGroupModal
                            :is-open="renameGroupModalIsOpen"
                            :group-name="groupNameWithPrefix"
                            :group-id="groupData.groupId"
                            @close-modal="renameGroupModalIsOpen=false"
                        />
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

                    <button @click="() => setGroupAvatarToStandardModalIsOpen=true">
                        <AppIcon name="closeSquare" type="light" color="#C4C4C4" hover/>
                        <ResetGroupAvatarModal
                            :is-open="setGroupAvatarToStandardModalIsOpen"
                            :group-id="groupData.groupId"
                            @close-modal="setGroupAvatarToStandardModalIsOpen=false"
                        />
                    </button>

                    <button @click="() => changeGroupAvatarModalIsOpen=true">
                        <AppIcon name="edit" type="light" color="#C4C4C4" hover/>
                        <ChangeGroupAvatarModal 
                            :is-open="changeGroupAvatarModalIsOpen"
                            :group-id="groupData.groupId"
                            @close-modal="changeGroupAvatarModalIsOpen=false"
                        />
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
                <GroupUserList :title="groupLeadRoleName" :user-list="groupData.leader" />
                <TertiaryButton class="self-center" :target="() => addUserToLead()">hinzufügen</TertiaryButton>
            </div>
            <div class="flex flex-col gap-4">
                <GroupUserList title="Stellvertreter_innen" :user-list="groupData.deputies" />
                <TertiaryButton class="self-center" :target="() => addUserToDeputies()">hinzufügen</TertiaryButton>
            </div>
            <div class="flex flex-col gap-4">
                <GroupUserList title="Schatzmeister_in" :user-list="groupData.headOfFinance" />
                <TertiaryButton class="self-center" :target="() => addUserToHeadOfFinance()">hinzufügen</TertiaryButton>
            </div>
        </div>
        <div v-else-if="isStammesGroup" class="flex flex-col gap-4">
            <GroupUserList title="Leiter_innen" :user-list="groupData.leader" />
            <TertiaryButton class="self-center" :target="() => addUserToGroupLeaders()">hinzufügen</TertiaryButton>
        </div>
        <div v-else-if="isRoleGroup" class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
                <p class="font-description text-proto-grey">Adminrollen</p>
                <p class="font-p">{{ joinArrayToList(groupData.editAccessRoles) }}</p>
            </div>
            <div class="flex flex-col gap-4">
                <p class="font-description text-proto-grey">Mitgliedsrollen</p>
                <p class="font-p">{{ joinArrayToList(groupData.roles) }}</p>
            </div>
        </div>
        <div v-else-if="isIndividualGroup" class="flex flex-col gap-4">
            <GroupUserList title="Gruppenadministrator_innen" :user-list="groupData.editAccessUsers" />
            <TertiaryButton class="self-center" :target="() => addUserToEditAccessUsers()">hinzufügen</TertiaryButton>
        </div>

        <AddUserToGroupModal 
            :is-open="addUserToGroupModalIsOpen"
            :group-id="groupData.groupId"
            :role="addUserToGroupModalRole"
            @close-modal="addUserToGroupModalIsOpen=false"
        />

        <Divider /> <!-- ------------------------------------------------ -->
        <div class="flex flex-col gap-4">
            <p class="font-description text-proto-grey">Teil der Gruppen</p>
            <div v-if="superGroupList.length >= 1" class="flex flex-col gap-4">
                <GroupCard v-for="(group, index) in superGroupList" :key="index" :group-data="group" />
            </div>
            <div v-else>
                <p>Keine Gruppenzugehörigkeit</p>
            </div>
        </div>
        <Divider /> <!-- ------------------------------------------------ -->
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <p class="font-description text-proto-grey">Email Weiterleitungen</p>
                <GroupServiceElement :service-data="groupData.emailAlias" />
            </div>
            <div class="flex flex-col gap-2">
                <p class="font-description text-proto-grey">Ordner in der Cloud</p>
                <GroupServiceElement :service-data="groupData.linkToCloud" />
            </div>
            <div class="flex flex-col gap-2">
                <p class="font-description text-proto-grey">Wiki Seite</p>
                <GroupServiceElement :service-data="groupData.linkToWiki" />
            </div>
            <div class="flex flex-col gap-2">
                <p class="font-description text-proto-grey">Chatgruppe</p>
                <GroupServiceElement :service-data="groupData.linkToChat" />
            </div>
            <div class="flex flex-col gap-2">
                <p class="font-description text-proto-grey">Miro Board</p>
                <GroupServiceElement :service-data="groupData.linkToMiro" />
            </div>
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
import GroupCard from '@/components/groupCard/GroupCard.vue';
import GroupServiceElement from "./GroupServiceElement.vue";
import RenameGroupModal from "./modals/RenameGroupModal.vue";
import ResetGroupAvatarModal from "./modals/ResetGroupAvatarModal.vue";
import ChangeGroupAvatarModal from "./modals/ChangeGroupAvatarModal.vue";
import AddUserToGroupModal from "./modals/AddUserToGroupModal.vue";

export default defineComponent({
    components: {
        AppIcon,
        Divider,
        GroupUserList,
        TertiaryButton,
        GroupCard,
        GroupServiceElement,
        RenameGroupModal,
        ResetGroupAvatarModal,
        ChangeGroupAvatarModal,
        AddUserToGroupModal
    },
    props: {
        groupData: {
            type: Object as PropType<allGroupTypes>,
            default: undefined
        }
    },
    setup() {
        const store = useStore();

        const renameGroupModalIsOpen = ref(false);
        const setGroupAvatarToStandardModalIsOpen = ref(false);
        const changeGroupAvatarModalIsOpen = ref(false);
        const addUserToGroupModalIsOpen = ref(false);
        const addUserToGroupModalRole = ref('groupMember')

        return { 
            store,
            renameGroupModalIsOpen,
            setGroupAvatarToStandardModalIsOpen,
            changeGroupAvatarModalIsOpen,
            addUserToGroupModalIsOpen,
            addUserToGroupModalRole
        }
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
        groupNameWithPrefix() {
            const type = this.groupData?.type
            if (type === 'Rollen' || type === 'Individuell') {
                return '' + this.groupData?.name
            } else {
                return `${type} ${this.groupData?.name}`
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
        superGroupList() {
            let groupList: allGroupTypes[] = []
            for (const groupId of this.groupData!.superGroups) {
                groupList.push(this.store.getgroupById!(groupId))
            }
            return groupList
        },
    },
    methods: {
        markGroupAsFavorit() {
            alert(`Group with id ${this.groupData?.groupId} marked as favorite`)
        },
        addUserToLead() {
            this.addUserToGroupModalIsOpen = true;
            this.addUserToGroupModalRole = 'leader';
        },
        addUserToDeputies() {
            this.addUserToGroupModalIsOpen = true;
            this.addUserToGroupModalRole = 'deputies';
        },
        addUserToHeadOfFinance() {
            this.addUserToGroupModalIsOpen = true;
            this.addUserToGroupModalRole = 'headOfFinance';
        },
        addUserToGroupLeaders() {
            this.addUserToGroupModalIsOpen = true;
            this.addUserToGroupModalRole = 'leader';
        },
        addUserToEditAccessUsers() {
            this.addUserToGroupModalIsOpen = true;
            this.addUserToGroupModalRole = 'editAccessUsers';
        },
        joinArrayToList(arr: string[]) {
            return arr.join(', ')
        }
    },

})
</script>