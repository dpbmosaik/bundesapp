<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <DialogTitle as="h3" class="font-h2">
            Gruppe löschen
        </DialogTitle>

        <DialogDescription class="font-p">
            Hiermit löschst du die Gruppe "{{ groupName }}"
        </DialogDescription>

        <p class="font-info font-normal text-proto-grey">
            Diese Aktion kann nicht rückgängig gemacht. Alle Daten der Gruppe werden vom Server gelöscht. Um die Gruppe löschen gib bitte unten den Namen ein.
        </p>

        <div>
            <TextInput v-model="groupNameTyped" class="grow" label="Gruppenname" required type="text" :placeholder="groupName" :value="groupNameTyped" />
        </div>

        <div class="flex flex-row gap-4 justify-center mt-8">
            <SecondaryButton :target="() => closeModal()">Abbrechen</SecondaryButton>
            <PrimaryButton :disabled="nameIsTyped" :target="() => handleConfirmation()">Alles klar</PrimaryButton>
        </div>
    </ModalWithSlot>
</template>
  
<script lang="ts">
    import ModalWithSlot from '@/components/modal/ModalWithSlot.vue';
    import PrimaryButton from '@/components/button/PrimaryButton.vue';
    import SecondaryButton from '@/components/button/SecondaryButton.vue';
    import { DialogTitle, DialogDescription } from '@headlessui/vue';
    import TextInput from '@/components/inputs/TextInput.vue';

    export default defineComponent({
        name: "DeleteGroupModal",
        components: {
            ModalWithSlot,
            PrimaryButton,
            SecondaryButton,
            DialogTitle,
            DialogDescription,
            TextInput
        },
        props: {
            isOpen: Boolean,
            groupId: {
                type: String,
                required: true
            },
            groupName: {
                type: String,
                required: true
            },
        },
        emits: ['close-modal'],
        setup() {
            const groupNameTyped = ref('');
            return {
                groupNameTyped
            }
        },
        computed: {
            nameIsTyped() {              
                return !(this.groupName == this.groupNameTyped)
            }
        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleConfirmation() {
                alert(`Delete group with id ${this.groupId}`);
                this.closeModal();
            }
        }
    })
</script>