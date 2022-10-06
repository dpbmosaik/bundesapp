<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <DialogTitle as="h3" class="font-h2">
            Benutzer_innen Account löschen
        </DialogTitle>

        <DialogDescription class="font-p">
            Hiermit löschst du den Account von {{ userName }}
        </DialogDescription>

        <p class="font-info font-normal text-proto-grey">
            Mit dem ausführen, kann diese Person ab sofort nicht mehr auf die Bundesapp zugreifen und wir von allen Geräten abgemeldet. Diese Aktion kann nicht Rückgängig gemacht werden
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
        name: "DeleteUserModal",
        components: {
            ModalWithSlot,
            PrimaryButton,
            SecondaryButton,
            DialogTitle,
            DialogDescription
        },
        props: {
            isOpen: Boolean,
            userId: {
                type: String,
                required: true
            },
            userName: {
                type: String,
                required: true
            },
        },
        emits: ['close-modal'],
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleConfirmation() {
                alert(`Delete User Acount with the Id: ${this.userId}`)
                this.closeModal();
            }
        }
    })
</script>