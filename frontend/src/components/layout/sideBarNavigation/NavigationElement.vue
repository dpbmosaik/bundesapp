
<template lang="">
    <div>
        <router-link 
            v-if="!externalLink"
            :to="elem.href"
            class="group font-p p-2 rounded-lg flex flex-row items-center gap-4"
            :class="isCurrentRoute ? 'bg-proto-grey' : 'bg-transparent hover:bg-proto-grey'"
            @click="clearAllSelections()"
        >
            <div class="flex flex-row gap-4 grow">
                <AppIcon :class="isCurrentRoute ? 'hidden' : 'block group-hover:hidden'" :name="elem.icon" type="light" />
                <AppIcon :class="isCurrentRoute ? 'block' : 'hidden group-hover:block'" :name="elem.icon" type="bold" />
                <p>{{ elem.name }}</p>
            </div>
            <div
                v-if="elem.news > 0"
                class="font-infonumber bg-proto-grey px-3 rounded-full h-full align-middle"
                :class="isCurrentRoute ? 'bg-proto-lightgrey' : 'bg-proto-grey group-hover:bg-proto-lightgrey'"
            >
                {{ elem.news }}
            </div>
        </router-link>
        <a
            v-if="externalLink"
            target="_blank"
            rel="noopener noreferrer"
            :href="elem.href"
            class="group font-p flex flex-row gap-4 p-2 rounded-lg bg-transparent hover:bg-proto-grey"
        >
            <AppIcon class="block group-hover:hidden" :name="elem.icon" type="light" />
            <AppIcon class="hidden group-hover:block" :name="elem.icon" type="bold" />
            <p>{{ elem.name }}</p>
        </a>
    </div>
</template>

<script lang="ts">
    import AppIcon from "@/components/icons/AppIcon.vue"
    export default defineComponent({
        components: {
            AppIcon
        },
        props: {
            elem: {
                type: Object,
                default: undefined
            },
            index: {
                type: Number,
                default: 0
            },
            externalLink: Boolean
        },
        setup() {
            const store = useStore();
            return { 
                store,
            }
        },
        computed: {
            isCurrentRoute(): boolean {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const path = this.$route.path.split('/');
                path.splice(0, 2);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const linkTo = this.elem.href.split('/');
                linkTo.splice(0, 2);

                if (path[0] === linkTo[0]) {
                    return true
                }
                
                return false
            }
        },
        methods: {
            clearAllSelections() {
                this.store.clearSelectedMembers();
                this.store.clearSelectedGroup();
            }
        }
    })
</script>