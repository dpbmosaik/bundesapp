<template>
    <ModalWithSlot
        :is-open="isOpen"
        @close-modal="closeModal"
    >
        <p class="font-h2">{{ `Namensänderung für ${groupName}` }}</p>
        <div class="flex flex-row items-end gap-3">
            <TextInput v-model="newGroupName" class="grow" label="Neuer Gruppenname" required type="text" placeholder="Neuer Name..." :value="newGroupName" />
        </div>
        <div class="flex flex-row gap-4 justify-center mt-8">
            <SecondaryButton :target="() => {closeModal(); newGroupName = '';}">Abbrechen</SecondaryButton>
            <PrimaryButton :target="() => handleNameSave()">Speichern</PrimaryButton>
        </div>
    </ModalWithSlot>
</template>
  
<script lang="ts">
    import ModalWithSlot from '@/components/modal/ModalWithSlot.vue';
    import TextInput from '@/components/inputs/TextInput.vue';
    import PrimaryButton from '@/components/button/PrimaryButton.vue';
    import SecondaryButton from '@/components/button/SecondaryButton.vue';

    export default defineComponent({
        name: "RenameGroupModal",
        components: {
            ModalWithSlot,
            TextInput,
            PrimaryButton,
            SecondaryButton
        },
        props: {
            isOpen: Boolean,
            groupName: {
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
            const newGroupName = ref('');
            return {
                newGroupName
            }
        },
        computed: {

        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleNameSave() {
                alert(`Save new Groupname "${this.newGroupName}" for group with id ${this.groupId}`)
                this.newGroupName = '';
                this.closeModal();
            }
        }
    })
</script>