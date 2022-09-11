<template>
    <div class="flex flex-col gap-4 divide-y divide-y-proto-grey overflow-y-auto">
        <RegisterRequestElement v-for="(request, index) in registerRequests" :key="index" :request-data="request" />
    </div>
</template>

<script lang="ts">
import type RegisterRequest from "./RegisterRequest"
import RegisterRequestElement from "./RegisterRequestElement.vue"
export default defineComponent({
    name: 'RegisterRequestList',
    components: {
        RegisterRequestElement
    },
    setup() {
        const registerRequests: RegisterRequest[] = [
            {
                userId: '13',
                fahrtenName: 'Li',
                firstName: 'Lisa',
                lastName: 'Müller',
                stamm: 'Zugvögel',
                stammesgroup: 'Flamingo',
                email: 'lisa@müller.de',
                phone: '+49123456789',
                address: {
                    street: 'Beispielstraße',
                    number: '79',
                    city: 'Köln',
                    code: '12345',
                    addition: '',
                },
                dateOfRegistration: '22.07.2022'
            },
            {
                userId: '14',
                fahrtenName: 'Li',
                firstName: 'Lisa',
                lastName: 'Müller',
                stamm: 'Zugvögel',
                stammesgroup: 'Flamingo',
                email: 'lisa@müller.de',
                phone: '+49123456789',
                address: {
                    street: 'Beispielstraße',
                    number: '79',
                    city: 'Köln',
                    code: '12345',
                    addition: '',
                },
                dateOfRegistration: '22.07.2022'
            },
        ]
        return {
            registerRequests
        }
    }
})
</script>