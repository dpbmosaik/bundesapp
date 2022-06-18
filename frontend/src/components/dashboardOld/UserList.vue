<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input
                      type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                    />
                  </th>
                  <th
                    scope="col"
                    class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Stamm
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rollen
                  </th>
                </tr>
              </thead>
              <tbody
                class="divide-y divide-gray-200 bg-white max-h-full overflow-y-scroll"
              >
                <tr v-for="person in people">
                  <UserListEntryVue
                    @user-got-clicked="userGotClicked"
                    :user-id="person.userId"
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserListEntryVue from "./UserListEntry.vue";
import dummyTestDB from "@/mixins/dummyTestDB";
import DummyDBEntry from "@/types/DummyDBEntry";

export default defineComponent({
  emits: ["userFocusChange"],
  mixins: [dummyTestDB],
  components: {
    UserListEntryVue,
  },
  methods: {
    userGotClicked(userId: string) {
      this.$emit("userFocusChange", userId);
    },
  },
  computed: {
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
});
</script>
