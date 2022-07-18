<template>
  <table>
    <tbody>
      <tr>
        <td>
          <Avatar class="float-left" :user-id="userId" />
        </td>
        <td>
          {{ buildFullName(user) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import dummyTestDB from "@/mixins/dummyTestDB";
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";

export default defineComponent({
  props: {
    userId: String,
  },
  components: {
    Avatar,
  },
  mixins: [dummyTestDB],
  computed: {
    user() {
      return this.getUserSafely(this.userId);
    },
  },
});
</script>
