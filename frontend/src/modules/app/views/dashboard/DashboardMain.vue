<template>
  <div class="float-left max-h-screen">
    <UserListVue @user-focus-change="userFocusChange" />
  </div>

  <div class="w-1/3 float-right">
    <DashboardSideview :focused-users="focusedUsers" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserListVue from "@/components/dashboard/UserList.vue";
import DashboardSideview from "./DashboardSideview.vue";

export default defineComponent({
  components: {
    UserListVue,
    DashboardSideview,
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
