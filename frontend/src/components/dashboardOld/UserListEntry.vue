<template>
  <td class="relative w-12 px-6 sm:w-16 sm:px-8">
    <input
      type="checkbox"
      @click="userGotClicked"
      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
    />
  </td>
  <td class="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
    <UserIdentifierVue :user-id="userId" />
  </td>
  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
    {{ user.stamm }}
  </td>
  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
    {{ buildRolesString(user) }}
  </td>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import dummyTestDB from "@/mixins/dummyTestDB";
import DummyDBEntry from "@/types/DummyDBEntry";
import UserIdentifierVue from "./UserIdentifier.vue";

export default defineComponent({
  props: {
    userId: String,
  },
  emits: ["userGotClicked"],
  components: {
    UserIdentifierVue,
  },
  mixins: [dummyTestDB],
  computed: {
    user(): DummyDBEntry {
      return this.getUserSafely(this.userId);
    },
  },
  methods: {
    userGotClicked() {
      this.$emit("userGotClicked", this.userId);
    },
  },
});
</script>
