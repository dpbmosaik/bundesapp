<template lang="">
  <div class="flex flex-row h-full grow">
    <div class="basis-3/5 h-full border-r pr-8 flex flex-col gap-8 overflow-x-auto">
      <Searchbar />
      <MemberList @user-focus-change="userFocusChange" />
    </div>
    <div class="basis-2/5 h-full pl-8 overflow-y-auto">
      <DetailedSideView @user-focus-change="userFocusChange" :focusedUsers="focusedUsers"  />
    </div>
  </div>
</template>


<script lang="ts">
import Searchbar from "@/components/searchbar/Main.vue"
import MemberList from "./MemberList.vue"
import DetailedSideView from "./DetailedSideView.vue"

export default defineComponent({
  components: {
    Searchbar,
    MemberList,
    DetailedSideView
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
  }
})
</script>