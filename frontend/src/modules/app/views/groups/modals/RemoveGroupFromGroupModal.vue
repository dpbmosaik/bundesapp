<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <DialogTitle as="h3" class="font-h2">
            Gruppe entfernen
        </DialogTitle>

        <DialogDescription class="font-p">
            Hiermit entfernst du die Gruppe mit Id {{ groupToRemoveId }} von der Gruppe mit Id {{ groupId }}
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
        name: "RemoveGroupFromGroup",
        components: {
            ModalWithSlot,
            PrimaryButton,
            SecondaryButton,
            DialogTitle,
            DialogDescription
        },
        props: {
            isOpen: Boolean,
            groupToRemoveId: {
                type: String,
                required: true
            },
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
                alert(`Remove group with id ${this.groupToRemoveId} from group with ${this.groupId}`);
                this.closeModal();
            }
        }
    })
</script>