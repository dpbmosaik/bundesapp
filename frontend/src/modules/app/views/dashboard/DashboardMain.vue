<!-- This example requires Tailwind CSS v2.0+ -->
<template>
<div>

<!-- This example requires Tailwind CSS v2.0+ -->
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Users</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto" 
        @click="get()">Update</button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Id</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">createdAt</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">updatedAt</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="level in scoutOrgaLevels" :key="level.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ level.id }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ level.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ level.createdAt }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ level.updatedAt }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script setup lang="ts">
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'

const store = useStore()
const scoutOrgaLevels = computed(() => store.scoutOrgaLevels)

function get() {
  console.log("button is pressed")
  store.setScoutOrgaLevels()
}

//  export default {
//   components: {
//     Popover,
//     PopoverButton,
//     PopoverPanel,
//     MenuIcon,
//     XIcon,
//   },
//   // mounted: {
//   //   getScoutOrgaLevels() {
//   //     store.setScoutOrgaLevels()
//   //   }
//   // },
//   // methods: {
//   //   getScoutOrgaLevels() {
//   //     store.setScoutOrgaLevels()
//   //   }
//   // },
//   setup() {
//     return {
//       navigation,
//     }
//   },
// }
</script>