<template lang="">
    <div class="bg-proto-darkgrey text-white px-2 py-1 w-fit h-fit rounded-full font-description flex flex-row items-center gap-2">
        <div ref="slot">
            <slot ></slot>
        </div>
        <button v-if="icon" @click="handleClick">
            <AppIcon :name="icon" type="light" color="#ffffff" />
        </button>
    </div>
</template>

<script lang="ts">
import AppIcon from "../icons/AppIcon.vue"
export default defineComponent({
    name: "TagMain",
    components: {
        AppIcon
    },
    props: {
        icon: {
            default: '',
            type: String
        }
    },
    emits: ['icon-clicked'],
    methods: {
        handleClick() {           
            this.$emit("icon-clicked", (this.$refs.slot as any).innerHTML);
        }
    }
})
</script>