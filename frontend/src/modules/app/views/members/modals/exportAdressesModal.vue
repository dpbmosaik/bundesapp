<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <DialogTitle as="h3" class="font-h2">
            Adressen Export
        </DialogTitle>

        <DialogDescription class="font-p">
            Wir erstellen gerade deine angefragte PDF mit den ausgewählten Nutzer_innen
        </DialogDescription>

        <p class="font-info font-normal text-proto-grey">
            PDF erscheint hier <br/>
            User Id's: {{ userIdList }}
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
        name: "exportAddressesModal",
        components: {
            ModalWithSlot,
            PrimaryButton,
            SecondaryButton,
            DialogTitle,
            DialogDescription
        },
        props: {
            isOpen: Boolean,
            selectedMembers: {
                type: Array,
                required: true
            },
        },
        emits: ['close-modal'],
        computed: {
            userIdList() {
                return this.selectedMembers.join(', ')
            }
        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleConfirmation() {
                alert(`Download PDF File`)
                this.closeModal();
            }
        }
    })
</script>