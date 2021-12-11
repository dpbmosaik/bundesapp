<template>

  <div class="border-none py-3">
    <label :for="name" class="block text-sm font-medium text-gray-700">{{ label }} <span v-show="this.validation.includes('required')" class="text-red-500">*</span></label>
    <div class="mt-1 relative rounded-md shadow-sm">

      <input
        v-on:blur="checkValidation"
        v-model="value"
        :type="inputType"
        :name="name"
        :class="this.errors.length ? 'border-red-300' : 'border-gray-300'"
        class="shadow-sm focus:ring-dpbm-blue focus:border-dpbm-blue block w-full sm:text-sm rounded-md"
        :placeholder="placeholder"
      />
      
      <div v-show="tooltip.length" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <QuestionMarkCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>

    </div>

    <p
      v-show="this.errors.length"
      class="mt-2 text-sm text-red-600"
      id="email-error"
    >
      {{ errors[0] }} <!-- Only Show one Error at a time -->
    </p>

  </div>

</template>


<script>

import { QuestionMarkCircleIcon } from '@heroicons/vue/solid'

// types: text(date, email, text, tel, password, number, search, url), select, radio, checkbox, file, textarea
// validations: required, email, url, max:10, min:5, between:1,12, number, accepted, latin/default([a-zA-Z]/+äü...), alphanumeric, ends_with:.de, optional

export default {
  name: "TextInputField",
  data() {
    return {
      value: this.storeValue,
      // valueInStore: this.storeValue,
      errors: [],
      isValid: false
    }
  },
  props: {
      inputType: {
          type: String,
          default: 'text'
      },
      label: {
          type: String,
          default: ''
      },
      name: String,
      placeholder: {
          type: String,
          default: ''
      },
      help: {
          type: String,
          default: ''
      },
      validation: {
        type: Array,
        default: () => []
      },
      tooltip: {
        type: String,
        default: ''
      },
      storeValue : {
        type: String
      }
  },
  methods: {
    checkValidation() {
      const validations = this.validation;
      const inputToCheck = this.value;
      const errExists = err => this.errors.includes(err);

      let errorMessage;

      let passedAllValidations = [];

      for (const validation of validations) {
        
        switch (validation) {
          case 'required':
              var checkRequired = this.isFilled(inputToCheck)
              errorMessage = 'Eingabe benötigt.';
              if (!checkRequired && inputToCheck.length) {
                if (!errExists(errorMessage)) {
                  this.errors.push(errorMessage)
                  passedAllValidations.push(false)
                }
              } else {
                this.errors = this.errors.filter(err => err !== errorMessage)
                passedAllValidations.push(true)
              }
            break;
          case 'alpha':
              errorMessage = "Bitte nur Buchstaben und , . ' - verwenden.";
              var includesAlpha = this.isAlpha(inputToCheck);
              
              if (!includesAlpha && inputToCheck.length) {
                if (!errExists(errorMessage)) {
                  this.errors.push(errorMessage)
                  passedAllValidations.push(false)
                }
              } else {
                this.errors = this.errors.filter(err => err !== errorMessage)
                passedAllValidations.push(true)
              }
            break;
          case 'alphanumeric':
              errorMessage = "Bitte nur Buchstaben, Zahlen und , . ' - verwenden.";
              var includesAlphanumeric = this.isAlphanumeric(inputToCheck);
              
              if (!includesAlphanumeric && inputToCheck.length) {
                if (!errExists(errorMessage)) {
                  this.errors.push(errorMessage)
                  passedAllValidations.push(false)
                }
              } else {
                this.errors = this.errors.filter(err => err !== errorMessage)
                passedAllValidations.push(true)
              }
            break;
          case 'email':
              errorMessage = "Bitte eine gültige Email verwenden";
              var checkIfEmail = this.isEmail(inputToCheck);

              if (!checkIfEmail && inputToCheck.length) {
                if (!errExists(errorMessage)) {
                  this.errors.push(errorMessage)
                  passedAllValidations.push(false)
                }
              } else {
                this.errors = this.errors.filter(err => err !== errorMessage)
                passedAllValidations.push(true)
              }
            break;
        
          default:
            break;
        }

        // console.log(this.isValid)
      }
      if (!passedAllValidations.includes(false)) {
          this.isValid = true;
        } else {
          this.isValid = false;
      }
    },
    isAlphanumeric(value, set = 'default') {
      const sets = {
        default: /^[a-zA-Z0-9À-ÖØ-öø-ÿĄąĆćĘęŁłŃńŚśŹźŻż,.'-]+$/,
        latin: /^[a-zA-Z0-9,.'-]+$/
      }
      const selectedSet = sets.hasOwnProperty.call(set) ? set : 'default'
      return sets[selectedSet].test(value)
    },
    isAlpha(value , set = 'default') {
      const sets = {
        default: /^[a-zA-ZÀ-ÖØ-öø-ÿĄąĆćĘęŁłŃńŚśŹźŻż,.'-]+$/,
        latin: /^[a-zA-Z,.'-]+$/
      }
      const selectedSet = sets.hasOwnProperty.call(set) ? set : 'default'
      return sets[selectedSet].test(value)
    },
    isFilled(value) {
      if (value === '') {
        return false
      }
      return true
    },
    isEmail(value) {
      // eslint-disable-next-line
      const isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      return isEmail.test(value)
    },
    isUrl(value) {
      const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
      const localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/
      const nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;

      if (typeof value !== 'string') {
        return false;
      }
      let match = value.match(protocolAndDomainRE);
      if (!match) {
        return false;
      }
      let everythingAfterProtocol = match[1];
      if (!everythingAfterProtocol) {
        return false;
      }

      if (localhostDomainRE.test(everythingAfterProtocol) ||
        nonLocalhostDomainRE.test(everythingAfterProtocol)) {
        return true;
      }
      
      return false
    },
  },
  computed: {
     
  },
  components: {
    QuestionMarkCircleIcon
  },
}
</script>