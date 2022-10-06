<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <DialogTitle as="h3" class="font-h2">
            Benutzer_in entfernen
        </DialogTitle>

        <DialogDescription class="font-p">
            Hiermit entfernst du den User mit Id {{ userId }} von der Gruppe mit Id {{ groupId }}
        </DialogDescription>

        <p class="font-info font-normal text-proto-grey">
            Diese Aktion kann rückgängig gemacht.
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
        name: "RemoveUserFromGroup",
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
            userId: {
                type: String,
                required: true
            },
            listType: {
                type: String,
                required: true
            }
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
                alert(`Remove user with id ${this.userId} as ${this.listType} from group with ${this.groupId}`);
                this.closeModal();
            }
        }
    })
</script>