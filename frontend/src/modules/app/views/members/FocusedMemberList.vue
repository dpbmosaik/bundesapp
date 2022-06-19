import { PropType } from 'vue';
<template lang="">
    <div class="flex flex-col gap-4">
        <div class="flex flex-row flex-wrap gap-2">
            <Tag 
                v-for="(user, index) in focusedUsers"
                :key="index"
                class="bg-proto-darkgrey text-white w-fit"
            >
                {{ buildFullName(getUserSafely(user)) }}
            </Tag>
        </div>
        <!-- <TertiaryButton :target="() => defocusAllUsers()" icon="delete">Alle Entfernen</TertiaryButton> -->
    </div>
</template>


<script lang="ts">
import dummyTestDB from "@/mixins/dummyTestDB";
import { PropType } from "vue";
import Tag from "@/components/tag/Tag.vue";
import TertiaryButton from "@/components/button/TertiaryButton.vue";

export default defineComponent({
    emits: ["userFocusChange"],
    mixins: [dummyTestDB],
    props: {
        focusedUsers: Array as PropType<string[]>
    },
    components: {
        Tag,
        TertiaryButton
    },
    methods: {
        defocusAllUsers() {
            console.log(this.focusedUsers);
            
            if (this.focusedUsers) {
                for (const userId of this.focusedUsers) {
                    this.$emit("userFocusChange", userId);                    
                }
            }
        }
    },
})
</script>