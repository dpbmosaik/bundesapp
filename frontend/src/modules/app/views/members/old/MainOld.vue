<template>
  <div class="float-left max-h-screen">
    <UserListVue @user-focus-change="userFocusChange" />
  </div>

  <div class="w-1/3 float-right">
    <MembersSideview :focused-users="focusedUsers" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserListVue from "@/components/dashboard/UserList.vue";
import MembersSideview from "./MembersSideview.vue";

export default defineComponent({
  components: {
    UserListVue,
    MembersSideview,
  },
  data() {
    return {
      focusedUsers: [] as string[],
    };
  },
  methods: {
    userFocusChange(userId: string) {
      if (this.focusedUsers.includes(userId)) {
        this.focusedUsers.splice(this.focusedUsers.indexOf(userId), 1);
      } else {
        this.focusedUsers.push(userId);
      }
    },
  },
});
</script>
