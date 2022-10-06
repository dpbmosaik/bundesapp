<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <DialogTitle as="h3" class="font-h2">
            Profilbild zurücksetzen
        </DialogTitle>

        <DialogDescription class="font-p">
            Hiermit löschst du das Gruppenbild vom Server und setzt es auf das Standardbild zurück.
        </DialogDescription>

        <p class="font-info font-normal text-proto-grey">
            Diese Aktion kann nicht rückgängig gemacht.
        </p>

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

    export default defineComponent({
        name: "ResetGroupAvatarModal",
        components: {
            ModalWithSlot,
            PrimaryButton,
            SecondaryButton,
            DialogTitle,
            DialogDescription
        },
        props: {
            isOpen: Boolean,
            groupId: {
                type: String,
                required: true
            },
        },
        emits: ['close-modal'],
        setup() {
            return {
                
            }
        },
        computed: {

        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleConfirmation() {
                alert(`Aktuelles Profilbild von Gruppe mit id ${this.groupId} vom Server löschen und Standardbild laden.`);
                this.closeModal();
            }
        }
    })
</script>