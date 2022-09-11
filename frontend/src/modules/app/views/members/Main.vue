<template lang="">
  <div class="flex flex-row h-full grow">
    <div class="basis-3/5 h-full border-r pr-8 flex flex-col gap-8 overflow-x-auto">
      <div class="flex flex-row items-center gap-8">
        <Searchbar @search="handleSearch" />
        <FilterIconMembers :search-tags="searchTags" @select-filter="handleFilter" />
      </div>

      <div v-if="searchTags.length" class="flex flex-row gap-2 flex-wrap items-center">
        <Tag v-for="(tag, index) in searchTags" :key="index" icon="closeSquare" @icon-clicked="removeTag">{{ tag }}</Tag>
        <TertiaryButton class="ml-6" icon="delete" :target="() => emtpySearchTags()">Alle entfernen</TertiaryButton>
      </div>
      <MemberList :filter-strings="searchTags" />
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
import Tag from "@/components/tag/Tag.vue"
import { Ref } from "vue"
import TertiaryButton from "@/components/button/TertiaryButton.vue"
import FilterIconMembers from "./FilterIconMembers.vue"

export default defineComponent({
  name: "MembersMain",
  components: {
    Searchbar,
    MemberList,
    DetailedSideView,
    Tag,
    TertiaryButton,
    FilterIconMembers
  },
  setup() {
    const searchTags: Ref<string[]>= ref([])
    return {
      searchTags
    }
  },
  methods: {
    handleSearch(val: string) {
      if (!this.searchTags.includes(val)) {
        this.searchTags.push(val);
      }
    },
    handleFilter(val: string) {
      if (!this.searchTags.includes(val)) {
        this.searchTags.push(val);
      } else {
        const index = this.searchTags.indexOf(val);
        this.searchTags.splice(index, 1);
      }
    },
    emtpySearchTags() {
      this.searchTags = []
    },
    removeTag(tagToRemove: string) {

      this.searchTags = this.searchTags.filter(tag => {       
        return tag != tagToRemove
      })

    }
  }
})
</script>