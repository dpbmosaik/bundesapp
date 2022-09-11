<template>
    <div class="flex flex-row py-4 divide-x divide-x-proto-grey">
        <div class="grid grid-cols-2 grid-rows-2 grow">
            <p class="font-highlight py-2">{{ fullName }}</p>
            <p class="font-p py-2">{{ requestData.dateOfRegistration }}</p>
            <p class="font-p py-2">{{ requestData.stamm }}</p>
            <p class="font-p py-2">{{ requestData.stammesgroup }}</p>
        </div>
        <div class="flex flex-col gap-8 items-center pl-8">
            <TertiaryButton :target="() => openUserDetail()">Details ansehen</TertiaryButton>
            <PrimaryButton :target="() => acceptUser()">Akzeptieren</PrimaryButton>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType } from "vue"
import RegisterRequest from "./RegisterRequest"
import PrimaryButton from "@/components/button/PrimaryButton.vue"
import TertiaryButton from "@/components/button/TertiaryButton.vue"

export default defineComponent({
    name: 'RegisterRequest',
    components: {
        PrimaryButton,
        TertiaryButton
    },
    props: {
        requestData: {
            type: Object as PropType<RegisterRequest>,
            required: true
        }
    },
    computed: {
        fullName(): string {
            const user = this.requestData
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
    methods: {
        openUserDetail() {
            alert('open modal')
        },
        acceptUser() {
            alert('user accepted')
        }
    }
})
</script>