<template>
  <div v-if="focusedUsers === undefined || focusedUsers.length === 0">
    <!--intentionally empty-->
  </div>
  <UserDetailsVue
    v-else-if="focusedUsers.length === 1"
    :user-id="focusedUsers[0]"
  />
  <div v-else>todo</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import UserDetailsVue from "@/components/dashboard/UserDetails.vue";

export default defineComponent({
  components: {
    UserDetailsVue,
  },
  props: {
    focusedUsers: Array as PropType<string[]>,
  },
});
</script>
