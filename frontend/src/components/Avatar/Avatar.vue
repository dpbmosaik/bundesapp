<template lang="">
    <div :class="sizeString">
        <img :src="src" :alt="alt" class="rounded-full w-full h-full" />
    </div>
</template>


<script lang="ts">

export default defineComponent({
    name: "AvatarCircle",
    props: {
        size: {
            type: String,
            default: 'small'
        },
        src: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: ''
        }
    },
    computed: {
        sizeString() {
            switch (this.size) {
                case 'small':
                    return' w-8 h-8'
                case 'medium':
                    return 'w-12 h-12'
                case 'big':
                    return 'w-32 h-32'
                default:
                    return' w-8 h-8'
            }
        }
    },
})
</script>