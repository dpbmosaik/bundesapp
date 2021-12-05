<template>
  <div>
    <label :for="inputType" class="block text-sm font-medium text-gray-700">{{ textInputLabel }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <!-- v-on event should be changed to oninvalid once setup -->
      <input v-on:keyup="isItAnError()" :type="inputType" :name="inputType" :id="inputType" class="block w-full pr-10 sm:text-sm rounded-md" :class="{'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': error}" :placeholder="placeholder" aria-invalid="true" aria-describedby="email-error"/>
      <div v-if="error" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
      <div v-if="!error" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <QuestionMarkCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" id="email-error">{{ validationError }}</p>
  </div>
</template>

<script>
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import { QuestionMarkCircleIcon } from '@heroicons/vue/solid'

export default {
  name: "TextInputField",
  data() {
    return {
      error: false,
    }
  },
  components: {
      ExclamationCircleIcon,
      QuestionMarkCircleIcon,
  },
  props: {
    "textInputLabel": String,
    "validationError": {
      type: String,
      default: "Ungültige Eingabe",
    },
    "placeholder": String,
    "inputType": {
      type: String,
      default: "text",
    },
    "isRequired": {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    isItAnError() {
      console.log()
    },
  },
}
</script>