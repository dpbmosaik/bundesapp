<template lang="">
  <div class="flex flex-row h-full grow">
    <div class="basis-3/5 h-full border-r pr-8 flex flex-col gap-8 overflow-x-auto">
      <Searchbar />
      <MemberList />
    </div>
    <div class="basis-2/5 h-full pl-8 overflow-y-auto">
      <DetailedSideView />
    </div>
  </div>
</template>


<script lang="ts">
import Searchbar from "@/components/searchbar/Main.vue"
import MemberList from "./MemberList.vue"
import DetailedSideView from "./DetailedSideView.vue"

export default defineComponent({
  name: "MembersMain",
  components: {
    Searchbar,
    MemberList,
    DetailedSideView
  }
})
</script>