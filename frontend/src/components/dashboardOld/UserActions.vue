<template>
  <ButtonFancy
    v-for="action in actions"
    :button-text="action.buttonText"
    :img-url="action.imgURL"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ButtonFancy from "./ButtonFancy.vue";

export default defineComponent({
  components: {
    ButtonFancy,
  },
  data() {
    return {
      actions: [
        { buttonText: "E-Mail", imgURL: "" },
        { buttonText: "Nachricht", imgURL: "" },
      ],
    };
  },
});
</script>
