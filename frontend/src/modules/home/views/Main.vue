<template lang="">
  <div class="p-14 h-screen w-screen flex flex-col justify-between">
    <div class="grid grid-cols-3 w-full items-center">
      <div class="bg-proto-grey rounded-lg px-4 py-2 w-fit h-fit">Bundesapp Logo</div>
      <h1 class="font-h1 justify-self-center">Bundesapp des DPBM</h1>
      <div class="flex flex-row gap-4 justify-self-end">
        <SecondaryButton target="/register" >Registrieren</SecondaryButton>
        <PrimaryButton target="/login" >Anmelden</PrimaryButton>
      </div>
    </div>

    <div class="flex flex-row justify-between items-center">
      <div>
        <p class="font-numbers">Sei bereit!</p>
        <p class="font-numbers">Die Bundesapp des DPBM wird bald schon verfügbar sein.</p>
      </div>
      <img src="public/img/dpbmlogo.png" alt="Logo des DPBM" />
    </div>

    <TertiaryButton class="self-center" target="https//dpbm.de">Deutscher Pfadfinderbund Mosaik</TertiaryButton>
  </div>
</template>

<script lang="ts">
import PrimaryButton from "@/components/button/PrimaryButton.vue"
import SecondaryButton from "@/components/button/SecondaryButton.vue"
import TertiaryButton from "@/components/button/TertiaryButton.vue"
export default defineComponent({
  name: "HomePage",
  components: {
    PrimaryButton,
    SecondaryButton,
    TertiaryButton
  }
})
</script>