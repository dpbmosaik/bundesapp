<template>
  <div v-if="hasNoAvatarImg">
    <AvatarText :name-initials="nameInitials" />
  </div>
  <div v-else>
    <AvatarIcon :url="imgURL" :alt-text="nameInitials" />
  </div>
</template>
<script lang="ts">
import DummyDBEntry from "@/types/DummyDBEntry";
import { defineComponent } from "vue";
import AvatarIcon from "./AvatarIcon.vue";
import AvatarText from "./AvatarText.vue";
import dummyTestDB from "@/mixins/dummyTestDB";

export default defineComponent({
  props: {
    userId: String,
  },
  mixins: [dummyTestDB],
  components: {
    AvatarIcon,
    AvatarText,
  },
  computed: {
    user(): DummyDBEntry {
      return this.getUserSafely(this.userId);
    },
    nameInitials(): string {
      const firstName = this.user.firstName;
      const lastName = this.user.lastName;

      return this.buildInitials([firstName, lastName]);
    },
    imgURL(): string {
      return this.user.avatarURL;
    },
    hasNoAvatarImg(): boolean {
      return this.imgURL === "";
    },
  },
  methods: {
    buildInitials(names: string[]): string {
      let initials = "";
      for (const name of names) {
        if (name.length > 0) {
          initials += name.charAt(0);
        } else {
          //todo error handling
        }
      }
      return initials;
    },
  },
});
</script>
