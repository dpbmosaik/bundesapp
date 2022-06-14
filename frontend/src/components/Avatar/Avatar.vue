<template lang="">
    <div>
        <img :src="src" :alt="alt" :class="sizeString" class="rounded-full" />
    </div>
</template>


<script lang="ts">

export default {
    props: {
        size: String,
        src: String,
        alt: String
    },
    computed: {
        sizeString() {
            // @ts-ignore
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
}
</script>