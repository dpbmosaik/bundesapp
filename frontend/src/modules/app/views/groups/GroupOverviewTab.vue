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

        <div v-if="isBundesGroup" class="flex flex-col gap-4" >

            <Divider /> <!-- ------------------------------------------------ -->
    
            <RadioGroup v-model="selectedGroupStatus">
                <RadioGroupLabel class="sr-only"> Gruppenstatus </RadioGroupLabel>
                <div class="-space-y-px rounded-md bg-white">
                    <RadioGroupOption v-for="(setting, settingIdx) in groupStatus" :key="setting.name" v-slot="{ checked, active }" as="template" :value="setting">
                        <div :class="[settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', settingIdx === groupStatus.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'bg-proto-lightgrey border-bg-proto-grey z-10' : 'border-gray-200', 'relative border p-4 flex cursor-pointer focus:outline-none']">
                        <span :class="[checked ? 'bg-proto-darkgrey border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-proto-darkgrey' : '', 'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center']" aria-hidden="true">
                            <span class="rounded-full bg-white w-1.5 h-1.5" />
                        </span>
                        <span class="ml-3 flex flex-col">
                            <RadioGroupLabel as="span" :class="[checked ? 'text-proto-darkgrey' : 'text-proto-darkgrey', 'block text-sm font-medium']">{{ setting.name }}</RadioGroupLabel>
                            <RadioGroupDescription as="span" :class="[checked ? 'text-proto-darkgrey' : 'text-gray-500', 'block text-sm']">{{ setting.description }}</RadioGroupDescription>
                        </span>
                        </div>
                    </RadioGroupOption>
                </div>
            </RadioGroup>
    
            <div v-if="!selectedGroupHasChanged" class="flex flex-row gap-4 justify-center mt-8">
                <SecondaryButton :target="() => resetGroupStatus()">Abbrechen</SecondaryButton>
                <PrimaryButton :target="() => saveNewGroupStatus()">Speichern</PrimaryButton>
            </div>

        </div>

        <Divider /> <!-- ------------------------------------------------ -->

        <div v-if="isBundesGroup || isStammesGroup" class="flex flex-col gap-4">
            <div v-for="(roleType, index) in groupRoles" :key="index" class="flex flex-col gap-4">
                <GroupUserList :title="roleType.title" :user-list="roleType.userList" @remove-user="removeUserFromGroup"/>
                <TertiaryButton class="self-center" :target="roleType.action">hinzufügen</TertiaryButton>
            </div>
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

        <RemoveUserFromGroupModal 
            :is-open="removeUserFromGroupModalIsOpen"
            :group-id="groupData.groupId"
            :user-id="userToRemove.userId"
            :list-type="userToRemove.role"
            @close-modal="removeUserFromGroupModalIsOpen=false"
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
            <div v-for="(item, index) in groupServices" :key="index" class="flex flex-col gap-2">
                <p class="font-description text-proto-grey">{{ item.title }}</p>
                <GroupServiceElement :service-data="item.data" />
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { allGroupTypes } from "@/types/GroupDBEntry";
import { PropType, ref } from "vue";
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
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import SecondaryButton from "@/components/button/SecondaryButton.vue";
import RemoveUserFromGroupModal from "./modals/RemoveUserFromGroupModal.vue";

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
        AddUserToGroupModal,
        RadioGroup,
        RadioGroupDescription,
        RadioGroupLabel,
        RadioGroupOption,
        PrimaryButton,
        SecondaryButton,
        RemoveUserFromGroupModal
    },
    props: {
        groupData: {
            type: Object as PropType<allGroupTypes>,
            required: true
        }
    },
    setup(props) {
        const store = useStore();

        const renameGroupModalIsOpen = ref(false);
        const setGroupAvatarToStandardModalIsOpen = ref(false);
        const changeGroupAvatarModalIsOpen = ref(false);
        const addUserToGroupModalIsOpen = ref(false);
        const removeUserFromGroupModalIsOpen = ref(false);
        const addUserToGroupModalRole = ref('groupMember');

        const userToRemove = ref({userId: '', role: ''});

        const groupStatus = [
            { id: 0, name: 'Regulär', description: 'Diese Gruppe ist reguläres Mitglied laut Bundessatzung' },
            { id: 1, name: 'Aufbau', description: 'Nach Bundessatzung befindet sich diese Gruppe noch im Aufbau' },
            { id: 2, name: 'Inaktiv', description: 'Diese Gruppe war mal ein reguläres Mitglied, ist aber nicht mehr Teil der offiziellen Gremien' },
        ]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore groupStatus does exist in object an dis defined in type
        // eslint-disable-next-line vue/no-setup-props-destructure
        const savedGroupStatus = props.groupData.groupStatus;
        // eslint-disable-next-line security/detect-object-injection
        const selectedGroupStatus = ref(groupStatus[savedGroupStatus]);

        return { 
            store,
            renameGroupModalIsOpen,
            setGroupAvatarToStandardModalIsOpen,
            changeGroupAvatarModalIsOpen,
            addUserToGroupModalIsOpen,
            addUserToGroupModalRole,
            groupStatus,
            selectedGroupStatus,
            savedGroupStatus,
            removeUserFromGroupModalIsOpen,
            userToRemove
        }
    },
    computed: {
        isBundesGroup() {
            const type = this.groupData.type
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
        groupServices() {
            return [
                { title: 'Email Weiterleitungen', data: this.groupData.emailAlias },
                { title: 'Ordner in der Cloud', data: this.groupData.linkToCloud },
                { title: 'Wiki Seite', data: this.groupData.linkToWiki },
                { title: 'Chatgruppe', data: this.groupData.linkToChat },
                { title: 'Miro Board', data: this.groupData.linkToMiro },
            ]
        },
        selectedGroupHasChanged() {
            let savedStatus;
            if (this.isBundesGroup) {
                //@ts-ignore groupStatus does exist in object an dis defined in type
                savedStatus = this.groupData.groupStatus;
            }            
            return savedStatus == this.selectedGroupStatus.id
        },
        groupRoles() {
            let groupRoles;
            if (this.isBundesGroup) {
                groupRoles = [
                    {
                        title: this.groupLeadRoleName,
                        namecode: 'leader',
                        //@ts-ignore
                        userList: this.groupData.leader,
                        action: () => this.addUserToLead()
                    },
                    {
                        title: 'Stellvertreter_innen',
                        namecode: 'deputies',
                        //@ts-ignore
                        userList: this.groupData.deputies,
                        action: () => this.addUserToDeputies()
                    },
                    {
                        title: 'Schatzmeister_in',
                        namecode: 'headOfFinance',
                        //@ts-ignore
                        userList: this.groupData.headOfFinance,
                        action: () => this.addUserToHeadOfFinance()
                    },
                ]
            } else if (this.isStammesGroup) {
                groupRoles = [
                    {
                        title: this.groupLeadRoleName,
                        namecode: 'leader',
                        //@ts-ignore
                        userList: this.groupData.leader,
                        action: () => this.addUserToGroupLeaders()
                    },
                ]
            } else if (this.isRoleGroup) {
                
            } else {
                groupRoles = []
            }
            return groupRoles
        }
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
        },
        resetGroupStatus() {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore groupStatus does exist in object an dis defined in type
            this.selectedGroupStatus = this.groupStatus[this.savedGroupStatus];
        },
        saveNewGroupStatus() {
            const groupId = this.groupData.groupId
            const newGroupStatus = this.selectedGroupStatus.id
            alert(`Set new group Status ${newGroupStatus} for group with id ${groupId}`)
        },
        removeUserFromGroup(e: {userId: string, role: string}) {
            this.userToRemove = e;
            this.removeUserFromGroupModalIsOpen = true;
        }
    },

})
</script>