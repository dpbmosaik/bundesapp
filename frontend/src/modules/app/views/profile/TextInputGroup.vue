<template>
  <div>
    <TextInput
      v-for="(v, k) in inputFields"
      v-model="v.attributes.value"
      v-bind="v.attributes"
      v-on="v.events"
      :key="k"
    />
  </div>
</template>
<script setup lang="ts">
import TextInput from "@/components/inputs/TextInput.vue";
import { PropType } from "vue";
import { TextInputGroupConfig } from "./TextInputGroupConfig";

defineProps({
  inputFields: Object as PropType<TextInputGroupConfig>,
});
</script>
