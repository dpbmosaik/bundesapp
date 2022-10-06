<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <p class="font-h2">Neues Profilbild hochladen</p>
        <div class="flex flex-row items-end gap-3">
            <FileInput 
                v-model="newFile"
                label="Neues Profilbild auswählen"
            />
        </div>
        <div class="flex flex-row gap-4 justify-center mt-8">
            <SecondaryButton :target="() => {closeModal(); newFile = null;}">Abbrechen</SecondaryButton>
            <PrimaryButton :target="() => handleNameSave()">Speichern</PrimaryButton>
        </div>
    </ModalWithSlot>
</template>
  
<script lang="ts">
    import ModalWithSlot from '@/components/modal/ModalWithSlot.vue';
    import PrimaryButton from '@/components/button/PrimaryButton.vue';
    import SecondaryButton from '@/components/button/SecondaryButton.vue';
    import FileInput from '@/components/inputs/FileInput.vue';

    export default defineComponent({
        name: "ChangeGroupAvatarModal",
        components: {
            ModalWithSlot,
            PrimaryButton,
            SecondaryButton,
            FileInput
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
            const newFile = ref(null);
            return {
                newFile
            }
        },
        computed: {

        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleNameSave() {
                alert(`New File: ${this.newFile}`)
                this.newFile = null;
                this.closeModal();
            }
        }
    })
</script>