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
        props: {
            name: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'light' //'light' or 'bold'
            }, 
            color: {
                type: String,
                default: '#3B3B3B'
            },
            hover: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                hoverState: false
            }
        },
        computed: {
            path(): string {
                const type: string  = this.type;
                const name: string  = this.name;
                if (type && name) {
                    
                    // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line security/detect-object-injection
                    if (iconCollection[type] && iconCollection[type][name]) {
                        
                        // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        // eslint-disable-next-line security/detect-object-injection
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
                    // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line security/detect-object-injection
                    if (iconCollection[type] && iconCollection[type][name]) {
                        // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        // eslint-disable-next-line security/detect-object-injection
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