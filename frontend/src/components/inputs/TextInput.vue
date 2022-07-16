<template>
  <div>
    <div class="flex justify-between">
      <label for="email" class="block text-sm font-medium text-gray-700">{{ label }}<span v-show="required" class="text-red-700"> *</span></label>
      <span v-show="!required" class="text-sm text-gray-500">Optional</span>
    </div>
    <div class="mt-1">
      <input
        :value="value"
        :type="type"
        :name="name"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        :placeholder="placeholder"
        @input="updateValue"
       />
    </div>
  </div>
</template>

<script lang="ts">
    import { PropType } from "vue";

    export default defineComponent({
        name: "TextInput",
        model: {
            prop: "value",
            event: "update"
        },
        props: {
            label: {
                type: String,
                default: 'Label Fehlt'
            },
            placeholder: {
                type: String,
                default: ''
            },
            required: {
                type: Boolean,
                default: false
            },
            type: {
                type: String as PropType<'email' | 'text' | 'number' | 'password' | 'url'>,
                default: 'text'
            },
            value: {
                type: String,
                default: ''
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        emits: {'updateValue': null, 'update:modelValue': null},
        setup() {
            return {
                inputValue: ''
            }
        },
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