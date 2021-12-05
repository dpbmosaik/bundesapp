<template>
  <CardTemplate title="Account erstellen" subTitle="Die bundesapp ist ein Service des Deutsche Pfadfinder Bund Mosaik">
    <TextInput textInputLabel="Vorname" validationError="Name enthält unerlaubte Zeichen" placeholder="Lara" />
    <br>
    <TextInput textInputLabel="Nachname" placeholder="Musterfrau"/>
    <br>
    <TextInput textInputLabel="Fahrtenname" placeholder="Musti"/>
    <br>
    <TextInput textInputLabel="Email" validationError="Email enthält unerlaubte zeichen" placeholder="beispiel@example.com" inputType="email"/>
  </CardTemplate>
</template>

<script>
import TextInput from "./RegisterComponents/TextInput.vue"
import CardTemplate from "./RegisterComponents/CardTemplate.vue"

export default {
  data() {
    return {
      firstname: '',
      lastName: '',
      scoutname: '',
      email: ''
    }
  },
  components: {
    TextInput,
    CardTemplate,
  }
}
</script>