<!--
	work in progress (esp. splitting up, adding wanted features and so on)
-->
<template>
  <aside
    class="w-full bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block"
  >
    <div class="pb-16 space-y-6">
      <div>
        <UserIdentifierBig />
        <UserRolesFancy />
      </div>
      <div>
        <dl
          class="p-2 mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          <UserActions />
        </dl>
        <dl
          class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-500 truncate">E-Mail</p>
                <p class="text-sm font-medium text-gray-900">
                  spam@dexter.bayern
                </p>
              </div>
            </div>
          </div>

          <div
            v-for="key in Object.keys(currentFile.information)"
            :key="key"
            class="py-3 flex justify-between text-sm font-medium"
          >
            <dt class="text-gray-500">{{ key }}</dt>
            <dd class="text-gray-900">{{ currentFile.information[key] }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dummyTestDB from "@/mixins/dummyTestDB";
import DummyDBEntry from "@/types/DummyDBEntry";
import UserIdentifierBig from "./UserIdentifierBig.vue";
import UserRolesFancy from "./UserRolesFancy.vue";
import UserActions from "./UserActions.vue";

export default defineComponent({
  props: {
    userId: String,
  },
  components: {
    UserIdentifierBig,
    UserRolesFancy,
    UserActions,
  },
  data() {
    return {
      currentFile: {
        //will be removed when removing the tailwindui leftovers
        name: "test",
        information: {
          pups: 1,
          abc: 2,
          keks: "Kuchen",
        },
      },
    };
  },
  mixins: [dummyTestDB],
  computed: {
    focusedUser(): DummyDBEntry {
      return this.getUserSafely(this.userId);
    },
  },
});
</script>
