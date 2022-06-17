import AppIcon from '@/components/icons/AppIcon.vue';
<template lang="">
    <div class="min-w-0 border-proto-grey">
        <div class="w-full mx-auto">
            <label for="desktop-search" class="sr-only">Suche</label>
            <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-2 flex items-center">
                    <AppIcon name="search" type="light" />
                </div>
                <input id="desktop-search"
                       class="block w-full py-2 pl-10 pr-3
                            bg-white bg-opacity-20 
                              border border-proto-lightgrey rounded-lg
                              leading-5 font-p
                              placeholder:font-p placeholder:text-proto-grey
                              focus:border-proto-darkgrey focus:ring-0"
                        :placeholder="placeholder"
                        type="search"
                        name="search" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import AppIcon from "../icons/AppIcon.vue"
    export default {
        props: {
            placeholder: String
        },
        components: {
            AppIcon
        }
    }
</script>