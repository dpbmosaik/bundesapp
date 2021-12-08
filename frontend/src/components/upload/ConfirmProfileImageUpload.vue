<template>
  <TransitionRoot as="template" :show="showModal">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="onHide">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300"
                         enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                         enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                         leave-from="opacity-100 translate-y-0 sm:scale-100"
                         leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden
          shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div class="text-center my-4">
                <DialogTitle as="h1" class="font-bold uppercase text-xl leading-1 text-black-900">
                  OK?
                </DialogTitle>
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  Schau nochmal drüber, ob das so passt
                </DialogTitle>
              </div>
            </div>
            <span class="inline-block relative">
                  <img class="rounded-full" alt="Profil-Bild" :src="cropImg"/>
                </span>
            <div class="flex items-center justify-center my-4 space-x-0.5">
              <button @click.prevent="onHide(false)"
                      class="text-black-500 bg-transparent border border-red-500
                  hover:bg-red-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3
                  rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="button">
                Zurück
              </button>
              <button @click.prevent="onHide(true)"
                      class="text-black-500 bg-transparent border border-green-500
                   hover:bg-green-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3
                   rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="button">
                Passt So
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script>

import {Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'

export default {
  name: "ErrorModal",
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  data() {
    return {
      showModal: false,
      message: '',
      cropImg: Image,
    }
  },
  methods: {
    onShow(image) {
      this.cropImg = image;
      this.showModal = true
    },
    onHide(succesful) {
      this.showModal = false;
      console.log('emit');
      this.$emit('onConfirmed', succesful);
    },
  },
}
</script>

<style>


</style>
