<template>
    <div class="w-full">
      <div class="flex justify-between mb-2">
        <label :for="name" class="block font-highlight text-proto-darkgrey">{{ label }}<span v-show="required" class="text-red-700"> *</span></label>
        <span v-show="!required" class="font-info text-proto-grey">Optional</span>
      </div>
      <input ref="file" type="file" name="image" accept="image/*" :multiple="multiple" @change="handleNewFile">
    </div>
  </template>
  
<script lang="ts">
import { ref } from "vue"

export default defineComponent({
    name: "FileInput",
    props: {
        label: {
            type: String,
            default: 'Label Fehlt'
        },
        required: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
    },
    emits: {'update:modelValue': null},
    setup() {
        const file = ref(null)
        return {
            file
        }
    },
    computed: {
        name() {
            return this.label.toLowerCase();
        },
    },
    methods: {
        handleNewFile(event: Event) {
            this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
        }
    }
})
</script>