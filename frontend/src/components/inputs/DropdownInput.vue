<template>
  <div>
    <div class="flex justify-between">
      <label :for="name" class="block font-highlight text-proto-darkgrey">{{ label }}<span v-show="required" class="text-red-700"> *</span></label>
      <span v-show="!required" class="font-info text-proto-grey">Optional</span>
    </div>
    <select
        :name="name"
        class="focus:ring-2 focus:bg-white block w-full rounded-md bg-proto-lightgrey font-p placeholder:font-p placeholder:text-proto-grey"
        :class="errors.length ? 'border border-red-700 focus:ring-red-700 focus:border-red-700 text-red-700' : 'border-0 focus:ring-proto-darkgrey focus:border-proto-darkgrey'"
        :multiple="multiple"
        @change="updateValue"
    >
        <option v-for="(option, index) in options" :key="index" :value="option.value" :selected="option.selected">{{ option.text }}</option>
    </select>
    <p v-for="(error, index) in errors" v-show="errors.length" :key="index" class="mt-2 text-sm text-red-600">{{ error }}</p>
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
        emits: {'update:modelValue': null, 'errorUpdate': null},
        setup() {
            return {
                errors: [] as string[]
            }
        },
        computed: {
            name() {
                return this.label.toLowerCase();
            },
        },
        methods: {
            updateValue(event: { target: { value: unknown; }; }) {
                const inputValue = (event.target as HTMLInputElement).value
                const errorMessage = "Feld darf nicht leer sein";
                if (!this.errors.includes(errorMessage) && !this.isFilled(inputValue)) {
                    this.errors.push(errorMessage);
                } else if (this.errors.includes(errorMessage) && this.isFilled(inputValue)) {
                    this.errors = this.errors.filter(item => item !== errorMessage)
                }

                this.$emit("update:modelValue", event.target.value);
                this.$emit('errorUpdate', this.errors.length);
            },
            isFilled(value: unknown) {
                if (value === '') {
                    return false
                }
                return true
            },
        }
    })
</script>