<template>
  <img class="inline-block h-10 w-10 rounded-full" :href="url" :alt="altText" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    url: String,
    altText: String,
  },
});
</script>
