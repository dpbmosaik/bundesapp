<template>
  <div>
    <div class="flex justify-between">
      <label :for="name" class="block font-highlight text-proto-darkgrey">{{ label }}<span v-show="required" class="text-red-700"> *</span></label>
      <span v-show="!required" class="font-info text-proto-grey">Optional</span>
    </div>
    <select
        :name="name"
        class="focus:ring-proto-darkgrey focus:border-proto-darkgrey focus:ring-2 focus:bg-white
                block w-full border-0 rounded-md
                bg-proto-lightgrey font-p
                placeholder:font-p placeholder:text-proto-grey"
        :multiple="multiple"
        @change="updateValue"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.value" :selected="option.selected">{{ option.text }}</option>
    </select>
  </div>
</template>

<script lang="ts">
    import { PropType } from "vue";

    export default defineComponent({
        name: "DropdownInput",
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
            options: {
                type: Array as PropType<{value: string, text: string, selected: boolean}[]>,
                default() {
                    return []
                }
            }
        },
        emits: {'update:modelValue': null},
        computed: {
            name() {
                return this.label.toLowerCase();
            },
        },
        methods: {
            updateValue(event: { target: { value: unknown; }; }) {
                this.$emit("update:modelValue", event.target.value);
            }
        }
    })
</script>