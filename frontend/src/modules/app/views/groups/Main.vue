<template lang="">
  <div class="flex flex-row h-full grow">
    <div class="basis-3/5 h-full border-r pr-8 flex flex-col gap-8 overflow-x-auto">
      <div class="flex flex-row gap-6 items-center">
        <Searchbar />
        <PrimaryButton :target="() => createNewGroup()">Neue Gruppe</PrimaryButton>
      </div>
      <GroupList />
    </div>
    <div class="basis-2/5 h-full pl-8 overflow-y-auto">
      <div class="h-full">
          <div v-if="store.groupIsSelected" class="">
              <GroupDetail :groupId="store.getSelectedGroup" />
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

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      store
    }
  },
  methods: {
    createNewGroup() {
      alert('Neue Gruppe erstellen');
    },
  },
  components: {
    GroupList,
    GroupDetail,
    Searchbar,
    PrimaryButton
  }
})
</script>