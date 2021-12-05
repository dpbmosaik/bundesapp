<template>

  <div class="border-none">
    <label for="email" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1">
      <input :type="inputType" :name="name" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" :placeholder="placeholder" />
    </div>
  </div>

</template>


<script>

// types: text(date, email, text, tel, password, number, search, url), select, radio, checkbox, file, textarea
// validations: required, email, url, max:10, min:5, between:1,12, number, accepted, latin/default([a-zA-Z]/+äü...), alphanumeric, ends_with:.de, optional


export default {
  name: "TextInputField",
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
      validation: Array,

  }
}
</script>