<template>
  <div>
    <br>
    <!-- Stamm selector -->
    <div>
      <label for="stammSelect" class="block text-sm font-medium text-gray-700">Stamm</label>
      <select  required id="stammSelect" name="stammSelect" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="" disabled selected style="color: gray">Stamm auswählen</option>
        <option>Galaxias</option>
        <option>Sperber</option>
        <option>Hellas</option>
      </select>
    </div>

    <br>

    <!-- Group select -->
    <div>
      <label for="groupSelect" class="block text-sm font-medium text-gray-700">Gruppe</label>
      <select required id="groupSelect" name="groupSelect" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="" disabled selected style="color: gray">Gruppe auswählen</option>
        <option>Roverrunde</option>
        <option>Sippe</option>
        <option>Meute</option>
      </select>
    </div>
    </div>

</template>

<script>

export default {
  data() {
    return {
      stamm: ''
    }
  },
  components: {
   
  },
}
</script>