<template lang="">
    <div v-if="filteredPeople.length" class="h-full overflow-x-auto">
        <div class="inline-block align-middle">
            <div class="relative overflow-hidden ring-1 ring-proto-darkgrey ring-opacity-5">
                <table class="table-fixed divide-y divide-gray-300">
                    <thead class="bg-proto-lightgrey">
                    <tr>
                        <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                            <input
                                type="checkbox"
                                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-proto-darkgrey focus:ring-proto-darkgrey sm:left-6"
                                :checked="indeterminate || store.getSelectedMembersLength === store.getAllUsersLength" :indeterminate="indeterminate"
                                @change="handleGlobalSelector($event)"
                             />
                        </th>
                        <th scope="col" class="sr-only px-3 py-3.5 text-left text-sm font-semibold text-proto-darkgrey">Avatar</th>
                        <th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-proto-darkgrey">Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-proto-darkgrey">Stamm</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-proto-darkgrey">Rolle(n)</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="person in filteredPeople" :key="person.userId" class="cursor-pointer" :class="[store.checkIfMemberIsSelected(person.userId) && 'bg-proto-lightgrey']" @click="userGotClicked(person.userId)">
                            <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                                <div v-if="store.checkIfMemberIsSelected(person.userId)" class="absolute inset-y-0 left-0 w-0.5 bg-proto-darkgrey"></div>
                                <input :checked="store.checkIfMemberIsSelected(person.userId)" type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-proto-grey text-proto-darkgrey focus:ring-proto-darkgrey sm:left-6" :value="person.userId" />
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-proto-grey">
                                <Avatar size="small" :src="person.avatarURL" alt="Avatar" />
                            </td>
                            <td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium', store.checkIfMemberIsSelected(person.userId) ? 'text-proto-darkgrey' : 'text-proto-darkgrey']">
                                {{ buildFullName(person) }}<span class="text-proto-grey font-normal" :class="checkIfIsLoggedInUser(person.userId) ? '' : 'hidden'"> (Du)</span>
                            </td>
                            <td :class="['whitespace-nowrap px-3 py-4 text-sm', store.checkIfMemberIsSelected(person.userId) ? 'text-proto-darkgrey' : 'text-proto-grey']">
                                {{ person.stamm }}
                            </td>
                            <td :class="['px-3 py-4 text-sm', store.checkIfMemberIsSelected(person.userId) ? 'text-proto-darkgrey' : 'text-proto-grey']">
                                <span>{{ buildRolesString(person) }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="font-p">Keine passenden Mitglieder gefunden</p>
    </div>
</template>


<script lang="ts">
import Avatar from "@/components/Avatar/Avatar.vue";
import DummyDBEntry from "@/types/DummyDBEntry";
import { PropType } from "vue";

export default defineComponent({
    components: {
        Avatar
    },
    props: {
        filterStrings: {
            type: Array as PropType<string[]>,
            default: () => {return []}
        }
    },
    setup() {
        const store = useStore()
        const people = [] as DummyDBEntry[]
        return { store, people }
    },
    computed: {
        indeterminate() {
            return this.store.getSelectedMembersLength > 0 && this.store.getSelectedMembersLength < this.store.getAllUsersLength
        },
        filteredPeople() {
            let people = this.store.getAllUsers;
            people = people.filter((person : DummyDBEntry) => {
                const firstName = person.firstName;
                const lastName = person.lastName;
                const fahrtenName = person.fahrtenName;
                const stamm = person.stamm;
                const roles = person.roles.join(', ');
                const allStrings = `${firstName}, ${lastName}, ${fahrtenName}, ${stamm}, ${roles}`.toLowerCase()
                
                const filterStrings = this.filterStrings;
                const validationArray: boolean[] = []
                
                filterStrings.forEach(filterString => {
                    validationArray.push(allStrings.includes(filterString.toLowerCase()))
                });

                if (validationArray.includes(false)) {
                    return false
                } else {
                    return true
                }
            })
            return people
        }
    },
    methods: {
        userGotClicked(userId: string) {
            this.store.updateSelectedMembers(userId);
        },
        handleGlobalSelector(e: { target: { checked: boolean; }; }) {
            e.target.checked ? this.focusAllUsers() : this.defocusAllUsers();
            // this.selectedPeople = e.target.checked ? this.people.map((p: { userId: string; }) => p.userId) : [];
        },
        defocusAllUsers() {
            this.store.clearSelectedMembers();
        },
        focusAllUsers() {
            this.store.selectAllMembers();
        },
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
        },
        buildRolesString(user: DummyDBEntry): string {
            return user.roles.join(", ");
        },
        checkIfIsLoggedInUser(userId: string) {
            const loggedInUserId = this.store.getLoggedInUserId;
            return userId === loggedInUserId
        }
    }
})
</script>