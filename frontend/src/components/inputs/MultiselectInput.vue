<template>
    <fieldset class="border-t border-b border-gray-200">
        <legend class="sr-only">Notifications</legend>
        <div class="divide-y divide-gray-200">
            <div v-for="(option, index) in options" :key="index" class="relative flex items-start py-4">
                <div class="min-w-0 flex-1 text-sm">
                <label for="comments" class="font-medium text-gray-700">{{ option.label }}</label>
                <p id="comments-description" class="text-gray-500">{{ option.desc }}</p>
                </div>
                <div class="ml-3 flex h-5 items-center">
                    <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </div>
            </div>
        </div>
    </fieldset>
</template>
  
<script lang="ts">
import { PropType } from 'vue';


export default defineComponent({
    name: "MultiselectInput",
    props: {
        options: {
            type: Array as PropType<{label: string, desc: string}[]>,
            required: true
        }
    },
    emits: {'update:modelValue': null},
    setup() {
        return {
            
        }
    },
    computed: {

    },
    methods: {

    }
})
</script>