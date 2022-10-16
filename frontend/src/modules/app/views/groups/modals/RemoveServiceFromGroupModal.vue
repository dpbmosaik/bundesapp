<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <DialogTitle as="h3" class="font-h2">
            Service entfernen
        </DialogTitle>

        <DialogDescription class="font-p">
            Hiermit entfernst du den Service {{ serviceName }} von der Gruppe mit Id {{ groupId }}
        </DialogDescription>

        <p class="font-info font-normal text-proto-grey">
            Diese Aktion kann nicht rückgängig gemacht.
        </p>

        <div>
            <TextInput v-model="serviceNameTyped" class="grow" label="Service" required type="text" :placeholder="service" :value="serviceNameTyped" />
        </div>

        <div class="flex flex-row gap-4 justify-center mt-8">
            <SecondaryButton :target="() => closeModal()">Abbrechen</SecondaryButton>
            <PrimaryButton :disabled="serviceNameIsTyped" :target="() => handleConfirmation()">Alles klar</PrimaryButton>
        </div>
    </ModalWithSlot>
</template>
  
<script lang="ts">
    import ModalWithSlot from '@/components/modal/ModalWithSlot.vue';
    import PrimaryButton from '@/components/button/PrimaryButton.vue';
    import SecondaryButton from '@/components/button/SecondaryButton.vue';
    import { DialogTitle, DialogDescription } from '@headlessui/vue';

    export default defineComponent({
        name: "RemoveServiceFromGroupModal",
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
            service: {
                type: String,
                required: true
            },
        },
        emits: ['close-modal'],
        setup() {
            const serviceNameTyped = ref('');
            return {
                serviceNameTyped
            }
        },
        computed: {
            serviceName() {
                return this.service
            },
            serviceNameIsTyped() {              
                return !(this.service == this.serviceNameTyped)
            }
        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleConfirmation() {
                alert(`Remove Serivce ${this.service} from Group with id ${this.groupId}`);
                this.closeModal();
            }
        }
    })
</script>