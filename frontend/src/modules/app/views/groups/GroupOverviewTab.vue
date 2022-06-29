<template lang="">
    <div class="flex flex-col gap-6 mt-10">
        <div class="flex flex-row justify-between gap-8">
            <div class="flex flex-col ">
                <div class="flex flex-row gap-4">
                    <p class="font-h2">{{ `${getGroupPrefix()}${groupData.name}` }}</p>
                    <button>
                        <AppIcon name="edit" type="light" color="#C4C4C4" />
                    </button>
                    <button>
                        <AppIcon name="heart" type="light" color="#C4C4C4" />
                    </button>
                </div>
                <div class="flex flex-col h-full justify-end">
                    <p class="font-info text-proto-grey font-normal">{{ `Zuletzt bearbeitet am ${groupData.lastEditedAt} von ${groupData.lastEditedByUser}` }}</p>
                    <p class="font-info text-proto-grey font-normal">{{ `Erstellt am ${groupData.createdAt} von ${groupData.createdByUser}` }}</p>
                </div>
            </div>
            <div class="flex flex-row gap-4">
                <div class="flex flex-col gap-4">
                    <button>
                        <AppIcon name="closeSquare" type="light" color="#C4C4C4" />
                    </button>
                    <button>
                        <AppIcon name="edit" type="light" color="#C4C4C4" />
                    </button>
                </div>
                <div class="h-36 w-36 rounded-lg overflow-clip">
                    <img class="h-full w-full" :src="groupData.groupAvatar" alt="Avatar" />
                </div>
            </div>
        </div>
        <Divider /> <!-- ------------------------------------------------ -->
        <div v-if="isBundesGroup" class="flex flex-col gap-4">
            <GroupUserList :title="getGroupLeadRoleName()" :userList="groupData.leader" />
            <GroupUserList title="Stellvertreter_innen" :userList="groupData.deputies" />
            <GroupUserList title="Schatzmeister_in" :userList="groupData.headOfFinance" />
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
    },
    methods: {
        getGroupPrefix() {
            const type = this.groupData?.type
            if (type === 'Rollen' || type === 'Individuell') {
                return ''
            } else {
                return `${type} `
            }
        },
        getGroupLeadRoleName() {
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
    components: {
        AppIcon,
        Divider,
        GroupUserList
    }
})
</script>