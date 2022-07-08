<template>
  <svg
    class="icon"
    style="width:24px;height:24px"
    viewBox="0 0 24 24"
    fill="none"
    @mouseover="hover ? hoverState = true : ''"
    @mouseleave="hover ? hoverState = false : ''"
  >
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        :fill="iconColor"
        :d="hoverState ? hoverPath : path"
    />
  </svg>
</template>

<script lang="ts">
    import icons from './icons.json';
    import { AppIconType } from './AppIcon.type';

    const iconCollection: AppIconType = icons

    export default defineComponent({
        name: 'AppIcon',
        data() {
            return {
                hoverState: false
            }
        },
        props: {
            name: String,
            type: String, //'light' or 'bold'
            color: String,
            hover: {
                default: false,
                type: Boolean
            }
        },
        computed: {
            path(): string {
                const type: string | undefined = this.type;
                const name: string | undefined = this.name;
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
            hoverPath(): string {
                let type: string | undefined = this.type;
                if (type == 'light') {
                    type = 'bold'
                } else if(type == 'bold') {
                    type = 'light'
                }
                const name: string | undefined = this.name;
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