<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <template v-if="service == 'email'">
            <DialogTitle as="h3" class="font-h2">
                Email Weiterleitungen hinzufügen
            </DialogTitle>

            <DialogDescription class="font-p">
                Hiermit fügst du den Service {{ serviceName }} der Gruppe {{ groupName }} hinzu
            </DialogDescription>

            <div>
                <MultiselectInput :options="emailOptions" />
            </div>
        </template>
        <template v-else>
            <DialogTitle as="h3" class="font-h2">
                Service hinzufügen
            </DialogTitle>
    
            <DialogDescription class="font-p">
                Hiermit fügst du den Service {{ serviceName }} der Gruppe mit Id {{ groupId }} hinzu
            </DialogDescription>
    
            <p class="font-info font-normal text-proto-grey">
                Diese Aktion kann rückgängig gemacht.
            </p>
        </template>
        <div class="flex flex-row gap-4 justify-center mt-8">
            <SecondaryButton :target="() => closeModal()">Abbrechen</SecondaryButton>
            <PrimaryButton :target="() => handleConfirmation()">Alles klar</PrimaryButton>
        </div>
    </ModalWithSlot>
</template>
  
<script lang="ts">
    import ModalWithSlot from '@/components/modal/ModalWithSlot.vue';
    import PrimaryButton from '@/components/button/PrimaryButton.vue';
    import SecondaryButton from '@/components/button/SecondaryButton.vue';
    import { DialogTitle, DialogDescription } from '@headlessui/vue';
    import MultiselectInput from '@/components/inputs/MultiselectInput.vue';

    export default defineComponent({
        name: "AddServiceToGroupModal",
        components: {
            ModalWithSlot,
            PrimaryButton,
            SecondaryButton,
            DialogTitle,
            DialogDescription,
            MultiselectInput
        },
        props: {
            isOpen: Boolean,
            groupId: {
                type: String,
                required: true
            },
            service: {
                type: String,
                required: true
            },
        },
        emits: ['close-modal'],
        setup() {
            const store = useStore();
            return {
                store
            }
        },
        computed: {
            serviceName() {
                return this.service
            },
            groupName() {
                return this.store.getgroupById!(this.groupId).name
            },
            groupType() {
                return this.store.getgroupById!(this.groupId).type
            },
            emailOptions() {
                const groupName = this.replaceUmlauts(this.groupName).replace(/\s/g, '');
                const groupType = this.groupType
                const mailString = `${groupName.toLowerCase()}@bundesapp.org`
                const emailOptionsStamm = [
                    {
                        label: 'Stammesführer_in',
                        desc: `stafuelei.${mailString}`
                    },
                    {
                        label: 'Stammesführung',
                        desc: `stafue.${mailString}`
                    },
                    {
                        label: 'Schatzmeister_in',
                        desc: `schatz.${mailString}`
                    },
                    {
                        label: `Gruppenleitungen im ${groupType}`,
                        desc: `grulei.${mailString}`
                    },
                    {
                        label: 'Alle Mitglieder',
                        desc: `${groupType.toLowerCase()}.${mailString}`
                    },
                ]
                const emailOptionsRing = [
                    {
                        label: 'Ringführer_in',
                        desc: `rifuelei.${mailString}`
                    },
                    {
                        label: 'Ringführung',
                        desc: `rifue.${mailString}`
                    },
                    {
                        label: 'Ringschatzmeister_in',
                        desc: `schatz.${mailString}`
                    },
                    {
                        label: 'Stammesführungen im Ring',
                        desc: `stafues.${mailString}`
                    },
                    {
                        label: 'Alle Mitglieder',
                        desc: `ring.${mailString}`
                    },
                ]
                const emailOptionsGroup = [
                    {
                        label: `${groupType}nführung`,
                        desc: `${groupType.substring(0,3)}fue.${mailString}`
                    },
                    {
                        label: `Gruppenleitungen ${groupType}`,
                        desc: `grulei.${mailString}`
                    },
                    {
                        label: 'Alle Mitglieder',
                        desc: `gruppe.${mailString}`
                    },
                ]
                const emailOptionsIndividuell = [
                    {
                        label: `Gruppenadmin`,
                        desc: `admin.${mailString}`
                    },
                    {
                        label: `Gruppenleitungen ${groupName}`,
                        desc: `grulei.${mailString}`
                    },
                    {
                        label: 'Alle Mitglieder',
                        desc: `gruppe.${mailString}`
                    },
                ]
                const emailOptionsRole = [
                    {
                        label: `Adminrolle`,
                        desc: `admin.${mailString}`
                    },
                    {
                        label: `Mitgliedsrollen`,
                        desc: `rollen.${mailString}`
                    },
                    {
                        label: 'Alle Mitglieder',
                        desc: `gruppe.${mailString}`
                    },
                ]
                if (this.groupType == 'Stamm' || this.groupType == 'Aufbaustamm') return emailOptionsStamm
                if (this.groupType == 'Ring' || this.groupType == 'Aufbauring') return emailOptionsRing
                if (this.groupType == 'Meute' || this.groupType == 'Sippe' || this.groupType == 'Rudel' || this.groupType == 'Trupp' || this.groupType == 'Roverrunde') return emailOptionsGroup
                if (this.groupType == 'Individuell') return emailOptionsIndividuell
                if (this.groupType == 'Rollen') return emailOptionsRole
                return []
            }
        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleConfirmation() {
                alert(`Add Service ${this.service} from Group with id ${this.groupId}`);
                this.closeModal();
            },
            replaceUmlauts(string: string) {
                let value;
                value = string.toLowerCase();
                value = value.replace(/ä/g, 'ae');
                value = value.replace(/ö/g, 'oe');
                value = value.replace(/ü/g, 'ue');
                return value;
            }
        }
    })
</script>