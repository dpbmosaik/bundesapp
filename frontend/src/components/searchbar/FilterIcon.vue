<template>
    <div class="flex items-center">
        <Popover class="relative">
            <PopoverButton>
                <AppIcon name="filter" type="light" />
            </PopoverButton>

            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-1 opacity-0"
            >
                <PopoverPanel class="fixed z-10 mt-3 w-64 max-w-sm -translate-x-1/2 transform lg:max-w-3xl">
                    <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-proto-grey ring-opacity-5 p-4 bg-white">
                        <slot></slot>
                    </div>
                </PopoverPanel>
            </transition>
        </Popover>
    </div>
</template>

<script lang="ts">
import AppIcon from "../icons/AppIcon.vue"
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
export default defineComponent({
    name: 'FilterIcon',
    components: {
        AppIcon,
        Popover,
        PopoverButton,
        PopoverPanel,
    }
})
</script>