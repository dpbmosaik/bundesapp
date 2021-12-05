<template>
  <CardTemplate>
    <br>
    <!-- Stamm selector -->
    <Listbox as="div" v-model="selected">
      <ListboxLabel class="block text-sm font-medium text-gray-700">
        Stammesname
      </ListboxLabel>
      <div class="mt-1 relative">
        <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span class="block truncate">{{ selected.name }}</span>
          <p v-if="!selected" style="color: rgba(156, 163, 175">Stamm auswählen</p>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="person in stammSelect" :key="person.id" :value="person" v-slot="{ active, selected }">
              <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                  {{ person.name }}
                </span>

                <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <br>

    <!-- Group selector -->
    <div v-show="selected">
      <Listbox as="div" v-model="selectedGroup">
        <ListboxLabel class="block text-sm font-medium text-gray-700">
          Gruppe
        </ListboxLabel>
        <div class="mt-1 relative">
          <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span class="block truncate">{{ selectedGroup.name }}</span>
            <p v-if="!selectedGroup" style="color: rgba(156, 163, 175">Gruppe auswählen</p>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              <ListboxOption as="template" v-for="person in stammesGruppen" :key="person.id" :value="person" v-slot="{ active, selectedGroup }">
                <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                  <span :class="[selectedGroup ? 'font-semibold' : 'font-normal', 'block truncate']">
                    {{ person.name }}
                  </span>

                  <span v-if="selectedGroup" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>

  </CardTemplate>
</template>

<script>
import CardTemplate from "./RegisterComponents/CardTemplate.vue"
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

const stammSelect = [
  { id: 1, name: 'Galaxias' },
  { id: 2, name: 'Silberfüchse' },
  { id: 3, name: 'Sperber' },
  { id: 4, name: 'Hellas' },
  { id: 5, name: 'Roter Milan' },
]

const stammesGruppen = [
  { id: 1, name: 'Stammesführung' },
  { id: 2, name: 'Sippe Corvus' },
  { id: 3, name: 'Roverrunde Alpha' }
]

export default {
  data() {
    return {
      stamm: ''
    }
  },
  components: {
    CardTemplate,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
  },
  setup() {
    const selected = 0;
    const selectedGroup = 0;

    return {
      stammSelect,
      selected,
      selectedGroup,
      stammesGruppen,
    }
  },
}
</script>