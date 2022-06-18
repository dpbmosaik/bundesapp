<template>
  <svg
    class="icon"
    style="width:24px;height:24px"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        :fill="iconColor"
        :d="path"
    />
  </svg>
</template>

<script lang="ts">
    import icons from './icons.json';
    import { AppIconType } from './AppIcon.type';

    const iconCollection: AppIconType = icons

    export default defineComponent({
        name: 'AppIcon',
        props: {
            name: String,
            type: String,
            color: String
        },
        computed: {
            path(): string {
                const type: String | undefined = this.type;
                const name: String | undefined = this.name;
                if (type && name) {
                    // @ts-ignore
                    if (iconCollection[type] && iconCollection[type][name]) {
                        // @ts-ignore
                        return iconCollection[type][name]
                    } else {
                        return iconCollection.fallback.icon
                    }
                } else {
                    return iconCollection.fallback.icon
                }
            },
            iconColor(): string {
                return this.color ? this.color : "#3B3B3B" ;
            }
        },
    });
</script>