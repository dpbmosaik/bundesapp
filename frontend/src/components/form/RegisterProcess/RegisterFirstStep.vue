<template>
  <div>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Account erstellen
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Die Bundesapp ist ein Service des Deutschen Pfadfinder Bund Mosaik.
    </p>


    <Input 
      v-for="item in inputFields"
      :key="item.name"
      :name="item.name"
      :inputType="item.inputType"
      :label="item.label"
      :placeholder="item.placeholder"
      :validation="item.validation"
     />


    <!-- <TextInput textInputLabel="Vorname" validationError="Name enthält unerlaubte Zeichen" placeholder="Lara" />
    <br>
    <TextInput textInputLabel="Nachname" placeholder="Musterfrau"/>
    <br>
    <TextInput textInputLabel="Fahrtenname" placeholder="Musti"/>
    <br>
    <TextInput textInputLabel="Email" validationError="Email enthält unerlaubte zeichen" placeholder="beispiel@example.com" inputType="email"/> -->
  </div>
</template>

<script>
// import TextInput from "../inputs/TextInput.vue"
import Input from "../inputs/Input.vue"

const inputFields = [
  {
    name: 'vorname',
    inputType: 'text',
    label: 'Vorname',
    placeholder: 'Mara',
    validation: ['alphanumeric', 'required']
  },
  {
    name: 'nachname',
    inputType: 'text',
    label: 'Nachname',
    placeholder: 'Musterfrau',
    validation: ['alphanumeric', 'required']
  }
]

export default {
  setup() {
    return {
     inputFields
    }
  },
  data() {
    return {
      firstname: '',
      lastName: '',
      scoutname: '',
      email: ''
    }
  },
  components: {
    // TextInput,
    Input
  }
}
</script>