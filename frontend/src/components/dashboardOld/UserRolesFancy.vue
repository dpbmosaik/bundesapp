<template>
  <div class="mt-4 flex items-start justify-between">
    <div>
      <span
        v-for="role in roles"
        class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
      >
        {{ role }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      roles: ["Test", "Test1", "Test2"],
    };
  },
});
</script>
