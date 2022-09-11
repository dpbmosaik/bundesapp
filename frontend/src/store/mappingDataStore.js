// store/mappingDataStore.js
import { defineStore } from "pinia";
import axios from "axios";

function convertEnum(list) {
  return list.map((x) => { // eslint-disable-line
    return {
      value: x[0],
      text: x[1],
    };
  });
};

export const mappingDataStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "mappingDataStore",
  state: () => ({
    scoutHierarchyMap: [],
    genderOptionsMap: [],
  }),
  getters: {
    getScoutHierarchyMap(state) {
      return state.scoutHierarchyMap;
    },
    getGenderOptionsMap(state) {
      return state.genderOptionsMap;
    },
  },
  actions: {
    async fetchScoutHierarchy() {
      try {
        const data = await axios.get(
          import.meta.env.VITE_APP_API + "/basic/scout-hierarchy",
        );
        this.scoutHierarchyMap = data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchGender() {
      try {
        const data = await axios.get(
          import.meta.env.VITE_APP_API + "/event/choices/gender/",
        );
        this.genderOptionsProxy = convertEnum(data.data);
        this.genderOptionsMap = Object.values({...this.genderOptionsProxy});
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
