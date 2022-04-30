<template>
  <div>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Account erstellen
    </h2>
    <p class="mt-2 mb-6 text-center text-sm text-gray-600">
      Die Bundesapp ist ein Service des Deutschen Pfadfinder Bund Mosaik.
    </p>

    <Input 
      v-for="inputField in inputFields"
      :key="inputField.name"
      :ref="inputField.name"
      :name="inputField.name"
      :input-type="inputField.inputType"
      :label="inputField.label"
      :placeholder="inputField.placeholder"
      :validation="inputField.validation"
      :tooltip="inputField.tooltip"
      @input="getInputValue(inputField.name); checkIfStepIsDone()"
     />

  </div>
</template>

<script>
import Input from "@/components/inputs/Input.vue"

const inputFields = [
  {
    name: 'firstname',
    inputType: 'text',
    label: 'Vorname',
    placeholder: 'Mara',
    validation: ['alpha', 'required'],
    tooltip: 'Vorname',
  },
  {
    name: 'lastname',
    inputType: 'text',
    label: 'Nachname',
    placeholder: 'Musterfrau',
    validation: ['alpha', 'required'],
    tooltip: 'Nachname',
  },
  {
    name: 'scoutname',
    inputType: 'text',
    label: 'Fahrtenname',
    placeholder: 'Mara',
    validation: ['alphanumeric'],
    tooltip: 'Fahrtenname',
  },
  {
    name: 'email',
    inputType: 'email',
    label: 'Email',
    placeholder: 'mara@musterfrau.de',
    validation: ['required', 'email'],
    tooltip: 'Email',
  },
]

export default {
  components: {
    Input
  },
  setup() {
    return {
     inputFields
    }
  },
  data() {
    return {
      data: {}
    }
  },
  computed: {
    firstname: {
      get() {
        return '3';
      },
      set(value) {
        // this.$store.commit('setRegisterFirstName', {firstname: value})
      }
    },
    lastname: {
      get() {
        return '3'; 
      },
      set(value) {
        // this.$store.commit('setRegisterLastName', {lastname: value})
      }
    },
    scoutname: {
      get() {
        return '7';
      },
      set(value) {
        // this.$store.commit('setRegisterScoutName', {scoutname: value})
      }
    },
    email: {
      get() {
        return '5';
      },
      set(value) {
        // this.$store.commit('setRegisterEmail', {email: value})
      }
    },
  },
  methods: {
    getInputValue(inputField) {

        this[inputField] = this.$refs[inputField].value

        // console.log(inputField + ': ' + this.$refs[inputField].value)

    },
    checkIfStepIsDone() {
      let stepDone = [];
      for (const input of inputFields) {
        
        if (input.validation.includes('required')) {
          // only check required fields
          stepDone.push(this.$refs[input.name].isValid)
        } else if (this.$refs[input.name].value !== '') {
          // check non required fields that are not empty
          stepDone.push(this.$refs[input.name].isValid)
        }
      }
      console.log(stepDone)
      if (!stepDone.includes(false)) {
        // if all inputs are valid mutate state to step1 done is true
        
        // this.$store.commit('changeStateOfFirstStep', {value: true})
      }
    },
  }
}
</script>