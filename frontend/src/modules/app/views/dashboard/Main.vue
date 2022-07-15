<template lang="">
  <div class="grid grid-cols-4 grid-rows-4 h-full gap-8 grid-flow-col">
    <div class="grid grid-cols-4 grid-rows-4 h-full gap-8 grid-flow-row col-span-2 row-span-4">
      <div class="bg-proto-lightgrey rounded-lg col-span-2 p-4">
        <a href="https://dpbm.de" target="_blank" rel="noopener noreferrer" class="flex flex-col justify-between h-full">
          <p class="font-h2 truncate">Neue Nachrichten</p>
          <p class="font-numbers leading-none">{{ getAmountNewMessages }}</p>
        </a>
      </div>
      <div class="bg-proto-lightgrey rounded-lg col-span-2 p-4">
        <a href="https://dpbm.de" target="_blank" rel="noopener noreferrer" class="flex flex-col justify-between h-full">
          <p class="font-h2 truncate">Cloud Updates</p>
          <p class="font-numbers leading-none">{{ getAmountCloudUpdates }}</p>
        </a>
      </div>
      <div class="flex flex-col justify-between bg-proto-lightgrey rounded-lg col-span-2 p-4">
        <router-link to="/app/management" class="flex flex-col justify-between h-full">
          <p class="font-h2 truncate">Registrierungsanfragen</p>
          <p class="font-numbers leading-none">{{ getAmountRegisterRequests }}</p>
        </router-link>
      </div>
      <div class="flex flex-col justify-between bg-proto-lightgrey rounded-lg col-span-2 p-4">
        <a href="https://dpbm.de" target="_blank" rel="noopener noreferrer" class="flex flex-col justify-between h-full">
          <p class="font-h2 truncate">Neue Termine</p>
          <p class="font-numbers leading-none">{{ getAmountNewDates }}</p>
        </a>
      </div>
      <div class="bg-proto-lightgrey rounded-lg col-span-4 row-span-2 p-4">
        <p class="font-h2">Termine</p>
      </div>
    </div>
    <div class="bg-proto-lightgrey rounded-lg col-span-2 row-span-4 p-4">
      <p class="font-h2">Veranstaltungen</p>
    </div>
  </div>
</template>


<script lang="ts">
export default {
  name: "DashboardVue",
  computed: {
    getAmountNewMessages() {
      const amountNews = "12"
      return amountNews
    },
    getAmountCloudUpdates() {
      const amountUpdates = "8"
      return amountUpdates
    },
    getAmountRegisterRequests() {
      const amountRegisterRequests = "4"
      return amountRegisterRequests
    },
    getAmountNewDates() {
      const amountNewDates = "2"
      return amountNewDates
    },
  }
}
</script>