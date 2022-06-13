
<template lang="">
    <router-link 
        :to="elem.href"
        class="group font-p flex flex-row gap-4 p-2 rounded-lg"
        :class="isCurrentRoute ? 'bg-proto-grey' : 'bg-transparent hover:bg-proto-grey'"
    >
        <AppIcon :class="isCurrentRoute ? 'hidden' : 'block group-hover:hidden'" :name="elem.icon" type="light" />
        <AppIcon :class="isCurrentRoute ? 'block' : 'hidden group-hover:block'" :name="elem.icon" type="bold" />
        <p>{{ elem.name }}</p>
    </router-link>
</template>

<script lang="ts">
    import AppIcon from "@/components/icons/AppIcon.vue"
    export default {
        props: {
            elem: Object,
            index: Number,
        },
        computed: {
            isCurrentRoute(): Boolean {
                // @ts-ignore
                const path = this.$route.path.split('/');
                path.splice(0, 2);
                // @ts-ignore
                const linkTo = this.elem.href.split('/');
                linkTo.splice(0, 2);

                if (path[0] === linkTo[0]) {
                    return true
                }
                
                return false
            }
        },
        components: {
            AppIcon
        }
    }
</script>