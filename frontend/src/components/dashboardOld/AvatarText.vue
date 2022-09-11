<template>
  <span
    class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500"
  >
    <span class="text-lg font-medium leading-none text-white">
      {{ nameInitials }}
    </span>
  </span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    nameInitials: String,
  },
});
</script>
