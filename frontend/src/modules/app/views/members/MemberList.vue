<template lang="">
    <div class="h-full overflow-x-auto">
        <div class="inline-block align-middle">
            <div class="relative overflow-hidden ring-1 ring-proto-darkgrey ring-opacity-5">
                <table class="table-fixed divide-y divide-gray-300">
                    <thead class="bg-proto-lightgrey">
                    <tr>
                        <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                            <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-proto-darkgrey focus:ring-proto-darkgrey sm:left-6" :checked="indeterminate || selectedPeople.length === people.length" :indeterminate="indeterminate" @change="selectedPeople = $event.target.checked ? people.map((p) => p.userId) : []" />
                        </th>
                        <th scope="col" class="sr-only px-3 py-3.5 text-left text-sm font-semibold text-proto-darkgrey">Avatar</th>
                        <th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-proto-darkgrey">Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-proto-darkgrey">Stamm</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-proto-darkgrey">Rolle(n)</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="person in people" :key="person.userId" :class="[selectedPeople.includes(person.userId) && 'bg-proto-lightgrey']">
                            <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                                <div v-if="selectedPeople.includes(person.userId)" class="absolute inset-y-0 left-0 w-0.5 bg-proto-darkgrey"></div>
                                <input @click="userGotClicked(person.userId)" type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-proto-grey text-proto-darkgrey focus:ring-proto-darkgrey sm:left-6" :value="person.userId" v-model="selectedPeople" />
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-proto-grey">
                                <Avatar size="small" :src="person.avatarURL" alt="Avatar" />
                            </td>
                            <td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium', selectedPeople.includes(person.userId) ? 'text-proto-darkgrey' : 'text-proto-darkgrey']">
                                {{ buildFullName(person) }}
                            </td>
                            <td :class="['whitespace-nowrap px-3 py-4 text-sm', selectedPeople.includes(person.userId) ? 'text-proto-darkgrey' : 'text-proto-grey']">
                                {{ person.stamm }}
                            </td>
                            <td :class="['px-3 py-4 text-sm', selectedPeople.includes(person.userId) ? 'text-proto-darkgrey' : 'text-proto-grey']">
                                <span>{{ buildRolesString(person) }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
  </div>
</template>


<script lang="ts">
import AppIcon from "@/components/icons/AppIcon.vue";
import Avatar from "@/components/Avatar/Avatar.vue";
import dummyTestDB from "@/mixins/dummyTestDB";
import DummyDBEntry from "@/types/DummyDBEntry";

export default defineComponent({
    emits: ["userFocusChange"],
    mixins: [dummyTestDB],
    data() {
        return {
            selectedPeople: [] as string[],
            checked: false
        };
    },
    methods: {
        userGotClicked(userId: string) {
            this.$emit("userFocusChange", userId);
        },
    },
    computed: {
        indeterminate() {
            return this.selectedPeople.length > 0 && this.selectedPeople.length < this.people.length
        },
        people(): DummyDBEntry[] {
            const userIds = this.getAllUserIds();
            const users: DummyDBEntry[] = [];
            for (const userId of userIds) {
                if (userId === "fehlerUser") {
                    continue;
                }
                const user = this.getUserDBEntry(userId);
                if (user === null) {
                    //todo error handling
                    continue;
                }
                users.push(user);
            }
            return users;
        },
    },
    components: {
        AppIcon,
        Avatar
    }
})
</script>