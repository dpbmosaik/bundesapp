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
            
                <slot></slot>

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
        TransitionRoot,
        TransitionChild
    } from '@headlessui/vue'

    export default defineComponent({
        name: "ModalOverlaySlot",
        components: {
            Dialog,
            DialogPanel,
            TransitionRoot,
            TransitionChild,
        },
        props: {
            isOpen: Boolean,
        },
        emits: ['close-modal'],
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            handleConfirmation() {
              this.closeModal();
            }
        }
    })
    

</script>