<template lang="">
  <div class="flex flex-row h-full grow">
    <div class="basis-3/5 h-full border-r pr-8 flex flex-col gap-8 overflow-x-auto">
      <div class="flex flex-row gap-6 items-center">
        <Searchbar @search="handleSearch" />
        <FilterIconGroups :search-tags="searchTags" @select-filter="handleFilter" />
        <PrimaryButton :target="() => createNewGroup()">Neue Gruppe</PrimaryButton>
      </div>
      <div v-if="searchTags.length" class="flex flex-row gap-2 flex-wrap items-center">
        <Tag v-for="(tag, index) in searchTags" :key="index" icon="closeSquare" @icon-clicked="removeTag">{{ tag }}</Tag>
        <TertiaryButton class="ml-6" icon="delete" :target="() => emtpySearchTags()">Alle entfernen</TertiaryButton>
      </div>
      <GroupList :filter-strings="searchTags" />
    </div>
    <div class="basis-2/5 h-full pl-8 overflow-y-auto">
      <div class="h-full">
          <div v-if="store.groupIsSelected" class="">
              <GroupDetail :group-id="store.getSelectedGroup" />
          </div>
          <div v-else class="w-full h-full flex justify-center items-center">
              <p class="text-proto-grey h-fit">Noch keine Auswahl getroffen</p>
          </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import GroupList from "./GroupList.vue"
import GroupDetail from "./GroupDetail.vue"
import Searchbar from '@/components/searchbar/Main.vue';
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import { Ref } from "vue";
import FilterIconGroups from "./FilterIconGroups.vue";

export default defineComponent({
  name: 'MainGroup',
  components: {
    GroupList,
    GroupDetail,
    Searchbar,
    PrimaryButton,
    FilterIconGroups
  },
  setup() {
    const store = useStore();
    const searchTags: Ref<string[]>= ref([])
    return {
      store,
      searchTags
    }
  },
  methods: {
    createNewGroup() {
      alert('Neue Gruppe erstellen');
    },
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