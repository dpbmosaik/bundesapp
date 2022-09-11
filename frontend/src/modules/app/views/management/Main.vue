<template lang="">
  <div class="grid grid-cols-4 grid-rows-4 h-full gap-8 grid-flow-col">
    <div class="grid grid-cols-2 grid-rows-2 h-full gap-8 grid-flow-row col-span-2 row-span-4">
      <div class="bg-proto-lightgrey rounded-lg col-span-4 p-4">
        <p class="font-h2">Leer</p>
      </div>
      <div class="bg-proto-lightgrey rounded-lg col-span-4 p-4">
        <p class="font-h2">Leer</p>
      </div>
    </div>
    <div class="bg-proto-lightgrey rounded-lg col-span-2 row-span-4 p-4">
      <p class="font-h2 mb-2">Registrierungsanfragen</p>
      <RegisterRequestList />
    </div>
  </div>
</template>


<script lang="ts">
import RegisterRequestList from "./RegisterRequestList.vue"
export default {
  name: "ManagementVue",
  components: {
    RegisterRequestList
  },
  computed: {

  }
}
</script>