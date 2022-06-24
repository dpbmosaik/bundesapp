
<template lang="">
    <div class="flex flex-col gap-4">
        <div class="flex flex-row flex-wrap gap-2">
            <Tag 
                v-for="(user, index) in store.getSelectedMembers"
                :key="index"
                class="bg-proto-darkgrey text-white w-fit"
            >
                {{ buildFullName(store.getUserById(user)) }}
            </Tag>
        </div>
        <TertiaryButton :target="() => store.clearSelectedMembers()" icon="delete">Alle Entfernen</TertiaryButton>
    </div>
</template>


<script lang="ts">
import Tag from "@/components/tag/Tag.vue";
import TertiaryButton from "@/components/button/TertiaryButton.vue";

export default defineComponent({
    setup() {
        const store = useStore()
        return { store }
    },
    components: {
        Tag,
        TertiaryButton
    },
    methods: {
        buildFullName(user: {firstName: string, fahrtenName: string, lastName: string}) {
            let name = "";
            if (user.firstName !== undefined) {
                name += user.firstName;
            }
            if (user.fahrtenName !== "") {
                name += ' "' + user.fahrtenName + '"';
            }
            if (user.lastName !== undefined) {
                name += " " + user.lastName;
            }
            return name;
        }
    },
})
</script>