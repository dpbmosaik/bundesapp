<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" :open="isOpen" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="flex flex-col gap-4 w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="font-h2">
                    {{ title }}
                </DialogTitle>

                <DialogDescription class="font-p">
                    {{ description }}
                </DialogDescription>

                <div class="">
                    <p class="font-info font-normal text-proto-grey">
                      {{ text }}
                    </p>
                </div>

                <div class="flex flex-row gap-4 justify-center mt-8">
                  <SecondaryButton :target="() => closeModal()">Abbrechen</SecondaryButton>
                  <PrimaryButton :target="() => handleConfirmation()">Alles klar</PrimaryButton>
                </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
    import {
        Dialog,
        DialogPanel,
        DialogTitle,
        DialogDescription,
        TransitionRoot,
        TransitionChild
    } from '@headlessui/vue'
    import PrimaryButton from '@/components/button/PrimaryButton.vue';
    import SecondaryButton from '@/components/button/SecondaryButton.vue';

    export default defineComponent({
        name: "ModalOverlay",
        components: {
            Dialog,
            DialogPanel,
            DialogTitle,
            DialogDescription,
            TransitionRoot,
            TransitionChild,
            PrimaryButton,
            SecondaryButton
        },
        props: {
            isOpen: Boolean,
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            action: {
              type: Function,
              required: true
            }
        },
        emits: ['close-modal'],
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleConfirmation() {
              this.action();
              this.closeModal();
            }
        }
    })
    

</script>