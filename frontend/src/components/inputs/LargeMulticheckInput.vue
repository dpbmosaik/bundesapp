<template>
  <Teleport to="body">
    <div v-show="display" class="modal">
      <div class="grid grid-cols-2 gap-4" v-for="(v, k) in fields" :key="k">
        <label :for="String(k)"> {{ k }} </label>
        <input
          type="checkbox"
          :value="v"
          :name="String(k)"
          v-model="fields[k]"
        />
      </div>
      <button @click="$emit('close')">schließen</button>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
defineProps<{
  display: boolean;
  position: string;
  fields: {
    [key: string]: boolean;
  };
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  background-color: lightgrey;
  border-radius: 0.5em;
  padding: 2em;
}
</style>
