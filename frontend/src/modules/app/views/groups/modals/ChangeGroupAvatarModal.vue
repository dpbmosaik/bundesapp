<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <p class="font-h2">Neues Profilbild hochladen</p>
        <div class="flex flex-row items-end gap-3">
            fileupload here
        </div>
        <div class="flex flex-row gap-4 justify-center mt-8">
            <SecondaryButton :target="() => {closeModal(); newFile = '';}">Abbrechen</SecondaryButton>
            <PrimaryButton :target="() => handleNameSave()">Speichern</PrimaryButton>
        </div>
    </ModalWithSlot>
</template>
  
<script lang="ts">
    import ModalWithSlot from '@/components/modal/ModalWithSlot.vue';
    import PrimaryButton from '@/components/button/PrimaryButton.vue';
    import SecondaryButton from '@/components/button/SecondaryButton.vue';

    export default defineComponent({
        name: "ChangeGroupAvatarModal",
        components: {
            ModalWithSlot,
            PrimaryButton,
            SecondaryButton
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
            const newFile = ref('');
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
                alert(`Upload new Avatar File for group with id ${this.groupId}`)
                this.newFile = '';
                this.closeModal();
            }
        }
    })
</script>